import { expect } from '@playwright/test';
import { test } from '../test-options';
import { Pages } from '../POM/Pages';


test.describe('Main page. Header. User Account elements',{tag:'@mainPage'}, async()=>{

    

})
test('user is logged in using saved storage state', async ({ app, baseURL }) => {
    await test.step("Open main page with saved storage state", async()=>{
        await app.mainPage.goto(baseURL!)
    })

    await expect(pages.loginPopup.emailInput).toBeHidden();
    await expect(page.getByRole('button', { name: 'Upload file' }).first()).toBeVisible();
});
