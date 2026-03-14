import Link from "next/link"
import { Newspaper, Clock, ArrowRight, Sparkles } from "lucide-react"
import { serverApi } from "@/lib/api-server"
import { Badge } from "@/components/ui/badge"
import type { ArticleListItem } from "@news-app/types"

function readTime(contentLength: number): string {
  const mins = Math.ceil(contentLength / 1000)
  return `${mins} min read`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default async function HomePage() {
  let articles: ArticleListItem[] = []

  try {
    articles = await serverApi.get<ArticleListItem[]>("/articles?pageSize=20")
  } catch {
    // Server may be unavailable during build
  }

  const [featured, ...rest] = articles

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/60">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <Newspaper className="size-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">NewsForge</span>
          </div>
          <Link
            href="/login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
          >
            Admin
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Page title */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="size-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-widest">AI-Powered News</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Latest Stories</h1>
        </div>

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="size-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
              <Newspaper className="size-10 text-muted-foreground/40" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No stories yet</h2>
            <p className="text-muted-foreground max-w-xs">
              Stories will appear here once articles are published. Check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured article */}
            {featured && (
              <Link href={`/articles/${featured.slug}`} className="group block">
                <div className="rounded-2xl border border-border/60 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 bg-card">
                  {featured.ogImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featured.ogImage}
                      alt={featured.title}
                      className="w-full h-72 object-cover"
                    />
                  )}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      {featured.category && (
                        <Badge className="bg-primary/10 text-primary border-0 hover:bg-primary/15">
                          {featured.category.name}
                        </Badge>
                      )}
                      {featured.aiGenerated && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Sparkles className="size-3" />
                          AI Generated
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold leading-snug mb-3 group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-3.5" />
                        {featured.contentLength > 0 ? readTime(featured.contentLength) : null}
                      </span>
                      <span className="text-border">·</span>
                      <span>
                        {formatDate(featured.publishedAt ?? featured.createdAt)}
                      </span>
                      <span className="ml-auto flex items-center gap-1 text-primary font-medium text-xs uppercase tracking-wide group-hover:gap-2 transition-all">
                        Read story
                        <ArrowRight className="size-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Article grid */}
            {rest.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((article) => (
                  <Link key={article.id} href={`/articles/${article.slug}`} className="group block">
                    <div className="h-full rounded-xl border border-border/60 overflow-hidden hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-200 bg-card flex flex-col">
                      {article.ogImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={article.ogImage}
                          alt={article.title}
                          className="w-full h-44 object-cover"
                        />
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        {article.category && (
                          <span className="text-xs font-medium text-primary uppercase tracking-wide mb-2">
                            {article.category.name}
                          </span>
                        )}
                        <h2 className="font-semibold leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors flex-1">
                          {article.title}
                        </h2>
                        {article.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {article.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
                          {article.contentLength > 0 && (
                            <>
                              <Clock className="size-3" />
                              <span>{readTime(article.contentLength)}</span>
                              <span className="text-border">·</span>
                            </>
                          )}
                          <span>{formatDate(article.publishedAt ?? article.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-border/60 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Newspaper className="size-4" />
            <span className="font-medium">NewsForge</span>
          </div>
          <span>AI-powered news platform</span>
        </div>
      </footer>
    </div>
  )
}
