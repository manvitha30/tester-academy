import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, Users, Code, Bug, Trophy, Star, ArrowRight, Mail, Linkedin, Twitter, LogOut, User } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [signupCount, setSignupCount] = useState(42);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    fetchSignupCount();
  }, []);

  const fetchSignupCount = async () => {
    try {
      const { data, error } = await supabase
        .from('email_signups')
        .select('signup_number', { count: 'exact' });
      
      if (!error && data) {
        setSignupCount(data.length + 42); // Adding base count for social proof
      }
    } catch (error) {
      console.log('Error fetching signup count:', error);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email",
        description: "We need your email to send you early access updates.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase.rpc('handle_email_signup', {
        user_email: email
      });

      if (error) {
        if (error.message.includes('duplicate key value')) {
          toast({
            title: "Already signed up!",
            description: "This email is already on our waitlist.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
        return;
      }

      const signupData = data[0];
      setSignupCount(prev => prev + 1);
      
      if (signupData.gets_early_access) {
        toast({
          title: "🎉 Congratulations!",
          description: `You're #${signupData.signup_num} on the waitlist and qualify for FREE premium access!`,
        });
      } else {
        toast({
          title: "🎉 Welcome to the waitlist!",
          description: "You're in! We'll notify you when early access opens.",
        });
      }
      setEmail('');
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

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
      {user && (
        <nav className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-600" />
              <span className="font-bold text-gray-900">Tester Academy</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                {user.email}
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </nav>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-sm font-medium animate-pulse">
            🔥 Early Access - First 50 get Premium FREE
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            The Hands-On QA Learning Platform You Wish Existed Sooner
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Master Manual Testing & Selenium with Java by solving real-world QA challenges.<br />
            <span className="font-semibold text-purple-600">Get job-ready through practice—not PDFs.</span>
          </p>

          {!user ? (
            <>
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 text-lg border-2 border-purple-200 focus:border-purple-500"
                />
                <Button 
                  type="submit"
                  className="h-12 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Join Waitlist <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  No spam, just skill
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Free early access
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Premium credits included
                </div>
              </div>

              <div className="mb-8">
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold text-purple-600">{signupCount}</span> testers already joined
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/auth')}
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  Already have an account? Sign In
                </Button>
              </div>
            </>
          ) : (
            <div className="mb-8">
              <p className="text-xl text-gray-700 mb-6">
                Welcome back! Your QA learning journey continues here.
              </p>
              <Button 
                className="h-12 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Continue Learning <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
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

      {/* Urgency Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">🕒 Limited Early Access – Join Before We Launch</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <CheckCircle className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Free 30-day Premium Pass</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <CheckCircle className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Bonus credits for challenges</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <CheckCircle className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Priority access to new features</h3>
            </div>
          </div>
          
          <p className="text-xl mb-8">👉 Don't just watch others test. Become the tester companies want.</p>
          
          {!user ? (
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 text-lg bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
              />
              <Button 
                type="submit"
                className="h-12 px-8 bg-white text-purple-600 hover:bg-gray-100 font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Join Waitlist <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          ) : (
            <Button 
              className="h-12 px-8 bg-white text-purple-600 hover:bg-gray-100 font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Start Learning <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Learn QA Like a Pro?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Start your journey with hands-on, challenge-based learning.
          </p>
          
          {!user ? (
            <>
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 text-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-purple-500"
                />
                <Button 
                  type="submit"
                  className="h-12 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Join the Waitlist – It's Free
                </Button>
              </form>
              
              <p className="text-gray-400">No spam. Just skill.</p>
            </>
          ) : (
            <Button 
              className="h-12 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Continue Your Journey
            </Button>
          )}
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
