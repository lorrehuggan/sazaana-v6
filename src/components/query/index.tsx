'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useArtistQuery } from '~/lib/queries/spotify';
import { UserQuery } from '~/schema/artist/query';

import { useEffect, useRef, useState } from 'react';
import style from './style.module.css';

export default function Query() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<UserQuery>({
    resolver: zodResolver(UserQuery),
  });
  const { mutate, data, isPending } = useArtistQuery();
  const router = useRouter();
  const componentRef = useRef<HTMLUListElement>(null);
  const [results, setResults] = useState<Spotify.ArtistObjectFull[] | null>(
    null
  );

  useEffect(() => {
    if (data) {
      setResults(data);
    }
  }, [data]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Check if the clicked area is outside the component
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        // Close the component, e.g., by changing a state or calling a function
        setResults(null);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [componentRef]);

  const handler = handleSubmit(async (formData) => {
    if (isSubmitSuccessful) {
      mutate(formData);
      reset();
    }
  });

  const handleSelect = (artist: Spotify.ArtistObjectFull) => {
    const id = artist.id;
    router.push(`/create/${id}`);
  };

  return (
    <section className={style.query}>
      <form onSubmit={handler}>
        <input
          autoComplete="off"
          placeholder="Search for an artist"
          {...register('artist')}
        />
        <button type="submit">
          <Search size={18} />
        </button>
      </form>
      {errors.artist && (
        <p
          className={style.query__error}
        >{`${errors.artist.message}!`}</p>
      )}
      {isPending && <p>Loading...</p>}
      {results && (
        <ul ref={componentRef} className={style.query__results}>
          {results.map((artist) => {
            if (!artist.images[2]?.url) return null;
            return (
              <li
                onClick={() => handleSelect(artist)}
                key={artist.id}
                className={style.query__results__result}
              >
                <img
                  src={artist.images[2].url}
                  alt={artist.name}
                />
                <div>
                  <p>{artist.name}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
