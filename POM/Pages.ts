import { Page } from "playwright";
import { MainPage } from "./MainPage";
import { LoginPopup } from "./Popups/LoginPopup";


export class Pages{
    mainPage: MainPage
    loginPopup: LoginPopup

    constructor(page: Page){
        this.mainPage = new MainPage(page)
        this.loginPopup = new LoginPopup(page)
    }
}
