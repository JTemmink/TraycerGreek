import type { UserProgress, Lesson, Quiz, AdaptiveRecommendation } from '@/types/database';
import type { UserStats } from '@/types/database';

// Adaptive learning algorithms
export class AdaptiveLearningEngine {
  private static instance: AdaptiveLearningEngine;
  
  private constructor() {}
  
  static getInstance(): AdaptiveLearningEngine {
    if (!AdaptiveLearningEngine.instance) {
      AdaptiveLearningEngine.instance = new AdaptiveLearningEngine();
    }
    return AdaptiveLearningEngine.instance;
  }

  // Calculate difficulty adjustment based on performance
  calculateDifficultyAdjustment(
    currentDifficulty: number,
    performance: number,
    attempts: number
  ): number {
    const adjustmentFactor = 0.1;
    const performanceThreshold = 0.7; // 70% correct answers
    
    if (performance >= performanceThreshold) {
      // Increase difficulty
      return Math.min(currentDifficulty + adjustmentFactor, 5.0);
    } else if (performance < performanceThreshold && attempts > 2) {
      // Decrease difficulty
      return Math.max(currentDifficulty - adjustmentFactor, 1.0);
    }
    
    return currentDifficulty;
  }

  // Spaced repetition algorithm
  calculateNextReviewDate(
    lastReview: Date,
    difficulty: number,
    performance: number,
    interval: number
  ): Date {
    const baseInterval = 1; // 1 day
    const maxInterval = 365; // 1 year
    
    // Calculate new interval based on performance
    let newInterval: number;
    
    if (performance >= 0.9) {
      // Excellent performance - increase interval significantly
      newInterval = Math.min(interval * 2.5, maxInterval);
    } else if (performance >= 0.7) {
      // Good performance - increase interval moderately
      newInterval = Math.min(interval * 1.5, maxInterval);
    } else if (performance >= 0.5) {
      // Average performance - keep same interval
      newInterval = interval;
    } else {
      // Poor performance - decrease interval
      newInterval = Math.max(interval * 0.5, baseInterval);
    }
    
    // Adjust for difficulty
    const difficultyMultiplier = 1 + (difficulty - 1) * 0.2;
    newInterval = Math.floor(newInterval * difficultyMultiplier);
    
    const nextReview = new Date(lastReview);
    nextReview.setDate(nextReview.getDate() + newInterval);
    
    return nextReview;
  }

  // Generate personalized recommendations
  generateRecommendations(
    userProgress: UserProgress[],
    userStats: UserStats,
    availableLessons: Lesson[]
  ): AdaptiveRecommendation[] {
    const recommendations: AdaptiveRecommendation[] = [];
    
    // Analyze user's weak areas
    const weakAreas = this.identifyWeakAreas(userProgress);
    
    // Recommend lessons based on weak areas
    for (const area of weakAreas) {
      const relevantLessons = availableLessons.filter(lesson =>
        lesson.tags.includes(area) || lesson.title.toLowerCase().includes(area)
      );
      
      for (const lesson of relevantLessons) {
        if (!this.hasCompletedLesson(userProgress, lesson.id)) {
          recommendations.push({
            type: 'lesson',
            itemId: lesson.id,
            reason: `Focus on ${area} to improve your understanding`,
            priority: this.calculatePriority(area, userStats),
            estimatedTime: lesson.estimatedDuration,
          });
        }
      }
    }
    
    // Recommend vocabulary practice
    const vocabularyRecommendation = this.generateVocabularyRecommendation(userStats);
    if (vocabularyRecommendation) {
      recommendations.push(vocabularyRecommendation);
    }
    
    // Recommend review sessions
    const reviewRecommendations = this.generateReviewRecommendations(userProgress);
    recommendations.push(...reviewRecommendations);
    
    // Sort by priority
    return recommendations.sort((a, b) => b.priority - a.priority);
  }

  // Identify weak areas based on performance
  private identifyWeakAreas(userProgress: UserProgress[]): string[] {
    const weakAreas: string[] = [];
    const areaPerformance = new Map<string, { total: number; correct: number }>();
    
    for (const progress of userProgress) {
      if (progress.quiz_attempts && progress.quiz_attempts.length > 0) {
        const latestAttempt = progress.quiz_attempts[progress.quiz_attempts.length - 1];
        const score = latestAttempt.score;
        
        // Get lesson tags/areas
        const areas = progress.lesson?.tags || [];
        
        for (const area of areas) {
          if (!areaPerformance.has(area)) {
            areaPerformance.set(area, { total: 0, correct: 0 });
          }
          
          const current = areaPerformance.get(area)!;
          current.total += 1;
          current.correct += score;
        }
      }
    }
    
    // Identify areas with performance below 70%
    for (const [area, performance] of areaPerformance) {
      const averageScore = performance.correct / performance.total;
      if (averageScore < 0.7) {
        weakAreas.push(area);
      }
    }
    
    return weakAreas;
  }

  // Check if user has completed a lesson
  private hasCompletedLesson(userProgress: UserProgress[], lessonId: string): boolean {
    return userProgress.some(progress => 
      progress.lesson_id === lessonId && progress.completed_at !== null
    );
  }

  // Calculate recommendation priority
  private calculatePriority(area: string, userStats: UserStats): number {
    let priority = 50; // Base priority
    
    // Increase priority for areas with low performance
    if (userStats.weak_areas?.includes(area)) {
      priority += 30;
    }
    
    // Increase priority for areas not recently studied
    const lastStudied = userStats.last_studied_areas?.[area];
    if (lastStudied) {
      const daysSinceLastStudied = (Date.now() - new Date(lastStudied).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceLastStudied > 7) {
        priority += 20;
      }
    }
    
    return Math.min(priority, 100);
  }

  // Generate vocabulary recommendation
  private generateVocabularyRecommendation(userStats: UserStats): AdaptiveRecommendation | null {
    if (!userStats.vocabulary_strength || userStats.vocabulary_strength < 0.6) {
      return {
        type: 'vocabulary',
        itemId: 'vocabulary-practice',
        reason: 'Strengthen your vocabulary foundation',
        priority: 80,
        estimatedTime: 15,
      };
    }
    
    return null;
  }

  // Generate review recommendations
  private generateReviewRecommendations(userProgress: UserProgress[]): AdaptiveRecommendation[] {
    const recommendations: AdaptiveRecommendation[] = [];
    const now = new Date();
    
    for (const progress of userProgress) {
      if (progress.completed_at) {
        const completedDate = new Date(progress.completed_at);
        const daysSinceCompletion = (now.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24);
        
        // Recommend review if it's been more than 7 days
        if (daysSinceCompletion > 7) {
          recommendations.push({
            type: 'review',
            itemId: progress.lesson_id,
            reason: `Review ${progress.lesson?.title} to reinforce learning`,
            priority: 60,
            estimatedTime: Math.floor(progress.lesson?.estimatedDuration || 10 * 0.5),
          });
        }
      }
    }
    
    return recommendations;
  }

  // Calculate learning path
  calculateLearningPath(
    userLevel: string,
    userProgress: UserProgress[],
    availableLessons: Lesson[]
  ): Lesson[] {
    const completedLessonIds = new Set(
      userProgress
        .filter(p => p.completed_at)
        .map(p => p.lesson_id)
    );
    
    // Filter out completed lessons
    const remainingLessons = availableLessons.filter(
      lesson => !completedLessonIds.has(lesson.id)
    );
    
    // Sort by level, then by difficulty, then by order
    return remainingLessons.sort((a, b) => {
      // First by level
      const levelOrder = ['beginner', 'intermediate', 'advanced'];
      const aLevelIndex = levelOrder.indexOf(a.level);
      const bLevelIndex = levelOrder.indexOf(b.level);
      
      if (aLevelIndex !== bLevelIndex) {
        return aLevelIndex - bLevelIndex;
      }
      
      // Then by difficulty
      if (a.difficulty !== b.difficulty) {
        return a.difficulty - b.difficulty;
      }
      
      // Finally by order index
      return (a.orderIndex || 0) - (b.orderIndex || 0);
    });
  }

  // Calculate mastery level
  calculateMasteryLevel(
    userProgress: UserProgress[],
    userStats: UserStats
  ): number {
    let totalScore = 0;
    let totalWeight = 0;
    
    // Weight recent progress more heavily
    const now = new Date();
    
    for (const progress of userProgress) {
      if (progress.completed_at) {
        const completedDate = new Date(progress.completed_at);
        const daysSinceCompletion = (now.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24);
        
        // Weight decreases over time
        const weight = Math.max(1, 10 - daysSinceCompletion);
        
        totalScore += (progress.score || 0) * weight;
        totalWeight += weight;
      }
    }
    
    if (totalWeight === 0) return 0;
    
    const averageScore = totalScore / totalWeight;
    
    // Convert to mastery level (0-100)
    return Math.min(Math.max(averageScore * 100, 0), 100);
  }

  // Predict learning time
  predictLearningTime(
    lesson: Lesson,
    userStats: UserStats,
    userLevel: string
  ): number {
    let baseTime = lesson.estimatedDuration;
    
    // Adjust based on user's learning speed
    if (userStats.average_lesson_time) {
      const speedFactor = userStats.average_lesson_time / 30; // 30 minutes is baseline
      baseTime *= speedFactor;
    }
    
    // Adjust based on difficulty vs user level
    const levelDifficulty = this.getLevelDifficulty(userLevel);
    const difficultyFactor = lesson.difficulty / levelDifficulty;
    baseTime *= difficultyFactor;
    
    // Adjust based on vocabulary strength
    if (lesson.vocabulary && lesson.vocabulary.length > 0) {
      const vocabFactor = userStats.vocabulary_strength || 0.5;
      baseTime *= (2 - vocabFactor); // More time if vocabulary is weak
    }
    
    return Math.ceil(baseTime);
  }

  // Get difficulty level for user level
  private getLevelDifficulty(userLevel: string): number {
    const levelDifficulties: Record<string, number> = {
      beginner: 1.5,
      intermediate: 3.0,
      advanced: 4.5,
    };
    
    return levelDifficulties[userLevel] || 2.0;
  }
}

// Export singleton instance
export const adaptiveLearning = AdaptiveLearningEngine.getInstance();
