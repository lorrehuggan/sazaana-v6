import { useMutation, useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { type UserQuery } from '~/schema/artist/query';

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

export const useTracklistQuery = (ids: string) => {
  return useQuery({
    queryKey: ['tracklist-query', ids],
    queryFn: async () => {
      const result = await fetch(`/api/artist/curated/${ids}`);
      const data = await result.json();
      return data as Spotify.TrackWithFeatures[];
    },
    enabled: !!ids,
    refetchOnWindowFocus: false,
  });
};
