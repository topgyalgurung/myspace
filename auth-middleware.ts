import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

// This is a lightweight auth configuration for middleware
// It doesn't include Prisma adapter to avoid edge runtime issues
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  // Use JWT strategy for middleware compatibility
  session: {
    strategy: "jwt",
  },
})
