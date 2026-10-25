import { test, expect } from '@playwright/test';
import { loginWithMicrosoft } from './microsoft';

test('SI-01 first sign in with a valid username', async ({ page }) => {
  test.setTimeout(120_000);

  await page.goto('/');

  const who = page.waitForResponse('**/user/who');
  await page.getByTestId('username').fill(process.env.TEST_USERNAME ?? '');
  await page.getByTestId('continue').click();
  expect((await who).ok()).toBeTruthy();

  const me = page.waitForResponse('**/user/me');
  const master = page.waitForResponse('**/tenant/master');
  await loginWithMicrosoft(page);

  expect((await me).ok()).toBeTruthy();
  expect((await master).ok()).toBeTruthy();

  await expect(page.getByTestId('sync-progress')).toBeVisible();
  await expect(page.getByTestId('restart-prompt')).toBeVisible({ timeout: 90_000 });
});

test('SI-07 first sign in without internet shows a message', async ({ page, context }) => {
  await page.goto('/');
  await context.setOffline(true);

  await page.getByTestId('username').fill('anyuser@company.com');
  await page.getByTestId('continue').click();

  await expect(page.getByTestId('offline-message')).toBeVisible();
});
