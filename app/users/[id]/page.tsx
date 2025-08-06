import {prisma} from '@/lib/prisma';
import { Metadata } from 'next';

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
    // params should be await fix {where:{id:id}}
    const {id} = await params
    const user = await prisma.user.findUnique({where:{id}});
    const {name, bio, image} = user ?? {};

    return(
        <div>
            <h1>{name}</h1>
            <img   
                width={300}
                src = {image ?? "/meman.webp"}

                alt={`${name}'s profile`}
            />
            <h3>Bio</h3>
            <p>{bio}</p>

        </div>
    )

}
