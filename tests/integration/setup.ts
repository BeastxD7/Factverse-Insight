import { beforeAll, afterAll } from "bun:test"
import { prisma } from "@news-app/db"

/**
 * Global integration test setup.
 *
 * Requires:
 *   - Docker running:  bun run docker:up
 *   - DB migrated:     bun run db:migrate
 *
 * Each integration test file should import this setup to ensure the DB
 * connection is closed after all tests complete.
 */

beforeAll(async () => {
  // Verify DB is reachable before running any tests
  await prisma.$queryRaw`SELECT 1`
})

afterAll(async () => {
  await prisma.$disconnect()
})
