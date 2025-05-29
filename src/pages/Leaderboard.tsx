
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Trophy, Medal, Award } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  challengesCompleted: number;
  isCurrentUser?: boolean;
}

const Leaderboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchLeaderboard();
  }, [user, navigate]);

  const fetchLeaderboard = async () => {
    // Mock data for now - will be replaced with real Supabase data
    const mockLeaderboard: LeaderboardEntry[] = [
      { rank: 1, username: 'qa_master_99', points: 2850, challengesCompleted: 47 },
      { rank: 2, username: 'test_ninja', points: 2640, challengesCompleted: 42 },
      { rank: 3, username: 'selenium_pro', points: 2435, challengesCompleted: 39 },
      { rank: 4, username: 'bug_hunter', points: 2210, challengesCompleted: 35 },
      { rank: 5, username: 'automation_ace', points: 1995, challengesCompleted: 31 },
      { rank: 6, username: 'quality_guru', points: 1820, challengesCompleted: 28 },
      { rank: 7, username: 'test_warrior', points: 1650, challengesCompleted: 25 },
      { rank: 8, username: 'qa_champion', points: 1485, challengesCompleted: 22 },
      { rank: 9, username: 'debug_master', points: 1320, challengesCompleted: 19 },
      { rank: 10, username: 'code_tester', points: 1150, challengesCompleted: 16 },
    ];
    setLeaderboard(mockLeaderboard);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank <= 3) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
    if (rank <= 10) return 'bg-gradient-to-r from-purple-500 to-blue-600 text-white';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
            <p className="text-gray-600">See how you rank against other QA testers!</p>
          </div>

          {/* Top 3 Podium */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {leaderboard.slice(0, 3).map((entry, index) => (
              <Card key={entry.rank} className={`${
                entry.rank === 1 ? 'ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100' :
                entry.rank === 2 ? 'ring-2 ring-gray-300 bg-gradient-to-br from-gray-50 to-gray-100' :
                'ring-2 ring-amber-300 bg-gradient-to-br from-amber-50 to-amber-100'
              }`}>
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    {getRankIcon(entry.rank)}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{entry.username}</h3>
                  <p className="text-2xl font-bold text-purple-600 mb-1">{entry.points}</p>
                  <p className="text-sm text-gray-600">{entry.challengesCompleted} challenges</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Full Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Testers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      entry.isCurrentUser
                        ? 'bg-purple-50 border-purple-200'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(entry.rank)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900">{entry.username}</h3>
                          {entry.rank <= 3 && (
                            <Badge className={getRankBadgeColor(entry.rank)}>
                              Top {entry.rank}
                            </Badge>
                          )}
                          {entry.isCurrentUser && (
                            <Badge variant="outline">You</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {entry.challengesCompleted} challenges completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-purple-600">{entry.points}</p>
                      <p className="text-sm text-gray-600">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
