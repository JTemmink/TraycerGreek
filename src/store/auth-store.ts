import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@supabase/supabase-js';
import type { UserProfile } from '@/lib/auth';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearAuth: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      profile: null,
      loading: false,
      error: null,

      // Actions
      setUser: (user) => set({ user }),
      
      setProfile: (profile) => set({ profile }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      clearAuth: () => set({
        user: null,
        profile: null,
        loading: false,
        error: null,
      }),
      
      updateProfile: (updates) => {
        const { profile } = get();
        if (profile) {
          set({
            profile: {
              ...profile,
              ...updates,
            },
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
      }),
    }
  )
);

// Selectors
export const useUser = () => useAuthStore((state) => state.user);
export const useProfile = () => useAuthStore((state) => state.profile);
export const useAuthLoading = () => useAuthStore((state) => state.loading);
export const useAuthError = () => useAuthStore((state) => state.error);
export const useIsAuthenticated = () => useAuthStore((state) => !!state.user);
export const useUserRole = () => useAuthStore((state) => state.profile?.role || 'student');
export const useUserLevel = () => useAuthStore((state) => state.profile?.level || 'beginner');
