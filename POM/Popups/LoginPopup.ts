import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class LoginPopup extends BasePage {
  private emailInput: Locator;
  private continueWithEmailBtn: Locator;
  private checkInboxHeading: Locator;
  loginDialog: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.continueWithEmailBtn = page.getByRole('button', { name: 'Continue with email' });
    this.checkInboxHeading = page.getByRole('heading', { name: 'Check your inbox' });
    this.loginDialog = page.locator('.login-dialog__main');
  }

  async loginWithEmail(email: string) {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);
    await this.continueWithEmailBtn.click();
    await this.checkInboxHeading.waitFor({ state: 'visible' });
  }
}
