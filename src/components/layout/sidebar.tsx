'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  BookOpen, 
  Target, 
  Award, 
  BarChart3, 
  Settings,
  Home,
  PlayCircle,
  CheckCircle,
  Clock,
  Trophy,
  Users
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { useLearningStore } from '@/store/learning-store';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Lessons',
    href: '/lessons',
    icon: BookOpen,
  },
  {
    name: 'Quizzes',
    href: '/quizzes',
    icon: Target,
  },
  {
    name: 'Vocabulary',
    href: '/vocabulary',
    icon: Award,
  },
  {
    name: 'Progress',
    href: '/progress',
    icon: BarChart3,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

const adminNavigation = [
  {
    name: 'Admin Dashboard',
    href: '/admin',
    icon: Users,
  },
  {
    name: 'User Management',
    href: '/admin/users',
    icon: Users,
  },
  {
    name: 'Content Management',
    href: '/admin/content',
    icon: BookOpen,
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useAuthStore();
  const { userStats } = useLearningStore();

  const isAdmin = profile?.role === 'admin';
  const navItems = isAdmin ? [...navigation, ...adminNavigation] : navigation;

  const currentStreak = userStats?.current_streak || 0;
  const totalPoints = userStats?.total_points || 0;
  const level = Math.floor(Math.sqrt(totalPoints / 1000)) + 1;

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16 lg:pb-0 lg:overflow-y-auto lg:bg-muted/30">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        {/* User info */}
        <div className="flex items-center flex-shrink-0 px-4 mb-6">
          <div className="w-10 h-10 bg-greek-100 rounded-full flex items-center justify-center">
            <span className="text-lg font-medium text-greek-600">
              {profile?.preferred_name?.[0] || profile?.first_name?.[0] || 'U'}
            </span>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-foreground">
              {profile?.preferred_name || profile?.first_name} {profile?.last_name}
            </div>
            <div className="text-xs text-muted-foreground">
              Level {level} • {totalPoints} pts
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="px-4 mb-6">
          <div className="bg-card rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Streak</span>
              <span className="font-medium text-gold-600">
                {currentStreak} 🔥
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Lessons</span>
              <span className="font-medium">
                {userStats?.lessons_completed || 0}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Perfect Quizzes</span>
              <span className="font-medium">
                {userStats?.perfect_quizzes || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-greek-100 text-greek-700'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    isActive ? 'text-greek-600' : 'text-muted-foreground group-hover:text-foreground'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Quick actions */}
        <div className="px-4 mt-6">
          <div className="space-y-2">
            <Button className="w-full bg-greek-600 hover:bg-greek-700" asChild>
              <Link href="/lessons">
                <PlayCircle className="h-4 w-4 mr-2" />
                Continue Learning
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/progress">
                <CheckCircle className="h-4 w-4 mr-2" />
                View Progress
              </Link>
            </Button>
          </div>
        </div>

        {/* Recent activity */}
        <div className="px-4 mt-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Recent Activity
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Completed "Greek Alphabet"</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Trophy className="h-3 w-3" />
              <span>Earned "First Steps" badge</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Target className="h-3 w-3" />
              <span>Perfect score on Quiz 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
