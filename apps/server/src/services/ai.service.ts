import Anthropic from "@anthropic-ai/sdk"
import OpenAI, { AzureOpenAI } from "openai"
import { prisma } from "../lib/prisma"
import { env } from "../config/env"
import type { ArticleGenerationResult } from "@news-app/types"

// ─── Prompt versions ──────────────────────────────────────────────────────────

const ARTICLE_FROM_TRANSCRIPT_V1 = "article-from-transcript-v1"
const ARTICLE_FROM_SOURCE_V1     = "article-from-source-v1"
const ARTICLE_FROM_TREND_V1      = "article-from-trend-v1"

// ─── Active config loader (cached per request) ────────────────────────────────

async function getActiveConfig() {
  const config = await prisma.aiConfig.findFirst({ where: { isActive: true } })
  if (!config) throw new Error("No active AI config found. Please configure an AI provider in the admin settings.")
  return config
}

// ─── Provider clients ─────────────────────────────────────────────────────────

function getAnthropicClient() {
  if (!env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY is not set")
  return new Anthropic({ apiKey: env.ANTHROPIC_API_KEY })
}

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

function getAzureClient(baseUrl: string) {
  if (!env.AZURE_OPENAI_API_KEY) throw new Error("AZURE_OPENAI_API_KEY is not set")
  return new AzureOpenAI({ apiKey: env.AZURE_OPENAI_API_KEY, endpoint: baseUrl, apiVersion: "2024-10-21" })
}

// ─── Core completion ─────────────────────────────────────────────────────────

async function complete(prompt: string): Promise<string> {
  const config = await getActiveConfig()

  if (config.provider === "ANTHROPIC") {
    const client = getAnthropicClient()
    const response = await client.messages.create({
      model: config.model,
      max_tokens: config.maxTokens,
      temperature: config.temperature,
      messages: [{ role: "user", content: prompt }],
    })
    const block = response.content[0]
    if (block.type !== "text") throw new Error("Unexpected Anthropic response type")
    return block.text
  }

  // OpenAI-compatible providers (Groq, OpenRouter, Azure OpenAI)
  let client: OpenAI | AzureOpenAI

  if (config.provider === "GROQ") {
    client = getGroqClient()
  } else if (config.provider === "OPENROUTER") {
    client = getOpenRouterClient()
  } else if (config.provider === "AZURE_OPENAI") {
    if (!config.baseUrl) throw new Error("Azure OpenAI requires a baseUrl (endpoint) in AI config")
    client = getAzureClient(config.baseUrl)
  } else {
    throw new Error(`Unknown AI provider: ${config.provider}`)
  }

  const response = await (client as OpenAI).chat.completions.create({
    model: config.model,
    max_tokens: config.maxTokens,
    temperature: config.temperature,
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
}
