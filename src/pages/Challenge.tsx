
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, ExternalLink, Lightbulb, Code, Bug } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ManualTestEditor from '@/components/ManualTestEditor';
import AutomationCodeEditor from '@/components/AutomationCodeEditor';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  points: number;
  app_url?: string;
  instructions: string;
}

const Challenge = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [testMode, setTestMode] = useState<'manual' | 'automation'>('manual');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchChallenge();
  }, [id, user, navigate]);

  const fetchChallenge = async () => {
    // Mock data - will be replaced with real Supabase data
    const mockChallenge: Challenge = {
      id: id || '1',
      title: 'E-commerce Login Testing',
      description: 'Test the login functionality of an e-commerce application. Focus on both positive and negative test scenarios.',
      difficulty: 'easy',
      tags: ['Login', 'Authentication', 'E-commerce'],
      points: 50,
      app_url: 'https://demo-shop.example.com',
      instructions: `
        Test the login functionality of the e-commerce application. Your test cases should cover:
        
        1. Valid login scenarios
        2. Invalid login scenarios (wrong password, non-existent user)
        3. Empty field validations
        4. Password field masking
        5. Remember me functionality
        6. Forgot password link
        
        Write detailed test cases with expected results.
      `
    };
    setChallenge(mockChallenge);
  };

  const handleSubmit = () => {
    // Handle submission logic
    console.log('Submitting:', testMode, 'solution');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!challenge) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto h-full flex flex-col">
            {/* Header */}
            <div className="mb-6 flex-shrink-0">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{challenge.title}</h1>
                <div className="flex gap-2">
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{challenge.description}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-gray-500">Points: {challenge.points}</span>
                {challenge.app_url && (
                  <a
                    href={challenge.app_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Test Application
                  </a>
                )}
              </div>
              
              <div className="flex flex-wrap gap-1">
                {challenge.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <Card className="mb-6 flex-shrink-0">
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                  {challenge.instructions}
                </pre>
              </CardContent>
            </Card>

            {/* Test Mode Toggle and Editor */}
            <Card className="flex-1 flex flex-col mb-6">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-center justify-between">
                  Choose Test Type
                  <ToggleGroup type="single" value={testMode} onValueChange={(value) => value && setTestMode(value as 'manual' | 'automation')}>
                    <ToggleGroupItem value="manual" aria-label="Manual Testing">
                      <Bug className="w-4 h-4 mr-2" />
                      Manual Testing
                    </ToggleGroupItem>
                    <ToggleGroupItem value="automation" aria-label="Automation Testing">
                      <Code className="w-4 h-4 mr-2" />
                      Automation Testing
                    </ToggleGroupItem>
                  </ToggleGroup>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {testMode === 'manual' ? (
                  <ManualTestEditor />
                ) : (
                  <AutomationCodeEditor />
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-between flex-shrink-0">
              <Button
                variant="outline"
                onClick={() => setShowHint(true)}
                className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Get Hint (-5 points)
              </Button>
              
              <div className="flex gap-3">
                {testMode === 'automation' && (
                  <Button variant="outline">
                    Run Code
                  </Button>
                )}
                <Button onClick={handleSubmit}>
                  Submit Solution
                </Button>
              </div>
            </div>

            {/* Hint */}
            {showHint && (
              <Card className="mt-6 border-yellow-200 bg-yellow-50 flex-shrink-0">
                <CardHeader>
                  <CardTitle className="text-yellow-800">💡 Hint</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-yellow-700">
                    Start with the happy path - test a successful login first. Then think about what could go wrong: empty fields, wrong credentials, etc.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Feedback Area */}
            <Card className="mt-6 flex-shrink-0">
              <CardHeader>
                <CardTitle>Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 italic">Submit your solution to see detailed feedback and scoring.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
