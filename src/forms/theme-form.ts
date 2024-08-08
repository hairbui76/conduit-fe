import { z } from 'zod';

export const AppearanceSchema = z.object({
  theme: z.enum(['light', 'dark', 'system'], {
    required_error: 'Please select a theme.'
  })
});
