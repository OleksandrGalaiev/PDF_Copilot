import { z } from 'zod';

const planSchema = z
  .object({
    type: z.string(),
    name: z.string(),
    status: z.string(),
    period: z.string().nullable(),
    price: z.number().nullable(),
    canceledAt: z.string().nullable(),
    free: z.boolean(),
    updatedAt: z.string(),
  })
  .passthrough();

const limitsSchema = z.object({
  type: z.string(),
  ai_points: z.number(),
  ai_points_thinking: z.number(),
  uploaded_files: z.number(),
  max_pages_per_file: z.number(),
  max_size: z.number(),
});

export const userAccountSchema = z
  .object({
    username: z.string(),
    email: z.string().email(),
    plan: planSchema,
    settings: z.object({
      limits: limitsSchema,
      startDate: z.string(),
      endDate: z.string(),
    }),
    analytics_id: z.string(),
    user_type: z.string(),
  })
  .passthrough();

export type UserAccount = z.infer<typeof userAccountSchema>;
