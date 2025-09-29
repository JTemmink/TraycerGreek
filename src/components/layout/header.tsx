'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  BookOpen,
  Bell,
  Search
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { useLearningStore } from '@/store/learning-store';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, profile, clearAuth } = useAuthStore();
  const { userStats } = useLearningStore();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Clear auth state
      clearAuth();
      
      // Redirect to home
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const currentStreak = userStats?.current_streak || 0;
  const totalPoints = userStats?.total_points || 0;
  const level = Math.floor(Math.sqrt(totalPoints / 1000)) + 1;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-greek-600 rounded-lg flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl greek-heading">Traycer Greek</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/lessons" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Lessons
          </Link>
          <Link 
            href="/quizzes" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Quizzes
          </Link>
          <Link 
            href="/vocabulary" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Vocabulary
          </Link>
          <Link 
            href="/progress" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Progress
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* User stats */}
              <div className="hidden lg:flex items-center space-x-4">
                {currentStreak > 0 && (
                  <div className="flex items-center space-x-1 text-sm">
                    <span className="text-gold-600">🔥</span>
                    <span className="font-medium">{currentStreak}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1 text-sm">
                  <span className="text-greek-600 font-medium">Level {level}</span>
                  <Badge variant="outline" className="text-xs">
                    {totalPoints} pts
                  </Badge>
                </div>
              </div>

              {/* Search */}
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-4 w-4" />
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
              </Button>

              {/* Profile dropdown */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="relative"
                >
                  <div className="w-8 h-8 bg-greek-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-greek-600">
                      {profile?.preferred_name?.[0] || profile?.first_name?.[0] || 'U'}
                    </span>
                  </div>
                </Button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg z-50">
                    <div className="p-3 border-b">
                      <div className="text-sm font-medium">
                        {profile?.preferred_name || profile?.first_name} {profile?.last_name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {profile?.email}
                      </div>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center px-3 py-2 text-sm hover:bg-accent"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center px-3 py-2 text-sm hover:bg-accent"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent text-left"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get started</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/lessons" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Lessons
              </Link>
              <Link 
                href="/quizzes" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Quizzes
              </Link>
              <Link 
                href="/vocabulary" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Vocabulary
              </Link>
              <Link 
                href="/progress" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Progress
              </Link>
            </nav>
            
            {user && (
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-greek-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-greek-600">
                      {profile?.preferred_name?.[0] || profile?.first_name?.[0] || 'U'}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      {profile?.preferred_name || profile?.first_name} {profile?.last_name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Level {level} • {totalPoints} pts
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/profile">Settings</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={handleSignOut}>
                    Sign out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
