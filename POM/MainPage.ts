import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MainPage extends BasePage {
  sidebar: Locator;
  copilot: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebar = page.locator("//div[contains(@class, 'pdf-files-sidebar')]");
    this.copilot = page.locator('.ai-copilot');
  }

  async goto(url: string) {
    await super.goto(url);
    await this.sidebar.waitFor({ state: 'visible' });
  }
}
