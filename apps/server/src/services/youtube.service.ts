import { spawn } from "child_process"
import { readFile, readdir, rm, mkdtemp } from "fs/promises"
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

// ─── Transcript fetching via yt-dlp ──────────────────────────────────────────

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

/** Find the first .json3 subtitle file yt-dlp wrote in a directory. */
async function findJson3File(dir: string): Promise<string | null> {
  try {
    const files = await readdir(dir)
    const match = files.find((f) => f.endsWith(".json3"))
    return match ? join(dir, match) : null
  } catch {
    return null
  }
}

/** Extract lang code from yt-dlp filename: "sub.en.json3" → "en" */
function langFromFilename(filePath: string): string {
  const name = (filePath.split(/[/\\]/).pop() ?? "").replace(/\.json3$/, "")
  const parts = name.split(".")
  return parts.length >= 2 ? (parts[parts.length - 1] ?? "unknown") : "unknown"
}

async function parseJson3(filePath: string): Promise<{ text: string; estimatedDurationSecs: number }> {
  const raw = await readFile(filePath, "utf8")
  const data = JSON.parse(raw) as {
    events?: Array<{
      segs?: Array<{ utf8: string }>
      tStartMs?: number
      dDurationMs?: number
    }>
  }

  const events = data.events?.filter((e) => e.segs) ?? []
  if (events.length === 0) {
    throw new Error("Subtitle file contains no text events")
  }

  const text = events
    .map((e) => e.segs!.map((s) => s.utf8).join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()

  const lastEvent = events[events.length - 1]
  const estimatedDurationSecs = lastEvent?.tStartMs
    ? (lastEvent.tStartMs + (lastEvent.dDurationMs ?? 0)) / 1000
    : 0

  return { text, estimatedDurationSecs }
}

/**
 * Run yt-dlp (tries `python -m yt_dlp` first, falls back to `yt-dlp` CLI).
 * Returns stderr for logging — does NOT throw on non-zero exit because yt-dlp
 * sometimes exits 1 even when it successfully writes a subtitle file
 * (e.g. the "No JS runtime" warning causes a non-zero exit in some versions).
 */
async function runYtDlp(args: string[]): Promise<string> {
  let r = await run("python", ["-m", "yt_dlp", ...args])
  if (r.code !== 0) {
    r = await run("yt-dlp", args)
  }
  return r.stderr
}

/**
 * Fetch transcript for a YouTube video using yt-dlp.
 *
 * Strategy:
 * 1. Try English captions (manual + auto-generated): --sub-lang en,en.*
 * 2. If no English file written, fetch all available languages: --all-subs
 * 3. Parse whatever .json3 file yt-dlp wrote; detect language from filename
 *
 * Non-zero exit from yt-dlp is tolerated — the "No JS runtime" warning causes
 * exit code 1 in some yt-dlp versions even when subtitle data is available.
 * We detect success by checking whether a .json3 file was actually written.
 */
export async function fetchTranscript(videoId: string): Promise<TranscriptResult> {
  const tempDir = await mkdtemp(join(tmpdir(), "nf-yt-"))
  const outStem = join(tempDir, "sub")
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`

  function buildArgs(extraFlags: string[]): string[] {
    return [
      "--write-auto-subs",
      "--write-subs",       // also fetch manually uploaded captions
      "--sub-format", "json3",
      "--skip-download",
      ...extraFlags,
      "-o", outStem,
      videoUrl,
    ]
  }

  try {
    // ── Attempt 1: English captions ─────────────────────────────────────────
    let stderr = await runYtDlp(buildArgs(["--sub-lang", "en,en.*"]))
    let subFile = await findJson3File(tempDir)

    if (!subFile) {
      console.log(`[youtube] No English captions for ${videoId}, trying all languages...`)
      if (stderr) console.log(`[youtube] yt-dlp stderr: ${stderr.slice(0, 400)}`)

      // ── Attempt 2: Any language auto-captions ──────────────────────────────
      stderr = await runYtDlp(buildArgs(["--all-subs"]))
      subFile = await findJson3File(tempDir)

      if (!subFile) {
        console.log(`[youtube] yt-dlp stderr (all-subs): ${stderr.slice(0, 400)}`)
        throw new Error(
          `No transcript available for video ${videoId}. ` +
          "The video may not have captions enabled."
        )
      }
    }

    const language = langFromFilename(subFile)
    const { text, estimatedDurationSecs } = await parseJson3(subFile)

    if (!language.startsWith("en")) {
      console.log(
        `[youtube] No English captions for ${videoId}. ` +
        `Using "${language}" — AI will write article in English.`
      )
    }

    return { text, estimatedDurationSecs, language }
  } finally {
    await rm(tempDir, { recursive: true, force: true }).catch(() => {})
  }
}
