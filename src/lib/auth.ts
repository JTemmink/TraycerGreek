import { createClientSupabase } from './supabase-client';
import type { User, Session } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

export type UserRole = 'student' | 'instructor' | 'admin';

export interface UserProfile extends Database['public']['Tables']['profiles']['Row'] {
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
}

// Authentication helpers
export const auth = {
  // Get current user
  async getCurrentUser(): Promise<User | null> {
    const supabase = createClientSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Get current session
  async getCurrentSession(): Promise<Session | null> {
    const supabase = createClientSupabase();
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  // Get user profile with role
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const supabase = createClientSupabase();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) return null;

    return {
      ...data,
      role: data.role as UserRole,
    };
  },

  // Sign up with email and password
  async signUp(email: string, password: string, userData: {
    firstName: string;
    lastName: string;
    preferredName?: string;
    role?: UserRole;
  }) {
    const supabase = createClientSupabase();
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          preferred_name: userData.preferredName,
          role: userData.role || 'student',
        },
      },
    });

    if (error) throw error;

    // Profile creation is handled by the database trigger (handle_new_user)
    // No need to manually insert profile here

    return data;
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    const supabase = createClientSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Sign in with OAuth provider
  async signInWithProvider(provider: 'google' | 'github' | 'discord') {
    const supabase = createClientSupabase();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) throw error;
    return data;
  },

  // Sign out
  async signOut() {
    const supabase = createClientSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Reset password
  async resetPassword(email: string) {
    const supabase = createClientSupabase();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
    return data;
  },

  // Update password
  async updatePassword(newPassword: string) {
    const supabase = createClientSupabase();
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
    return data;
  },

  // Update user profile
  async updateProfile(userId: string, updates: Partial<Database['public']['Tables']['profiles']['Update']>) {
    const supabase = createClientSupabase();
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Check if user has permission
  hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
    const roleHierarchy: Record<UserRole, number> = {
      student: 1,
      instructor: 2,
      admin: 3,
    };

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  },

  // Check if user is authenticated
  isAuthenticated(user: User | null): boolean {
    return user !== null;
  },

  // Get user display name
  getDisplayName(profile: UserProfile | null): string {
    if (!profile) return 'Guest';
    
    if (profile.preferred_name) {
      return profile.preferred_name;
    }
    
    return `${profile.first_name} ${profile.last_name}`.trim();
  },

  // Get user initials
  getInitials(profile: UserProfile | null): string {
    if (!profile) return 'G';
    
    const firstName = profile.preferred_name || profile.first_name;
    const lastName = profile.last_name;
    
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  },
};

// Auth state management
export class AuthManager {
  private listeners: Set<(state: AuthState) => void> = new Set();
  private state: AuthState = {
    user: null,
    profile: null,
    session: null,
    loading: true,
  };

  constructor() {
    this.initialize();
  }

  private async initialize() {
    const supabase = createClientSupabase();
    
    // Get initial session
    const { data: { session } } = await supabase.auth.getSession();
    this.state.session = session;
    this.state.user = session?.user || null;

    if (this.state.user) {
      this.state.profile = await auth.getUserProfile(this.state.user.id);
    }

    this.state.loading = false;
    this.notifyListeners();

    // Listen for auth changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      this.state.session = session;
      this.state.user = session?.user || null;

      if (this.state.user) {
        this.state.profile = await auth.getUserProfile(this.state.user.id);
      } else {
        this.state.profile = null;
      }

      this.state.loading = false;
      this.notifyListeners();
    });
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getState(): AuthState {
    return { ...this.state };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

// Global auth manager instance
export const authManager = new AuthManager();
