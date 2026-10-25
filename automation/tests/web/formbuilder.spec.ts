import { test, expect } from '@playwright/test';

test('EI-02 form builder blocks the 51st field', async ({ page }) => {
  await page.goto('/forms/new');

  const fields = page.getByTestId('form-field');
  const addTextField = page.getByTestId('add-field-text');

  for (let i = 0; i < 50; i++) {
    await addTextField.click();
  }
  await expect(fields).toHaveCount(50);
  await addTextField.click({ force: true });
  await expect(fields).toHaveCount(50);
  await expect(page.getByTestId('field-limit-message')).toBeVisible();
});
