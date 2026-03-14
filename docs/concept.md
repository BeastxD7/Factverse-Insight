# NewsForge — Concept, Architecture & Implementation Guide

> AI-powered news and content platform that automatically generates SEO-optimised articles from multiple sources including live news feeds, RSS, Google Trends, YouTube videos, and podcasts.

---

## Table of Contents

0. [How It All Works — Plain English](#0-how-it-all-works--plain-english)
1. [Project Concept](#1-project-concept)
2. [Core Features](#2-core-features)
3. [System Architecture](#3-system-architecture)
4. [Content Pipeline](#4-content-pipeline)
5. [Database Schema](#5-database-schema)
6. [API Structure](#6-api-structure)
7. [Background Job System](#7-background-job-system)
8. [Frontend Structure](#8-frontend-structure)
9. [Roles & Permissions](#9-roles--permissions)
10. [SEO Strategy](#10-seo-strategy)
11. [Tech Stack](#11-tech-stack)
12. [Environment Variables](#12-environment-variables)
13. [Phased Implementation Plan](#13-phased-implementation-plan)
14. [Getting Started](#14-getting-started)
15. [Testing Strategy](#15-testing-strategy)
16. [Deep Dive — How Every Technology Works](#16-deep-dive--how-every-technology-works)

---

## 0. How It All Works — Plain English

> Read this first. No jargon. No diagrams. Just a clear story of what happens, why, and how every piece connects.

---

### The Big Idea in One Sentence

NewsForge watches the internet 24/7, and the moment something trending is detected — a breaking news story, a new YouTube video, a rising Google search — it automatically writes a full SEO-optimised article about it and puts it in a queue for an admin to approve and publish.

---

### Who Uses This and What Do They Do?

There are two types of people who interact with NewsForge:

**Readers (Users)**
Regular visitors to the website. They browse articles, search for topics, and read content. They never log in. They never see the backend. They just get fast, well-written articles on topics they care about.

**Publishers (Admins)**
The people running the platform. They log into a private dashboard where they can:
- See all the AI-drafted articles waiting to be reviewed
- Read through a draft, make edits if needed, then hit Approve
- Add YouTube channels so the system monitors them automatically
- Configure what topics and keywords the system should focus on
- Manually paste a YouTube URL or upload a podcast to trigger article generation on demand
- See a live feed of all the background jobs running (what's processing, what failed, what completed)

---

### Where Does the Content Come From?

The system has six content sources. Each one feeds into the same pipeline:

**1. News APIs (NewsAPI, GNews)**
These are paid/free services that aggregate headlines from thousands of news websites worldwide. NewsForge calls them every 30 minutes, filters results by the topics the admin has configured, and sends any new headlines to the AI to be rewritten as full articles.

**2. RSS Feeds**
Almost every news website publishes an RSS feed — a simple list of their latest articles. NewsForge checks each configured RSS feed every 15 minutes. If there's a new article it hasn't seen before, it rewrites it as original content.

**3. Google Trends**
Every few hours, NewsForge checks what topics are trending globally on Google. If a trend matches any of the admin's configured keywords, it generates an article about that trend from scratch — even if no news source has covered it yet.

**4. YouTube Channel Monitor**
The admin adds a YouTube channel URL to the dashboard. Every 10 minutes, NewsForge checks that channel for new videos. The moment a new video is posted, it automatically pulls the transcript and generates articles from it.

**5. YouTube URL (Manual)**
The admin pastes any YouTube video URL directly into the dashboard. The system immediately transcribes the video and generates articles. This is useful for one-off videos the admin spots manually.

**6. Podcast / Audio Upload**
The admin uploads an MP3 or audio file directly. The system transcribes the audio and turns it into articles — great for podcasts, interviews, or recorded talks.

---

### What Happens When a New Video or Article Is Detected?

Here is the exact sequence of events, step by step, in plain English:

```
Step 1 — Detection
  A background job (running silently in the background, like a cron job)
  checks a source — a YouTube channel, a news API, an RSS feed, etc.
  It finds something new that hasn't been processed before.

Step 2 — Queue
  The job drops a "task" into a queue (like a to-do list stored in Redis).
  The queue holds the task safely until a worker picks it up.
  This means even if the server is busy, nothing gets lost.

Step 3 — Worker Picks It Up
  A worker process (think of it as a dedicated employee for one type of job)
  picks the task from the queue and starts processing it.

Step 4 — Transcription (if video/audio)
  If the source is a YouTube video or audio file:
  - The worker first tries to get the auto-generated captions from YouTube.
  - If no captions exist, it downloads the audio and runs it through
    a speech-to-text service (Whisper AI) to get the full transcript.
  - For a news article or RSS item, there's no transcription needed —
    the text is already there.

Step 5 — Smart Splitting (for long content)
  If the transcript is over 80,000 chars OR the video is over 90 minutes,
  the system runs a three-phase pipeline to ensure 100% of the content is
  understood before any splitting decision is made:

  Phase 1 — Chunk Analysis:
    The full transcript is split into 24,000-char chunks. Every chunk is
    individually sent to the AI (in parallel batches of 5) which returns a
    topicName, summary, key concepts, and entities for that chunk.
    Nothing is skipped — every character is seen.

  Phase 2 — Content Map Segmentation (Topic-Driven, No Fixed Count):
    The AI receives a complete indexed map of all chunks and decides how
    many segments to create based purely on content. If 8 distinct topics
    are found → 8 articles. If 1 deep topic → 1 long article. No count is
    forced. Boundaries are exact char positions from chunk indices.
    If the AI returns a single unified topic, the full video is wrapped as
    one segment and still processed through the full pipeline.

  Phase 3 — Article Generation:
    For each segment, the FULL raw text of every chunk in that segment is
    assembled (up to 80,000 chars). The AI writes each article from real
    verbatim video content — not summaries, not samples.
    Each article targets a minimum of 1,500 words.
    Token output is overridden to 12,000 to prevent truncation.

  Short videos (under the thresholds) skip all this and generate 1 article
  from the first 40,000 chars of the transcript.

Step 6 — AI Writing (Journalist Voice)
  For each segment (or for each news item), the worker sends the full
  transcript text to the AI with a prompt that instructs it to write as a
  journalist covering the video — not as someone analysing a document.
  Key rules enforced in every prompt:
  - Never mention "transcript" or "transcription" in the article
  - Reference the video naturally: "In this episode, [person] explained..."
  - Include a markdown link to the YouTube source URL once
  - Write as a TL;DW (Too Long; Didn't Watch) — full value, no filler
  The AI responds with a fully written, SEO-optimised article with a title,
  meta description, keywords, category suggestion, and tags.

Step 7 — Saved as Draft
  The finished article is saved to the database with the status "DRAFT".
  It is NOT published yet. Nobody can see it on the public website.
  It simply sits in the admin's review queue, waiting.

Step 8 — Admin Reviews
  The admin logs into the dashboard, sees the new draft, reads it,
  optionally edits it, then clicks Approve.
  The article status changes to "APPROVED", a publish timestamp is set,
  and it immediately appears on the public website.
  If the draft is poor quality, the admin can Reject it — it disappears
  from the queue and is never published.
```

---

### How Do the Different Parts of the Codebase Talk to Each Other?

There are three separate processes running at the same time. Here is what each one does and how they connect:

**The Website (Next.js — `apps/web`)**

This is what readers and admins see in their browser. It serves two audiences:
- Public pages (homepage, article pages, category pages) — anyone can visit these
- Admin dashboard (protected behind login) — only admins can access these

When the website needs data (like a list of articles), it makes an HTTP request to the API server. It does not talk to the database directly — everything goes through the API.

The website also handles login. When an admin logs in, a session is created and stored in the database. That session token is used to prove their identity on every request.

**The API Server (Express — `apps/server`)**

This is the brain of the operation. It handles all the data logic:
- Receives requests from the website
- Checks if the person is allowed to do what they're asking (auth)
- Reads from or writes to the database
- Triggers background jobs when the admin does something (like manually ingesting a YouTube URL)
- Returns clean, structured data back to the website

The API server also runs the background workers. When it starts up, it initialises all the job queues and starts listening for tasks.

**The Database (PostgreSQL)**

This is where everything is permanently stored:
- All articles (drafts, published, rejected)
- User accounts and sessions
- Categories, tags, topics
- YouTube channels being monitored
- Content source configurations
- A record of every background job that ran (success or failure)

The database never talks to the browser directly. Only the API server can read from or write to it.

**Redis (The Queue)**

Redis is an in-memory store used specifically for the job queue. When a background job needs to be done (e.g. "process this YouTube video"), a task is pushed into Redis. Workers pull tasks from Redis and process them. If the server restarts mid-processing, the task is still in Redis and will be retried. Think of Redis as a very fast, reliable to-do list that survives crashes.

---

### How Does an Article Go From Nothing to Published?

Here is the full lifecycle of a single article, from detection to a reader seeing it:

```
[Source detects new content]
        ↓
[Task added to Redis queue]
        ↓
[Worker picks up task]
        ↓
[Content fetched / transcribed]
        ↓
[Split into segments if long]
        ↓
[Claude AI writes each article]
        ↓
[Article saved to DB — status: DRAFT]
        ↓
[Admin sees it in review queue]
        ↓
    [Admin clicks Approve]
        ↓
[Status → APPROVED, publishedAt set]
        ↓
[Article appears on public website]
        ↓
[Next.js page re-renders with new content]
        ↓
[Google crawls it and indexes it]
        ↓
[Readers find it via search]
```

---

### Why Is It Split Into Two Separate Apps (Web + Server)?

This is the most common question. Here is the honest reason:

The website (Next.js) is great at rendering pages fast and handling user sessions. But it's terrible at running long background tasks — things like transcribing a 2-hour podcast, polling 20 RSS feeds every 15 minutes, or processing a queue of video jobs. If you try to run those inside a Next.js app, they either time out or block the web server.

The Express server, on the other hand, is a long-running process that can handle background workers, maintain persistent queue connections to Redis, and process things at its own pace without any timeout constraints.

So the split is deliberate:
- Next.js handles everything the user sees and interacts with
- Express handles everything that runs in the background

They share one database (PostgreSQL) and communicate over HTTP when needed.

---

### Why Does an Admin Have to Approve Every Article?

Two reasons:

**Quality control.** AI is good but not perfect. Occasionally an article might be off-topic, contain a factual error, or have an awkward tone. A quick human review catches these before they go live.

**Legal protection.** Publishing AI-generated content without review could lead to copyright issues, defamation claims, or factual inaccuracies that embarrass the brand. A human approval step creates accountability.

The review process is designed to be fast — an admin should be able to read a draft and approve or reject it in under 60 seconds.

---

### Why Is SEO Important Here and How Does the System Handle It?

SEO (Search Engine Optimisation) is what makes Google rank your article above a competitor's. The key factors are:

- **Speed** — Google favours sites that publish first on a topic
- **Structure** — proper headings (H1, H2, H3), meta title, meta description
- **Originality** — content that is not copied from another site
- **Keywords** — the search terms your audience uses, naturally embedded in the text
- **Volume** — more indexed pages = more chances to appear in search results

NewsForge handles all of these automatically:
- Claude AI is specifically prompted to structure every article with SEO in mind
- Articles are generated within minutes of a topic appearing, so the site publishes early
- Each YouTube video can produce multiple articles, multiplying indexed pages
- Content is rewritten, not copied, so Google treats it as original

---

### What Happens If Something Goes Wrong?

Everything that could fail has a safety net:

| What fails | What happens |
|---|---|
| A worker crashes mid-job | Redis still holds the task. It gets retried up to 3 times automatically |
| Claude API is slow or returns an error | The job fails and retries with exponential backoff (waits 5s, then 25s, then 125s) |
| The database is temporarily unreachable | The health endpoint returns 503 and the admin is alerted |
| A YouTube video has no captions | The system downloads the audio and transcribes it with Whisper as a fallback |
| An article is low quality | The admin rejects it. It never reaches readers |
| A job fails 3 times in a row | It moves to the "failed" list in the admin dashboard for manual investigation |

---

*Last updated: Section 0 added — Plain English overview*

NewsForge is a **fully automated AI content platform** built around a simple idea:

> Be the first to publish high-quality, SEO-optimised content on any trending topic — automatically.

Traditional news sites rely on human writers who are slow, expensive, and can't work 24/7. NewsForge solves this by:

- **Monitoring** multiple content sources in real-time (news APIs, RSS, YouTube, trends)
- **Transcribing** video and audio content automatically
- **Generating** unique, SEO-optimised articles using Claude AI within minutes of a topic breaking
- **Queuing** all AI-generated content for a human admin to review and publish with one click

The result is a high-velocity content engine that publishes faster than competitors while maintaining quality through AI + human review.

---

## 2. Core Features

### For Readers (User Role)
- Browse articles by category, tag, and topic
- Full-text search across all published content
- SEO-optimised article pages (og:image, meta, structured data)
- Fast, mobile-friendly public frontend

### For Publishers (Admin Role)
- **Article Review Queue** — approve, edit, or reject AI-generated drafts
- **Content Source Manager** — configure News APIs, RSS feeds, Google Trends
- **YouTube Channel Monitor** — add channel URLs, auto-detect new videos
- **Manual Ingest** — paste any YouTube URL or upload a podcast/audio file
- **Topic Configuration** — define keywords and niches to focus content on
- **Job Monitor** — real-time visibility into all background pipeline jobs
- **Scheduling** — set publish times for approved articles

---

## 3. System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        NEWSFORGE PLATFORM                        │
│                                                                  │
│  ┌──────────────┐          ┌──────────────────────────────────┐ │
│  │   FRONTEND   │  HTTP    │           BACKEND                │ │
│  │  Next.js 15  │◄────────►│        Express 5 API             │ │
│  │  (Port 3000) │          │         (Port 3001)              │ │
│  └──────┬───────┘          └──────────────┬───────────────────┘ │
│         │                                  │                     │
│         │ NextAuth v5                       │ Prisma ORM          │
│         │ (session)                         │                     │
│         │                         ┌─────────▼──────────┐        │
│         │                         │    PostgreSQL DB    │        │
│         │                         │   (Port 5432)       │        │
│         │                         └────────────────────┘        │
│         │                                  │                     │
│         │                         ┌─────────▼──────────┐        │
│         │                         │   BullMQ Workers   │        │
│         │                         │  (Background Jobs) │        │
│         │                         └─────────┬──────────┘        │
│         │                                   │                    │
│         │                         ┌─────────▼──────────┐        │
│         │                         │    Redis Queue      │        │
│         │                         │    (Port 6379)      │        │
│         │                         └────────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
```

### Monorepo Structure

```
news-app/                          ← Bun workspace root
├── apps/
│   ├── web/                       ← Next.js 15 (frontend + auth)
│   └── server/                    ← Express 5 (API + workers)
├── packages/
│   ├── db/                        ← Prisma schema + migrations
│   └── types/                     ← Shared TypeScript DTOs
├── docs/                          ← Project documentation
├── uploads/                       ← Local file storage (gitignored)
├── docker-compose.yml             ← PostgreSQL + Redis
├── CLAUDE.md                      ← AI coding conventions
└── .env.example
```

### Inter-Service Communication

```
┌─────────────────┐    REST/JSON    ┌──────────────────┐
│   Next.js web   │◄───────────────►│  Express server  │
│                 │                 │                  │
│ - Public pages  │                 │ - /api/v1/*      │
│ - Admin UI      │                 │ - Auth middleware │
│ - Server comps  │                 │ - BullMQ workers │
└─────────────────┘                 └──────────────────┘
        │                                    │
        │ @auth/prisma-adapter               │ @news-app/db
        │                                    │
        └────────────────┬───────────────────┘
                         │
              ┌──────────▼──────────┐
              │   packages/db       │
              │  (Prisma Client)    │
              │  Single source of   │
              │  truth for schema   │
              └─────────────────────┘
```

---

## 4. Content Pipeline

### Full Pipeline Overview

```
╔══════════════════════════════════════════════════════════════════╗
║                    CONTENT SOURCES                               ║
╠══════════════╦═══════════════╦═══════════════╦══════════════════╣
║  News APIs   ║   RSS Feeds   ║ Google Trends ║  YouTube/Audio   ║
║  (NewsAPI,   ║  (Any RSS     ║  (Trending    ║  (Channel URL,   ║
║   GNews)     ║   endpoint)   ║   topics)     ║   Video URL, MP3)║
╚══════╤═══════╩═══════╤═══════╩═══════╤═══════╩════════╤═════════╝
       │               │               │                │
       └───────────────┴───────────────┴────────────────┘
                                │
                                ▼
                   ┌────────────────────────┐
                   │   BullMQ Job Queue     │
                   │   (Redis-backed)       │
                   │                        │
                   │  news-fetch     q      │
                   │  rss-fetch      q      │
                   │  trends-fetch   q      │
                   │  youtube-monitor q     │
                   │  youtube-process q     │
                   │  audio-process   q     │
                   └────────────┬───────────┘
                                │
                                ▼
                   ┌────────────────────────┐
                   │    WORKER PROCESSING   │
                   │                        │
                   │  1. Fetch raw content  │
                   │  2. Transcribe (if A/V)│
                   │  3. Chunk analysis     │
                   │     (100% coverage)    │
                   │  4. Content map →      │
                   │     segment grouping   │
                   │  5. Generate articles  │
                   │     (proportional raw  │
                   │      text per chunk)   │
                   └────────────┬───────────┘
                                │
                                ▼
                   ┌────────────────────────┐
                   │   Claude AI (Anthropic) │
                   │                        │
                   │  analyzeChunk()        │
                   │  segmentContentMap()   │
                   │  generateArticle()     │
                   │  rewriteAsArticle()    │
                   │  generateTrending()    │
                   │                        │
                   │  Output per article:   │
                   │  - Title + slug        │
                   │  - Full content (MD)   │
                   │  - Meta title/desc     │
                   │  - Keywords[]          │
                   │  - Tags, category      │
                   └────────────┬───────────┘
                                │
                                ▼
                   ┌────────────────────────┐
                   │   PostgreSQL (DRAFT)   │
                   │   ArticleStatus:DRAFT  │
                   └────────────┬───────────┘
                                │
                                ▼
                   ┌────────────────────────┐
                   │   ADMIN REVIEW QUEUE   │
                   │                        │
                   │  Admin sees drafts     │
                   │  Can: Edit / Approve   │
                   │        Reject / Sched  │
                   └────────────┬───────────┘
                                │
                                ▼
                   ┌────────────────────────┐
                   │  PUBLISHED ARTICLE     │
                   │  ArticleStatus:APPROVED│
                   │  Indexed by Google     │
                   │  Served to readers     │
                   └────────────────────────┘
```

### YouTube / Audio Processing Detail

```
YouTube URL or Channel New Video
           │
           ▼
┌─────────────────────────┐
│  Fetch Video Metadata   │
│  - Title, description   │
│  - Duration             │
│  - Chapter markers      │
│  - Published date       │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  Get Transcript         │
│                         │
│  Try 1: YT auto-caps    │ ──► success → raw transcript text
│  Try 2: yt-dlp audio   │
│  Try 3: Whisper AI      │ ──► transcribed text
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐     Duration-Based Splitting
│  Split Strategy         │
│                         │     0  - 10 min  →  1 article
│  1. YouTube chapters    │     10 - 20 min  →  2 articles
│  2. Time windows        │     20 - 40 min  →  3 articles
│  3. Topic detection     │     40 - 60 min  →  4 articles
│                         │     60+ min      →  5+ articles
└────────────┬────────────┘
             │
             ▼  (one Claude call per segment)
┌─────────────────────────┐
│  Claude AI Generation   │
│  (per segment)          │
│                         │
│  Input:                 │
│  - Transcript segment   │
│  - Topic keywords       │
│  - Video metadata       │
│  - SEO instructions     │
│                         │
│  Output:                │
│  - Full article (MD)    │
│  - SEO metadata         │
│  - Embed original video │
└────────────────────────-┘
```

### News / RSS Processing Detail

```
Scheduled Fetch (every 15-30 min)
           │
           ▼
┌─────────────────────────┐
│  Fetch from Source      │
│  NewsAPI / GNews / RSS  │
│                         │
│  Filter by:             │
│  - Topic keywords       │
│  - Date (fresh only)    │
│  - Language             │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  Deduplication Check    │
│                         │
│  Match sourceUrl against│
│  existing articles in DB│
│  Skip if already seen   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  Claude AI Rewrite      │
│                         │
│  Input:                 │
│  - Headline + summary   │
│  - Source URL           │
│  - Topic context        │
│                         │
│  Output:                │
│  - Original full article│
│  - Not a copy/paste     │
│  - SEO optimised        │
└────────────────────────-┘
```

---

## 5. Database Schema

### Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │       │   Article   │       │  Category   │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (cuid)   │       │ id (cuid)   │       │ id (cuid)   │
│ email       │       │ title       │       │ name        │
│ passwordHash│       │ slug        │◄──────│ slug        │
│ name        │       │ excerpt     │       │ description │
│ role        │       │ content     │       └──────┬──────┘
│ image       │       │ metaTitle   │              │
└─────────────┘       │ metaDesc    │       ┌──────▼──────┐
                      │ ogImage     │       │    Topic    │
┌─────────────┐       │ keywords[]  │       ├─────────────┤
│     Tag     │       │ status      │       │ id (cuid)   │
├─────────────┤       │ sourceType  │       │ name        │
│ id (cuid)   │       │ sourceUrl   │       │ keywords[]  │
│ name        │       │ aiGenerated │       │ enabled     │
│ slug        │       │ aiModel     │       │ categoryId  │
└──────┬──────┘       │ viewCount   │       └──────┬──────┘
       │              │ publishedAt │              │
       │  ┌───────────│ categoryId  │              │
       │  │           │ jobRunId    │    ┌─────────▼──────────┐
       │  │           └──────┬──────┘    │   ContentSource    │
       │  │                  │           ├────────────────────┤
       │  │           ┌──────▼──────┐    │ id (cuid)          │
       │  │           │ ArticleTag  │    │ type (enum)        │
       │  │           ├─────────────┤    │ name               │
       │  └──────────►│ articleId   │    │ url                │
       │              │ tagId       │    │ config (JSON)      │
       └──────────────│             │    │ enabled            │
                      └─────────────┘    │ topicId            │
                                         │ lastFetchAt        │
                                         └────────────────────┘
┌─────────────────────┐
│   YoutubeChannel    │         ┌─────────────────────┐
├─────────────────────┤         │       JobRun         │
│ id (cuid)           │         ├─────────────────────┤
│ channelId (YT ID)   │         │ id (cuid)            │
│ channelName         │         │ type (enum)          │
│ channelUrl          │         │ status (enum)        │
│ enabled             │         │ bullJobId            │
│ topicId             │         │ sourceId             │
│ lastCheckedAt       │         │ channelId            │
│ lastVideoId         │         │ payload (JSON)       │
└─────────────────────┘         │ result (JSON)        │
                                 │ errorMessage         │
                                 │ startedAt            │
┌─────────────────────┐          │ completedAt          │
│    MediaUpload      │         └─────────────────────┘
├─────────────────────┤
│ id (cuid)           │
│ filename            │
│ originalName        │
│ mimeType            │
│ sizeBytes           │
│ storagePath         │
│ transcript          │
│ processed           │
└─────────────────────┘
```

### Article Status Lifecycle

```
                    ┌─────────┐
   AI generates ──► │  DRAFT  │
                    └────┬────┘
                         │
              Admin reviews queue
                         │
              ┌──────────┼──────────┐
              │          │          │
              ▼          ▼          ▼
          ┌───────┐  ┌────────┐  ┌──────────┐
          │REVIEW │  │APPROVED│  │ REJECTED │
          │(needs │  │(live)  │  │(removed) │
          │ edit) │  └────┬───┘  └──────────┘
          └───┬───┘       │
              │           ▼
              │      ┌──────────┐
              └─────►│ ARCHIVED │
                     └──────────┘
```

---

## 6. API Structure

### Public Endpoints (No Auth)

```
GET  /api/v1/articles              Paginated published articles
GET  /api/v1/articles/:slug        Single article
GET  /api/v1/categories            All categories
GET  /api/v1/tags                  All tags
GET  /api/v1/search?q=             Full-text search
```

### Admin Endpoints (ADMIN role required)

```
# Dashboard
GET  /api/v1/admin/stats

# Articles
GET    /api/v1/admin/articles
PATCH  /api/v1/admin/articles/:id
DELETE /api/v1/admin/articles/:id

# Content Sources
GET    /api/v1/admin/sources
POST   /api/v1/admin/sources
PATCH  /api/v1/admin/sources/:id
DELETE /api/v1/admin/sources/:id
POST   /api/v1/admin/sources/:id/trigger

# YouTube Channels
GET    /api/v1/admin/channels
POST   /api/v1/admin/channels
PATCH  /api/v1/admin/channels/:id
DELETE /api/v1/admin/channels/:id
POST   /api/v1/admin/channels/:id/trigger

# Topics
GET    /api/v1/admin/topics
POST   /api/v1/admin/topics
PATCH  /api/v1/admin/topics/:id
DELETE /api/v1/admin/topics/:id

# Job Monitoring
GET    /api/v1/admin/jobs
GET    /api/v1/admin/jobs/:id
DELETE /api/v1/admin/jobs/:id
```

### Manual Ingest Endpoints

```
POST /api/v1/ingest/youtube-url    { url, topicId? } → enqueue job
POST /api/v1/ingest/audio          multipart/form-data → upload + enqueue
```

---

## 7. Background Job System

### Queue Schedule

```
┌────────────────────┬──────────────────┬──────────────────────────┐
│ Queue              │ Schedule         │ Trigger                  │
├────────────────────┼──────────────────┼──────────────────────────┤
│ news-fetch         │ Every 30 min     │ Per enabled News source  │
│ rss-fetch          │ Every 15 min     │ Per enabled RSS source   │
│ trends-fetch       │ Every 6 hours    │ Global                   │
│ youtube-monitor    │ Every 10 min     │ Per enabled YT channel   │
│ youtube-process    │ On-demand        │ New video or manual URL  │
│ audio-process      │ On-demand        │ Admin file upload        │
└────────────────────┴──────────────────┴──────────────────────────┘
```

### Worker Architecture

```
apps/server/src/
├── workers/
│   ├── queues.ts              ← BullMQ Queue definitions (single registry)
│   ├── scheduler.ts           ← Sets up all repeat jobs on startup
│   ├── news-fetch.worker.ts
│   ├── rss-fetch.worker.ts
│   ├── trends-fetch.worker.ts
│   ├── youtube-monitor.worker.ts
│   ├── youtube-process.worker.ts
│   └── audio-process.worker.ts
└── services/
    ├── claude.service.ts      ← All Anthropic API calls
    ├── youtube.service.ts     ← yt-dlp, YT Data API
    ├── transcription.service.ts
    ├── newsapi.service.ts
    ├── gnews.service.ts
    ├── rss.service.ts
    └── trends.service.ts
```

### Job Retry Policy

```
All workers:
  attempts: 3
  backoff: exponential, base 5 seconds
  removeOnComplete: keep last 100
  removeOnFail: keep last 200 (for debugging)
```

---

## 8. Frontend Structure

### Page Map

```
Public (/)
├── /                          Homepage — article grid (Server Component, no-store)
├── /articles/[slug]           Article detail (Server Component, notFound() on 404)
├── /login                     Login form (Client Component, NextAuth signIn)
│
│   [Phase 3+]
├── /category/[slug]           Category listing
├── /tag/[slug]                Tag listing
└── /search                    Search results

Admin (/admin) — ADMIN role required, guarded in layout.tsx
├── /admin                     Stats dashboard (article counts, jobs, sources)
├── /admin/articles            Article review queue (Server Component + Client table)
├── /admin/ingest              Manual ingest — paste YouTube URL, trigger AI pipeline
├── /admin/ai-config           AI provider settings form (Server Component + Client form)
│
│   [Phase 4+]
├── /admin/sources             Content source management
├── /admin/channels            YouTube channel monitor
├── /admin/topics              Topic/niche configuration
└── /admin/jobs                Job run history & status
```

### Implemented File Structure (Phase 2 + Phase 3)

```
apps/web/src/
├── app/
│   ├── layout.tsx                    Root layout — Providers, TooltipProvider, Toaster
│   ├── page.tsx                      Public homepage (Server Component)
│   ├── login/
│   │   └── page.tsx                  Login form (Client Component)
│   ├── articles/
│   │   └── [slug]/
│   │       └── page.tsx              Article detail page (Server Component)
│   ├── admin/
│   │   ├── layout.tsx                Admin layout — auth guard + Shadcn sidebar
│   │   ├── page.tsx                  Stats dashboard (Server Component)
│   │   ├── articles/
│   │   │   ├── page.tsx              Fetches articles, renders ArticleQueue
│   │   │   └── actions.ts            Server Action: updateArticleStatus()
│   │   ├── ingest/
│   │   │   ├── page.tsx              Manual ingest page (YouTube URL form)
│   │   │   └── actions.ts            Server Action: ingestYoutubeUrl()
│   │   └── ai-config/
│   │       ├── page.tsx              Fetches AI config, renders AiConfigForm
│   │       └── actions.ts            Server Action: updateAiConfig()
│   └── api/auth/[...nextauth]/
│       └── route.ts                  NextAuth route handler
│
├── components/
│   ├── providers.tsx                 "use client" — SessionProvider wrapper
│   ├── admin/
│   │   ├── AppSidebar.tsx            Admin sidebar (Dashboard, Queue, Ingest, Config)
│   │   ├── StatsCards.tsx            Dashboard stat cards (articles, jobs, sources)
│   │   ├── ArticleQueue.tsx          Article table — approve/reject, URL-driven filter
│   │   ├── IngestForm.tsx            YouTube URL paste form + submit
│   │   └── AiConfigForm.tsx          React Hook Form + Zod — AI config form
│   └── ui/                           Shadcn components (never edit manually)
│       ├── button.tsx                @base-ui/react button
│       ├── sidebar.tsx               Full sidebar system
│       ├── card.tsx / badge.tsx      Content containers
│       ├── table.tsx                 Data table primitives
│       ├── select.tsx                @base-ui/react select
│       ├── input.tsx / label.tsx     Form primitives
│       ├── form.tsx                  React Hook Form integration
│       ├── sonner.tsx                Toast notifications
│       └── tooltip.tsx / sheet.tsx   Sidebar dependencies
│
└── lib/
    ├── env.ts                        Client-safe env (NEXT_PUBLIC_* only)
    ├── env-server.ts                 Server-only env (import "server-only")
    ├── api.ts                        Typed client-side fetch wrapper
    ├── api-server.ts                 Server-side fetch (uses API_SECRET)
    ├── auth.ts                       NextAuth config
    └── utils.ts                      cn() utility

apps/server/src/
├── services/
│   ├── ai.service.ts                 Multi-provider AI completion + article generation
│   └── youtube.service.ts            Video ID extraction, oEmbed metadata, transcript fetch
├── workers/
│   ├── queues.ts                     BullMQ queue registry (6 queues)
│   └── youtube-process.worker.ts     Worker: transcript → AI → Article (DRAFT)
└── api/v1/admin/
    ├── admin.router.ts               All admin routes (stats, articles, jobs, ai-config, ingest)
    ├── admin.controller.ts           Stats, article queue, job management
    ├── ai-config.controller.ts       AI provider settings CRUD
    └── ingest.controller.ts          POST /admin/ingest/youtube — enqueue video processing
```

### Data Flow: Server Component → Client Component → Server Action

```
Browser Request → /admin/articles
        │
        ▼
┌─────────────────────────────────────────────┐
│  app/admin/layout.tsx  (Server Component)   │
│                                              │
│  1. auth() → verify ADMIN session           │
│  2. if not ADMIN → redirect("/login")        │
│  3. renders Shadcn SidebarProvider + content │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  app/admin/articles/page.tsx  (Server Comp) │
│                                              │
│  1. serverApi.get("/admin/articles?status=DRAFT")
│     → Bearer API_SECRET → Express API        │
│  2. returns ArticleListItem[]                │
│  3. passes articles as props to client comp  │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  ArticleQueue.tsx  (Client Component)       │
│  "use client" — runs in browser             │
│                                              │
│  - Renders table with article rows          │
│  - Approve/Reject buttons call              │
│    updateArticleStatus() Server Action      │
└─────────────────┬───────────────────────────┘
                  │ onClick → Server Action
                  ▼
┌─────────────────────────────────────────────┐
│  actions.ts  (Server Action)                │
│  "use server" — runs on server, not browser │
│                                              │
│  1. serverApi.patch("/articles/:id", status)│
│  2. revalidatePath("/admin/articles")        │
│  3. returns { success, error }               │
└─────────────────────────────────────────────┘
```

### Admin Dashboard Wireframe

```
┌─────────────────────────────────────────────────────┐
│  NewsForge Admin          [User: admin@site.com]    │
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│  Navigation  │   Dashboard Overview                 │
│  ──────────  │   ──────────────────────────────     │
│  Dashboard   │   ┌──────┐ ┌──────┐ ┌──────┐        │
│  Articles  ● │   │  42  │ │  8   │ │  156 │        │
│  Sources     │   │DRAFTS│ │REVIEW│ │PUBLD │        │
│  Channels    │   └──────┘ └──────┘ └──────┘        │
│  Topics      │                                      │
│  Jobs        │   Recent Jobs                        │
│  Settings    │   ┌─────────────────────────────┐   │
│              │   │ ● news-fetch    COMPLETED    │   │
│              │   │ ● yt-process    RUNNING...   │   │
│              │   │ ✗ rss-fetch     FAILED       │   │
│              │   └─────────────────────────────┘   │
│              │                                      │
│              │   Articles Pending Review            │
│              │   ┌─────────────────────────────┐   │
│              │   │ "AI is changing..."  [Edit]  │   │
│              │   │ "Top 10 trends..."   [Appv]  │   │
│              │   │ "Breaking: Market"   [Appv]  │   │
│              │   └─────────────────────────────┘   │
└──────────────┴──────────────────────────────────────┘
```

---

## 9. Roles & Permissions

```
┌──────────────────────────────────────────────────────┐
│                    PERMISSIONS                        │
├────────────────────────┬────────────┬────────────────┤
│ Action                 │ USER       │ ADMIN          │
├────────────────────────┼────────────┼────────────────┤
│ Read published articles│    ✓       │    ✓           │
│ Search articles        │    ✓       │    ✓           │
│ Browse categories/tags │    ✓       │    ✓           │
│ View admin dashboard   │    ✗       │    ✓           │
│ Review/approve drafts  │    ✗       │    ✓           │
│ Edit articles          │    ✗       │    ✓           │
│ Manage content sources │    ✗       │    ✓           │
│ Add YouTube channels   │    ✗       │    ✓           │
│ Configure topics       │    ✗       │    ✓           │
│ Trigger manual ingest  │    ✗       │    ✓           │
│ Monitor job queue      │    ✗       │    ✓           │
└────────────────────────┴────────────┴────────────────┘
```

---

## 10. SEO Strategy

### Why This Platform Wins at SEO

```
Speed + Quality + Volume = SEO Dominance

Speed:   AI generates articles within minutes of news breaking
         → indexed before competitors

Quality: Claude AI writes structured, readable, original content
         → lower bounce rate, longer session time

Volume:  Multiple articles per YouTube video / podcast
         → more indexed pages = more entry points from Google
```

### Per-Article SEO Checklist (auto-generated by Claude)

- Unique `<title>` tag (50-60 chars)
- Meta description (150-160 chars)
- Open Graph `og:title`, `og:description`, `og:image`
- Proper H1 → H2 → H3 heading hierarchy
- Keywords naturally embedded (not stuffed)
- Internal links to related articles (same category/tag)
- Schema.org `NewsArticle` structured data
- Canonical URL
- Reading time estimate

### Next.js SEO Implementation

```
Article page (ISR):
- generateMetadata() → dynamic meta per article
- revalidate = 3600  → re-render hourly
- revalidatePath()   → instant re-render on admin approve

Global:
- /sitemap.ts        → dynamic sitemap with all published articles
- /robots.ts         → crawler directives
```

---

## 11. Tech Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                         TECH STACK                               │
├─────────────────┬───────────────────────────────────────────────┤
│ Runtime         │ Bun (package manager + runtime)               │
├─────────────────┼───────────────────────────────────────────────┤
│ Frontend        │ Next.js 15 (App Router, TypeScript)           │
│                 │ Tailwind CSS v4                               │
│                 │ Shadcn UI (latest)                            │
├─────────────────┼───────────────────────────────────────────────┤
│ Backend         │ Express 5 (TypeScript)                        │
├─────────────────┼───────────────────────────────────────────────┤
│ Database        │ PostgreSQL 16                                  │
│ ORM             │ Prisma 6                                       │
├─────────────────┼───────────────────────────────────────────────┤
│ Auth            │ NextAuth v5 + @auth/prisma-adapter            │
├─────────────────┼───────────────────────────────────────────────┤
│ Job Queue       │ BullMQ + Redis 7                              │
├─────────────────┼───────────────────────────────────────────────┤
│ AI              │ Anthropic Claude API (claude-sonnet-4-6)      │
├─────────────────┼───────────────────────────────────────────────┤
│ Content APIs    │ NewsAPI, GNews, YouTube Data API v3           │
│                 │ youtube-transcript-api, yt-dlp, rss-parser    │
│                 │ google-trends-api                             │
├─────────────────┼───────────────────────────────────────────────┤
│ Infra (local)   │ Docker Compose (PostgreSQL + Redis)           │
├─────────────────┼───────────────────────────────────────────────┤
│ Validation      │ Zod (env + request validation)                │
├─────────────────┼───────────────────────────────────────────────┤
│ Monorepo        │ Bun workspaces                                │
└─────────────────┴───────────────────────────────────────────────┘
```

---

## 12. Environment Variables

```bash
# ── Database ──────────────────────────────────────────────────────
DATABASE_URL=postgresql://news:news@localhost:5432/newsapp

# ── Redis ─────────────────────────────────────────────────────────
REDIS_URL=redis://localhost:6379

# ── Auth ──────────────────────────────────────────────────────────
NEXTAUTH_SECRET=<32-byte-random-string>
NEXTAUTH_URL=http://localhost:3000

# ── Express ───────────────────────────────────────────────────────
PORT=3001
API_SECRET=<shared-secret-for-next-to-express-auth>

# ── AI ────────────────────────────────────────────────────────────
ANTHROPIC_API_KEY=sk-ant-...

# ── Content APIs ──────────────────────────────────────────────────
NEWSAPI_KEY=...
GNEWS_API_KEY=...
YOUTUBE_API_KEY=...          # YouTube Data API v3

# ── Frontend ──────────────────────────────────────────────────────
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 13. Phased Implementation Plan

```
┌─────────────────────────────────────────────────────────────────┐
│                    IMPLEMENTATION PHASES                         │
├────────┬────────────────────────────────────────────────────────┤
│ PHASE  │ DELIVERABLE                                            │
├────────┼────────────────────────────────────────────────────────┤
│   1    │ FOUNDATION  ✅ COMPLETE                                │
│        │ • Bun monorepo scaffold                                │
│        │ • Docker (PostgreSQL + Redis)                          │
│        │ • Prisma schema + migrations + seed                    │
│        │ • Express 5 skeleton + health endpoint                 │
│        │ • All admin + public REST API endpoints                │
│        │ • BullMQ workers + queue registry                      │
│        │ • Unified AI service (Anthropic/Groq/OpenRouter/Azure) │
│        │ • NextAuth v5 (credentials, Prisma adapter)           │
│        │ • Standardised API response envelope                   │
│        │ • AiConfig DB model + admin GET/PATCH endpoint         │
│        │ • 41 passing tests (unit + integration)                │
│        │ ✓ Goal: bun dev starts both apps, auth works          │
├────────┼────────────────────────────────────────────────────────┤
│   2    │ CORE READ/WRITE PATH  ✅ COMPLETE                     │
│        │ • Public homepage (article grid, Server Component)     │
│        │ • Public article detail page (/articles/[slug])        │
│        │ • Login page (NextAuth credentials form)               │
│        │ • Admin layout with Shadcn sidebar + auth guard        │
│        │ • Admin stats dashboard (articles, jobs, sources)      │
│        │ • Admin article review queue (approve/reject)          │
│        │ • Admin AI config settings form                        │
│        │ • Server Actions for all mutations                     │
│        │ • api-server.ts + env-server.ts (server-only pattern)  │
│        │ • All Shadcn components installed (base-ui variant)    │
│        │ ✓ Goal: manually inserted articles visible + managed  │
├────────┼────────────────────────────────────────────────────────┤
│   3    │ MANUAL INGEST PIPELINE  ✅ COMPLETE (YouTube)          │
│        │ • Claude service (all 3 generation functions)         │
│        │ • YouTube URL ingest endpoint (POST /admin/ingest/yt) │
│        │ • youtube-transcript library (no API key needed)       │
│        │ • youtube-process BullMQ worker                        │
│        │ • Admin ingest UI (paste URL, submit, toast result)   │
│        │ • Worker auto-starts with server                       │
│        │ ✓ Goal: paste YT URL → DRAFT articles in queue       │
│        │                                                        │
│        │ Remaining (optional):                                  │
│        │ • Audio/podcast upload (needs transcription API)       │
│        │ • Duration-based article splitting for long videos     │
├────────┼────────────────────────────────────────────────────────┤
│   4    │ AUTOMATED PIPELINE                                     │
│        │ • NewsAPI + GNews workers                             │
│        │ • RSS feed worker                                      │
│        │ • Google Trends worker                                 │
│        │ • YouTube channel monitor worker                       │
│        │ • BullMQ scheduler (repeat jobs)                       │
│        │ • Admin source/channel/topic management UI            │
│        │ ✓ Goal: new articles appear automatically on schedule │
├────────┼────────────────────────────────────────────────────────┤
│   5    │ POLISH + OBSERVABILITY                                 │
│        │ • Admin job monitor page                               │
│        │ • Error handling + retry policy                        │
│        │ • Full-text search (PostgreSQL tsvector)              │
│        │ • Rate limiting on public API                          │
│        │ • ISR on-demand revalidation                          │
│        │ • End-to-end TypeScript DTO audit                     │
│        │ ✓ Goal: production-ready, observable, resilient       │
└────────┴────────────────────────────────────────────────────────┘
```

---

## 14. Getting Started

### Prerequisites

| Tool | Version | Install |
|---|---|---|
| Bun | ≥ 1.3 | `curl -fsSL https://bun.sh/install \| bash` |
| Docker Desktop | latest | docker.com/products/docker-desktop |
| Git | any | git-scm.com |

### First-Time Setup

```bash
# 1. Clone & install dependencies
git clone <repo-url> news-app
cd news-app
bun install

# 2. Set up environment variables
cp .env.example .env
# Edit .env — fill in your API keys (ANTHROPIC_API_KEY at minimum)

# 3. IMPORTANT — create web app env file
#    Next.js only reads .env from its own directory (not the monorepo root)
cp .env apps/server/.env
cp .env packages/db/.env

#    Create the web app env file manually:
cat > apps/web/.env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_SECRET=<same value as in root .env>
NEXTAUTH_URL=http://localhost:3000
API_SECRET=<same value as in root .env>
EOF

# 4. Start PostgreSQL + Redis
bun run docker:up

# 5. Run database migrations
bun run db:migrate

# 6. Seed the database (creates admin user + default categories)
bun run db:seed

# 7. Generate Prisma client (if not done already)
bun run db:generate
```

> **Why three separate .env files?**
> Each app lives in its own directory. Next.js reads `apps/web/.env.local`, Express reads `apps/server/.env`, Prisma reads `packages/db/.env`. The root `.env` is the single source of truth — you copy/sync it to each app manually. The `apps/web/.env.local` is gitignored by Next.js automatically and must never be committed.

### Running in Development

```bash
# Run both apps simultaneously
bun run dev

# Or run individually
bun run dev:web       # Next.js  → http://localhost:3000
bun run dev:server    # Express  → http://localhost:3001

# Verify server is up
curl http://localhost:3001/api/v1/health
```

### Default Credentials (seeded)

```
Admin login:  admin@newsforge.com / admin123
```

> Change the admin password immediately after first login.

### Adding Shadcn Components

```bash
cd apps/web

bunx shadcn@latest add card
bunx shadcn@latest add table
bunx shadcn@latest add dialog
bunx shadcn@latest add badge
bunx shadcn@latest add input
# etc.
```

### Database Workflow

```bash
# After editing packages/db/prisma/schema.prisma:
bun run db:migrate         # creates a migration + applies it
bun run db:generate        # regenerates Prisma client

# Visual DB browser
bun run db:studio          # opens Prisma Studio at http://localhost:5555

# Force-push schema (dev/prototype only — never in production)
bun run db:push
```

### Project Structure At-a-Glance

```
news-app/
├── apps/
│   ├── web/          → Next.js 16, Tailwind v4, Shadcn — http://localhost:3000
│   └── server/       → Express 5, BullMQ workers      — http://localhost:3001
├── packages/
│   ├── db/           → Prisma schema + migrations + seed
│   └── types/        → Shared TypeScript DTOs
├── tests/
│   ├── unit/         → Bun test (fast, no DB/network)
│   └── integration/  → Bun test (requires Docker infra running)
├── docs/             → Project documentation
├── docker-compose.yml
├── CLAUDE.md         → Coding conventions
└── .env.example
```

---

## 15. Testing Strategy

### Test Runner

All tests use **Bun's built-in test runner** — no Jest, no Vitest needed.

```bash
# Run all tests
bun test

# Run unit tests only
bun test tests/unit

# Run integration tests only (requires docker:up + db:migrate first)
bun test tests/integration

# Run a specific file
bun test tests/unit/server/services/articles.service.test.ts

# Watch mode
bun test --watch tests/unit
```

### Test Structure

```
tests/
├── unit/
│   ├── server/
│   │   ├── services/
│   │   │   ├── articles.service.test.ts    Pure service logic, mocked Prisma
│   │   │   ├── claude.service.test.ts      AI generation, mocked Anthropic SDK
│   │   │   └── youtube.service.test.ts     YouTube parsing logic
│   │   ├── middleware/
│   │   │   ├── validate.test.ts            Zod validation middleware
│   │   │   └── error-handler.test.ts       Error serialization
│   │   └── workers/
│   │       └── split-strategy.test.ts      Duration → article count logic
│   └── web/
│       └── lib/
│           └── utils.test.ts               cn(), formatDate(), etc.
│
└── integration/
    ├── setup.ts                            Global beforeAll/afterAll (DB reset)
    ├── api/
    │   ├── articles.test.ts                Full HTTP: GET /api/v1/articles
    │   ├── admin.articles.test.ts          Admin approve/reject flow
    │   ├── admin.sources.test.ts           Source CRUD
    │   └── admin.channels.test.ts          YouTube channel CRUD
    └── workers/
        ├── news-fetch.test.ts              News fetch → article creation
        └── rss-fetch.test.ts               RSS fetch → article creation
```

### Philosophy

```
Unit tests:         Fast. No I/O. Mock everything external.
Integration tests:  Real DB + Redis. Test the full request/response cycle.
No E2E (yet):       Playwright will be added in Phase 5.
```

### Unit Test Example

```typescript
// tests/unit/server/workers/split-strategy.test.ts
import { describe, it, expect } from "bun:test"
import { getSplitCount } from "../../../apps/server/src/workers/split-strategy"

describe("getSplitCount", () => {
  it("returns 1 article for videos under 10 minutes", () => {
    expect(getSplitCount(9 * 60)).toBe(1)
    expect(getSplitCount(0)).toBe(1)
  })

  it("returns 2 articles for 10–20 minute videos", () => {
    expect(getSplitCount(15 * 60)).toBe(2)
  })

  it("returns 3 articles for 20–40 minute videos", () => {
    expect(getSplitCount(30 * 60)).toBe(3)
  })

  it("returns 4 articles for 40–60 minute videos", () => {
    expect(getSplitCount(50 * 60)).toBe(4)
  })

  it("returns 5+ articles for videos over 60 minutes", () => {
    expect(getSplitCount(90 * 60)).toBeGreaterThanOrEqual(5)
  })
})
```

### Integration Test Example

```typescript
// tests/integration/api/articles.test.ts
import { describe, it, expect, beforeAll, afterAll } from "bun:test"
import { prisma } from "@news-app/db"

const API = "http://localhost:3001/api/v1"

beforeAll(async () => {
  // Seed a published article for tests
  await prisma.article.create({
    data: {
      title: "Test Article",
      slug: "test-article",
      content: "Test content",
      status: "APPROVED",
      publishedAt: new Date(),
      aiGenerated: false,
    },
  })
})

afterAll(async () => {
  await prisma.article.deleteMany({ where: { slug: "test-article" } })
  await prisma.$disconnect()
})

describe("GET /api/v1/articles", () => {
  it("returns paginated published articles", async () => {
    const res = await fetch(`${API}/articles`)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body).toHaveProperty("data")
    expect(body).toHaveProperty("total")
    expect(Array.isArray(body.data)).toBe(true)
  })

  it("filters by category slug", async () => {
    const res = await fetch(`${API}/articles?category=technology`)
    expect(res.status).toBe(200)
  })

  it("paginates correctly", async () => {
    const res = await fetch(`${API}/articles?page=1&pageSize=5`)
    const body = await res.json()
    expect(body.pageSize).toBe(5)
    expect(body.page).toBe(1)
  })
})

describe("GET /api/v1/articles/:slug", () => {
  it("returns a single article by slug", async () => {
    const res = await fetch(`${API}/articles/test-article`)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.data.slug).toBe("test-article")
  })

  it("returns 404 for unknown slug", async () => {
    const res = await fetch(`${API}/articles/does-not-exist`)
    expect(res.status).toBe(404)
  })
})
```

### Mocking Prisma in Unit Tests

```typescript
// tests/unit/server/services/articles.service.test.ts
import { describe, it, expect, mock, beforeEach } from "bun:test"

// Mock the prisma module before importing the service
mock.module("@news-app/db", () => ({
  prisma: {
    article: {
      findUnique: mock(() => Promise.resolve(null)),
      findMany: mock(() => Promise.resolve([])),
      count: mock(() => Promise.resolve(0)),
    },
  },
}))

import { articlesService } from "../../../apps/server/src/api/v1/articles/articles.service"

describe("articlesService.findBySlug", () => {
  it("throws NotFoundError when article does not exist", async () => {
    expect(articlesService.findBySlug("missing-slug")).rejects.toThrow("Article not found")
  })
})
```

### Coverage Targets

| Area | Target |
|---|---|
| `apps/server/src/services/` | 80%+ |
| `apps/server/src/middleware/` | 90%+ |
| `apps/server/src/workers/` (pure logic) | 70%+ |
| `apps/web/src/lib/` | 80%+ |
| Integration (API routes) | All happy + error paths |

---

*Last updated: Phase 2 complete — admin UI, public pages, deep-dive section added*
*Next milestone: Phase 3 — Manual ingest pipeline (YouTube URL, audio upload)*

---

## 16. Deep Dive — How Every Technology Works

> This section explains every major technology used in NewsForge — what it is, why we chose it, and exactly how it's wired into the system. Written for someone who knows how to code but hasn't used these specific tools before.

---

### Redis — The In-Memory Message Broker (Deep Dive)

#### What Redis actually is

Redis stands for **Re**mote **Di**ctionary **S**erver. It is a key-value store that lives entirely in RAM (memory), not on disk. Think of it like a massive JavaScript object `{}` that:
- Never forgets its contents even if your Node.js process restarts (it periodically saves to disk)
- Can be accessed by multiple processes simultaneously (your Express server + all your workers)
- Can store not just simple values but also lists, sorted sets, hashes, and pub/sub channels

The key difference between Redis and PostgreSQL:

```
PostgreSQL:
  Every write → goes to disk → slow (milliseconds)
  Perfect for: permanent structured data (articles, users, tags)
  Bad for: real-time queuing (too slow, too heavy)

Redis:
  Every write → stays in RAM → extremely fast (microseconds)
  Perfect for: queuing, caching, pub/sub, rate limiting
  Bad for: permanent business data (RAM is expensive, data can be lost on power failure)
```

#### Why does a job queue need Redis specifically?

Imagine you're running a restaurant kitchen. Orders come in from customers (the Express API), and cooks (workers) need to pick them up and prepare them. You need a "ticket rail" — the strip above the counter where order tickets hang.

That ticket rail is Redis.

Without Redis, the problem is:
- Your Express server handles the HTTP request in ~10ms
- Processing a YouTube video takes 2–5 minutes
- You CANNOT block the HTTP request for 5 minutes (client would time out)
- You CANNOT use a global variable (crashes are lost, multiple server instances can't share it)
- You CANNOT use PostgreSQL for this (too slow, wrong tool)

Redis solves all three:
- HTTP request completes in <100ms (just pushes job into Redis and returns)
- Job lives in Redis safely even if the server crashes
- Multiple workers on multiple machines can all read from the same Redis queue

#### What Redis actually stores for BullMQ

When BullMQ adds a job to a queue, it creates these keys in Redis:

```
bull:youtube-process:1                → the job data itself (JSON)
bull:youtube-process:waiting          → list of job IDs waiting to run
bull:youtube-process:active           → list of job IDs currently being processed
bull:youtube-process:completed        → sorted set of completed job IDs
bull:youtube-process:failed           → sorted set of failed job IDs
bull:youtube-process:delayed          → sorted set of jobs waiting for retry delay
bull:youtube-process:id               → counter for auto-incrementing job IDs
```

So when you call `youtubeProcessQueue.add("process-video", { videoId: "abc" })`:
1. BullMQ increments `bull:youtube-process:id` → gets ID `42`
2. Stores `bull:youtube-process:42` = `{ name: "process-video", data: { videoId: "abc" }, opts: { attempts: 3 } }`
3. Pushes `42` to `bull:youtube-process:waiting` list

When the worker picks it up:
1. BullMQ moves `42` from `waiting` → `active`
2. Worker runs your processing function
3. On success: moves `42` from `active` → `completed`
4. On failure: moves `42` from `active` → `delayed` (waits for backoff), then back to `waiting`

#### What happens if the server crashes mid-job?

This is the most important property of Redis + BullMQ. If your server crashes while processing job `42`:
- `42` remains in the `active` list in Redis
- When BullMQ reconnects, it sees `42` is stuck in `active` with no living worker
- After a "stall detection" timeout (default 30 seconds), BullMQ automatically moves it back to `waiting`
- The job is retried — **nothing is lost**

Without this, a crashed server would silently drop whatever job it was working on.

#### Redis in our Docker setup

```yaml
# docker-compose.yml
redis:
  image: redis:7-alpine
  ports:
    - "6379:6379"
  volumes:
    - redis_data:/data        # persists to disk so jobs survive docker restart
  command: redis-server --appendonly yes  # AOF persistence mode
```

`appendonly yes` tells Redis to write every operation to an append-only file on disk. This means even if Docker restarts or the machine reboots, Redis reloads the full job state from that file.

We connect with `REDIS_URL=redis://localhost:6379` in `.env`.

---

### BullMQ — The Job Queue (Deep Dive)

#### The analogy: a post office sorting room

Imagine a post office:
- **Letters arrive** (HTTP requests trigger jobs)
- **Sorting bins** hold letters by type: "international", "local", "express" (our queues: `youtube-process`, `news-fetch`, etc.)
- **Postal workers** pick up letters from their assigned bin and deliver them (our workers)
- **A supervisor** adds new letters to the international bin every 30 minutes without anyone asking (our scheduled/repeatable jobs)
- If a delivery fails (recipient not home), the letter goes back to the bin after a wait (retry with backoff)

BullMQ is the entire post office system. Redis is the physical building where all the bins live.

#### The four core BullMQ concepts

**1. Queue — the named channel**

A Queue is a connection to Redis that lets you add jobs. It does NOT process jobs. It is purely a producer.

```typescript
// queues.ts
const connection = { url: env.REDIS_URL, maxRetriesPerRequest: null }

export const youtubeProcessQueue = new Queue("youtube-process", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
  },
})
```

Why one file for all queues? Because a Queue holds a Redis connection. If two files each create `new Queue("youtube-process", ...)`, you have two connections pointing to the same Redis keys — this wastes connections and can cause subtle race conditions. One registry file, one connection per queue.

**2. Job — the unit of work**

A job is just a name + a JSON payload. Nothing more.

```typescript
// Anywhere in the server that needs to trigger work:
await youtubeProcessQueue.add("process-video", {
  videoId:  "dQw4w9WgXcQ",
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  topicId:  "tech-001",        // optional
})
```

The job name (`"process-video"`) is just for logging and filtering — it doesn't affect processing. The data object is what the worker receives.

**3. Worker — the job consumer**

A Worker is what actually runs your code. It:
- Connects to Redis and listens for new jobs on a named queue
- Picks up one job at a time (or N concurrent jobs if `concurrency: N`)
- Calls your async function with `job.data`
- Marks the job complete or failed based on whether the function resolves or throws

```typescript
// youtube-process.worker.ts
const worker = new Worker(
  "youtube-process",           // must match Queue name exactly
  processYoutubeVideo,         // your async function
  {
    connection: { url: env.REDIS_URL, maxRetriesPerRequest: null },
    concurrency: 2,            // process 2 videos simultaneously
  }
)

async function processYoutubeVideo(job: Job<YoutubeProcessPayload>) {
  // job.data = { videoId, videoUrl, topicId }
  // job.id   = Redis job ID
  // If this function throws → BullMQ marks it failed and retries
  // If this function resolves → BullMQ marks it completed
}
```

**Why `maxRetriesPerRequest: null`?**

This is a quirk specific to BullMQ with ioredis (the Redis client it uses under the hood). BullMQ's workers use long-polling (blocking reads) on Redis — they sit and wait for new jobs to appear. By default, ioredis has a `maxRetriesPerRequest: 0` limit which would cause the blocking read to throw an error. Setting it to `null` disables this limit so the worker can block indefinitely waiting for work. Without this, workers crash immediately on startup.

**4. Repeatable Jobs — the scheduler**

Instead of running a cron service separately, BullMQ supports repeatable jobs built in. You add a job with a `repeat` option and BullMQ automatically re-adds it to the queue on schedule:

```typescript
// To be added in scheduler.ts (Phase 4)
await newsQueue.add(
  "fetch-news",
  { sources: ["newsapi", "gnews"] },
  {
    repeat: { every: 30 * 60 * 1000 },   // every 30 minutes
    jobId: "news-fetch-scheduler",         // stable ID prevents duplicates on restart
  }
)
```

BullMQ stores the repeat config in Redis. When the server restarts, it sees the repeat config still exists and continues scheduling. No separate cron daemon needed.

#### The full job lifecycle

```
                         ┌─────────────────────┐
                         │  queue.add(name, data)│
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      WAITING        │  ← sitting in Redis list
                         │  (in Redis queue)   │     waiting for a free worker
                         └──────────┬──────────┘
                                    │  worker picks it up
                                    ▼
                         ┌─────────────────────┐
                         │       ACTIVE        │  ← worker is running the function
                         │  (worker running)   │     job.data available, job.progress() works
                         └────────┬────────────┘
                                  │
               ┌──────────────────┼──────────────────┐
               │ function resolves│                   │ function throws
               ▼                  │                   ▼
  ┌─────────────────────┐         │      ┌────────────────────────┐
  │     COMPLETED       │         │      │  attempts remaining?   │
  │  (kept for 100 jobs)│         │      └──────────┬─────────────┘
  └─────────────────────┘         │                 │
                                  │         yes     │       no
                                  │    ┌────────────┴────────────┐
                                  │    ▼                         ▼
                                  │  ┌───────────┐         ┌──────────┐
                                  │  │  DELAYED  │         │  FAILED  │
                                  │  │(backoff   │         │(kept for │
                                  │  │ wait)     │         │ 200 jobs)│
                                  │  └─────┬─────┘         └──────────┘
                                  │        │ after delay
                                  │        ▼
                                  │    WAITING (retry)
                                  │
                                  │ server crash mid-job
                                  │        ▼
                                  │    STALLED → back to WAITING
```

#### Retry policy — why exponential backoff?

All workers are configured with:
```typescript
attempts: 3
backoff: { type: "exponential", delay: 5000 }
```

If a job fails (network error, AI API timeout, YouTube rate limit, etc.):

```
Attempt 1 fails → wait 5 seconds   → retry   (5¹ × base)
Attempt 2 fails → wait 25 seconds  → retry   (5² × base)
Attempt 3 fails → wait 125 seconds → retry   (5³ × base)
All 3 fail      → job → FAILED list (stays in Redis, visible in admin)
```

Why exponential? If YouTube's API is overloaded and returns 429 Too Many Requests, hitting it again immediately makes things worse for everyone. Waiting progressively longer gives external services time to recover. This is industry-standard practice for any system that calls external APIs.

#### Concurrency — how many jobs run at once?

```typescript
const worker = new Worker("youtube-process", handler, {
  concurrency: 2,   // process 2 videos at the same time
})
```

`concurrency: 2` means the worker can hold 2 active jobs simultaneously. Both run in the same Node.js process but as separate async chains. Since most of the work is I/O (waiting for YouTube, waiting for the AI API), 2 concurrent jobs barely uses extra CPU but doubles throughput.

For CPU-bound work you'd set this to 1. For purely I/O-bound work (like ours) you can go higher.

#### Why NOT use setTimeout / setInterval instead of BullMQ?

This is a fair question. Why not just:
```typescript
setInterval(fetchNews, 30 * 60 * 1000)
```

Problems with that approach:
1. **No persistence** — if the server restarts, the interval is gone. You'd miss 30 minutes of news.
2. **No retry** — if `fetchNews` throws, it's gone. No automatic retry.
3. **No visibility** — you can't see "what jobs ran, what failed, what's pending" without building a whole system.
4. **No distributed support** — if you run 2 server instances, both intervals fire simultaneously → duplicate processing.
5. **No backpressure** — if a job takes longer than its interval (a 2-min video processing takes longer than a 10-min poll), jobs pile up with no control.

BullMQ solves all of these out of the box.

---

### Worker Architecture — How Everything Starts Up

When the Express server starts (`apps/server/src/index.ts`), it does two things:
1. Registers all HTTP routes
2. Starts all workers

```typescript
// index.ts (simplified)
import { startYoutubeProcessWorker } from "./workers/youtube-process.worker"

const app = express()
// ... routes ...

app.listen(PORT, () => {
  startYoutubeProcessWorker()   // starts listening for jobs
  // Phase 4: startYoutubeMonitorWorker()
  // Phase 4: startNewsFetchWorker()
  // etc.
})
```

Workers don't "poll" in a loop. They use Redis's `BLPOP` command — a blocking left-pop. This means: "wait here until something appears in this list, then give it to me." It uses zero CPU while waiting. The moment a job is added to the queue, Redis wakes up the worker instantly.

```
Worker starts
    │
    ▼
BLPOP "bull:youtube-process:waiting"   ← blocks here, uses 0 CPU
    │
    │  (3 hours later, admin submits a URL)
    │
    ▼
Redis returns job ID immediately
    │
    ▼
Worker processes job
    │
    ▼
BLPOP again   ← back to waiting
```

---

### Smart Split AI Pipeline — Complete Technical Deep Dive

This section explains exactly how a 3-hour YouTube video becomes multiple focused, SEO-optimised articles — with 100% of the video's content seen and understood by the AI. The number of articles is determined dynamically by topic count, not by a fixed formula.

#### The problem we're solving

A 3-hour video has roughly **150,000 characters** of transcript. If you send that to an AI and ask "split this into topics", two things go wrong:

1. **Even large-context models have limits** — while o3-mini supports 200k tokens (~800k chars), sending 150k chars of raw transcript in one shot is expensive and slow.
2. **More importantly: our old approach sent only 11k chars (7% of the video)** — the AI was essentially guessing segment boundaries based on the intro and outro. Everything in the middle was completely invisible.

The current approach guarantees **100% coverage**: every character is read, understood, and represented.

#### Phase 1 — Chunk Analysis (the "read everything" phase)

The full transcript is divided into **24,000-character chunks**. Each chunk is sent to the AI in a separate call. For a 150k char video:

```
150,000 ÷ 24,000 = 7 chunks (rounded up)

Chunk 0: chars 0      → 24,000   → AI reads all 24,000 chars → returns ChunkMeta
Chunk 1: chars 24,000 → 48,000   → AI reads all 24,000 chars → returns ChunkMeta
Chunk 2: chars 48,000 → 72,000   → AI reads all 24,000 chars → returns ChunkMeta
Chunk 3: chars 72,000 → 96,000   → AI reads all 24,000 chars → returns ChunkMeta
Chunk 4: chars 96,000 → 120,000  → AI reads all 24,000 chars → returns ChunkMeta
Chunk 5: chars 120,000→ 144,000  → AI reads all 24,000 chars → returns ChunkMeta
Chunk 6: chars 144,000→ 150,000  → AI reads all  6,000 chars → returns ChunkMeta
```

All 7 chunks are processed in **parallel batches of 5** (to avoid rate-limiting):
- Batch 1: chunks 0–4 → 5 parallel AI calls → wait → push results
- Batch 2: chunks 5–6 → 2 parallel AI calls → wait → push results

The prompt for each chunk:
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

Each chunk returns a `ChunkMeta` object:
```typescript
interface ChunkMeta {
  chunkIndex:  number    // 0-based (0, 1, 2, ...)
  startPos:    number    // exact character start position
  endPos:      number    // exact character end position
  charCount:   number    // endPos - startPos
  topicName:   string    // "KGB Recruitment and Training"
  summary:     string    // 2-3 sentence description of what's actually said
  concepts:    string[]  // ["espionage", "Cold War", "tradecraft"]
  entities:    string[]  // ["Jack Barsky", "KGB", "East Germany"]
}
```

After all batches complete, you have a `contentMap: ChunkMeta[]` — a complete indexed map of 100% of the video.

#### Phase 2 — Content Map Segmentation (the "decide where to split" phase)

The content map is sent to the AI for grouping. **Crucially, there is no fixed segment count** — the AI is instructed to let the topics decide:

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

The AI for a 3hr 17min spy podcast (7 chunks) might return:
```json
{
  "shouldSplit": true,
  "reason": "Five distinct topics: spy recruitment, undercover life, FBI confrontation, post-spy reinvention, and current geopolitics",
  "segments": [
    { "title": "KGB Recruitment and Spy Training",     "chunkStart": 0, "chunkEnd": 1 },
    { "title": "Living a Double Life in America",      "chunkStart": 2, "chunkEnd": 3 },
    { "title": "FBI Discovery and Defection",          "chunkStart": 4, "chunkEnd": 4 },
    { "title": "Life After the KGB: Reinvention",      "chunkStart": 5, "chunkEnd": 5 },
    { "title": "Putin, Trump, and Russian Intelligence","chunkStart": 6, "chunkEnd": 6 }
  ]
}
```

If the AI returns `shouldSplit: false` (one unified topic), the code wraps the full transcript as one segment and still routes it through the full pipeline — it does NOT fall back to the simpler 40k path.

The `chunkStart` / `chunkEnd` values are converted to exact character positions:
```typescript
startPosition = contentMap[seg.chunkStart].startPos   // exact, no guessing
endPosition   = contentMap[seg.chunkEnd].endPos        // exact, no guessing
```

#### How related sub-topics stay together

```
Chunk 0: topicName = "KGB Recruitment and Background"
         summary   = "Barsky describes being identified by the KGB, the assessment..."
         entities  = ["Jack Barsky", "KGB", "East Germany"]

Chunk 1: topicName = "Spy Training and Deployment"
         summary   = "Barsky undergoes language training, creates his cover identity..."
         entities  = ["Jack Barsky", "KGB", "New York", "William Barsky"]
```

The segmentation AI sees both summaries together and reasons:
- Both involve the same spy-becoming arc (recruited → trained → deployed)
- Entities overlap (same person, same mission)
- Splitting them would create two incomplete articles

Result: chunks 0 and 1 → **one segment** → one article covering the full "from East German to undercover KGB agent" story.

#### Phase 3 — Article Generation with Full Raw Transcript Text

For each segment, the article generator receives the **complete verbatim text** of every chunk in that segment — not proportional samples, not summaries. The actual words spoken.

```typescript
const MAX_SEGMENT_INPUT = 80000  // max chars per article generation call
```

Example: Segment 2 spans chunks 2–3 (2 × 24,000 = 48,000 chars). Fits easily in 80,000 char budget.

```
[Part 1 — Life Undercover in America]
"...so I built this cover story piece by piece. I got a social security
 number, started working at a tech company in New Jersey. My colleagues
 had no idea. My neighbours had no idea. Even my wife didn't know for
 years. The psychological weight of it was enormous..."
[full 24,000 chars of chunk 2]

---

[Part 2 — Discovery and FBI Confrontation]
"...the FBI had been watching me for a while before they approached.
 They came to my house one morning in 1997. I had a daughter by then.
 That changed everything. I looked at the agent and said 'I think we
 need to have a conversation'..."
[full 24,000 chars of chunk 3]
```

The prompt also enforces **journalist voice** — the article must read like coverage of a video, not analysis of a document:
- Never mention "transcript" or "transcription"
- Write: "In this episode, Barsky revealed..." not "The transcript shows..."
- Include one markdown link to the YouTube URL for attribution
- Minimum 1,500 words per article
- Output token override: 12,000 (ignores DB config's 4,000 limit)

#### The complete smart split AI call count

For a 144k char, 197-minute video producing 5 articles:

```
Phase 1: 7 chunk analysis calls (2 batches: 5 parallel + 2 parallel)
Phase 2: 1 segmentation call
Phase 3: 5 article generation calls (one per segment)
─────────────────────────────────────────────────────
Total:   13 AI calls

Compare to old approach for same video:
Phase 1: 1 call (first 6k chars only — 4% coverage)
Phase 2: 2 article generation calls (hardcoded "2-5" → AI chose 2)
─────────────────────────────────────────────────────
Total:   3 AI calls, with 96% of video invisible to the AI
```

The extra calls in Phase 1 are cheap (small JSON outputs) and run in parallel. The quality difference is dramatic.

---

### The Complete End-to-End Request Flow (Updated with Smart Split)

#### Path A — Short video (< 80k chars, < 90 min) → Single article

```
Admin pastes YouTube URL in /admin/ingest
        │
        ▼
IngestForm.tsx (Client Component)
  └── ingestYoutubeUrl(url)  [Server Action]
        │
        ▼
ingest/actions.ts
  └── serverApi.post("/admin/ingest/youtube", { url })
  └── HTTP POST to Express:3001 with Bearer API_SECRET header
        │
        ▼
ingest.controller.ts (Express)
  └── extractVideoId(url) → "dQw4w9WgXcQ"
  └── prisma.jobRun.create({ type: "YOUTUBE_PROCESS", status: "PENDING" })
  └── youtubeProcessQueue.add("process-video", { videoId, videoUrl })
       └── BullMQ serializes job to JSON
       └── pushes job ID to Redis list: bull:youtube-process:waiting
  └── returns 201: { jobRunId, videoId, status: "PENDING" }
        │
        ▼
Browser shows toast: "Video queued for processing"
IngestForm starts polling getJobStatus(jobRunId) every 3 seconds
        │
        │  (meanwhile, in the background...)
        ▼
youtube-process.worker.ts (BullMQ Worker)
  └── BLPOP on Redis wakes up — picks up job ID
  └── moves job: waiting → active in Redis
  └── prisma.jobRun.update({ status: "RUNNING" })
  └── fetchVideoMeta(videoId) → { title, channelName, duration: 8 mins }
  └── fetchTranscript(videoId) → { text: "...", estimatedDurationSecs: 480 }
  └── transcript.length = 12,000 chars < MIN_CHARS_FOR_SPLIT (80,000)
  └── aiService.analyzeAndSplitTranscript() → { shouldSplit: false }
  └── aiService.generateArticleFromTranscript(transcript, keywords, meta)
       └── prompt: [video meta + transcript.slice(0, 6000)] → Claude/o3-mini
       └── returns JSON: { title, slug, content, keywords, category, tags }
  └── prisma.article.create({ status: "DRAFT", sourceType: "YOUTUBE_VIDEO" })
  └── prisma.jobRun.update({ status: "COMPLETED", result: { articleTitle } })
  └── job moves: active → completed in Redis
        │
        ▼
IngestForm polling detects COMPLETED
  └── result = { articleTitle: "How Zerodha Changed..." }  ← SingleArticleResult
  └── toast.success("Article generated!", { description: "How Zerodha Changed..." })
  └── job card shows: "How Zerodha Changed..." + green Completed badge
```

---

#### Path B — Long video (≥ 80k chars OR ≥ 90 min) → Smart Split → Multiple articles

```
[same steps 1–7 as Path A up to fetchTranscript]
        │
        ▼
transcript.length = 150,000 chars ≥ MIN_CHARS_FOR_SPLIT
        │
        ▼
aiService.analyzeAndSplitTranscript(transcript, meta)
        │
        ▼
── PHASE 1: CHUNK ANALYSIS ──────────────────────────────────────────────
  Split into 7 chunks (150k ÷ 24k chars each)

  Batch 1 — 5 parallel AI calls:
    Chunk 0 [0–24k]:    topicName="Introduction & Early Life",  entities=["Mallya"]
    Chunk 1 [24k–48k]:  topicName="Entry into Aviation",        entities=["Kingfisher"]
    Chunk 2 [48k–72k]:  topicName="Airline Growth & Brand",     entities=["DGCA"]
    Chunk 3 [72k–96k]:  topicName="Peak Years & Expansion",     entities=["Air Deccan"]
    Chunk 4 [96k–120k]: topicName="Debt Crisis Begins",         entities=["Banks", "SEBI"]

  Batch 2 — 2 parallel AI calls:
    Chunk 5 [120k–144k]:topicName="Legal Battles & Exile",      entities=["CBI", "London"]
    Chunk 6 [144k–150k]:topicName="RCB & Life Lessons",         entities=["RCB", "IPL"]

  contentMap = [ChunkMeta × 7]   ← 100% of transcript understood
        │
        ▼
── PHASE 2: SEGMENTATION ────────────────────────────────────────────────
  Send full contentMap (7 summaries, ~1400 chars total) to AI

  AI groups chunks:
    Segment 1: chunkStart=0, chunkEnd=1  → "Early Life & Aviation Ambition"
    Segment 2: chunkStart=2, chunkEnd=3  → "Kingfisher Rise and Golden Era"
    Segment 3: chunkStart=4, chunkEnd=5  → "Financial Crisis & Legal Battles"
    Segment 4: chunkStart=6, chunkEnd=6  → "RCB, Life After Kingfisher"

  Convert to char positions (exact, from contentMap):
    Segment 1: startPosition=0,      endPosition=48,000
    Segment 2: startPosition=48,000, endPosition=96,000
    Segment 3: startPosition=96,000, endPosition=144,000
    Segment 4: startPosition=144,000,endPosition=150,000
        │
        ▼
── PHASE 3: ARTICLE GENERATION (sequential, one per segment) ────────────
  Segment 1 → chunks 0–1 in contentMap
    Sample: 2500 chars from chunk 0 raw text + 2500 chars from chunk 1 raw text
    Prompt: focus="Early Life & Aviation Ambition" + sampled real transcript
    AI returns: { title, slug, content, keywords, category, tags }
    → prisma.article.create({ status: "DRAFT" })   Article A created

  Segment 2 → chunks 2–3
    Sample: 2500 from chunk 2 + 2500 from chunk 3
    → Article B created

  Segment 3 → chunks 4–5
    Sample: 2500 from chunk 4 + 2500 from chunk 5
    → Article C created

  Segment 4 → chunk 6
    Sample: 2500 from chunk 6 (only one chunk)
    → Article D created
        │
        ▼
prisma.jobRun.update({
  status: "COMPLETED",
  result: {
    articleCount: 4,
    articles: [
      { id: "...", title: "Early Life & Aviation Ambition",  slug: "..." },
      { id: "...", title: "Kingfisher Rise and Golden Era",  slug: "..." },
      { id: "...", title: "Financial Crisis & Legal Battles",slug: "..." },
      { id: "...", title: "RCB, Life After Kingfisher",      slug: "..." },
    ],
    splitReason: "Four distinct life phases..."
  }
})
        │
        ▼
IngestForm polling detects COMPLETED
  └── result = { articleCount: 4, articles: [...] }  ← MultiArticleResult
  └── isMultiArticleResult(result) → true
  └── toast.success("4 articles generated!", {
        description: "Early Life & Aviation Ambition · Kingfisher Rise... · +2 more"
      })
  └── job card shows:
        "4 articles generated"
        "Early Life & Aviation Ambition · Kingfisher Rise · +2 more"
        [green Completed badge]

Admin navigates to /admin/articles
  └── sees 4 new DRAFT articles in the review queue
  └── each focused on one topic, ready to review and approve
```

---

### Next.js App Router — Server Components, Server Actions, and ISR

**The evolution of Next.js rendering**

Next.js has gone through several rendering strategies:

| Era | Strategy | What it means |
|---|---|---|
| Next.js 9-12 | Pages Router + getServerSideProps | Every request hits the server |
| Next.js 12-13 | ISR | Pages cached, revalidated on schedule |
| Next.js 13+ | App Router + Server Components | Components run on server by default |

We use the **App Router** with **Server Components** — the latest paradigm.

**Server Components vs Client Components**

```
Server Component (default — no "use client" at top)
├── Runs on the server — ONLY on the server
├── Can directly call databases, APIs, read env vars
├── Output: HTML sent to browser
├── Cannot: useState, useEffect, event handlers, browser APIs
└── Example: page.tsx, layout.tsx, data-fetching components

Client Component ("use client" at the top)
├── Runs in the browser (and also on server for SSR)
├── Can: useState, useEffect, onClick, form events
├── Cannot: directly call databases or read server env vars
└── Example: ArticleQueue.tsx, AiConfigForm.tsx, AppSidebar.tsx
```

**In NewsForge, the pattern is:**

```
Server Component (page.tsx)
├── Fetches data from Express API using API_SECRET
├── Passes data as props to Client Component
└── Client Component handles all interactivity

Why this split?
- Server fetches data → no API calls from the browser → faster, more secure
- Client handles buttons/forms → browser interactivity works
```

**Server Actions — mutations without API routes**

Before Server Actions, to handle a form submission you'd need:
1. Client component calls `fetch('/api/update-status', ...)`
2. A Next.js API route handler at `/api/update-status/route.ts`
3. That handler calls the Express API

With Server Actions, step 2 disappears:

```typescript
// actions.ts
"use server"  // ← this makes it a Server Action

export async function updateArticleStatus(id: string, status: string) {
  await serverApi.patch(`/articles/${id}`, { status })  // runs on server
  revalidatePath("/admin/articles")                      // tells Next.js to re-fetch
}

// ArticleQueue.tsx (Client Component)
"use client"

<Button onClick={() => updateArticleStatus(article.id, "APPROVED")}>
  Approve
</Button>
```

When the button is clicked, Next.js transparently makes an HTTP request to a special internal endpoint, the function runs on the server, and the page is revalidated. The client never sees the API_SECRET or calls Express directly.

**`revalidatePath` — the key to fresh data**

After a mutation (approve/reject/update), we call `revalidatePath("/admin/articles")`. This tells Next.js's cache to throw away the cached render of that page. The next request will re-fetch fresh data from Express. Without this, the old data would show even after a successful update.

---

### NextAuth v5 — Authentication

**What NextAuth does**

NextAuth is an authentication library for Next.js. It handles:
- Sign-in flows (credentials, OAuth, magic links)
- Session management (who is logged in, for how long)
- Database adapter (storing users/sessions in PostgreSQL)

**JWT vs Database sessions**

NextAuth v5 supports two session strategies:

```
JWT (JSON Web Token) strategy:
├── Session data encoded into a signed cookie
├── No database lookup needed on every request
├── Cookie is stateless — contains user ID, role, expiry
├── Faster (no DB round-trip)
└── Default when using Credentials provider in v5

Database strategy:
├── Session stored as a row in the Session table
├── Every request looks up the session token in DB
├── Can be revoked instantly (delete the row)
└── Requires an adapter (PrismaAdapter)
```

**Why we use JWT strategy with PrismaAdapter**

NextAuth v5 enforces: **Credentials provider requires JWT strategy**. You cannot use database sessions with a username/password login. This is because OAuth providers need database sessions (to store OAuth tokens), but a simple credentials login doesn't benefit from database sessions — JWT is simpler and faster.

We keep the `PrismaAdapter` for user storage (so users exist in the DB) but sessions are stored as signed JWTs in a cookie, not in the database.

**The session callback — embedding role in the JWT**

```typescript
callbacks: {
  async jwt({ token, user }) {
    // Runs when JWT is first created (at login)
    if (user) {
      token.id = user.id
      token.role = (user as { role: string }).role
    }
    return token  // stored in the cookie
  },
  async session({ session, token }) {
    // Runs on every request to get session info
    session.user.id = token.id as string
    session.user.role = token.role as string
    return session  // what auth() returns in Server Components
  }
}
```

This embeds the user's role directly in the JWT cookie. No database lookup needed on every admin page request — just decode the cookie and check `session.user.role === "ADMIN"`.

---

### Express 5 — The API Server

**Why not Next.js API routes?**

Next.js API routes (or Route Handlers in App Router) are great for lightweight operations. But they have a fundamental problem: **they time out**. Vercel and most serverless platforms kill a function after 10-60 seconds. Background jobs that process YouTube videos or run scheduled tasks for hours simply cannot run in this environment.

Express 5 is a long-running Node.js server that:
- Never times out (it runs forever)
- Maintains persistent connections (to Redis, PostgreSQL)
- Runs BullMQ workers as background threads
- Handles all business logic independently of the frontend

**Router → Controller → Service pattern**

Every endpoint follows a strict three-layer pattern:

```
Request → Router (defines the route, applies middleware)
             ↓
          Controller (handles HTTP: reads req, writes res)
             ↓
          Service (pure business logic, no HTTP objects)
             ↓
          Database / External API
```

This means:
- Controllers never contain business logic (no `if` conditions about data)
- Services never know about HTTP (no `req`, `res`, status codes)
- Easy to test services in isolation without simulating HTTP

**Express 5 async error handling**

In Express 4, you had to wrap every async route in try/catch:
```typescript
// Express 4 — ugly
router.get("/articles", async (req, res, next) => {
  try {
    const articles = await articlesService.list()
    res.json(articles)
  } catch (err) {
    next(err)
  }
})
```

Express 5 handles async errors natively:
```typescript
// Express 5 — clean
router.get("/articles", async (req, res) => {
  const articles = await articlesService.list()
  res.json(articles)
  // if articlesService throws, Express 5 automatically calls next(err)
})
```

The global error handler in `middleware/error-handler.ts` catches all thrown errors and formats them into the standard `{ success: false, statusCode, message, error }` envelope.

---

### The API_SECRET Trust Pattern

**The problem**

The Next.js web app needs to call the Express API with admin privileges (e.g. to list DRAFT articles for the review queue). But how does Express know the request is legitimate?

Option 1: Pass the user's JWT to Express and verify it there.
- Requires Express to know the NEXTAUTH_SECRET
- Requires JWT verification logic in Express middleware
- Tightly couples Next.js auth to Express

Option 2: Use a shared secret between Next.js and Express.
- Simple. One env variable.
- Next.js is trusted as an internal service
- The role check happens at the Next.js layer (before calling Express)

We chose Option 2.

**How it works**

```
Browser → Next.js Server Component
               │
               │ 1. auth() checks JWT cookie → user is ADMIN
               │    if not ADMIN → redirect("/login")
               ▼
         Next.js Server Component
               │
               │ 2. serverApi.get("/admin/articles")
               │    Header: "Authorization: Bearer <API_SECRET>"
               ▼
         Express API
               │
               │ 3. require-admin middleware checks:
               │    if (token === API_SECRET) → trusted, next()
               ▼
         Controller → Service → Database → Response
```

The `API_SECRET` is a long random string known only to Next.js and Express. It never reaches the browser. Express trusts any request with this token unconditionally — the role check already happened in Next.js.

---

### Environment Variables — The Split Pattern

**The problem**

Next.js bundles JavaScript that runs in both the server and the browser. If you import a module with server-only secrets (like `NEXTAUTH_SECRET` or `API_SECRET`) from a client component, Next.js strips those values (they become `undefined`). Your Zod validation then fails at runtime.

**The wrong way — one env.ts for everything**

```typescript
// env.ts — WRONG
const schema = z.object({
  NEXT_PUBLIC_API_URL: ...,  // safe for client
  NEXTAUTH_SECRET: ...,      // server-only — STRIPPED in client bundle
  API_SECRET: ...,           // server-only — STRIPPED in client bundle
})
// Throws "Invalid environment variables" when evaluated client-side
```

**The right way — split into two files**

```
lib/env.ts         → NEXT_PUBLIC_* vars only — safe to import anywhere
lib/env-server.ts  → All server-only vars + import "server-only" at top
```

The `import "server-only"` is a special Next.js package. When Turbopack (Next.js's bundler) encounters this import in a file, it refuses to bundle that file into the client bundle. If you accidentally import a server-only module from a client component, you get a **build error** (intentional and helpful) rather than a silent runtime failure.

```typescript
// env-server.ts
import "server-only"  // ← hard boundary — build fails if imported client-side
import { z } from "zod"

export const serverEnv = { API_SECRET, NEXTAUTH_SECRET, ... }

// api-server.ts — only imported in Server Components / Server Actions
import { serverEnv } from "@/lib/env-server"
// Safe — never reaches the browser
```

---

### Prisma — The ORM

**What an ORM does**

An ORM (Object-Relational Mapper) lets you interact with a SQL database using TypeScript objects instead of raw SQL strings.

Without Prisma:
```sql
SELECT id, title, status FROM "Article" WHERE status = 'APPROVED' LIMIT 20;
```

With Prisma:
```typescript
const articles = await prisma.article.findMany({
  where: { status: "APPROVED" },
  select: { id: true, title: true, status: true },
  take: 20,
})
// articles is fully typed: Array<{ id: string, title: string, status: ArticleStatus }>
```

**Why Prisma over raw SQL or other ORMs?**

- **Type safety**: the generated client knows the exact shape of every table. No guessing field names.
- **Migrations**: `bun run db:migrate` generates a SQL migration file AND applies it. You have a full history of every schema change.
- **Schema as single source of truth**: `schema.prisma` defines everything. Both the database structure and the TypeScript types come from this one file.
- **Monorepo setup**: we generate the Prisma client to `packages/db/src/generated/prisma` and both the web app and server import it from `@news-app/db`. One schema, used everywhere.

**Custom output path — why?**

Bun doesn't create a standard `node_modules/@prisma/client` the way npm does. So we set:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}
```

The client is generated locally in the package and imported directly. This is tracked in git so you don't need to run `db:generate` on every fresh clone.

---

### Zod — Runtime Validation

**The problem Zod solves**

TypeScript types disappear at runtime. If an API returns `{ status: "oops" }` when you expected `{ status: "APPROVED" }`, TypeScript won't catch that — it already compiled and types are erased. Zod validates the actual data at runtime.

**How we use Zod**

1. **Environment variables** — validated at startup in `env.ts`/`env-server.ts`. If a required env var is missing, the app refuses to start rather than failing mysteriously later.

2. **Request bodies** — every POST/PATCH endpoint uses a Zod schema via the `validate` middleware:
```typescript
const updateArticleSchema = z.object({
  status: z.enum(["DRAFT", "REVIEW", "APPROVED", "REJECTED", "ARCHIVED"]).optional(),
  title: z.string().min(1).optional(),
})
router.patch("/:id", requireAdmin, validate(updateArticleSchema), controller.update)
```
If a request body doesn't match, the middleware returns a 400 error before the controller ever runs.

3. **Forms** — `AiConfigForm.tsx` uses `zodResolver` from `@hookform/resolvers/zod`, so the same Zod schema validates the form client-side before submission.

---

### Shadcn UI — The base-ui Variant

**What Shadcn UI is**

Shadcn UI is not a component library you install as a package. It's a **collection of component recipes** — you copy the source code of each component into your project using the CLI (`bunx shadcn@latest add button`). You own the code and can modify it.

**The base-ui vs radix-ui difference**

The latest Shadcn CLI generates components using `@base-ui/react` (a newer, leaner React UI library from the same team that made Radix UI) instead of the older `@radix-ui/react-*` packages.

This changes some APIs:

| Old Radix pattern | New base-ui pattern |
|---|---|
| `<Button asChild><Link href="/admin" /></Button>` | `<Button render={<Link href="/admin" />}>` |
| `<Select onValueChange={setValue}>` accepts `string` | `<Select onValueChange={(val) => { if(val) setValue(val) }}>` — `val` can be `null` |
| Uses `@radix-ui/react-slot` for `asChild` | Uses `@base-ui/react/use-render` `render` prop |

The **`render` prop** is the base-ui equivalent of `asChild`. Instead of passing a child element that becomes the root, you pass `render={<element />}` and base-ui merges all props onto it.

```typescript
// Shadcn Sidebar link — old asChild pattern (doesn't work with base-ui)
<SidebarMenuButton asChild>
  <Link href="/admin/articles">Articles</Link>
</SidebarMenuButton>

// Correct base-ui pattern
<SidebarMenuButton render={<Link href="/admin/articles" />}>
  Articles
</SidebarMenuButton>
```

---

### The Monorepo — Bun Workspaces

**What a monorepo is**

A monorepo puts multiple projects (packages/apps) in one git repository. Instead of separate repos for `web`, `server`, `db`, and `types`, they all live in `news-app/` and share dependencies.

**Why Bun workspaces?**

```
news-app/package.json defines workspaces:
  - apps/web
  - apps/server
  - packages/db
  - packages/types

When you run `bun install` at the root:
- All packages are installed once in the root node_modules
- Workspace packages are symlinked
- @news-app/db can be imported by both web and server without publishing to npm
```

**Shared packages**

```
packages/db     → exports { prisma } from Prisma generated client
                  imported by: apps/server (for all DB queries)
                               apps/web (for NextAuth PrismaAdapter)

packages/types  → exports TypeScript interfaces: ArticleListItem, AIConfig, etc.
                  imported by: apps/server (service return types)
                               apps/web (API response types, form schemas)
```

This means when the `Article` type changes, you update it once in `packages/types` and both apps get the update automatically — with TypeScript catching any mismatches.

---

### The Full Request Lifecycle — Everything Together

Here is what happens end-to-end when an admin approves an article:

```
1. Admin opens /admin/articles in browser
   └── Next.js Server Component renders
       └── auth() decodes JWT cookie → role: "ADMIN" ✓
       └── serverApi.get("/admin/articles?status=DRAFT")
           └── HTTP GET to Express, Header: Bearer API_SECRET
           └── Express: requireAdmin checks API_SECRET ✓
           └── articlesController.list → articlesService.list
           └── prisma.article.findMany({ where: { status: "DRAFT" } })
           └── Returns JSON: { success: true, data: { items: [...] } }
       └── Page renders with ArticleQueue client component

2. Admin clicks "Approve" on an article
   └── ArticleQueue.tsx (Client Component) calls updateArticleStatus() Server Action
   └── Browser → Next.js internal endpoint (hidden, no URL)
   └── Server Action runs on server:
       └── serverApi.patch("/articles/abc123", { status: "APPROVED" })
           └── HTTP PATCH to Express, Header: Bearer API_SECRET
           └── Express: requireAdmin ✓ → validate schema ✓
           └── articlesController.update → articlesService.update
           └── prisma.article.update({ where: { id }, data: { status: "APPROVED" } })
       └── revalidatePath("/admin/articles") — cache cleared
   └── Returns { success: true }

3. ArticleQueue shows toast "Article approved"
   └── Next.js automatically re-fetches /admin/articles (cache cleared)
   └── Fresh data from Express → table updates without page reload
```

This is the full stack in action: browser → Server Action → Express API → Prisma → PostgreSQL → revalidation → fresh render.

---

## 17. YouTube Manual Ingest — Complete Walkthrough

> This section explains every file involved in the YouTube manual ingest pipeline, line by line in plain English.

---

### The Big Picture

Admin pastes a YouTube URL → Next.js sends it to Express → Express creates a database record and pushes a job into Redis → A BullMQ worker picks it up → Worker fetches the video transcript → Sends transcript to Claude AI → AI generates a full article → Article saved as DRAFT → Appears in the admin review queue.

---

### Step 1: The Form — `IngestForm.tsx`

This is a **Client Component** (runs in the browser). It renders a simple form with one text input.

```
"use client"
```
This line tells Next.js: "this component runs in the browser, not on the server." We need this because the form has interactive state (typing, button clicks, loading spinner).

```
const [url, setUrl] = useState("")
const [isPending, startTransition] = useTransition()
```
- `url` — holds whatever the admin types into the input box
- `isPending` — `true` while the server action is running. We use this to show a loading spinner and disable the button so they don't click twice
- `useTransition` — React 19 hook that lets us run async work (the server action) without blocking the UI

```
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  startTransition(async () => {
    const result = await ingestYoutubeUrl(url.trim())
    if (result.success) toast.success(...)
    else toast.error(...)
  })
}
```
When the form is submitted:
1. `e.preventDefault()` — stops the browser from doing a full page reload (default form behaviour)
2. `startTransition(...)` — wraps the async call so React can show the loading state
3. `ingestYoutubeUrl(url)` — calls the **Server Action** (next step)
4. Shows a success or error toast depending on the result

---

### Step 2: The Server Action — `ingest/actions.ts`

```
"use server"
```
This file runs on the **Next.js server**, never in the browser. The browser calls it like a function, but under the hood Next.js sends an HTTP POST to an internal endpoint.

```
export async function ingestYoutubeUrl(url: string, topicId?: string) {
  const data = await serverApi.post("/admin/ingest/youtube", { url, topicId })
  return { success: true, data }
}
```
- `serverApi.post(...)` — sends an HTTP POST to the Express server at `localhost:3001/api/v1/admin/ingest/youtube`
- The request includes `Authorization: Bearer API_SECRET` (added automatically by `serverApi`)
- If the Express server returns an error, the catch block returns `{ success: false, error: "..." }`

---

### Step 3: The Express Endpoint — `ingest.controller.ts`

This runs in the Express server process (port 3001), completely separate from Next.js.

```
const { url, topicId } = req.body
```
Reads the YouTube URL and optional topic ID from the request body.

```
const videoId = extractVideoId(url)
if (!videoId) throw new ValidationError("Invalid YouTube URL")
```
Calls `extractVideoId()` from `youtube.service.ts` — this uses a regex to pull out the 11-character video ID from any YouTube URL format (youtube.com/watch?v=xxx, youtu.be/xxx, youtube.com/shorts/xxx).

```
const jobRun = await prisma.jobRun.create({
  data: { type: "YOUTUBE_PROCESS", status: "PENDING", payload: { videoId, videoUrl: url } }
})
```
Creates a **JobRun** record in PostgreSQL. This is the tracking record — it stores what job was requested, when, and eventually whether it succeeded or failed. Status starts as `PENDING`.

```
const bullJob = await youtubeProcessQueue.add("process-video", { videoId, videoUrl: url })
```
This is the key line. `youtubeProcessQueue` is a BullMQ Queue connected to Redis. `.add()` pushes a JSON message into Redis. The message contains the video ID and URL. BullMQ stores it in a Redis list called something like `bull:youtube-process:waiting`.

At this point, the Express endpoint returns immediately with a 201 response. The admin sees "Video queued for processing" in the UI. The actual processing happens asynchronously in the background.

```
await prisma.jobRun.update({ where: { id: jobRun.id }, data: { bullJobId: bullJob.id } })
```
Saves the BullMQ job ID back to the database record so we can cancel the job later if needed.

---

### Step 4: The YouTube Service — `youtube.service.ts`

This file contains three helper functions used by the worker.

**`extractVideoId(url)`**
```
const VIDEO_ID_REGEX = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
```
A regex that handles all common YouTube URL formats and captures the 11-character video ID.

**`fetchVideoMeta(videoId)`**
```
const oembedUrl = `https://www.youtube.com/oembed?url=...&format=json`
const res = await fetch(oembedUrl)
```
YouTube's oEmbed API is a free, no-key-needed endpoint that returns basic video metadata (title, channel name). We use this instead of the YouTube Data API v3 to avoid needing a YOUTUBE_API_KEY for manual ingest.

**`fetchTranscript(videoId)`**
```
const segments = await YoutubeTranscript.fetchTranscript(videoId, { lang: "en" })
const text = segments.map((s) => s.text).join(" ")
```
The `youtube-transcript` npm package fetches the auto-generated captions (subtitles) for a video. YouTube generates these automatically for most videos. Each segment has `.text` (the words spoken), `.offset` (when in the video), and `.duration` (how long). We join all the text segments into one big string.

If the video has no captions (private video, music-only, etc.), this throws an error and the job fails.

---

### Step 5: The Worker — `youtube-process.worker.ts`

This is a **BullMQ Worker**. It runs inside the Express server process and continuously polls Redis for new jobs.

```
export function startYoutubeProcessWorker(): Worker {
  const worker = new Worker(QUEUE_NAME, processYoutubeVideo, {
    connection: { url: env.REDIS_URL },
    concurrency: 2,
  })
}
```
- `QUEUE_NAME` is `"youtube-process"` — must match the queue name in `queues.ts`
- `processYoutubeVideo` — the function that runs for each job
- `concurrency: 2` — process up to 2 videos at the same time

This worker starts when the server boots (called from `index.ts`).

**The `processYoutubeVideo` function:**

```
const { videoId, videoUrl, topicId } = job.data
```
BullMQ passes the job data (the same object we `.add()`-ed in the controller).

```
// 1. Update JobRun to RUNNING
await prisma.jobRun.update({ where: { id: jobRun.id }, data: { status: "RUNNING" } })
```
Marks the database record as "in progress" so the admin can see it's being worked on.

```
// 2. Fetch metadata + transcript
const meta = await fetchVideoMeta(videoId)
const { text: transcript } = await fetchTranscript(videoId)
```
Gets the video title, channel name, and full transcript text.

```
// 3. Get topic keywords
let topicKeywords: string[] = []
if (topicId) {
  const topic = await prisma.topic.findUnique({ where: { id: topicId } })
  if (topic) topicKeywords = topic.keywords
}
```
If the admin selected a topic (optional), we load its keywords. These get embedded into the AI prompt so the article focuses on relevant themes.

```
// 4. Generate article via AI
const result = await aiService.generateArticleFromTranscript(transcript, topicKeywords, meta)
```
This is where the magic happens. `aiService` sends the transcript to Claude (or whichever AI provider is configured) with a detailed prompt asking for a structured JSON response containing: title, slug, excerpt, content (markdown), meta tags, keywords, suggested category, and tags.

The AI returns something like:
```json
{
  "title": "How Self-Driving Cars Are Reshaping Urban Transport",
  "slug": "self-driving-cars-reshaping-urban-transport",
  "content": "## The Rise of Autonomous Vehicles\n\n...",
  "excerpt": "A deep dive into how autonomous vehicles...",
  "suggestedCategory": "Technology",
  "suggestedTags": ["autonomous vehicles", "AI", "transportation"]
}
```

```
// 5. Resolve category
const category = await prisma.category.findFirst({
  where: { name: { equals: result.suggestedCategory, mode: "insensitive" } }
})
```
The AI suggests a category name like "Technology". We look it up in the database. If it exists, we link the article to it. If not, the article has no category (the admin can set one later).

```
// 6. Resolve/create tags
for (const tagName of result.suggestedTags) {
  const tag = await prisma.tag.upsert({ where: { slug }, update: {}, create: { name, slug } })
  tagIds.push(tag.id)
}
```
`upsert` means "find it if it exists, or create it if it doesn't." This ensures we don't create duplicate tags — if "AI" already exists as a tag, we reuse it.

```
// 7. Create article
const article = await prisma.article.create({
  data: {
    title: result.title,
    slug: articleSlug,
    content: result.content,
    status: "DRAFT",
    sourceType: "YOUTUBE_VIDEO",
    sourceUrl: videoUrl,
    aiGenerated: true,
    aiModel: result.aiModel,
    aiPromptVersion: result.aiPromptVersion,
    ...
  }
})
```
Creates the article in the database with:
- `status: "DRAFT"` — it goes to the review queue, never published automatically
- `sourceType: "YOUTUBE_VIDEO"` — tracks where the content came from
- `sourceUrl` — the original YouTube URL (for reference/attribution)
- `aiGenerated: true` — marks it as AI-written
- `aiModel` / `aiPromptVersion` — records exactly which model and prompt version generated it (for auditing)

```
// 8. Update JobRun to COMPLETED
await prisma.jobRun.update({
  where: { id: jobRun.id },
  data: { status: "COMPLETED", completedAt: new Date(), result: { articleId, articleTitle } }
})
```
Marks the job as done and stores the result (which article was created).

If anything fails at any step, the catch block:
1. Updates the JobRun to `FAILED` with the error message
2. Re-throws the error so BullMQ retries (up to 3 attempts with exponential backoff: 5s, 10s, 20s)

---

### Step 6: The Admin Dashboard — `StatsCards.tsx`

The `/admin` page is now a proper dashboard instead of a redirect. It fetches stats from `GET /admin/stats` and displays them in card grids.

```
const stats = await serverApi.get<AdminStats>("/admin/stats")
```
Returns counts: how many articles are in each status, how many jobs ran today, how many sources are active.

`StatsCards` is a simple component that maps over the stats and renders a grid of `Card` components from Shadcn. Each card shows a label, a number, and an icon. Nothing interactive — pure display.

---

### Step 7: Queue Registration — `queues.ts`

```
export const youtubeProcessQueue = new Queue("youtube-process", {
  connection: bullMQConnection,
  defaultJobOptions: { attempts: 3, backoff: { type: "exponential", delay: 5000 } }
})
```
- `"youtube-process"` — the queue name. Must match the worker's `QUEUE_NAME`
- `connection` — URL-based Redis connection. BullMQ stores all job state in Redis under keys like `bull:youtube-process:waiting`, `bull:youtube-process:completed`, etc.
- `attempts: 3` — if the job fails, retry up to 3 times
- `backoff: exponential, 5000` — wait 5 seconds before first retry, 10 seconds before second, 20 seconds before third

---

### The Complete Request Flow (End to End)

> See the full detailed flows in the **Smart Split AI Pipeline** section above — Path A (single article) and Path B (smart split → multiple articles). Those replace this summary.
