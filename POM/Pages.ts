import { Page } from "playwright";
import { Website } from "./Website";
import { LoginPopup } from "./Popups/LoginPopup";
import { MainPage } from "./MainPage";
import { UserCabinet } from "./Popups/UserCabinet";
import { FileUpload } from "./FileUploadPage";
import { LanguageDetectorPopup } from "./Popups/LanguageDetectorPopup";


export class Pages{
    website: Website
    loginPopup: LoginPopup
    mainPage: MainPage
    userCabinet: UserCabinet
    uploadFile: FileUpload
    languageDetectorPopup: LanguageDetectorPopup

    constructor(page: Page){
        this.website = new Website(page)
        this.loginPopup = new LoginPopup(page)
        this.mainPage = new MainPage(page)
        this.userCabinet = new UserCabinet(page)
        this.uploadFile = new FileUpload(page)
        this.languageDetectorPopup = new LanguageDetectorPopup(page)
    }
}
