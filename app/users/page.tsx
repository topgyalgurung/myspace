import { prisma } from "@/lib/prisma";
import ReturnCard from '@/app/components/UserCard/UserCard'

// with prisma, access data directly in component and render it 
export default async function Users(){
    // to test error 
    // throw new Error('this is an error');
    
    const users = await prisma.user.findMany();

    return(
        <div>
            {users.map((user) =>{
                return <ReturnCard key={user.id} {...user}/>
            })}
        </div>
    )
}