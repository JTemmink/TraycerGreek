// Content types for JSON-based lesson content
export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  difficulty: number; // 1-5 scale
  estimatedDuration: number; // in minutes
  orderIndex: number;
  tags: string[];
  prerequisites: string[];
  learningObjectives: string[];
  sections: LessonSection[];
  vocabulary: Vocabulary[];
  exercises: Exercise[];
  resources: Resource[];
  metadata: LessonMetadata;
}

export interface LessonSection {
  id: string;
  title: string;
  type: 'theory' | 'exercise' | 'vocabulary' | 'review';
  content: string; // HTML content
  order: number;
  examples?: Example[];
  questions?: Question[];
  vocabulary?: Vocabulary[];
  audioUrl?: string;
  videoUrl?: string;
  imageUrl?: string;
}

export interface Example {
  greek: string;
  translation: string;
  pronunciation?: string;
  explanation?: string;
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple_choice' | 'fill_in_blank' | 'matching' | 'drag_drop';
  options?: string[];
  correctAnswer: any;
  explanation?: string;
  points: number;
}

export interface Exercise {
  id: string;
  title: string;
  type: 'practice' | 'quiz' | 'game';
  description: string;
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
  instructions: string;
}

export interface Vocabulary {
  id: string;
  greek: string;
  translation: string;
  pronunciation: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'article' | 'pronoun';
  level: 'beginner' | 'intermediate' | 'advanced';
  frequency: number; // 1-100 scale
  examples: Example[];
  etymology?: string;
  relatedWords?: string[];
  audioUrl?: string;
  imageUrl?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'text' | 'audio' | 'video' | 'image' | 'document' | 'link';
  url: string;
  description?: string;
  duration?: number; // for audio/video
  size?: number; // in bytes
  format?: string; // file format
}

export interface LessonMetadata {
  author: string;
  version: string;
  lastUpdated: string;
  difficulty: {
    grammar: number;
    vocabulary: number;
    reading: number;
    writing: number;
  };
  estimatedTime: {
    reading: number;
    exercises: number;
    review: number;
  };
  prerequisites: string[];
  learningOutcomes: string[];
  tags: string[];
}

// Quiz types
export interface Quiz {
  id: string;
  title: string;
  description: string;
  lessonId: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  difficulty: number; // 1-5 scale
  timeLimit?: number; // in minutes
  passingScore: number; // percentage
  questions: QuizQuestion[];
  instructions: string;
  metadata: QuizMetadata;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'fill_in_blank' | 'matching' | 'drag_drop' | 'true_false';
  options?: string[];
  correctAnswer: any;
  explanation?: string;
  points: number;
  timeLimit?: number; // in seconds
  media?: {
    type: 'image' | 'audio' | 'video';
    url: string;
    alt?: string;
  };
  hints?: string[];
}

export interface QuizMetadata {
  author: string;
  version: string;
  lastUpdated: string;
  estimatedTime: number;
  difficulty: {
    overall: number;
    vocabulary: number;
    grammar: number;
    comprehension: number;
  };
  tags: string[];
  learningObjectives: string[];
}

// Content management types
export interface ContentMetadata {
  version: string;
  lastUpdated: string;
  totalLessons: number;
  totalQuizzes: number;
  totalVocabulary: number;
  levels: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
  categories: string[];
  authors: string[];
}

// Search and filtering types
export interface ContentFilter {
  level?: 'beginner' | 'intermediate' | 'advanced';
  difficulty?: number;
  tags?: string[];
  type?: 'lesson' | 'quiz' | 'vocabulary';
  search?: string;
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  lessons: Lesson[];
  quizzes: Quiz[];
  vocabulary: Vocabulary[];
  total: number;
  page: number;
  limit: number;
}

// Progress tracking types
export interface LessonProgress {
  lessonId: string;
  userId: string;
  progress: number; // 0-100
  completedSections: string[];
  timeSpent: number; // in minutes
  lastAccessed: string;
  completedAt?: string;
  score?: number;
}

export interface QuizProgress {
  quizId: string;
  userId: string;
  attempts: QuizAttempt[];
  bestScore: number;
  averageScore: number;
  totalAttempts: number;
  lastAttempt?: string;
  completedAt?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: Record<string, any>;
  score: number;
  timeSpent: number; // in minutes
  completedAt: string;
  passed: boolean;
}

// Adaptive learning types
export interface LearningPath {
  userId: string;
  currentLevel: string;
  recommendedLessons: string[];
  recommendedQuizzes: string[];
  vocabularyToReview: string[];
  estimatedCompletionTime: number;
  lastUpdated: string;
}

export interface DifficultyAdjustment {
  userId: string;
  lessonId: string;
  currentDifficulty: number;
  adjustedDifficulty: number;
  reason: string;
  timestamp: string;
}

// Content validation types
export interface ContentValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

export interface ContentValidationResult {
  isValid: boolean;
  errors: ContentValidationError[];
  warnings: ContentValidationError[];
}

// Export utility types
export type ContentType = 'lesson' | 'quiz' | 'vocabulary';
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
export type UserLevel = 'beginner' | 'intermediate' | 'advanced';
export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'article' | 'pronoun';
export type QuestionType = 'multiple_choice' | 'fill_in_blank' | 'matching' | 'drag_drop' | 'true_false';
export type ResourceType = 'text' | 'audio' | 'video' | 'image' | 'document' | 'link';
