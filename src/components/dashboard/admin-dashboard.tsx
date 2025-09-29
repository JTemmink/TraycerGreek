'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Award,
  UserCheck,
  UserX,
  BookMarked,
  Target,
  Calendar,
  Settings,
  Download,
  Filter
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalLessons: number;
  completedLessons: number;
  totalQuizzes: number;
  averageScore: number;
  userGrowth: number;
  engagement: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  level: string;
  lessonsCompleted: number;
  lastActive: string;
  status: 'active' | 'inactive';
}

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalLessons: 0,
    completedLessons: 0,
    totalQuizzes: 0,
    averageScore: 0,
    userGrowth: 0,
    engagement: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading admin data
    const loadAdminData = async () => {
      setLoading(true);
      
      // Mock data - replace with actual API calls
      setTimeout(() => {
        setStats({
          totalUsers: 1247,
          activeUsers: 892,
          totalLessons: 45,
          completedLessons: 15678,
          totalQuizzes: 89,
          averageScore: 78.5,
          userGrowth: 12.5,
          engagement: 85.2,
        });

        setUsers([
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'student',
            level: 'intermediate',
            lessonsCompleted: 15,
            lastActive: '2 hours ago',
            status: 'active',
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'student',
            level: 'beginner',
            lessonsCompleted: 8,
            lastActive: '1 day ago',
            status: 'active',
          },
          {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            role: 'instructor',
            level: 'advanced',
            lessonsCompleted: 42,
            lastActive: '3 hours ago',
            status: 'active',
          },
        ]);

        setLoading(false);
      }, 1000);
    };

    loadAdminData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage users, content, and platform analytics
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{stats.userGrowth}% this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{stats.completedLessons.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Lessons Completed</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {stats.totalLessons} total lessons
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{stats.averageScore}%</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Across {stats.totalQuizzes} quizzes
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Management */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>User Management</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    Add User
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{user.lessonsCompleted} lessons</div>
                        <div className="text-xs text-muted-foreground">{user.lastActive}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                        <Badge variant="outline">
                          {user.level}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookMarked className="h-5 w-5" />
                <span>Content Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-greek-600">45</div>
                    <div className="text-sm text-muted-foreground">Total Lessons</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-olive-600">89</div>
                    <div className="text-sm text-muted-foreground">Total Quizzes</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Content Completion Rate</span>
                    <span>78.5%</span>
                  </div>
                  <Progress value={78.5} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>User Engagement</span>
                    <span>85.2%</span>
                  </div>
                  <Progress value={85.2} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Platform Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Platform Health</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Server Uptime</span>
                  <span className="text-green-600">99.9%</span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Response Time</span>
                  <span className="text-green-600">120ms</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Error Rate</span>
                  <span className="text-green-600">0.1%</span>
                </div>
                <Progress value={99} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>New user registered</span>
                  <span className="text-muted-foreground ml-auto">2m ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Lesson completed</span>
                  <span className="text-muted-foreground ml-auto">5m ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Quiz submitted</span>
                  <span className="text-muted-foreground ml-auto">12m ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Achievement earned</span>
                  <span className="text-muted-foreground ml-auto">1h ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">
                <BookOpen className="h-4 w-4 mr-2" />
                Manage Lessons
              </Button>
              <Button variant="outline" className="w-full">
                <Award className="h-4 w-4 mr-2" />
                Manage Quizzes
              </Button>
              <Button variant="outline" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                User Reports
              </Button>
              <Button variant="outline" className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
