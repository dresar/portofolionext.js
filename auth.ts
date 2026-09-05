import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

// Validate environment variables
if (!process.env.NEXTAUTH_SECRET) {
  console.warn("[AUTH] WARNING: NEXTAUTH_SECRET is not set!")
}

if (!process.env.NEXTAUTH_URL) {
  console.warn("[AUTH] WARNING: NEXTAUTH_URL is not set!")
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("[AUTH] Authorize called with:", {
            username: credentials?.username ? "***" : "missing",
            hasPassword: !!credentials?.password,
          })

          if (!credentials?.username || !credentials?.password) {
            console.log("[AUTH] Missing credentials")
            return null
          }

          console.log("[AUTH] Looking for user:", credentials.username)
          const user = await prisma.user.findUnique({
            where: { username: credentials.username as string },
          })

          if (!user) {
            console.log("[AUTH] User not found:", credentials.username)
            return null
          }

          console.log("[AUTH] User found:", {
            id: user.id,
            username: user.username,
            hasPassword: !!user.password,
          })

          if (!user.password) {
            console.log("[AUTH] User has no password")
            return null
          }

          console.log("[AUTH] Comparing password...")
          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          console.log("[AUTH] Password valid:", isPasswordValid)

          if (!isPasswordValid) {
            console.log("[AUTH] Invalid password")
            return null
          }

          console.log("[AUTH] Authentication successful for:", user.username)
          return {
            id: user.id,
            email: user.email,
            name: user.name || user.username,
            username: user.username,
          }
        } catch (error: any) {
          console.error("[AUTH] Error in authorize:", {
            message: error?.message,
            stack: error?.stack,
            name: error?.name,
          })
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = (user as any).username
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        ;(session.user as any).username = token.username
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
}

export default NextAuth(authOptions)
