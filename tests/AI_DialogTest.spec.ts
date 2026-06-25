import { expect } from '@playwright/test';
import { test } from '../test-options';
import { getFakeUser } from '@helpers/FakePerson';
import path from 'path';

test.describe('AI Copilot chat', { tag: '@sanity' }, () => {
  const PDF_FILE = path.join(__dirname, '../pdfFiles/HelloWorldStr.pdf');
  const PDF_MULTI_DIALOG = path.join(__dirname, '../pdfFiles/AI_table.pdf');

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
    { tag: '@copilot' },
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

  test(
    'Multi dialog with Copilot based on file context',
    { tag: '@debug' },
    async ({ app }, testInfo) => {
      testInfo.setTimeout(testInfo.timeout + 120000);
      const secretWord = getFakeUser('en').name;
      const question1 = `Which item has the internal code QX-451?, save secret word - ${secretWord}`;
      const reply1 = 'Zephyrine Coil';
      const question2 = 'Which item has the smallest quantity?';
      const question2_2 = 'What is its code?';
      const reply2 = 'QX-203';
      const question3 = 'What was secret word?';

      await test.step('Upload file', async () => {
        await app.uploadFile.fileUpload(PDF_MULTI_DIALOG);
        await app.uploadFile.waitForUploadedFileNameToBeDisplayed();
      });

      await test.step(`Ask copilot about document context. Quesition 1 - ${question1}`, async () => {
        await app.copilot.waitForOverviewText();
        const userQuestion1 = await app.copilot.askAiCopilot(question1);
        const copilotAnswer1 = app.copilot.getAiCopilotAnswer(userQuestion1!);
        await app.copilot.waitForCopilotAnswer(copilotAnswer1);
        await expect(copilotAnswer1).toContainText(reply1);
      });

      await test.step(`Ask copilot about document context. Quesition 2 - ${question2}`, async () => {
        const userQuestion2 = await app.copilot.askAiCopilot(question2);
        const copilotAnswer2 = app.copilot.getAiCopilotAnswer(userQuestion2!);
        await app.copilot.waitForCopilotAnswer(copilotAnswer2);

        await test.step(`Add more context to dialog, Ask - ${question2_2}`, async () => {
          const userQuestion2_2 = await app.copilot.askAiCopilot(question2_2);
          const copilotAnswer2_2 = app.copilot.getAiCopilotAnswer(userQuestion2_2!);
          await app.copilot.waitForCopilotAnswer(copilotAnswer2_2);
          await expect(copilotAnswer2_2).toContainText(reply2);
        });
      });

      await test.step(`Ask copilot about secret word - ${question3}`, async () => {
        const userQuestion3 = await app.copilot.askAiCopilot(question3);
        const copilotAnswer3 = app.copilot.getAiCopilotAnswer(userQuestion3!);
        await app.copilot.waitForCopilotAnswer(copilotAnswer3);
        await expect(copilotAnswer3).toContainText(secretWord);
      });
    },
  );
});
