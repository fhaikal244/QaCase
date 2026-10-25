import { test as setup, expect } from '@playwright/test';
import { loginWithMicrosoft } from './microsoft';

setup('login and save the session', async ({ page }) => {
  setup.setTimeout(120_000);

  await page.goto('/');
  await page.getByTestId('username').fill(process.env.TEST_USERNAME ?? '');
  await page.getByTestId('continue').click();

  await loginWithMicrosoft(page);
  await expect(page.getByTestId('restart-prompt')).toBeVisible({ timeout: 90_000 });
  await page.context().storageState({ path: 'auth.json' });
});
