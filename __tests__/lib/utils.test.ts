import {
  formatDate,
  formatRelativeTime,
  capitalize,
  truncate,
  slugify,
  formatNumber,
  formatPercentage,
  clamp,
  shuffle,
  groupBy,
  unique,
  omit,
  pick,
  isValidEmail,
  isValidPassword,
  isValidUrl,
  getFromStorage,
  setToStorage,
  removeFromStorage,
  debounce,
  throttle,
  getErrorMessage,
  isGreekText,
  transliterateGreek,
  calculateProgress,
  calculateLevel,
  calculatePointsToNextLevel,
  formatDuration,
  parseDuration,
} from '@/lib/utils';

describe('Date utilities', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15T10:00:00Z');
    expect(formatDate(date)).toBe('January 15, 2024');
    expect(formatDate(date, { year: 'numeric' })).toBe('2024');
  });

  it('formats relative time correctly', () => {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    expect(formatRelativeTime(oneMinuteAgo)).toBe('1 minute ago');
    expect(formatRelativeTime(oneHourAgo)).toBe('1 hour ago');
    expect(formatRelativeTime(oneDayAgo)).toBe('1 day ago');
  });
});

describe('String utilities', () => {
  it('capitalizes strings correctly', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('HELLO')).toBe('Hello');
    expect(capitalize('hELLO')).toBe('Hello');
  });

  it('truncates strings correctly', () => {
    expect(truncate('Hello world', 5)).toBe('Hello...');
    expect(truncate('Hello', 10)).toBe('Hello');
    expect(truncate('Hello world', 11)).toBe('Hello world');
  });

  it('slugifies strings correctly', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
    expect(slugify('Test & Test')).toBe('test-test');
    expect(slugify('Multiple   Spaces')).toBe('multiple-spaces');
  });
});

describe('Number utilities', () => {
  it('formats numbers correctly', () => {
    expect(formatNumber(1234)).toBe('1,234');
    expect(formatNumber(1234567)).toBe('1,234,567');
  });

  it('formats percentages correctly', () => {
    expect(formatPercentage(75.5)).toBe('75.5%');
    expect(formatPercentage(75.5, 0)).toBe('76%');
  });

  it('clamps numbers correctly', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });
});

describe('Array utilities', () => {
  it('shuffles arrays', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffle(array);
    expect(shuffled).toHaveLength(array.length);
    expect(shuffled).toEqual(expect.arrayContaining(array));
  });

  it('groups arrays by key', () => {
    const array = [
      { category: 'A', value: 1 },
      { category: 'B', value: 2 },
      { category: 'A', value: 3 },
    ];
    const grouped = groupBy(array, 'category');
    expect(grouped).toEqual({
      A: [
        { category: 'A', value: 1 },
        { category: 'A', value: 3 },
      ],
      B: [{ category: 'B', value: 2 }],
    });
  });

  it('removes duplicates from arrays', () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
  });
});

describe('Object utilities', () => {
  it('omits keys from objects', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 });
  });

  it('picks keys from objects', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });
});

describe('Validation utilities', () => {
  it('validates email addresses', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
  });

  it('validates passwords', () => {
    expect(isValidPassword('Password123')).toBe(true);
    expect(isValidPassword('password')).toBe(false);
    expect(isValidPassword('PASSWORD123')).toBe(false);
    expect(isValidPassword('Pass123')).toBe(false);
  });

  it('validates URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://example.com')).toBe(true);
    expect(isValidUrl('invalid-url')).toBe(false);
  });
});

describe('Storage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('gets values from storage', () => {
    localStorage.setItem('test-key', JSON.stringify({ value: 'test' }));
    expect(getFromStorage('test-key', null)).toEqual({ value: 'test' });
  });

  it('sets values in storage', () => {
    setToStorage('test-key', { value: 'test' });
    expect(localStorage.getItem('test-key')).toBe('{"value":"test"}');
  });

  it('removes values from storage', () => {
    localStorage.setItem('test-key', 'test-value');
    removeFromStorage('test-key');
    expect(localStorage.getItem('test-key')).toBeNull();
  });
});

describe('Debounce and throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('debounces function calls', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);
    
    debouncedFn();
    debouncedFn();
    debouncedFn();
    
    expect(mockFn).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(100);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('throttles function calls', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 100);
    
    throttledFn();
    throttledFn();
    throttledFn();
    
    expect(mockFn).toHaveBeenCalledTimes(1);
    
    jest.advanceTimersByTime(100);
    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});

describe('Error handling', () => {
  it('extracts error messages', () => {
    expect(getErrorMessage(new Error('Test error'))).toBe('Test error');
    expect(getErrorMessage('String error')).toBe('String error');
    expect(getErrorMessage({})).toBe('An unknown error occurred');
  });
});

describe('Greek text utilities', () => {
  it('detects Greek text', () => {
    expect(isGreekText('Hello')).toBe(false);
    expect(isGreekText('Γεια σας')).toBe(true);
    expect(isGreekText('Hello Γεια')).toBe(true);
  });

  it('transliterates Greek text', () => {
    expect(transliterateGreek('Α')).toBe('A');
    expect(transliterateGreek('Β')).toBe('B');
    expect(transliterateGreek('Γεια')).toBe('Geia');
  });
});

describe('Learning progress utilities', () => {
  it('calculates progress correctly', () => {
    expect(calculateProgress(5, 10)).toBe(50);
    expect(calculateProgress(0, 10)).toBe(0);
    expect(calculateProgress(10, 10)).toBe(100);
    expect(calculateProgress(5, 0)).toBe(0);
  });

  it('calculates user level correctly', () => {
    expect(calculateLevel(0)).toBe(1);
    expect(calculateLevel(1000)).toBe(2);
    expect(calculateLevel(4000)).toBe(3);
  });

  it('calculates points to next level', () => {
    expect(calculatePointsToNextLevel(1)).toBe(1000);
    expect(calculatePointsToNextLevel(2)).toBe(3000);
    expect(calculatePointsToNextLevel(3)).toBe(5000);
  });
});

describe('Time utilities', () => {
  it('formats duration correctly', () => {
    expect(formatDuration(30)).toBe('30m');
    expect(formatDuration(60)).toBe('1h');
    expect(formatDuration(90)).toBe('1h 30m');
  });

  it('parses duration correctly', () => {
    expect(parseDuration('30m')).toBe(30);
    expect(parseDuration('1h')).toBe(60);
    expect(parseDuration('1h 30m')).toBe(90);
  });
});
