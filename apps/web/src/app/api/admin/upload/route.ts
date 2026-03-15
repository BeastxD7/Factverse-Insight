import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { serverEnv } from "@/lib/env-server"

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("image")
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 })
  }

  // Proxy to Express server using API_SECRET (never exposed to browser)
  const proxyForm = new FormData()
  proxyForm.append("image", file)

  const res = await fetch(`${serverEnv.NEXT_PUBLIC_API_URL}/api/v1/admin/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${serverEnv.API_SECRET}` },
    body: proxyForm,
  })

  const json: unknown = await res.json()
  return NextResponse.json(json, { status: res.status })
}
