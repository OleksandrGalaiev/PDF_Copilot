import { Pages } from './POM/Pages';
import { test as base, APIRequestContext, request } from '@playwright/test';
import { authFile } from './helpers/constants';

export type TestOptions = {
  app: Pages;
  apiContext: APIRequestContext;
};

export const test = base.extend<TestOptions>({
  app: async ({ page }, use) => {
    const pages = new Pages(page);
    await use(pages);
  },
  apiContext: async ({ baseURL }, use) => {
    const context = await request.newContext({
      baseURL: new URL(baseURL!).origin,
      storageState: authFile,
    });
    await use(context);
    await context.dispose();
  },
});
