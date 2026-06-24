import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class DeepThinkingPopup extends BasePage {
  private deepThiningPopup: Locator;
  private deepThinkingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.deepThiningPopup = this.page.locator('#whats-new-deep-thinking');
    this.deepThinkingButton = this.page.getByRole('button', { name: 'Try Deep Thinking' });
  }
  async closeDeepThinkingPopupIfExist() {
    try {
      await this.deepThiningPopup.waitFor({ state: 'visible', timeout: 3000 });
      await this.deepThinkingButton.click();
    } catch {}
  }
}
