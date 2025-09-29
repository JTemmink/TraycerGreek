import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Client component Supabase client
export const createClientSupabase = () => createClientComponentClient<Database>();

// Server component Supabase client
export const createServerSupabase = () => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
};

// Database query helpers
export const db = {
  // User queries
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateUserProfile(userId: string, updates: Partial<Database['public']['Tables']['profiles']['Update']>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Lesson queries
  async getLessons(level?: string, limit?: number) {
    let query = supabase
      .from('lessons')
      .select('*')
      .order('order_index', { ascending: true });

    if (level) {
      query = query.eq('level', level);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getLessonById(id: string) {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Quiz queries
  async getQuizzes(lessonId?: string, limit?: number) {
    let query = supabase
      .from('quizzes')
      .select('*')
      .order('created_at', { ascending: false });

    if (lessonId) {
      query = query.eq('lesson_id', lessonId);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getQuizById(id: string) {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Progress queries
  async getUserProgress(userId: string) {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async updateProgress(userId: string, lessonId: string, progress: Partial<Database['public']['Tables']['user_progress']['Update']>) {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        ...progress,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Quiz attempts
  async saveQuizAttempt(userId: string, quizId: string, score: number, answers: any[]) {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
        user_id: userId,
        quiz_id: quizId,
        score,
        answers,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Vocabulary queries
  async getVocabulary(level?: string, limit?: number) {
    let query = supabase
      .from('vocabulary')
      .select('*')
      .order('frequency_rank', { ascending: true });

    if (level) {
      query = query.eq('level', level);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Gamification queries
  async getUserAchievements(userId: string) {
    const { data, error } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getUserStats(userId: string) {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateUserStats(userId: string, stats: Partial<Database['public']['Tables']['user_stats']['Update']>) {
    const { data, error } = await supabase
      .from('user_stats')
      .upsert({
        user_id: userId,
        ...stats,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};

// Real-time subscriptions
export const subscribeToUserProgress = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('user_progress')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'user_progress',
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
};

export const subscribeToUserStats = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('user_stats')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'user_stats',
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
};
