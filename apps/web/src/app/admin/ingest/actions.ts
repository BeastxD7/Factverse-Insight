"use server"

import { serverApi } from "@/lib/api-server"
import type { JobResult } from "./types"

interface IngestResult {
  jobRunId: string
  videoId: string
  status: string
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
