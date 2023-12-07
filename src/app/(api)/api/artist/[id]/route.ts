import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { accessToken } from '~/app/(api)/_config/auth/accessToken';

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
  }
}
