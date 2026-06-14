import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class LanguageDetectorPopup extends BasePage {
    closeBtn: Locator
    private openLanguageDropdown: Locator
    popupHeader: Locator

    constructor(page: Page){
        super(page)
        this.closeBtn = page.locator('[aria-label="Close"]')
        this.openLanguageDropdown = page.locator("//span[contains(@class, 'triggerActions')]")
        this.popupHeader = page.locator('//h5[text()="We couldn’t detect the language"]')
    }
}