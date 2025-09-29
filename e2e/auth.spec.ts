import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login and register buttons on homepage', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('/login');
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
  });

  test('should navigate to register page', async ({ page }) => {
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page).toHaveURL('/register');
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
  });

  test('should show validation errors on empty login form', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
    await expect(page.getByText('Password must be at least 6 characters')).toBeVisible();
  });

  test('should show validation errors on empty register form', async ({ page }) => {
    await page.goto('/register');
    await page.getByRole('button', { name: 'Create account' }).click();
    
    await expect(page.getByText('First name must be at least 2 characters')).toBeVisible();
    await expect(page.getByText('Last name must be at least 2 characters')).toBeVisible();
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
    await expect(page.getByText('Password must be at least 8 characters')).toBeVisible();
  });

  test('should show password mismatch error', async ({ page }) => {
    await page.goto('/register');
    
    await page.getByLabel('First Name').fill('John');
    await page.getByLabel('Last Name').fill('Doe');
    await page.getByLabel('Email').fill('john@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByLabel('Confirm Password').fill('different123');
    await page.getByLabel('Date of Birth').fill('1990-01-01');
    
    // Select a learning goal
    await page.getByText('Academic study').click();
    
    await page.getByRole('button', { name: 'Create account' }).click();
    
    await expect(page.getByText("Passwords don't match")).toBeVisible();
  });

  test('should toggle password visibility', async ({ page }) => {
    await page.goto('/login');
    
    const passwordInput = page.getByLabel('Password');
    const toggleButton = page.getByRole('button', { name: 'Toggle password visibility' });
    
    await passwordInput.fill('password123');
    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');
    
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should navigate between login and register pages', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('link', { name: 'Sign up' }).click();
    await expect(page).toHaveURL('/register');
    
    await page.getByRole('link', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('/login');
  });

  test('should show social login options', async ({ page }) => {
    await page.goto('/login');
    
    await expect(page.getByRole('button', { name: 'Google' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'GitHub' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Discord' })).toBeVisible();
  });

  test('should have accessible form labels', async ({ page }) => {
    await page.goto('/login');
    
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByLabel('Remember me')).toBeVisible();
  });

  test('should have proper form validation', async ({ page }) => {
    await page.goto('/register');
    
    // Test email validation
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByRole('button', { name: 'Create account' }).click();
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
    
    // Test password length validation
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('123');
    await page.getByRole('button', { name: 'Create account' }).click();
    await expect(page.getByText('Password must be at least 8 characters')).toBeVisible();
  });
});
