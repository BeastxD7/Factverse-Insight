"use server"

import { serverApi } from "@/lib/api-server"
import type { JobResult } from "./types"

interface IngestResult {
  jobRunId: string
  videoId: string
  status: string
}

export interface JobStatus {
  id: string
  type: string
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "CANCELLED"
  errorMessage: string | null
  result: JobResult
  payload?: unknown
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

export interface JobsPage {
  items: JobStatus[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export async function bulkDeleteJobs(): Promise<{ success: boolean; deleted?: number; error?: string }> {
  try {
    const data = await serverApi.delete<{ deleted: number }>("/admin/jobs")
    return { success: true, deleted: data.deleted }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Failed" }
  }
}

export async function getYoutubeJobs(
  page = 1,
  status?: string,
  pageSize = 10
): Promise<JobsPage> {
  try {
    const params = new URLSearchParams({
      type: "YOUTUBE_PROCESS",
      page: String(page),
      pageSize: String(pageSize),
      ...(status && status !== "ALL" && { status }),
    })
    const res = await serverApi.getRaw(`/admin/jobs?${params}`) as {
      data?: unknown; total?: number; page?: number; pageSize?: number; totalPages?: number
    }
    return {
      items: Array.isArray(res.data) ? (res.data as JobStatus[]) : [],
      total: res.total ?? 0,
      page: res.page ?? page,
      pageSize: res.pageSize ?? pageSize,
      totalPages: res.totalPages ?? 1,
    }
  } catch {
    return { items: [], total: 0, page: 1, pageSize, totalPages: 1 }
  }
}
