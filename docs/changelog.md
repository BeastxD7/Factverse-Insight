# Changelog — Factverse Insights

All notable changes to this project, explained in plain English.
Format: newest changes at the top.

---

## [2025-03-15] — Production Hardening, SEO & AI Discovery

### Security
- **Locked down image domains** (`next.config.ts`) — previously any HTTPS URL could be loaded as an image (SSRF risk). Now only whitelisted domains are allowed: Pexels, YouTube, picsum.photos, and our own domain.
- **Added HTTP security headers** — every page now sends `X-Frame-Options: DENY` (prevents clickjacking), `X-Content-Type-Options: nosniff` (prevents MIME sniffing), `Referrer-Policy`, and `Permissions-Policy`.
- **Static asset caching** — `/_next/static/` assets are cached for 1 year (immutable). Logo and favicon cached for 30 days.

### SEO & Metadata
- **`Viewport` export** added to root layout — proper mobile scaling (`device-width`) and `themeColor` for browser chrome in both light and dark mode.
- **`wordCount` in NewsArticle JSON-LD** — Google uses this as a content quality signal.
- **`abstract` field** in NewsArticle JSON-LD — LLMs use this for better article summarisation.
- **`isBasedOn`** in NewsArticle JSON-LD — credits the original source URL (YouTube video, RSS article, etc.) so attribution is clear to both Google and AI models.
- **`about` (Thing entities)** in NewsArticle JSON-LD — each article tag becomes a `schema.org/Thing` entity, teaching search engines and AI what the article is actually about.
- **Read time fixed** — was dividing character count by 1000 (wildly inaccurate). Now uses word count divided by 200 (average adult reading speed) with a minimum of 1 minute.
- **SearchModal alt text fixed** — thumbnail images had `alt=""` (accessibility failure). Now uses the article title.

### AI / LLM Discovery
- **`robots.ts` — explicit AI crawler rules** — GPTBot (ChatGPT), ChatGPT-User, Google-Extended (Gemini), PerplexityBot, Claude-Web, anthropic-ai, CCBot, and Applebot-Extended are all explicitly allowed to crawl public content. This is how you get cited by AI assistants.
- **Staging/preview block** — `robots.ts` now returns `Disallow: /` when `NODE_ENV !== "production"`, preventing preview deployments from being indexed by Google or scraped by AI.
- **`/llms.txt`** — new file at `apps/web/public/llms.txt`. This is the emerging standard (analogous to `robots.txt`) for telling AI systems about your site, how to cite it, and what permissions you grant. ChatGPT, Perplexity, and Claude all check for this file.

---

## [2025-03-15] — Share Button, YouTube Thumbnail, Split Threshold Config

### New Features
- **Share button** on article pages (`ShareButton.tsx`) — placed at the top (next to article meta) and bottom (next to "Back to stories"). Options: Copy link, Share on X (Twitter), LinkedIn, WhatsApp. On mobile devices with native share API, also shows "Share via…" which opens the OS share sheet.
- **YouTube thumbnail as cover image** — when a YouTube video is processed, the HD thumbnail (`maxresdefault.jpg`, 1280×720) is now automatically fetched and used as the article cover image. Falls back to `hqdefault.jpg` if the HD version doesn't exist. Pexels is only used if the YouTube thumbnail fails entirely.
- **`splitThreshold` in AI Config** — the character count above which a transcript gets analysed for splitting into multiple articles is now configurable from the Admin → AI Config page under "Pipeline Settings". Default is 25,000 characters (~15–20 min video). Previously it was hardcoded at 80,000.

### Database
- Added `splitThreshold Int @default(25000)` column to `ai_configs` table.
- Schema pushed via `prisma db push`.

### Files Changed
- `apps/server/src/services/youtube.service.ts` — added `getYoutubeThumbnail(videoId)`
- `apps/server/src/workers/youtube-process.worker.ts` — uses thumbnail, reads `splitThreshold` from DB
- `apps/server/src/services/ai.service.ts` — `analyzeAndSplitTranscript` now accepts `splitThreshold` param
- `apps/server/src/api/v1/admin/ai-config.controller.ts` — includes `splitThreshold` in GET/PATCH
- `packages/types/src/ai.types.ts` — `AIConfig` and `UpdateAIConfigDto` include `splitThreshold`
- `apps/web/src/components/admin/AiConfigForm.tsx` — Pipeline Settings card with splitThreshold input
- `apps/web/src/components/ShareButton.tsx` — new share button component
- `apps/web/src/app/articles/[slug]/page.tsx` — ShareButton added in two places

---

## [2025-03-15] — SEO Foundation, Sitemap, Robots, JSON-LD

### New Files
- `apps/web/src/app/sitemap.ts` — dynamic XML sitemap. Lists the homepage and all approved articles with `lastModified`, `changeFrequency`, and `priority` (featured articles get 0.9, regular get 0.7). Gracefully returns only the homepage if the API is unavailable.
- `apps/web/src/app/robots.ts` — `robots.txt` blocking `/admin`, `/draft`, `/api` from all crawlers.

### SEO on Article Pages
- **`generateMetadata`** added to `apps/web/src/app/articles/[slug]/page.tsx`:
  - Dynamic `<title>` using `metaTitle ?? title`
  - Dynamic `<meta description>` using `metaDescription ?? excerpt`
  - `og:type = "article"` with `publishedTime`, `modifiedTime`, `section`, `tags`
  - `twitter:card = "summary_large_image"` with article image
  - `canonical` URL pointing to the exact article URL
- **`NewsArticle` JSON-LD** structured data on every article page — headline, image, dates, author, publisher, keywords, articleSection.
- **`BreadcrumbList` JSON-LD** — tells Google the navigation path (Home → Category → Article), enabling breadcrumb display in search results.
- **`WebSite` JSON-LD** in root layout — registers the site with Google's knowledge graph.
- **`React.cache()`** used on the article fetch so `generateMetadata` and the page component share one API call instead of two.

### Other
- OG image in root layout fixed from `/og-image.png` (file didn't exist) to `/logo-2000.png`.
- Browser tab title changed from `"AI-Powered Fact-Checked News"` to `"Insights, News & Analysis"` — more neutral, editorial-sounding.
- `favicon.ico` regenerated from `logo.png` (converted to RGBA ICO format) — browser tabs now show the FI logo instead of the Next.js default triangle.
- Admin sidebar: replaced generic `<Newspaper>` lucide icon with actual `logo.png` image.

---

## [2025-03-14] — Cover Image Picker & Rich Text Editor Improvements

### New Features
- **Cover image preview on draft page** — when editing a draft article, the cover image is shown at the top. Hovering reveals a "Change cover" button.
- **`CoverImagePicker` component** (`apps/web/src/components/admin/CoverImagePicker.tsx`) — a slide-out panel with three ways to set a cover image:
  1. Search Pexels (shows a 3-column photo grid)
  2. Upload from device
  3. Enter a direct image URL
- **Image resize in rich text editor** — images inserted into the article body can now be resized by dragging the blue handle in the bottom-right corner. The width is stored as a `width` attribute on the image node and serialised to Markdown.
- **Paste images into editor** — copying an image from another source and pasting into the editor now uploads it automatically (previously did nothing).
- **Drag-and-drop images into editor** — dragging an image file from your desktop into the editor uploads and inserts it.

### Bug Fixes
- **Image upload 401 error fixed** — the editor was trying to call the Express server directly from the browser, which failed because there's no auth header. Fixed by adding a Next.js proxy route (`/api/admin/upload`) that checks the NextAuth session server-side and then forwards the request to Express with the `API_SECRET`.

### Files Changed
- `apps/web/src/app/api/admin/upload/route.ts` — new proxy route
- `apps/web/src/app/api/admin/pexels/route.ts` — new Pexels search proxy route
- `apps/web/src/components/admin/ArticleEditor.tsx` — paste/drop handlers, resizable image
- `apps/web/src/components/admin/CoverImagePicker.tsx` — new component
- `apps/web/src/app/draft/[slug]/DraftView.tsx` — cover image preview block
- `apps/web/src/app/draft/[slug]/actions.ts` — `updateCoverImage` server action
- `apps/server/src/services/image.service.ts` — `fetchCoverImage` using Pexels API
- `apps/web/src/lib/env-server.ts` — added `PEXELS_API_KEY`

---

## [2025-03-13] — YouTube Transcript Improvements & Non-English Support

### Pipeline Improvements
- **Switched primary transcript method** to `youtube-transcript-api` Python package — this calls YouTube's caption API directly without needing a JavaScript runtime (no more "No JS runtime" warning from yt-dlp).
- **Non-English caption support** — if a video has no English captions but has auto-generated captions in another language (e.g. Hindi), the system now uses them. The detected language is passed to the AI, which writes the article in English regardless.
- **yt-dlp kept as fallback** — if `youtube-transcript-api` fails, yt-dlp is tried as a backup.

### Auto Cover Images
- **Pexels integration** — after generating an article, the pipeline now searches Pexels for a relevant cover image using the article's top 3 keywords. The image URL is stored in `articles.ogImage`.
- Added `PEXELS_API_KEY` environment variable.

### Files Changed
- `apps/server/src/services/youtube.service.ts` — complete rewrite of transcript fetching
- `apps/server/src/services/ai.service.ts` — accepts `transcriptLanguage` in video meta
- `apps/server/src/workers/youtube-process.worker.ts` — passes language, fetches cover image
- `apps/server/src/config/env.ts` — `PEXELS_API_KEY`

---

## [2025-03-12] — Admin Dashboard & Public Site (Phase 2)

### New Pages
- `/admin` — dashboard with job queue overview
- `/admin/articles` — article review table (approve/reject/archive articles)
- `/admin/ai-config` — configure AI provider, model, temperature, max tokens
- `/admin/ingest` — manually submit a YouTube URL or upload audio
- `/articles/[slug]` — public article detail page
- `/` — public homepage with article grid, category filter, search modal
- `/login` — login page

### New Components
- `ArticleEditor` — rich text editor (Tiptap) for editing article content
- `AiConfigForm` — form for changing AI provider settings
- `ArticleQueue` — table showing all articles with status controls
- `AppSidebar` — admin navigation sidebar
- `PublicHeader` — sticky header with category nav, search (Cmd+K), theme toggle
- `SearchModal` — full-screen search overlay with keyboard navigation
- `ThemeToggle` — light/dark mode switcher

---

## [2025-03-10] — Pipeline Workers (Phase 1)

### New Features
- **BullMQ job queue** — all background processing goes through Redis-backed queues
- **YouTube video processing worker** — takes a YouTube URL, fetches transcript via yt-dlp, generates article via Claude AI
- **Smart transcript splitting** — long videos (>80k chars at the time) are analysed for topic breaks and split into multiple articles automatically
- **Hierarchical chunk analysis** — transcript is split into 24k-char chunks, each analysed for topics and entities, then a second AI pass decides on article boundaries

### AI Service
- Supports Anthropic Claude (default), Groq, OpenRouter, Azure OpenAI
- All prompts versioned (`ARTICLE_PROMPT_V1`, `TRANSCRIPT_SPLIT_V1`, etc.)
- Every generated article stores `aiModel` and `aiPromptVersion` for traceability

---

## [2025-03-08] — Foundation (Phase 0)

### Initial Setup
- Bun monorepo with three workspaces: `apps/web`, `apps/server`, `packages/db`
- PostgreSQL 16 + Redis 7 via Docker Compose
- NextAuth v5 with Credentials provider and Prisma adapter
- Express 5 API server with Zod validation middleware
- Full Prisma schema with all tables
- Database seed script (admin user, categories, default AI config)
- Shared types package (`@news-app/types`)
