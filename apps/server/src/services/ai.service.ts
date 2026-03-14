import OpenAI, { AzureOpenAI } from "openai"
import { prisma } from "../lib/prisma"
import { env } from "../config/env"
import type { ArticleGenerationResult, TranscriptSplitResult, TranscriptSegment, ChunkMeta } from "@news-app/types"

// ─── Prompt versions ──────────────────────────────────────────────────────────

const ARTICLE_FROM_TRANSCRIPT_V1 = "article-from-transcript-v1"
const ARTICLE_FROM_SOURCE_V1     = "article-from-source-v1"
const ARTICLE_FROM_TREND_V1      = "article-from-trend-v1"
const TRANSCRIPT_SPLIT_V1        = "transcript-split-v1"
const ARTICLE_FROM_SEGMENT_V1    = "article-from-segment-v1"

// ─── Smart split constants ────────────────────────────────────────────────────

const CHUNK_SIZE           = 24000  // chars per chunk — o3-mini supports 200k tokens (~800k chars)
const CHUNK_BATCH_SIZE     = 5      // parallel AI calls at once (rate-limit friendly)
const SAMPLE_PER_CHUNK     = 2500   // chars sampled per chunk for article gen (richer with large context)
const MIN_CHARS_FOR_SPLIT  = 80000
const MIN_DURATION_FOR_SPLIT = 90 * 60 // 90 minutes

// ─── Active config loader (cached per request) ────────────────────────────────

async function getActiveConfig() {
  const config = await prisma.aiConfig.findFirst({ where: { isActive: true } })
  if (!config) throw new Error("No active AI config found. Please configure an AI provider in the admin settings.")
  return config
}

// ─── Provider clients ─────────────────────────────────────────────────────────

function getGroqClient() {
  if (!env.GROQ_API_KEY) throw new Error("GROQ_API_KEY is not set")
  return new OpenAI({ apiKey: env.GROQ_API_KEY, baseURL: "https://api.groq.com/openai/v1" })
}

function getOpenRouterClient() {
  if (!env.OPENROUTER_API_KEY) throw new Error("OPENROUTER_API_KEY is not set")
  return new OpenAI({
    apiKey: env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: { "HTTP-Referer": env.NEXTAUTH_URL },
  })
}

function getAzureClient(configBaseUrl: string | null) {
  if (!env.AZURE_OPENAI_API_KEY) throw new Error("AZURE_OPENAI_API_KEY is not set")
  const endpoint = env.AZURE_OPENAI_ENDPOINT ?? configBaseUrl
  if (!endpoint) throw new Error("Azure OpenAI requires AZURE_OPENAI_ENDPOINT env var or baseUrl in AI config")
  return new AzureOpenAI({
    apiKey: env.AZURE_OPENAI_API_KEY,
    endpoint,
    apiVersion: env.AZURE_OPENAI_API_VERSION,
  })
}

// ─── Core completion ─────────────────────────────────────────────────────────

async function complete(prompt: string): Promise<string> {
  const config = await getActiveConfig()

  // All providers use OpenAI-compatible API (Groq, OpenRouter, Azure OpenAI)
  let client: OpenAI | AzureOpenAI

  if (config.provider === "GROQ") {
    client = getGroqClient()
  } else if (config.provider === "OPENROUTER") {
    client = getOpenRouterClient()
  } else if (config.provider === "AZURE_OPENAI") {
    client = getAzureClient(config.baseUrl)
  } else {
    throw new Error(`Unknown AI provider: ${config.provider}`)
  }

  // o3-mini and similar reasoning models don't support temperature
  const isReasoningModel = config.model.startsWith("o1") || config.model.startsWith("o3")

  const response = await (client as OpenAI).chat.completions.create({
    model: config.model,
    max_completion_tokens: config.maxTokens,
    ...(!isReasoningModel && { temperature: config.temperature }),
    messages: [{ role: "user", content: prompt }],
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error("Empty response from AI provider")
  return content
}

// ─── JSON extraction helper ───────────────────────────────────────────────────

function extractJSON(raw: string): ArticleGenerationResult {
  const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/) ?? raw.match(/(\{[\s\S]*\})/)
  const jsonStr = match ? match[1] ?? match[0] : raw
  return JSON.parse(jsonStr.trim())
}

// ─── Article generation prompts ───────────────────────────────────────────────

export const aiService = {
  async generateArticleFromTranscript(
    transcript: string,
    topicKeywords: string[],
    videoMeta: { title: string; duration: number; channelName: string }
  ): Promise<ArticleGenerationResult> {
    const config = await getActiveConfig()
    const prompt = `You are an expert SEO content writer. Based on the following YouTube video transcript, write a high-quality, original, SEO-optimised news article.

VIDEO METADATA:
Title: ${videoMeta.title}
Channel: ${videoMeta.channelName}
Duration: ${Math.round(videoMeta.duration / 60)} minutes

TOPIC KEYWORDS (embed naturally):
${topicKeywords.join(", ")}

TRANSCRIPT SEGMENT:
${transcript.slice(0, 6000)}

Write the article and return ONLY a JSON object with this exact structure:
{
  "title": "Compelling SEO title (50-60 chars)",
  "slug": "url-friendly-slug",
  "excerpt": "Meta excerpt / summary (120-160 chars)",
  "content": "Full article in Markdown with H2/H3 headings, paragraphs, and a conclusion. Minimum 600 words.",
  "metaTitle": "SEO meta title (50-60 chars)",
  "metaDescription": "SEO meta description (150-160 chars)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "suggestedCategory": "One of: Technology, Business, Science, Health, Sports, Entertainment, Politics, World",
  "suggestedTags": ["tag1", "tag2", "tag3"]
}`

    const raw = await complete(prompt)
    return { ...extractJSON(raw), aiModel: config.model, aiPromptVersion: ARTICLE_FROM_TRANSCRIPT_V1 }
  },

  async rewriteAsArticle(source: {
    headline: string
    summary: string
    url: string
    publishedAt: string
    topicKeywords?: string[]
  }): Promise<ArticleGenerationResult> {
    const config = await getActiveConfig()
    const prompt = `You are an expert SEO content writer. Rewrite the following news item as a unique, original, SEO-optimised article. Do NOT copy the source — write it in your own words with added context and analysis.

SOURCE HEADLINE: ${source.headline}
SOURCE SUMMARY: ${source.summary}
SOURCE URL: ${source.url}
PUBLISHED: ${source.publishedAt}
${source.topicKeywords?.length ? `TOPIC KEYWORDS: ${source.topicKeywords.join(", ")}` : ""}

Return ONLY a JSON object:
{
  "title": "Compelling SEO title (50-60 chars)",
  "slug": "url-friendly-slug",
  "excerpt": "Summary (120-160 chars)",
  "content": "Full original article in Markdown. Minimum 500 words. Include H2/H3 headings.",
  "metaTitle": "SEO meta title (50-60 chars)",
  "metaDescription": "SEO meta description (150-160 chars)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "suggestedCategory": "One of: Technology, Business, Science, Health, Sports, Entertainment, Politics, World",
  "suggestedTags": ["tag1", "tag2", "tag3"]
}`

    const raw = await complete(prompt)
    return { ...extractJSON(raw), aiModel: config.model, aiPromptVersion: ARTICLE_FROM_SOURCE_V1 }
  },

  async generateTrendingArticle(
    trendTerm: string,
    relatedQueries: string[],
    topicContext: string
  ): Promise<ArticleGenerationResult> {
    const config = await getActiveConfig()
    const prompt = `You are an expert SEO content writer. Write a comprehensive, original article about the currently trending topic below.

TRENDING TOPIC: ${trendTerm}
RELATED SEARCHES: ${relatedQueries.join(", ")}
TOPIC CONTEXT: ${topicContext}

Return ONLY a JSON object:
{
  "title": "Compelling SEO title (50-60 chars)",
  "slug": "url-friendly-slug",
  "excerpt": "Summary (120-160 chars)",
  "content": "Full original article in Markdown. Minimum 600 words. Include H2/H3 headings, analysis, and conclusion.",
  "metaTitle": "SEO meta title (50-60 chars)",
  "metaDescription": "SEO meta description (150-160 chars)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "suggestedCategory": "One of: Technology, Business, Science, Health, Sports, Entertainment, Politics, World",
  "suggestedTags": ["tag1", "tag2", "tag3"]
}`

    const raw = await complete(prompt)
    return { ...extractJSON(raw), aiModel: config.model, aiPromptVersion: ARTICLE_FROM_TREND_V1 }
  },

  /**
   * Analyze a long transcript and intelligently split it into topic segments.
   * Every character of the transcript is seen by the AI via chunk-by-chunk analysis.
   */
  async analyzeAndSplitTranscript(
    transcript: string,
    videoMeta: { title: string; duration: number; channelName: string }
  ): Promise<TranscriptSplitResult> {
    const shouldSplit =
      transcript.length >= MIN_CHARS_FOR_SPLIT || videoMeta.duration >= MIN_DURATION_FOR_SPLIT

    if (!shouldSplit) {
      return { shouldSplit: false, segments: [], contentMap: [] }
    }

    // ── Phase 1: Chunk the transcript and analyze every chunk ─────────────────
    // Build chunk inputs covering 100% of the transcript
    interface ChunkInput { text: string; startPos: number; endPos: number; chunkIndex: number }
    const chunkInputs: ChunkInput[] = []
    for (let i = 0; i * CHUNK_SIZE < transcript.length; i++) {
      const startPos = i * CHUNK_SIZE
      const endPos   = Math.min(startPos + CHUNK_SIZE, transcript.length)
      chunkInputs.push({ text: transcript.slice(startPos, endPos), startPos, endPos, chunkIndex: i })
    }

    const totalChunks = chunkInputs.length

    async function analyzeChunk(chunk: ChunkInput): Promise<ChunkMeta> {
      const prompt = `You are extracting metadata from a section of a video transcript.

SECTION ${chunk.chunkIndex + 1} of ${totalChunks} | chars ${chunk.startPos}–${chunk.endPos}

TRANSCRIPT:
${chunk.text}

Return ONLY a JSON object:
{
  "topicName": "2-5 word topic name for this section",
  "summary": "2-3 sentences describing exactly what is discussed here",
  "concepts": ["theme1", "theme2", "theme3"],
  "entities": ["person/place/org/product mentioned"]
}`

      const raw = await complete(prompt)
      const parsed = JSON.parse(raw.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1] ?? raw.match(/(\{[\s\S]*\})/)?.[1] ?? raw) as Omit<ChunkMeta, "chunkIndex" | "startPos" | "endPos" | "charCount">
      return {
        chunkIndex: chunk.chunkIndex,
        startPos:   chunk.startPos,
        endPos:     chunk.endPos,
        charCount:  chunk.endPos - chunk.startPos,
        ...parsed,
      }
    }

    // Process all chunks in parallel batches (rate-limit friendly)
    const contentMap: ChunkMeta[] = []
    for (let b = 0; b < chunkInputs.length; b += CHUNK_BATCH_SIZE) {
      const batch = chunkInputs.slice(b, b + CHUNK_BATCH_SIZE)
      const batchResults = await Promise.all(batch.map(analyzeChunk))
      contentMap.push(...batchResults)
    }

    // ── Phase 2: Send the full content map to AI for segmentation ─────────────
    const mapText = contentMap
      .map(
        (c) =>
          `Chunk ${c.chunkIndex} [chars ${c.startPos}–${c.endPos}]: ${c.topicName}\n  ${c.summary}\n  Concepts: ${c.concepts.join(", ")}\n  Entities: ${c.entities.join(", ")}`
      )
      .join("\n\n")

    const segmentPrompt = `You are segmenting a ${Math.round(videoMeta.duration / 60)}-minute video into topic-based article sections.

VIDEO: "${videoMeta.title}" by ${videoMeta.channelName}

Below is a complete content map — every chunk covers ${CHUNK_SIZE} chars of the actual transcript:

${mapText}

Group these ${totalChunks} chunks into 2-5 major segments for separate articles.
Rules:
- Chunks with related or continuous topics belong in the SAME segment
- Different phases of the same story (e.g. history + journey of a startup) = same segment
- Only split when the topic genuinely changes (e.g. startup journey → cricket business)
- Each segment must have enough content for a 500+ word article

Return ONLY a JSON object:
{
  "shouldSplit": true,
  "reason": "brief explanation",
  "segments": [
    {
      "title": "Segment title",
      "chunkStart": 0,
      "chunkEnd": 3,
      "summary": "what this segment covers",
      "keyTopics": ["topic1", "topic2"]
    }
  ]
}`

    const segRaw = await complete(segmentPrompt)
    const segResult = JSON.parse(
      segRaw.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1] ?? segRaw.match(/(\{[\s\S]*\})/)?.[1] ?? segRaw
    ) as { shouldSplit: boolean; reason?: string; segments: Array<{ title: string; chunkStart: number; chunkEnd: number; summary: string; keyTopics: string[] }> }

    if (!segResult.shouldSplit || !segResult.segments.length) {
      return { shouldSplit: false, segments: [], contentMap }
    }

    // Convert chunk indices → exact char positions using the content map
    const segments: TranscriptSegment[] = segResult.segments.map((seg) => ({
      title:         seg.title,
      summary:       seg.summary,
      keyTopics:     seg.keyTopics,
      startPosition: contentMap[seg.chunkStart]?.startPos ?? 0,
      endPosition:   contentMap[seg.chunkEnd]?.endPos ?? transcript.length,
    }))

    return { shouldSplit: true, reason: segResult.reason, segments, contentMap }
  },

  /**
   * Generate an article from a specific transcript segment.
   * Uses proportional sampling of ACTUAL RAW TEXT from every chunk in the segment
   * so no part of the segment is missed.
   */
  async generateArticleFromSegment(
    transcript: string,
    segment: TranscriptSegment,
    videoMeta: { title: string; duration: number; channelName: string; url: string },
    topicKeywords: string[],
    contentMap: ChunkMeta[]
  ): Promise<ArticleGenerationResult> {
    const config = await getActiveConfig()

    // Find the chunks that belong to this segment
    const chunksInSegment = contentMap.filter(
      (c) => c.startPos >= segment.startPosition && c.endPos <= segment.endPosition
    )

    // Build proportional raw-text sample — actual verbatim content from EVERY chunk
    let sampledText: string
    if (chunksInSegment.length === 0) {
      // Fallback: segment boundaries don't align with chunks — just slice directly
      sampledText = transcript.slice(segment.startPosition, segment.endPosition).slice(0, 8000)
    } else {
      const charsPerChunk = Math.floor(8000 / chunksInSegment.length)
      sampledText = chunksInSegment
        .map((chunk, i) => {
          const rawText = transcript.slice(chunk.startPos, chunk.endPos)
          return `[Part ${i + 1} — ${chunk.topicName}]\n${rawText.slice(0, charsPerChunk)}`
        })
        .join("\n\n---\n\n")
    }

    const prompt = `You are an expert SEO content writer. Based on the following transcript excerpts from a YouTube video, write a focused, high-quality, original, SEO-optimised article.

VIDEO: ${videoMeta.title} by ${videoMeta.channelName}
SOURCE: ${videoMeta.url}

ARTICLE FOCUS: ${segment.title}
WHAT THIS COVERS: ${segment.summary}
KEY TOPICS: ${segment.keyTopics.join(", ")}
${topicKeywords.length ? `\nEMBED THESE KEYWORDS NATURALLY: ${topicKeywords.join(", ")}` : ""}

TRANSCRIPT EXCERPTS (actual content sampled from every part of this segment):
${sampledText}

Write a focused article about "${segment.title}" and return ONLY a JSON object:
{
  "title": "Compelling SEO title about this specific topic (50-60 chars)",
  "slug": "url-friendly-slug",
  "excerpt": "Meta excerpt / summary (120-160 chars)",
  "content": "Full article in Markdown with H2/H3 headings, paragraphs, and conclusion. Minimum 500 words. Focus ONLY on this segment's topics.",
  "metaTitle": "SEO meta title (50-60 chars)",
  "metaDescription": "SEO meta description (150-160 chars)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "suggestedCategory": "One of: Technology, Business, Science, Health, Sports, Entertainment, Politics, World",
  "suggestedTags": ["tag1", "tag2", "tag3"]
}`

    const raw = await complete(prompt)
    return { ...extractJSON(raw), aiModel: config.model, aiPromptVersion: ARTICLE_FROM_SEGMENT_V1 }
  },
}
