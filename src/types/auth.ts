// Authentication types
export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  email_confirmed_at?: string;
  last_sign_in_at?: string;
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  aud: string;
  role?: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
  user: User;
}

export interface AuthError {
  message: string;
  status?: number;
  code?: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: AuthError | null;
}

// User profile types
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  preferredName?: string;
  email: string;
  role: UserRole;
  level: UserLevel;
  avatarUrl?: string;
  bio?: string;
  learningGoals?: string[];
  dateOfBirth?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'student' | 'instructor' | 'admin';
export type UserLevel = 'beginner' | 'intermediate' | 'advanced';

// Authentication form types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  preferredName?: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  learningGoals: string[];
  agreeToTerms: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
  token: string;
}

// Social authentication types
export type SocialProvider = 'google' | 'github' | 'discord' | 'facebook' | 'twitter';

export interface SocialAuthOptions {
  provider: SocialProvider;
  redirectTo?: string;
  scopes?: string[];
}

// Permission types
export interface Permission {
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

export interface Role {
  name: string;
  permissions: Permission[];
  description?: string;
}

// Session management types
export interface SessionConfig {
  autoRefresh: boolean;
  persistSession: boolean;
  detectSessionInUrl: boolean;
  refreshThreshold: number; // in seconds
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: User;
}

// Multi-factor authentication types
export interface MFAConfig {
  enabled: boolean;
  methods: MFAMethod[];
  backupCodes?: string[];
}

export type MFAMethod = 'totp' | 'sms' | 'email' | 'backup_code';

export interface MFAChallenge {
  id: string;
  method: MFAMethod;
  expiresAt: string;
  challengeCode?: string;
}

// Account security types
export interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  suspiciousActivityAlerts: boolean;
  sessionTimeout: number; // in minutes
  allowedIPs?: string[];
  blockedIPs?: string[];
}

export interface LoginAttempt {
  id: string;
  userId: string;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  timestamp: string;
  location?: {
    country: string;
    city: string;
    region: string;
  };
}

// Password management types
export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  maxAge: number; // in days
  preventReuse: number; // number of previous passwords to check
}

export interface PasswordStrength {
  score: number; // 0-100
  feedback: string[];
  suggestions: string[];
}

// Account verification types
export interface EmailVerification {
  email: string;
  verified: boolean;
  verifiedAt?: string;
  verificationToken?: string;
  expiresAt?: string;
}

export interface PhoneVerification {
  phone: string;
  verified: boolean;
  verifiedAt?: string;
  verificationCode?: string;
  expiresAt?: string;
}

// User preferences types
export interface UserPreferences {
  language: string;
  timezone: string;
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    types: NotificationType[];
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showProgress: boolean;
    showAchievements: boolean;
  };
  learning: {
    dailyGoal: number;
    weeklyGoal: number;
    reminderTime: string;
    difficulty: UserLevel;
    preferredContentTypes: string[];
  };
}

export type NotificationType = 
  | 'lesson_completed'
  | 'achievement_earned'
  | 'streak_reminder'
  | 'weekly_report'
  | 'new_content'
  | 'system_update';

// Export utility types
export type AuthAction = 
  | 'login'
  | 'logout'
  | 'register'
  | 'forgot_password'
  | 'reset_password'
  | 'verify_email'
  | 'change_password'
  | 'update_profile';

export type AuthStatus = 
  | 'idle'
  | 'loading'
  | 'success'
  | 'error'
  | 'requires_verification'
  | 'requires_mfa';
