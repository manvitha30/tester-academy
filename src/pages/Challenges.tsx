
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Code, Bug, ChevronRight } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'manual' | 'automation';
  tags: string[];
  points: number;
  completed?: boolean;
}

const Challenges = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'manual' | 'automation'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchChallenges();
  }, [user, navigate]);

  const fetchChallenges = async () => {
    // Extended mock data
    const mockChallenges: Challenge[] = [
      {
        id: '1',
        title: 'E-commerce Login Testing',
        description: 'Test the login functionality of an e-commerce application',
        difficulty: 'easy',
        type: 'manual',
        tags: ['Login', 'Authentication', 'E-commerce'],
        points: 50
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
      },
      {
        id: '4',
        title: 'API Testing with Postman',
        description: 'Test REST API endpoints for user management',
        difficulty: 'medium',
        type: 'manual',
        tags: ['API', 'REST', 'Postman'],
        points: 120
      },
      {
        id: '5',
        title: 'Mobile App Testing',
        description: 'Test mobile application on different devices',
        difficulty: 'hard',
        type: 'manual',
        tags: ['Mobile', 'Cross-platform', 'UI/UX'],
        points: 180
      },
      {
        id: '6',
        title: 'Database Testing Automation',
        description: 'Automate database validation using SQL queries',
        difficulty: 'hard',
        type: 'automation',
        tags: ['Database', 'SQL', 'Automation'],
        points: 200
      }
    ];
    setChallenges(mockChallenges);
  };

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || challenge.type === filterType;
    const matchesDifficulty = filterDifficulty === 'all' || challenge.difficulty === filterDifficulty;
    
    return matchesSearch && matchesType && matchesDifficulty;
  });

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Challenges</h1>
            <p className="text-gray-600">Practice your QA skills with real-world testing scenarios</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search challenges..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as 'all' | 'manual' | 'automation')}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="manual">Manual Testing</option>
                    <option value="automation">Automation</option>
                  </select>
                  
                  <select
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value as 'all' | 'easy' | 'medium' | 'hard')}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredChallenges.length} of {challenges.length} challenges
            </p>
          </div>

          {/* Challenges Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <Card 
                key={challenge.id} 
                className={`hover:shadow-lg transition-shadow cursor-pointer ${
                  challenge.completed ? 'ring-2 ring-green-200 bg-green-50' : ''
                }`}
                onClick={() => navigate(`/challenge/${challenge.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <div className="flex items-center gap-1">
                      {challenge.completed && (
                        <Badge className="bg-green-100 text-green-800">✓ Completed</Badge>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      {challenge.type === 'manual' ? <Bug className="w-3 h-3 mr-1" /> : <Code className="w-3 h-3 mr-1" />}
                      {challenge.type}
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
                    <Button size="sm" variant={challenge.completed ? "outline" : "default"}>
                      {challenge.completed ? 'Review' : 'Start Challenge'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredChallenges.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No challenges found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Challenges;
