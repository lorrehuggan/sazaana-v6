import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { accessToken } from '~/app/(api)/_config/auth/accessToken';
import { mockdata } from '~/lib/miscellaneous/mockData';
import { spotifyIDSchema } from '~/schema/spotify/schema';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      seed: string;
    };
  }
) {
  let ids = params.seed;

  const min_acousticness = request.nextUrl.searchParams.get('min_acousticness');
  const max_acousticness = request.nextUrl.searchParams.get('max_acousticness');
  const min_danceability = request.nextUrl.searchParams.get('min_danceability');
  const max_danceability = request.nextUrl.searchParams.get('max_danceability');
  const min_energy = request.nextUrl.searchParams.get('min_energy');
  const max_energy = request.nextUrl.searchParams.get('max_energy');
  const min_valence = request.nextUrl.searchParams.get('min_valence');
  const max_valence = request.nextUrl.searchParams.get('max_valence');

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
    `https://api.spotify.com/v1/recommendations?limit=12&seed_artists=${ids}&min_acousticness=${min_acousticness}&max_acousticness=${max_acousticness}&min_danceability=${min_danceability}&max_danceability=${max_danceability}&min_energy=${min_energy}&max_energy=${max_energy}&min_valence=${min_valence}&max_valence=${max_valence}`
  );

  const GET_AUDIO_FEATURES_URL = (ids: string[]) =>
    new URL(`https://api.spotify.com/v1/audio-features?ids=${ids}`).toString();

  try {
    // const token = await accessToken();
    // const recommendedResponse = await fetch(GET_RECOMMENDED_TRACKS_URL, {
    //   method: 'GET',
    //   headers: {
    //     authorization: `Bearer ${token}`,
    //   },
    // });
    // const recommended = await recommendedResponse.json();
    // const trackIDs = recommended.tracks.map((track: any) => track.id);
    // const audioFeaturesResponse = await fetch(
    //   GET_AUDIO_FEATURES_URL(trackIDs),
    //   {
    //     method: 'GET',
    //     headers: {
    //       authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // const audioFeatures = await audioFeaturesResponse.json();
    // const tracksWithFeatures = recommended.tracks.map((track: any) => {
    //   const features = audioFeatures.audio_features.find(
    //     (f: any) => f.id === track.id
    //   );
    //   return {
    //     track: { ...track },
    //     audioFeatures: features,
    //   };
    // });
    let tracksWithFeatures = mockdata;
    return NextResponse.json(tracksWithFeatures, {
      status: 200,
    });
  } catch (E) {
    console.log({ E });
  }
}
