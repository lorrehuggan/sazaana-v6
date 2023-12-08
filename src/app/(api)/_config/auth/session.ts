import { getServerSession } from 'next-auth';
import { authOptions } from './option';

export async function serverSession() {
  const session = await getServerSession(authOptions);

  return session;
}
