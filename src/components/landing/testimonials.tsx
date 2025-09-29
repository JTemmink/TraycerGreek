import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. Sarah Johnson',
    title: 'Classics Professor, Harvard University',
    content: 'Traycer Greek has revolutionized how I teach Ancient Greek. The adaptive learning system ensures each student progresses at their optimal pace, while the gamification elements keep them engaged and motivated.',
    rating: 5,
    image: '/testimonials/sarah-johnson.jpg',
  },
  {
    name: 'Michael Chen',
    title: 'Graduate Student, Oxford University',
    content: 'As a graduate student in Classical Studies, I needed a comprehensive way to improve my Greek. Traycer Greek provided exactly that - structured lessons, detailed progress tracking, and excellent pronunciation guides.',
    rating: 5,
    image: '/testimonials/michael-chen.jpg',
  },
  {
    name: 'Dr. Elena Rodriguez',
    title: 'Independent Scholar',
    content: 'The vocabulary system is exceptional. The spaced repetition algorithm helped me retain Greek words more effectively than any other method I\'ve tried. The progress tracking keeps me motivated to continue learning.',
    rating: 5,
    image: '/testimonials/elena-rodriguez.jpg',
  },
  {
    name: 'James Wilson',
    title: 'High School Teacher',
    content: 'I use Traycer Greek with my advanced Latin students who want to learn Greek. The platform makes it easy to track their progress and the interactive exercises are perfect for classroom use.',
    rating: 5,
    image: '/testimonials/james-wilson.jpg',
  },
  {
    name: 'Dr. Maria Papadopoulos',
    title: 'Byzantine Studies Researcher',
    content: 'The historical context provided in each lesson is invaluable. It\'s not just about learning the language, but understanding the culture and history behind it. Highly recommended for serious students.',
    rating: 5,
    image: '/testimonials/maria-papadopoulos.jpg',
  },
  {
    name: 'Robert Thompson',
    title: 'Retired Engineer',
    content: 'I always wanted to learn Ancient Greek but thought it would be too difficult. Traycer Greek made it accessible and enjoyable. The gamification elements make learning feel like a game rather than work.',
    rating: 5,
    image: '/testimonials/robert-thompson.jpg',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl greek-heading">
            Loved by students and scholars worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our community of learners has to say about their experience with Traycer Greek.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-card rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="absolute top-4 right-4">
                <Quote className="h-6 w-6 text-muted-foreground/20" />
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-gold-500 fill-current" />
                ))}
              </div>

              <blockquote className="text-muted-foreground mb-6">
                "{testimonial.content}"
              </blockquote>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mr-4">
                  <span className="text-sm font-medium text-foreground">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <div className="text-3xl font-bold text-greek-600">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-greek-600">10,000+</div>
              <div className="text-sm text-muted-foreground">Happy Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-greek-600">95%</div>
              <div className="text-sm text-muted-foreground">Would Recommend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
