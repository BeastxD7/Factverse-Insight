import "./config/env" // Validate env vars first
import { createApp } from "./app"
import { env } from "./config/env"
import { startYoutubeProcessWorker } from "./workers/youtube-process.worker"

const app = createApp()

app.listen(env.PORT, () => {
  console.log(`[Server] Running on http://localhost:${env.PORT}`)
  console.log(`[Server] Environment: ${env.NODE_ENV}`)
  console.log(`[Server] Health: http://localhost:${env.PORT}/api/v1/health`)

  // Start background workers
  startYoutubeProcessWorker()
})

