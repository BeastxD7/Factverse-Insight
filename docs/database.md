# Database Documentation — Factverse Insights

> A plain-English guide to every database table, why it exists, what it stores, how tables relate to each other, and exactly how data flows through the system — from a user logging in to an article being published.

---

## Table of Contents

1. [Overview](#1-overview)
2. [The Database at a Glance](#2-the-database-at-a-glance)
3. [Auth Tables](#3-auth-tables) — `users`, `accounts`, `sessions`, `verification_tokens`
4. [Content Tables](#4-content-tables) — `articles`, `article_tags`, `categories`, `tags`
5. [Pipeline Tables](#5-pipeline-tables) — `topics`, `content_sources`, `youtube_channels`, `media_uploads`, `job_runs`
6. [Config Table](#6-config-table) — `ai_configs`
7. [Enums Explained](#7-enums-explained)
8. [Relationships Map](#8-relationships-map)
9. [Data Flow Walkthroughs](#9-data-flow-walkthroughs)
   - [How login works](#91-how-login-works)
   - [How a YouTube video becomes an article](#92-how-a-youtube-video-becomes-an-article)
   - [How a reader views an article](#93-how-a-reader-views-an-article)
   - [How an admin approves an article](#94-how-an-admin-approves-an-article)
10. [Indexes & Performance](#10-indexes--performance)
11. [Cascade Deletes](#11-cascade-deletes)

---

## 1. Overview

The database is **PostgreSQL 16**, managed through **Prisma 6** (an ORM — Object Relational Mapper). Prisma lets us write TypeScript objects instead of raw SQL, and automatically generates a typed client so every query is checked at compile time.

**Where the schema lives:** `packages/db/prisma/schema.prisma`
**Where the generated client lives:** `packages/db/src/generated/prisma/`
**How to apply changes:** `bun run db:migrate` (creates a migration file + applies it)
**How to view data visually:** `bun run db:studio` (opens Prisma Studio in browser)

The database has **13 tables** split into four groups:

| Group | Tables | Purpose |
|---|---|---|
| Auth | users, accounts, sessions, verification_tokens | Who can log in, how sessions work |
| Content | articles, article_tags, categories, tags | The actual published content |
| Pipeline | topics, content_sources, youtube_channels, media_uploads, job_runs | How content is discovered and processed |
| Config | ai_configs | AI provider settings |

---

## 2. The Database at a Glance

Here is the complete picture of how every table connects to every other table:

```
users ──────────────── accounts (1 user → many OAuth accounts)
  │
  └─────────────────── sessions (1 user → many login sessions)

categories ─────────── articles (1 category → many articles)
  │
  └─────────────────── topics (1 category → many topics)

articles ───────────── article_tags ─── tags (many-to-many via join table)
  │
  └─────────────────── job_runs (1 job run → many articles)

topics ──────────────── content_sources (1 topic → many sources)
  │
  └─────────────────── youtube_channels (1 topic → many channels)

content_sources ─────── job_runs (1 source → many job runs)
youtube_channels ─────── job_runs (1 channel → many job runs)
```

---

## 3. Auth Tables

These four tables are the standard NextAuth v5 tables. You don't touch them manually — NextAuth writes to them automatically.

---

### `users` table

**Why it exists:** Stores every person who has an account — both regular readers and admins.

| Column | Type | Example | What it means |
|---|---|---|---|
| `id` | String (cuid) | `clxyz123...` | Unique ID generated automatically |
| `email` | String (unique) | `admin@factverse.com` | Login email — must be unique |
| `emailVerified` | DateTime? | `2025-01-15 10:30:00` | When email was verified (null if not) |
| `name` | String? | `John Doe` | Display name |
| `image` | String? | `https://...` | Profile picture URL |
| `role` | Role enum | `ADMIN` or `USER` | What they can do on the site |
| `passwordHash` | String? | `$2b$10$...` | Bcrypt-hashed password (null for OAuth users) |
| `createdAt` | DateTime | auto | When account was created |
| `updatedAt` | DateTime | auto | Last time anything changed |

**The `role` field is critical.** Every admin API call checks `session.user.role === "ADMIN"`. Without the `ADMIN` role, you can't access `/admin`, approve articles, or use any protected endpoints.

**Example row:**
```
id: "clxyz123abc"
email: "admin@factverseinsights.com"
name: "Admin"
role: ADMIN
passwordHash: "$2b$10$hashedpassword..."
createdAt: 2025-01-01
```

---

### `accounts` table

**Why it exists:** Handles OAuth logins (Google, GitHub, etc.). When you sign in with Google, NextAuth creates an Account row linking your Google identity to your User row.

Each user can have **multiple accounts** (e.g. sign in with both Google and GitHub for the same email).

| Column | What it means |
|---|---|
| `userId` | Which user this OAuth account belongs to |
| `provider` | `"google"`, `"github"`, `"credentials"` |
| `providerAccountId` | The ID given by that provider (e.g. your Google user ID) |
| `access_token` | OAuth access token (so we can call Google APIs on your behalf) |
| `refresh_token` | Used to get a new access token when the old one expires |

**For this project**, we mainly use `"credentials"` provider (email + password), so this table mostly has rows with `provider: "credentials"`.

---

### `sessions` table

**Why it exists:** Tracks active login sessions. When you log in, NextAuth creates a session row with an expiry date. Every page load checks this table to verify you're still logged in.

| Column | What it means |
|---|---|
| `sessionToken` | Random secret token stored in your browser cookie |
| `userId` | Which user this session belongs to |
| `expires` | When this session expires and you'll be logged out |

**How it works in practice:**
1. You visit `/admin`
2. Next.js calls `auth()` which reads your cookie
3. It looks up the `sessionToken` in this table
4. If found and not expired → you're logged in
5. If not found or expired → redirect to `/login`

---

### `verification_tokens` table

**Why it exists:** Used for email verification links and password reset links. When NextAuth sends you a "verify your email" email, it stores a token here. When you click the link, it checks this table.

Not heavily used in the current setup since we use password-based auth directly.

---

## 4. Content Tables

These are the heart of the platform — where your articles, categories, and tags live.

---

### `articles` table

**Why it exists:** Every published piece of content lives here. This is the most important table in the whole database.

| Column | Type | Example | What it means |
|---|---|---|---|
| `id` | String (cuid) | `clxyz...` | Unique ID |
| `title` | String | `"How AI is changing..."` | Article headline |
| `slug` | String (unique) | `how-ai-is-changing` | URL-friendly version of title, used in `/articles/[slug]` |
| `excerpt` | Text? | `"A deep dive into..."` | Short summary shown in lists and search results |
| `content` | Text | `"## Introduction\n..."` | Full article body in **Markdown** format |
| `metaTitle` | String? | `"How AI Changes News"` | Custom SEO title (overrides `title` in `<head>`) |
| `metaDescription` | Text? | `"Learn how..."` | Custom SEO description (overrides `excerpt` in `<head>`) |
| `ogImage` | String? | `https://img.youtube.com/...` | Cover image URL (shown in social shares and at top of article) |
| `keywords` | String[] | `["AI","news","tech"]` | Array of SEO keywords |
| `status` | ArticleStatus | `DRAFT` | Current state in editorial workflow |
| `publishedAt` | DateTime? | `2025-03-01` | When it went live (null until approved) |
| `featured` | Boolean | `false` | Whether it shows in the featured slot on homepage |
| `viewCount` | Int | `1247` | How many times it's been viewed (auto-incremented on each visit) |
| `sourceType` | SourceType? | `YOUTUBE_VIDEO` | Where the content came from |
| `sourceUrl` | Text? | `https://youtube.com/...` | Link back to original source |
| `sourceId` | String? | `dQw4w9WgXcQ` | Original source identifier (e.g. YouTube video ID) |
| `aiGenerated` | Boolean | `true` | Whether AI wrote this article |
| `aiModel` | String? | `o3-mini` | Which AI model was used |
| `aiPromptVersion` | String? | `article-v1` | Which prompt template generated this |
| `categoryId` | String? | foreign key | Which category this belongs to |
| `jobRunId` | String? | foreign key | Which pipeline job created this |

**The `status` field controls the editorial workflow:**

```
DRAFT → REVIEW → APPROVED → (published on site)
               ↓
            REJECTED
               ↓
            ARCHIVED
```

Only articles with `status: "APPROVED"` are visible to readers on the public site.

**The `slug` field is how readers find articles.** If the title is `"How AI is Changing Journalism"`, the slug becomes `how-ai-is-changing-journalism`, making the URL `/articles/how-ai-is-changing-journalism`. Slugs must be unique — if two articles have the same title, the second one gets `-1`, `-2` etc. appended.

---

### `categories` table

**Why it exists:** Groups articles into topics like "Technology", "Politics", "Science". Each article can belong to one category.

| Column | Example | What it means |
|---|---|---|
| `name` | `"Technology"` | Display name shown to readers |
| `slug` | `"technology"` | Used in URL filters like `/?category=technology` |
| `description` | `"News about tech..."` | Optional description |

**Example categories (seeded by default):**
- Technology
- Politics
- Business
- Science
- World News
- Health

A category can have **many articles**, but each article can only be in **one category**.

---

### `tags` table

**Why it exists:** More granular labels than categories. An article about an AI startup might be in category "Technology" but have tags `["OpenAI", "startup", "funding"]`. Tags are many-to-many — one article can have many tags, and one tag can appear on many articles.

| Column | Example | What it means |
|---|---|---|
| `name` | `"OpenAI"` | Display name |
| `slug` | `"openai"` | URL-safe version |

---

### `article_tags` table (join table)

**Why it exists:** You can't store a many-to-many relationship directly in SQL. This is the **bridge table** between `articles` and `tags`.

**Example:** If article `abc123` has tags "AI" (tag `t1`) and "startup" (tag `t2`):
```
articleId  |  tagId
-----------+---------
abc123     |  t1
abc123     |  t2
```

When Prisma fetches an article with its tags, it automatically joins through this table.

**Cascade delete:** If an article is deleted, all its `article_tags` rows are automatically deleted too. Same if a tag is deleted. This prevents "orphan" rows.

---

## 5. Pipeline Tables

These tables power the automated content discovery and processing system — the "engine" that finds YouTube videos and turns them into articles.

---

### `topics` table

**Why it exists:** A Topic is a subject area you want to generate content about — for example "Electric Vehicles" or "Space Exploration". When you configure a YouTube channel or RSS feed to monitor, you link it to a Topic so the AI knows what angle to take when writing articles.

| Column | Example | What it means |
|---|---|---|
| `name` | `"Electric Vehicles"` | Topic name |
| `keywords` | `["Tesla","EV","battery"]` | Keywords that guide the AI when writing |
| `enabled` | `true` | Whether this topic is currently active |
| `categoryId` | foreign key | Which category articles from this topic should go into |

**Example:** You create a topic "AI in Healthcare" with keywords `["hospital AI", "medical AI", "diagnosis"]`. You link a YouTube channel (e.g. a medical AI researcher's channel) to this topic. Every new video gets processed into an article, and the AI uses the keywords to focus on the healthcare angle.

---

### `content_sources` table

**Why it exists:** Stores all the places we pull content from — RSS feeds, news APIs, etc. Think of this as your "subscription list" of content sources.

| Column | Example | What it means |
|---|---|---|
| `type` | `RSS_FEED` | What kind of source |
| `name` | `"TechCrunch RSS"` | Human-readable name |
| `url` | `https://techcrunch.com/feed` | The actual feed URL |
| `config` | `{"apiKey": "..."}` | Extra settings stored as JSON (different for each source type) |
| `enabled` | `true` | Turn this source on/off without deleting it |
| `topicId` | foreign key | Which topic articles from this source belong to |
| `lastFetchAt` | DateTime | When we last checked this source for new content |

**Example:** A row in `content_sources` might be:
```
type: RSS_FEED
name: "The Verge - Tech"
url: "https://www.theverge.com/rss/tech/index.xml"
enabled: true
topicId: "topic_technology_id"
lastFetchAt: "2025-03-15 08:00:00"
```

Every 15 minutes, a background worker checks all enabled sources for new content, creates a `job_run`, and generates articles.

---

### `youtube_channels` table

**Why it exists:** Specifically tracks YouTube channels you want to monitor for new videos. Separate from `content_sources` because YouTube channels need special handling (checking for new video IDs, storing the last seen video).

| Column | Example | What it means |
|---|---|---|
| `channelId` | `UCBcRF18a7Qf58cCRy5xuWwQ` | YouTube's internal channel ID |
| `channelName` | `"MKBHD"` | Display name |
| `channelUrl` | `https://youtube.com/@MKBHD` | URL to the channel |
| `enabled` | `true` | Whether we're monitoring this channel |
| `topicId` | foreign key | Which topic new videos belong to |
| `lastCheckedAt` | DateTime | When we last looked for new videos |
| `lastVideoId` | `"dQw4w9WgXcQ"` | The most recent video we've processed — used to detect NEW videos |

**How new video detection works:** Every 10 minutes, a worker checks each enabled channel. It fetches the channel's latest video ID and compares it with `lastVideoId`. If they're different, a new video was uploaded, so it queues a processing job and updates `lastVideoId`.

---

### `media_uploads` table

**Why it exists:** When an admin uploads a podcast or audio file directly (instead of providing a YouTube URL), the file metadata is stored here while it's being processed.

| Column | Example | What it means |
|---|---|---|
| `filename` | `abc123.mp3` | Stored filename on disk |
| `originalName` | `episode-45.mp3` | What the user called the file |
| `mimeType` | `audio/mpeg` | File type |
| `sizeBytes` | `45678912` | File size (for display) |
| `storagePath` | `/uploads/abc123.mp3` | Where it's saved on the server |
| `transcript` | `"Today we discuss..."` | The transcribed text (filled in after processing) |
| `processed` | `true` | Whether we've finished turning it into an article |

---

### `job_runs` table

**Why it exists:** Every time the pipeline does something — fetching a YouTube video, processing a transcript, pulling an RSS feed — it creates a `job_run` record. This is the **audit log** of all pipeline activity. It lets you see what happened, when it happened, whether it succeeded or failed, and what article it created.

| Column | Example | What it means |
|---|---|---|
| `type` | `YOUTUBE_PROCESS` | What kind of job this was |
| `status` | `COMPLETED` | Current state |
| `bullJobId` | `"42"` | The ID in BullMQ's queue (for cross-referencing with queue logs) |
| `sourceId` | foreign key | Which content source triggered this (if any) |
| `channelId` | foreign key | Which YouTube channel triggered this (if any) |
| `payload` | `{"videoId": "abc"}` | Input data sent to the worker (what it was asked to do) |
| `result` | `{"articleId": "xyz"}` | Output — what it produced (article IDs, titles, slugs) |
| `errorMessage` | `"No transcript..."` | If it failed, what went wrong |
| `startedAt` | DateTime | When the worker began processing |
| `completedAt` | DateTime | When it finished |

**Example result payload for a single article:**
```json
{
  "articleId": "clxyz123",
  "articleTitle": "How Tesla's New Battery Works",
  "articleSlug": "how-teslas-new-battery-works"
}
```

**Example result payload for a split (multiple articles from one video):**
```json
{
  "articleCount": 3,
  "articles": [
    { "id": "cl1", "title": "Topic 1", "slug": "topic-1" },
    { "id": "cl2", "title": "Topic 2", "slug": "topic-2" },
    { "id": "cl3", "title": "Topic 3", "slug": "topic-3" }
  ],
  "splitReason": "Video covers 3 distinct topics"
}
```

The `job_runs` table also links back to the `articles` it created via the `articles` relation, so you can always trace "which job created this article?".

---

## 6. Config Table

### `ai_configs` table

**Why it exists:** Stores the active AI provider configuration. The admin can change the AI model, temperature, and other settings from the dashboard without touching code. There is always exactly **one active row** in this table.

| Column | Default | What it means |
|---|---|---|
| `provider` | `AZURE_OPENAI` | Which AI company's API to use |
| `model` | `"o3-mini"` | Which specific model |
| `temperature` | `0.7` | How creative vs predictable (0 = robotic, 2 = very creative) |
| `maxTokens` | `4000` | Maximum length of AI response (1 token ≈ 0.75 words) |
| `baseUrl` | null | Required for Azure (your endpoint URL), optional for OpenRouter |
| `splitThreshold` | `25000` | Transcript length (in characters) above which we consider splitting into multiple articles |
| `isActive` | `true` | Only one config is active at a time |

**How it's used:** Before every AI call, the pipeline reads this table to know which provider and model to use. Changing the provider in the admin UI instantly affects the next article that gets generated — no server restart needed.

---

## 7. Enums Explained

Enums are fixed lists of values — like a dropdown that only allows specific options.

### `Role`
```
USER   — regular reader, can browse articles
ADMIN  — can access /admin, approve/reject articles, configure AI
```

### `ArticleStatus`
```
DRAFT    → just created by the AI, not yet reviewed
REVIEW   → admin has flagged it for a second look
APPROVED → live on the public site (readers can see it)
REJECTED → not good enough, hidden from site
ARCHIVED → was published but now taken down
```

### `SourceType`
```
NEWS_API        → fetched from a news aggregator API
GNEWS           → fetched from GNews API
RSS_FEED        → parsed from an RSS/Atom feed
GOOGLE_TRENDS   → generated from trending search topics
YOUTUBE_VIDEO   → generated from a YouTube video transcript
YOUTUBE_CHANNEL → generated from a monitored YouTube channel
PODCAST_UPLOAD  → generated from an uploaded audio file
```

### `JobStatus`
```
PENDING   → queued but not started yet
RUNNING   → worker is actively processing it
COMPLETED → finished successfully
FAILED    → something went wrong (see errorMessage)
CANCELLED → manually stopped
```

### `JobType`
```
NEWS_FETCH      → fetching from news APIs
RSS_FETCH       → fetching from RSS feeds
TRENDS_FETCH    → fetching from Google Trends
YOUTUBE_MONITOR → checking channels for new videos
YOUTUBE_PROCESS → downloading transcript + generating article
AUDIO_PROCESS   → transcribing uploaded audio + generating article
```

### `AIProvider`
```
AZURE_OPENAI  → Microsoft Azure-hosted OpenAI models (o3-mini, GPT-4o, etc.)
GROQ          → Groq's ultra-fast inference API (Llama, Mixtral)
OPENROUTER    → OpenRouter meta-API (access any model through one endpoint)
```

---

## 8. Relationships Map

Here is every relationship in plain English:

| Relationship | Type | Meaning |
|---|---|---|
| `User` → `Account` | One-to-Many | One user can have multiple OAuth login methods |
| `User` → `Session` | One-to-Many | One user can be logged in on multiple devices |
| `Category` → `Article` | One-to-Many | One category contains many articles |
| `Category` → `Topic` | One-to-Many | One category has many monitoring topics |
| `Article` ↔ `Tag` | Many-to-Many | Articles have many tags; tags appear on many articles (via `ArticleTag`) |
| `Article` → `JobRun` | Many-to-One | Many articles can come from one job run (when a video splits into multiple articles) |
| `Topic` → `ContentSource` | One-to-Many | One topic can have many RSS feeds / news sources |
| `Topic` → `YoutubeChannel` | One-to-Many | One topic can monitor many YouTube channels |
| `ContentSource` → `JobRun` | One-to-Many | Each time a source is checked, a new job run is created |
| `YoutubeChannel` → `JobRun` | One-to-Many | Each new video from a channel creates a job run |

---

## 9. Data Flow Walkthroughs

### 9.1 How Login Works

Here is exactly what happens in the database when an admin logs in:

```
1. User visits /login and submits email + password

2. NextAuth's "credentials" provider runs:
   - SELECT * FROM users WHERE email = 'admin@...'
   - If no user found → return error
   - If found → compare submitted password against passwordHash using bcrypt

3. If password matches:
   - INSERT INTO sessions (sessionToken, userId, expires)
     VALUES ('random_secret_token', 'user_id', NOW() + 30 days)

4. The sessionToken is stored in an HTTP-only cookie in the browser

5. On every subsequent request to /admin:
   - auth() reads the cookie
   - SELECT * FROM sessions WHERE sessionToken = 'random_secret_token' AND expires > NOW()
   - If found → user is authenticated
   - SELECT role FROM users WHERE id = session.userId
   - If role = ADMIN → allow access

6. When logging out:
   - DELETE FROM sessions WHERE sessionToken = 'random_secret_token'
   - Cookie is cleared
```

**Key point:** The password is NEVER stored in plain text. Only the bcrypt hash is stored. Even if someone stole the database, they couldn't reverse the hash to get the password.

---

### 9.2 How a YouTube Video Becomes an Article

This is the most complex flow in the system:

```
1. Admin goes to /admin/ingest and submits a YouTube URL
   e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ

2. The API endpoint extracts the video ID: "dQw4w9WgXcQ"

3. A JobRun is created:
   INSERT INTO job_runs (type, status, bullJobId, payload)
   VALUES ('YOUTUBE_PROCESS', 'PENDING', '42', '{"videoId": "dQw4w9WgXcQ"}')

4. The job is added to the BullMQ queue (stored in Redis, not PostgreSQL)

5. The worker picks up the job and updates the job run:
   UPDATE job_runs SET status = 'RUNNING', startedAt = NOW() WHERE id = 'jobrun_id'

6. Worker fetches video metadata from YouTube oEmbed API:
   → title: "Never Gonna Give You Up", channelName: "Rick Astley"

7. Worker runs a Python script to fetch the transcript from YouTube's caption API
   → Gets back ~50,000 characters of text

8. Worker reads the AI config:
   SELECT * FROM ai_configs WHERE isActive = true
   → Gets: provider=AZURE_OPENAI, model=o3-mini, splitThreshold=25000

9. Since transcript (50k chars) > splitThreshold (25k), the AI analyses the transcript
   and decides to split it into N articles (one per distinct topic)

10. For each segment/topic, the AI generates an article with:
    - title, slug, excerpt, content (in Markdown)
    - metaTitle, metaDescription, keywords
    - suggestedCategory, suggestedTags

11. The YouTube thumbnail is fetched:
    GET https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg
    → Used as ogImage for each article

12. For each generated article:

    a) Find or skip category:
       SELECT * FROM categories WHERE LOWER(name) = LOWER('Music')

    b) Upsert tags:
       INSERT INTO tags (name, slug) VALUES ('Rick Astley', 'rick-astley')
       ON CONFLICT (slug) DO NOTHING

    c) Create the article:
       INSERT INTO articles (title, slug, excerpt, content, status, ogImage,
                            sourceType, sourceUrl, aiGenerated, aiModel,
                            categoryId, jobRunId)
       VALUES ('Never Gonna Give You Up Analysis', 'never-gonna-give-you-up-analysis',
               '...', '...', 'DRAFT', 'https://img.youtube.com/...', 'YOUTUBE_VIDEO',
               'https://youtube.com/watch?v=dQw4w9WgXcQ', true, 'o3-mini',
               'category_music_id', 'jobrun_id')

    d) Link tags to article:
       INSERT INTO article_tags (articleId, tagId) VALUES ('article_id', 'tag_id')

13. Update the job run to COMPLETED:
    UPDATE job_runs SET status = 'COMPLETED', completedAt = NOW(),
    result = '{"articleId": "...", "articleTitle": "...", "articleSlug": "..."}'
    WHERE id = 'jobrun_id'

14. The article now exists with status = DRAFT
    → Admin can see it in /admin/articles
    → It is NOT visible to readers yet
```

---

### 9.3 How a Reader Views an Article

```
1. Reader visits /articles/never-gonna-give-you-up-analysis

2. Next.js server component calls:
   GET /api/v1/articles/never-gonna-give-you-up-analysis

3. Express server runs:
   SELECT articles.*, categories.*, tags.*
   FROM articles
   LEFT JOIN categories ON articles.categoryId = categories.id
   LEFT JOIN article_tags ON articles.id = article_tags.articleId
   LEFT JOIN tags ON article_tags.tagId = tags.id
   WHERE articles.slug = 'never-gonna-give-you-up-analysis'
   AND articles.status = 'APPROVED'   ← IMPORTANT: only approved articles!

4. If not found (draft/rejected/archived) → 404 page

5. If found → view count incremented (fire and forget, doesn't block the page):
   UPDATE articles SET viewCount = viewCount + 1 WHERE id = 'article_id'

6. Article data is returned and rendered:
   - Title, content (markdown → HTML), cover image, category, tags, read time
   - generateMetadata uses the same data to set <title>, og:image, JSON-LD etc.
```

---

### 9.4 How an Admin Approves an Article

```
1. Admin visits /admin/articles

2. Sees list of articles with status = DRAFT / REVIEW

3. Clicks "Approve" on an article

4. Frontend calls a server action which hits:
   PATCH /api/v1/articles/:id
   Body: { status: "APPROVED" }

5. Express checks: is the request from an admin?
   → Reads Authorization header Bearer token
   → Verifies it matches API_SECRET (for server-to-server calls)
   → OR verifies NextAuth session has role = ADMIN

6. Database update:
   UPDATE articles
   SET status = 'APPROVED',
       publishedAt = NOW()   ← sets publishedAt only if it was null before
   WHERE id = 'article_id'

7. The article is now LIVE:
   - Appears on homepage for all readers
   - Included in sitemap.xml
   - Indexable by Google/AI crawlers
   - viewCount starts incrementing
```

---

## 10. Indexes & Performance

Indexes make database queries faster by pre-sorting data. Without indexes, every query would scan every row in the table.

| Table | Index | Why it's needed |
|---|---|---|
| `articles` | `(status, publishedAt)` | Homepage queries filter by `status=APPROVED` and sort by `publishedAt` — this makes it instant |
| `articles` | `(slug)` | Every article page load looks up by slug — needs to be instant |
| `articles` | `(categoryId)` | Filtering articles by category uses this |
| `job_runs` | `(type, status)` | The admin dashboard filters jobs by type and status |
| `job_runs` | `(createdAt)` | Job history is sorted by date |
| `sessions` | `(sessionToken)` | Every request looks up the session token — must be instant |
| `accounts` | `(provider, providerAccountId)` | OAuth login lookup |

---

## 11. Cascade Deletes

Cascade deletes mean: when you delete a parent record, all its children are automatically deleted too. This prevents "orphan" data.

| If you delete... | It also deletes... |
|---|---|
| A `User` | All their `Account` rows and `Session` rows |
| An `Article` | All its `ArticleTag` join rows (but NOT the tags themselves) |
| A `Tag` | All `ArticleTag` rows linking it to articles (but NOT the articles) |

**What is NOT cascaded (intentionally):**
- Deleting a `Category` does NOT delete its articles — articles just lose their category (`categoryId` becomes null)
- Deleting a `Topic` does NOT delete its content sources — sources become "uncategorised"
- Deleting a `JobRun` does NOT delete the articles it created — articles survive independently
