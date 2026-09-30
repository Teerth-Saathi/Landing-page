import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  use: { baseURL: 'http://localhost:3000', browserName: 'chromium' },
  workers: 1,
  reporter: 'list',
});
