import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class Website extends BasePage {
  private headerBtns: Locator;

  constructor(page: Page) {
    super(page);
    this.headerBtns = page.locator('.header');
  }

  async goto(url: string) {
    await super.goto(url);
    await this.headerBtns.waitFor({ state: 'visible' });
  }
}
