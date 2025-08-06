// server component 
import {auth} from '@/auth';
import FollowClient from './FollowClient';
import {prisma} from '@/lib/prisma';

interface Props{
    targetUserId: string;
}
export default async function FolllowButton({targetUserId}:Props){
    const session = await auth();

    const currentUserId = await prisma.user
        .findUnique({where:{email: session?.user?.email!}})
        .then((user) => user?.id!);

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