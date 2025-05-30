
import { supabase } from "@/integrations/supabase/client";

export interface ManualTestCase {
  id: string;
  title: string;
  steps: string[];
  expectedResult: string;
  actualResult?: string;
  status: 'pass' | 'fail' | 'pending';
}

export interface AutomationSubmission {
  language: string;
  code: string;
  framework: string;
}

export interface SubmissionData {
  challengeId: string;
  submissionType: 'manual' | 'automation';
  content: ManualTestCase[] | AutomationSubmission;
}

export const submitChallenge = async (data: SubmissionData) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('User not authenticated');
  }

  // Submit to database with proper type casting
  const { data: submission, error } = await supabase
    .from('challenge_submissions')
    .insert({
      user_id: user.user.id,
      challenge_id: data.challengeId,
      submission_type: data.submissionType,
      content: data.content as any, // Cast to any to match Json type
      status: 'pending'
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  // Call validation edge function
  const { data: validationResult, error: validationError } = await supabase.functions.invoke('validate-submission', {
    body: {
      submissionId: submission.id,
      challengeId: data.challengeId,
      submissionType: data.submissionType,
      content: data.content
    }
  });

  if (validationError) {
    console.error('Validation error:', validationError);
  }

  return { submission, validationResult };
};

export const getUserProgress = async (challengeId: string) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    return null;
  }

  const { data, error } = await supabase
    .from('user_challenge_progress')
    .select('*')
    .eq('user_id', user.user.id)
    .eq('challenge_id', challengeId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching progress:', error);
    return null;
  }

  return data;
};

export const getUserSubmissions = async (challengeId: string) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    return [];
  }

  const { data, error } = await supabase
    .from('challenge_submissions')
    .select('*')
    .eq('user_id', user.user.id)
    .eq('challenge_id', challengeId)
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('Error fetching submissions:', error);
    return [];
  }

  return data;
};
