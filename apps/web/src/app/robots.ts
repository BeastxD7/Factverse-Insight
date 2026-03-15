import type { MetadataRoute } from "next"

const SITE_URL = "https://www.factverseinsights.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/draft", "/api"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
