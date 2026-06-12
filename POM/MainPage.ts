import { Locator, Page } from "playwright";
import { BasePage } from "./BasePage";


export class MainPage extends BasePage{
    private headerBtns: Locator
    loginBtn: Locator

    constructor(page: Page){
        super(page)
        this.headerBtns = page.locator(".header")
        this.loginBtn = page.locator("//a[text()='Log in']")
    }

    async goto(url: string){
        await super.goto(url)
        await this.headerBtns.waitFor({'state': 'visible'})
    }
    
}