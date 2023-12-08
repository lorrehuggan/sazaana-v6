import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type UserQuery } from '~/schema/artist/query';
import { CreatePlaylist } from '~/schema/playlist';

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

export const useGetArtist = (id: string) => {
  return useQuery({
    queryKey: ['get-artist', id],
    queryFn: async () => {
      const result = await fetch(`/api/artist/${id}`);
      const data = await result.json();
      return data as Spotify.ArtistObjectFull;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export const useSavePlaylist = () => {
  return useMutation({
    mutationKey: ['save-playlist'],
    mutationFn: async (args: CreatePlaylist) => {
      toast.promise(
        fetch(`/api/playlist/create`, {
          method: 'POST',
          body: JSON.stringify(args),
          headers: {
            'Content-Type': 'application/json',
          },
        }),
        {
          loading: `Saving ${args.name}...`,
          success: () => {
            return `${args.name} saved!`;
          },
          error: () => {
            return 'Failed to save playlist';
          },
        }
      );
    },
  });
};
