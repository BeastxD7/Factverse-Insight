"use client"

import { useState } from "react"
import { Share2, Link, Twitter, Linkedin, MessageCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ShareButtonProps {
  title: string
  url: string
  excerpt?: string | null
}

export function ShareButton({ title, url, excerpt }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openUrl = (href: string): void => {
    window.open(href, "_blank", "noopener,noreferrer")
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`

  const handleNativeShare = async (): Promise<void> => {
    try {
      await navigator.share({ title, url, text: excerpt ?? undefined })
    } catch {
      // user cancelled or not supported
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="size-4" />
            Share
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => void handleCopy()} className="gap-2 cursor-pointer">
          {copied ? <Check className="size-4 text-green-500" /> : <Link className="size-4" />}
          {copied ? "Copied!" : "Copy link"}
        </DropdownMenuItem>

        {"share" in navigator && (
          <DropdownMenuItem onClick={() => void handleNativeShare()} className="gap-2 cursor-pointer">
            <Share2 className="size-4" />
            Share via…
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => openUrl(twitterUrl)} className="gap-2 cursor-pointer">
          <Twitter className="size-4" />
          Share on X
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openUrl(linkedinUrl)} className="gap-2 cursor-pointer">
          <Linkedin className="size-4" />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openUrl(whatsappUrl)} className="gap-2 cursor-pointer">
          <MessageCircle className="size-4" />
          WhatsApp
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
