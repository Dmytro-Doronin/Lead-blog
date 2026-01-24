import { z } from 'zod';

export const signUpSchema = z.object({
    login: z
        .string()
        .min(3, { message: 'Login must be at least 3 characters' })
        .max(10, { message: 'Login must be shorter or equal to 10 characters' }),
    password: z
        .string()
        .min(3, { message: 'Password must be at least 6 characters' })
        .max(10, { message: 'Password must be shorter or equal to 20 characters' }),
    email: z.string().email(),
});
