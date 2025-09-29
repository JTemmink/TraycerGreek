import type { Metadata } from 'next';
import { Inter, Crimson_Text, Noto_Sans_Greek } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const notoSansGreek = Noto_Sans_Greek({
  subsets: ['greek'],
  variable: '--font-greek',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Traycer Greek - Ancient Greek Language Learning',
    template: '%s | Traycer Greek',
  },
  description: 'Master Ancient Greek with our comprehensive learning platform featuring adaptive lessons, interactive quizzes, and gamified progress tracking.',
  keywords: [
    'Ancient Greek',
    'Greek language',
    'language learning',
    'classical studies',
    'Greek alphabet',
    'Greek grammar',
    'Greek vocabulary',
    'online learning',
    'adaptive learning',
    'gamification',
  ],
  authors: [{ name: 'Traycer Greek Team' }],
  creator: 'Traycer Greek',
  publisher: 'Traycer Greek',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Traycer Greek - Ancient Greek Language Learning',
    description: 'Master Ancient Greek with our comprehensive learning platform featuring adaptive lessons, interactive quizzes, and gamified progress tracking.',
    siteName: 'Traycer Greek',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Traycer Greek - Ancient Greek Language Learning Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Traycer Greek - Ancient Greek Language Learning',
    description: 'Master Ancient Greek with our comprehensive learning platform featuring adaptive lessons, interactive quizzes, and gamified progress tracking.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${crimsonText.variable} ${notoSansGreek.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
