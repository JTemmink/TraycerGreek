import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Award, 
  Clock, 
  BookOpen,
  CheckCircle,
  Calendar,
  Trophy,
  Flame
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Progress',
  description: 'Track your learning progress and achievements in Ancient Greek.',
};

export default function ProgressPage() {
  // Mock data - in real app this would come from the store/API
  const mockStats = {
    totalLessons: 50,
    completedLessons: 12,
    totalQuizzes: 25,
    completedQuizzes: 8,
    totalStudyTime: 24, // hours
    currentStreak: 7, // days
    longestStreak: 15,
    totalPoints: 1250,
    currentLevel: 3,
    pointsToNextLevel: 250,
    averageScore: 85,
    weeklyProgress: [
      { day: 'Mon', lessons: 2, quizzes: 1, time: 45 },
      { day: 'Tue', lessons: 1, quizzes: 2, time: 30 },
      { day: 'Wed', lessons: 3, quizzes: 1, time: 60 },
      { day: 'Thu', lessons: 1, quizzes: 0, time: 20 },
      { day: 'Fri', lessons: 2, quizzes: 2, time: 50 },
      { day: 'Sat', lessons: 0, quizzes: 0, time: 0 },
      { day: 'Sun', lessons: 1, quizzes: 1, time: 25 },
    ],
    recentAchievements: [
      { id: 1, name: 'First Lesson', description: 'Completed your first lesson', icon: BookOpen, earnedAt: '2024-01-15' },
      { id: 2, name: 'Quiz Master', description: 'Scored 100% on a quiz', icon: Target, earnedAt: '2024-01-18' },
      { id: 3, name: 'Week Warrior', description: 'Studied for 7 days straight', icon: Flame, earnedAt: '2024-01-22' },
    ],
    levelProgress: [
      { level: 'Beginner', completed: 8, total: 15, percentage: 53 },
      { level: 'Intermediate', completed: 4, total: 20, percentage: 20 },
      { level: 'Advanced', completed: 0, total: 15, percentage: 0 },
    ]
  };

  const overallProgress = (mockStats.completedLessons / mockStats.totalLessons) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground greek-heading">
                Your Progress
              </h1>
              <p className="text-muted-foreground mt-2">
                Track your learning journey and celebrate your achievements
              </p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
                  <p className="text-xs text-muted-foreground">
                    {mockStats.completedLessons} of {mockStats.totalLessons} lessons
                  </p>
                  <Progress value={overallProgress} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                  <Flame className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.currentStreak} days</div>
                  <p className="text-xs text-muted-foreground">
                    Best: {mockStats.longestStreak} days
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalStudyTime}h</div>
                  <p className="text-xs text-muted-foreground">
                    This month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Level</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Level {mockStats.currentLevel}</div>
                  <p className="text-xs text-muted-foreground">
                    {mockStats.pointsToNextLevel} points to next level
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Level Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Level Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockStats.levelProgress.map((level) => (
                    <div key={level.level} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{level.level}</span>
                        <span className="text-sm text-muted-foreground">
                          {level.completed}/{level.total}
                        </span>
                      </div>
                      <Progress value={level.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockStats.recentAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-3">
                      <div className="p-2 bg-gold-100 rounded-full">
                        <achievement.icon className="h-4 w-4 text-gold-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{achievement.name}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {new Date(achievement.earnedAt).toLocaleDateString()}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Weekly Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-2">
                    {mockStats.weeklyProgress.map((day, index) => (
                      <div key={day.day} className="text-center">
                        <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                        <div className="space-y-1">
                          <div className="h-2 bg-greek-200 rounded-full">
                            <div 
                              className="h-2 bg-greek-600 rounded-full" 
                              style={{ width: `${(day.lessons / 3) * 100}%` }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {day.lessons}L {day.quizzes}Q
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
