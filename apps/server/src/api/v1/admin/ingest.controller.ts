import type { Request, Response } from "express"
import { prisma } from "../../../lib/prisma"
import { youtubeProcessQueue } from "../../../workers/queues"
import { extractVideoId } from "../../../services/youtube.service"
import { ValidationError, NotFoundError } from "../../../lib/errors"
import { apiCreated, apiSuccess } from "../../../lib/response"

export const ingestController = {
  async youtubeUrl(req: Request, res: Response): Promise<void> {
    const { url, topicId } = req.body as { url: string; topicId?: string }

    const videoId = extractVideoId(url)
    if (!videoId) {
      throw new ValidationError("Invalid YouTube URL. Provide a valid youtube.com or youtu.be link.")
    }

    // Create a JobRun record
    const jobRun = await prisma.jobRun.create({
      data: {
        type: "YOUTUBE_PROCESS",
        status: "PENDING",
        payload: { videoId, videoUrl: url, topicId },
      },
    })

    // Enqueue the BullMQ job
    const bullJob = await youtubeProcessQueue.add("process-video", {
      videoId,
      videoUrl: url,
      topicId,
    })

    // Store the BullMQ job ID back on the JobRun for cancellation support
    await prisma.jobRun.update({
      where: { id: jobRun.id },
      data: { bullJobId: bullJob.id },
    })

    apiCreated(res, {
      jobRunId: jobRun.id,
      videoId,
      status: "PENDING",
    }, "YouTube video queued for processing")
  },

  async jobStatus(req: Request, res: Response): Promise<void> {
    const id = String(req.params.id)
    const job = await prisma.jobRun.findUnique({
      where: { id },
      select: {
        id: true,
        type: true,
        status: true,
        errorMessage: true,
        result: true,
        createdAt: true,
        completedAt: true,
      },
    })
    if (!job) throw new NotFoundError("Job not found")
    apiSuccess(res, job)
  },
}
