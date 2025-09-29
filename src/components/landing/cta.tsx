import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlayCircle, ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-r from-greek-600 to-olive-600">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl greek-heading">
            Ready to start your Ancient Greek journey?
          </h2>
          <p className="mt-6 text-lg text-greek-100 max-w-2xl mx-auto">
            Join thousands of students who are already mastering Ancient Greek with Traycer Greek. 
            Start learning today and unlock the beauty of classical literature.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-greek-600 hover:bg-greek-50" asChild>
              <Link href="/register">
                <PlayCircle className="h-5 w-5 mr-2" />
                Start Learning Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-greek-600" asChild>
              <Link href="/demo">
                Watch Demo
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-greek-200">
            <p>No credit card required • 14-day free trial • Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
}
