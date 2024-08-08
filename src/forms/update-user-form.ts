import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  username: z.string().trim().min(1, {
    message: 'Username must not be empty'
  }),
  image: z.string(),
  bio: z.string()
});

export const UpdatePassWordSchema = z
  .object({
    password: z.string().trim().min(1, {
      message: 'Password must not be empty'
    }),
    confirmPassword: z.string().trim().min(1, {
      message: 'Confirm password must not be empty'
    })
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password doesn't match"
  });
