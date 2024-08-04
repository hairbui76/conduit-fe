import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email must not be empty'
    })
    .email({ message: 'Email is invalid' }),
  password: z.string().min(1, {
    message: 'Password must not be empty'
  })
});
