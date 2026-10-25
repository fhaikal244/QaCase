import { test, expect } from '@playwright/test';

test('SI-02 unknown username is rejected', async ({ request }) => {
  const response = await request.post('/user/who', {
    data: { username: 'nobody@example.invalid' },
  });

  expect([400, 404]).toContain(response.status());
});
