"use client"

import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

const routeTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/articles": "Article Queue",
  "/admin/ingest": "Manual Ingest",
  "/admin/ai-config": "AI Config",
}

function getTitle(pathname: string): string {
  // Exact match first
  if (routeTitles[pathname]) return routeTitles[pathname]
  // Prefix match for nested routes
  for (const [route, title] of Object.entries(routeTitles)) {
    if (pathname.startsWith(route + "/")) return title
  }
  return "Admin"
}

export function AdminHeader() {
  const pathname = usePathname()
  const title = getTitle(pathname)

  return (
    <header className="flex h-14 items-center gap-2 border-b bg-background/95 backdrop-blur-sm px-4 sticky top-0 z-10">
      <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
      <Separator orientation="vertical" className="h-4" />
      <span className="text-sm font-medium">{title}</span>
    </header>
  )
}
