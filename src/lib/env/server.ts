import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    GOOGLE_CLIENT_ID: z.string().min(8),
    GOOGLE_CLIENT_SECRET: z.string().min(8),
    SPOTIFY_CLIENT_ID: z.string().min(8),
    SPOTIFY_CLIENT_SECRET: z.string().min(8),
    SPOTIFY_REFRESH_TOKEN_URL: z.string().url(),
    SPOTIFY_API_URL: z.string(),
  },
  experimental__runtimeEnv: process.env,
});
