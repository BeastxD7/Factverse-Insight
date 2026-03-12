import OpenAI, { AzureOpenAI } from "openai"
import { prisma } from "../lib/prisma"
import { env } from "../config/env"
import type { ArticleGenerationResult, TranscriptSplitResult, TranscriptSegment } from "@news-app/types"

// ─── Prompt versions ──────────────────────────────────────────────────────────

const ARTICLE_FROM_TRANSCRIPT_V1 = "article-from-transcript-v1"
const ARTICLE_FROM_SOURCE_V1     = "article-from-source-v1"
const ARTICLE_FROM_TREND_V1      = "article-from-trend-v1"
const TRANSCRIPT_SPLIT_V1        = "transcript-split-v1"
const ARTICLE_FROM_SEGMENT_V1    = "article-from-segment-v1"

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
   * Analyze a long transcript and intelligently split it into topic segments
   */
  async analyzeAndSplitTranscript(
    transcript: string,
    videoMeta: { title: string; duration: number; channelName: string }
  ): Promise<TranscriptSplitResult> {
    // Thresholds for splitting
    const MIN_CHARS_FOR_SPLIT = 80000 // ~40k words
    const MIN_DURATION_FOR_SPLIT = 90 * 60 // 90 minutes

    const shouldSplit = transcript.length >= MIN_CHARS_FOR_SPLIT || videoMeta.duration >= MIN_DURATION_FOR_SPLIT

    if (!shouldSplit) {
      return { shouldSplit: false, segments: [] }
    }

    const prompt = `You are an expert content analyst. Analyze the following long-form video transcript and identify distinct topics or segments that could each become a standalone article.

VIDEO METADATA:
Title: ${videoMeta.title}
Channel: ${videoMeta.channelName}
Duration: ${Math.round(videoMeta.duration / 60)} minutes

TRANSCRIPT (first 8000 chars):
${transcript.slice(0, 8000)}

... [middle section omitted for brevity]

TRANSCRIPT (last 3000 chars):
${transcript.slice(-3000)}

TOTAL LENGTH: ${transcript.length} characters

Identify 2-5 major topics/segments from this content. For each segment provide:
- A clear, descriptive title
- A brief summary (2-3 sentences)
- Key topics covered
- Approximate position in the transcript (as percentage: 0-100)

Return ONLY a JSON object:
{
  "shouldSplit": true,
  "reason": "Brief explanation why this should be split",
  "segments": [
    {
      "title": "Segment title",
      "startPosition": 0,
      "endPosition": 30,
      "summary": "What this segment covers",
      "keyTopics": ["topic1", "topic2", "topic3"]
    }
  ]
}

Ensure segments cover different aspects and don't overlap heavily.`

    const config = await getActiveConfig()
    const raw = await complete(prompt)
    const result = JSON.parse(raw.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1] ?? raw) as TranscriptSplitResult

    // Convert percentage positions to character positions
    const totalLength = transcript.length
    result.segments = result.segments.map((seg) => ({
      ...seg,
      startPosition: Math.floor((seg.startPosition / 100) * totalLength),
      endPosition: Math.floor((seg.endPosition / 100) * totalLength),
    }))

    return result
  },

  /**
   * Generate an article from a specific transcript segment
   */
  async generateArticleFromSegment(
    transcript: string,
    segment: TranscriptSegment,
    videoMeta: { title: string; duration: number; channelName: string; url: string },
    topicKeywords: string[]
  ): Promise<ArticleGenerationResult> {
    const config = await getActiveConfig()
    const segmentText = transcript.slice(segment.startPosition, segment.endPosition)
    
    const prompt = `You are an expert SEO content writer. Based on the following segment from a YouTube video transcript, write a focused, high-quality, original, SEO-optimised article.

VIDEO METADATA:
Title: ${videoMeta.title}
Channel: ${videoMeta.channelName}
Source: ${videoMeta.url}

SEGMENT FOCUS: ${segment.title}
SEGMENT SUMMARY: ${segment.summary}
KEY TOPICS: ${segment.keyTopics.join(", ")}

TOPIC KEYWORDS (embed naturally):
${topicKeywords.join(", ")}

TRANSCRIPT SEGMENT (${segmentText.length} chars):
${segmentText.slice(0, 5000)}${segmentText.length > 5000 ? "\n... [truncated for prompt length]" : ""}

Write a focused article about "${segment.title}" and return ONLY a JSON object with this exact structure:
{
  "title": "Compelling SEO title about this specific segment (50-60 chars)",
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
