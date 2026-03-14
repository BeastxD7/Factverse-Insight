import { FileText, CheckCircle, Clock, XCircle, Zap, Radio } from "lucide-react"
import type { AdminStats } from "@news-app/types"

interface StatsCardsProps {
  stats: AdminStats
}

interface StatCard {
  label: string
  value: number
  icon: React.ElementType
  iconBg: string
  iconColor: string
  sub?: string
}

export function StatsCards({ stats }: StatsCardsProps) {
  const articleCards: StatCard[] = [
    {
      label: "Drafts",
      value: stats.articles.draft,
      icon: FileText,
      iconBg: "bg-slate-100 dark:bg-slate-800",
      iconColor: "text-slate-500 dark:text-slate-400",
    },
    {
      label: "In Review",
      value: stats.articles.review,
      icon: Clock,
      iconBg: "bg-amber-50 dark:bg-amber-900/20",
      iconColor: "text-amber-500",
    },
    {
      label: "Approved",
      value: stats.articles.approved,
      icon: CheckCircle,
      iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
      iconColor: "text-emerald-500",
    },
    {
      label: "Rejected",
      value: stats.articles.rejected,
      icon: XCircle,
      iconBg: "bg-red-50 dark:bg-red-900/20",
      iconColor: "text-red-500",
    },
  ]

  const systemCards: StatCard[] = [
    {
      label: "Jobs Today",
      value: stats.jobs.completedToday,
      icon: Zap,
      iconBg: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-500",
      sub: `${stats.jobs.pending} pending · ${stats.jobs.failed} failed`,
    },
    {
      label: "Active Sources",
      value: stats.sources.enabled,
      icon: Radio,
      iconBg: "bg-violet-50 dark:bg-violet-900/20",
      iconColor: "text-violet-500",
      sub: `${stats.sources.total} total`,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Articles</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {articleCards.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
            <div
              key={label}
              className="rounded-xl border border-border/60 bg-card p-5 hover:shadow-sm transition-shadow"
            >
              <div className="mb-3">
                <div className={`size-9 rounded-lg ${iconBg} flex items-center justify-center`}>
                  <Icon className={`size-4.5 ${iconColor}`} />
                </div>
              </div>
              <p className="text-3xl font-bold tracking-tight">{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">System</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {systemCards.map(({ label, value, icon: Icon, iconBg, iconColor, sub }) => (
            <div
              key={label}
              className="rounded-xl border border-border/60 bg-card p-5 hover:shadow-sm transition-shadow"
            >
              <div className="mb-3">
                <div className={`size-9 rounded-lg ${iconBg} flex items-center justify-center`}>
                  <Icon className={`size-4.5 ${iconColor}`} />
                </div>
              </div>
              <p className="text-3xl font-bold tracking-tight">{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
              {sub && <p className="text-xs text-muted-foreground/70 mt-1">{sub}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
