import { z } from 'zod';

const websiteUrlRegex = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;
const MAX_SIZE = 1024 * 1024; // 1mb
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
export const blogsSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Name must be at least 1 characters' })
        .max(15, { message: 'Name must be shorter than or equal to 15 characters' }),
    description: z
        .string()
        .min(3, { message: 'Password must be at least 1 character' })
        .max(500, { message: 'Description must not be longer than 500 characters' }),
    websiteUrl: z
        .string()
        .min(1, { message: 'Website URL must be at least 1 character' })
        .max(100, { message: "Website URL must not be longer than 100 characters'" })
        .regex(websiteUrlRegex, {
            message: 'Website URL must start with https:// and be a valid URL',
        }),
    file: z
        .instanceof(File)
        .nullable()
        .refine((f) => !f || ALLOWED_TYPES.includes(f.type), { message: 'Only JPG/PNG allowed' })
        .refine((f) => !f || f.size <= MAX_SIZE, { message: 'Max size is 1MB' }),
});
