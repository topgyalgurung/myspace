import {prisma} from '@/lib/prisma';
import FollowButton from '@/app/components/FollowButton/FollowButton';
import { Metadata } from 'next';
import Image from 'next/image';

interface Props{
    params: Promise<{
        id:string;
    }>
}

export async function generateMetadata(props:Props):Promise<Metadata>{
    const {id} = await props.params
    const user = await prisma.user.findUnique({where:{id}});
    return {title: `User profile of ${user?.name}`};
}

export default async function UserProfile(props:Props){
    const {id} = await props.params
    const user = await prisma.user.findUnique({where:{id}});
    const {name, bio, image, age} = user ?? {};

    return(
        <div>
            <h1>{name}</h1>
            <Image   
                width={300}
                height={300}
                src = {image ?? "/meman.webp"}
                alt={`${name}'s profile`}
            />
            <h4>Bio: {bio}</h4>
            <h4>Age: {age}</h4>

            <FollowButton targetUserId = {id}/>
        </div>
    )

}
