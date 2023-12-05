import { NextRequest, NextResponse } from 'next/server';
import { mockdata } from '~/lib/miscellaneous/mockData';

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
  if (!ids) {
    return new Response('Artist IDs are required', {
      status: 400,
    });
  }
  ids = ids.split('-').join(',');

  const GET_RECOMMENDED_TRACKS_URL = new URL(
    `https://api.spotify.com/v1/recommendations?limit=15&seed_artists=${ids}`
  );

  const GET_AUDIO_FEATURES_URL = (ids: string[]) =>
    new URL(
      `https://api.spotify.com/v1/audio-features?ids=${ids}`
    ).toString();

  return NextResponse.json(mockdata, {
    status: 200,
  });
}
