import { test } from '../utils/fixtures'
import { expect } from '@playwright/test'
import { recentDocumentsSchema } from '../utils/ZOD_JSON_schemas/documentsSchema'
import { userAccountSchema } from '../utils/ZOD_JSON_schemas/userAccountSchema'

test.describe('Documents API', { tag: '@api' }, () => {

    test('GET /documents/recent — returns 200 with valid schema',{tag:'@documents'},async ({ api, config }) => {
        const data = await api
            .url(config.PDF_API_PROD)
            .path('/documents/recent')
            .GET_Request(200)
        const result = recentDocumentsSchema.safeParse(data)
        expect(result.success, JSON.stringify(result.error?.errors, null, 2)).toBe(true)
    })

    test('GET /documents/recent — each document has required fields',{tag:'@documents'}, async ({ api, config }) => {
        const data = await api
            .url(config.PDF_API_PROD)
            .path('/documents/recent')
            .GET_Request(200)
        const documents = recentDocumentsSchema.parse(data)
        expect(documents.length).toBeGreaterThan(0)
        
        for (const doc of documents) {
            expect(doc.id).toBeTruthy()
            expect(doc.name).toBeTruthy()
            expect(doc.ingested).toBe('ok')
            expect(doc.numPages).toBeGreaterThan(0)
        }
    })

    test('GET /user/account — returns 200 with valid schema',{tag:'@documents'}, async ({ api, config }) => {
        const data = await api
            .url(config.PDF_API_PROD)
            .path('/user/account')
            .GET_Request(200)
        const result = userAccountSchema.safeParse(data)
        expect(result.success, JSON.stringify(result.error?.errors, null, 2)).toBe(true)
        
        expect(data.email).toEqual(process.env.EMAIL_USER)
        expect(data.plan.name).toEqual('Free')
        expect(data.plan.status).toEqual('active')
    })

    test('GET /user/account — plan is active',{tag:'@documents'}, async ({ api, config }) => {
        const data = await api
            .url(config.PDF_API_PROD)
            .path('/user/account')
            .GET_Request(200)

        const account = userAccountSchema.parse(data)
        expect(account.email).toEqual(process.env.EMAIL_USER)
        expect(account.plan.type).toBe('freemium')
        expect(account.plan.status).toBe('active')
        expect(account.settings.limits.uploaded_files).toBeGreaterThan(0)
    })
})
