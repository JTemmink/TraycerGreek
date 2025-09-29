import { test, expect } from '@playwright/test';

test.describe('Learning Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication - in a real test, you'd set up a test user
    await page.goto('/');
    // Assume user is logged in for these tests
  });

  test('should display lesson content', async ({ page }) => {
    await page.goto('/lessons/001-greek-alphabet');
    
    await expect(page.getByRole('heading', { name: 'The Greek Alphabet' })).toBeVisible();
    await expect(page.getByText('Learn the 24 letters of the Greek alphabet')).toBeVisible();
  });

  test('should show lesson progress', async ({ page }) => {
    await page.goto('/lessons/001-greek-alphabet');
    
    await expect(page.getByText('Progress')).toBeVisible();
    await expect(page.getByText('Section 1 of 5 sections')).toBeVisible();
  });

  test('should navigate between lesson sections', async ({ page }) => {
    await page.goto('/lessons/001-greek-alphabet');
    
    // Complete first section
    await page.getByRole('button', { name: 'Complete Section' }).click();
    
    // Should move to next section
    await expect(page.getByText('Section 2 of 5 sections')).toBeVisible();
    
    // Navigate back
    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(page.getByText('Section 1 of 5 sections')).toBeVisible();
  });

  test('should display Greek text correctly', async ({ page }) => {
    await page.goto('/lessons/001-greek-alphabet');
    
    // Check that Greek letters are displayed
    await expect(page.getByText('Α α')).toBeVisible();
    await expect(page.getByText('Β β')).toBeVisible();
    await expect(page.getByText('Alpha')).toBeVisible();
    await expect(page.getByText('Beta')).toBeVisible();
  });

  test('should show lesson information', async ({ page }) => {
    await page.goto('/lessons/001-greek-alphabet');
    
    await expect(page.getByText('Level: beginner')).toBeVisible();
    await expect(page.getByText('Duration: 30 min')).toBeVisible();
    await expect(page.getByText('Difficulty: 1/5')).toBeVisible();
  });

  test('should display quiz questions', async ({ page }) => {
    await page.goto('/quizzes/alphabet-quiz');
    
    await expect(page.getByRole('heading', { name: 'Greek Alphabet Quiz' })).toBeVisible();
    await expect(page.getByText('Test your knowledge of the Greek alphabet')).toBeVisible();
  });

  test('should show quiz progress', async ({ page }) => {
    await page.goto('/quizzes/alphabet-quiz');
    
    await expect(page.getByText('Question 1 of 10')).toBeVisible();
    await expect(page.getByText('15:00')).toBeVisible(); // Time limit
  });

  test('should allow answering quiz questions', async ({ page }) => {
    await page.goto('/quizzes/alphabet-quiz');
    
    // Answer first question
    await page.getByRole('radio', { name: 'Α (Alpha)' }).click();
    await page.getByRole('button', { name: 'Next Question' }).click();
    
    await expect(page.getByText('Question 2 of 10')).toBeVisible();
  });

  test('should show quiz results', async ({ page }) => {
    await page.goto('/quizzes/alphabet-quiz');
    
    // Answer all questions quickly
    for (let i = 0; i < 10; i++) {
      await page.getByRole('radio').first().click();
      if (i < 9) {
        await page.getByRole('button', { name: 'Next Question' }).click();
      }
    }
    
    await page.getByRole('button', { name: 'Submit Quiz' }).click();
    
    await expect(page.getByText('Congratulations!')).toBeVisible();
    await expect(page.getByText('You scored')).toBeVisible();
  });

  test('should display vocabulary cards', async ({ page }) => {
    await page.goto('/vocabulary');
    
    await expect(page.getByText('ἄνθρωπος')).toBeVisible();
    await expect(page.getByText('man, human being')).toBeVisible();
    await expect(page.getByText('ahn-throh-pos')).toBeVisible();
  });

  test('should show progress tracking', async ({ page }) => {
    await page.goto('/progress');
    
    await expect(page.getByText('Your Progress')).toBeVisible();
    await expect(page.getByText('Learning Streak')).toBeVisible();
    await expect(page.getByText('Quick Stats')).toBeVisible();
  });

  test('should display dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    
    await expect(page.getByText('Welcome back')).toBeVisible();
    await expect(page.getByText('Learning Progress')).toBeVisible();
    await expect(page.getByText('Recent Activity')).toBeVisible();
    await expect(page.getByText('Recommended for You')).toBeVisible();
  });

  test('should show lesson completion', async ({ page }) => {
    await page.goto('/lessons/001-greek-alphabet');
    
    // Complete all sections
    for (let i = 0; i < 5; i++) {
      await page.getByRole('button', { name: 'Complete Section' }).click();
      if (i < 4) {
        await page.getByRole('button', { name: 'Next Section' }).click();
      }
    }
    
    await expect(page.getByText('Congratulations!')).toBeVisible();
    await expect(page.getByText('You\'ve completed "The Greek Alphabet"')).toBeVisible();
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/lessons/001-greek-alphabet');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Should be able to navigate with keyboard
    await expect(page.getByRole('button', { name: 'Complete Section' })).toBeFocused();
  });

  test('should show loading states', async ({ page }) => {
    await page.goto('/lessons/001-greek-alphabet');
    
    // Check for loading indicators
    await expect(page.getByRole('progressbar')).toBeVisible();
  });

  test('should handle errors gracefully', async ({ page }) => {
    // Navigate to non-existent lesson
    await page.goto('/lessons/non-existent');
    
    await expect(page.getByText('Lesson Not Found')).toBeVisible();
  });
});
