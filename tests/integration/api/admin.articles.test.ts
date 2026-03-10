import { describe, it, expect, beforeAll, afterAll } from "bun:test"
import { prisma } from "@news-app/db"
import { env } from "../../../apps/server/src/config/env"

const API = `http://localhost:${env.PORT}/api/v1`

// Auth header using the internal API_SECRET
const adminHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${env.API_SECRET}`,
}

const TEST_SLUG = "integration-admin-test-article"
let articleId: string

beforeAll(async () => {
  const article = await prisma.article.upsert({
    where: { slug: TEST_SLUG },
    update: {},
    create: {
      title: "Admin Test Article",
      slug: TEST_SLUG,
      content: "Content for admin testing.",
      status: "DRAFT",
      aiGenerated: true,
    },
  })
  articleId = article.id
})

afterAll(async () => {
  await prisma.article.deleteMany({ where: { slug: TEST_SLUG } })
  await prisma.$disconnect()
})

describe("GET /api/v1/admin/articles", () => {
  it("returns 401 without auth header", async () => {
    const res = await fetch(`${API}/admin/articles`)
    expect(res.status).toBe(401)
  })

  it("returns 200 with admin auth", async () => {
    const res = await fetch(`${API}/admin/articles`, { headers: adminHeaders })
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(Array.isArray(body.data)).toBe(true)
  })

  it("filters by status", async () => {
    const res = await fetch(`${API}/admin/articles?status=DRAFT`, { headers: adminHeaders })
    expect(res.status).toBe(200)
    const body = await res.json()
    body.data.forEach((a: { status: string }) => {
      expect(a.status).toBe("DRAFT")
    })
  })
})

describe("PATCH /api/v1/articles/:id (admin approve)", () => {
  it("returns 401 without auth", async () => {
    const res = await fetch(`${API}/articles/${articleId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "APPROVED" }),
    })
    expect(res.status).toBe(401)
  })

  it("approves a DRAFT article and sets publishedAt", async () => {
    const res = await fetch(`${API}/articles/${articleId}`, {
      method: "PATCH",
      headers: adminHeaders,
      body: JSON.stringify({ status: "APPROVED" }),
    })
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.data.status).toBe("APPROVED")
    expect(body.data.publishedAt).not.toBeNull()
  })

  it("rejects an article", async () => {
    const res = await fetch(`${API}/articles/${articleId}`, {
      method: "PATCH",
      headers: adminHeaders,
      body: JSON.stringify({ status: "REJECTED" }),
    })
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.data.status).toBe("REJECTED")
  })
})

describe("GET /api/v1/admin/stats", () => {
  it("returns stats object with expected shape", async () => {
    const res = await fetch(`${API}/admin/stats`, { headers: adminHeaders })
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.data).toHaveProperty("articles")
    expect(body.data).toHaveProperty("jobs")
    expect(body.data).toHaveProperty("sources")
    expect(body.data).toHaveProperty("channels")
    expect(typeof body.data.articles.total).toBe("number")
  })
})
