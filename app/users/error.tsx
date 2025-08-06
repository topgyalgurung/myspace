'use client'

import { useEffect } from "react";

// use case: nice ui feature if network issue or temporary downtime

export default function Error({
    error,
    reset,
}:{
    error: Error; // actual error object of what went wrong 
    reset:() => void  // special function that attempt to rerender page component 
}){
    // if you want to console log error 
    useEffect(() =>{
        console.error(error);
    },[error]);
    return(
        <div>
            <h2> Something went wrong! </h2>
            <button onClick ={() => reset()}> Try Again</button>
        </div>
    );
}