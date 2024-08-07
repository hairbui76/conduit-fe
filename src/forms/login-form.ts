import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: 'Email must not be empty'
    })
    .email({ message: 'Email is invalid' }),
  password: z.string().trim().min(1, {
    message: 'Password must not be empty'
  })
});
