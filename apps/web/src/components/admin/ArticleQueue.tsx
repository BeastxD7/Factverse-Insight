"use client"

import { useTransition } from "react"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "sonner"
import { CheckCircle, XCircle, Clock, Eye, BookOpen, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { updateArticleStatus } from "@/app/admin/articles/actions"
import type { ArticleListItem, ArticleStatus } from "@news-app/types"
import { cn } from "@/lib/utils"

const statusConfig: Record<ArticleStatus, { label: string; className: string }> = {
  DRAFT:    { label: "Draft",    className: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
  REVIEW:   { label: "Review",   className: "bg-amber-50 text-amber-700 dark:bg-amber-900/25 dark:text-amber-400" },
  APPROVED: { label: "Approved", className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/25 dark:text-emerald-400" },
  REJECTED: { label: "Rejected", className: "bg-red-50 text-red-700 dark:bg-red-900/25 dark:text-red-400" },
  ARCHIVED: { label: "Archived", className: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500" },
}

const filterTabs: { value: ArticleStatus; label: string }[] = [
  { value: "DRAFT",    label: "Drafts" },
  { value: "REVIEW",   label: "Review" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
]

interface ArticleQueueProps {
  articles: ArticleListItem[]
  currentStatus: string
}

export function ArticleQueue({ articles, currentStatus }: ArticleQueueProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()

  const handleStatusChange = (id: string, newStatus: "APPROVED" | "REJECTED" | "REVIEW" | "DRAFT") => {
    startTransition(async () => {
      const result = await updateArticleStatus(id, newStatus)
      if (result.success) {
        toast.success(`Article ${newStatus.toLowerCase()}`)
      } else {
        toast.error(result.error ?? "Something went wrong")
      }
    })
  }

  return (
    <div className="space-y-5">
      {/* Header + filter tabs */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Article Queue</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{articles.length} article{articles.length !== 1 ? "s" : ""} in this queue</p>
        </div>

        {/* Tab-style filter */}
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => router.push(`${pathname}?status=${tab.value}`)}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                currentStatus === tab.value
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/60 bg-muted/20 p-16 text-center">
          <div className="size-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Clock className="size-6 text-muted-foreground/50" />
          </div>
          <p className="font-medium text-muted-foreground">No articles here</p>
          <p className="text-sm text-muted-foreground/70 mt-1">Nothing in the {currentStatus.toLowerCase()} queue</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border/60 overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="font-semibold text-xs uppercase tracking-wide text-muted-foreground pl-4">Title</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Category</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Source</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Length</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Status</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Created</TableHead>
                <TableHead className="text-right pr-4 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="max-w-xs pl-4 py-3">
                    <p className="truncate font-medium text-sm">{article.title}</p>
                    {article.aiGenerated && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Sparkles className="size-3" />
                        AI generated
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="py-3">
                    {article.category ? (
                      <Badge variant="outline" className="text-xs font-medium">{article.category.name}</Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground/50">—</span>
                    )}
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-xs text-muted-foreground">
                      {article.sourceType?.replace(/_/g, " ") ?? "Manual"}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    {article.contentLength > 0 ? (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <BookOpen className="size-3 shrink-0" />
                        <span>{Math.ceil(article.contentLength / 1000)} min</span>
                        <span className="text-border">·</span>
                        <span>{(article.contentLength / 1000).toFixed(1)}k</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground/50">—</span>
                    )}
                  </TableCell>
                  <TableCell className="py-3">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      statusConfig[article.status].className
                    )}>
                      {statusConfig[article.status].label}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 text-xs text-muted-foreground">
                    {new Date(article.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </TableCell>
                  <TableCell className="py-3 pr-4">
                    <div className="flex justify-end gap-1.5">
                      {article.status !== "APPROVED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2.5 text-xs text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 dark:border-emerald-900 dark:text-emerald-500 dark:hover:bg-emerald-900/20"
                          onClick={() => handleStatusChange(article.id, "APPROVED")}
                        >
                          <CheckCircle className="size-3.5" />
                          Approve
                        </Button>
                      )}
                      {article.status !== "REJECTED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2.5 text-xs text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:text-red-500 dark:hover:bg-red-900/20"
                          onClick={() => handleStatusChange(article.id, "REJECTED")}
                        >
                          <XCircle className="size-3.5" />
                          Reject
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                        nativeButton={false}
                        render={<a href={`/draft/${article.slug}`} />}
                      >
                        <Eye className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
