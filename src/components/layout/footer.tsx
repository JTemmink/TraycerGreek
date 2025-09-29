import Link from 'next/link';
import { BookOpen, Mail, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-greek-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl greek-heading">Traycer Greek</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Master Ancient Greek with our comprehensive learning platform featuring 
              adaptive lessons, interactive quizzes, and gamified progress tracking.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Learning */}
          <div className="space-y-4">
            <h3 className="font-semibold">Learning</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/lessons" className="text-muted-foreground hover:text-foreground">
                  Lessons
                </Link>
              </li>
              <li>
                <Link href="/quizzes" className="text-muted-foreground hover:text-foreground">
                  Quizzes
                </Link>
              </li>
              <li>
                <Link href="/vocabulary" className="text-muted-foreground hover:text-foreground">
                  Vocabulary
                </Link>
              </li>
              <li>
                <Link href="/progress" className="text-muted-foreground hover:text-foreground">
                  Progress Tracking
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-muted-foreground hover:text-foreground">
                  Achievements
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-muted-foreground hover:text-foreground">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-foreground">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Traycer Greek. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Made with ❤️ for Greek learners</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
