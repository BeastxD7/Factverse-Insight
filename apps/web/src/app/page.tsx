import Link from "next/link"
import { ArrowRight, Newspaper } from "lucide-react"
import { serverApi } from "@/lib/api-server"
import { PublicHeader } from "@/components/PublicHeader"
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

function articleImage(id: string, ogImage: string | null, w = 800, h = 500): string {
  return ogImage ?? `https://picsum.photos/seed/${id}/${w}/${h}`
}

function MetaRow({ category, contentLength, dateStr }: {
  category: { name: string } | null
  contentLength: number
  dateStr: string
}) {
  const parts: string[] = []
  if (category) parts.push(category.name)
  if (contentLength > 0) parts.push(readTime(contentLength))
  parts.push(formatDate(dateStr))
  return (
    <p className="text-sm text-neutral-400 dark:text-neutral-500">
      {parts.join("  |  ")}
    </p>
  )
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams

  let allArticles: ArticleListItem[] = []

  try {
    allArticles = await serverApi.get<ArticleListItem[]>("/articles?pageSize=50")
  } catch {
    // Server may be unavailable during build
  }

  // Admin-configured featured article (featured flag), fallback to first
  const featured = allArticles.find((a) => a.featured) ?? allArticles[0]

  // Unique categories for filter tabs
  const categories = Array.from(
    new Map(
      allArticles
        .filter((a) => a.category)
        .map((a) => [a.category!.id, a.category!])
    ).values()
  )

  // Grid: exclude the featured, filter by selected category
  const gridArticles = allArticles
    .filter((a) => a.id !== featured?.id)
    .filter((a) => !category || a.category?.slug === category)

  const sectionLabel = category
    ? (categories.find((c) => c.slug === category)?.name ?? "Articles")
    : "All Articles"

  return (
    <div className="min-h-screen bg-background">

      <PublicHeader activeCategory={category} />

      <main className="max-w-6xl mx-auto px-6">

        {allArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <div className="size-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-5">
              <Newspaper className="size-8 text-neutral-300 dark:text-neutral-600" />
            </div>
            <h2 className="text-lg font-bold mb-1.5">No stories yet</h2>
            <p className="text-neutral-500 max-w-xs text-sm leading-relaxed">
              Stories will appear here once articles are published.
            </p>
          </div>
        ) : (
          <>
            {/* ── Featured article ── */}
            {featured && (
              <section className="py-10 lg:py-14 border-b border-neutral-100 dark:border-neutral-800">
                <Link href={`/articles/${featured.slug}`} className="group block">
                  <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-8 lg:gap-12 items-center">

                    {/* Image */}
                    <div className="rounded-2xl overflow-hidden aspect-4/3 bg-neutral-100 dark:bg-neutral-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={articleImage(featured.id, featured.ogImage, 800, 600)}
                        alt={featured.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    {/* Text */}
                    <div>
                      <MetaRow
                        category={featured.category}
                        contentLength={featured.contentLength}
                        dateStr={featured.publishedAt ?? featured.createdAt}
                      />
                      <h2 className="text-2xl lg:text-3xl font-semibold leading-snug tracking-tight text-neutral-900 dark:text-neutral-50 mt-3 mb-4 group-hover:opacity-70 transition-opacity">
                        {featured.title}
                      </h2>
                      {featured.excerpt && (
                        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-base mb-6 line-clamp-4">
                          {featured.excerpt}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                        Read more
                        <ArrowRight className="size-4" />
                      </span>
                    </div>

                  </div>
                </Link>
              </section>
            )}

            {/* ── Category filter + grid ── */}
            <section className="py-10">

              {/* Section label */}
              <div className="mb-8">
                <h2 className="text-base font-semibold text-foreground">
                  {sectionLabel}
                </h2>
              </div>

              {/* Article grid */}
              {gridArticles.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-neutral-400 text-sm">No articles in this category yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                  {gridArticles.map((article) => (
                    <Link key={article.id} href={`/articles/${article.slug}`} className="group block">
                      <div className="rounded-xl overflow-hidden aspect-[16/10] bg-neutral-100 dark:bg-neutral-800 mb-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={articleImage(article.id, article.ogImage, 600, 375)}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                      <MetaRow
                        category={article.category}
                        contentLength={article.contentLength}
                        dateStr={article.publishedAt ?? article.createdAt}
                      />
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 text-sm leading-snug mt-2 mb-2 line-clamp-2 group-hover:opacity-60 transition-opacity">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-neutral-100 dark:border-neutral-800 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
          <div className="flex flex-col sm:flex-row justify-between gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Factverse Insights" className="size-6 rounded-md" />
                <span className="font-black text-white">Factverse Insights</span>
              </div>
              <p className="text-sm text-neutral-500 max-w-xs leading-relaxed">
                AI-powered news curation. Stay informed, stay ahead.
              </p>
            </div>
            <div className="flex gap-14">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-3">Platform</p>
                <div className="space-y-2">
                  <Link href="/" className="block text-sm text-neutral-400 hover:text-white transition-colors">Stories</Link>
                  <Link href="/login" className="block text-sm text-neutral-400 hover:text-white transition-colors">Admin</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-6 overflow-hidden">
            <p className="text-[4.5rem] sm:text-[7rem] lg:text-[9.5rem] font-black tracking-tighter text-neutral-800 leading-none select-none -mb-3">
              FACTVERSE INSIGHTS
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
