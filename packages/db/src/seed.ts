import { prisma } from "./index"
import { hash } from "bcryptjs"

async function main() {
  console.log("Seeding database...")

  // Create admin user
  const adminPassword = await hash("admin123", 12)
  const admin = await prisma.user.upsert({
    where: { email: "admin@newsforge.com" },
    update: {},
    create: {
      email: "admin@newsforge.com",
      name: "Admin",
      role: "ADMIN",
      passwordHash: adminPassword,
    },
  })
  console.log("Created admin:", admin.email)

  // Create default categories
  const categories = [
    { name: "Technology", slug: "technology" },
    { name: "Business", slug: "business" },
    { name: "Science", slug: "science" },
    { name: "Health", slug: "health" },
    { name: "Sports", slug: "sports" },
    { name: "Entertainment", slug: "entertainment" },
    { name: "Politics", slug: "politics" },
    { name: "World", slug: "world" },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
  console.log("Created categories:", categories.length)

  // Create default topic
  await prisma.topic.upsert({
    where: { name: "General Trending" },
    update: {},
    create: {
      name: "General Trending",
      description: "General trending topics from all sources",
      keywords: ["trending", "news", "latest", "breaking"],
      enabled: true,
    },
  })
  console.log("Created default topic")

  // Create default AI config (Anthropic Claude Sonnet)
  const existingAIConfig = await prisma.aiConfig.findFirst({ where: { isActive: true } })
  if (!existingAIConfig) {
    await prisma.aiConfig.create({
      data: {
        provider: "ANTHROPIC",
        model: "claude-sonnet-4-6",
        temperature: 0.7,
        maxTokens: 4000,
        isActive: true,
      },
    })
    console.log("Created default AI config (Anthropic / claude-sonnet-4-6)")
  }

  console.log("Seeding complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
