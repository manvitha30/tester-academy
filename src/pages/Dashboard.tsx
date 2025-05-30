
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { Target, Trophy, Code, Bug, Filter, ChevronRight, ExternalLink } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'manual' | 'automation';
  tags: string[];
  points: number;
}

interface Application {
  id: string;
  name: string;
  description: string;
  url: string;
  challenges: Challenge[];
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchUserProfile();
    fetchApplications();
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

  const fetchApplications = async () => {
    // Mock data organized by applications
    const mockApplications: Application[] = [
      {
        id: 'owasp-juice-shop',
        name: 'OWASP Juice Shop',
        description: 'An intentionally insecure web application for security training',
        url: 'https://juice-shop.herokuapp.com',
        challenges: [
          {
            id: 'juice-shop-1',
            title: 'SQL Injection Discovery',
            description: 'Find and exploit SQL injection vulnerabilities in the login form',
            difficulty: 'easy',
            type: 'manual',
            tags: ['SQL Injection', 'Security', 'Login'],
            points: 75
          },
          {
            id: 'juice-shop-2',
            title: 'XSS Attack Vector',
            description: 'Identify and demonstrate cross-site scripting vulnerabilities',
            difficulty: 'medium',
            type: 'manual',
            tags: ['XSS', 'Security', 'JavaScript'],
            points: 100
          },
          {
            id: 'juice-shop-3',
            title: 'Authentication Bypass',
            description: 'Test authentication mechanisms and find bypass methods',
            difficulty: 'hard',
            type: 'manual',
            tags: ['Authentication', 'Security', 'Bypass'],
            points: 150
          }
        ]
      },
      {
        id: 'orangehrm',
        name: 'OrangeHRM (Open Source)',
        description: 'Human Resource Management system for comprehensive HR testing',
        url: 'https://opensource-demo.orangehrmlive.com',
        challenges: [
          {
            id: 'orangehrm-1',
            title: 'Employee Management Testing',
            description: 'Test employee CRUD operations and data validation',
            difficulty: 'easy',
            type: 'manual',
            tags: ['CRUD', 'HR', 'Data Validation'],
            points: 60
          },
          {
            id: 'orangehrm-2',
            title: 'Leave Management Automation',
            description: 'Automate leave request and approval workflow testing',
            difficulty: 'medium',
            type: 'automation',
            tags: ['Workflow', 'Automation', 'Leave Management'],
            points: 120
          },
          {
            id: 'orangehrm-3',
            title: 'Payroll System Integration',
            description: 'Test payroll calculations and report generation',
            difficulty: 'hard',
            type: 'manual',
            tags: ['Payroll', 'Reports', 'Integration'],
            points: 180
          }
        ]
      },
      {
        id: 'spring-petclinic',
        name: 'Spring PetClinic',
        description: 'Sample Spring Boot application for veterinary clinic management',
        url: 'https://petclinic.springframework.org',
        challenges: [
          {
            id: 'petclinic-1',
            title: 'Pet Registration Flow',
            description: 'Test the complete pet registration and owner assignment process',
            difficulty: 'easy',
            type: 'manual',
            tags: ['Registration', 'Forms', 'Validation'],
            points: 50
          },
          {
            id: 'petclinic-2',
            title: 'Veterinarian Scheduling',
            description: 'Test appointment scheduling and veterinarian assignment',
            difficulty: 'medium',
            type: 'automation',
            tags: ['Scheduling', 'Calendar', 'Automation'],
            points: 100
          }
        ]
      }
    ];
    setApplications(mockApplications);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalChallenges = applications.reduce((total, app) => total + app.challenges.length, 0);

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
                    <p className="text-sm text-gray-600">Available Challenges</p>
                    <p className="text-2xl font-bold text-blue-600">{totalChallenges}</p>
                  </div>
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Applications</p>
                    <p className="text-2xl font-bold text-green-600">{applications.length}</p>
                  </div>
                  <div className="text-green-600">🎯</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Applications Section Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Testing Applications</h2>
            <p className="text-gray-600">Choose from real-world applications to practice your testing skills</p>
          </div>

          {/* Applications Grid */}
          <div className="space-y-6">
            {applications.map((app) => (
              <Card key={app.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{app.name}</CardTitle>
                      <p className="text-gray-600 mt-1">{app.description}</p>
                    </div>
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open App
                    </a>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="secondary">{app.challenges.length} Challenges</Badge>
                    <Badge variant="outline">
                      {app.challenges.reduce((total, challenge) => total + challenge.points, 0)} Total Points
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                    {app.challenges.map((challenge) => (
                      <Card 
                        key={challenge.id} 
                        className="hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                        onClick={() => navigate(`/challenge/${challenge.id}`)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-base">{challenge.title}</CardTitle>
                            <ChevronRight className="w-4 h-4 text-gray-400 mt-1" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getDifficultyColor(challenge.difficulty)}>
                              {challenge.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {challenge.type === 'manual' ? <Bug className="w-3 h-3 mr-1" /> : <Code className="w-3 h-3 mr-1" />}
                              {challenge.type}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {challenge.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {challenge.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{challenge.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{challenge.points} points</span>
                            <Button size="sm">Start</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
