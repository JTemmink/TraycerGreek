'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClientSupabase } from '@/lib/supabase-client';
import { useAuthStore } from '@/store/auth-store';
import { useLearningStore } from '@/store/learning-store';
import { useContentStore } from '@/store/content-store';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);
  const { setUser, setProfile, setLoading, clearAuth } = useAuthStore();
  const { setUserProgress, setUserStats, setRecommendations } = useLearningStore();
  const { setLessons, setQuizzes, setVocabulary } = useContentStore();

  useEffect(() => {
    setMounted(true);
    
    // Initialize auth state
    const initializeAuth = async () => {
      setLoading(true);
      
      try {
        const supabase = createClientSupabase();
        
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          
          // Get user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            setProfile({
              ...profile,
              role: profile.role as 'student' | 'instructor' | 'admin',
            });
            
            // Load user data
            await loadUserData(session.user.id);
          }
        }
        
        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
              setUser(session.user);
              
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              if (profile) {
                setProfile({
                  ...profile,
                  role: profile.role as 'student' | 'instructor' | 'admin',
                });
                
                await loadUserData(session.user.id);
              }
            } else if (event === 'SIGNED_OUT') {
              clearAuth();
              setUserProgress([]);
              setUserStats(null);
              setRecommendations([]);
            }
          }
        );
        
        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    // Load user data
    const loadUserData = async (userId: string) => {
      try {
        const supabase = createClientSupabase();
        
        // Load user progress
        const { data: progress } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', userId);
        
        if (progress) {
          setUserProgress(progress);
        }
        
        // Load user stats
        const { data: stats } = await supabase
          .from('user_stats')
          .select('*')
          .eq('user_id', userId)
          .single();
        
        if (stats) {
          setUserStats(stats);
        }
        
        // Load recommendations
        const { data: recommendations } = await supabase
          .from('adaptive_recommendations')
          .select('*')
          .eq('user_id', userId)
          .order('priority', { ascending: false });
        
        if (recommendations) {
          setRecommendations(recommendations);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    // Load content
    const loadContent = async () => {
      try {
        // This would typically load from your content API
        // For now, we'll just initialize empty arrays
        setLessons([]);
        setQuizzes([]);
        setVocabulary([]);
      } catch (error) {
        console.error('Error loading content:', error);
      }
    };

    initializeAuth();
    loadContent();
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
