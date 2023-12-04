import { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { env } from '~/lib/env/server';
import { refreshAccessToken } from './refreshAccessToken';

const scope = [
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-library-modify',
  'user-library-read',
  'user-read-private',
  'user-read-recently-played',
  'user-top-read',
  'user-read-email',
];

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope: scope.join(' '),
        },
      },
    }),
  ],
  // adapter: SupabaseAdapter({
  //   url: env.SUPABASE_URL,
  //   secret: env.SUPABASE_SECRET,
  // }),
  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.user = token.user;
      return session;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at * 1000,
          user,
        };
      }
      if (
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires
      ) {
        return token;
      }
      const newToken = await refreshAccessToken(token);
      return newToken;
    },
  },
};
