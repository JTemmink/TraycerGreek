import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Clock, CheckCircle, PlayCircle, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { getQuizzes } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Quizzes',
  description: 'Test your Ancient Greek knowledge with our interactive quizzes and assessments.',
};

export default async function QuizzesPage() {
  const quizzes = await getQuizzes();

  const quizzesByLevel = quizzes.reduce((acc, quiz) => {
    if (!acc[quiz.level]) {
      acc[quiz.level] = [];
    }
    acc[quiz.level].push(quiz);
    return acc;
  }, {} as Record<string, typeof quizzes>);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground greek-heading">
                Quizzes
              </h1>
              <p className="text-muted-foreground mt-2">
                Test your knowledge and track your progress with our interactive quizzes
              </p>
            </div>

            {Object.entries(quizzesByLevel).map(([level, levelQuizzes]) => (
              <div key={level} className="mb-12">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-foreground capitalize mb-2">
                    {level} Level Quizzes
                  </h2>
                  <p className="text-muted-foreground">
                    {levelQuizzes.length} quizzes available
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {levelQuizzes.map((quiz) => (
                    <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg font-semibold">
                            {quiz.title}
                          </CardTitle>
                          <Badge variant="outline" className="capitalize">
                            {quiz.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {quiz.description}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-2" />
                            {quiz.estimatedDuration} minutes
                          </div>
                          
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Target className="h-4 w-4 mr-2" />
                            {quiz.questions.length} questions
                          </div>

                          <div className="flex items-center text-sm text-muted-foreground">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Passing score: {quiz.passingScore}%
                          </div>

                          <div className="pt-2">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span>Best Score</span>
                              <span>Not attempted</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full">
                              <div className="h-2 bg-muted rounded-full" style={{ width: '0%' }} />
                            </div>
                          </div>

                          <Button asChild className="w-full">
                            <Link href={`/quizzes/${quiz.id}`}>
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Start Quiz
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
