"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import NextLink from "next/link"
import { marked } from "marked"
import { toast } from "sonner"
import {
  ArrowLeft,
  Calendar,
  Tag,
  ExternalLink,
  Pencil,
  Eye,
  Save,
  CheckCircle,
  XCircle,
  Loader2,
  Newspaper,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArticleEditor } from "@/components/admin/ArticleEditor"
import { saveArticle, updateArticleStatus } from "./actions"
import type { ArticleDetail } from "@news-app/types"
import { cn } from "@/lib/utils"

interface DraftViewProps {
  article: ArticleDetail
}

export function DraftView({ article }: DraftViewProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Editable fields
  const [title, setTitle] = useState(article.title)
  const [excerpt, setExcerpt] = useState(article.excerpt ?? "")
  const [content, setContent] = useState(article.content)

  const handleSave = (): void => {
    startTransition(async () => {
      const result = await saveArticle(article.id, { title, excerpt, content })
      if (result.success) {
        toast.success("Article saved")
        setIsEditing(false)
        router.refresh()
      } else {
        toast.error(result.error ?? "Failed to save")
      }
    })
  }

  const handleStatus = (status: "APPROVED" | "REJECTED"): void => {
    startTransition(async () => {
      const result = await updateArticleStatus(article.id, status)
      if (result.success) {
        toast.success(`Article ${status.toLowerCase()}`)
        router.push("/admin/articles")
      } else {
        toast.error(result.error ?? "Failed to update")
      }
    })
  }

  const contentHtml = marked.parse(content) as string

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky top bar */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" nativeButton={false} render={<NextLink href="/admin/articles" />}>
              <ArrowLeft className="size-4" />
              Queue
            </Button>
            <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
              <Newspaper className="size-4" />
              <span>Factverse Insights</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={
                article.status === "DRAFT"
                  ? "bg-muted text-muted-foreground"
                  : article.status === "APPROVED"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : article.status === "REJECTED"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
              }
            >
              {article.status}
            </Badge>

            {isEditing ? (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setTitle(article.title)
                    setExcerpt(article.excerpt ?? "")
                    setContent(article.content)
                    setIsEditing(false)
                  }}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} disabled={isPending}>
                  {isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                  <Pencil className="size-4" />
                  Edit
                </Button>
                {article.status !== "APPROVED" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600 hover:text-green-700"
                    onClick={() => handleStatus("APPROVED")}
                    disabled={isPending}
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
                    onClick={() => handleStatus("REJECTED")}
                    disabled={isPending}
                  >
                    <XCircle className="size-4" />
                    Reject
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      {/* Article content */}
      <main className="mx-auto max-w-3xl px-4 py-10">
        {/* Meta pills */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {article.category && <Badge variant="outline">{article.category.name}</Badge>}
          {article.aiGenerated && (
            <Badge variant="secondary" className="text-xs">AI Generated</Badge>
          )}
          {article.aiModel && (
            <span className="text-xs text-muted-foreground rounded-full bg-muted px-2.5 py-0.5">
              {article.aiModel}
            </span>
          )}
        </div>

        {/* Title */}
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-4xl font-extrabold tracking-tight border-none shadow-none px-0 h-auto focus-visible:ring-0 mb-5"
            placeholder="Article title"
          />
        ) : (
          <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight mb-5">{title}</h1>
        )}

        {/* Excerpt */}
        {isEditing ? (
          <Input
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="text-lg text-muted-foreground border-none shadow-none px-0 h-auto focus-visible:ring-0 mb-6"
            placeholder="Article excerpt / summary"
          />
        ) : (
          excerpt && (
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{excerpt}</p>
          )
        )}

        {/* Meta row */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 flex-wrap">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {new Date(article.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {article.sourceUrl && (
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-blue-500 hover:underline"
            >
              <ExternalLink className="size-3.5" />
              Source
            </a>
          )}
        </div>

        <hr className="mb-10" />

        {/* Content: editor or rendered preview */}
        {isEditing ? (
          <ArticleEditor content={content} onChange={setContent} />
        ) : (
          <div
            className={cn(
              "prose prose-lg prose-neutral dark:prose-invert max-w-none",
              "prose-headings:tracking-tight prose-headings:font-bold",
              "prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4",
              "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3",
              "prose-p:leading-[1.8]",
              "prose-li:leading-[1.8]",
              "prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline",
              "prose-blockquote:border-l-primary/30 prose-blockquote:text-muted-foreground",
              "prose-code:bg-muted prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
              "prose-pre:bg-muted prose-pre:rounded-lg",
              "prose-img:rounded-lg prose-img:shadow-md"
            )}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        )}

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex items-center gap-2 mt-12 pt-8 border-t flex-wrap">
            <Tag className="size-4 text-muted-foreground" />
            {article.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
