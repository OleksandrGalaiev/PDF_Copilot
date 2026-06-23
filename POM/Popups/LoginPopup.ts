import { Locator, Page } from 'playwright/test';
import { BasePage } from '../BasePage';

export class LoginPopup extends BasePage {
  emailInput: Locator;
  continueWithEmailBtn: Locator;
  checkInboxHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.continueWithEmailBtn = page.getByRole('button', { name: 'Continue with email' });
    this.checkInboxHeading = page.getByRole('heading', { name: 'Check your inbox' });
  }

  async loginWithEmail(email: string) {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);
    await this.continueWithEmailBtn.click();
    await this.checkInboxHeading.waitFor({ state: 'visible' });
  }
}
