import type { MetadataRoute } from "next"
import { serverApi } from "@/lib/api-server"
import type { ArticleListItem } from "@news-app/types"

const SITE_URL = "https://www.factverseinsight.com"

// Regenerate the sitemap at most once per hour so new articles appear quickly
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = Date.now()
  const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ]

  try {
    const articles = await serverApi.get<ArticleListItem[]>("/articles?pageSize=1000")
    const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => {
      const publishedMs = new Date(article.publishedAt ?? article.createdAt).getTime()
      const isRecent = now - publishedMs < ONE_WEEK_MS
      return {
        url: `${SITE_URL}/articles/${article.slug}`,
        lastModified: new Date(article.publishedAt ?? article.createdAt),
        changeFrequency: isRecent ? "daily" : "weekly",
        priority: article.featured ? 0.9 : isRecent ? 0.8 : 0.6,
      }
    })
    return [...staticRoutes, ...articleRoutes]
  } catch {
    return staticRoutes
  }
}
