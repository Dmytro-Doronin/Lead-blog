import { z } from 'zod';

import { postsSchema } from './postsForm.validation.ts';

export type PostsFormValues = z.infer<typeof postsSchema>;
