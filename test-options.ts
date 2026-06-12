import { Pages } from "./POM/Pages"
import {test as base} from "@playwright/test"


export type TestOptions = {
    app: Pages
}

export const test = base.extend<TestOptions>({
    app: async ({ page }, use) => {
        const pages = new Pages(page)
        await use(pages)
    }
})

