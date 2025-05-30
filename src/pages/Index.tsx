import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, Users, Code, Bug, Trophy, Star, ArrowRight, Mail, Linkedin, Twitter, LogOut, User, Play, Check, Zap, Crown } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    
    // Redirect authenticated users to dashboard
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const features = [
    {
      icon: <Bug className="w-6 h-6" />,
      title: "Test Real Buggy Apps",
      description: "Practice on actual broken applications, not toy examples"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Write Automation Code",
      description: "Master Selenium Java with hands-on coding challenges"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Earn Badges & Points",
      description: "Gamified learning that keeps you motivated and engaged"
    }
  ];

  const learnerTypes = [
    {
      emoji: "👩‍🎓",
      title: "College Graduates & Freshers",
      description: "Build your QA portfolio and crack your first job."
    },
    {
      emoji: "💼",
      title: "Manual Testers",
      description: "Add Selenium Java to your skillset and get that raise."
    },
    {
      emoji: "🚀",
      title: "Bootcampers & Career Switchers",
      description: "Learn QA by doing, not watching."
    }
  ];

  const steps = [
    "Pick a QA Challenge (Manual or Selenium)",
    "Test a real application or write automation scripts",
    "Get AI-powered feedback instantly",
    "Earn points, unlock badges, and grow your skill score",
    "Build a shareable QA portfolio recruiters love"
  ];

  const practices = [
    "🐞 Real-world buggy apps (Login, Search, Cart, Admin Dashboards)",
    "🧪 Manual test case writing, bug reporting",
    "💻 Selenium Java automation: locators, waits, scripts",
    "📋 Resume-worthy QA artifacts (PDF-ready)"
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "5 challenges per month",
        "Basic feedback",
        "Community access",
        "Basic portfolio"
      ],
      icon: <Zap className="w-6 h-6" />,
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "For serious learners",
      features: [
        "Unlimited challenges",
        "AI-powered detailed feedback",
        "Priority support",
        "Advanced portfolio",
        "Certificate of completion",
        "Job placement assistance"
      ],
      icon: <Crown className="w-6 h-6" />,
      popular: true
    },
    {
      name: "Team",
      price: "$49",
      period: "/month",
      description: "For organizations",
      features: [
        "Everything in Pro",
        "Team management",
        "Custom challenges",
        "Analytics dashboard",
        "Dedicated support",
        "Bulk certificates"
      ],
      icon: <Users className="w-6 h-6" />,
      popular: false
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-600" />
            <span className="font-bold text-gray-900">Tester Academy</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  {user.email}
                </div>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-sm font-medium animate-pulse">
            🔥 Limited Time - First 100 users get 30% off Pro plan
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            Master QA Testing Through Real Challenges
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Learn Manual Testing & Selenium with Java by solving real-world QA challenges.<br />
            <span className="font-semibold text-purple-600">Get job-ready through practice—not theory.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={() => navigate('/auth')}
              className="h-12 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Start Learning Free <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              variant="outline"
              className="h-12 px-8 border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Play className="mr-2 w-4 h-4" />
              Watch Demo
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Start learning immediately
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Built by QA experts
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See Tester Academy in Action
            </h2>
            <p className="text-xl text-gray-600">
              Watch how real QA professionals use our platform to level up their skills
            </p>
          </div>
          
          <div className="relative bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 shadow-xl">
            <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>
              <Button 
                size="lg"
                className="relative z-10 bg-white text-gray-900 hover:bg-gray-100 rounded-full w-20 h-20 p-0"
              >
                <Play className="w-8 h-8 ml-1" />
              </Button>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm opacity-80">Demo: Testing a Login System</p>
                <p className="text-xs opacity-60">2:34 mins</p>
              </div>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <div className="text-2xl font-bold text-purple-600">5min</div>
                <div className="text-sm text-gray-600">Average challenge time</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">User satisfaction rate</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-green-600">2x</div>
                <div className="text-sm text-gray-600">Faster skill development</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Future-Proof QA Careers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tired of outdated tutorials and theory-heavy courses?<br />
              Tester Academy gives you what employers actually care about—<span className="font-semibold text-purple-600">real experience</span>.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-purple-50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600">
              Start free and upgrade when you're ready to accelerate your QA career
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-purple-500 shadow-xl scale-105' : 'shadow-lg'} hover:shadow-xl transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-gray-900">
                    {plan.price}
                    {plan.period && <span className="text-lg text-gray-600">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50'}`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => navigate('/auth')}
                  >
                    {plan.name === 'Starter' ? 'Start Free' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Who Is It For?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {learnerTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{type.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{type.title}</h3>
                <p className="text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Learn QA the Right Way – By Breaking Things
            </h2>
            <p className="text-xl text-gray-600">Here's how Tester Academy works:</p>
          </div>
          
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-lg text-gray-700 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Practice Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What You'll Practice On</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {practices.map((practice, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <p className="text-lg text-gray-700">{practice}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Testers Love It</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-purple-50">
              <CardContent className="p-0">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "This platform gives the experience I couldn't get from YouTube or Udemy. It feels like working on real bugs in a company!"
                </p>
                <p className="text-purple-600 font-semibold">— Early QA Learner</p>
              </CardContent>
            </Card>
            
            <Card className="p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-0">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "I finally understood how to write good bug reports and test cases. And seeing them graded was a game-changer."
                </p>
                <p className="text-blue-600 font-semibold">— Bootcamp Graduate</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your QA Career?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of testers who've accelerated their careers with hands-on practice
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/auth')}
              className="h-12 px-8 bg-white text-purple-600 hover:bg-gray-100 font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Start Learning Free <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              variant="outline"
              className="h-12 px-8 border-white text-white hover:bg-white/10"
            >
              <Play className="mr-2 w-4 h-4" />
              Watch Demo
            </Button>
          </div>
          
          <p className="mt-6 text-purple-200 text-sm">No spam. No long courses. Just skills that get you hired.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xl font-semibold mb-6 text-purple-400">Built by testers, for testers.</p>
          
          <div className="flex justify-center gap-8 mb-6">
            <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
              Contact
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
              Twitter
            </a>
          </div>
          
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
