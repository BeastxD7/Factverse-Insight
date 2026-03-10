import { describe, it, expect, beforeAll, afterAll } from "bun:test"
import { prisma } from "@news-app/db"

const API = `http://localhost:${process.env.PORT ?? 3001}/api/v1`

// ── Fixtures ──────────────────────────────────────────────────────────────────

const TEST_SLUG = "integration-test-article"

beforeAll(async () => {
  await prisma.article.upsert({
    where: { slug: TEST_SLUG },
    update: {},
    create: {
      title: "Integration Test Article",
      slug: TEST_SLUG,
      content: "This is test content for integration testing.",
      excerpt: "Test excerpt",
      status: "APPROVED",
      publishedAt: new Date(),
      aiGenerated: false,
    },
  })
})

afterAll(async () => {
  await prisma.article.deleteMany({ where: { slug: TEST_SLUG } })
  await prisma.$disconnect()
})

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("GET /api/v1/articles", () => {
  it("returns 200 with paginated data", async () => {
    const res = await fetch(`${API}/articles`)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body).toHaveProperty("data")
    expect(body).toHaveProperty("total")
    expect(body).toHaveProperty("page")
    expect(body).toHaveProperty("pageSize")
    expect(body).toHaveProperty("totalPages")
    expect(Array.isArray(body.data)).toBe(true)
  })

  it("respects pageSize param", async () => {
    const res = await fetch(`${API}/articles?pageSize=3`)
    const body = await res.json()
    expect(body.data.length).toBeLessThanOrEqual(3)
    expect(body.pageSize).toBe(3)
  })

  it("returns 400 for invalid page param", async () => {
    const res = await fetch(`${API}/articles?page=abc`)
    // page=abc coerces to NaN → Zod rejects it
    expect(res.status).toBe(400)
  })

  it("filters by category slug without error", async () => {
    const res = await fetch(`${API}/articles?category=technology`)
    expect(res.status).toBe(200)
  })

  it("supports full-text search", async () => {
    const res = await fetch(`${API}/articles?q=integration`)
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(Array.isArray(body.data)).toBe(true)
  })
})

describe("GET /api/v1/articles/:slug", () => {
  it("returns 200 with article data for known slug", async () => {
    const res = await fetch(`${API}/articles/${TEST_SLUG}`)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.data.slug).toBe(TEST_SLUG)
    expect(body.data.title).toBe("Integration Test Article")
    expect(body.data.status).toBe("APPROVED")
  })

  it("returns 404 for unknown slug", async () => {
    const res = await fetch(`${API}/articles/this-does-not-exist-xyz`)
    expect(res.status).toBe(404)
    const body = await res.json()
    expect(body.error).toBe("NOT_FOUND")
  })

  it("does not return DRAFT articles on public endpoint", async () => {
    // Create a draft article
    const draftSlug = "integration-test-draft"
    await prisma.article.upsert({
      where: { slug: draftSlug },
      update: {},
      create: {
        title: "Draft Article",
        slug: draftSlug,
        content: "Draft content",
        status: "DRAFT",
        aiGenerated: false,
      },
    })

    const res = await fetch(`${API}/articles/${draftSlug}`)
    expect(res.status).toBe(404)

    await prisma.article.delete({ where: { slug: draftSlug } })
  })
})

describe("GET /api/v1/health", () => {
  it("returns 200 with status ok", async () => {
    const res = await fetch(`${API}/health`)
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.status).toBe("ok")
    expect(body).toHaveProperty("timestamp")
  })
})

describe("GET /api/v1/categories", () => {
  it("returns list of categories", async () => {
    const res = await fetch(`${API}/categories`)
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(Array.isArray(body.data)).toBe(true)
  })
})
