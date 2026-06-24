import { Page } from '@playwright/test';
import { Website } from '@pages/Website';
import { LoginPopup } from '@pages/Popups/LoginPopup';
import { MainPage } from '@pages/MainPage';
import { UserCabinet } from '@pages/Popups/UserCabinet';
import { FileUpload } from '@pages/FileUploadPage';
import { LanguageDetectorPopup } from '@pages/Popups/LanguageDetectorPopup';
import { Copilot } from '@pages/Copilot';
import { DeepThinkingPopup } from '@pages/Popups/DeepThinkingPopup';

export class Pages {
  website: Website;
  loginPopup: LoginPopup;
  mainPage: MainPage;
  userCabinet: UserCabinet;
  uploadFile: FileUpload;
  languageDetectorPopup: LanguageDetectorPopup;
  copilot: Copilot;
  deepThinkPopup: DeepThinkingPopup;

  constructor(page: Page) {
    this.website = new Website(page);
    this.loginPopup = new LoginPopup(page);
    this.mainPage = new MainPage(page);
    this.userCabinet = new UserCabinet(page);
    this.uploadFile = new FileUpload(page);
    this.languageDetectorPopup = new LanguageDetectorPopup(page);
    this.copilot = new Copilot(page);
    this.deepThinkPopup = new DeepThinkingPopup(page);
  }
}
