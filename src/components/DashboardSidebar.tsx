
import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from 'react-router-dom';
import { Target, Trophy, User, Users, LogOut, Home } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const DashboardSidebar = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/challenges', icon: Target, label: 'Challenges' },
    { path: '/profile', icon: User, label: 'My Profile' },
    { path: '/leaderboard', icon: Users, label: 'Leaderboard' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Target className="w-8 h-8 text-purple-600" />
          <span className="text-xl font-bold text-gray-900">Tester Academy</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Button
              key={path}
              variant={isActive(path) ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigate(path)}
            >
              <Icon className="w-4 h-4 mr-3" />
              {label}
            </Button>
          ))}
        </div>
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-gray-200">
        <Button variant="outline" className="w-full" onClick={handleSignOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
