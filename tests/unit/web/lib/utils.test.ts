import { describe, it, expect } from "bun:test"
import { cn } from "../../../../apps/web/src/lib/utils"

describe("cn()", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar")
  })

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible")
  })

  it("deduplicates conflicting Tailwind classes (last wins)", () => {
    // tailwind-merge resolves conflicts: p-4 overrides p-2
    expect(cn("p-2", "p-4")).toBe("p-4")
  })

  it("handles undefined and null gracefully", () => {
    expect(cn("base", undefined, null, "extra")).toBe("base extra")
  })

  it("returns empty string for no valid inputs", () => {
    expect(cn(false, undefined, null)).toBe("")
  })
})
