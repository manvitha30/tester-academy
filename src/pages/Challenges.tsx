
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Code, Bug, ChevronRight, ExternalLink } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'manual' | 'automation';
  tags: string[];
  points: number;
  appName: string;
  appUrl: string;
  completed?: boolean;
}

interface Application {
  id: string;
  name: string;
  description: string;
  url: string;
  challenges: Challenge[];
}

const Challenges = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'manual' | 'automation'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [filterApp, setFilterApp] = useState<string>('all');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchApplications();
  }, [user, navigate]);

  const fetchApplications = async () => {
    // Extended mock data with all 5 applications
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
            points: 75,
            appName: 'OWASP Juice Shop',
            appUrl: 'https://juice-shop.herokuapp.com'
          },
          {
            id: 'juice-shop-2',
            title: 'XSS Attack Vector',
            description: 'Identify and demonstrate cross-site scripting vulnerabilities',
            difficulty: 'medium',
            type: 'manual',
            tags: ['XSS', 'Security', 'JavaScript'],
            points: 100,
            appName: 'OWASP Juice Shop',
            appUrl: 'https://juice-shop.herokuapp.com'
          },
          {
            id: 'juice-shop-3',
            title: 'Authentication Bypass',
            description: 'Test authentication mechanisms and find bypass methods',
            difficulty: 'hard',
            type: 'manual',
            tags: ['Authentication', 'Security', 'Bypass'],
            points: 150,
            appName: 'OWASP Juice Shop',
            appUrl: 'https://juice-shop.herokuapp.com'
          },
          {
            id: 'juice-shop-4',
            title: 'CSRF Protection Testing',
            description: 'Test Cross-Site Request Forgery protection mechanisms',
            difficulty: 'medium',
            type: 'automation',
            tags: ['CSRF', 'Security', 'Automation'],
            points: 110,
            appName: 'OWASP Juice Shop',
            appUrl: 'https://juice-shop.herokuapp.com'
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
            points: 60,
            appName: 'OrangeHRM (Open Source)',
            appUrl: 'https://opensource-demo.orangehrmlive.com'
          },
          {
            id: 'orangehrm-2',
            title: 'Leave Management Automation',
            description: 'Automate leave request and approval workflow testing',
            difficulty: 'medium',
            type: 'automation',
            tags: ['Workflow', 'Automation', 'Leave Management'],
            points: 120,
            appName: 'OrangeHRM (Open Source)',
            appUrl: 'https://opensource-demo.orangehrmlive.com'
          },
          {
            id: 'orangehrm-3',
            title: 'Payroll System Integration',
            description: 'Test payroll calculations and report generation',
            difficulty: 'hard',
            type: 'manual',
            tags: ['Payroll', 'Reports', 'Integration'],
            points: 180,
            appName: 'OrangeHRM (Open Source)',
            appUrl: 'https://opensource-demo.orangehrmlive.com'
          },
          {
            id: 'orangehrm-4',
            title: 'Performance Evaluation Testing',
            description: 'Test employee performance evaluation and review cycles',
            difficulty: 'medium',
            type: 'manual',
            tags: ['Performance', 'Evaluation', 'Reviews'],
            points: 90,
            appName: 'OrangeHRM (Open Source)',
            appUrl: 'https://opensource-demo.orangehrmlive.com'
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
            points: 50,
            appName: 'Spring PetClinic',
            appUrl: 'https://petclinic.springframework.org'
          },
          {
            id: 'petclinic-2',
            title: 'Veterinarian Scheduling',
            description: 'Test appointment scheduling and veterinarian assignment',
            difficulty: 'medium',
            type: 'automation',
            tags: ['Scheduling', 'Calendar', 'Automation'],
            points: 100,
            appName: 'Spring PetClinic',
            appUrl: 'https://petclinic.springframework.org'
          },
          {
            id: 'petclinic-3',
            title: 'Medical Records Management',
            description: 'Test creation and management of pet medical records',
            difficulty: 'hard',
            type: 'manual',
            tags: ['Medical Records', 'Data Management', 'History'],
            points: 140,
            appName: 'Spring PetClinic',
            appUrl: 'https://petclinic.springframework.org'
          }
        ]
      },
      {
        id: 'parabank',
        name: 'ParaBank (Banking Demo)',
        description: 'Banking application for financial transaction testing',
        url: 'https://parabank.parasoft.com',
        challenges: [
          {
            id: 'parabank-1',
            title: 'Account Registration Testing',
            description: 'Test new customer account creation and validation',
            difficulty: 'easy',
            type: 'manual',
            tags: ['Registration', 'Banking', 'Validation'],
            points: 65,
            appName: 'ParaBank (Banking Demo)',
            appUrl: 'https://parabank.parasoft.com'
          },
          {
            id: 'parabank-2',
            title: 'Fund Transfer Automation',
            description: 'Automate testing of money transfer between accounts',
            difficulty: 'medium',
            type: 'automation',
            tags: ['Transfer', 'Banking', 'Automation'],
            points: 130,
            appName: 'ParaBank (Banking Demo)',
            appUrl: 'https://parabank.parasoft.com'
          },
          {
            id: 'parabank-3',
            title: 'Transaction History Validation',
            description: 'Test transaction history accuracy and reporting',
            difficulty: 'hard',
            type: 'manual',
            tags: ['History', 'Reports', 'Banking'],
            points: 160,
            appName: 'ParaBank (Banking Demo)',
            appUrl: 'https://parabank.parasoft.com'
          },
          {
            id: 'parabank-4',
            title: 'Loan Application Process',
            description: 'Test the complete loan application and approval workflow',
            difficulty: 'hard',
            type: 'automation',
            tags: ['Loan', 'Workflow', 'Banking'],
            points: 170,
            appName: 'ParaBank (Banking Demo)',
            appUrl: 'https://parabank.parasoft.com'
          }
        ]
      },
      {
        id: 'demo-web-shop',
        name: 'Demo Web Shop (NopCommerce)',
        description: 'E-commerce platform for comprehensive online shopping testing',
        url: 'https://demo.nopcommerce.com',
        challenges: [
          {
            id: 'demo-shop-1',
            title: 'Product Search and Filtering',
            description: 'Test product search functionality and filter options',
            difficulty: 'easy',
            type: 'manual',
            tags: ['Search', 'Filters', 'E-commerce'],
            points: 55,
            appName: 'Demo Web Shop (NopCommerce)',
            appUrl: 'https://demo.nopcommerce.com'
          },
          {
            id: 'demo-shop-2',
            title: 'Shopping Cart Automation',
            description: 'Automate add to cart, update quantity, and checkout process',
            difficulty: 'medium',
            type: 'automation',
            tags: ['Cart', 'Checkout', 'E-commerce'],
            points: 105,
            appName: 'Demo Web Shop (NopCommerce)',
            appUrl: 'https://demo.nopcommerce.com'
          },
          {
            id: 'demo-shop-3',
            title: 'Payment Gateway Testing',
            description: 'Test various payment methods and error scenarios',
            difficulty: 'hard',
            type: 'manual',
            tags: ['Payment', 'Gateway', 'Error Handling'],
            points: 155,
            appName: 'Demo Web Shop (NopCommerce)',
            appUrl: 'https://demo.nopcommerce.com'
          },
          {
            id: 'demo-shop-4',
            title: 'Order Management System',
            description: 'Test order placement, tracking, and management features',
            difficulty: 'medium',
            type: 'manual',
            tags: ['Orders', 'Tracking', 'Management'],
            points: 85,
            appName: 'Demo Web Shop (NopCommerce)',
            appUrl: 'https://demo.nopcommerce.com'
          },
          {
            id: 'demo-shop-5',
            title: 'User Account Management',
            description: 'Test user registration, profile updates, and account features',
            difficulty: 'easy',
            type: 'automation',
            tags: ['Account', 'Profile', 'User Management'],
            points: 70,
            appName: 'Demo Web Shop (NopCommerce)',
            appUrl: 'https://demo.nopcommerce.com'
          }
        ]
      }
    ];
    setApplications(mockApplications);
  };

  // Flatten all challenges for filtering
  const allChallenges: Challenge[] = applications.flatMap(app => 
    app.challenges.map(challenge => ({
      ...challenge,
      appName: app.name,
      appUrl: app.url
    }))
  );

  const filteredChallenges = allChallenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         challenge.appName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || challenge.type === filterType;
    const matchesDifficulty = filterDifficulty === 'all' || challenge.difficulty === filterDifficulty;
    const matchesApp = filterApp === 'all' || challenge.appName === filterApp;
    
    return matchesSearch && matchesType && matchesDifficulty && matchesApp;
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
            <p className="text-gray-600">Practice your QA skills with real-world testing scenarios across multiple applications</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search challenges or applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={filterApp}
                    onChange={(e) => setFilterApp(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Applications</option>
                    {applications.map((app) => (
                      <option key={app.id} value={app.name}>{app.name}</option>
                    ))}
                  </select>
                  
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
              Showing {filteredChallenges.length} of {allChallenges.length} challenges across {applications.length} applications
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
                  <div className="text-sm text-blue-600 font-medium">{challenge.appName}</div>
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
