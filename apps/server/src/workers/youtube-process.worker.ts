import { Worker, type Job } from "bullmq"
import { env } from "../config/env"
import { prisma } from "../lib/prisma"
import { aiService } from "../services/ai.service"
import { imageService } from "../services/image.service"
import { fetchTranscript, fetchVideoMeta } from "../services/youtube.service"
import type { YoutubeProcessPayload, ArticleGenerationResult } from "@news-app/types"

const QUEUE_NAME = "youtube-process"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80)
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base
  let attempt = 0
  while (await prisma.article.findUnique({ where: { slug } })) {
    attempt++
    slug = `${base}-${attempt}`
  }
  return slug
}

async function createArticleFromResult(
  result: ArticleGenerationResult,
  videoUrl: string,
  jobRunId?: string,
  ogImage?: string | null
): Promise<{ id: string; title: string; slug: string }> {
  // Resolve category
  let categoryId: string | undefined
  if (result.suggestedCategory) {
    const category = await prisma.category.findFirst({
      where: { name: { equals: result.suggestedCategory, mode: "insensitive" } },
    })
    if (category) categoryId = category.id
  }

  // Resolve/create tags
  const tagIds: string[] = []
  for (const tagName of result.suggestedTags ?? []) {
    const tagSlug = slugify(tagName)
    if (!tagSlug) continue
    const tag = await prisma.tag.upsert({
      where: { slug: tagSlug },
      update: {},
      create: { name: tagName, slug: tagSlug },
    })
    tagIds.push(tag.id)
  }

  // Create article
  const articleSlug = await uniqueSlug(result.slug || slugify(result.title))
  const article = await prisma.article.create({
    data: {
      title: result.title,
      slug: articleSlug,
      excerpt: result.excerpt,
      content: result.content,
      metaTitle: result.metaTitle,
      metaDescription: result.metaDescription,
      keywords: result.keywords,
      status: "DRAFT",
      sourceType: "YOUTUBE_VIDEO",
      sourceUrl: videoUrl,
      aiGenerated: true,
      aiModel: result.aiModel,
      aiPromptVersion: result.aiPromptVersion,
      ...(ogImage && { ogImage }),
      ...(categoryId && { categoryId }),
      ...(jobRunId && { jobRunId }),
      tags: {
        create: tagIds.map((tagId) => ({ tagId })),
      },
    },
  })

  return { id: article.id, title: article.title, slug: article.slug }
}

async function processYoutubeVideo(job: Job<YoutubeProcessPayload>): Promise<void> {
  const { videoId, videoUrl, topicId } = job.data

  console.log(`[youtube-process] Starting job ${job.id} for video ${videoId}`)

  // Update JobRun status to RUNNING
  const jobRun = await prisma.jobRun.findFirst({
    where: { bullJobId: job.id, type: "YOUTUBE_PROCESS" },
  })

  if (jobRun) {
    await prisma.jobRun.update({
      where: { id: jobRun.id },
      data: { status: "RUNNING", startedAt: new Date() },
    })
  }

  try {
    // 1. Fetch video metadata
    const meta = await fetchVideoMeta(videoId)
    console.log(`[youtube-process] Video: "${meta.title}" by ${meta.channelName}`)

    // 2. Fetch transcript
    const { text: transcript, estimatedDurationSecs } = await fetchTranscript(videoId)
    meta.duration = estimatedDurationSecs
    console.log(`[youtube-process] Transcript: ${transcript.length} chars, ~${Math.round(estimatedDurationSecs / 60)} min`)

    // 3. Get topic keywords if topicId is provided
    let topicKeywords: string[] = []
    if (topicId) {
      const topic = await prisma.topic.findUnique({ where: { id: topicId } })
      if (topic) topicKeywords = topic.keywords
    }

    // 4. Check if this video should be split into multiple articles
    console.log(`[youtube-process] Analyzing content for smart splitting...`)
    const splitAnalysis = await aiService.analyzeAndSplitTranscript(transcript, meta)

    if (splitAnalysis.shouldSplit && splitAnalysis.segments.length >= 1) {
      const segCount = splitAnalysis.segments.length
      console.log(`[youtube-process] Smart split: ${segCount} segment(s) detected`)
      console.log(`[youtube-process] Reason: ${splitAnalysis.reason}`)

      const articles: Array<{ id: string; title: string; slug: string }> = []

      // Generate an article for each segment (works for 1 segment or many)
      for (let i = 0; i < segCount; i++) {
        const segment = splitAnalysis.segments[i]
        console.log(`[youtube-process] Generating article ${i + 1}/${segCount}: "${segment.title}"`)

        const result = await aiService.generateArticleFromSegment(
          transcript,
          segment,
          { ...meta, url: videoUrl },
          topicKeywords,
          splitAnalysis.contentMap
        )

        const coverImage = await imageService.fetchCoverImage(
          result.keywords.slice(0, 3).join(" ") || result.title
        )
        const article = await createArticleFromResult(result, videoUrl, jobRun?.id, coverImage)
        articles.push(article)
        console.log(`[youtube-process] Created article "${article.title}" (${article.id})`)
      }

      if (jobRun) {
        if (articles.length === 1) {
          // Single segment — store as single article result for cleaner UI
          await prisma.jobRun.update({
            where: { id: jobRun.id },
            data: {
              status: "COMPLETED",
              completedAt: new Date(),
              result: {
                articleId: articles[0].id,
                articleTitle: articles[0].title,
                articleSlug: articles[0].slug,
              },
            },
          })
        } else {
          await prisma.jobRun.update({
            where: { id: jobRun.id },
            data: {
              status: "COMPLETED",
              completedAt: new Date(),
              result: {
                articleCount: articles.length,
                articles: articles.map((a) => ({ id: a.id, title: a.title, slug: a.slug })),
                splitReason: splitAnalysis.reason,
              },
            },
          })
        }
      }

      console.log(`[youtube-process] Successfully created ${articles.length} article(s) from video`)
    } else {
      // Short video below split threshold — single article from full transcript
      console.log(`[youtube-process] Generating single article (below split threshold)`)
      const result = await aiService.generateArticleFromTranscript(transcript, topicKeywords, { ...meta, url: videoUrl })
      console.log(`[youtube-process] AI generated article: "${result.title}"`)

      const coverImage = await imageService.fetchCoverImage(
        result.keywords.slice(0, 3).join(" ") || result.title
      )
      const article = await createArticleFromResult(result, videoUrl, jobRun?.id, coverImage)
      console.log(`[youtube-process] Created article "${article.title}" (${article.id})`)

      if (jobRun) {
        await prisma.jobRun.update({
          where: { id: jobRun.id },
          data: {
            status: "COMPLETED",
            completedAt: new Date(),
            result: {
              articleId: article.id,
              articleTitle: article.title,
              articleSlug: article.slug,
            },
          },
        })
      }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    console.error(`[youtube-process] Job ${job.id} failed:`, errorMessage)

    // Update JobRun to FAILED
    if (jobRun) {
      await prisma.jobRun.update({
        where: { id: jobRun.id },
        data: {
          status: "FAILED",
          completedAt: new Date(),
          errorMessage,
        },
      })
    }

    throw err // Re-throw so BullMQ can retry
  }
}

export function startYoutubeProcessWorker(): Worker {
  const worker = new Worker(QUEUE_NAME, processYoutubeVideo, {
    connection: { url: env.REDIS_URL, maxRetriesPerRequest: null as unknown as undefined },
    concurrency: 2,
  })

  worker.on("completed", (job) => {
    console.log(`[youtube-process] Job ${job.id} completed`)
  })

  worker.on("failed", (job, err) => {
    console.error(`[youtube-process] Job ${job?.id} failed:`, err.message)
  })

  console.log("[youtube-process] Worker started")
  return worker
}
