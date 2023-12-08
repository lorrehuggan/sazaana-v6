import { z } from 'zod';

export const PlaylistNameSchema = z.object({
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
});

export type PlaylistName = z.infer<typeof PlaylistNameSchema>;

export const PlaylistTrackIdSchema = z.object({
  ids: z.string().array().nonempty(),
});

export type PlaylistTrackId = z.infer<typeof PlaylistTrackIdSchema>;

export const CreatePlaylistSchema = z.object({
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
  ids: z.string().array(),
});

export type CreatePlaylist = z.infer<typeof CreatePlaylistSchema>;
