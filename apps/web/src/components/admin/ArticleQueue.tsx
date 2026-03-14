"use client"

import { useTransition } from "react"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "sonner"
import { CheckCircle, XCircle, Clock, Eye, BookOpen } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateArticleStatus } from "@/app/admin/articles/actions"
import type { ArticleListItem, ArticleStatus } from "@news-app/types"

const statusColors: Record<ArticleStatus, string> = {
  DRAFT:    "bg-muted text-muted-foreground",
  REVIEW:   "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  APPROVED: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  REJECTED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  ARCHIVED: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
}

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Article Queue</h1>
        <Select
          value={currentStatus}
          onValueChange={(val) => { if (val) router.push(`${pathname}?status=${val}`) }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="REVIEW">Review</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <Clock className="mx-auto mb-3 size-10 text-muted-foreground" />
          <p className="text-muted-foreground">No articles in this queue</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Length</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="max-w-xs">
                    <p className="truncate font-medium">{article.title}</p>
                    {article.aiGenerated && (
                      <span className="text-xs text-muted-foreground">AI generated</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {article.category ? (
                      <Badge variant="outline">{article.category.name}</Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {article.sourceType?.replace(/_/g, " ") ?? "Manual"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {article.contentLength > 0 ? (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <BookOpen className="size-3 shrink-0" />
                        <span>{Math.ceil(article.contentLength / 1000)} min</span>
                        <span className="text-muted-foreground/50">·</span>
                        <span>{(article.contentLength / 1000).toFixed(1)}k</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[article.status]}`}>
                      {article.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      {article.status !== "APPROVED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => handleStatusChange(article.id, "APPROVED")}
                        >
                          <CheckCircle className="size-4" />
                          Approve
                        </Button>
                      )}
                      {article.status !== "REJECTED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleStatusChange(article.id, "REJECTED")}
                        >
                          <XCircle className="size-4" />
                          Reject
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        nativeButton={false}
                        render={<a href={`/draft/${article.slug}`} />}
                      >
                        <Eye className="size-4" />
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
