// access user in the frontend 

"use client"

import { SessionProvider } from "next-auth/react"

type Props ={
    children: React.ReactNode;
}

// allow any client side component nested below to access current user
export default function AuthProvider({children}:Props){
    return <SessionProvider>{children}</SessionProvider>
}