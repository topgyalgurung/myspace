import {auth} from '@/auth';
import {redirect} from 'next/navigation'

export default async function Home() {
  const session = await auth();
  
  if(!session){
    redirect('api/auth/signin');
  }
  return (
   
<div>
      <h1>Welcome to NextSpace!</h1>
      <p>
        A next-gen social media app to connect with friends inspired by MySpace
      </p>
      <p>To get started, sign up for an account</p>
    </div>
  );
}