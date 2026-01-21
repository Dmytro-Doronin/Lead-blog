import { z } from 'zod';

const MAX_SIZE = 1024 * 1024; // 1mb
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
export const postsSchema = z.object({
    title: z
        .string()
        .min(1, { message: 'Title must be at least 1 characters' })
        .max(30, { message: 'Title must not be longer than 30 characters' }),
    shortDescription: z
        .string()
        .min(3, { message: 'Short description must be at least 1 character' })
        .max(100, { message: 'Short description must not be longer than 100 characters' }),
    content: z
        .string()
        .min(1, { message: 'Content description must be at least 1 character' })
        .max(1000, { message: 'Content description must not be longer than 1000 characters' }),
    file: z
        .instanceof(File)
        .nullable()
        .refine((f) => !f || ALLOWED_TYPES.includes(f.type), { message: 'Only JPG/PNG allowed' })
        .refine((f) => !f || f.size <= MAX_SIZE, { message: 'Max size is 1MB' }),
});
