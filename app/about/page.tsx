// static page 

// if you want to be explicit 
export const dynamic = 'force-static'

import { Metadata } from "next";

export const Metadata:Metadata = {
    title: 'About us',
    description: 'We are social media company',
}


export default async function About(){
    return(
        <main>
            <h1>About</h1>
            <p> We are a social media company</p>
        </main>
    )
}