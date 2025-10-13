// server component 
import {auth} from '@/auth';
import FollowClient from './FollowClient';
import {prisma} from '@/lib/prisma';

interface Props{
    targetUserId: string;
}
export default async function FolllowButton({targetUserId}:Props){
    const session = await auth();

    // Return early if no session or email
    if (!session?.user?.email) {
        return <FollowClient targetUserId={targetUserId} isFollowing={false} />;
    }

    const currentUserId = await prisma.user
        .findUnique({where:{email: session.user.email}})
        .then((user) => user?.id!);

    // Return early if user not found
    if (!currentUserId) {
        return <FollowClient targetUserId={targetUserId} isFollowing={false} />;
    }

    // check if user is following target user 
    // query to follows table to find first record that has those matching ids 
    const isFollowing = await prisma.follows.findFirst({
        where:{followerId: currentUserId, followingId: targetUserId},
    }) 
    //   (!!) to convert to boolean value
    return(
        <FollowClient targetUserId = {targetUserId} isFollowing={!!isFollowing}/>
    );

}