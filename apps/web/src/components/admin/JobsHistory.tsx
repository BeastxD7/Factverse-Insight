"use client"

import { useState, useTransition, useEffect, useRef } from "react"
import { CheckCircle, XCircle, Clock, Loader2, ChevronLeft, ChevronRight, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getYoutubeJobs, bulkDeleteJobs, type JobStatus, type JobsPage } from "@/app/admin/ingest/actions"
import { isMultiArticleResult } from "@/app/admin/ingest/types"

const STATUS_FILTERS = ["ALL", "PENDING", "RUNNING", "COMPLETED", "FAILED"] as const
type StatusFilter = (typeof STATUS_FILTERS)[number]

const statusConfig = {
  PENDING:   { icon: Clock,        label: "Queued",     cls: "bg-muted text-muted-foreground" },
  RUNNING:   { icon: Loader2,      label: "Processing", cls: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  COMPLETED: { icon: CheckCircle,  label: "Completed",  cls: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  FAILED:    { icon: XCircle,      label: "Failed",     cls: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
  CANCELLED: { icon: XCircle,      label: "Cancelled",  cls: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
}

function jobSummary(job: JobStatus): { title: string; sub?: string } {
  const result = job.result
  if (isMultiArticleResult(result)) {
    return {
      title: `${result.articleCount} articles generated`,
      sub: result.articles.map((a) => a.title).slice(0, 2).join(" · ") +
        (result.articleCount > 2 ? ` · +${result.articleCount - 2} more` : ""),
    }
  }
  if (result?.articleTitle) return { title: result.articleTitle }
  const payload = job.payload as { videoId?: string } | undefined
  const isActive = job.status === "PENDING" || job.status === "RUNNING"
  return {
    title: isActive ? "Processing video…" : `Job ${job.id.slice(-8)}`,
    sub: payload?.videoId,
  }
}

export function JobsHistory({ initialPage }: { initialPage: JobsPage }) {
  const [page, setPage]              = useState(initialPage)
  const [filter, setFilter]          = useState<StatusFilter>("ALL")
  const [isPending, startTransition] = useTransition()
  const [isDeleting, setIsDeleting]  = useState(false)

  function load(nextPage: number, nextFilter: StatusFilter): void {
    startTransition(async () => {
      const result = await getYoutubeJobs(nextPage, nextFilter)
      setPage(result)
      setFilter(nextFilter)
    })
  }

  async function handleBulkDelete(): Promise<void> {
    if (!confirm("Delete all queued and failed jobs?")) return
    setIsDeleting(true)
    await bulkDeleteJobs()
    const result = await getYoutubeJobs(1, filter)
    setPage(result)
    setIsDeleting(false)
  }

  // Auto-poll every 3s when there are active jobs
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const pageRef = useRef(page)
  const filterRef = useRef(filter)
  pageRef.current = page
  filterRef.current = filter

  useEffect(() => {
    const hasActive = page.items.some(
      (j) => j.status === "PENDING" || j.status === "RUNNING"
    )

    if (hasActive && !pollingRef.current) {
      pollingRef.current = setInterval(() => {
        startTransition(async () => {
          const result = await getYoutubeJobs(pageRef.current.page, filterRef.current)
          setPage(result)
        })
      }, 3000)
    }

    if (!hasActive && pollingRef.current) {
      clearInterval(pollingRef.current)
      pollingRef.current = null
    }

    return () => {
      if (pollingRef.current) { clearInterval(pollingRef.current); pollingRef.current = null }
    }
  }, [page.items])

  return (
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-border/60 bg-muted/20 flex items-center justify-between gap-3 flex-wrap">
        <h3 className="text-sm font-semibold shrink-0">Job History</h3>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Status filter tabs */}
          <div className="flex gap-1 flex-wrap">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                disabled={isPending}
                onClick={() => load(1, s)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  filter === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleBulkDelete}
            disabled={isDeleting || isPending}
            className="h-7 px-2.5 text-xs text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/10"
          >
            {isDeleting ? (
              <Loader2 className="size-3 animate-spin mr-1" />
            ) : (
              <Trash2 className="size-3 mr-1" />
            )}
            Clear failed &amp; queued
          </Button>
        </div>
      </div>

      {/* Job rows */}
      {isPending ? (
        <div className="flex items-center justify-center py-10 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
        </div>
      ) : page.items.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-10">No jobs found.</p>
      ) : (
        <div className="divide-y divide-border/60">
          {page.items.map((job) => {
            const cfg   = statusConfig[job.status] ?? statusConfig.CANCELLED
            const Icon  = cfg.icon
            const spinning = job.status === "RUNNING"
            const { title, sub } = jobSummary(job)

            return (
              <div
                key={job.id}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`size-7 rounded-full flex items-center justify-center shrink-0 ${
                    job.status === "COMPLETED" ? "bg-emerald-50 dark:bg-emerald-900/20" :
                    job.status === "FAILED"    ? "bg-red-50 dark:bg-red-900/20" :
                    job.status === "RUNNING"   ? "bg-blue-50 dark:bg-blue-900/20" : "bg-muted"
                  }`}>
                    <Icon className={`size-3.5 ${spinning ? "animate-spin" : ""} ${
                      job.status === "COMPLETED" ? "text-emerald-500" :
                      job.status === "FAILED"    ? "text-red-500" :
                      job.status === "RUNNING"   ? "text-blue-500" : "text-muted-foreground"
                    }`} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{title}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {sub && <span className="font-mono mr-1">{sub}</span>}
                      {new Date(job.createdAt).toLocaleString()}
                    </p>
                    {job.status === "FAILED" && job.errorMessage && (
                      <p className="text-xs text-destructive truncate mt-0.5">{job.errorMessage}</p>
                    )}
                  </div>
                </div>

                <span className={`shrink-0 ml-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.cls}`}>
                  {cfg.label}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {page.totalPages > 1 && (
        <div className="px-5 py-3 border-t border-border/60 bg-muted/20 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Page {page.page} of {page.totalPages} · {page.total} jobs
          </p>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={page.page <= 1 || isPending}
              onClick={() => load(page.page - 1, filter)}
              className="h-7 w-7 p-0"
            >
              <ChevronLeft className="size-3.5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page.page >= page.totalPages || isPending}
              onClick={() => load(page.page + 1, filter)}
              className="h-7 w-7 p-0"
            >
              <ChevronRight className="size-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
