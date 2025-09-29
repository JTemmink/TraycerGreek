import { BookOpen, Target, Award, BarChart3, Users, Clock, CheckCircle, Star } from 'lucide-react';

const features = [
  {
    name: 'Adaptive Learning System',
    description: 'Our AI-powered system adjusts lesson difficulty and content based on your progress, ensuring optimal learning pace.',
    icon: Target,
    highlights: ['Personalized difficulty', 'Smart recommendations', 'Progress-based adjustments'],
  },
  {
    name: 'Interactive Lessons',
    description: 'Engage with multimedia-rich content including audio pronunciation, visual aids, and interactive exercises.',
    icon: BookOpen,
    highlights: ['Audio pronunciation', 'Visual learning aids', 'Interactive exercises'],
  },
  {
    name: 'Gamified Progress',
    description: 'Stay motivated with points, badges, streaks, and achievements that celebrate your learning milestones.',
    icon: Award,
    highlights: ['Points & badges', 'Learning streaks', 'Achievement system'],
  },
  {
    name: 'Comprehensive Analytics',
    description: 'Track your progress with detailed insights, performance metrics, and personalized learning recommendations.',
    icon: BarChart3,
    highlights: ['Progress tracking', 'Performance metrics', 'Learning insights'],
  },
  {
    name: 'Community Learning',
    description: 'Connect with fellow Greek learners, share progress, and participate in study groups and discussions.',
    icon: Users,
    highlights: ['Study groups', 'Progress sharing', 'Peer discussions'],
  },
  {
    name: 'Flexible Scheduling',
    description: 'Learn at your own pace with flexible scheduling and offline access to continue your studies anywhere.',
    icon: Clock,
    highlights: ['Self-paced learning', 'Offline access', 'Flexible scheduling'],
  },
];

export function Features() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl greek-heading">
            Everything you need to master Ancient Greek
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our comprehensive platform combines cutting-edge technology with proven 
            pedagogical methods to make learning Ancient Greek engaging and effective.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className="relative p-8 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-greek-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-greek-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional features */}
        <div className="mt-20 bg-muted/50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Why choose Traycer Greek?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students who have successfully learned Ancient Greek 
              with our proven methodology and cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-greek-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Proven Methodology
              </h4>
              <p className="text-muted-foreground">
                Based on decades of research in language acquisition and classical studies
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-olive-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Expert Content
              </h4>
              <p className="text-muted-foreground">
                Created by classical scholars and experienced language teachers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Award-Winning Platform
              </h4>
              <p className="text-muted-foreground">
                Recognized by educational institutions and language learning communities
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
