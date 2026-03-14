# How AI Analyzes and Splits Transcripts — The Complete Process

## The Core Principle: 100% Coverage

**Every single character of the transcript is read by the AI.** No sampling from start/end. No guessing. No blind spots.

This is achieved through a three-phase pipeline:

1. **Chunk Analysis** — the full transcript is broken into 24,000-char chunks and every chunk is individually analyzed
2. **Content Map Segmentation** — AI sees summaries of all chunks and decides segment groupings based purely on topic content — no fixed count imposed
3. **Article Generation** — articles are written from the **full raw text** of every chunk in a segment (not summaries, not proportional slices — the actual words)

---

## When Does Smart Split Activate?

```typescript
const MIN_CHARS_FOR_SPLIT    = 80000      // ~16k words
const MIN_DURATION_FOR_SPLIT = 90 * 60   // 90 minutes
```

If either threshold is met, the full 3-phase pipeline runs. Otherwise, a single article is generated directly from the first 40,000 chars of the transcript.

---

## Phase 1 — Chunk Analysis (100% Coverage Guaranteed)

The transcript is divided into 24,000-character chunks. Every chunk is sent to the AI individually.

```
Transcript: 144,535 chars  →  7 chunks  (144535 ÷ 24000 = 6.02, rounds up to 7)

Chunk 0  [0       → 24000]:  AI analyzes → ChunkMeta
Chunk 1  [24000   → 48000]:  AI analyzes → ChunkMeta
Chunk 2  [48000   → 72000]:  AI analyzes → ChunkMeta
Chunk 3  [72000   → 96000]:  AI analyzes → ChunkMeta
Chunk 4  [96000   → 120000]: AI analyzes → ChunkMeta
Chunk 5  [120000  → 144000]: AI analyzes → ChunkMeta
Chunk 6  [144000  → 144535]: AI analyzes → ChunkMeta  (last 535 chars)

All 7 chunks processed in parallel batches of 5
```

### What Each Chunk Returns (`ChunkMeta`)

```typescript
interface ChunkMeta {
  chunkIndex: number      // 0-based position in sequence
  startPos:   number      // exact char start in full transcript
  endPos:     number      // exact char end in full transcript
  charCount:  number      // chars in this chunk
  topicName:  string      // e.g. "KGB Recruitment and Early Training"
  summary:    string      // 2-3 sentences of what is actually said
  concepts:   string[]    // key themes — ["espionage", "Cold War", "identity"]
  entities:   string[]    // people/places/orgs — ["Jack Barsky", "KGB", "New York"]
}
```

### The Chunk Analysis Prompt

```
You are extracting metadata from a section of a video transcript.

SECTION 3 of 7 | chars 48000–72000

TRANSCRIPT:
[full 24,000 chars of actual transcript text]

Return ONLY a JSON object:
{
  "topicName": "2-5 word topic name for this section",
  "summary": "2-3 sentences describing exactly what is discussed here",
  "concepts": ["theme1", "theme2", "theme3"],
  "entities": ["person/place/org/product mentioned"]
}
```

The AI reads and understands the full text of every chunk — nothing is omitted.

### Parallel Batching

Chunks are processed in batches of 5 in parallel to stay rate-limit friendly:

```
Batch 1: chunks 0-4 → 5 parallel AI calls → wait for all → push results
Batch 2: chunks 5-6 → 2 parallel AI calls → wait for all → push results
```

---

## Phase 2 — Content Map Segmentation (Topic-Driven, No Fixed Count)

After all chunks are analyzed, a complete indexed content map is assembled and sent to the AI for a single segmentation decision.

```
Chunk 0  [0–24000]:      KGB Recruitment and Background
  Jack Barsky describes growing up in East Germany and how the KGB identified
  him. He explains the initial assessment and why he agreed to work for them...
  Concepts: Cold War, espionage, KGB, recruitment
  Entities: Jack Barsky, KGB, East Germany, Stasi

Chunk 1  [24000–48000]:  Spy Training and Deployment to the US
  Barsky undergoes language training, cover identity creation, tradecraft.
  He describes his deployment to the United States under the name William Barsky...
  Concepts: spy training, identity, tradecraft, covert operations
  Entities: Jack Barsky, KGB, New York, William Barsky

Chunk 2  [48000–72000]:  Life Undercover in America
  Living as an American, building a career as an IT professional, starting a family.
  The psychological toll of maintaining a double life for years...
  Concepts: double life, identity, family, deception
  Entities: Jack Barsky, wife, daughter, New York

...

Chunk 6  [144000–144535]: Views on Geopolitics and Putin vs Trump
  Barsky shares his perspective on the US-Russia relationship, what the West
  misunderstands about Russian psychology, and his assessment of both leaders...
  Concepts: geopolitics, Putin, Trump, Russia, intelligence
  Entities: Jack Barsky, Putin, Trump, Russia, NATO
```

### The Segmentation Prompt — Fully Dynamic

The AI is NOT told "create 2-5 segments." It is told to let the topics decide:

```
Your job: create exactly as many segments as the content naturally warrants.
Let the TOPICS decide — not a target number.

SPLITTING RULES:
- Every genuinely distinct major topic = its own segment/article
  → If 8 different subjects are discussed, create 8 segments
  → If 10 different stories are told, create 10 segments
- One topic explored deeply throughout = fewer, longer articles
  → If it's all one continuous story with phases, keep it 1-2 segments
- NEVER merge two clearly different topics just to keep count low
- NEVER split a single continuous discussion just to create more articles
- Each segment needs at least 2 chunks so there's enough for a 1500+ word article
- Every chunk must belong to exactly one segment — no gaps, no overlap
```

### Example AI Output for the Jack Barsky Podcast (7 chunks → 5 segments)

```json
{
  "shouldSplit": true,
  "reason": "Five distinct major topics: spy recruitment/training, undercover life in America, FBI confrontation and defection, post-spy life and identity, and current geopolitical views",
  "segments": [
    {
      "title": "KGB Recruitment and Spy Training",
      "chunkStart": 0,
      "chunkEnd": 1,
      "summary": "How Barsky was recruited by the KGB and trained for deployment to the US",
      "keyTopics": ["KGB recruitment", "Cold War espionage", "spy training", "cover identity"]
    },
    {
      "title": "Living a Double Life in America",
      "chunkStart": 2,
      "chunkEnd": 3,
      "summary": "Years undercover as an American IT professional while secretly working for the KGB",
      "keyTopics": ["double life", "cover identity", "family", "psychological cost"]
    },
    {
      "title": "FBI Discovery and Defection",
      "chunkStart": 4,
      "chunkEnd": 4,
      "summary": "How the FBI found Barsky, the confrontation, and his decision to cooperate",
      "keyTopics": ["FBI", "defection", "arrest", "cooperation"]
    },
    {
      "title": "Life After the KGB: Reinvention",
      "chunkStart": 5,
      "chunkEnd": 5,
      "summary": "Building a genuine American life after defection, family reconciliation, and public speaking",
      "keyTopics": ["reinvention", "identity", "family", "memoir"]
    },
    {
      "title": "Putin, Trump, and Russian Intelligence Today",
      "chunkStart": 6,
      "chunkEnd": 6,
      "summary": "Barsky's expert perspective on current US-Russia relations and what the West misses",
      "keyTopics": ["Putin", "Trump", "Russia", "geopolitics", "intelligence"]
    }
  ]
}
```

### Special Case: Single Unified Topic

If the AI returns `shouldSplit: false` (entire video is one continuous unified topic), the code wraps the full transcript into one segment and routes it through `generateArticleFromSegment` with the full contentMap. This means even a "single article" result from a long video still uses the complete 80,000-char input path — not the simpler 40k fallback.

### Converting Chunk Indices to Character Positions

```
Segment 1: chunkStart=0, chunkEnd=1
  → startPosition = contentMap[0].startPos = 0
  → endPosition   = contentMap[1].endPos   = 48,000

Segment 2: chunkStart=2, chunkEnd=3
  → startPosition = contentMap[2].startPos = 48,000
  → endPosition   = contentMap[3].endPos   = 96,000
```

No percentage guessing. Exact char boundaries from the content map.

---

## Phase 3 — Article Generation with Full Raw Transcript Text

For each segment, the article generator receives the **complete verbatim text** of every chunk in that segment — the actual words spoken in the video, not summaries.

```typescript
const MAX_SEGMENT_INPUT = 80000  // max chars sent per article generation call
```

### How Full-Text Segment Assembly Works

```
Segment 2: chunks 2–3  (2 × 24,000 = 48,000 chars of actual transcript)
MAX_SEGMENT_INPUT = 80,000 → entire segment fits, no trimming needed

Output fed to AI article generator:

[Part 1 — Life Undercover in America]
"...so I built this cover story piece by piece. I got a social security
 number, got a driver's license, started working at a tech company in New
 Jersey. My colleagues had no idea. My neighbours had no idea. Even my wife
 didn't know for years. The psychological weight of it was enormous. You
 can't let your guard down for a single moment. I remember one time at a
 company dinner, a colleague made a joke about the Soviet Union. Everyone
 looked at me for a reaction..."
[full 24,000 chars of chunk 2]

---

[Part 2 — Discovery and FBI Confrontation]
"...the FBI had been watching me for a while before they approached. They
 came to my house one morning in 1997. I was completely calm on the outside
 but inside I was calculating — do I run? Do I deny everything? By then I
 had a daughter. That changed everything for me. I looked at the agent and
 said 'I think we need to have a conversation'..."
[full 24,000 chars of chunk 3]
```

Every word from the segment reaches the AI. The article is written from real content — not reconstructed from metadata.

### If a Segment Has Many Chunks

If the total raw text of all chunks in a segment exceeds `MAX_SEGMENT_INPUT` (80,000 chars), the combined text is trimmed to that limit. Even then, 80,000 chars is 10× more than the old 8,000-char approach.

---

## Article Writing — Journalist Voice (No Transcript References)

A critical prompt constraint prevents the AI from exposing the implementation detail of how content was sourced.

### Writing Rules Enforced in Every Article Prompt

```
WRITING RULES — STRICTLY FOLLOW:
- Write as a journalist covering this video/podcast, NOT as someone analysing a transcript
- NEVER mention "transcript", "transcription", "the text", or "according to the text"
- Reference the video naturally:
    "In this episode, Jack Barsky explained..."
    "During the interview, he revealed..."
    "Speaking on Raj Shamani, [name] shared..."
- You MAY link to the video once using markdown: [Video Title](youtube_url)
- Use direct quotes from what was said naturally:
    He said, "I was recruited by the KGB at age 25"
- The article should be a complete TL;DW (Too Long; Didn't Watch) — all value, no filler
```

### Before vs After

Without these rules (old):
> ❌ *"The transcript highlights a key observation: Barsky was recruited..."*
> ❌ *"According to the transcription, he stated that..."*

With these rules (current):
> ✅ *"In this episode of Raj Shamani, former KGB spy Jack Barsky revealed..."*
> ✅ *"During the conversation, Barsky described the moment FBI agents arrived at his door..."*

The result reads like a news article or blog post covering the video. Readers get full value without watching. The YouTube URL is linked once for attribution.

---

## How Related Sub-Topics Are Handled

```
Chunk 0: topicName = "KGB Recruitment and Background"
         summary   = "Barsky describes being identified by the KGB in the 1970s,
                      the assessment process, and why he agreed to work for them..."

Chunk 1: topicName = "Spy Training and Deployment"
         summary   = "Barsky undergoes language and tradecraft training, creates
                      his cover identity, and is deployed to the US..."
```

The segmentation AI sees both summaries together and reasons:
- Both chunks are about the same arc: becoming a KGB operative
- `entities` overlap: same person, same mission timeline
- The story flows naturally from "recruited" → "trained and deployed"

**Result: chunks 0 and 1 are grouped into ONE segment** → one article covering the full recruitment and deployment story.

---

## Full Flow for a 3-Hour, 17-Minute Video (Real Example)

```
Video: "Ex-Russian Spy on Putin vs Trump" — 144,535 chars, 197 minutes
           │
           ▼
  Eligibility: 144535 > 80000 ✓  AND  197 min > 90 min ✓
           │
           ▼
  Phase 1: 7 chunks (24,000 chars each, last = 535 chars)
  ├─ Batch 1: chunks 0-4 → 5 parallel AI calls
  └─ Batch 2: chunks 5-6 → 2 parallel AI calls
           │
           ▼
  contentMap: 7 × ChunkMeta  (100% of 144,535 chars understood)
           │
           ▼
  Phase 2: Full content map → AI segmentation
    AI identifies: 5 genuinely distinct topics
    → 5 segments with exact char boundaries
           │
           ▼
  Phase 3: For each of 5 segments:
    - Collect full raw text of chunks in segment
    - Concatenate up to 80,000 chars of verbatim transcript
    - AI writes 1500+ word journalist-style article
    - Article saved to DB as DRAFT
           │
           ▼
  Result: 5 DRAFT articles, each written from full verbatim video content,
          each reading like a journalist covered the podcast
```

---

## AI Call Count for a 144,535-char Video (7 Chunks, 5 Segments)

| Step | AI Calls | Purpose |
|---|---|---|
| Phase 1 — chunk analysis | 7 (2 batches) | 100% transcript coverage |
| Phase 2 — segmentation | 1 | Dynamic topic-driven grouping |
| Phase 3 — article generation | 5 (one per segment) | Full-text journalist articles |
| **Total** | **13** | |

Old approach for the same video: 1 call, seeing only the first 6,000 chars.

---

## Constants (in `ai.service.ts`)

```typescript
const CHUNK_SIZE             = 24000   // chars per chunk (o3-mini: 200k tokens ≈ 800k chars)
const CHUNK_BATCH_SIZE       = 5       // parallel AI calls per batch
const MAX_SEGMENT_INPUT      = 80000   // max raw transcript chars per article gen call
const MIN_CHARS_FOR_SPLIT    = 80000   // minimum transcript length to trigger smart split
const MIN_DURATION_FOR_SPLIT = 90 * 60 // minimum video duration (seconds) to trigger smart split
```

Article generation also overrides `maxTokens` to `12,000` regardless of DB config, ensuring 1,500–3,000 word articles are never truncated.

---

## Comparison: Old vs Current

| | Old | Current |
|---|---|---|
| Chunk size | 8,000 chars | **24,000 chars** |
| Transcript coverage | 7% (first 8k + last 3k) | **100%** (all chunks analyzed) |
| Segment count | Hardcoded "2–5" | **Dynamic — AI decides by topic count** |
| Segment boundaries | AI guesses percentages | **Exact char positions from chunk map** |
| Article gen input | First 5,000–8,000 chars | **Full raw text up to 80,000 chars** |
| AI visibility per article | ~10% of segment | **100% of segment** |
| Max output tokens | 4,000 (DB config) | **12,000 (override)** |
| Article voice | "The transcript highlights..." | **Journalist: "In this episode..."** |
| Min article length | 500 words | **1,500 words** |
| Single-topic long video | 40k char fallback | **Full content map path (1 segment)** |
| Source attribution | None | **YouTube URL linked in article** |
