import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  username: z.string().trim().min(1, {
    message: 'Username must not be empty'
  }),
  image: z.string(),
  bio: z.string()
});
