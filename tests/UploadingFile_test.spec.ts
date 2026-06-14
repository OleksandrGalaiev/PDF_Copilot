import { expect } from "@playwright/test"
import {test} from "../test-options"
import path from "path"


test.describe('Uploading file', {tag:'@sanity'}, async()=>{
    // Також такий тест можна зробити через test.describe.configure({'mode':'serial'})
    // Тоді тести будуть виконуватись по порядку, але тк це не зовсім прийнята практика, то я не робив. 
    // Тести мають бути ізолбовані

    const EMPTY_PDF_PATH = path.join(__dirname, '../pdfFiles/emptyFilePfd.pdf')

    test("Main actions with file. Upload, rename and delete", {tag:'@fileUpload'}, async({app, page, baseURL})=>{
        await test.step('Upload empty pdf file to platform', async()=>{
            await app.mainPage.goto(baseURL)
            await app.uploadFile.fileUpload(EMPTY_PDF_PATH)
        })
        await test.step("Wait for Coundn't detect language popup and close it", async()=>{
            await app.languageDetectorPopup.popupHeader.waitFor({state:'visible'})
            await app.languageDetectorPopup.closeBtn.click()
        })
        await test.step('Rename file to TestFile', async()=>{
            await app.uploadFile.chooseDocumentMenuPoint('Rename')
            await app.uploadFile.renameFileTo('TestFile')
            await expect(app.uploadFile.fileName).toHaveText('TestFile')
        })
        await test.step('Delete file', async()=>{
            await app.uploadFile.chooseDocumentMenuPoint('Delete')
            await app.uploadFile.deleteBtn.click()
            await expect(app.uploadFile.noFileMessage).toHaveText('Upload your first PDF to get instant insights')
        })
    })

})