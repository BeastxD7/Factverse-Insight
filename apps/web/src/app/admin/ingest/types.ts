export type SingleArticleResult = {
  articleId: string
  articleTitle: string
  articleSlug: string
}

export type MultiArticleResult = {
  articleCount: number
  articles: Array<{ id: string; title: string; slug: string }>
  splitReason: string
}

export type JobResult = SingleArticleResult | MultiArticleResult | null

export function isMultiArticleResult(r: JobResult): r is MultiArticleResult {
  return r != null && "articleCount" in r
}
