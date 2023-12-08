import { z } from 'zod';
import { spotifyIDSchema } from '../spotify/schema';

export const savePlaylistSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Playlist name must be a string',
      description: 'Playlist name',
      required_error: 'Playlist name is required',
    })
    .min(1, {
      message: 'Playlist name must be at least 1 characters long',
    })
    .max(64, {
      message: 'Playlist name must be less than 64 characters long',
    }),
  ids: spotifyIDSchema.array(),
});

export type SavePlaylist = z.infer<typeof savePlaylistSchema>;

export const savePlaylistFormSchema = z.object({
  name: savePlaylistSchema.shape.name,
});

export type SavePlaylistForm = z.infer<typeof savePlaylistFormSchema>;
