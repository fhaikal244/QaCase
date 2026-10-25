import { defineConfig } from '@playwright/test';

const web = { baseURL: process.env.WEB_URL, browserName: 'chromium' as const };

export default defineConfig({
  testDir: './tests',
  reporter: [['html', { open: 'never' }], ['list']],
  use: { trace: 'retain-on-failure' },
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/, use: web },

    { name: 'signin', testMatch: /signin\.spec\.ts/, use: web },

    {
      name: 'builder',
      testMatch: /formbuilder\.spec\.ts/,
      dependencies: ['setup'],
      use: { ...web, storageState: 'auth.json' },
    },

    {
      name: 'api',
      testMatch: /tests\/api\/.*\.spec\.ts/,
      use: {
        baseURL: process.env.API_URL,
        extraHTTPHeaders: process.env.API_TOKEN
          ? { Authorization: `Bearer ${process.env.API_TOKEN}` }
          : {},
      },
    },
  ],
});
