
// import {getServerSession}  from 'next-auth';
// getServerSession simplified to auth() for Auth.js from NextAuth

import {auth} from '@/auth';

import {redirect} from 'next/navigation'
export default async function Home() {
  const session = await auth();
  
  if(!session){
    redirect('api/auth/signin');
  }
  return (
    <main>

    </main>

  
  );
}
