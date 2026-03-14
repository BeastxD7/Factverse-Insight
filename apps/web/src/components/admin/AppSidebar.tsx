"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LayoutDashboard, FileText, Settings, LogOut, Newspaper, ExternalLink, Upload } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/articles", label: "Article Queue", icon: FileText },
  { href: "/admin/ingest", label: "Manual Ingest", icon: Upload },
  { href: "/admin/ai-config", label: "AI Config", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      {/* Logo / Brand */}
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-3">
          <div className="size-8 rounded-lg bg-sidebar-primary/20 flex items-center justify-center shrink-0">
            <Newspaper className="size-4 text-sidebar-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-sidebar-foreground leading-none">NewsForge</p>
            <p className="text-xs text-sidebar-foreground/50 mt-0.5 leading-none">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="pt-2">
        <SidebarGroup>
          <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
            Navigation
          </p>
          <SidebarMenu>
            {navItems.map(({ href, label, icon: Icon, exact }) => {
              const isActive = exact ? pathname === href : pathname.startsWith(href)
              return (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    render={<Link href={href} />}
                    isActive={isActive}
                    className={cn(
                      "rounded-lg mx-1 transition-all",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    {label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border pt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/" target="_blank" />}
              className="rounded-lg mx-1 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all"
            >
              <ExternalLink className="size-4" />
              View Site
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="rounded-lg mx-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="size-4" />
              Sign Out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
