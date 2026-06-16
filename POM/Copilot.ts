import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class Copilot extends BasePage{
    overviewText: Locator
    private askAi: Locator
    private chatSendBtn: Locator
    private aiChat:Locator
    private deepThinkingBtn: Locator

    constructor(page:Page){
        super(page)
        this.overviewText = page.locator("//div[contains(@class, 'overviewText')]")
        this.askAi = page.locator('[aria-label="Ask PDF Copilot"]')
        this.chatSendBtn = page.locator('[aria-label="chat send button"]')
        this.aiChat = page.locator('.ai-chat-messages')
        this.deepThinkingBtn = page.locator('.deep-think-animated-btn')
    }

    async askAiCopilot(message:string){
        if(await this.page.getByText('Upgrade to continue').isVisible()){
            await this.deepThinkingBtn.click()
        }
        await this.askAi.fill(message)
        await this.chatSendBtn.click()
        return message
    }

    async getCopilotAnswerText(message:string){
        let aiAnswerObject = await this.getAiCopilotAnswer(message)
        let aIanswerText = await aiAnswerObject.locator("//div[contains(@class, 'ai-copilot-message')]").first().textContent()
        return aIanswerText
    }

    async getAiCopilotAnswer(message:string){
        let userQuestion = this.aiChat.locator('.ai-chat-message-user', {hasText:message})
        let msgId = await userQuestion.getAttribute('data-user-msg-id')
        let aiAnswer = this.aiChat.locator(`[data-ai-msg-id="${msgId}-answer"]`)
        return aiAnswer
    }
}