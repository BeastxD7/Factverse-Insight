# NewsForge — Concept, Architecture & Implementation Guide

> AI-powered news and content platform that automatically generates SEO-optimised articles from multiple sources including live news feeds, RSS, Google Trends, YouTube videos, and podcasts.

---

## Table of Contents

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

---

## 1. Project Concept

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
├── /                          Homepage (featured + latest articles)
├── /articles                  All articles (paginated)
├── /articles/[slug]           Article detail (ISR, revalidate 1hr)
├── /category/[slug]           Category listing
├── /tag/[slug]                Tag listing
└── /search                    Search results

Auth
├── /login
└── /register

Admin (/admin)
├── /admin                     Dashboard (stats overview)
├── /admin/articles            Review queue (DRAFT articles)
├── /admin/articles/[id]       Edit/review single article
├── /admin/sources             Content source management
├── /admin/channels            YouTube channel monitor
├── /admin/topics              Topic/niche configuration
├── /admin/jobs                Job run history & status
└── /admin/settings            Platform settings
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
│   1    │ FOUNDATION                                             │
│        │ • Bun monorepo scaffold                                │
│        │ • Docker (PostgreSQL + Redis)                          │
│        │ • Prisma schema + migrations                           │
│        │ • Express skeleton + health endpoint                   │
│        │ • Next.js + Tailwind + Shadcn                         │
│        │ • NextAuth v5 (credentials, Prisma adapter)           │
│        │ • CLAUDE.md conventions                                │
│        │ ✓ Goal: bun dev starts both apps, auth works          │
├────────┼────────────────────────────────────────────────────────┤
│   2    │ CORE READ/WRITE PATH                                   │
│        │ • Public article pages (SSG/ISR)                       │
│        │ • Category, tag, search pages                          │
│        │ • Admin article review queue                           │
│        │ • Admin approve/reject/edit actions                    │
│        │ • Sitemap + robots + SEO metadata                     │
│        │ ✓ Goal: manually inserted articles visible + managed  │
├────────┼────────────────────────────────────────────────────────┤
│   3    │ MANUAL INGEST PIPELINE                                 │
│        │ • Claude service (all 3 generation functions)         │
│        │ • YouTube URL ingest endpoint                          │
│        │ • Audio/podcast upload endpoint                        │
│        │ • youtube-process + audio-process workers             │
│        │ • Duration-based article splitting                     │
│        │ • Admin ingest UI                                      │
│        │ ✓ Goal: paste YT URL → DRAFT articles in queue       │
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

# 3. Start PostgreSQL + Redis
bun run docker:up

# 4. Run database migrations
bun run db:migrate

# 5. Seed the database (creates admin user + default categories)
bun run db:seed

# 6. Generate Prisma client (if not done already)
bun run db:generate
```

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

*Last updated: Phase 1 — Foundation complete*
*Next milestone: Phase 2 — Core read/write path*
