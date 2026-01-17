import { z } from 'zod';

import { blogsSchema } from './blogsForm.validation.ts';

export type BlogsFormValues = z.infer<typeof blogsSchema>;
