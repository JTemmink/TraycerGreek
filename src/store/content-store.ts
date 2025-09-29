import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lesson, Quiz, Vocabulary } from '@/types/content';

interface ContentState {
  lessons: Lesson[];
  quizzes: Quiz[];
  vocabulary: Vocabulary[];
  currentLesson: Lesson | null;
  currentQuiz: Quiz | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

interface ContentActions {
  setLessons: (lessons: Lesson[]) => void;
  setQuizzes: (quizzes: Quiz[]) => void;
  setVocabulary: (vocabulary: Vocabulary[]) => void;
  setCurrentLesson: (lesson: Lesson | null) => void;
  setCurrentQuiz: (quiz: Quiz | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLastUpdated: (timestamp: string) => void;
  addLesson: (lesson: Lesson) => void;
  updateLesson: (lessonId: string, updates: Partial<Lesson>) => void;
  removeLesson: (lessonId: string) => void;
  addQuiz: (quiz: Quiz) => void;
  updateQuiz: (quizId: string, updates: Partial<Quiz>) => void;
  removeQuiz: (quizId: string) => void;
  addVocabulary: (word: Vocabulary) => void;
  updateVocabulary: (wordId: string, updates: Partial<Vocabulary>) => void;
  removeVocabulary: (wordId: string) => void;
  clearContent: () => void;
  refreshContent: () => Promise<void>;
}

type ContentStore = ContentState & ContentActions;

export const useContentStore = create<ContentStore>()(
  persist(
    (set, get) => ({
      // State
      lessons: [],
      quizzes: [],
      vocabulary: [],
      currentLesson: null,
      currentQuiz: null,
      loading: false,
      error: null,
      lastUpdated: null,

      // Actions
      setLessons: (lessons) => set({ lessons }),
      
      setQuizzes: (quizzes) => set({ quizzes }),
      
      setVocabulary: (vocabulary) => set({ vocabulary }),
      
      setCurrentLesson: (lesson) => set({ currentLesson: lesson }),
      
      setCurrentQuiz: (quiz) => set({ currentQuiz: quiz }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      setLastUpdated: (timestamp) => set({ lastUpdated: timestamp }),
      
      addLesson: (lesson) => {
        const { lessons } = get();
        set({ lessons: [...lessons, lesson] });
      },
      
      updateLesson: (lessonId, updates) => {
        const { lessons } = get();
        const updatedLessons = lessons.map(lesson =>
          lesson.id === lessonId ? { ...lesson, ...updates } : lesson
        );
        set({ lessons: updatedLessons });
      },
      
      removeLesson: (lessonId) => {
        const { lessons } = get();
        const filteredLessons = lessons.filter(lesson => lesson.id !== lessonId);
        set({ lessons: filteredLessons });
      },
      
      addQuiz: (quiz) => {
        const { quizzes } = get();
        set({ quizzes: [...quizzes, quiz] });
      },
      
      updateQuiz: (quizId, updates) => {
        const { quizzes } = get();
        const updatedQuizzes = quizzes.map(quiz =>
          quiz.id === quizId ? { ...quiz, ...updates } : quiz
        );
        set({ quizzes: updatedQuizzes });
      },
      
      removeQuiz: (quizId) => {
        const { quizzes } = get();
        const filteredQuizzes = quizzes.filter(quiz => quiz.id !== quizId);
        set({ quizzes: filteredQuizzes });
      },
      
      addVocabulary: (word) => {
        const { vocabulary } = get();
        set({ vocabulary: [...vocabulary, word] });
      },
      
      updateVocabulary: (wordId, updates) => {
        const { vocabulary } = get();
        const updatedVocabulary = vocabulary.map(word =>
          word.id === wordId ? { ...word, ...updates } : word
        );
        set({ vocabulary: updatedVocabulary });
      },
      
      removeVocabulary: (wordId) => {
        const { vocabulary } = get();
        const filteredVocabulary = vocabulary.filter(word => word.id !== wordId);
        set({ vocabulary: filteredVocabulary });
      },
      
      clearContent: () => set({
        lessons: [],
        quizzes: [],
        vocabulary: [],
        currentLesson: null,
        currentQuiz: null,
        loading: false,
        error: null,
        lastUpdated: null,
      }),
      
      refreshContent: async () => {
        set({ loading: true, error: null });
        try {
          // This would typically fetch fresh content from the API
          // For now, we'll just simulate a refresh
          await new Promise(resolve => setTimeout(resolve, 1000));
          set({ 
            loading: false,
            lastUpdated: new Date().toISOString()
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to refresh content',
            loading: false 
          });
        }
      },
    }),
    {
      name: 'content-storage',
      partialize: (state) => ({
        lessons: state.lessons,
        quizzes: state.quizzes,
        vocabulary: state.vocabulary,
        currentLesson: state.currentLesson,
        currentQuiz: state.currentQuiz,
        lastUpdated: state.lastUpdated,
      }),
    }
  )
);

// Selectors
export const useLessons = () => useContentStore((state) => state.lessons);
export const useQuizzes = () => useContentStore((state) => state.quizzes);
export const useVocabulary = () => useContentStore((state) => state.vocabulary);
export const useCurrentLesson = () => useContentStore((state) => state.currentLesson);
export const useCurrentQuiz = () => useContentStore((state) => state.currentQuiz);
export const useContentLoading = () => useContentStore((state) => state.loading);
export const useContentError = () => useContentStore((state) => state.error);
export const useLastUpdated = () => useContentStore((state) => state.lastUpdated);

// Computed selectors
export const useLessonsByLevel = (level: string) => 
  useContentStore((state) => 
    state.lessons.filter(lesson => lesson.level === level)
  );

export const useQuizzesByLesson = (lessonId: string) => 
  useContentStore((state) => 
    state.quizzes.filter(quiz => quiz.lessonId === lessonId)
  );

export const useVocabularyByLevel = (level: string) => 
  useContentStore((state) => 
    state.vocabulary.filter(word => word.level === level)
  );

export const useLessonsByDifficulty = (difficulty: number) => 
  useContentStore((state) => 
    state.lessons.filter(lesson => lesson.difficulty === difficulty)
  );

export const useSearchContent = (query: string) => {
  const lessons = useContentStore((state) => state.lessons);
  const quizzes = useContentStore((state) => state.quizzes);
  const vocabulary = useContentStore((state) => state.vocabulary);
  
  const searchTerm = query.toLowerCase();
  
  return {
    lessons: lessons.filter(lesson =>
      lesson.title.toLowerCase().includes(searchTerm) ||
      lesson.description.toLowerCase().includes(searchTerm) ||
      lesson.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    ),
    quizzes: quizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(searchTerm) ||
      quiz.description.toLowerCase().includes(searchTerm)
    ),
    vocabulary: vocabulary.filter(word =>
      word.greek.toLowerCase().includes(searchTerm) ||
      word.translation.toLowerCase().includes(searchTerm) ||
      word.pronunciation.toLowerCase().includes(searchTerm)
    ),
  };
};
