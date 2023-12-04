'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Authentication() {
  const { data: session } = useSession();
  return (
    <>
      {!session ? (
        <button onClick={() => signIn()}>sign in</button>
      ) : (
        <button onClick={() => signOut()}>sign out</button>
      )}
    </>
  );
}
