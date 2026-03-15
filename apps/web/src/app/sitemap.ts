import type { MetadataRoute } from "next"
import { serverApi } from "@/lib/api-server"
import type { ArticleListItem } from "@news-app/types"

const SITE_URL = "https://www.factverseinsight.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: new Date(article.publishedAt ?? article.createdAt),
      changeFrequency: "weekly",
      priority: article.featured ? 0.9 : 0.7,
    }))
    return [...staticRoutes, ...articleRoutes]
  } catch {
    return staticRoutes
  }
}
