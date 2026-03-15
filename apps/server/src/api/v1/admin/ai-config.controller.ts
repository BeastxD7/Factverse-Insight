import type { Request, Response } from "express"
import { prisma } from "../../../lib/prisma"
import { NotFoundError } from "../../../lib/errors"
import { apiSuccess } from "../../../lib/response"

export const aiConfigController = {
  async get(_req: Request, res: Response): Promise<void> {
    const config = await prisma.aiConfig.findFirst({ where: { isActive: true } })
    if (!config) throw new NotFoundError("No active AI config found")
    apiSuccess(res, config)
  },

  async update(req: Request, res: Response): Promise<void> {
    const { provider, model, temperature, maxTokens, baseUrl, splitThreshold } = req.body

    // Ensure a config record exists — upsert on the first (and only) active one
    const existing = await prisma.aiConfig.findFirst({ where: { isActive: true } })

    const config = existing
      ? await prisma.aiConfig.update({
          where: { id: existing.id },
          data: { provider, model, temperature, maxTokens, baseUrl, splitThreshold },
        })
      : await prisma.aiConfig.create({
          data: { provider, model, temperature, maxTokens, baseUrl, splitThreshold, isActive: true },
        })

    apiSuccess(res, config, "AI configuration updated")
  },
}
