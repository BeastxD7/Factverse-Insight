import "server-only"
import { z } from "zod"

const isProd = process.env.NODE_ENV === "production"
const PROD_URL = "https://www.factverseinsight.com"

/**
 * Server-only environment variables.
 * This module is never bundled into the client.
 * Only import from Server Components, Server Actions, or API routes.
 *
 * URL defaults are environment-aware:
 *   production  → https://www.factverseinsight.com
 *   development → http://localhost:*
 */
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default(isProd ? PROD_URL : "http://localhost:3001"),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url().default(isProd ? PROD_URL : "http://localhost:3000"),
  API_SECRET: z.string().min(1),
  PEXELS_API_KEY: z.string().optional(),
})

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  API_SECRET: process.env.API_SECRET,
  PEXELS_API_KEY: process.env.PEXELS_API_KEY,
})

if (!parsed.success) {
  console.error("Invalid server environment variables:", parsed.error.flatten().fieldErrors)
  throw new Error("Invalid server environment variables")
}

export const serverEnv = parsed.data
