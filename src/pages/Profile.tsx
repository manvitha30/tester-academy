
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Trophy, Target, Calendar, Award } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchUserProfile();
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

  const badges = [
    { name: 'First Steps', description: 'Completed your first challenge', earned: false },
    { name: 'Manual Tester', description: 'Completed 5 manual testing challenges', earned: false },
    { name: 'Automation Expert', description: 'Completed 5 automation challenges', earned: false },
    { name: 'Streak Master', description: 'Maintained a 7-day streak', earned: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

          {/* Profile Overview */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Full Name</label>
                    <p className="font-medium">{userProfile?.full_name || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="font-medium">{userProfile?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Member Since</label>
                    <p className="font-medium">
                      {userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Account Type</label>
                    <Badge variant={userProfile?.is_premium ? "default" : "secondary"}>
                      {userProfile?.is_premium ? 'Premium' : 'Free'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-purple-600" />
                      <span>Total Points</span>
                    </div>
                    <span className="font-bold text-purple-600">{userProfile?.skill_score || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <span>Challenges Completed</span>
                    </div>
                    <span className="font-bold">{completedChallenges.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <span>Current Streak</span>
                    </div>
                    <span className="font-bold">0 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-600" />
                      <span>Badges Earned</span>
                    </div>
                    <span className="font-bold">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Badges Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      badge.earned
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-gray-50 border-gray-200 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        badge.earned ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        <Award className={`w-5 h-5 ${
                          badge.earned ? 'text-yellow-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-medium">{badge.name}</h3>
                        <p className="text-sm text-gray-600">{badge.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Completed Challenges */}
          <Card>
            <CardHeader>
              <CardTitle>Completed Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              {completedChallenges.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No challenges completed yet. Start your QA journey today!
                </p>
              ) : (
                <div className="space-y-3">
                  {/* This will be populated with actual completed challenges */}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
