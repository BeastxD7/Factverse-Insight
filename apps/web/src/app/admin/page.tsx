import Link from "next/link"
import { FileText, Settings } from "lucide-react"
import { serverApi } from "@/lib/api-server"
import { StatsCards } from "@/components/admin/StatsCards"
import { Button } from "@/components/ui/button"
import type { AdminStats } from "@news-app/types"

export default async function AdminPage() {
  let stats: AdminStats | null = null

  try {
    stats = await serverApi.get<AdminStats>("/admin/stats")
  } catch {
    // server unavailable
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Overview of your Factverse Insights instance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/admin/articles" />}>
            <FileText className="size-4" />
            Review Queue
          </Button>
          <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/admin/ai-config" />}>
            <Settings className="size-4" />
            AI Config
          </Button>
        </div>
      </div>

      {stats ? (
        <StatsCards stats={stats} />
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
          Could not load stats — make sure the server is running.
        </div>
      )}
    </div>
  )
}
