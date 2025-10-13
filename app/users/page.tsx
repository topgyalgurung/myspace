import { prisma } from "@/lib/prisma";
import ReturnCard from '@/app/components/UserCard/UserCard'
import styles from './page.module.css'

// with prisma, access data directly in component and render it 
export default async function Users(){
    const users = await prisma.user.findMany();

    return(
        <div className={styles.grid}>
            {users.map((user) =>{
                return <ReturnCard key={user.id} {...user}/>
            })}
        </div>
    )
}