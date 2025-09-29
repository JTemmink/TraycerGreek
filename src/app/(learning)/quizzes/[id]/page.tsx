import { Metadata } from 'next';
import { QuizEngine } from '@/components/learning/quiz-engine';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { notFound } from 'next/navigation';
import { getQuizById } from '@/lib/content';

interface QuizPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const quiz = await getQuizById(params.id);
  
  if (!quiz) {
    return {
      title: 'Quiz Not Found',
    };
  }

  return {
    title: quiz.title,
    description: quiz.description,
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const quiz = await getQuizById(params.id);

  if (!quiz) {
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
              <h1 className="text-3xl font-bold text-foreground greek-heading">
                {quiz.title}
              </h1>
              <p className="text-muted-foreground mt-2">
                {quiz.description}
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-4">
                <span>Questions: {quiz.questions.length}</span>
                <span>•</span>
                <span>Time limit: {quiz.timeLimit ? `${quiz.timeLimit} min` : 'No limit'}</span>
                <span>•</span>
                <span>Passing score: {quiz.passingScore}%</span>
              </div>
            </div>

            <QuizEngine quiz={quiz} />
          </div>
        </main>
      </div>
    </div>
  );
}
