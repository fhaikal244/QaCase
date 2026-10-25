import { Page } from '@playwright/test';

export async function loginWithMicrosoft(page: Page) {
  await page.waitForURL(/login\.microsoftonline\.com/);

  await page.locator('input[name="passwd"]').fill(process.env.TEST_PASSWORD ?? '');
  await page.locator('#idSIButton9').click(); 
  const staySignedIn = page.locator('#idSIButton9');
  await staySignedIn.click({ timeout: 5000 }).catch(() => {});
}
