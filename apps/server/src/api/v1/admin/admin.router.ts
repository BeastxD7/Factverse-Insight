import { Router } from "express"
import { requireAdmin } from "../../../middleware/require-admin"
import { adminController } from "./admin.controller"
import { aiConfigController } from "./ai-config.controller"
import { ingestController } from "./ingest.controller"
import { upload, uploadController } from "./upload.controller"
import { validate } from "../../../middleware/validate"
import { z } from "zod"

const router = Router()

// All admin routes require admin auth
router.use(requireAdmin)

// Stats
router.get("/stats", adminController.getStats)

// Articles queue
const articleQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(20),
  status: z.enum(["DRAFT", "REVIEW", "APPROVED", "REJECTED", "ARCHIVED"]).optional(),
})
router.get("/articles", validate(articleQuerySchema, "query"), adminController.listArticles)
router.get("/articles/:id", adminController.getArticle)
router.get("/articles/by-slug/:slug", adminController.getArticleBySlug)

// Jobs
const jobQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(20),
  type: z.string().optional(),
  status: z.string().optional(),
})
router.get("/jobs", validate(jobQuerySchema, "query"), adminController.listJobs)
router.get("/jobs/:id", adminController.getJob)
router.delete("/jobs/:id", adminController.cancelJob)

// AI config
const aiConfigSchema = z.object({
  provider: z.enum(["AZURE_OPENAI", "GROQ", "OPENROUTER"]).optional(),
  model: z.string().min(1).optional(),
  temperature: z.coerce.number().min(0).max(2).optional(),
  maxTokens: z.coerce.number().int().min(256).max(32000).optional(),
  baseUrl: z.string().url().optional().nullable(),
})
router.get("/ai-config", aiConfigController.get)
router.patch("/ai-config", validate(aiConfigSchema), aiConfigController.update)

// Manual ingest
const youtubeIngestSchema = z.object({
  url: z.string().url("Must be a valid URL"),
  topicId: z.string().optional(),
})
router.post("/ingest/youtube", validate(youtubeIngestSchema), ingestController.youtubeUrl)
router.get("/ingest/jobs/:id", ingestController.jobStatus)

// File upload
router.post("/upload", upload.single("image"), uploadController.uploadImage)

export { router as adminRouter }
