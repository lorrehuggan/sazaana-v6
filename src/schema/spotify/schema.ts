import { z } from 'zod';

export const spotifyIDSchema = z
  .string()
  .length(22, 'Spotify IDs should be exactly 22 characters long.')
  .regex(/^[0-9a-zA-Z]+$/, 'Spotify IDs should be alphanumeric.');

export type SpotifyID = z.infer<typeof spotifyIDSchema>;
