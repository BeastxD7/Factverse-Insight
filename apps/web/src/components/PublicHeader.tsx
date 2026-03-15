import Link from "next/link"
import { serverApi } from "@/lib/api-server"
import { ThemeToggle } from "@/components/ThemeToggle"
import { SearchModal } from "@/components/SearchModal"
import type { ArticleListItem } from "@news-app/types"

interface PublicHeaderProps {
  activeCategory?: string
}

export async function PublicHeader({ activeCategory }: PublicHeaderProps) {
  let categories: { id: string; name: string; slug: string }[] = []

  try {
    const articles = await serverApi.get<ArticleListItem[]>("/articles?pageSize=50")
    categories = Array.from(
      new Map(
        articles.filter((a) => a.category).map((a) => [a.category!.id, a.category!])
      ).values()
    ).slice(0, 8)
  } catch {
    // server unavailable
  }

  return (
    <header className="sticky top-0 z-20">
      <div className="bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-sm dark:shadow-none">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">

          {/* Logo — takes its natural width, pushes nothing */}
          <Link href="/" className="flex items-center gap-3 group shrink-0 flex-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Factverse Insights"
              className="size-9 rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-200"
            />
            <div className="leading-none">
              <span className="font-black text-[15px] tracking-tight text-foreground">Factverse</span>
              <span className="font-black text-[15px] tracking-tight text-primary"> Insights</span>
            </div>
          </Link>

          {/* Category nav — naturally centred between the two flex-1 sides */}
          {categories.length > 0 && (
            <nav className="hidden lg:flex items-center gap-1 shrink-0">
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${
                  !activeCategory
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/?category=${cat.slug}`}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${
                    activeCategory === cat.slug
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Right actions — flex-1 + justify-end mirrors the logo side */}
          <div className="flex items-center gap-1 flex-1 justify-end shrink-0">
            <SearchModal />
            <ThemeToggle />
          </div>

        </div>
      </div>
    </header>
  )
}
