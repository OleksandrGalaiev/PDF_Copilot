import { expect } from '@playwright/test';
import { test } from '../test-options';
import { getFakeUser } from '@helpers/FakePerson';
import path from 'path';

test.describe('AI Copilot chat', { tag: '@sanity' }, () => {
  const PDF_FILE = path.join(__dirname, '../pdfFiles/HelloWorldStr.pdf');

  test.beforeEach('Delete file if exist', async ({ app, baseURL }) => {
    await app.mainPage.goto(baseURL!);
    await app.deepThinkPopup.closeDeepThinkingPopupIfExist();
    await app.uploadFile.deleteFileIfExist();
  });

  test.afterEach('Delete file', async ({ app }) => {
    await app.deepThinkPopup.closeDeepThinkingPopupIfExist();
    await app.uploadFile.deleteFileIfExist();
  });

  test(
    'Copilot analyzes document content and retains conversation context',
    {
      tag: '@copilot',
      annotation: { type: 'issue', description: 'BUG-001 - weird Copilot answer' },
    },
    async ({ app }, testInfo) => {
      testInfo.setTimeout(testInfo.timeout + 120000);
      const secretWord = getFakeUser('en').name;
      const questionForCopilot = `What text do you see?, save secret word - ${secretWord}`;
      const textInsideDoc = 'Hello world!';

      await test.step('Upload file', async () => {
        await app.uploadFile.fileUpload(PDF_FILE);
      });

      await test.step('Choose English language in popup', async () => {
        await app.languageDetectorPopup.chooseLanguage('English');
        await app.uploadFile.waitForUploadedFileNameToBeDisplayed();
      });

      await test.step('Ask Copilot about document content and verify response contains document text', async () => {
        await app.copilot.waitForOverviewText();
        const userMessage = await app.copilot.askAiCopilot(questionForCopilot);
        const copilotAnswer = app.copilot.getAiCopilotAnswer(userMessage!);
        await app.copilot.waitForCopilotAnswer(copilotAnswer);
        await expect(copilotAnswer).toContainText(textInsideDoc);
      });

      await test.step(`Ask copilot about secret word - ${secretWord}`, async () => {
        const secretMsgId = await app.copilot.askAiCopilot('what was secret word?');
        const copilotAnswerSecret = app.copilot.getAiCopilotAnswer(secretMsgId!);
        await app.copilot.waitForCopilotAnswer(copilotAnswerSecret);
        await expect(copilotAnswerSecret).toContainText(secretWord);
      });
    },
  );
});
