import { cache } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Clock, Tag, ExternalLink, Calendar, Hash } from "lucide-react"
import { renderMarkdown } from "@/lib/markdown"
import { serverApi } from "@/lib/api-server"
import { Badge } from "@/components/ui/badge"
import { PublicHeader } from "@/components/PublicHeader"
import type { ArticleDetail } from "@news-app/types"
import { ShareButton } from "@/components/ShareButton"

const SITE_URL = "https://www.factverseinsight.com"

// React cache deduplicates this call between generateMetadata and the page component
const getArticle = cache(async (slug: string): Promise<ArticleDetail | null> => {
  try {
    return await serverApi.get<ArticleDetail>(`/articles/${slug}`)
  } catch {
    return null
  }
})

function readTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const mins = Math.max(1, Math.ceil(words / 200))
  return `${mins} min read`
}

function articleHeroImage(id: string, ogImage: string | null): string {
  return ogImage ?? `https://picsum.photos/seed/${id}/1400/700`
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return { title: "Article Not Found" }
  }

  const title = article.metaTitle ?? article.title
  const description = article.metaDescription ?? article.excerpt ?? undefined
  const url = `${SITE_URL}/articles/${article.slug}`
  const image = article.ogImage ?? `${SITE_URL}/logo.png`

  return {
    title,
    description,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      publishedTime: article.publishedAt ?? article.createdAt,
      modifiedTime: article.updatedAt,
      authors: ["Factverse Insights"],
      ...(article.category && { section: article.category.name }),
      tags: article.tags.map((t) => t.name),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) notFound()

  const dateStr = article.publishedAt ?? article.createdAt
  const displayDate = new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const isYouTube = article.sourceType === "YOUTUBE_VIDEO" || article.sourceType === "YOUTUBE_CHANNEL"

  const articleUrl = `${SITE_URL}/articles/${article.slug}`
  const heroImage = articleHeroImage(article.id, article.ogImage)

  // JSON-LD structured data
  const wordCount = article.content.trim().split(/\s+/).length
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt ?? undefined,
    abstract: article.excerpt ?? undefined,
    image: heroImage,
    datePublished: article.publishedAt ?? article.createdAt,
    dateModified: article.updatedAt,
    wordCount,
    author: {
      "@type": "Organization",
      name: "Factverse Insights",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Factverse Insights",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    ...(article.keywords.length > 0 && { keywords: article.keywords.join(", ") }),
    ...(article.category && { articleSection: article.category.name }),
    ...(article.tags.length > 0 && {
      about: article.tags.map((t) => ({ "@type": "Thing", name: t.name })),
    }),
    ...(article.sourceUrl && {
      isBasedOn: { "@type": "WebPage", url: article.sourceUrl },
    }),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...(article.category
        ? [{ "@type": "ListItem", position: 2, name: article.category.name, item: SITE_URL }]
        : []),
      {
        "@type": "ListItem",
        position: article.category ? 3 : 2,
        name: article.title,
        item: articleUrl,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PublicHeader />

      <main className="max-w-6xl mx-auto px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-14">

          {/* ── Main article column ── */}
          <article>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-neutral-400 dark:text-neutral-500 mb-6 flex-wrap">
              <Link href="/" className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                Home
              </Link>
              <span>•</span>
              <Link href="/" className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                Our Blogs
              </Link>
              {article.category && (
                <>
                  <span>•</span>
                  <span className="text-neutral-600 dark:text-neutral-400 font-medium">{article.category.name}</span>
                </>
              )}
            </nav>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-semibold leading-[1.15] tracking-tight text-neutral-900 dark:text-neutral-50 mb-5">
              {article.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center justify-between gap-y-3 mb-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              {/* Publisher */}
              <span className="flex items-center gap-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Factverse Insights" className="size-5 rounded" />
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">Factverse Insights</span>
              </span>

              {article.category && (
                <>
                  <span className="text-neutral-200 dark:text-neutral-700">|</span>
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">{article.category.name}</span>
                </>
              )}

              <span className="text-neutral-200 dark:text-neutral-700">|</span>

              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {readTime(article.content)}
              </span>

              <span className="text-neutral-200 dark:text-neutral-700">|</span>

              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {displayDate}
              </span>

            </div>
            <ShareButton title={article.title} url={articleUrl} excerpt={article.excerpt} />
            </div>

            {/* Hero image */}
            <div className="rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={article.title}
                className="w-full object-cover max-h-120"
                style={{ aspectRatio: "2/1" }}
              />
            </div>

            {/* Excerpt as lead paragraph */}
            {article.excerpt && (
              <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8 font-medium">
                {article.excerpt}
              </p>
            )}

            {/* Article body */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-neutral-900 dark:prose-headings:text-neutral-50
                prose-h1:text-2xl prose-h1:mt-10 prose-h1:mb-4
                prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
                prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
                prose-p:leading-relaxed prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-p:text-base
                prose-a:text-primary prose-a:no-underline prose-a:font-semibold hover:prose-a:underline
                prose-strong:text-neutral-900 dark:prose-strong:text-neutral-50 prose-strong:font-bold
                prose-blockquote:border-l-2 prose-blockquote:border-neutral-300 dark:prose-blockquote:border-neutral-600 prose-blockquote:text-neutral-500 dark:prose-blockquote:text-neutral-400 prose-blockquote:not-italic prose-blockquote:pl-5
                prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-neutral-950 prose-pre:text-neutral-100 prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-xl"
              dangerouslySetInnerHTML={{ __html: await renderMarkdown(article.content) }}
            />

            {/* Back link + share */}
            <div className="mt-14 pt-8 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors font-medium"
              >
                Back to all stories
              </Link>
              <ShareButton title={article.title} url={articleUrl} excerpt={article.excerpt} />
            </div>
          </article>

          {/* ── Sticky sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-4">

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="rounded-2xl border border-neutral-100 dark:border-neutral-800 p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 flex items-center gap-1.5">
                    <Tag className="size-3.5" />
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <Badge key={tag.id} variant="secondary" className="text-xs rounded-full font-medium">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Source */}
              {article.sourceUrl && (
                <div className="rounded-2xl border border-neutral-100 dark:border-neutral-800 p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
                    {isYouTube ? "Watch Video" : "Source"}
                  </p>
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-semibold"
                  >
                    <ExternalLink className="size-3.5 shrink-0" />
                    {isYouTube ? "Open on YouTube" : "View source"}
                  </a>
                </div>
              )}

              {/* About */}
              <div className="rounded-2xl border border-neutral-100 dark:border-neutral-800 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
                  About
                </p>
                <div className="space-y-3">
                  {article.category && (
                    <div className="flex items-center gap-2 text-sm">
                      <Hash className="size-3.5 text-neutral-400 shrink-0" />
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">{article.category.name}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                    <Calendar className="size-3.5 shrink-0" />
                    <span>{displayDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                    <Clock className="size-3.5 shrink-0" />
                    <span>{readTime(article.content)}</span>
                  </div>
                  {article.sourceType && (
                    <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                      <span className="text-xs text-neutral-400 uppercase tracking-wide font-medium">
                        {article.sourceType.replace(/_/g, " ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </aside>

        </div>
      </main>

    </div>
  )
}
