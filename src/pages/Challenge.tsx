
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, ExternalLink, Lightbulb, Code, Bug } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'manual' | 'automation';
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
  const [testCases, setTestCases] = useState('');
  const [code, setCode] = useState('');
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
      type: 'manual',
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
    console.log('Submitting:', challenge?.type === 'manual' ? testCases : code);
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
      
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
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
                <Badge variant="outline">
                  {challenge.type === 'manual' ? <Bug className="w-3 h-3 mr-1" /> : <Code className="w-3 h-3 mr-1" />}
                  {challenge.type}
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
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm text-gray-700">
                {challenge.instructions}
              </pre>
            </CardContent>
          </Card>

          {/* Challenge Input */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {challenge.type === 'manual' ? 'Write Your Test Cases' : 'Write Your Automation Code'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {challenge.type === 'manual' ? (
                <Textarea
                  placeholder="Write your test cases here... Include test steps, expected results, and any additional notes."
                  value={testCases}
                  onChange={(e) => setTestCases(e.target.value)}
                  className="min-h-[300px]"
                />
              ) : (
                <div className="border rounded-md">
                  <div className="bg-gray-50 px-3 py-2 border-b text-sm text-gray-600">
                    Java (Selenium WebDriver)
                  </div>
                  <Textarea
                    placeholder="// Write your Selenium automation code here...
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class LoginTest {
    public static void main(String[] args) {
        // Your code here
    }
}"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="min-h-[400px] border-0 rounded-none font-mono text-sm"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setShowHint(true)}
              className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Get Hint (-5 points)
            </Button>
            
            <div className="flex gap-3">
              {challenge.type === 'automation' && (
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
            <Card className="mt-6 border-yellow-200 bg-yellow-50">
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
          <Card className="mt-6">
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
  );
};

export default Challenge;
