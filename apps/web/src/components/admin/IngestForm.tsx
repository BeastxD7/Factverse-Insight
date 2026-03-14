"use client"

import { useState, useTransition, useEffect, useRef, useCallback } from "react"
import { toast } from "sonner"
import { Video, Loader2, CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ingestYoutubeUrl, getJobStatus } from "@/app/admin/ingest/actions"
import { isMultiArticleResult } from "@/app/admin/ingest/types"

interface JobState {
  jobRunId: string
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "CANCELLED"
  errorMessage?: string | null
  // single article
  articleTitle?: string
  // smart split
  articleCount?: number
  articleTitles?: string[]
}

const statusConfig = {
  PENDING: { icon: Clock, label: "Queued", color: "bg-muted text-muted-foreground" },
  RUNNING: { icon: Loader2, label: "Processing", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  COMPLETED: { icon: CheckCircle, label: "Completed", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  FAILED: { icon: XCircle, label: "Failed", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
  CANCELLED: { icon: XCircle, label: "Cancelled", color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
}

export function IngestForm() {
  const [url, setUrl] = useState("")
  const [isPending, startTransition] = useTransition()
  const [jobs, setJobs] = useState<JobState[]>([])
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const pollJobs = useCallback((): void => {
    const activeJobs = jobs.filter(
      (j) => j.status === "PENDING" || j.status === "RUNNING"
    )

    if (activeJobs.length === 0) {
      if (pollingRef.current) {
        clearInterval(pollingRef.current)
        pollingRef.current = null
      }
      return
    }

    for (const job of activeJobs) {
      getJobStatus(job.jobRunId).then((result) => {
        if (!result.success || !result.data) return

        const { status, errorMessage, result: jobResult } = result.data

        let articleTitle: string | undefined
        let articleCount: number | undefined
        let articleTitles: string[] | undefined

        if (isMultiArticleResult(jobResult)) {
          articleCount  = jobResult.articleCount
          articleTitles = jobResult.articles.map((a) => a.title)
        } else if (jobResult) {
          articleTitle = jobResult.articleTitle
        }

        setJobs((prev) =>
          prev.map((j) =>
            j.jobRunId === job.jobRunId
              ? { ...j, status, errorMessage, articleTitle, articleCount, articleTitles }
              : j
          )
        )

        if (status === "COMPLETED") {
          if (articleCount && articleTitles) {
            toast.success(`${articleCount} articles generated!`, {
              description: articleTitles.slice(0, 2).join(" · ") + (articleCount > 2 ? ` · +${articleCount - 2} more` : ""),
            })
          } else {
            toast.success("Article generated!", {
              description: articleTitle ?? "Check the review queue",
            })
          }
        } else if (status === "FAILED") {
          toast.error("Job failed", {
            description: errorMessage ?? "Unknown error",
          })
        }
      })
    }
  }, [jobs])

  useEffect(() => {
    const hasActive = jobs.some(
      (j) => j.status === "PENDING" || j.status === "RUNNING"
    )

    if (hasActive && !pollingRef.current) {
      pollingRef.current = setInterval(pollJobs, 3000)
    }

    if (!hasActive && pollingRef.current) {
      clearInterval(pollingRef.current)
      pollingRef.current = null
    }

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [jobs, pollJobs])

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    if (!url.trim()) return

    startTransition(async () => {
      const result = await ingestYoutubeUrl(url.trim())

      if (result.success && result.data) {
        setJobs((prev) => [
          {
            jobRunId: result.data!.jobRunId,
            status: "PENDING",
          },
          ...prev,
        ])
        toast.info("Video queued for processing")
        setUrl("")
      } else {
        toast.error(result.error ?? "Something went wrong")
      }
    })
  }

  return (
    <div className="space-y-5">
      {/* Input card */}
      <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
        {/* YouTube brand header */}
        <div className="px-6 pt-5 pb-4 border-b border-border/60 bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
              <Video className="size-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">YouTube Video</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Paste a URL — AI will fetch the transcript and generate articles
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="youtube-url" className="text-sm font-medium">
                Video URL
              </Label>
              <div className="flex gap-2">
                <Input
                  id="youtube-url"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isPending}
                  className="flex-1 h-10"
                />
                <Button type="submit" disabled={isPending || !url.trim()} className="h-10 px-5 shrink-0">
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      Queuing...
                    </span>
                  ) : (
                    "Process"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Jobs list */}
      {jobs.length > 0 && (
        <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
          <div className="px-5 py-3 border-b border-border/60 bg-muted/20">
            <h3 className="text-sm font-semibold">Recent Jobs</h3>
          </div>
          <div className="divide-y divide-border/60">
            {jobs.map((job) => {
              const config = statusConfig[job.status]
              const Icon = config.icon
              const isActive = job.status === "PENDING" || job.status === "RUNNING"

              return (
                <div
                  key={job.jobRunId}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Status indicator */}
                    <div className={`size-7 rounded-full flex items-center justify-center shrink-0 ${
                      job.status === "COMPLETED" ? "bg-emerald-50 dark:bg-emerald-900/20" :
                      job.status === "FAILED" ? "bg-red-50 dark:bg-red-900/20" :
                      job.status === "RUNNING" ? "bg-blue-50 dark:bg-blue-900/20" :
                      "bg-muted"
                    }`}>
                      <Icon
                        className={`size-3.5 ${
                          job.status === "COMPLETED" ? "text-emerald-500" :
                          job.status === "FAILED" ? "text-red-500" :
                          job.status === "RUNNING" ? "text-blue-500 animate-spin" :
                          "text-muted-foreground"
                        }`}
                      />
                    </div>

                    <div className="min-w-0">
                      {job.articleCount && job.articleTitles ? (
                        <>
                          <p className="text-sm font-medium">
                            {job.articleCount} articles generated
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {job.articleTitles.slice(0, 2).join(" · ")}
                            {job.articleCount > 2 ? ` · +${job.articleCount - 2} more` : ""}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm font-medium truncate">
                          {job.articleTitle ?? (isActive ? "Processing video..." : `Job ${job.jobRunId.slice(-8)}`)}
                        </p>
                      )}
                      {job.status === "FAILED" && job.errorMessage && (
                        <p className="text-xs text-destructive truncate mt-0.5">
                          {job.errorMessage}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className={`shrink-0 ml-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}>
                    {config.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
