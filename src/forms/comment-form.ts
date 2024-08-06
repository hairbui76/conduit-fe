import { z } from 'zod';

export const commentSchema = z.object({
  comment: z
    .string()
    .min(1, {
      message: 'Comment must not be empty.'
    })
    .max(200, {
      message: 'Comment must not be longer than 200 characters'
    })
});
