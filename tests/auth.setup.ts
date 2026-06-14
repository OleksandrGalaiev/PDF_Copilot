import { test as setup } from '@playwright/test';
import { Pages } from '../POM/Pages';
import { EmailHelper } from '../Helpers/EmailHelper';

const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_PASS = process.env.EMAIL_PASS!;

export const authFile = 'playwright/.auth/user.json';

setup('authenticate via magic link', async ({ page, baseURL }) => {
    setup.setTimeout(120_000);

    const pages = new Pages(page);
    const emailHelper = new EmailHelper(EMAIL_USER, EMAIL_PASS);

    const afterUid = await emailHelper.getInboxUidNext();

    await pages.website.goto(baseURL!);
    await pages.loginPopup.loginWithEmail(EMAIL_USER);

    const magicLink = await emailHelper.waitForMagicLink(afterUid);

    await page.goto(magicLink);

    await page.getByRole('button', { name: 'Upload file' }).first().waitFor({ state: 'visible' });

    await page.context().storageState({ path: authFile });
});
