import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  // you can also store session server side 
//   session: {
//     strategy: "database",
// },
})