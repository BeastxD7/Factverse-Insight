import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3001),

  // Database
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  // Redis
  REDIS_URL: z.string().min(1, "REDIS_URL is required"),

  // Auth
  API_SECRET: z.string().min(1, "API_SECRET is required"),
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
  NEXTAUTH_URL: z.string().default("http://localhost:3000"),

  // AI — Groq (optional)
  GROQ_API_KEY: z.string().optional(),

  // AI — OpenRouter (optional)
  OPENROUTER_API_KEY: z.string().optional(),

  // AI — Azure OpenAI (optional)
  AZURE_OPENAI_API_KEY: z.string().optional(),
  AZURE_OPENAI_ENDPOINT: z.string().optional(),
  AZURE_OPENAI_API_VERSION: z.string().default("2025-01-01-preview"),

  // Content APIs (optional — workers will skip if missing)
  NEWSAPI_KEY: z.string().optional(),
  GNEWS_API_KEY: z.string().optional(),
  YOUTUBE_API_KEY: z.string().optional(),

  // Image API — used to auto-fetch cover images during article generation
  PEXELS_API_KEY: z.string().optional(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error("Invalid environment variables:")
  console.error(parsed.error.flatten().fieldErrors)
  process.exit(1)
}

export const env = parsed.data
export type Env = typeof env
