"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { api } from "@/lib/api"
import type { ArticleListItem } from "@news-app/types"

function articleThumb(id: string, ogImage: string | null): string {
  return ogImage ?? `https://picsum.photos/seed/${id}/80/80`
}

export function SearchModal() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [articles, setArticles] = useState<ArticleListItem[]>([])
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const fetchedRef = useRef(false)
  const router = useRouter()

  const openModal = () => setOpen(true)
  const closeModal = () => { setOpen(false); setQuery(""); setCursor(0) }

  // Fetch articles once — triggered when modal first opens
  useEffect(() => {
    if (!open || fetchedRef.current) return
    fetchedRef.current = true
    const fetchArticles = async () => {
      setLoading(true)
      setFetchError(false)
      try {
        const data = await api.get<ArticleListItem[]>("/articles?pageSize=100")
        setArticles(Array.isArray(data) ? data : [])
      } catch {
        setFetchError(true)
      } finally {
        setLoading(false)
      }
    }
    void fetchArticles()
  }, [open])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30)
      return () => clearTimeout(t)
    }
  }, [open])

  // Cmd/Ctrl+K global shortcut + Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); openModal() }
      if (e.key === "Escape") closeModal()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  })

  const q = query.trim().toLowerCase()
  const filtered = q.length > 0
    ? articles.filter((a) =>
        a.title.toLowerCase().includes(q) ||
        a.category?.name.toLowerCase().includes(q) ||
        a.excerpt?.toLowerCase().includes(q)
      ).slice(0, 8)
    : articles.slice(0, 6)

  const navigate = (slug: string) => {
    closeModal()
    router.push(`/articles/${slug}`)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setCursor((c) => Math.min(c + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setCursor((c) => Math.max(c - 1, 0))
    } else if (e.key === "Enter" && filtered[cursor]) {
      navigate(filtered[cursor].slug)
    }
  }

  // Reset cursor when query changes
  useEffect(() => setCursor(0), [query])

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={openModal}
        className="flex items-center gap-2 h-9 px-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-sm"
        aria-label="Search articles"
      >
        <Search className="size-4 shrink-0" />
        <span className="hidden sm:inline text-xs">Search</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 text-[10px] font-mono bg-muted/80 border border-border rounded px-1.5 py-0.5 leading-none">
          ⌘K
        </kbd>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm" />

          {/* Panel */}
          <div
            className="relative w-full max-w-xl bg-background rounded-2xl border border-border/80 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input row */}
            <div className="flex items-center gap-3 px-4 border-b border-border">
              <Search className="size-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Search articles…"
                className="flex-1 h-14 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={closeModal}
                className="size-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[420px] overflow-y-auto">
              {loading && (
                <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Loading articles…
                </div>
              )}

              {!loading && fetchError && (
                <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Could not load articles — make sure the server is running.
                </div>
              )}

              {!loading && !fetchError && q.length > 0 && filtered.length === 0 && (
                <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No results for <span className="font-semibold text-foreground">&ldquo;{query}&rdquo;</span>
                </div>
              )}

              {!loading && !fetchError && filtered.length > 0 && (
                <ul className="py-2">
                  {q.length === 0 && (
                    <li className="px-4 pt-1 pb-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Recent articles
                      </span>
                    </li>
                  )}
                  {filtered.map((article, i) => (
                    <li key={article.id}>
                      <button
                        onClick={() => navigate(article.slug)}
                        onMouseEnter={() => setCursor(i)}
                        className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
                          cursor === i ? "bg-muted" : "hover:bg-muted/50"
                        }`}
                      >
                        {/* Thumbnail */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={articleThumb(article.id, article.ogImage)}
                          alt=""
                          className="size-12 rounded-lg object-cover shrink-0 mt-0.5"
                        />
                        {/* Text */}
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm text-foreground line-clamp-1 leading-snug">
                            {article.title}
                          </p>
                          {article.excerpt && (
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
                              {article.excerpt}
                            </p>
                          )}
                          {article.category && (
                            <span className="text-[11px] font-semibold text-primary mt-1 inline-block">
                              {article.category.name}
                            </span>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer hints */}
            <div className="px-4 py-2.5 border-t border-border flex items-center gap-4 text-[11px] text-muted-foreground">
              <span><kbd className="font-mono text-[10px] bg-muted px-1 rounded">↑↓</kbd> navigate</span>
              <span><kbd className="font-mono text-[10px] bg-muted px-1 rounded">↵</kbd> open</span>
              <span><kbd className="font-mono text-[10px] bg-muted px-1 rounded">Esc</kbd> close</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
