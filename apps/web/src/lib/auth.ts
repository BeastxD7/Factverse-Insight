import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { compare } from "bcryptjs"
import { prisma } from "@news-app/db"

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  // Suppress next-auth@5.0.0-beta.30's known "Validation Error Count: 1" noise
  // that fires on every Credentials sign-in. This is an upstream bug, not ours.
  // Remove this once next-auth v5 stable ships.
  logger: {
    error: (error) => {
      if ((error as Error).message === "Read more at https://errors.authjs.dev") return
      console.error("[auth][error]", error)
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) return null

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
          select: { id: true, email: true, name: true, image: true, passwordHash: true },
        })

        if (!user?.passwordHash) return null

        const valid = await compare(parsed.data.password, user.passwordHash)
        if (!valid) return null

        // Return ONLY the standard NextAuth User fields (id, email, name, image).
        // Extra fields like `role` trigger NextAuth v5 beta's internal schema
        // validation warning. Role is fetched separately in the jwt callback below.
        return { id: user.id, email: user.email, name: user.name, image: user.image }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // This runs once at login (user is defined) and on every subsequent request.
      if (user?.id) {
        token.id = user.id
        // Fetch role from DB — only happens once at login, stored in the JWT cookie.
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        })
        token.role = dbUser?.role ?? "USER"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
