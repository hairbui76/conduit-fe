import { z } from 'zod';

export const CommentSchema = z.object({
  comment: z
    .string()
    .trim()
    .min(1, {
      message: 'Comment must not be empty.'
    })
    .max(500, {
      message: 'Comment must not be longer than 500 characters'
    })
});
