import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class Copilot extends BasePage{
    overviewText: Locator
    private askAi: Locator
    private chatSendBtn: Locator
    private aiChat:Locator

    constructor(page:Page){
        super(page)
        this.overviewText = page.locator("//div[contains(@class, 'overviewText')]")
        this.askAi = page.locator('[aria-label="Ask PDF Copilot"]')
        this.chatSendBtn = page.locator('[aria-label="chat send button"]')
        this.aiChat = page.locator('.ai-chat-messages')
    }

    async askAiCopilot(message:string){
        await this.askAi.fill(message)
        await this.chatSendBtn.click()
        return message
    }

    async getCopilotAnswerText(message:string){
        let aiAnswerObject = await this.getAiCopilotAnswer(message)
        let aIanswerText = await aiAnswerObject.locator("//div[contains(@class, 'ai-copilot-message')]//li").first().textContent()
        return aIanswerText
    }

    async getAiCopilotAnswer(message:string){
        let userQuestion = await this.aiChat.locator('.ai-chat-message-user', {hasText:message})
        let msgId = await userQuestion.getAttribute('data-user-msg-id')
        let aiAnswer = await this.aiChat.locator(`[data-ai-msg-id="${msgId}-answer"]`)
        return aiAnswer
    }
}