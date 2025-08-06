'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <>...</>;
  }

  if (status === 'authenticated') {
    return (
      <>
        <Link href={`/dashboard`}>
          <Image
            src={session.user?.image ?? '/meman.webp'}
            width={32}
            height={32}
            alt="Your Name"
          />
        </Link>
        {/* <SignOutButton /> */}
      </>
    );
  }

  return <button onClick={() => signIn()}>Sign in</button>;
}
export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
  };

  return <button onClick={handleSignOut}>Sign out</button>;
}
