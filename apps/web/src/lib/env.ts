import { z } from "zod"

const isProd = process.env.NODE_ENV === "production"
const PROD_URL = "https://www.factverseinsights.com"

/**
 * Client-safe environment variables.
 * Only NEXT_PUBLIC_* vars are accessible in the browser.
 * Server-only vars live in env-server.ts.
 */
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default(isProd ? PROD_URL : "http://localhost:3001"),
})

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
})

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors)
  throw new Error("Invalid environment variables")
}

export const env = parsed.data
