import { create } from 'zustand';

export type InitialState = {
  tracks: Spotify.TrackWithFeatures[];
};

export type Actions = {
  set: (tracks: Spotify.TrackWithFeatures[]) => void;
  add: (track: Spotify.TrackWithFeatures) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useTracklistStore = create<InitialState & Actions>((set) => ({
  tracks: [],
  add: (track) => set((state) => ({ tracks: [...state.tracks, track] })),
  set: (tracks) => set({ tracks }),
  remove: (id) =>
    set((state) => ({
      tracks: state.tracks.filter((track) => track.track.id !== id),
    })),
  clear: () => set({ tracks: [] }),
}));
