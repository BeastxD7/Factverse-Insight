import type { Request, Response } from "express"
import multer from "multer"
import { randomUUID } from "crypto"
import { join, extname } from "path"
import { mkdirSync } from "fs"
import { env } from "../../../config/env"
import { ValidationError } from "../../../lib/errors"
import { apiSuccess } from "../../../lib/response"

const UPLOAD_DIR = join(process.cwd(), "uploads")

// Ensure uploads directory exists
mkdirSync(UPLOAD_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = extname(file.originalname).toLowerCase()
    cb(null, `${randomUUID()}${ext}`)
  },
})

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"]
    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new ValidationError("Only JPEG, PNG, GIF, WebP, and SVG images are allowed") as unknown as null, false)
    }
  },
})

export const uploadController = {
  async uploadImage(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new ValidationError("No file provided")
    }

    const baseUrl = `http://localhost:${env.PORT}`
    const url = `${baseUrl}/uploads/${req.file.filename}`

    apiSuccess(res, { url, filename: req.file.filename }, "File uploaded")
  },
}
