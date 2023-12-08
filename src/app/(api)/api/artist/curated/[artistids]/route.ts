import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { mockdata } from '~/lib/miscellaneous/mockData';
import { spotifyIDSchema } from '~/schema/spotify/schema';

export function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      artistids: string;
    };
  }
) {
  let ids = params.artistids;

  try {
    spotifyIDSchema.parse(ids);
  } catch (E) {
    if (E instanceof z.ZodError) {
      return new Response(E.errors[0].message, {
        status: 400,
      });
    }
  }

  const GET_RECOMMENDED_TRACKS_URL = new URL(
    `https://api.spotify.com/v1/recommendations?limit=15&seed_artists=${ids}`
  );

  const GET_AUDIO_FEATURES_URL = (ids: string[]) =>
    new URL(`https://api.spotify.com/v1/audio-features?ids=${ids}`).toString();

  return NextResponse.json(mockdata, {
    status: 200,
  });
}
