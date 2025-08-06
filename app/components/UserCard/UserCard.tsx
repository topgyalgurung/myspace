import Link from "next/link";


interface Props{
    id:string;
    name:string | null;
    age: number | null;
    image: string | null;
}

export default function UserCard({id, name, age,image}: Props){
    return(
        <div>
            <img
                src = {image ?? "/meman.webp"}
                alt = {`${name}'s profile`}
                // className = 
            />
            <div>
                <h3>
                    <Link href={`/users/${id}`}>{name}</Link>
                </h3>
                <p>Age: {age}</p>
            </div>
        </div>
    )
}