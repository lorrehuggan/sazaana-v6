import { getServerSession } from 'next-auth/next';
import { env } from '~/lib/env/server';
import { authOptions } from './option';

export async function accessToken() {
  const session = await getServerSession(authOptions);

  if (session?.accessToken) {
    return session.accessToken;
  }

  try {
    const requestAuthResponse = await fetch(env.SPOTIFY_REFRESH_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    });

    const requestAuth = await requestAuthResponse.json();

    return requestAuth.access_token as string;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
}
