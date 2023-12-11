'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Import } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import useTracklist from '~/lib/hooks/useTracklist';
import { useSavePlaylist } from '~/lib/queries/spotify';
import { SavePlaylistForm, savePlaylistFormSchema } from '~/schema/playlist';

import style from './style.module.css';

export default function Save() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SavePlaylistForm>({
    resolver: zodResolver(savePlaylistFormSchema),
  });
  const { tracks } = useTracklist();
  const { mutate, isPending } = useSavePlaylist();

  const handler = handleSubmit(async (formData) => {
    const ids = tracks.map((track) => track.track.id);
    mutate({
      ids,
      name: formData.name,
    });
    reset();
  });

  const { data: session } = useSession();
  return (
    <div className={style.save}>
      <div className={style.save__heading}>
        <p>Save Your Tunes</p>
        <Import size={16} />
      </div>
      {!session && (
        <button onClick={() => signIn('spotify')}>Sign in to save</button>
      )}
      {session && (
        <form onSubmit={handler}>
          <input
            role="save playlist to spotify"
            aria-label="save playlist"
            autoComplete="off"
            {...register('name')}
            type="text"
            placeholder="Playlist name"
          />
          <button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save'}
          </button>
          {errors.name && <p>{errors.name.message}</p>}
        </form>
      )}
    </div>
  );
}
