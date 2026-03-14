# Smart Split for YouTube Videos

## What Is This?

Imagine a 3-hour podcast covering a Russian spy's entire life — KGB recruitment, living undercover in America, the FBI confrontation, defecting, life after espionage, and views on geopolitics today.

You don't want one massive 10,000-word article. You want 5–6 focused articles, each covering one topic in depth. More targeted articles = better SEO, better reader engagement, cleaner content structure.

Smart Split does this **automatically**. No configuration needed.

---

## When Does Smart Split Activate?

```typescript
const MIN_CHARS_FOR_SPLIT    = 80000   // ~16,000 words
const MIN_DURATION_FOR_SPLIT = 90 * 60 // 90 minutes
```

If either condition is met, the full 3-phase pipeline runs. Otherwise, one article is generated directly.

---

## How It Works — The 3-Phase Pipeline

### Phase 1 — Read 100% of the Transcript

The transcript is split into **24,000-char chunks**. Every chunk is individually sent to the AI, which returns a summary, topic name, key concepts, and entities.

```
Video: 144,535 chars → 7 chunks (24,000 chars each)

Chunk 0  [0       → 24000]: AI reads → "KGB Recruitment and Background"
Chunk 1  [24000   → 48000]: AI reads → "Spy Training and Deployment"
Chunk 2  [48000   → 72000]: AI reads → "Undercover Life in America"
Chunk 3  [72000   → 96000]: AI reads → "Family Life and Double Identity"
Chunk 4  [96000   → 120000]: AI reads → "FBI Discovery and Defection"
Chunk 5  [120000  → 144000]: AI reads → "Post-Spy Reinvention"
Chunk 6  [144000  → 144535]: AI reads → "Putin, Trump, and Geopolitics"
```

All 7 chunks are processed in **parallel batches of 5** — fast and rate-limit safe.

**Why this matters:** The old approach only read the first 6,000 chars of the transcript — about 4% of a 3-hour video. Now 100% is read.

---

### Phase 2 — AI Decides How Many Articles (Content-Driven)

The AI receives all 7 chunk summaries at once and decides how to group them into segments. **There is no fixed segment count** — the AI creates as many or as few articles as the content genuinely warrants:

- If the video covers 8 distinct major topics → 8 articles
- If the video is one deep continuous topic → 1 long article
- Never artificially merges or splits topics

Example output for the spy podcast:
```json
{
  "shouldSplit": true,
  "reason": "Five clearly distinct topics across the 197-minute conversation",
  "segments": [
    { "title": "KGB Recruitment and Spy Training",      "chunkStart": 0, "chunkEnd": 1 },
    { "title": "Living a Double Life in America",       "chunkStart": 2, "chunkEnd": 3 },
    { "title": "FBI Discovery and Defection",           "chunkStart": 4, "chunkEnd": 4 },
    { "title": "Life After the KGB: Reinvention",       "chunkStart": 5, "chunkEnd": 5 },
    { "title": "Putin, Trump, and Russian Intelligence","chunkStart": 6, "chunkEnd": 6 }
  ]
}
```

Segment boundaries are derived as **exact char positions** from the chunk map — no percentage guessing.

---

### Phase 3 — Write Each Article from Full Transcript Text

For each segment, the full raw text of every chunk in that segment is assembled (up to 80,000 chars) and sent to the AI for article writing.

The AI is instructed to write as a **journalist covering the video** — not as someone analysing a transcript:
- Never says "the transcript shows..." or "according to the transcription..."
- References the video naturally: "In this episode, Jack Barsky revealed..."
- Includes one markdown link to the YouTube source URL
- Minimum **1,500 words** per article
- Output token limit: **12,000** (ensures full articles are never truncated)

---

## Real Example: 3hr 17min Podcast

```
Input:  1 YouTube video (144,535 chars, 197 minutes)
Output: 5 DRAFT articles

Article 1: "KGB Recruitment and Spy Training"
  - Written from 48,000 chars of actual transcript (chunks 0–1)
  - 1,800 words covering recruitment, assessment, training, deployment

Article 2: "Living a Double Life in America"
  - Written from 48,000 chars (chunks 2–3)
  - 2,100 words covering career, family, psychological burden

Article 3: "FBI Discovery and Defection"
  - Written from 24,000 chars (chunk 4)
  - 1,600 words covering the investigation, confrontation, decision

Article 4: "Life After the KGB: Reinvention"
  - Written from 24,000 chars (chunk 5)
  - 1,500 words covering genuine American life, family, speaking career

Article 5: "Putin, Trump, and Russian Intelligence Today"
  - Written from 535 chars → 24,000 chars (chunk 6)
  - 1,700 words of expert geopolitical analysis
```

---

## Short Videos

Below the thresholds, no splitting happens. One article is generated from the first 40,000 chars of the transcript.

```
Video: 8 minutes, 4,500 chars
→ Smart split skipped
→ 1 article generated
```

---

## Benefits

**Content quality:**
- Every insight from the video is covered — nothing is lost in the middle
- Each article is focused, deep, and self-contained
- Articles read like journalism, not document summaries

**SEO:**
- More pages indexed → more search traffic
- Tighter keyword targeting per article
- Better click-through rates with specific, descriptive titles

**Admin workflow:**
- The article queue shows each article's character count and read time
- Each article can be reviewed and approved independently

---

## Constants (in `ai.service.ts`)

```typescript
const CHUNK_SIZE             = 24000   // chars per chunk
const CHUNK_BATCH_SIZE       = 5       // parallel AI calls per batch
const MAX_SEGMENT_INPUT      = 80000   // max raw transcript chars per article gen
const MIN_CHARS_FOR_SPLIT    = 80000   // transcript length threshold
const MIN_DURATION_FOR_SPLIT = 90 * 60 // duration threshold (seconds)
```

---

## Fallback: Single Unified Topic

If the AI determines the entire video is one unified topic (e.g., a 2-hour deep-dive on exactly one subject), it returns `shouldSplit: false`. The code converts this into a single segment and still runs it through the full content-map pipeline — so even a single-article result from a long video uses the full 80,000-char input, not the 40,000-char fallback.

---

## Technical Flow

```
YouTube URL submitted
       ↓
Fetch video metadata + transcript
       ↓
Transcript ≥ 80k chars OR Duration ≥ 90 min?
       ↓ Yes                        ↓ No
Smart Split Pipeline           Generate 1 article
       ↓                        (first 40k chars)
Phase 1: 24k-char chunks →
  AI reads 100% of transcript →
  contentMap: ChunkMeta[]
       ↓
Phase 2: Full content map →
  AI decides segment count by topic →
  N segments with exact char positions
       ↓
Phase 3: For each segment →
  Full raw text (up to 80k chars) →
  AI writes 1500+ word journalist article
       ↓
All articles saved as DRAFT
       ↓
Admin reviews in queue
  (article list shows read time + char count)
```

> For the full technical deep dive, see `how-ai-analyzes-transcripts.md`.
