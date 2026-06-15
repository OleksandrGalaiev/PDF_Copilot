import { Locator, Page } from "playwright";
import { BasePage } from "../BasePage";

export class DeepThinkingPopup extends BasePage{
    private deepThiningPopup: Locator
    private deepThinkingButton: Locator

    constructor(page:Page){
        super(page)
        this.deepThiningPopup = this.page.locator('#whats-new-deep-thinking')
        this.deepThinkingButton = this.page.locator("//button[text()='Try Deep Thinking']")
    }
    async closeDeepThinkingPopupIfExist(){
        await this.page.waitForTimeout(500)
        if(await this.deepThiningPopup.isVisible()){
            await this.deepThinkingButton.click()
        }
    }
}