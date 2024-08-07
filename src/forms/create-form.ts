import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string().trim().min(1, {
    message: 'Title must not be empty.'
  }),
  description: z.string().trim(),
  body: z
    .string()
    .trim()
    .min(1, {
      message: 'Content must not be empty.'
    })
    .max(500, {
      message: 'Content must not be longer than 500 characters'
    }),
  tagList: z.string().trim()
});
