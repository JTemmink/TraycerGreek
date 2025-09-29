import type { Lesson, Quiz, Vocabulary, ContentMetadata } from '@/types/content';

// Content cache
const contentCache = new Map<string, any>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Cache helper functions
function getCached<T>(key: string): T | null {
  const entry = contentCache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  
  if (Date.now() - entry.timestamp > CACHE_DURATION) {
    contentCache.delete(key);
    return null;
  }
  
  return entry.data;
}

function setCached<T>(key: string, data: T): void {
  contentCache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

// Content loading functions
export async function loadContent<T>(path: string): Promise<T> {
  const cached = getCached<T>(path);
  if (cached) return cached;

  try {
    const response = await fetch(`/content/${path}`);
    if (!response.ok) {
      throw new Error(`Failed to load content: ${response.statusText}`);
    }
    
    const data = await response.json();
    setCached(path, data);
    return data;
  } catch (error) {
    console.error(`Error loading content from ${path}:`, error);
    throw error;
  }
}

// Lesson content management
export async function getLessons(level?: string): Promise<Lesson[]> {
  const lessons = await loadContent<Lesson[]>('lessons/index.json');
  
  if (level) {
    return lessons.filter(lesson => lesson.level === level);
  }
  
  return lessons;
}

export async function getLessonById(id: string): Promise<Lesson | null> {
  try {
    const lesson = await loadContent<Lesson>(`lessons/${id}.json`);
    return lesson;
  } catch (error) {
    console.error(`Error loading lesson ${id}:`, error);
    return null;
  }
}

export async function getLessonsByLevel(level: string): Promise<Lesson[]> {
  const lessons = await getLessons();
  return lessons.filter(lesson => lesson.level === level);
}

export async function getNextLesson(currentLessonId: string): Promise<Lesson | null> {
  const lessons = await getLessons();
  const currentIndex = lessons.findIndex(lesson => lesson.id === currentLessonId);
  
  if (currentIndex === -1 || currentIndex === lessons.length - 1) {
    return null;
  }
  
  return lessons[currentIndex + 1];
}

export async function getPreviousLesson(currentLessonId: string): Promise<Lesson | null> {
  const lessons = await getLessons();
  const currentIndex = lessons.findIndex(lesson => lesson.id === currentLessonId);
  
  if (currentIndex <= 0) {
    return null;
  }
  
  return lessons[currentIndex - 1];
}

// Quiz content management
export async function getQuizzes(lessonId?: string): Promise<Quiz[]> {
  const quizzes = await loadContent<Quiz[]>('quizzes/index.json');
  
  if (lessonId) {
    return quizzes.filter(quiz => quiz.lessonId === lessonId);
  }
  
  return quizzes;
}

export async function getQuizById(id: string): Promise<Quiz | null> {
  try {
    const quiz = await loadContent<Quiz>(`quizzes/${id}.json`);
    return quiz;
  } catch (error) {
    console.error(`Error loading quiz ${id}:`, error);
    return null;
  }
}

export async function getQuizzesByLesson(lessonId: string): Promise<Quiz[]> {
  const quizzes = await getQuizzes();
  return quizzes.filter(quiz => quiz.lessonId === lessonId);
}

// Vocabulary content management
export async function getVocabulary(level?: string, limit?: number): Promise<Vocabulary[]> {
  const vocabulary = await loadContent<Vocabulary[]>('vocabulary/index.json');
  
  let filtered = vocabulary;
  
  if (level) {
    filtered = filtered.filter(word => word.level === level);
  }
  
  if (limit) {
    filtered = filtered.slice(0, limit);
  }
  
  return filtered;
}

export async function getVocabularyById(id: string): Promise<Vocabulary | null> {
  try {
    const word = await loadContent<Vocabulary>(`vocabulary/${id}.json`);
    return word;
  } catch (error) {
    console.error(`Error loading vocabulary ${id}:`, error);
    return null;
  }
}

export async function getVocabularyByLevel(level: string, limit?: number): Promise<Vocabulary[]> {
  const vocabulary = await getVocabulary();
  const filtered = vocabulary.filter(word => word.level === level);
  
  if (limit) {
    return filtered.slice(0, limit);
  }
  
  return filtered;
}

// Content metadata
export async function getContentMetadata(): Promise<ContentMetadata> {
  return await loadContent<ContentMetadata>('metadata.json');
}

// Content validation
export function validateLesson(lesson: any): lesson is Lesson {
  return (
    typeof lesson === 'object' &&
    typeof lesson.id === 'string' &&
    typeof lesson.title === 'string' &&
    typeof lesson.description === 'string' &&
    typeof lesson.level === 'string' &&
    typeof lesson.difficulty === 'number' &&
    typeof lesson.estimatedDuration === 'number' &&
    Array.isArray(lesson.sections) &&
    Array.isArray(lesson.vocabulary) &&
    Array.isArray(lesson.exercises)
  );
}

export function validateQuiz(quiz: any): quiz is Quiz {
  return (
    typeof quiz === 'object' &&
    typeof quiz.id === 'string' &&
    typeof quiz.title === 'string' &&
    typeof quiz.description === 'string' &&
    typeof quiz.lessonId === 'string' &&
    typeof quiz.level === 'string' &&
    typeof quiz.passingScore === 'number' &&
    Array.isArray(quiz.questions)
  );
}

export function validateVocabulary(word: any): word is Vocabulary {
  return (
    typeof word === 'object' &&
    typeof word.id === 'string' &&
    typeof word.greek === 'string' &&
    typeof word.translation === 'string' &&
    typeof word.pronunciation === 'string' &&
    typeof word.partOfSpeech === 'string' &&
    typeof word.level === 'string' &&
    typeof word.frequency === 'number'
  );
}

// Content search
export async function searchContent(query: string, type?: 'lesson' | 'quiz' | 'vocabulary'): Promise<{
  lessons: Lesson[];
  quizzes: Quiz[];
  vocabulary: Vocabulary[];
}> {
  const results = {
    lessons: [] as Lesson[],
    quizzes: [] as Quiz[],
    vocabulary: [] as Vocabulary[],
  };

  const searchTerm = query.toLowerCase();

  if (!type || type === 'lesson') {
    const lessons = await getLessons();
    results.lessons = lessons.filter(lesson =>
      lesson.title.toLowerCase().includes(searchTerm) ||
      lesson.description.toLowerCase().includes(searchTerm) ||
      lesson.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  if (!type || type === 'quiz') {
    const quizzes = await getQuizzes();
    results.quizzes = quizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(searchTerm) ||
      quiz.description.toLowerCase().includes(searchTerm)
    );
  }

  if (!type || type === 'vocabulary') {
    const vocabulary = await getVocabulary();
    results.vocabulary = vocabulary.filter(word =>
      word.greek.toLowerCase().includes(searchTerm) ||
      word.translation.toLowerCase().includes(searchTerm) ||
      word.pronunciation.toLowerCase().includes(searchTerm)
    );
  }

  return results;
}

// Content versioning
export async function getContentVersion(): Promise<string> {
  const metadata = await getContentMetadata();
  return metadata.version;
}

export async function checkContentUpdates(currentVersion: string): Promise<boolean> {
  const latestVersion = await getContentVersion();
  return latestVersion !== currentVersion;
}

// Content preloading
export async function preloadContent(paths: string[]): Promise<void> {
  const promises = paths.map(path => loadContent(path));
  await Promise.all(promises);
}

// Clear cache
export function clearContentCache(): void {
  contentCache.clear();
}

// Get cache stats
export function getCacheStats(): { size: number; entries: string[] } {
  return {
    size: contentCache.size,
    entries: Array.from(contentCache.keys()),
  };
}
