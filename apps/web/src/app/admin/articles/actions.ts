"use server"

import { revalidatePath } from "next/cache"
import { serverApi } from "@/lib/api-server"
import type { ArticleListItem } from "@news-app/types"

export async function updateArticleStatus(
  id: string,
  status: "APPROVED" | "REJECTED" | "DRAFT" | "REVIEW"
): Promise<{ success: boolean; error?: string }> {
  try {
    await serverApi.patch<ArticleListItem>(`/articles/${id}`, { status })
    revalidatePath("/admin/articles")
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to update" }
  }
}

export async function toggleArticleFeatured(
  id: string,
  featured: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    await serverApi.patch<ArticleListItem>(`/articles/${id}`, { featured })
    revalidatePath("/admin/articles")
    revalidatePath("/")
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to update" }
  }
}
