
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ManualTestCase {
  id: string;
  title: string;
  steps: string[];
  expectedResult: string;
  actualResult?: string;
  status: 'pass' | 'fail' | 'pending';
}

interface AutomationSubmission {
  language: string;
  code: string;
  framework: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { submissionId, challengeId, submissionType, content } = await req.json()

    let score = 0;
    let feedback: any = {};
    let status = 'failed';

    if (submissionType === 'manual') {
      const testCases = content as ManualTestCase[];
      const validationResult = validateManualTestCases(challengeId, testCases);
      score = validationResult.score;
      feedback = validationResult.feedback;
      status = validationResult.status;
    } else if (submissionType === 'automation') {
      const automationCode = content as AutomationSubmission;
      const validationResult = validateAutomationCode(challengeId, automationCode);
      score = validationResult.score;
      feedback = validationResult.feedback;
      status = validationResult.status;
    }

    // Update submission with validation results
    const { error: updateError } = await supabaseClient
      .from('challenge_submissions')
      .update({
        status,
        score,
        feedback,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', submissionId);

    if (updateError) {
      throw updateError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        score, 
        status, 
        feedback 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

function validateManualTestCases(challengeId: string, testCases: ManualTestCase[]) {
  let score = 0;
  let passedTests = 0;
  const feedback: any = {
    testCaseResults: [],
    suggestions: []
  };

  // Basic validation rules
  const minTestCases = getMinTestCasesForChallenge(challengeId);
  const requiredTestTypes = getRequiredTestTypesForChallenge(challengeId);

  if (testCases.length < minTestCases) {
    feedback.suggestions.push(`Consider adding more test cases. Minimum recommended: ${minTestCases}`);
  }

  testCases.forEach((testCase, index) => {
    const result: any = {
      testCaseId: testCase.id,
      title: testCase.title,
      points: 0,
      feedback: []
    };

    // Check if test case has proper structure
    if (!testCase.title || testCase.title.trim().length < 5) {
      result.feedback.push('Test case title should be more descriptive');
    } else {
      result.points += 2;
    }

    if (!testCase.steps || testCase.steps.length === 0) {
      result.feedback.push('Test case should have clear steps');
    } else if (testCase.steps.length < 3) {
      result.feedback.push('Consider adding more detailed steps');
      result.points += 2;
    } else {
      result.points += 5;
    }

    if (!testCase.expectedResult || testCase.expectedResult.trim().length < 10) {
      result.feedback.push('Expected result should be more detailed');
    } else {
      result.points += 3;
    }

    if (testCase.status === 'pass') {
      passedTests++;
      result.points += 5;
    }

    score += result.points;
    feedback.testCaseResults.push(result);
  });

  // Bonus points for comprehensive testing
  if (testCases.length >= minTestCases * 1.5) {
    score += 10;
    feedback.suggestions.push('Great! You provided comprehensive test coverage.');
  }

  // Determine overall status
  const maxPossibleScore = testCases.length * 15;
  const percentage = (score / maxPossibleScore) * 100;
  
  let status = 'failed';
  if (percentage >= 70) {
    status = 'passed';
  } else if (percentage >= 50) {
    status = 'reviewing';
  }

  return { score: Math.min(score, 100), feedback, status };
}

function validateAutomationCode(challengeId: string, automation: AutomationSubmission) {
  let score = 0;
  const feedback: any = {
    codeQuality: [],
    suggestions: [],
    errors: []
  };

  const code = automation.code.toLowerCase();

  // Basic code quality checks
  if (code.includes('webdriver') || code.includes('selenium')) {
    score += 10;
    feedback.codeQuality.push('Good: Uses proper automation framework');
  }

  if (code.includes('wait') && (code.includes('until') || code.includes('expected'))) {
    score += 15;
    feedback.codeQuality.push('Excellent: Implements proper waits');
  } else {
    feedback.suggestions.push('Consider using explicit waits instead of sleep/delays');
  }

  if (code.includes('assert') || code.includes('expect') || code.includes('should')) {
    score += 15;
    feedback.codeQuality.push('Good: Includes assertions');
  } else {
    feedback.suggestions.push('Add assertions to verify expected outcomes');
  }

  if (code.includes('try') && code.includes('catch')) {
    score += 10;
    feedback.codeQuality.push('Good: Includes error handling');
  }

  // Check for page object pattern
  if (code.includes('page') && (code.includes('class') || code.includes('def'))) {
    score += 15;
    feedback.codeQuality.push('Excellent: Uses page object pattern');
  }

  // Check for test structure
  if (code.includes('test') || code.includes('@test') || code.includes('it(')) {
    score += 10;
    feedback.codeQuality.push('Good: Proper test structure');
  }

  // Determine status based on score
  let status = 'failed';
  if (score >= 60) {
    status = 'passed';
  } else if (score >= 30) {
    status = 'reviewing';
  }

  if (score < 30) {
    feedback.errors.push('Code needs significant improvement to meet quality standards');
  }

  return { score: Math.min(score, 100), feedback, status };
}

function getMinTestCasesForChallenge(challengeId: string): number {
  // Different challenges may require different minimum test cases
  if (challengeId.includes('login') || challengeId.includes('auth')) {
    return 5;
  }
  if (challengeId.includes('sql') || challengeId.includes('security')) {
    return 6;
  }
  return 4;
}

function getRequiredTestTypesForChallenge(challengeId: string): string[] {
  if (challengeId.includes('login')) {
    return ['positive', 'negative', 'boundary', 'security'];
  }
  if (challengeId.includes('sql')) {
    return ['injection', 'validation', 'security'];
  }
  return ['positive', 'negative'];
}
