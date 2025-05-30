
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { Target, Trophy, Code, Bug, Filter, ChevronRight } from 'lucide-react';
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
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchUserProfile();
    fetchChallenges();
  }, [user, navigate]);

  const fetchUserProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (!error && data) {
      setUserProfile(data);
    }
  };

  const fetchChallenges = async () => {
    // Mock data for now - will be replaced with real Supabase data
    const mockChallenges: Challenge[] = [
      {
        id: '1',
        title: 'E-commerce Login Testing',
        description: 'Test the login functionality of an e-commerce application',
        difficulty: 'easy',
        type: 'manual',
        tags: ['Login', 'Authentication', 'E-commerce'],
        points: 50,
        app_url: 'https://demo-shop.example.com'
      },
      {
        id: '2',
        title: 'Shopping Cart Automation',
        description: 'Write Selenium automation for shopping cart functionality',
        difficulty: 'medium',
        type: 'automation',
        tags: ['Cart', 'Selenium', 'Java'],
        points: 100
      },
      {
        id: '3',
        title: 'Form Validation Testing',
        description: 'Comprehensive testing of form validation rules',
        difficulty: 'hard',
        type: 'manual',
        tags: ['Forms', 'Validation', 'Edge Cases'],
        points: 150
      }
    ];
    setChallenges(mockChallenges);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {userProfile?.full_name || 'Tester'}! 👋
            </h1>
            <p className="text-gray-600">Ready to sharpen your QA skills today?</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Points</p>
                    <p className="text-2xl font-bold text-purple-600">{userProfile?.skill_score || 0}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Challenges Completed</p>
                    <p className="text-2xl font-bold text-blue-600">0</p>
                  </div>
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Streak</p>
                    <p className="text-2xl font-bold text-green-600">0</p>
                  </div>
                  <div className="text-green-600">🔥</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Challenges Section Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Challenges</h2>
            <p className="text-gray-600">Choose a challenge to start practicing your testing skills</p>
          </div>

          {/* Challenges Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/challenge/${challenge.id}`)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {challenge.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Points: {challenge.points}</span>
                    <Button size="sm">Start Challenge</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
