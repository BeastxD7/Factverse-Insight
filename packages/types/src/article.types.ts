export type ArticleStatus = "DRAFT" | "REVIEW" | "APPROVED" | "REJECTED" | "ARCHIVED"
export type SourceType =
  | "NEWS_API"
  | "GNEWS"
  | "RSS_FEED"
  | "GOOGLE_TRENDS"
  | "YOUTUBE_VIDEO"
  | "YOUTUBE_CHANNEL"
  | "PODCAST_UPLOAD"

export interface ArticleListItem {
  id: string
  title: string
  slug: string
  excerpt: string | null
  ogImage: string | null
  status: ArticleStatus
  publishedAt: string | null
  viewCount: number
  featured: boolean
  sourceType: SourceType | null
  aiGenerated: boolean
  contentLength: number
  category: { id: string; name: string; slug: string } | null
  tags: Array<{ id: string; name: string; slug: string }>
  createdAt: string
}

export interface ArticleDetail extends ArticleListItem {
  content: string
  metaTitle: string | null
  metaDescription: string | null
  keywords: string[]
  aiModel: string | null
  aiPromptVersion: string | null
  sourceUrl: string | null
  updatedAt: string
}

export interface CreateArticleDto {
  title: string
  slug: string
  excerpt?: string
  content: string
  metaTitle?: string
  metaDescription?: string
  ogImage?: string
  keywords?: string[]
  categoryId?: string
  tagIds?: string[]
  status?: ArticleStatus
}

export interface UpdateArticleDto {
  title?: string
  excerpt?: string
  content?: string
  metaTitle?: string
  metaDescription?: string
  ogImage?: string
  keywords?: string[]
  categoryId?: string
  tagIds?: string[]
  status?: ArticleStatus
  featured?: boolean
}

export interface ArticleGenerationResult {
  title: string
  slug: string
  excerpt: string
  content: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  suggestedCategory: string
  suggestedTags: string[]
  aiModel: string
  aiPromptVersion: string
}
