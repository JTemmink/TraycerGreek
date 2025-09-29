import { Metadata } from 'next';
import { AdminDashboard } from '@/components/dashboard/admin-dashboard';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Administrative dashboard for managing users, content, and platform analytics.',
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground greek-heading">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage users, content, and platform analytics
              </p>
            </div>
            <AdminDashboard />
          </div>
        </main>
      </div>
    </div>
  );
}
