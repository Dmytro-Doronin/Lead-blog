import { z } from 'zod';

import { signUpSchema } from './registerForm.validation.ts';

export type FormValues = z.infer<typeof signUpSchema>;
