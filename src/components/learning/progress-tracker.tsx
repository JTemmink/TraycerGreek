'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Target, 
  TrendingUp, 
  Award,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useLearningStore } from '@/store/learning-store';
import { useAuthStore } from '@/store/auth-store';

interface ProgressTrackerProps {
  lessonId: string;
  className?: string;
}

export function ProgressTracker({ lessonId, className }: ProgressTrackerProps) {
  const { userProgress, userStats } = useLearningStore();
  const { user } = useAuthStore();
  const [lessonProgress, setLessonProgress] = useState<any>(null);

  useEffect(() => {
    if (userProgress && lessonId) {
      const progress = userProgress.find(p => p.lesson_id === lessonId);
      setLessonProgress(progress);
    }
  }, [userProgress, lessonId]);

  if (!user || !userStats) {
    return null;
  }

  const overallProgress = userStats.lessons_completed / (userStats.lessons_completed + userStats.lessons_in_progress) * 100;
  const currentStreak = userStats.current_streak || 0;
  const totalPoints = userStats.total_points || 0;
  const level = Math.floor(Math.sqrt(totalPoints / 1000)) + 1;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Overall Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Your Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{userStats.lessons_completed} completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span>Level {level}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Lesson Progress */}
      {lessonProgress && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>This Lesson</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Lesson Progress</span>
                <span>{Math.round(lessonProgress.progress || 0)}%</span>
              </div>
              <Progress value={lessonProgress.progress || 0} className="h-2" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {lessonProgress.time_spent || 0} min studied
                </span>
              </div>
              {lessonProgress.completed_at && (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Completed
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Learning Streak */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Learning Streak</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-gold-600">
              {currentStreak}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentStreak === 1 ? 'day' : 'days'} in a row
            </div>
            <div className="flex justify-center">
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(currentStreak, 7) }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-gold-500 rounded-full"
                  />
                ))}
                {currentStreak > 7 && (
                  <span className="text-xs text-muted-foreground ml-1">
                    +{currentStreak - 7}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Quick Stats</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {userStats.perfect_quizzes || 0}
              </div>
              <div className="text-muted-foreground">Perfect Quizzes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {userStats.vocabulary_learned || 0}
              </div>
              <div className="text-muted-foreground">Words Learned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {Math.floor((userStats.total_study_time || 0) / 60)}
              </div>
              <div className="text-muted-foreground">Hours Studied</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {totalPoints}
              </div>
              <div className="text-muted-foreground">Total Points</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goal */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Weekly Goal</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>This Week</span>
              <span>
                {userStats.weekly_goal_progress || 0} / {userStats.weekly_goal || 5} lessons
              </span>
            </div>
            <Progress 
              value={((userStats.weekly_goal_progress || 0) / (userStats.weekly_goal || 5)) * 100} 
              className="h-2" 
            />
            <div className="text-xs text-muted-foreground text-center">
              {userStats.weekly_goal && userStats.weekly_goal_progress 
                ? userStats.weekly_goal - (userStats.weekly_goal_progress || 0) > 0
                  ? `${userStats.weekly_goal - (userStats.weekly_goal_progress || 0)} more lessons to reach your goal`
                  : 'Goal completed! 🎉'
                : 'Set a weekly goal to track your progress'
              }
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button className="w-full bg-greek-600 hover:bg-greek-700">
          View Full Progress
        </Button>
        <Button variant="outline" className="w-full">
          Set Goals
        </Button>
      </div>
    </div>
  );
}
