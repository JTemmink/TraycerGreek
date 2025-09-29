# Traycer Greek - Ancient Greek Language Learning Platform

A comprehensive, modern web application for learning Ancient Greek featuring adaptive learning, gamification, and interactive content.

## 🚀 Features

- **Interactive Lessons**: Multimedia-rich content with audio pronunciation and visual aids
- **Adaptive Learning**: AI-powered system that adjusts difficulty based on your progress
- **Gamification**: Points, badges, streaks, and achievements to keep you motivated
- **Comprehensive Analytics**: Detailed progress tracking and performance insights
- **Community Learning**: Connect with fellow learners and participate in study groups
- **Flexible Scheduling**: Learn at your own pace with offline access
- **Accessibility**: Full WCAG 2.1 AA compliance with screen reader support

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **State Management**: Zustand
- **Testing**: Jest, React Testing Library, Playwright
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Supabase account
- Git

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/your-username/traycer-greek.git
cd traycer-greek
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Set up Supabase

1. Create a new Supabase project
2. Run the database migrations:

```bash
npx supabase db push
```

3. Set up Row Level Security policies (already included in migrations)

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
traycer-greek/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Dashboard pages
│   │   ├── (learning)/        # Learning pages
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components
│   │   ├── auth/             # Authentication components
│   │   ├── learning/         # Learning components
│   │   ├── dashboard/        # Dashboard components
│   │   └── layout/           # Layout components
│   ├── lib/                  # Utility functions
│   ├── store/                # Zustand stores
│   └── types/                # TypeScript type definitions
├── content/                   # JSON content files
│   ├── lessons/              # Lesson content
│   ├── vocabulary/           # Vocabulary data
│   └── quizzes/              # Quiz content
├── supabase/                 # Supabase configuration
│   ├── migrations/           # Database migrations
│   └── functions/            # Edge functions
├── __tests__/                # Unit tests
├── e2e/                      # End-to-end tests
└── public/                   # Static assets
```

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### Watch Mode

```bash
npm run test:watch
```

### Coverage

```bash
npm run test:coverage
```

### End-to-End Tests

```bash
npm run test:e2e
```

### E2E with UI

```bash
npm run test:e2e:ui
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📚 Content Management

### Adding New Lessons

1. Create a new JSON file in `content/lessons/[level]/`
2. Follow the lesson schema defined in `src/types/content.ts`
3. Update the lesson index in `content/lessons/index.json`

### Adding Vocabulary

1. Add new vocabulary entries to `content/vocabulary/basic-words.json`
2. Follow the vocabulary schema defined in `src/types/content.ts`

### Adding Quizzes

1. Create a new JSON file in `content/quizzes/`
2. Follow the quiz schema defined in `src/types/content.ts`
3. Update the quiz index in `content/quizzes/index.json`

## 🔧 Development

### Code Style

We use ESLint and Prettier for code formatting:

```bash
npm run lint
npm run format
```

### Type Checking

```bash
npm run type-check
```

### Building for Production

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

## 📞 Support

If you have any questions or need help, please:

1. Check the [documentation](https://docs.traycer-greek.com)
2. Search [existing issues](https://github.com/your-username/traycer-greek/issues)
3. Create a [new issue](https://github.com/your-username/traycer-greek/issues/new)

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced AI tutoring
- [ ] Collaborative learning features
- [ ] Integration with university systems
- [ ] Offline-first architecture
- [ ] Multi-language support

---

Made with ❤️ for Greek learners worldwide
