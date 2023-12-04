import { useMutation, useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { type UserQuery } from '~/schema/artist/query';

const ID = z.string().min(8);

export const useTracklist = (id: string) => {
  try {
    ID.parse(id);
  } catch (E) {
    if (E instanceof z.ZodError) {
      console.log(E.errors);
    }
  }

  return useQuery<Spotify.TrackWithFeatures[]>({
    queryKey: ['tracklist', id],
    queryFn: async () => {
      const result = await fetch(`/api/tracklists/${id}`);
      return result.json();
    },
    enabled: Boolean(id),
  });
};

export const useArtistQuery = () => {
  return useMutation({
    mutationKey: ['artist-query'],
    mutationFn: async ({ artist }: UserQuery) => {
      const result = await fetch(`/api/artist/query?artist=${artist}`);
      const data = await result.json();
      return data.items as Spotify.ArtistObjectFull[];
    },
  });
};
