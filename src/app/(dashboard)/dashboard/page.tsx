import { Metadata } from 'next';
import { StudentDashboard } from '@/components/dashboard/student-dashboard';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your personal Ancient Greek learning dashboard with progress tracking and recommendations.',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground greek-heading">
                Welcome back!
              </h1>
              <p className="text-muted-foreground mt-2">
                Continue your Ancient Greek learning journey
              </p>
            </div>
            <StudentDashboard />
          </div>
        </main>
      </div>
    </div>
  );
}
