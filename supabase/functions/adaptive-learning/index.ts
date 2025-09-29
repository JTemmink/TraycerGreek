import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UserProgress {
  user_id: string;
  lesson_id: string;
  progress: number;
  score?: number;
  time_spent: number;
  completed_at?: string;
  quiz_attempts: any[];
}

interface UserStats {
  user_id: string;
  total_points: number;
  lessons_completed: number;
  perfect_quizzes: number;
  vocabulary_learned: number;
  current_streak: number;
  weak_areas: string[];
  vocabulary_strength: number;
}

interface Recommendation {
  type: 'lesson' | 'quiz' | 'vocabulary' | 'review';
  item_id: string;
  reason: string;
  priority: number;
  estimated_time: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { user_id, action } = await req.json();

    if (!user_id) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user progress and stats
    const { data: progress, error: progressError } = await supabaseClient
      .from('user_progress')
      .select('*')
      .eq('user_id', user_id);

    if (progressError) {
      throw progressError;
    }

    const { data: stats, error: statsError } = await supabaseClient
      .from('user_stats')
      .select('*')
      .eq('user_id', user_id)
      .single();

    if (statsError) {
      throw statsError;
    }

    // Get available lessons
    const { data: lessons, error: lessonsError } = await supabaseClient
      .from('lessons')
      .select('*')
      .order('order_index');

    if (lessonsError) {
      throw lessonsError;
    }

    let recommendations: Recommendation[] = [];

    switch (action) {
      case 'generate_recommendations':
        recommendations = await generateRecommendations(progress, stats, lessons);
        break;
      case 'calculate_difficulty':
        const { lesson_id, performance } = await req.json();
        const difficulty = calculateDifficultyAdjustment(
          lessons.find(l => l.id === lesson_id)?.difficulty || 1,
          performance,
          1
        );
        return new Response(
          JSON.stringify({ difficulty }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      case 'calculate_mastery':
        const mastery = calculateMasteryLevel(progress, stats);
        return new Response(
          JSON.stringify({ mastery }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    // Save recommendations to database
    if (recommendations.length > 0) {
      const { error: insertError } = await supabaseClient
        .from('adaptive_recommendations')
        .insert(
          recommendations.map(rec => ({
            user_id,
            type: rec.type,
            item_id: rec.item_id,
            reason: rec.reason,
            priority: rec.priority,
            estimated_time: rec.estimated_time,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
          }))
        );

      if (insertError) {
        throw insertError;
      }
    }

    return new Response(
      JSON.stringify({ recommendations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in adaptive learning function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function generateRecommendations(
  progress: UserProgress[],
  stats: UserStats,
  lessons: any[]
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Analyze weak areas
  const weakAreas = identifyWeakAreas(progress);
  
  // Recommend lessons based on weak areas
  for (const area of weakAreas) {
    const relevantLessons = lessons.filter(lesson =>
      lesson.tags.includes(area) || lesson.title.toLowerCase().includes(area)
    );
    
    for (const lesson of relevantLessons) {
      if (!hasCompletedLesson(progress, lesson.id)) {
        recommendations.push({
          type: 'lesson',
          item_id: lesson.id,
          reason: `Focus on ${area} to improve your understanding`,
          priority: calculatePriority(area, stats),
          estimated_time: lesson.estimated_duration,
        });
      }
    }
  }

  // Recommend vocabulary practice
  if (stats.vocabulary_strength < 0.6) {
    recommendations.push({
      type: 'vocabulary',
      item_id: 'vocabulary-practice',
      reason: 'Strengthen your vocabulary foundation',
      priority: 80,
      estimated_time: 15,
    });
  }

  // Recommend review sessions
  const reviewRecommendations = generateReviewRecommendations(progress);
  recommendations.push(...reviewRecommendations);

  // Sort by priority
  return recommendations.sort((a, b) => b.priority - a.priority);
}

function identifyWeakAreas(progress: UserProgress[]): string[] {
  const weakAreas: string[] = [];
  const areaPerformance = new Map<string, { total: number; correct: number }>();
  
  for (const prog of progress) {
    if (prog.quiz_attempts && prog.quiz_attempts.length > 0) {
      const latestAttempt = prog.quiz_attempts[prog.quiz_attempts.length - 1];
      const score = latestAttempt.score;
      
      // Get lesson tags/areas (this would need to be fetched from lessons table)
      const areas = ['grammar', 'vocabulary', 'pronunciation']; // Simplified
      
      for (const area of areas) {
        if (!areaPerformance.has(area)) {
          areaPerformance.set(area, { total: 0, correct: 0 });
        }
        
        const current = areaPerformance.get(area)!;
        current.total += 1;
        current.correct += score;
      }
    }
  }
  
  // Identify areas with performance below 70%
  for (const [area, performance] of areaPerformance) {
    const averageScore = performance.correct / performance.total;
    if (averageScore < 0.7) {
      weakAreas.push(area);
    }
  }
  
  return weakAreas;
}

function hasCompletedLesson(progress: UserProgress[], lessonId: string): boolean {
  return progress.some(p => p.lesson_id === lessonId && p.completed_at !== null);
}

function calculatePriority(area: string, stats: UserStats): number {
  let priority = 50; // Base priority
  
  // Increase priority for areas with low performance
  if (stats.weak_areas?.includes(area)) {
    priority += 30;
  }
  
  return Math.min(priority, 100);
}

function generateReviewRecommendations(progress: UserProgress[]): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const now = new Date();
  
  for (const prog of progress) {
    if (prog.completed_at) {
      const completedDate = new Date(prog.completed_at);
      const daysSinceCompletion = (now.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24);
      
      // Recommend review if it's been more than 7 days
      if (daysSinceCompletion > 7) {
        recommendations.push({
          type: 'review',
          item_id: prog.lesson_id,
          reason: `Review lesson to reinforce learning`,
          priority: 60,
          estimated_time: 10,
        });
      }
    }
  }
  
  return recommendations;
}

function calculateDifficultyAdjustment(
  currentDifficulty: number,
  performance: number,
  attempts: number
): number {
  const adjustmentFactor = 0.1;
  const performanceThreshold = 0.7;
  
  if (performance >= performanceThreshold) {
    return Math.min(currentDifficulty + adjustmentFactor, 5.0);
  } else if (performance < performanceThreshold && attempts > 2) {
    return Math.max(currentDifficulty - adjustmentFactor, 1.0);
  }
  
  return currentDifficulty;
}

function calculateMasteryLevel(progress: UserProgress[], stats: UserStats): number {
  let totalScore = 0;
  let totalWeight = 0;
  
  const now = new Date();
  
  for (const prog of progress) {
    if (prog.completed_at) {
      const completedDate = new Date(prog.completed_at);
      const daysSinceCompletion = (now.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24);
      
      // Weight decreases over time
      const weight = Math.max(1, 10 - daysSinceCompletion);
      
      totalScore += (prog.score || 0) * weight;
      totalWeight += weight;
    }
  }
  
  if (totalWeight === 0) return 0;
  
  const averageScore = totalScore / totalWeight;
  return Math.min(Math.max(averageScore, 0), 100);
}
