import { describe, it, expect } from "bun:test"
import {
  AppError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
  ConflictError,
} from "../../../../apps/server/src/lib/errors"

describe("AppError", () => {
  it("sets message, statusCode, and code", () => {
    const err = new AppError("test", 418, "TEAPOT")
    expect(err.message).toBe("test")
    expect(err.statusCode).toBe(418)
    expect(err.code).toBe("TEAPOT")
    expect(err instanceof Error).toBe(true)
  })
})

describe("NotFoundError", () => {
  it("defaults to 404 with NOT_FOUND code", () => {
    const err = new NotFoundError()
    expect(err.statusCode).toBe(404)
    expect(err.code).toBe("NOT_FOUND")
  })

  it("accepts a custom message", () => {
    const err = new NotFoundError("Article not found")
    expect(err.message).toBe("Article not found")
  })
})

describe("UnauthorizedError", () => {
  it("defaults to 401", () => {
    expect(new UnauthorizedError().statusCode).toBe(401)
  })
})

describe("ForbiddenError", () => {
  it("defaults to 403", () => {
    expect(new ForbiddenError().statusCode).toBe(403)
  })
})

describe("ValidationError", () => {
  it("defaults to 400", () => {
    expect(new ValidationError().statusCode).toBe(400)
  })
})

describe("ConflictError", () => {
  it("defaults to 409", () => {
    expect(new ConflictError().statusCode).toBe(409)
  })
})
