import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class Copilot extends BasePage {
  private overviewText: Locator;
  private askAi: Locator;
  private chatSendBtn: Locator;
  private aiChat: Locator;
  private deepThinkingBtn: Locator;
  private latestUserMsgId: Locator;
  private aiFooter: Locator;
  private footerRunRecognitionBtn;

  constructor(page: Page) {
    super(page);
    this.overviewText = page.locator("//div[contains(@class, 'overviewText')]");
    this.askAi = page.getByRole('textbox', { name: 'Ask PDF Copilot' });
    this.chatSendBtn = page.locator('[aria-label="chat send button"]');
    this.aiChat = page.locator('.ai-chat-messages');
    this.deepThinkingBtn = page.locator('.deep-think-animated-btn');
    this.latestUserMsgId = this.aiChat.locator('.ai-chat-message-user').last();
    this.aiFooter = this.page.locator('[class*=_bodyM_]');
    this.footerRunRecognitionBtn = this.page.locator('.ai-chat-footer .action-button');
  }

  async askAiCopilot(message: string) {
    if (await this.page.getByText('Upgrade to continue').isVisible()) {
      await this.deepThinkingBtn.click();
    }
    await this.askAi.fill(message);
    await this.chatSendBtn.click();
    const msgId = await this.latestUserMsgId.getAttribute('data-user-msg-id');
    return msgId;
  }

  getAiCopilotAnswer(messageId: string) {
    return this.page.locator(`[data-ai-msg-id="${messageId}-answer"]`);
  }

  async waitForOverviewText() {
    await this.overviewText.waitFor({ state: 'visible', timeout: 20000 });
  }

  async waitForCopilotAnswer(answer: Locator) {
    await answer.waitFor({ state: 'visible', timeout: 20000 });
  }

  getCopilotFooterErrorMSG() {
    return this.aiFooter;
  }

  async runRicognitionFromFooter() {
    await this.footerRunRecognitionBtn.click();
    await this.footerRunRecognitionBtn.waitFor({ state: 'hidden' });
  }
}
