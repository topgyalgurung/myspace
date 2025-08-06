import {auth} from '@/auth';
import {redirect} from 'next/navigation';
import {prisma} from '@/lib/prisma';
import {ProfileForm} from './ProfileForm';
// old way 
// import {authOptions} from '../api/auth/[...nextauth]/route';

export default async function Dashboard() {
    const session = await auth();
    // old way
    // const session = await getServerSession(authOptions);

    if(!session){
        redirect('/api/auth/login')
    }

    const currentUserEmail = session?.user?.email;
    const user = await prisma.user.findUnique({
        where:{
            email: currentUserEmail!,
        }
    });

    return(
        <div>
            <h1> Dashboard </h1>
            <ProfileForm user = {user}/>
        </div>
    )



}