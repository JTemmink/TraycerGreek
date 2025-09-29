'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Target, 
  Award, 
  TrendingUp, 
  Clock, 
  Calendar,
  PlayCircle,
  CheckCircle,
  Star,
  Flame,
  BarChart3,
  Trophy,
  BookMarked
} from 'lucide-react';
import { useLearningStore } from '@/store/learning-store';
import { useAuthStore } from '@/store/auth-store';
import { getLessons } from '@/lib/content';

export function StudentDashboard() {
  const { userProgress, userStats, recommendations } = useLearningStore();
  const { user, profile } = useAuthStore();
  const [recentLessons, setRecentLessons] = useState<any[]>([]);
  const [upcomingLessons, setUpcomingLessons] = useState<any[]>([]);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const lessons = await getLessons();
        setRecentLessons(lessons.slice(0, 3));
        setUpcomingLessons(lessons.slice(3, 6));
      } catch (error) {
        console.error('Error loading lessons:', error);
      }
    };

    loadLessons();
  }, []);

  if (!user || !userStats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const overallProgress = userStats.lessons_completed / (userStats.lessons_completed + userStats.lessons_in_progress) * 100;
  const currentStreak = userStats.current_streak || 0;
  const totalPoints = userStats.total_points || 0;
  const level = Math.floor(Math.sqrt(totalPoints / 1000)) + 1;
  const pointsToNextLevel = Math.pow(level, 2) * 1000 - totalPoints;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-greek-50 to-olive-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Welcome back, {profile?.preferred_name || profile?.first_name}!
            </h2>
            <p className="text-muted-foreground mt-1">
              Ready to continue your Ancient Greek journey?
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-greek-600">Level {level}</div>
            <div className="text-sm text-muted-foreground">
              {pointsToNextLevel} points to next level
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{userStats.lessons_completed}</div>
                <div className="text-sm text-muted-foreground">Lessons Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Flame className="h-4 w-4 text-gold-500" />
              <div>
                <div className="text-2xl font-bold text-gold-600">{currentStreak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{userStats.perfect_quizzes || 0}</div>
                <div className="text-sm text-muted-foreground">Perfect Quizzes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{userStats.vocabulary_learned || 0}</div>
                <div className="text-sm text-muted-foreground">Words Learned</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overall Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Learning Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} className="h-3" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-greek-600">
                    {userStats.lessons_completed}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {userStats.lessons_in_progress || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-muted-foreground">
                    {Math.floor((userStats.total_study_time || 0) / 60)}
                  </div>
                  <div className="text-sm text-muted-foreground">Hours Studied</div>
                </div>
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
              <div className="space-y-4">
                {userProgress?.slice(0, 5).map((progress, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                    <div className="flex-shrink-0">
                      {progress.completed_at ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <PlayCircle className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">
                        {progress.lesson?.title || 'Lesson'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {progress.completed_at ? 'Completed' : 'In Progress'} • 
                        {progress.time_spent || 0} min
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Badge variant={progress.completed_at ? 'default' : 'secondary'}>
                        {progress.score || 0}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Lessons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Recommended for You</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations?.slice(0, 3).map((rec, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-greek-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-greek-600" />
                      </div>
                      <div>
                        <div className="font-medium">{rec.title}</div>
                        <div className="text-sm text-muted-foreground">{rec.description}</div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-greek-600 hover:bg-greek-700">
                      Start
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Level Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Level Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-greek-600">Level {level}</div>
                <div className="text-sm text-muted-foreground">
                  {totalPoints} total points
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>To Next Level</span>
                  <span>{pointsToNextLevel} points</span>
                </div>
                <Progress 
                  value={(totalPoints % 1000) / 1000 * 100} 
                  className="h-2" 
                />
              </div>
            </CardContent>
          </Card>

          {/* Weekly Goal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Weekly Goal</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>This Week</span>
                  <span>
                    {userStats.weekly_goal_progress || 0} / {userStats.weekly_goal || 5}
                  </span>
                </div>
                <Progress 
                  value={((userStats.weekly_goal_progress || 0) / (userStats.weekly_goal || 5)) * 100} 
                  className="h-2" 
                />
                <div className="text-xs text-muted-foreground text-center">
                  {userStats.weekly_goal && userStats.weekly_goal_progress 
                    ? userStats.weekly_goal - (userStats.weekly_goal_progress || 0) > 0
                      ? `${userStats.weekly_goal - (userStats.weekly_goal_progress || 0)} more lessons`
                      : 'Goal completed! 🎉'
                    : 'Set a weekly goal'
                  }
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Recent Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userStats.achievements?.slice(0, 3).map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{achievement.title}</div>
                      <div className="text-xs text-muted-foreground">
                        +{achievement.points} points
                      </div>
                    </div>
                  </div>
                ))}
                {(!userStats.achievements || userStats.achievements.length === 0) && (
                  <div className="text-center text-muted-foreground text-sm">
                    Complete lessons to earn achievements!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-greek-600 hover:bg-greek-700">
                <PlayCircle className="h-4 w-4 mr-2" />
                Continue Learning
              </Button>
              <Button variant="outline" className="w-full">
                <BookMarked className="h-4 w-4 mr-2" />
                Review Lessons
              </Button>
              <Button variant="outline" className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Progress
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
