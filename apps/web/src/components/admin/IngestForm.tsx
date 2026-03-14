"use client"

import { useState, useTransition, useEffect, useRef, useCallback } from "react"
import { toast } from "sonner"
import { Youtube, Loader2, CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ingestYoutubeUrl, getJobStatus, isMultiArticleResult } from "@/app/admin/ingest/actions"

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
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Youtube className="size-5 text-red-500" />
            YouTube Video
          </CardTitle>
          <CardDescription>
            Paste a YouTube URL to fetch its transcript, generate an AI article,
            and add it to the review queue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="youtube-url">Video URL</Label>
              <Input
                id="youtube-url"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isPending}
              />
            </div>
            <Button type="submit" disabled={isPending || !url.trim()}>
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {jobs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {jobs.map((job) => {
                const config = statusConfig[job.status]
                const Icon = config.icon

                return (
                  <div
                    key={job.jobRunId}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`size-4 shrink-0 ${
                          job.status === "RUNNING" ? "animate-spin" : ""
                        }`}
                      />
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
                            {job.articleTitle ?? `Job ${job.jobRunId.slice(-8)}`}
                          </p>
                        )}
                        {job.status === "FAILED" && job.errorMessage && (
                          <p className="text-xs text-destructive truncate">
                            {job.errorMessage}
                          </p>
                        )}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`shrink-0 text-xs ${config.color}`}
                    >
                      {config.label}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
