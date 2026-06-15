import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import {Languages} from "..//../interfaces/fileUploadTypes"

export class LanguageDetectorPopup extends BasePage {
    closeBtn: Locator
    private openLanguageDropdown: Locator
    popupHeader: Locator
    private continueBtn: Locator

    constructor(page: Page){
        super(page)
        this.closeBtn = page.locator('[aria-label="Close"]')
        this.openLanguageDropdown = page.locator("//span[contains(@class, 'triggerActions')]")
        this.popupHeader = page.locator('//h5[text()="We couldn’t detect the language"]')
        this.continueBtn = page.locator("//button[text()='Continue with OCR']")
    }

    async chooseLanguage(languages:Languages){
        await this.openLanguageDropdown.click()
        await this.page.locator("//button[@role='option']",{hasText:languages}).click()
        await this.continueBtn.click()
    }
}