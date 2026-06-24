import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { Languages } from '@interfaces/fileUploadTypes';

export class LanguageDetectorPopup extends BasePage {
  private closeBtn: Locator;
  private openLanguageDropdown: Locator;
  private popupHeader: Locator;
  private continueBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.closeBtn = page.getByRole('button', { name: 'Close' });
    this.openLanguageDropdown = page.getByRole('button', { name: 'Choose language' });
    this.popupHeader = page.getByRole('heading', { name: 'We couldn’t detect the language' });
    this.continueBtn = page.getByRole('button', { name: 'Continue with OCR' });
  }

  async chooseLanguage(languages: Languages) {
    await this.popupHeader.waitFor({ state: 'visible' });
    await this.openLanguageDropdown.click();
    await this.page.getByRole('option', { name: languages }).click();
    await this.continueBtn.click();
  }

  async closeChooseLanguagePopup() {
    await this.popupHeader.waitFor({ state: 'visible', timeout: 20000 });
    await this.closeBtn.click();
  }

  async closeIfVisible() {
    if (await this.popupHeader.isVisible()) {
      await this.closeBtn.click();
    }
  }
}
