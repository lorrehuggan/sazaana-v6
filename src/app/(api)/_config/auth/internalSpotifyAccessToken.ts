import { env } from '~/lib/env/server';

export const internalSpotifyAccessToken = async () => {
  const SPOTIFY_URL = env.SPOTIFY_API_URL;
  const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;

  console.log({ SPOTIFY_URL, CLIENT_ID, CLIENT_SECRET });

  try {
    const requestAuthResponse = await fetch(SPOTIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    });

    console.log({ requestAuthResponse });

    const requestAuth = await requestAuthResponse.json();

    return requestAuth.access_token as string;
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message, {
        status: 500,
      });
    }
  }
};
