import { z } from 'zod';

export const commentSchema = z.object({
    content: z
        .string()
        .min(20, { message: 'Content must be at least 20 character' })
        .max(300, { message: 'Content must not be longer than 300 characters' }),
});
