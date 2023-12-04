import { JWT } from 'next-auth/jwt';
import { env } from '~/lib/env/server';

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
  const SPOTIFY_REFRESH_TOKEN_URL = env.SPOTIFY_REFRESH_TOKEN_URL;

  try {
    const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      'base64'
    );

    if (!token.refreshToken) {
      throw new Error('RefreshTokenMissing');
    }

    const urlEncodedData = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    }).toString();

    const response = await fetch(SPOTIFY_REFRESH_TOKEN_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlEncodedData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
