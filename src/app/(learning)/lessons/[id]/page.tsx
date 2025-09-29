import { Metadata } from 'next';
import { LessonContent } from '@/components/learning/lesson-content';
import { ProgressTracker } from '@/components/learning/progress-tracker';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { notFound } from 'next/navigation';
import { getLessonById } from '@/lib/content';

interface LessonPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const lesson = await getLessonById(params.id);
  
  if (!lesson) {
    return {
      title: 'Lesson Not Found',
    };
  }

  return {
    title: lesson.title,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const lesson = await getLessonById(params.id);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground greek-heading">
                    {lesson.title}
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    {lesson.description}
                  </p>
                </div>
                <ProgressTracker lessonId={lesson.id} />
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Level: {lesson.level}</span>
                <span>•</span>
                <span>Duration: {lesson.estimatedDuration} min</span>
                <span>•</span>
                <span>Difficulty: {lesson.difficulty}/5</span>
              </div>
            </div>

            <LessonContent lesson={lesson} />
          </div>
        </main>
      </div>
    </div>
  );
}
