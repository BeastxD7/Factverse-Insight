import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Tag, Sparkles, Newspaper } from "lucide-react"
import { marked } from "marked"
import { serverApi } from "@/lib/api-server"
import { Badge } from "@/components/ui/badge"
import type { ArticleDetail } from "@news-app/types"

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let article: ArticleDetail

  try {
    article = await serverApi.get<ArticleDetail>(`/articles/${slug}`)
  } catch {
    notFound()
  }

  const dateStr = article.publishedAt ?? article.createdAt
  const displayDate = new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/60">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back to News
          </Link>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Newspaper className="size-4" />
            <span className="text-sm font-medium">NewsForge</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Category + AI badge */}
        <div className="flex items-center gap-2 mb-5">
          {article.category && (
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {article.category.name}
            </span>
          )}
          {article.category && article.aiGenerated && (
            <span className="text-muted-foreground/40">·</span>
          )}
          {article.aiGenerated && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Sparkles className="size-3" />
              AI Generated
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold leading-tight tracking-tight mb-5">
          {article.title}
        </h1>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            {article.excerpt}
          </p>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-10 pb-8 border-b border-border/60">
          <Calendar className="size-4 shrink-0" />
          <span>{displayDate}</span>
        </div>

        {/* Hero image */}
        {article.ogImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.ogImage}
            alt={article.title}
            className="w-full rounded-xl mb-10 object-cover max-h-120"
          />
        )}

        {/* Article body */}
        <div
          className="prose prose-lg prose-neutral dark:prose-invert max-w-none
            prose-headings:tracking-tight prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:leading-relaxed prose-p:text-foreground/90
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
            prose-strong:text-foreground
            prose-blockquote:border-primary/40 prose-blockquote:text-muted-foreground
            prose-code:bg-muted prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal
            prose-pre:bg-muted prose-pre:border prose-pre:border-border/60"
          dangerouslySetInnerHTML={{ __html: await marked.parse(article.content) }}
        />

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex items-center gap-2 mt-12 pt-8 border-t border-border/60 flex-wrap">
            <Tag className="size-4 text-muted-foreground shrink-0" />
            {article.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary" className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-border/60">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back to all stories
          </Link>
        </div>
      </main>
    </div>
  )
}
