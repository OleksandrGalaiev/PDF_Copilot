import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class MainPage extends BasePage {
  private sidebar: Locator;
  copilot: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebar = page.locator('[class*=pdf-files-sidebar]');
    this.copilot = page.locator('.ai-copilot');
  }

  async goto(url: string) {
    await super.goto(url);
    await this.sidebar.waitFor({ state: 'visible' });
  }
}
