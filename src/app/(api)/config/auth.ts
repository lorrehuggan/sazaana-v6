import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '~/lib/env/server';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // adapter: SupabaseAdapter({
  //   url: env.SUPABASE_URL,
  //   secret: env.SUPABASE_SECRET,
  // }),
  callbacks: {
    async session({ session, user, token }) {
      return session;
    },
  },
};
