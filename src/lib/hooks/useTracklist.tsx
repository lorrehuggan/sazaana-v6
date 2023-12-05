'use client';

import { useEffect } from 'react';
import { useTracklistStore } from '~/store/tracklist';
import { useTracklistQuery } from '../queries/spotify';

export default function useTracklist({ ids }: { ids: string }) {
  const { data, isLoading, error, isSuccess } = useTracklistQuery(ids);
  const { add, set, clear, remove, tracks } = useTracklistStore(
    (state) => state
  );

  useEffect(() => {
    if (data) {
      set(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    add,
    set,
    clear,
    remove,
    tracks,
    data,
    isLoading,
    error,
    isSuccess,
  };
}
