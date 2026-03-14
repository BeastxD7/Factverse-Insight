"use server"

import { serverApi } from "@/lib/api-server"

interface IngestResult {
  jobRunId: string
  videoId: string
  status: string
}

type SingleArticleResult = {
  articleId: string
  articleTitle: string
  articleSlug: string
}

type MultiArticleResult = {
  articleCount: number
  articles: Array<{ id: string; title: string; slug: string }>
  splitReason: string
}

export type JobResult = SingleArticleResult | MultiArticleResult | null

export function isMultiArticleResult(r: JobResult): r is MultiArticleResult {
  return r != null && "articleCount" in r
}

interface JobStatus {
  id: string
  type: string
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "CANCELLED"
  errorMessage: string | null
  result: JobResult
  createdAt: string
  completedAt: string | null
}

export async function ingestYoutubeUrl(
  url: string,
  topicId?: string
): Promise<{ success: boolean; data?: IngestResult; error?: string }> {
  try {
    const data = await serverApi.post<IngestResult>("/admin/ingest/youtube", {
      url,
      ...(topicId && { topicId }),
    })
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to submit" }
  }
}

export async function getJobStatus(
  jobRunId: string
): Promise<{ success: boolean; data?: JobStatus; error?: string }> {
  try {
    const data = await serverApi.get<JobStatus>(`/admin/ingest/jobs/${jobRunId}`)
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to fetch status" }
  }
}
