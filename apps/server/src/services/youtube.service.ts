import { spawn } from "child_process"
import { writeFile, rm, mkdtemp } from "fs/promises"
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
    duration: 0,
  }
}

// ─── Transcript fetching ──────────────────────────────────────────────────────

interface TranscriptResult {
  text: string
  estimatedDurationSecs: number
  language: string
}

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

// Python script that uses youtube-transcript-api (no JS runtime required).
// Tries English first, falls back to any available language.
const TRANSCRIPT_SCRIPT = String.raw`
import sys, json
from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound, TranscriptsDisabled

video_id = sys.argv[1]

try:
    api = YouTubeTranscriptApi()
    tl  = api.list(video_id)

    # Priority: manual English > auto English > any language
    transcript = None
    for lang in ["en", "en-US", "en-GB", "en-orig"]:
        try:
            transcript = tl.find_transcript([lang])
            break
        except NoTranscriptFound:
            pass

    if transcript is None:
        # Fall back to first available language
        for t in tl:
            transcript = t
            break

    if transcript is None:
        print(json.dumps({"error": "no transcripts available"}))
        sys.exit(1)

    segments = transcript.fetch()
    text     = " ".join(s.text for s in segments)
    duration = max((s.start + s.duration for s in segments), default=0)

    print(json.dumps({
        "text":     text,
        "duration": duration,
        "language": transcript.language_code,
    }))

except TranscriptsDisabled:
    print(json.dumps({"error": "captions disabled for this video"}))
    sys.exit(1)
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
`

/**
 * Fetch transcript using youtube-transcript-api (Python).
 * No yt-dlp / JS runtime required — calls YouTube's transcript API directly.
 * Returns null if the package is not installed so the caller can fall back.
 */
async function fetchViaTranscriptApi(
  videoId: string,
  scriptPath: string
): Promise<TranscriptResult | null> {
  const r = await run("python", [scriptPath, videoId])

  if (r.code !== 0 || !r.stdout.trim()) {
    return null
  }

  let parsed: { text?: string; duration?: number; language?: string; error?: string }
  try {
    parsed = JSON.parse(r.stdout.trim()) as typeof parsed
  } catch {
    return null
  }

  if (parsed.error || !parsed.text) {
    console.log(`[youtube] transcript-api: ${parsed.error ?? "empty transcript"}`)
    return null
  }

  return {
    text: parsed.text,
    estimatedDurationSecs: parsed.duration ?? 0,
    language: parsed.language ?? "unknown",
  }
}

/**
 * Fetch transcript via yt-dlp (fallback).
 * Handles the "No JS runtime" warning by checking for written files
 * rather than relying on exit codes.
 */
async function fetchViaYtDlp(videoId: string): Promise<TranscriptResult | null> {
  const { readdir, readFile } = await import("fs/promises")
  const tempDir = await mkdtemp(join(tmpdir(), "nf-yt-"))
  const outStem = join(tempDir, "sub")
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`

  function buildArgs(extraFlags: string[]): string[] {
    return [
      "--write-auto-subs",
      "--write-subs",
      "--sub-format", "json3",
      "--skip-download",
      ...extraFlags,
      "-o", outStem,
      videoUrl,
    ]
  }

  async function runYtDlp(flags: string[]): Promise<void> {
    const args = buildArgs(flags)
    let r = await run("python", ["-m", "yt_dlp", ...args])
    if (r.code !== 0) await run("yt-dlp", args)
  }

  async function findJson3(): Promise<string | null> {
    try {
      const files = await readdir(tempDir)
      const f = files.find((x) => x.endsWith(".json3"))
      return f ? join(tempDir, f) : null
    } catch { return null }
  }

  try {
    await runYtDlp(["--sub-lang", "en,en.*"])
    let subFile = await findJson3()

    if (!subFile) {
      await runYtDlp(["--all-subs"])
      subFile = await findJson3()
    }

    if (!subFile) return null

    const langMatch = subFile.replace(/\.json3$/, "").split(".")
    const language = langMatch[langMatch.length - 1] ?? "unknown"

    const raw = await readFile(subFile, "utf8")
    const data = JSON.parse(raw) as {
      events?: Array<{ segs?: Array<{ utf8: string }>; tStartMs?: number; dDurationMs?: number }>
    }

    const events = data.events?.filter((e) => e.segs) ?? []
    if (events.length === 0) return null

    const text = events.map((e) => e.segs!.map((s) => s.utf8).join("")).join(" ").replace(/\s+/g, " ").trim()
    const lastEvent = events[events.length - 1]
    const estimatedDurationSecs = lastEvent?.tStartMs
      ? (lastEvent.tStartMs + (lastEvent.dDurationMs ?? 0)) / 1000 : 0

    return { text, estimatedDurationSecs, language }
  } catch {
    return null
  } finally {
    await rm(tempDir, { recursive: true, force: true }).catch(() => {})
  }
}

/**
 * Fetch transcript for a YouTube video.
 *
 * Primary:  youtube-transcript-api (Python pkg) — no JS runtime needed
 * Fallback: yt-dlp — broader format support
 */
export async function fetchTranscript(videoId: string): Promise<TranscriptResult> {
  const tempDir = await mkdtemp(join(tmpdir(), "nf-yts-"))
  const scriptPath = join(tempDir, "fetch_transcript.py")

  try {
    await writeFile(scriptPath, TRANSCRIPT_SCRIPT, "utf8")

    // Primary: youtube-transcript-api
    const result = await fetchViaTranscriptApi(videoId, scriptPath)
    if (result) {
      if (!result.language.startsWith("en")) {
        console.log(
          `[youtube] No English captions for ${videoId}. ` +
          `Using "${result.language}" — AI will write article in English.`
        )
      }
      return result
    }

    console.log(`[youtube] transcript-api failed for ${videoId}, trying yt-dlp...`)

    // Fallback: yt-dlp
    const ytdlpResult = await fetchViaYtDlp(videoId)
    if (ytdlpResult) {
      if (!ytdlpResult.language.startsWith("en")) {
        console.log(
          `[youtube] No English captions for ${videoId}. ` +
          `Using "${ytdlpResult.language}" via yt-dlp — AI will write article in English.`
        )
      }
      return ytdlpResult
    }

    throw new Error(
      `No transcript available for video ${videoId}. ` +
      "The video may not have captions enabled."
    )
  } finally {
    await rm(tempDir, { recursive: true, force: true }).catch(() => {})
  }
}
