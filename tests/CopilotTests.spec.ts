import { expect } from '@playwright/test';
import { test } from '..//test-options';
import path from 'path';

test.describe('AI Copilot chat', { tag: '@sanity' }, () => {
  // При наявності більшої кількості часу , я б прибрав блок try finally, а зробив би видалення документа через API
  // Так воно буде чистіше виглядати. Тест має прибирати після себе

  const PDF_FILE = path.join(__dirname, '../pdfFiles/HelloWorldStr.pdf');

  test(
    'Upload file with simple text',
    {
      tag: '@copilot',
      annotation: { type: 'issue', description: 'BUG-001 - weird Copilot answer' },
    },
    async ({ app, baseURL }, testInfo) => {
      testInfo.setTimeout(testInfo.timeout + 60000);
      let userMessage;
      let copilotAnswer;
      const questionForCopilot = 'What text do you see?';

      await test.step('Open main page and close deep thinking popup if exist', async () => {
        await app.mainPage.goto(baseURL!);
        await app.deepThinkPopup.closeDeepThinkingPopupIfExist();
      });

      await test.step('Upload file', async () => {
        await app.uploadFile.fileUpload(PDF_FILE);
      });

      await test.step('Choose english language on Choose language Popup', async () => {
        await app.languageDetectorPopup.chooseLanguage('English');
        await app.uploadFile.waitForUploadedFileNameToBeDisplayed();
      });

      await test.step(`Ask Copilot about text in the document. Question - ${questionForCopilot}`, async () => {
        await app.copilot.waitForOverviewText();
        userMessage = await app.copilot.askAiCopilot(questionForCopilot);
        copilotAnswer = await app.copilot.getAiCopilotAnswer(userMessage);
        await copilotAnswer.waitFor({ state: 'visible' });
      });

      await test.step('Check copilot answer has text from document', async () => {
        const copilotAnswerText = await app.copilot.getCopilotAnswerText(questionForCopilot);
        expect(copilotAnswerText).toContain('Hello world!');
      });
      // } finally {
      //   await app.deepThinkPopup.closeDeepThinkingPopupIfExist();
      //   await app.uploadFile.deleteFileIfExist();
      // }
    },
  );
});
