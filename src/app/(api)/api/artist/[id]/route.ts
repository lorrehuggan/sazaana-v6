import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { accessToken } from '~/app/(api)/_config/auth/accessToken';
import { spotifyIDSchema } from '~/schema/spotify/schema';

export async function GET(
  request: NextApiRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  let id = params.id;
  const GET_ARTIST = `https://api.spotify.com/v1/artists/${id}`;

  try {
    spotifyIDSchema.parse(id);
  } catch (E) {
    if (E instanceof z.ZodError) {
      return new Response(E.errors[0].message, {
        status: 400,
      });
    }
  }

  try {
    const token = await accessToken();

    if (!token) {
      return new Response('Access Token is required', {
        status: 400,
      });
    }
    const response = await fetch(GET_ARTIST, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (E) {
    console.log(E);
    return NextResponse.json({
      error: E,
      status: 500,
    });
  }
}
