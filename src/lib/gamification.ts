import type { UserStats, UserAchievement, QuizAttempt } from '@/types/database';

// Gamification system
export class GamificationEngine {
  private static instance: GamificationEngine;
  
  private constructor() {}
  
  static getInstance(): GamificationEngine {
    if (!GamificationEngine.instance) {
      GamificationEngine.instance = new GamificationEngine();
    }
    return GamificationEngine.instance;
  }

  // Calculate points for different actions
  calculatePoints(action: string, context: any = {}): number {
    const pointValues: Record<string, number> = {
      // Lesson completion
      'lesson_completed': 100,
      'lesson_perfect': 150,
      'lesson_first_try': 200,
      
      // Quiz completion
      'quiz_completed': 50,
      'quiz_perfect': 100,
      'quiz_first_try': 75,
      
      // Vocabulary
      'vocabulary_learned': 25,
      'vocabulary_mastered': 50,
      'vocabulary_streak': 10,
      
      // Daily activities
      'daily_login': 20,
      'daily_streak': 30,
      'weekly_goal': 200,
      'monthly_goal': 1000,
      
      // Special achievements
      'perfect_week': 500,
      'perfect_month': 2000,
      'level_up': 300,
      'milestone': 1000,
    };

    let basePoints = pointValues[action] || 0;
    
    // Apply multipliers based on context
    if (context.difficulty) {
      basePoints *= (1 + (context.difficulty - 1) * 0.2);
    }
    
    if (context.streak) {
      basePoints *= (1 + Math.min(context.streak * 0.1, 2.0));
    }
    
    if (context.level) {
      const levelMultiplier = 1 + (context.level - 1) * 0.1;
      basePoints *= levelMultiplier;
    }
    
    return Math.floor(basePoints);
  }

  // Calculate user level based on total points
  calculateLevel(totalPoints: number): number {
    // Level formula: level = floor(sqrt(points / 1000)) + 1
    return Math.floor(Math.sqrt(totalPoints / 1000)) + 1;
  }

  // Calculate points needed for next level
  calculatePointsToNextLevel(currentLevel: number): number {
    const nextLevelPoints = Math.pow(currentLevel, 2) * 1000;
    const currentLevelPoints = Math.pow(currentLevel - 1, 2) * 1000;
    return nextLevelPoints - currentLevelPoints;
  }

  // Calculate progress to next level
  calculateLevelProgress(totalPoints: number, currentLevel: number): number {
    const currentLevelPoints = Math.pow(currentLevel - 1, 2) * 1000;
    const nextLevelPoints = Math.pow(currentLevel, 2) * 1000;
    const progress = (totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints);
    return Math.min(Math.max(progress, 0), 1);
  }

  // Check for new achievements
  checkAchievements(userStats: UserStats, recentActivity: any[]): UserAchievement[] {
    const newAchievements: UserAchievement[] = [];
    
    // Lesson completion achievements
    if (userStats.lessons_completed >= 1 && !this.hasAchievement(userStats, 'first_lesson')) {
      newAchievements.push({
        id: 'first_lesson',
        user_id: userStats.user_id,
        achievement_type: 'milestone',
        title: 'First Steps',
        description: 'Completed your first lesson',
        points: 100,
        icon: '🎓',
        earned_at: new Date().toISOString(),
      });
    }
    
    if (userStats.lessons_completed >= 10 && !this.hasAchievement(userStats, 'dedicated_student')) {
      newAchievements.push({
        id: 'dedicated_student',
        user_id: userStats.user_id,
        achievement_type: 'milestone',
        title: 'Dedicated Student',
        description: 'Completed 10 lessons',
        points: 500,
        icon: '📚',
        earned_at: new Date().toISOString(),
      });
    }
    
    if (userStats.lessons_completed >= 50 && !this.hasAchievement(userStats, 'scholar')) {
      newAchievements.push({
        id: 'scholar',
        user_id: userStats.user_id,
        achievement_type: 'milestone',
        title: 'Scholar',
        description: 'Completed 50 lessons',
        points: 2000,
        icon: '🏛️',
        earned_at: new Date().toISOString(),
      });
    }
    
    // Streak achievements
    if (userStats.current_streak >= 3 && !this.hasAchievement(userStats, 'consistent_learner')) {
      newAchievements.push({
        id: 'consistent_learner',
        user_id: userStats.user_id,
        achievement_type: 'streak',
        title: 'Consistent Learner',
        description: '3-day learning streak',
        points: 150,
        icon: '🔥',
        earned_at: new Date().toISOString(),
      });
    }
    
    if (userStats.current_streak >= 7 && !this.hasAchievement(userStats, 'week_warrior')) {
      newAchievements.push({
        id: 'week_warrior',
        user_id: userStats.user_id,
        achievement_type: 'streak',
        title: 'Week Warrior',
        description: '7-day learning streak',
        points: 500,
        icon: '⚡',
        earned_at: new Date().toISOString(),
      });
    }
    
    if (userStats.current_streak >= 30 && !this.hasAchievement(userStats, 'month_master')) {
      newAchievements.push({
        id: 'month_master',
        user_id: userStats.user_id,
        achievement_type: 'streak',
        title: 'Month Master',
        description: '30-day learning streak',
        points: 2000,
        icon: '👑',
        earned_at: new Date().toISOString(),
      });
    }
    
    // Perfect score achievements
    if (userStats.perfect_quizzes >= 1 && !this.hasAchievement(userStats, 'perfectionist')) {
      newAchievements.push({
        id: 'perfectionist',
        user_id: userStats.user_id,
        achievement_type: 'performance',
        title: 'Perfectionist',
        description: 'Got a perfect score on a quiz',
        points: 200,
        icon: '💯',
        earned_at: new Date().toISOString(),
      });
    }
    
    if (userStats.perfect_quizzes >= 10 && !this.hasAchievement(userStats, 'quiz_master')) {
      newAchievements.push({
        id: 'quiz_master',
        user_id: userStats.user_id,
        achievement_type: 'performance',
        title: 'Quiz Master',
        description: 'Got perfect scores on 10 quizzes',
        points: 1000,
        icon: '🧠',
        earned_at: new Date().toISOString(),
      });
    }
    
    // Vocabulary achievements
    if (userStats.vocabulary_learned >= 50 && !this.hasAchievement(userStats, 'word_collector')) {
      newAchievements.push({
        id: 'word_collector',
        user_id: userStats.user_id,
        achievement_type: 'vocabulary',
        title: 'Word Collector',
        description: 'Learned 50 vocabulary words',
        points: 300,
        icon: '📝',
        earned_at: new Date().toISOString(),
      });
    }
    
    if (userStats.vocabulary_learned >= 200 && !this.hasAchievement(userStats, 'lexicon_legend')) {
      newAchievements.push({
        id: 'lexicon_legend',
        user_id: userStats.user_id,
        achievement_type: 'vocabulary',
        title: 'Lexicon Legend',
        description: 'Learned 200 vocabulary words',
        points: 1500,
        icon: '📖',
        earned_at: new Date().toISOString(),
      });
    }
    
    // Time-based achievements
    if (userStats.total_study_time >= 3600 && !this.hasAchievement(userStats, 'hour_hero')) {
      newAchievements.push({
        id: 'hour_hero',
        user_id: userStats.user_id,
        achievement_type: 'time',
        title: 'Hour Hero',
        description: 'Studied for 1 hour total',
        points: 200,
        icon: '⏰',
        earned_at: new Date().toISOString(),
      });
    }
    
    if (userStats.total_study_time >= 36000 && !this.hasAchievement(userStats, 'time_titan')) {
      newAchievements.push({
        id: 'time_titan',
        user_id: userStats.user_id,
        achievement_type: 'time',
        title: 'Time Titan',
        description: 'Studied for 10 hours total',
        points: 1000,
        icon: '⏳',
        earned_at: new Date().toISOString(),
      });
    }
    
    return newAchievements;
  }

  // Check if user has specific achievement
  private hasAchievement(userStats: UserStats, achievementId: string): boolean {
    return userStats.achievements?.some(achievement => achievement.id === achievementId) || false;
  }

  // Calculate streak
  calculateStreak(lastActivity: Date, currentStreak: number): number {
    const now = new Date();
    const daysSinceLastActivity = Math.floor(
      (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceLastActivity === 0) {
      // Activity today, maintain streak
      return currentStreak;
    } else if (daysSinceLastActivity === 1) {
      // Activity yesterday, continue streak
      return currentStreak + 1;
    } else {
      // Gap in activity, reset streak
      return 1;
    }
  }

  // Calculate daily goal progress
  calculateDailyGoalProgress(userStats: UserStats, dailyGoal: number): number {
    const today = new Date().toDateString();
    const todayActivity = userStats.daily_activity?.[today] || 0;
    return Math.min(todayActivity / dailyGoal, 1);
  }

  // Calculate weekly goal progress
  calculateWeeklyGoalProgress(userStats: UserStats, weeklyGoal: number): number {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    
    let weeklyActivity = 0;
    for (let d = new Date(startOfWeek); d <= endOfWeek; d.setDate(d.getDate() + 1)) {
      const dayKey = d.toDateString();
      weeklyActivity += userStats.daily_activity?.[dayKey] || 0;
    }
    
    return Math.min(weeklyActivity / weeklyGoal, 1);
  }

  // Calculate mastery score
  calculateMasteryScore(userStats: UserStats): number {
    const weights = {
      lessons_completed: 0.3,
      perfect_quizzes: 0.25,
      vocabulary_learned: 0.2,
      current_streak: 0.15,
      total_study_time: 0.1,
    };
    
    let score = 0;
    
    // Normalize each metric to 0-100 scale
    score += Math.min(userStats.lessons_completed * 2, 100) * weights.lessons_completed;
    score += Math.min(userStats.perfect_quizzes * 5, 100) * weights.perfect_quizzes;
    score += Math.min(userStats.vocabulary_learned * 0.5, 100) * weights.vocabulary_learned;
    score += Math.min(userStats.current_streak * 10, 100) * weights.current_streak;
    score += Math.min(userStats.total_study_time / 60, 100) * weights.total_study_time;
    
    return Math.round(score);
  }

  // Generate leaderboard data
  generateLeaderboard(users: UserStats[], period: 'daily' | 'weekly' | 'monthly' | 'all'): Array<{
    userId: string;
    score: number;
    rank: number;
  }> {
    let scores: Array<{ userId: string; score: number }> = [];
    
    switch (period) {
      case 'daily':
        scores = users.map(user => ({
          userId: user.user_id,
          score: user.daily_activity?.[new Date().toDateString()] || 0,
        }));
        break;
      case 'weekly':
        scores = users.map(user => {
          const now = new Date();
          const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(endOfWeek.getDate() + 6);
          
          let weeklyScore = 0;
          for (let d = new Date(startOfWeek); d <= endOfWeek; d.setDate(d.getDate() + 1)) {
            const dayKey = d.toDateString();
            weeklyScore += user.daily_activity?.[dayKey] || 0;
          }
          
          return { userId: user.user_id, score: weeklyScore };
        });
        break;
      case 'monthly':
        scores = users.map(user => {
          const now = new Date();
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          
          let monthlyScore = 0;
          for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
            const dayKey = d.toDateString();
            monthlyScore += user.daily_activity?.[dayKey] || 0;
          }
          
          return { userId: user.user_id, score: monthlyScore };
        });
        break;
      case 'all':
        scores = users.map(user => ({
          userId: user.user_id,
          score: user.total_points || 0,
        }));
        break;
    }
    
    // Sort by score descending
    scores.sort((a, b) => b.score - a.score);
    
    // Add ranks
    return scores.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));
  }

  // Calculate XP for different actions
  calculateXP(action: string, context: any = {}): number {
    const xpValues: Record<string, number> = {
      'lesson_completed': 50,
      'quiz_completed': 25,
      'vocabulary_learned': 10,
      'daily_login': 5,
      'achievement_earned': 20,
    };
    
    let baseXP = xpValues[action] || 0;
    
    // Apply multipliers
    if (context.difficulty) {
      baseXP *= (1 + (context.difficulty - 1) * 0.3);
    }
    
    if (context.streak) {
      baseXP *= (1 + Math.min(context.streak * 0.05, 1.0));
    }
    
    return Math.floor(baseXP);
  }
}

// Export singleton instance
export const gamification = GamificationEngine.getInstance();
