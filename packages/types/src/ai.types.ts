export type AIProvider = "AZURE_OPENAI" | "GROQ" | "OPENROUTER"

export interface AIConfig {
  id: string
  provider: AIProvider
  model: string
  temperature: number
  maxTokens: number
  baseUrl: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface UpdateAIConfigDto {
  provider?: AIProvider
  model?: string
  temperature?: number
  maxTokens?: number
  baseUrl?: string
}

// ─── Available models per provider ───────────────────────────────────────────

export const AI_PROVIDER_MODELS: Record<AIProvider, Array<{ id: string; label: string }>> = {
  GROQ: [
    { id: "llama-3.3-70b-versatile",  label: "Llama 3.3 70B Versatile" },
    { id: "llama-3.1-8b-instant",     label: "Llama 3.1 8B Instant" },
    { id: "mixtral-8x7b-32768",       label: "Mixtral 8x7B" },
    { id: "gemma2-9b-it",             label: "Gemma 2 9B" },
  ],
  OPENROUTER: [
    { id: "meta-llama/llama-3.3-70b-instruct", label: "Llama 3.3 70B" },
    { id: "google/gemini-flash-1.5",           label: "Gemini Flash 1.5" },
    { id: "mistralai/mistral-large",           label: "Mistral Large" },
    { id: "openai/gpt-4o",                     label: "GPT-4o (via OpenRouter)" },
  ],
  AZURE_OPENAI: [
    { id: "o3-mini",      label: "o3-mini (recommended)" },
    { id: "gpt-4o",       label: "GPT-4o" },
    { id: "gpt-4o-mini",  label: "GPT-4o Mini" },
    { id: "gpt-4-turbo",  label: "GPT-4 Turbo" },
  ],
}

export const AI_PROVIDER_LABELS: Record<AIProvider, string> = {
  AZURE_OPENAI: "Azure OpenAI",
  GROQ:         "Groq",
  OPENROUTER:   "OpenRouter",
}

// ─── Transcript splitting ────────────────────────────────────────────────────

export interface ChunkMeta {
  chunkIndex: number
  startPos: number
  endPos: number
  charCount: number
  topicName: string    // e.g. "Kingfisher Airlines Launch"
  summary: string      // 2-3 sentence summary of actual chunk content
  concepts: string[]   // key themes/ideas in this chunk
  entities: string[]   // people, places, orgs, products mentioned
}

export interface TranscriptSegment {
  title: string
  startPosition: number // exact char position derived from chunk boundaries
  endPosition: number
  summary: string
  keyTopics: string[]
}

export interface TranscriptSplitResult {
  shouldSplit: boolean
  reason?: string
  segments: TranscriptSegment[]
  contentMap: ChunkMeta[] // full chunk-by-chunk map of the entire transcript
}
