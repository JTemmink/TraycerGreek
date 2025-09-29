import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with Ancient Greek',
    features: [
      'Access to 10 beginner lessons',
      'Basic vocabulary (100 words)',
      'Simple progress tracking',
      'Community support',
      'Mobile app access',
    ],
    limitations: [
      'Limited to beginner content',
      'No advanced features',
      'Basic analytics only',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Student',
    price: '$19',
    period: 'per month',
    description: 'Ideal for students and serious learners',
    features: [
      'Access to all lessons (50+)',
      'Complete vocabulary database (1000+ words)',
      'Advanced progress tracking',
      'Adaptive learning system',
      'Quiz and assessment tools',
      'Offline access',
      'Priority support',
      'Achievement system',
    ],
    limitations: [],
    cta: 'Start Student Plan',
    popular: true,
  },
  {
    name: 'Scholar',
    price: '$39',
    period: 'per month',
    description: 'For researchers and advanced students',
    features: [
      'Everything in Student plan',
      'Advanced grammar tools',
      'Historical context materials',
      'Text analysis tools',
      'Custom study plans',
      'Advanced analytics',
      '1-on-1 tutoring sessions',
      'Early access to new features',
    ],
    limitations: [],
    cta: 'Start Scholar Plan',
    popular: false,
  },
];

export function Pricing() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl greek-heading">
            Choose your learning journey
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free and upgrade as you progress. All plans include our core learning features.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative ${
                plan.popular
                  ? 'border-greek-200 shadow-lg scale-105'
                  : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-greek-600 text-white">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="mt-2 text-muted-foreground">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <li key={limitationIndex} className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-greek-600 hover:bg-greek-700'
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Can I change plans anytime?
                </h4>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Is there a free trial?
                </h4>
                <p className="text-muted-foreground">
                  Our Free plan is available forever with no time limits. Paid plans include a 14-day free trial.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Do you offer student discounts?
                </h4>
                <p className="text-muted-foreground">
                  Yes, we offer 50% off for verified students and educators. Contact support for more information.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Can I cancel anytime?
                </h4>
                <p className="text-muted-foreground">
                  Absolutely. You can cancel your subscription at any time with no cancellation fees.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Is my data secure?
                </h4>
                <p className="text-muted-foreground">
                  Yes, we use enterprise-grade security to protect your data and learning progress.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Do you offer group discounts?
                </h4>
                <p className="text-muted-foreground">
                  Yes, we offer special pricing for institutions and groups of 10+ users. Contact us for details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
