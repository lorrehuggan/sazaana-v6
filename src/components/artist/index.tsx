'use client';

import { useGetArtist } from '~/lib/queries/spotify';
import style from './style.module.css';

type Props = {
  id: string;
};

export default function Artist({ id }: Props) {
  const { data, isLoading, isError } = useGetArtist(id);

  return (
    <>
      {isError && (
        <div className={style.artist}>
          <div className={style.artist__placeholder} />
          <p>Somthings wrong...</p>
        </div>
      )}
      {isLoading && (
        <div className={style.artist}>
          <div className={style.artist__placeholder} />
          <p>Thinking...</p>
        </div>
      )}
      {data && (
        <div className={style.artist}>
          <img
            style={{ viewTransitionName: 'artist-image' }}
            src={data.images[2].url}
            alt={data.name}
          />
          <p>{data?.name}</p>
        </div>
      )}
    </>
  );
}
