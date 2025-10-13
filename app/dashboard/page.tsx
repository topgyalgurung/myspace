import {auth} from '@/auth';
import {redirect} from 'next/navigation';
import {prisma} from '@/lib/prisma';
import {ProfileForm} from './ProfileForm';
import { SignOutButton } from '@/app/components/buttons';
import Image from 'next/image';
import styles from './dashboard.module.css';

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
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardHeader}>
                <h1 className={styles.dashboardTitle}>Dashboard</h1>
            </div>
            <div className={styles.dashboardContent}>
                <div className={styles.leftSection}>
                    <div className={styles.userProfile}>
                        <Image
                            src={user?.image ?? '/meman.webp'}
                            width={80}
                            height={80}
                            alt="Profile Image"
                            className={styles.profileImage}
                        />
                        <SignOutButton/>
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <ProfileForm user={user}/>    
                </div>
            </div>
        </div>
    )



}