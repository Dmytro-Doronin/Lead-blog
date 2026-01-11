import { z } from 'zod';

export const loginSchema = z.object({
    loginOrEmail: z.string().min(3, { message: 'Login must be at least 3 characters' }),
    password: z.string().min(3, { message: 'Password must be at least 3 characters' }),
});
