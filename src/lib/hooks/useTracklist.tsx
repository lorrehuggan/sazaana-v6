'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTracklistStore } from '~/store/tracklist';
import { AudioFeatures } from '../../../types';
import { useTracklistQuery } from '../queries/spotify';

export default function useTracklist() {
  const params = useParams();
  const { add, set, clear, remove, tracks } = useTracklistStore(
    (state) => state
  );
  const [filterConfig, setFilterConfig] = useState<AudioFeatures>({
    acousticness: [0, 1],
    danceability: [0, 1],
    energy: [0, 1],
    valence: [0, 1],
  });
  const { data, isLoading, error, isSuccess } = useTracklistQuery(
    params.ids as string,
    `min_acousticness=${filterConfig.acousticness[0]}&max_acousticness=${filterConfig.acousticness[1]}&min_danceability=${filterConfig.danceability[0]}&max_danceability=${filterConfig.danceability[1]}&min_energy=${filterConfig.energy[0]}&max_energy=${filterConfig.energy[1]}&min_valence=${filterConfig.valence[0]}&max_valence=${filterConfig.valence[1]}`
  );

  useEffect(() => {
    if (data) {
      set(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function updateFilterConfig(feature: string, min: number, max: number) {
    setFilterConfig((prev) => ({
      ...prev,
      [feature]: [min, max],
    }));
  }

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
    updateFilterConfig,
    filterConfig,
  };
}
