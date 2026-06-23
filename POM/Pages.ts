import { Page } from 'playwright';
import { Website } from './Website';
import { LoginPopup } from './Popups/LoginPopup';
import { MainPage } from './MainPage';
import { UserCabinet } from './Popups/UserCabinet';
import { FileUpload } from './FileUploadPage';
import { LanguageDetectorPopup } from './Popups/LanguageDetectorPopup';
import { Copilot } from './Copilot';
import { DeepThinkingPopup } from './Popups/DeepThinkingPopup';

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
