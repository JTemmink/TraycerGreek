'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { useAuthStore } from '@/store/auth-store';
import { Eye, EyeOff, Mail, Lock, User, Calendar } from 'lucide-react';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  preferredName: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  dateOfBirth: z.string().min(1, 'Please enter your date of birth'),
  learningGoals: z.array(z.string()).min(1, 'Please select at least one learning goal'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const learningGoals = [
  { id: 'academic', label: 'Academic study', description: 'For university or research purposes' },
  { id: 'personal', label: 'Personal interest', description: 'Learning for personal enrichment' },
  { id: 'travel', label: 'Travel and culture', description: 'Understanding Greek culture and history' },
  { id: 'career', label: 'Career advancement', description: 'Professional development' },
  { id: 'heritage', label: 'Heritage connection', description: 'Connecting with Greek heritage' },
];

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const router = useRouter();
  const { setUser, setProfile } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleGoalToggle = (goalId: string) => {
    const newGoals = selectedGoals.includes(goalId)
      ? selectedGoals.filter(id => id !== goalId)
      : [...selectedGoals, goalId];
    
    setSelectedGoals(newGoals);
    setValue('learningGoals', newGoals);
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { user, session } = await auth.signUp(data.email, data.password, {
        firstName: data.firstName,
        lastName: data.lastName,
        preferredName: data.preferredName,
        role: 'student',
      });
      
      if (user) {
        const profile = await auth.getUserProfile(user.id);
        
        setUser(user);
        setProfile(profile);
        
        // Redirect to dashboard
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Join thousands of students learning Ancient Greek
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input
              {...register('firstName')}
              type="text"
              placeholder="First name"
              label="First Name"
              leftIcon={<User className="h-4 w-4" />}
              error={errors.firstName?.message}
              disabled={isLoading}
            />

            <Input
              {...register('lastName')}
              type="text"
              placeholder="Last name"
              label="Last Name"
              leftIcon={<User className="h-4 w-4" />}
              error={errors.lastName?.message}
              disabled={isLoading}
            />
          </div>

          <Input
            {...register('preferredName')}
            type="text"
            placeholder="Preferred name (optional)"
            label="Preferred Name"
            leftIcon={<User className="h-4 w-4" />}
            error={errors.preferredName?.message}
            disabled={isLoading}
          />

          <Input
            {...register('email')}
            type="email"
            placeholder="Enter your email"
            label="Email"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            disabled={isLoading}
          />

          <Input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
            label="Password"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            error={errors.password?.message}
            disabled={isLoading}
            helperText="Must be at least 8 characters"
          />

          <Input
            {...register('confirmPassword')}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            label="Confirm Password"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            error={errors.confirmPassword?.message}
            disabled={isLoading}
          />

          <Input
            {...register('dateOfBirth')}
            type="date"
            label="Date of Birth"
            leftIcon={<Calendar className="h-4 w-4" />}
            error={errors.dateOfBirth?.message}
            disabled={isLoading}
          />

          <div className="space-y-3">
            <label className="text-sm font-medium">Learning Goals</label>
            <p className="text-sm text-muted-foreground">
              What motivates you to learn Ancient Greek?
            </p>
            <div className="grid grid-cols-1 gap-3">
              {learningGoals.map((goal) => (
                <label
                  key={goal.id}
                  className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-accent cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedGoals.includes(goal.id)}
                    onChange={() => handleGoalToggle(goal.id)}
                    className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{goal.label}</div>
                    <div className="text-xs text-muted-foreground">{goal.description}</div>
                  </div>
                </label>
              ))}
            </div>
            {errors.learningGoals && (
              <p className="text-sm text-destructive">{errors.learningGoals.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              required
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span>
              I agree to the{' '}
              <a href="/terms" className="text-primary hover:text-primary/80">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary hover:text-primary/80">
                Privacy Policy
              </a>
            </span>
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            Create account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
