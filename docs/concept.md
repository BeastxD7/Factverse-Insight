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

Step 5 — Splitting (for long content)
  If the content is long (a 60-minute podcast, for example), it would make
  a terrible single article. So the worker splits it into segments:
  - Under 10 minutes → 1 article
  - 10–20 minutes → 2 articles
  - 20–40 minutes → 3 articles
  - 40–60 minutes → 4 articles
  - Over 60 minutes → 5 or more articles
  Each segment covers a distinct topic or chapter from the content.

Step 6 — AI Writing (Claude)
  For each segment (or for each news item), the worker sends the text to
  Claude AI (Anthropic's model) with a detailed prompt that says:
  "Write a high-quality, SEO-optimised news article about this. Include
  a compelling title, a meta description, proper headings, naturally
  embedded keywords, and a clear structure."
  Claude responds with a fully written article.

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
                   │  3. Split by duration  │
                   │  4. Generate articles  │
                   └────────────┬───────────┘
                                │
                                ▼
                   ┌────────────────────────┐
                   │   Claude AI (Anthropic) │
                   │                        │
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

### Redis — The In-Memory Message Broker

**What it is**

Redis is an in-memory key-value store. Unlike PostgreSQL (which writes everything to disk), Redis keeps data in RAM. This makes it incredibly fast — it can handle hundreds of thousands of operations per second. But it's not a replacement for a real database; it's a specialist tool for specific jobs.

In NewsForge, Redis has one job: **holding the job queue**.

**Why Redis for a queue?**

When a background job needs to happen (e.g. "process this YouTube video"), you need somewhere reliable to put that task so it isn't lost even if the server crashes. You could put it in PostgreSQL, but that's slow and adds unnecessary load to your main database. Redis is perfect for this because:

- It's blazing fast (reads/writes in microseconds)
- It supports list and sorted-set data structures natively — which is exactly what a job queue needs (push to back, pop from front, sorted by priority/delay)
- It persists data to disk periodically (so jobs survive server restarts)
- It supports pub/sub (publish/subscribe), which BullMQ uses to notify workers of new jobs

**How Redis fits in our system**

```
Express server starts
        │
        ▼
BullMQ Queue connects to Redis
(creates a key like "bull:youtube-process:waiting")
        │
        ▼
Admin triggers manual ingest (YouTube URL)
        │
        ▼
Express adds job to BullMQ queue
→ BullMQ pushes a JSON blob into Redis list
        │
        ▼
BullMQ Worker (listening on Redis) picks up the job
→ Processes it
→ Marks it complete in Redis
→ Result stored in PostgreSQL
```

Redis itself runs in a Docker container (`docker-compose.yml`) on port 6379. We connect to it with the `REDIS_URL` environment variable.

---

### BullMQ — The Job Queue (Node.js equivalent of Celery)

**The Python analogy**

If you've used Python, you've probably heard of **Celery** — a distributed task queue that lets you run jobs asynchronously (in the background). BullMQ is the Node.js/TypeScript equivalent. Both use Redis as their backend.

| Python world | Node.js world (NewsForge) |
|---|---|
| Celery | BullMQ |
| Redis | Redis (same!) |
| `@celery.task` decorator | Worker class with `process()` |
| `task.delay()` | `queue.add(name, data)` |
| Celery Beat (scheduler) | BullMQ `repeat` option |
| Flower (monitor) | Bull Board (future) |

**Core concepts in BullMQ**

```
Queue  → A named channel where jobs live. Think of it as a to-do list.
         Example: "youtube-process" queue holds all YT processing tasks.

Job    → A single unit of work. JSON data describing what to do.
         Example: { videoId: "abc123", topicId: "tech-001" }

Worker → A function that consumes jobs from a queue.
         It runs: await processJob(job.data)

Scheduler → Adds repeat jobs on a cron schedule.
             Example: add a "fetch news" job every 30 minutes.
```

**How we use BullMQ**

All queues are defined in `apps/server/src/workers/queues.ts` — a single registry. Workers import queues from there. This prevents multiple Queue instances pointing to the same Redis key (which would cause bugs).

```typescript
// queues.ts — the single registry
export const newsQueue    = new Queue("news-fetch",    { connection })
export const rssQueue     = new Queue("rss-fetch",     { connection })
export const ytQueue      = new Queue("youtube-process", { connection })

// news-fetch.worker.ts — imports from registry, never creates new Queue
import { newsQueue } from "./queues"

const worker = new Worker("news-fetch", async (job) => {
  // process the job
  await fetchAndGenerateArticles(job.data)
}, { connection })
```

**Retry policy — why exponential backoff?**

Every worker has `attempts: 3` and `backoff: { type: "exponential", delay: 5000 }`. If a job fails (network error, Claude API timeout, etc.):

- Attempt 1 fails → wait 5 seconds → retry
- Attempt 2 fails → wait 25 seconds → retry  (5² = 25)
- Attempt 3 fails → wait 125 seconds → retry  (5³ = 125)
- All 3 fail → job moves to "failed" list

This is called **exponential backoff**. The idea is: if something is failing, hammering it immediately makes it worse (especially for rate-limited external APIs). Waiting longer between attempts gives the external service time to recover.

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

```
Admin pastes: https://www.youtube.com/watch?v=dQw4w9WgXcQ

1. Browser → IngestForm.tsx (Client Component)
   └── handleSubmit() called
   └── startTransition → ingestYoutubeUrl("https://...")

2. Next.js Server → ingest/actions.ts (Server Action)
   └── serverApi.post("/admin/ingest/youtube", { url })
   └── HTTP POST to Express:3001, Header: Bearer API_SECRET

3. Express Server → ingest.controller.ts
   └── extractVideoId("https://...") → "dQw4w9WgXcQ"
   └── prisma.jobRun.create({ type: "YOUTUBE_PROCESS", status: "PENDING" })
   └── youtubeProcessQueue.add("process-video", { videoId, videoUrl })
       └── BullMQ pushes JSON into Redis list
   └── Returns 201: { jobRunId, videoId, status: "PENDING" }

4. Browser shows toast: "Video queued for processing"

5. BullMQ Worker (running in background) picks up job from Redis
   └── youtube-process.worker.ts → processYoutubeVideo()
   └── Updates JobRun to RUNNING
   └── fetchVideoMeta("dQw4w9WgXcQ") → { title, channelName }
   └── fetchTranscript("dQw4w9WgXcQ") → "Never gonna give you up..."
   └── aiService.generateArticleFromTranscript(transcript, keywords, meta)
       └── Sends prompt to Claude/Groq/OpenRouter (whichever is active)
       └── Receives JSON: { title, slug, content, category, tags }
   └── prisma.article.create({ status: "DRAFT", sourceType: "YOUTUBE_VIDEO" })
   └── Updates JobRun to COMPLETED

6. Admin navigates to /admin/articles → sees new DRAFT article
   └── Can read, edit, approve, or reject it
```
