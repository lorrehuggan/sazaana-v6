import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { accessToken } from '~/app/(api)/_config/auth/accessToken';
import { env } from '~/lib/env/server';
import { sortArtistsByQuery } from '~/lib/miscellaneous';
import { UserQuery } from '~/schema/artist/query';

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  const url = request.url;
  if (!url) {
    return new Response('URL is required', {
      status: 400,
    });
  }
  const { searchParams } = new URL(url);
  const artist = searchParams.get('artist');
  if (!artist) {
    return new Response('Artist name is required', {
      status: 400,
    });
  }

  try {
    UserQuery.parse({ artist });
  } catch (E) {
    if (E instanceof z.ZodError) {
      return new Response(E.errors[0].message, {
        status: 400,
      });
    }
  }

  const QUERY_URL = new URL(
    `${env.SPOTIFY_API_URL}search?q=${artist.replace(
      ' ',
      '+'
    )}&type=artist&market=US`
  );

  try {
    const token = await accessToken();

    if (!token) {
      return new Response('Access Token is required', {
        status: 400,
      });
    }

    const artistResponse = await fetch(QUERY_URL.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await artistResponse.json();

    const items = sortArtistsByQuery(response.artists.items, artist);

    return NextResponse.json({ items }, { status: 200 });
  } catch (E) {
    if (E instanceof Error) {
      return NextResponse.json({ error: E.message }, { status: 500 });
    }
  }
}
