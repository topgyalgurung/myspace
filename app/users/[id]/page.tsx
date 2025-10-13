import {prisma} from '@/lib/prisma';
import FollowButton from '@/app/components/FollowButton/FollowButton';
import { Metadata } from 'next';
import Image from 'next/image';

interface Props{
    params:{
        id:string;
    }
}

export async function generateMetadata({params}:Props):Promise<Metadata>{
    const {id} = await params
    const user = await prisma.user.findUnique({where:{id}});
    return {title: `User profile of ${user?.name}`};
}

export default async function UserProfile({params}:Props){
    const {id} = await params
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
        
            {/* @ts-expect-error Server Component */}
            <FollowButton targetUserId = {id}/>
        </div>
    )

}
