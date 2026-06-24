import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { DocumentActionsMenuPoints } from '@interfaces/fileUploadTypes';
import { LanguageDetectorPopup } from '@pages/Popups/LanguageDetectorPopup';

export class FileUpload extends BasePage {
  private uploadFileBtn: Locator;
  private documentMenu: Locator;
  private renameMenuField: Locator;
  private deleteBtn: Locator;
  readonly fileName: Locator;
  private activeDocument: Locator;
  noFileMessage: Locator;
  languageDetectorPopup: LanguageDetectorPopup;
  private documentHeader: Locator;
  private displayedFileName: Locator;

  constructor(page: Page) {
    super(page);
    this.uploadFileBtn = page.getByRole('button', { name: 'upload icon Upload file' });
    this.documentHeader = page.locator('.pdf-document-header');
    this.documentMenu = this.documentHeader.getByRole('button', { name: 'Document menu' });
    this.renameMenuField = page.getByRole('textbox', { name: 'Rename file' });
    this.deleteBtn = page.locator('.delete-popup-delete');
    this.fileName = page.locator('.pdf-file-name');
    this.activeDocument = page.locator('[class*=active-file]');
    this.noFileMessage = page.locator('.no-files-msg');
    this.languageDetectorPopup = new LanguageDetectorPopup(this.page);
    this.displayedFileName = this.documentHeader.locator('.document-name');
  }

  async chooseDocumentMenuPoint(menuPoint: DocumentActionsMenuPoints) {
    await this.documentMenu.waitFor({ state: 'visible' });
    await this.documentMenu.click();
    await this.page.locator('.context-menu-item', { hasText: menuPoint }).click();
  }

  async renameFileTo(fileName: string) {
    await this.renameMenuField.clear();
    await this.renameMenuField.fill(fileName);
    await this.renameMenuField.press('Enter');
  }

  async fileUpload(fileUrl: string) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.uploadFileBtn.click(),
    ]);
    await fileChooser.setFiles(fileUrl);
  }

  async deleteFileIfExist() {
    await this.languageDetectorPopup.closeIfVisible();
    if (await this.activeDocument.isVisible()) {
      await this.documentMenu.click();
      await this.page.locator('.context-menu-item', { hasText: 'Delete' }).click();
      await this.deleteBtn.click();
      await this.deleteBtn.waitFor({ state: 'hidden' });
    }
  }

  async waitForUploadedFileNameToBeDisplayed() {
    await this.displayedFileName.waitFor({ state: 'visible', timeout: 20000 });
  }

  async deleteFile() {
    await this.chooseDocumentMenuPoint('Delete');
    await this.deleteBtn.click();
  }
}
