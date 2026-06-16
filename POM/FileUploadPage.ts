import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import {DocumentActionsMenuPoints} from "../interfaces/fileUploadTypes"
import { LanguageDetectorPopup } from "./Popups/LanguageDetectorPopup";

export class FileUpload extends BasePage{
    uploadFileBtn: Locator
    private documentMenu: Locator
    private renameMenuField: Locator
    deleteBtn: Locator
    fileName: Locator
    private activeDocument: Locator
    noFileMessage: Locator
    languageDetectorPopup: LanguageDetectorPopup
    displayedFileName: Locator

    constructor(page:Page){
        super(page)
        this.uploadFileBtn = page.locator(".pdf-upload-button")
        this.documentMenu = page.locator('[aria-label="Document menu"]').nth(1)
        this.renameMenuField = page.locator('[aria-label="Rename file"]')
        this.deleteBtn = page.locator('.delete-popup-delete')
        this.fileName = page.locator('.pdf-file-name')
        this.activeDocument = page.locator("//div[contains(@class, 'active-file')]")
        this.noFileMessage = page.locator('.no-files-msg')
        this.languageDetectorPopup = new LanguageDetectorPopup(this.page)
        this.displayedFileName = page.locator('.document-name')
    }

    async chooseDocumentMenuPoint(menuPoint:DocumentActionsMenuPoints){
        await this.documentMenu.click()
        await this.page.locator('.context-menu-item',{hasText:menuPoint}).click()
    }

    async renameFileTo(fileName: string){
        await this.renameMenuField.clear()
        await this.renameMenuField.fill(fileName)
        await this.renameMenuField.press('Enter')
    }

    async fileUpload(fileUrl:string){
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.uploadFileBtn.click()
        ])
        await fileChooser.setFiles(fileUrl)
    }

    async deleteFileIfExist(){
        if(await this.languageDetectorPopup.popupHeader.isVisible()){
            await this.languageDetectorPopup.closeBtn.click()
        }
        while(await this.activeDocument.isVisible()){
            await this.page.locator('[aria-label="Document menu"]').first().click()
            await this.page.locator('.context-menu-item', {hasText: 'Delete'}).click()
            await this.deleteBtn.click()
            await this.deleteBtn.waitFor({state: 'hidden'})
        }
    }
}