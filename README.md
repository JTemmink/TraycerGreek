# TraycerGreek - Ancient Greek Learning Platform

An interactive web application for learning Ancient Greek with comprehensive lessons, quizzes, vocabulary, and adaptive learning features.

## 🌟 Features

- **Interactive Lessons**: Structured learning path with beginner to advanced levels
- **Vocabulary Building**: Comprehensive Greek vocabulary with pronunciation guides
- **Quiz System**: Adaptive quizzes to test your knowledge
- **Progress Tracking**: Monitor your learning progress and achievements
- **Gamification**: Points, streaks, and achievements to keep you motivated
- **Adaptive Learning**: AI-powered recommendations based on your performance

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Testing**: Jest, Playwright
- **Deployment**: Docker, Vercel-ready

## 📚 Learning Content

### Beginner Level
- Greek Alphabet (Α-Ω)
- Basic Pronunciation
- Essential Vocabulary
- Simple Grammar

### Intermediate Level
- Verb Conjugations
- Noun Declensions
- Reading Practice
- Cultural Context

### Advanced Level
- Complex Grammar
- Literature Analysis
- Historical Texts
- Academic Writing

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Docker (optional, for containerization)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JTemmink/TraycerGreek.git
   cd TraycerGreek
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Database setup**
   ```bash
   # Run Supabase migrations
   supabase db reset
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   └── (learning)/        # Learning content pages
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard components
│   ├── learning/          # Learning components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility libraries
├── store/                 # State management
└── types/                 # TypeScript type definitions

content/                   # Learning content
├── lessons/              # Lesson content files
├── quizzes/              # Quiz content files
└── vocabulary/           # Vocabulary content files

supabase/                 # Database configuration
├── migrations/           # Database migrations
└── functions/            # Edge functions
```

## 🎯 Learning Features

### Adaptive Learning System
- Tracks your progress across all content
- Identifies weak areas and suggests practice
- Adjusts difficulty based on performance
- Provides personalized learning paths

### Gamification
- **Points System**: Earn points for completing lessons and quizzes
- **Achievements**: Unlock badges for milestones
- **Streaks**: Maintain daily learning streaks
- **Leaderboards**: Compare progress with other learners

### Content Management
- **Lessons**: Interactive content with multimedia
- **Quizzes**: Multiple choice, fill-in-the-blank, and matching exercises
- **Vocabulary**: Audio pronunciation and example sentences
- **Progress Tracking**: Detailed analytics of your learning journey

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:e2e     # Run end-to-end tests
```

### Database Migrations

```bash
# Create a new migration
supabase migration new migration_name

# Apply migrations
supabase db reset

# Generate TypeScript types
supabase gen types typescript --local > src/types/database.ts
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on every push

### Docker

```bash
# Build Docker image
docker build -t traycer-greek .

# Run container
docker run -p 3000:3000 traycer-greek
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Ancient Greek scholars and educators
- Open source community
- Supabase team for the excellent backend platform
- Next.js team for the amazing framework

## 📞 Support

If you have questions or need help:

- Open an [issue](https://github.com/JTemmink/TraycerGreek/issues)
- Check the [documentation](https://github.com/JTemmink/TraycerGreek/wiki)
- Join our community discussions

---

**Happy Learning! 🏛️📚**

*Master Ancient Greek with TraycerGreek - where classical knowledge meets modern technology.*