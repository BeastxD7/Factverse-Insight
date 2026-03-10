import { describe, it, expect, mock } from "bun:test"
import type { Request, Response, NextFunction } from "express"
import { z } from "zod"
import { validate } from "../../../../apps/server/src/middleware/validate"

function makeReq(body: unknown): Request {
  return { body, query: {}, params: {} } as Request
}

function makeRes(): Response {
  return {} as Response
}

describe("validate middleware", () => {
  const schema = z.object({
    title: z.string().min(1),
    count: z.number().int().positive(),
  })

  it("calls next() and mutates req.body on valid input", () => {
    const next = mock(() => {})
    const req = makeReq({ title: "Hello", count: 3 })

    validate(schema)(req, makeRes(), next as NextFunction)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith()
    expect(req.body).toEqual({ title: "Hello", count: 3 })
  })

  it("calls next(ZodError) on invalid input", () => {
    const next = mock(() => {})
    const req = makeReq({ title: "", count: -1 })

    validate(schema)(req, makeRes(), next as NextFunction)

    expect(next).toHaveBeenCalledTimes(1)
    const err = (next as ReturnType<typeof mock>).mock.calls[0][0]
    expect(err).toBeDefined()
    expect(err.name).toBe("ZodError")
  })

  it("calls next(ZodError) on missing fields", () => {
    const next = mock(() => {})
    const req = makeReq({})

    validate(schema)(req, makeRes(), next as NextFunction)

    expect(next).toHaveBeenCalledTimes(1)
    const err = (next as ReturnType<typeof mock>).mock.calls[0][0]
    expect(err).toBeDefined()
  })

  it("validates query params when target is 'query'", () => {
    const next = mock(() => {})
    const querySchema = z.object({ page: z.coerce.number().default(1) })
    const req = { body: {}, query: { page: "2" }, params: {} } as unknown as Request

    validate(querySchema, "query")(req, makeRes(), next as NextFunction)

    expect(next).toHaveBeenCalledWith()
    expect(req.query).toEqual({ page: 2 })
  })
})
