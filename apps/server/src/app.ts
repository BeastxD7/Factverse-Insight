import express from "express"
import cors from "cors"
import { join } from "path"
import { v1Router } from "./api/v1/router"
import { errorHandler } from "./middleware/error-handler"

export function createApp() {
  const app = express()

  // Middleware
  const allowedOrigins = [
    "http://localhost:3000",
    "https://factverseinsight.com",
    "https://www.factverseinsight.com",
    ...(process.env.NEXTAUTH_URL ? [process.env.NEXTAUTH_URL] : []),
  ]
  app.use(cors({ origin: allowedOrigins }))
  app.use(express.json({ limit: "10mb" }))
  app.use(express.urlencoded({ extended: true }))

  // Serve uploaded images
  app.use("/uploads", express.static(join(process.cwd(), "uploads")))

  // Routes
  app.use("/api/v1", v1Router)

  // 404 handler
  app.use((_req, res) => {
    res.status(404).json({ error: "NOT_FOUND", message: "Route not found", statusCode: 404 })
  })

  // Global error handler (must be last)
  app.use(errorHandler)

  return app
}
