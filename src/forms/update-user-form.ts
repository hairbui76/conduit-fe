import { zfd } from 'zod-form-data';
import { z } from 'zod';

export const UpdateProfileSchema = zfd.formData({
  username: z.string().trim().min(1, {
    message: 'Username must not be empty'
  }),
  image: z.string(),
  bio: z.string(),
  avatar: zfd.file().optional()
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
