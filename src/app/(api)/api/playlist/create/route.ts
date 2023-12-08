import { NextResponse } from 'next/server';
import { z } from 'zod';
import { accessToken } from '~/app/(api)/_config/auth/accessToken';
import { serverSession } from '~/app/(api)/_config/auth/session';
import { SavePlaylist, savePlaylistSchema } from '~/schema/playlist';

export async function POST(request: Request) {
  const body = (await request.json()) as SavePlaylist;

  try {
    savePlaylistSchema.parse(body);
  } catch (E) {
    if (E instanceof z.ZodError) {
      return new Response(E.errors[0].message, {
        status: 400,
      });
    }
  }

  const session = await serverSession();

  if (!session) {
    return new Response('Session is required', {
      status: 400,
    });
  }

  const CREATE_PLAYLIST_URL = new URL(
    `https://api.spotify.com/v1/users/${session.user.id}/playlists`
  );

  const ADD_TRACKS_URL = (ids: string) => {
    const url = new URL(`https://api.spotify.com/v1/playlists/${ids}/tracks`);
    return url.toString();
  };

  try {
    const token = await accessToken();
    const createResponse = await fetch(CREATE_PLAYLIST_URL, {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: body.name,
        description: 'Created by Sazaana.com',
        public: false,
      }),
    });
    const create = await createResponse.json();
    const addRequestBody = {
      uris: body.ids.map((id) => `spotify:track:${id}`),
      position: 0,
    };
    const addResponse = await fetch(ADD_TRACKS_URL(create.id), {
      method: 'POST',
      headers: {
        contentType: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addRequestBody),
    });
    const add = await addResponse.json();
    return NextResponse.json({ items: add }, { status: 200 });
  } catch (E) {
    console.log(E);
    return NextResponse.json(
      { success: false, error: JSON.stringify(E) },
      { status: 400 }
    );
  }
}
