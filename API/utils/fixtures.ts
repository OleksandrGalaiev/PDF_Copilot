import { test as base } from '@playwright/test';
import { RequestHandler } from '../utils/reguestHandler';
import { APILogger } from './logger';
import { config } from '../api-test.config';

export type TestOptions = {
  api: RequestHandler;
  config: typeof config;
};

export const test = base.extend<TestOptions>({
  api: async ({ request }, use) => {
    const logger = new APILogger();
    const requestHandler = new RequestHandler(request, config.PDF_API_PROD, logger);
    await use(requestHandler);
  },
  config: async (_ctx, use) => {
    await use(config);
  },
});
