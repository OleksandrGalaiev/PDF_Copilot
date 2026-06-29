import { test } from '../test-options';

test.describe('Test group', () => {
  test('seed', async ({ app, baseURL }) => {
    await test.step('Open main page and remove file if exist', async () => {
      await app.mainPage.goto(baseURL!);
      await app.deepThinkPopup.closeDeepThinkingPopupIfExist();
      await app.uploadFile.deleteFileIfExist();
    });
  });
});
