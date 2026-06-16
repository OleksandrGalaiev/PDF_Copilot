import { z } from 'zod'

const documentSchema = z.object({
    id: z.string(),
    name: z.string(),
    ingested: z.string(),
    numPages: z.number(),
    metadata: z.object({
        noText: z.boolean(),
        isSample: z.boolean()
    }),
    createdAt: z.string(),
    ocr: z.object({
        step: z.string()
    }).passthrough()
}).passthrough()

export const recentDocumentsSchema = z.array(documentSchema)

export type Document = z.infer<typeof documentSchema>
export type RecentDocuments = z.infer<typeof recentDocumentsSchema>
