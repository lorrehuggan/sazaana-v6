import NextAuth from 'next-auth';
import { authOptions } from '../../../_config/auth/option';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
