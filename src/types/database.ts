// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          preferred_name?: string;
          email: string;
          role: 'student' | 'instructor' | 'admin';
          level: 'beginner' | 'intermediate' | 'advanced';
          avatar_url?: string;
          bio?: string;
          learning_goals?: string[];
          date_of_birth?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          first_name: string;
          last_name: string;
          preferred_name?: string;
          email: string;
          role?: 'student' | 'instructor' | 'admin';
          level?: 'beginner' | 'intermediate' | 'advanced';
          avatar_url?: string;
          bio?: string;
          learning_goals?: string[];
          date_of_birth?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          preferred_name?: string;
          email?: string;
          role?: 'student' | 'instructor' | 'admin';
          level?: 'beginner' | 'intermediate' | 'advanced';
          avatar_url?: string;
          bio?: string;
          learning_goals?: string[];
          date_of_birth?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      lessons: {
        Row: {
          id: string;
          title: string;
          description: string;
          level: 'beginner' | 'intermediate' | 'advanced';
          difficulty: number;
          estimated_duration: number;
          order_index: number;
          content: any; // JSON content
          tags: string[];
          prerequisites: string[];
          learning_objectives: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          level: 'beginner' | 'intermediate' | 'advanced';
          difficulty: number;
          estimated_duration: number;
          order_index: number;
          content: any;
          tags: string[];
          prerequisites: string[];
          learning_objectives: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          level?: 'beginner' | 'intermediate' | 'advanced';
          difficulty?: number;
          estimated_duration?: number;
          order_index?: number;
          content?: any;
          tags?: string[];
          prerequisites?: string[];
          learning_objectives?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      quizzes: {
        Row: {
          id: string;
          title: string;
          description: string;
          lesson_id: string;
          level: 'beginner' | 'intermediate' | 'advanced';
          difficulty: number;
          time_limit?: number;
          passing_score: number;
          questions: any; // JSON questions
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          lesson_id: string;
          level: 'beginner' | 'intermediate' | 'advanced';
          difficulty: number;
          time_limit?: number;
          passing_score: number;
          questions: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          lesson_id?: string;
          level?: 'beginner' | 'intermediate' | 'advanced';
          difficulty?: number;
          time_limit?: number;
          passing_score?: number;
          questions?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      vocabulary: {
        Row: {
          id: string;
          greek: string;
          translation: string;
          pronunciation: string;
          part_of_speech: string;
          level: 'beginner' | 'intermediate' | 'advanced';
          frequency: number;
          examples: any; // JSON examples
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          greek: string;
          translation: string;
          pronunciation: string;
          part_of_speech: string;
          level: 'beginner' | 'intermediate' | 'advanced';
          frequency: number;
          examples: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          greek?: string;
          translation?: string;
          pronunciation?: string;
          part_of_speech?: string;
          level?: 'beginner' | 'intermediate' | 'advanced';
          frequency?: number;
          examples?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          progress: number;
          score?: number;
          time_spent: number;
          completed_at?: string;
          quiz_attempts: any[]; // JSON quiz attempts
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          progress?: number;
          score?: number;
          time_spent?: number;
          completed_at?: string;
          quiz_attempts?: any[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          progress?: number;
          score?: number;
          time_spent?: number;
          completed_at?: string;
          quiz_attempts?: any[];
          created_at?: string;
          updated_at?: string;
        };
      };
      quiz_attempts: {
        Row: {
          id: string;
          user_id: string;
          quiz_id: string;
          score: number;
          answers: any; // JSON answers
          completed_at: string;
          time_spent: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          quiz_id: string;
          score: number;
          answers: any;
          completed_at: string;
          time_spent: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          quiz_id?: string;
          score?: number;
          answers?: any;
          completed_at?: string;
          time_spent?: number;
          created_at?: string;
        };
      };
      user_stats: {
        Row: {
          id: string;
          user_id: string;
          total_points: number;
          lessons_completed: number;
          lessons_in_progress: number;
          perfect_quizzes: number;
          vocabulary_learned: number;
          current_streak: number;
          longest_streak: number;
          total_study_time: number;
          weekly_goal: number;
          weekly_goal_progress: number;
          daily_activity: any; // JSON daily activity
          weak_areas: string[];
          last_studied_areas: any; // JSON last studied areas
          vocabulary_strength: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_points?: number;
          lessons_completed?: number;
          lessons_in_progress?: number;
          perfect_quizzes?: number;
          vocabulary_learned?: number;
          current_streak?: number;
          longest_streak?: number;
          total_study_time?: number;
          weekly_goal?: number;
          weekly_goal_progress?: number;
          daily_activity?: any;
          weak_areas?: string[];
          last_studied_areas?: any;
          vocabulary_strength?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total_points?: number;
          lessons_completed?: number;
          lessons_in_progress?: number;
          perfect_quizzes?: number;
          vocabulary_learned?: number;
          current_streak?: number;
          longest_streak?: number;
          total_study_time?: number;
          weekly_goal?: number;
          weekly_goal_progress?: number;
          daily_activity?: any;
          weak_areas?: string[];
          last_studied_areas?: any;
          vocabulary_strength?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_type: 'milestone' | 'streak' | 'performance' | 'vocabulary' | 'time';
          title: string;
          description: string;
          points: number;
          icon: string;
          earned_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          achievement_type: 'milestone' | 'streak' | 'performance' | 'vocabulary' | 'time';
          title: string;
          description: string;
          points: number;
          icon: string;
          earned_at: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          achievement_type?: 'milestone' | 'streak' | 'performance' | 'vocabulary' | 'time';
          title?: string;
          description?: string;
          points?: number;
          icon?: string;
          earned_at?: string;
          created_at?: string;
        };
      };
      adaptive_recommendations: {
        Row: {
          id: string;
          user_id: string;
          type: 'lesson' | 'quiz' | 'vocabulary' | 'review';
          item_id: string;
          reason: string;
          priority: number;
          estimated_time: number;
          created_at: string;
          expires_at?: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'lesson' | 'quiz' | 'vocabulary' | 'review';
          item_id: string;
          reason: string;
          priority: number;
          estimated_time: number;
          created_at?: string;
          expires_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: 'lesson' | 'quiz' | 'vocabulary' | 'review';
          item_id?: string;
          reason?: string;
          priority?: number;
          estimated_time?: number;
          created_at?: string;
          expires_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Type aliases for easier use
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Lesson = Database['public']['Tables']['lessons']['Row'];
export type Quiz = Database['public']['Tables']['quizzes']['Row'];
export type Vocabulary = Database['public']['Tables']['vocabulary']['Row'];
export type UserProgress = Database['public']['Tables']['user_progress']['Row'];
export type QuizAttempt = Database['public']['Tables']['quiz_attempts']['Row'];
export type UserStats = Database['public']['Tables']['user_stats']['Row'];
export type UserAchievement = Database['public']['Tables']['user_achievements']['Row'];
export type AdaptiveRecommendation = Database['public']['Tables']['adaptive_recommendations']['Row'];

// Insert types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type LessonInsert = Database['public']['Tables']['lessons']['Insert'];
export type QuizInsert = Database['public']['Tables']['quizzes']['Insert'];
export type VocabularyInsert = Database['public']['Tables']['vocabulary']['Insert'];
export type UserProgressInsert = Database['public']['Tables']['user_progress']['Insert'];
export type QuizAttemptInsert = Database['public']['Tables']['quiz_attempts']['Insert'];
export type UserStatsInsert = Database['public']['Tables']['user_stats']['Insert'];
export type UserAchievementInsert = Database['public']['Tables']['user_achievements']['Insert'];
export type AdaptiveRecommendationInsert = Database['public']['Tables']['adaptive_recommendations']['Insert'];

// Update types
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
export type LessonUpdate = Database['public']['Tables']['lessons']['Update'];
export type QuizUpdate = Database['public']['Tables']['quizzes']['Update'];
export type VocabularyUpdate = Database['public']['Tables']['vocabulary']['Update'];
export type UserProgressUpdate = Database['public']['Tables']['user_progress']['Update'];
export type QuizAttemptUpdate = Database['public']['Tables']['quiz_attempts']['Update'];
export type UserStatsUpdate = Database['public']['Tables']['user_stats']['Update'];
export type UserAchievementUpdate = Database['public']['Tables']['user_achievements']['Update'];
export type AdaptiveRecommendationUpdate = Database['public']['Tables']['adaptive_recommendations']['Update'];
