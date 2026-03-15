import { env } from "../config/env"

interface PexelsPhoto {
  src: {
    large2x: string
    large: string
  }
}

interface PexelsSearchResponse {
  photos: PexelsPhoto[]
  total_results: number
}

/**
 * Fetches a relevant landscape cover image URL from Pexels.
 * Returns null if no API key is configured or the request fails.
 */
async function fetchCoverImage(query: string): Promise<string | null> {
  if (!env.PEXELS_API_KEY) return null

  try {
    const url = new URL("https://api.pexels.com/v1/search")
    url.searchParams.set("query", query)
    url.searchParams.set("per_page", "1")
    url.searchParams.set("orientation", "landscape")

    const res = await fetch(url.toString(), {
      headers: { Authorization: env.PEXELS_API_KEY },
    })

    if (!res.ok) return null

    const data = (await res.json()) as PexelsSearchResponse
    return data.photos[0]?.src.large2x ?? data.photos[0]?.src.large ?? null
  } catch {
    return null
  }
}

export const imageService = { fetchCoverImage }
