# How AI Analyzes and Splits Transcripts — The Complete Process

## The Core Principle: 100% Coverage

**Every single character of the transcript is read by the AI.** No sampling from start/end. No guessing. No blind spots.

This is achieved through a three-phase pipeline:

1. **Chunk Analysis** — the full transcript is broken into 8,000-char chunks and every chunk is individually analyzed
2. **Content Map Segmentation** — AI sees summaries of all chunks and decides segment groupings
3. **Article Generation** — articles are written from proportionally sampled actual raw text from every chunk in a segment

---

## When Does Smart Split Activate?

```typescript
const MIN_CHARS_FOR_SPLIT    = 80000      // ~40k words
const MIN_DURATION_FOR_SPLIT = 90 * 60   // 90 minutes
```

If either threshold is met, the full 3-phase pipeline runs. Otherwise, a single article is generated directly.

---

## Phase 1 — Chunk Analysis (100% Coverage Guaranteed)

The transcript is divided into 8,000-character chunks. Every chunk is sent to the AI individually.

```
Transcript: 150,000 chars  →  19 chunks

Chunk 0  [0     → 8000]:   AI analyzes → ChunkMeta
Chunk 1  [8000  → 16000]:  AI analyzes → ChunkMeta
Chunk 2  [16000 → 24000]:  AI analyzes → ChunkMeta
...
Chunk 18 [144000→ 150000]: AI analyzes → ChunkMeta

All chunks processed in parallel batches of 5
```

### What Each Chunk Returns (`ChunkMeta`)

```typescript
interface ChunkMeta {
  chunkIndex: number      // 0-based position in sequence
  startPos:   number      // exact char start in full transcript
  endPos:     number      // exact char end in full transcript
  charCount:  number      // chars in this chunk
  topicName:  string      // e.g. "Kingfisher Airlines Launch"
  summary:    string      // 2-3 sentences of what is actually said
  concepts:   string[]    // key themes — ["aviation", "brand building", "IPO"]
  entities:   string[]    // people/places/orgs — ["Vijay Mallya", "SEBI", "Mumbai"]
}
```

### The Chunk Analysis Prompt

```
You are extracting metadata from a section of a video transcript.

SECTION 5 of 19 | chars 32000–40000

TRANSCRIPT:
[full 8000 chars of actual transcript text]

Return ONLY a JSON object:
{
  "topicName": "2-5 word topic name for this section",
  "summary": "2-3 sentences describing exactly what is discussed here",
  "concepts": ["theme1", "theme2", "theme3"],
  "entities": ["person/place/org/product mentioned"]
}
```

This means the AI reads and understands the full text of every chunk — nothing is omitted.

### Parallel Batching

To avoid rate limits, chunks are processed in batches of 5 in parallel:

```
Batch 1: chunks 0-4   → 5 parallel AI calls → wait for all → push results
Batch 2: chunks 5-9   → 5 parallel AI calls → wait for all → push results
Batch 3: chunks 10-14 → 5 parallel AI calls → wait for all → push results
Batch 4: chunks 15-18 → 4 parallel AI calls → wait for all → push results
```

---

## Phase 2 — Content Map Segmentation

After all chunks are analyzed, a complete indexed content map is assembled:

```
Chunk 0  [0–8000]:     Introduction & Early Life
  Speaker introduces himself, discusses childhood in Hyderabad...
  Concepts: childhood, education, family
  Entities: Vijay Mallya, Kolkata, father

Chunk 1  [8000–16000]: Entry into Business
  Speaker describes entering the family business and first decisions...
  Concepts: family business, succession, early career
  Entities: UB Group, Vijay Mallya

Chunk 2  [16000–24000]: Kingfisher Airlines Vision
  Speaker talks about seeing the aviation opportunity in India in 2005...
  Concepts: aviation, market gap, startup vision
  Entities: Kingfisher Airlines, Air Deccan, 2005

...

Chunk 18 [144000–150000]: Advice & Wrap-up
  Final thoughts on entrepreneurship and what Vijay would do differently...
  Concepts: lessons learned, advice, reflection
  Entities: Vijay Mallya, Raj Shamani
```

This complete map (not the raw transcript) is then sent to the AI for segmentation:

### The Segmentation Prompt

```
You are segmenting a 259-minute video into topic-based article sections.

VIDEO: "Vijay Mallya Podcast" by Raj Shamani

Below is a complete content map — every chunk covers 8000 chars of the actual transcript:

Chunk 0 [chars 0–8000]: Introduction & Early Life
  Speaker introduces himself, discusses childhood...
  Concepts: childhood, education, family
  Entities: Vijay Mallya, Kolkata

...all 19 chunks...

Group these 19 chunks into 2-5 major segments for separate articles.
Rules:
- Chunks with related or continuous topics belong in the SAME segment
- Different phases of the same story (e.g. history + journey of a startup) = same segment
- Only split when the topic genuinely changes (e.g. startup journey → cricket business)
- Each segment must have enough content for a 500+ word article

Return ONLY a JSON object: { shouldSplit, reason, segments: [{ title, chunkStart, chunkEnd, summary, keyTopics }] }
```

### What the AI Returns

```json
{
  "shouldSplit": true,
  "reason": "Long-form interview covering four distinct phases of life and business",
  "segments": [
    {
      "title": "Early Life and Entry into Business",
      "chunkStart": 0,
      "chunkEnd": 2,
      "summary": "Childhood in Kolkata, family business background, and decision to enter aviation",
      "keyTopics": ["childhood", "family business", "UB Group", "aviation entry"]
    },
    {
      "title": "Kingfisher Airlines: Rise and Golden Era",
      "chunkStart": 3,
      "chunkEnd": 8,
      "summary": "Launch of Kingfisher, rapid growth, brand strategy, and peak years",
      "keyTopics": ["kingfisher airlines", "brand building", "aviation expansion"]
    },
    {
      "title": "Financial Crisis and Legal Battles",
      "chunkStart": 9,
      "chunkEnd": 14,
      "summary": "Accumulating debt, bank loans, regulatory trouble, and eventual downfall",
      "keyTopics": ["debt crisis", "bank loans", "SEBI", "financial management"]
    },
    {
      "title": "Life After Kingfisher: RCB and Lessons Learned",
      "chunkStart": 15,
      "chunkEnd": 18,
      "summary": "Life in London, RCB ownership and cricket insights, and advice for entrepreneurs",
      "keyTopics": ["RCB", "IPL", "exile", "entrepreneurship advice"]
    }
  ]
}
```

### Converting Chunk Indices to Character Positions

The `chunkStart` / `chunkEnd` indices directly map to exact char positions via the content map:

```
Segment 1: chunkStart=0, chunkEnd=2
  → startPosition = contentMap[0].startPos = 0
  → endPosition   = contentMap[2].endPos   = 24,000

Segment 2: chunkStart=3, chunkEnd=8
  → startPosition = contentMap[3].startPos = 24,000
  → endPosition   = contentMap[8].endPos   = 72,000
```

No percentage guessing. Exact boundaries.

---

## Phase 3 — Article Generation with Proportional Sampling

For each segment, the article generator receives **actual raw verbatim text** from every chunk in that segment — not summaries.

### How Proportional Sampling Works

```
Segment 2: chunks 3–8  (6 chunks × 8000 chars = 48,000 chars of actual transcript)
Max context budget: 8,000 chars
Chars per chunk: 8000 / 6 = 1333 chars

Output fed to AI:

[Part 1 — Kingfisher Airlines Vision]
"...so I saw that Air Deccan was doing well but there was a gap
 for a premium airline experience. Indians were travelling more..."
[first 1333 chars of chunk 3]

---

[Part 2 — Brand Strategy and Launch]
"...the Kingfisher brand was already well known from the beer.
 I wanted to bring that energy to aviation. We hired the best..."
[first 1333 chars of chunk 4]

---

[Part 3 — Early Growth and Expansion]
"...within two years we had 30 aircraft and were the fastest
 growing airline in India. Our NPS scores were the highest..."
[first 1333 chars of chunk 5]

... (and so on for chunks 6, 7, 8)
```

Every part of the segment contributes real transcript text. The AI writes the article from actual words spoken in the video — across the full length of the segment.

### Fallback

If chunk boundaries don't align with segment boundaries (edge case), the system falls back to:
```typescript
transcript.slice(segment.startPosition, segment.endPosition).slice(0, 8000)
```

---

## How Related Sub-Topics Are Handled

Consider a segment where two consecutive chunks cover different sub-aspects of the same topic:

```
Chunk 4: topicName = "Startup History"
         summary   = "Speaker talks about how the startup idea originated in 2015, first co-founder..."
         concepts  = ["founding year", "initial idea", "co-founders"]

Chunk 5: topicName = "Building the Startup"
         summary   = "Speaker describes building the MVP, getting first users, early pivots..."
         concepts  = ["product development", "MVP", "first customers", "pivoting"]
```

The segmentation AI sees both summaries together and reasons:
- Both chunks are about the same startup story — different phases, same narrative arc
- `entities` overlap: same founder, same company
- The story flows naturally from "how it started" → "how it was built"

**Result: chunks 4 and 5 are grouped into ONE segment** → one article covering the full story.

The rule in the segmentation prompt is explicit:
> *"Different phases of the same story = same segment. Only split when the topic genuinely changes."*

---

## Full Flow for a 3-Hour Video

```
Video: 150,000 chars, 180 minutes
           │
           ▼
  Eligibility check: 150k > 80k ✓  →  smart split
           │
           ▼
  Phase 1: Build 19 chunks (8000 chars each)
           │
  Batch 1: chunks 0-4  → 5 AI calls in parallel
  Batch 2: chunks 5-9  → 5 AI calls in parallel
  Batch 3: chunks 10-14→ 5 AI calls in parallel
  Batch 4: chunks 15-18→ 4 AI calls in parallel
           │
           ▼
  contentMap: 19 × ChunkMeta  (100% of transcript understood)
           │
           ▼
  Phase 2: Send full content map to AI → segmentation decision
           → 4 segments identified, exact char boundaries set
           │
           ▼
  Phase 3: For each segment:
    - Find chunks in segment
    - Sample 8000 chars proportionally from actual raw text
    - AI writes article from real verbatim content
    - Saved to DB as DRAFT
           │
           ▼
  Result: 4 DRAFT articles, each fully grounded in real transcript data
```

---

## AI Call Count for a 150,000-char Video

| Step | AI Calls | Purpose |
|---|---|---|
| Phase 1 — chunk analysis | 19 (4 parallel batches) | 100% transcript coverage |
| Phase 2 — segmentation | 1 | Group chunks into segments |
| Phase 3 — article generation | 4 (one per segment) | Write final articles |
| **Total** | **24** | |

---

## Constants (configurable in `ai.service.ts`)

```typescript
const CHUNK_SIZE           = 8000   // chars per chunk (increase for fewer, larger chunks)
const CHUNK_BATCH_SIZE     = 5      // parallel AI calls per batch (reduce if hitting rate limits)
const SAMPLE_PER_CHUNK     = 800    // chars sampled per chunk for article generation
const MIN_CHARS_FOR_SPLIT  = 80000  // minimum transcript length to trigger smart split
const MIN_DURATION_FOR_SPLIT = 90 * 60  // minimum video duration (seconds) to trigger smart split
```

---

## Comparison: Old vs New

| | Old Approach | New Approach |
|---|---|---|
| Transcript coverage during analysis | 7% (first 8k + last 3k) | **100%** (every chunk analyzed) |
| Segment boundary method | AI guesses percentages | Exact char positions from chunk map |
| Article generation input | First 5000 chars of segment | Proportional raw text from every chunk |
| AI visibility into segment | 10% of segment content | Every chunk represented |
| Segment accuracy for long videos | Low (middle is invisible) | High (full picture) |
| Related sub-topics handling | May split incorrectly | Content map enables semantic grouping |
