import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {prisma} from '@/lib/prisma'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  // Use JWT strategy for better edge runtime compatibility
  session: {
    strategy: "jwt",
  },
  // Enable database sessions only when needed
  // session: {
  //   strategy: "database",
  // },
})