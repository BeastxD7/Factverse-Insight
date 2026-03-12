import type { Request, Response } from "express"
import { prisma } from "../../../lib/prisma"
import { articlesService } from "../articles/articles.service"
import { NotFoundError } from "../../../lib/errors"
import { allQueues } from "../../../workers/queues"
import { apiSuccess, apiNoContent, apiPaginated } from "../../../lib/response"

export const adminController = {
  async getStats(_req: Request, res: Response): Promise<void> {
    const [draftCount, reviewCount, approvedCount, rejectedCount, totalArticles] =
      await Promise.all([
        prisma.article.count({ where: { status: "DRAFT" } }),
        prisma.article.count({ where: { status: "REVIEW" } }),
        prisma.article.count({ where: { status: "APPROVED" } }),
        prisma.article.count({ where: { status: "REJECTED" } }),
        prisma.article.count(),
      ])

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [pendingJobs, runningJobs, failedJobs, completedToday, totalSources, enabledSources, totalChannels, enabledChannels] =
      await Promise.all([
        prisma.jobRun.count({ where: { status: "PENDING" } }),
        prisma.jobRun.count({ where: { status: "RUNNING" } }),
        prisma.jobRun.count({ where: { status: "FAILED" } }),
        prisma.jobRun.count({ where: { status: "COMPLETED", completedAt: { gte: today } } }),
        prisma.contentSource.count(),
        prisma.contentSource.count({ where: { enabled: true } }),
        prisma.youtubeChannel.count(),
        prisma.youtubeChannel.count({ where: { enabled: true } }),
      ])

    apiSuccess(res, {
      articles: {
        draft: draftCount,
        review: reviewCount,
        approved: approvedCount,
        rejected: rejectedCount,
        total: totalArticles,
      },
      jobs: { pending: pendingJobs, running: runningJobs, failed: failedJobs, completedToday },
      sources: { total: totalSources, enabled: enabledSources },
      channels: { total: totalChannels, enabled: enabledChannels },
    })
  },

  async listArticles(req: Request, res: Response): Promise<void> {
    const result = await articlesService.listAdmin(req.query as never)
    apiPaginated(res, result)
  },

  async getArticle(req: Request, res: Response): Promise<void> {
    const id = String(req.params.id)
    const article = await articlesService.findById(id)
    apiSuccess(res, article)
  },

  async getArticleBySlug(req: Request, res: Response): Promise<void> {
    const slug = String(req.params.slug)
    const article = await articlesService.findBySlugAdmin(slug)
    apiSuccess(res, article)
  },

  async listJobs(req: Request, res: Response): Promise<void> {
    const { page = 1, pageSize = 20, type, status } = req.query as Record<string, string>
    const skip = (Number(page) - 1) * Number(pageSize)

    const where = {
      ...(type && { type: type as "NEWS_FETCH" }),
      ...(status && { status: status as "PENDING" }),
    }

    const [data, total] = await Promise.all([
      prisma.jobRun.findMany({
        where,
        skip,
        take: Number(pageSize),
        orderBy: { createdAt: "desc" },
        include: {
          source: { select: { id: true, name: true, type: true } },
          channel: { select: { id: true, channelName: true } },
          _count: { select: { articles: true } },
        },
      }),
      prisma.jobRun.count({ where }),
    ])

    apiPaginated(res, {
      data,
      total,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: Math.ceil(total / Number(pageSize)),
    })
  },

  async getJob(req: Request, res: Response): Promise<void> {
    const id = String(req.params.id)
    const job = await prisma.jobRun.findUnique({
      where: { id },
      include: {
        source: true,
        channel: true,
        articles: { select: { id: true, title: true, slug: true, status: true } },
      },
    })
    if (!job) throw new NotFoundError("Job not found")
    apiSuccess(res, job)
  },

  async cancelJob(req: Request, res: Response): Promise<void> {
    const id = String(req.params.id)
    const job = await prisma.jobRun.findUnique({ where: { id } })
    if (!job) throw new NotFoundError("Job not found")

    if (job.bullJobId) {
      for (const queue of allQueues) {
        const bullJob = await queue.getJob(job.bullJobId)
        if (bullJob) { await bullJob.remove(); break }
      }
    }

    await prisma.jobRun.update({ where: { id }, data: { status: "CANCELLED" } })
    apiNoContent(res)
  },
}
