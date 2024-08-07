import { z } from 'zod';

export const SignupSchema = z.object({
  username: z.string().trim().min(1, {
    message: 'Username must not be empty'
  }),
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
