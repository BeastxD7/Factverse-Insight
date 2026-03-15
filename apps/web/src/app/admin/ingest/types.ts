export interface SingleArticleResult {
  articleTitle: string
  articleSlug: string
}

export interface MultiArticleResult {
  articleCount: number
  articles: Array<{ title: string; slug: string }>
}

export type JobResult = SingleArticleResult | MultiArticleResult | null | undefined

export function isMultiArticleResult(result: JobResult): result is MultiArticleResult {
  return result != null && "articleCount" in result
}
