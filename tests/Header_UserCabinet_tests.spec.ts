import { expect } from '@playwright/test';
import { test } from '../test-options';

const EMAIL_USER = process.env.EMAIL_USER! 

test.describe("Session restore and logout", {tag:'@sanity'}, async()=>{

    test("Restored session is valid and user can sign out via header menu", {tag:'@loginLogout'} ,async({app, baseURL})=>{
        await test.step('Open main page with saved storage state', async()=>{
            await app.mainPage.goto(baseURL)
            expect(await app.mainPage.copilot).toBeVisible()
        })
        await test.step('User make log out via header - user cabinet', async()=>{
            await app.userCabinet.openUserCabinet()
            await app.userCabinet.chooseUserCabineMenuItem('Sign Out')
            await expect(app.loginPopup.emailInput).toBeVisible()
        })
    })
})


test.describe('User cabinet',{tag:'@sanity'}, async()=>{

    test.beforeEach('Open main page',async({app,baseURL})=>{
        await app.mainPage.goto(baseURL)
        await app.userCabinet.openUserCabinet()
    })

    test('User cabinet shows "FREE" plan badge', {tag:'@userCabinet'}, async({app})=>{
        await expect(app.userCabinet.planBudget).toHaveText('FREE')
    })

    test("Upgrade plan popup opens on 'Upgrade' button click", {tag:'@userCabinet'}, async({app})=>{
        await app.userCabinet.upgradeBtn.click()
        await expect(app.userCabinet.upgradePlanPopup).toBeVisible()
    })

    test('User cabinet displays correct account email', {tag:'@userCabinet'}, async({app})=>{
        await expect(app.userCabinet.accountEmail).toHaveText(EMAIL_USER)
    })

    test('Account settings popup displays correct email', {tag:'@userCabinet'}, async({app})=>{
        await app.userCabinet.chooseUserCabineMenuItem('Account')
        await expect(app.userCabinet.settingsEmail).toHaveText(EMAIL_USER)
    })

})
