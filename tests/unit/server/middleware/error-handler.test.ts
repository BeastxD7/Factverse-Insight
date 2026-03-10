import { describe, it, expect, mock } from "bun:test"
import type { Request, Response, NextFunction } from "express"
import { ZodError, z } from "zod"
import { errorHandler } from "../../../../apps/server/src/middleware/error-handler"
import {
  AppError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
} from "../../../../apps/server/src/lib/errors"

function makeRes() {
  const res = {
    status: mock(function (this: unknown) { return res }),
    json: mock(function (this: unknown) { return res }),
  }
  return res as unknown as Response
}

const req = {} as Request
const next = (() => {}) as NextFunction

describe("errorHandler", () => {
  it("handles NotFoundError with 404", () => {
    const res = makeRes()
    errorHandler(new NotFoundError("Article not found"), req, res, next)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 404, error: "NOT_FOUND" })
    )
  })

  it("handles UnauthorizedError with 401", () => {
    const res = makeRes()
    errorHandler(new UnauthorizedError(), req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 401, error: "UNAUTHORIZED" })
    )
  })

  it("handles ForbiddenError with 403", () => {
    const res = makeRes()
    errorHandler(new ForbiddenError(), req, res, next)

    expect(res.status).toHaveBeenCalledWith(403)
  })

  it("handles generic AppError with its statusCode", () => {
    const res = makeRes()
    errorHandler(new AppError("Something broke", 422, "UNPROCESSABLE"), req, res, next)

    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "UNPROCESSABLE" })
    )
  })

  it("handles ZodError with 400", () => {
    const res = makeRes()
    const zodErr = z.object({ name: z.string() }).safeParse({})
    if (!zodErr.success) {
      errorHandler(zodErr.error, req, res, next)
    }

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "VALIDATION_ERROR", statusCode: 400 })
    )
  })

  it("handles unknown errors with 500", () => {
    const res = makeRes()
    errorHandler(new Error("Unexpected"), req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 500, error: "INTERNAL_ERROR" })
    )
  })
})
