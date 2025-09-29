import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProgress, UserStats, AdaptiveRecommendation } from '@/types/database';

interface LearningState {
  userProgress: UserProgress[] | null;
  userStats: UserStats | null;
  currentLesson: string | null;
  currentQuiz: string | null;
  recommendations: AdaptiveRecommendation[] | null;
  loading: boolean;
  error: string | null;
}

interface LearningActions {
  setUserProgress: (progress: UserProgress[]) => void;
  setUserStats: (stats: UserStats) => void;
  setCurrentLesson: (lessonId: string | null) => void;
  setCurrentQuiz: (quizId: string | null) => void;
  setRecommendations: (recommendations: AdaptiveRecommendation[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateProgress: (lessonId: string, progress: Partial<UserProgress>) => void;
  addQuizAttempt: (quizId: string, attempt: any) => void;
  clearLearning: () => void;
  refreshData: () => Promise<void>;
}

type LearningStore = LearningState & LearningActions;

export const useLearningStore = create<LearningStore>()(
  persist(
    (set, get) => ({
      // State
      userProgress: null,
      userStats: null,
      currentLesson: null,
      currentQuiz: null,
      recommendations: null,
      loading: false,
      error: null,

      // Actions
      setUserProgress: (progress) => set({ userProgress: progress }),
      
      setUserStats: (stats) => set({ userStats: stats }),
      
      setCurrentLesson: (lessonId) => set({ currentLesson: lessonId }),
      
      setCurrentQuiz: (quizId) => set({ currentQuiz: quizId }),
      
      setRecommendations: (recommendations) => set({ recommendations }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      updateProgress: (lessonId, progress) => {
        const { userProgress } = get();
        if (userProgress) {
          const updatedProgress = userProgress.map(p => 
            p.lesson_id === lessonId 
              ? { ...p, ...progress, updated_at: new Date().toISOString() }
              : p
          );
          set({ userProgress: updatedProgress });
        }
      },
      
      addQuizAttempt: (quizId, attempt) => {
        const { userProgress } = get();
        if (userProgress) {
          const updatedProgress = userProgress.map(p => 
            p.lesson_id === quizId 
              ? { 
                  ...p, 
                  quiz_attempts: [...(p.quiz_attempts || []), attempt],
                  updated_at: new Date().toISOString()
                }
              : p
          );
          set({ userProgress: updatedProgress });
        }
      },
      
      clearLearning: () => set({
        userProgress: null,
        userStats: null,
        currentLesson: null,
        currentQuiz: null,
        recommendations: null,
        loading: false,
        error: null,
      }),
      
      refreshData: async () => {
        set({ loading: true, error: null });
        try {
          // This would typically fetch fresh data from the API
          // For now, we'll just simulate a refresh
          await new Promise(resolve => setTimeout(resolve, 1000));
          set({ loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to refresh data',
            loading: false 
          });
        }
      },
    }),
    {
      name: 'learning-storage',
      partialize: (state) => ({
        userProgress: state.userProgress,
        userStats: state.userStats,
        currentLesson: state.currentLesson,
        currentQuiz: state.currentQuiz,
        recommendations: state.recommendations,
      }),
    }
  )
);

// Selectors
export const useUserProgress = () => useLearningStore((state) => state.userProgress);
export const useUserStats = () => useLearningStore((state) => state.userStats);
export const useCurrentLesson = () => useLearningStore((state) => state.currentLesson);
export const useCurrentQuiz = () => useLearningStore((state) => state.currentQuiz);
export const useRecommendations = () => useLearningStore((state) => state.recommendations);
export const useLearningLoading = () => useLearningStore((state) => state.loading);
export const useLearningError = () => useLearningStore((state) => state.error);

// Computed selectors
export const useCompletedLessons = () => 
  useLearningStore((state) => 
    state.userProgress?.filter(p => p.completed_at) || []
  );

export const useInProgressLessons = () => 
  useLearningStore((state) => 
    state.userProgress?.filter(p => !p.completed_at && p.progress > 0) || []
  );

export const useTotalStudyTime = () => 
  useLearningStore((state) => 
    state.userProgress?.reduce((total, p) => total + (p.time_spent || 0), 0) || 0
  );

export const useAverageScore = () => {
  const userProgress = useLearningStore((state) => state.userProgress);
  if (!userProgress || userProgress.length === 0) return 0;
  
  const scores = userProgress
    .filter(p => p.score !== null && p.score !== undefined)
    .map(p => p.score!);
  
  if (scores.length === 0) return 0;
  
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
};

export const useCurrentStreak = () => 
  useLearningStore((state) => state.userStats?.current_streak || 0);

export const useTotalPoints = () => 
  useLearningStore((state) => state.userStats?.total_points || 0);

export const useUserLevel = () => {
  const totalPoints = useTotalPoints();
  return Math.floor(Math.sqrt(totalPoints / 1000)) + 1;
};
