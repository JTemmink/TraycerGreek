import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, PlayCircle, Target, Award } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-greek-50 via-white to-olive-50 py-20 lg:py-32">
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl greek-heading">
            Master Ancient Greek
            <span className="block text-greek-600">One Lesson at a Time</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Learn Ancient Greek with our comprehensive platform featuring adaptive lessons, 
            interactive quizzes, and gamified progress tracking. Perfect for students, 
            scholars, and anyone passionate about classical languages.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="bg-greek-600 hover:bg-greek-700" asChild>
              <Link href="/register">
                <PlayCircle className="h-5 w-5 mr-2" />
                Start Learning Free
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">
                Watch Demo
              </Link>
            </Button>
          </div>
        </div>

        {/* Features grid */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-greek-100 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-greek-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Interactive Lessons</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Learn with engaging, multimedia-rich content designed for all levels
            </p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-olive-100 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-olive-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Adaptive Learning</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Personalized learning paths that adapt to your progress and pace
            </p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 text-gold-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Gamification</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Earn points, badges, and achievements as you progress through lessons
            </p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <PlayCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Progress Tracking</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Detailed analytics and insights to monitor your learning journey
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 border-t pt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-greek-600">10,000+</div>
              <div className="text-sm text-muted-foreground">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-greek-600">50+</div>
              <div className="text-sm text-muted-foreground">Interactive Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-greek-600">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
