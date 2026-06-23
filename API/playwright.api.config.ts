import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default defineConfig({
  testDir: '..',
  reporter: [['html', { outputFolder: path.resolve(__dirname, 'playwright-report') }]],
  use: {
    baseURL: 'https://copilot.pdfexpert.com/app',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /tests[/\\]auth\.setup\.ts$/,
    },
    {
      name: 'api',
      testMatch: /API[/\\]API_tests[/\\].+\.spec\.ts$/,
      use: {
        storageState: path.resolve(__dirname, '../playwright/.auth/user.json'),
      },
      dependencies: ['setup'],
    },
  ],
});
