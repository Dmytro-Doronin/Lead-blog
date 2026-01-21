import { z } from 'zod';

import { commentSchema } from './commentsForm.validation.ts';

export type CommentsFormValues = z.infer<typeof commentSchema>;
