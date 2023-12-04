import { z } from 'zod';

export const UserQuery = z.object({
  artist: z
    .string({
      invalid_type_error: 'Artist name must be a string',
      description: 'Artist name',
      required_error: 'Artist name is required',
    })
    .min(1, {
      message: 'Artist name must be at least 1 characters long',
    })
    .max(64, {
      message: 'Artist name must be less than 64 characters long',
    }),
});

export type UserQuery = z.infer<typeof UserQuery>;
