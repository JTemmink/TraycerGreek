import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Target, CheckCircle, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { getLessons } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Lessons',
  description: 'Browse and access all available Ancient Greek lessons organized by level and difficulty.',
};

export default async function LessonsPage() {
  const lessons = await getLessons();

  const lessonsByLevel = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.level]) {
      acc[lesson.level] = [];
    }
    acc[lesson.level].push(lesson);
    return acc;
  }, {} as Record<string, typeof lessons>);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground greek-heading">
                Lessons
              </h1>
              <p className="text-muted-foreground mt-2">
                Explore our comprehensive collection of Ancient Greek lessons
              </p>
            </div>

            {Object.entries(lessonsByLevel).map(([level, levelLessons]) => (
              <div key={level} className="mb-12">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-foreground capitalize mb-2">
                    {level} Level
                  </h2>
                  <p className="text-muted-foreground">
                    {levelLessons.length} lessons available
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {levelLessons.map((lesson) => (
                    <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg font-semibold">
                            {lesson.title}
                          </CardTitle>
                          <Badge variant="outline" className="capitalize">
                            {lesson.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {lesson.description}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-2" />
                            {lesson.estimatedDuration} minutes
                          </div>
                          
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Target className="h-4 w-4 mr-2" />
                            Difficulty: {lesson.difficulty}/5
                          </div>

                          <div className="flex items-center text-sm text-muted-foreground">
                            <BookOpen className="h-4 w-4 mr-2" />
                            {lesson.sections.length} sections
                          </div>

                          <div className="pt-2">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span>Progress</span>
                              <span>0%</span>
                            </div>
                            <Progress value={0} className="h-2" />
                          </div>

                          <Button asChild className="w-full">
                            <Link href={`/lessons/${lesson.id}`}>
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Start Lesson
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
