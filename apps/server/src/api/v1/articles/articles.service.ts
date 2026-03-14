import { prisma } from "../../../lib/prisma"
import { NotFoundError } from "../../../lib/errors"
import type { UpdateArticleDto } from "@news-app/types"

export const articlesService = {
  async list(params: {
    page: number
    pageSize: number
    category?: string
    tag?: string
    q?: string
    status?: string
  }) {
    const { page, pageSize, category, tag, q, status = "APPROVED" } = params
    const skip = (page - 1) * pageSize

    const where = {
      status: status as "APPROVED",
      ...(category && { category: { slug: category } }),
      ...(tag && { tags: { some: { tag: { slug: tag } } } }),
      ...(q && {
        OR: [
          { title: { contains: q, mode: "insensitive" as const } },
          { excerpt: { contains: q, mode: "insensitive" as const } },
          { keywords: { has: q } },
        ],
      }),
    }

    const [data, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { publishedAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          ogImage: true,
          status: true,
          publishedAt: true,
          viewCount: true,
          featured: true,
          sourceType: true,
          aiGenerated: true,
          createdAt: true,
          category: { select: { id: true, name: true, slug: true } },
          tags: { select: { tag: { select: { id: true, name: true, slug: true } } } },
        },
      }),
      prisma.article.count({ where }),
    ])

    return {
      data: data.map((a) => ({ ...a, tags: a.tags.map((t) => t.tag) })),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    }
  },

  async findBySlug(slug: string) {
    const article = await prisma.article.findUnique({
      where: { slug, status: "APPROVED" },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        tags: { select: { tag: { select: { id: true, name: true, slug: true } } } },
      },
    })

    if (!article) throw new NotFoundError("Article not found")

    // Increment view count (fire and forget)
    prisma.article.update({
      where: { id: article.id },
      data: { viewCount: { increment: 1 } },
    }).catch(() => {})

    return { ...article, tags: article.tags.map((t) => t.tag) }
  },

  async findById(id: string) {
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        tags: { select: { tag: { select: { id: true, name: true, slug: true } } } },
      },
    })

    if (!article) throw new NotFoundError("Article not found")

    return { ...article, tags: article.tags.map((t) => t.tag) }
  },

  async findBySlugAdmin(slug: string) {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        tags: { select: { tag: { select: { id: true, name: true, slug: true } } } },
      },
    })

    if (!article) throw new NotFoundError("Article not found")

    return { ...article, tags: article.tags.map((t) => t.tag) }
  },

  async update(id: string, data: UpdateArticleDto) {
    const article = await prisma.article.findUnique({ where: { id } })
    if (!article) throw new NotFoundError("Article not found")

    const { tagIds, ...rest } = data

    return prisma.article.update({
      where: { id },
      data: {
        ...rest,
        ...(data.status === "APPROVED" && !article.publishedAt
          ? { publishedAt: new Date() }
          : {}),
        ...(tagIds !== undefined && {
          tags: {
            deleteMany: {},
            create: tagIds.map((tagId) => ({ tagId })),
          },
        }),
      },
    })
  },

  async remove(id: string) {
    const article = await prisma.article.findUnique({ where: { id } })
    if (!article) throw new NotFoundError("Article not found")
    return prisma.article.delete({ where: { id } })
  },

  async listAdmin(params: { page: number; pageSize: number; status?: string }) {
    const { page, pageSize, status } = params
    const skip = (page - 1) * pageSize

    const where = status ? { status: status as "DRAFT" } : {}

    const [data, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          ogImage: true,
          status: true,
          publishedAt: true,
          viewCount: true,
          featured: true,
          sourceType: true,
          aiGenerated: true,
          createdAt: true,
          content: true,
          category: { select: { id: true, name: true, slug: true } },
          tags: { select: { tag: { select: { id: true, name: true, slug: true } } } },
        },
      }),
      prisma.article.count({ where }),
    ])

    return {
      data: data.map(({ content, tags, ...a }) => ({
        ...a,
        tags: tags.map((t) => t.tag),
        contentLength: content?.length ?? 0,
      })),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    }
  },
}
