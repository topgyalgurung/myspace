"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";

interface Props{
    targetUserId: string;
    isFollowing: boolean;
}
export default function FollowClient({targetUserId, isFollowing}: Props){
    const router = useRouter();

    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching ] = useState(false);
    // derived state 
    const isMutating = isFetching || isPending;

    const follow = async() => {
        setIsFetching(true);

        // sent targetUserId in the request body to create new relation in the db 
        const res = await fetch('/api/follow', {
            method: "POST",
            body: JSON.stringify({targetUserId}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        setIsFetching(false);
        console.log(res);

        startTransition(() =>{
            // refresh the current route
            // make a new request to server for the route
            // refetches data requests and rerender server components
            // sends updated react server component payload to client
            // client merges the payload without losing unaffected client side react state 
            router.refresh();
        })
    }
    const unfollow = async() =>{
        setIsFetching(true);

        const res = await fetch(`/api/follow?targetUserId=${targetUserId}`,{
            method:'DELETE',  
        });
        setIsFetching(false);
        // we are refreshing entire route anytime a relation changes 
        // if we had multiple follow buttons on same page, rerender all of them 
        // better might be make FollowButton client component in that case 
        startTransition(() => router.refresh());
    }

    if(isFollowing){
        return(
            <button onClick={unfollow}>
                {!isMutating ? 'Unfollow': "..."}
            </button>
        )
    }else{
        return(
            <button onClick={follow}>
                {!isMutating ? 'Follow': "..."}
            </button>
        )
    }

}