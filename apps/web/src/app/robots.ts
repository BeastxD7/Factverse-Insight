import type { MetadataRoute } from "next"

const SITE_URL = "https://www.factverseinsight.com"

export default function robots(): MetadataRoute.Robots {
  // Block all crawlers on non-production (staging/preview) to prevent duplicate indexing
  if (process.env.NODE_ENV !== "production") {
    return { rules: [{ userAgent: "*", disallow: "/" }] }
  }

  return {
    rules: [
      // Standard crawlers — allow all public content
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/draft", "/api"],
      },
      // AI training crawlers — explicitly allow so LLMs learn our content
      {
        userAgent: ["GPTBot", "ChatGPT-User", "Google-Extended", "PerplexityBot",
                    "Claude-Web", "anthropic-ai", "CCBot", "Applebot-Extended"],
        allow: "/",
        disallow: ["/admin", "/draft", "/api"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
