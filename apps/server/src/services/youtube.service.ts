import { spawn } from "child_process"
import { readFile, unlink, mkdtemp } from "fs/promises"
import { tmpdir } from "os"
import { join } from "path"

// ─── Video ID extraction ─────────────────────────────────────────────────────

const VIDEO_ID_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

export function extractVideoId(url: string): string | null {
  const match = url.match(VIDEO_ID_REGEX)
  return match?.[1] ?? null
}

// ─── oEmbed metadata (no API key needed) ─────────────────────────────────────

interface VideoMeta {
  title: string
  channelName: string
  duration: number
}

export async function fetchVideoMeta(videoId: string): Promise<VideoMeta> {
  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
  const res = await fetch(oembedUrl)

  if (!res.ok) {
    throw new Error(`Failed to fetch video metadata for ${videoId}: ${res.status}`)
  }

  const data = (await res.json()) as { title: string; author_name: string }

  return {
    title: data.title,
    channelName: data.author_name,
    duration: 0, // estimated from transcript segments
  }
}

// ─── Transcript fetching via yt-dlp ──────────────────────────────────────────

interface TranscriptResult {
  text: string
  estimatedDurationSecs: number
}

/**
 * Run a shell command and return { stdout, stderr, code }.
 */
function run(cmd: string, args: string[]): Promise<{ stdout: string; stderr: string; code: number }> {
  return new Promise((resolve) => {
    const proc = spawn(cmd, args, { stdio: ["ignore", "pipe", "pipe"] })
    let stdout = ""
    let stderr = ""
    proc.stdout.on("data", (d: Buffer) => { stdout += d.toString() })
    proc.stderr.on("data", (d: Buffer) => { stderr += d.toString() })
    proc.on("close", (code) => resolve({ stdout, stderr, code: code ?? 1 }))
    proc.on("error", () => resolve({ stdout, stderr, code: 1 }))
  })
}

/**
 * Fetch transcript for a YouTube video using yt-dlp.
 *
 * yt-dlp handles YouTube's anti-bot measures and reliably fetches
 * auto-generated captions. Requires `python -m yt_dlp` or `yt-dlp` CLI.
 */
export async function fetchTranscript(videoId: string): Promise<TranscriptResult> {
  // Create a temp dir for the subtitle file
  const tempDir = await mkdtemp(join(tmpdir(), "nf-yt-"))
  const outPath = join(tempDir, "sub")

  try {
    // Try `python -m yt_dlp` first (works on Windows without PATH issues),
    // fall back to `yt-dlp` CLI
    let result = await run("python", [
      "-m", "yt_dlp",
      "--write-auto-subs",
      "--sub-lang", "en",
      "--sub-format", "json3",
      "--skip-download",
      "-o", outPath,
      `https://www.youtube.com/watch?v=${videoId}`,
    ])

    if (result.code !== 0) {
      result = await run("yt-dlp", [
        "--write-auto-subs",
        "--sub-lang", "en",
        "--sub-format", "json3",
        "--skip-download",
        "-o", outPath,
        `https://www.youtube.com/watch?v=${videoId}`,
      ])
    }

    if (result.code !== 0) {
      throw new Error(`yt-dlp failed: ${result.stderr.slice(0, 500)}`)
    }

    // yt-dlp writes to <outPath>.en.json3
    const subFile = `${outPath}.en.json3`

    let json: string
    try {
      json = await readFile(subFile, "utf8")
    } catch {
      throw new Error(
        `No English transcript available for video ${videoId}. ` +
        "The video may not have captions enabled."
      )
    }

    const data = JSON.parse(json) as {
      events?: Array<{
        segs?: Array<{ utf8: string }>
        tStartMs?: number
        dDurationMs?: number
      }>
    }

    const events = data.events?.filter((e) => e.segs) ?? []
    if (events.length === 0) {
      throw new Error(`Transcript file is empty for video ${videoId}`)
    }

    const text = events
      .map((e) => e.segs!.map((s) => s.utf8).join(""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim()

    // Estimate duration from last event
    const lastEvent = events[events.length - 1]
    const estimatedDurationSecs = lastEvent?.tStartMs
      ? (lastEvent.tStartMs + (lastEvent.dDurationMs ?? 0)) / 1000
      : 0

    // Clean up
    await unlink(subFile).catch(() => {})

    return { text, estimatedDurationSecs }
  } finally {
    // Clean up temp dir (best-effort)
    await unlink(join(tempDir, "sub")).catch(() => {})
    // rmdir won't fail on non-empty but we've cleaned the main file
  }
}
