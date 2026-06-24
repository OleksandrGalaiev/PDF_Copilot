import { test as setup, expect } from '@playwright/test';
import { Pages } from '@pages/Pages';
import { EmailHelper } from '@helpers/EmailHelper';
import { authFile } from '@helpers/constants';

const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_PASS = process.env.EMAIL_PASS!;

setup('authenticate via magic link', async ({ page, baseURL }) => {
  setup.setTimeout(120_000);

  const pages = new Pages(page);
  const emailHelper = new EmailHelper(EMAIL_USER, EMAIL_PASS);

  const afterUid = await emailHelper.getInboxUidNext();

  await pages.website.goto(baseURL!);
  await pages.loginPopup.loginWithEmail(EMAIL_USER);

  const magicLink = await emailHelper.waitForMagicLink(afterUid);

  await page.goto(magicLink);

  await expect(page.getByRole('button', { name: 'Upload file' }).first()).toBeVisible();

  await page.context().storageState({ path: authFile });
});
