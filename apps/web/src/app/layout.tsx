import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const SITE_URL = "https://www.factverseinsights.com"
const SITE_NAME = "Factverse Insights"
const SITE_DESCRIPTION =
  "Factverse Insights delivers AI-powered, fact-checked news and in-depth analysis across politics, technology, science, and world affairs. Stay informed with intelligent, curated stories."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI-Powered Fact-Checked News`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI news",
    "fact-checked news",
    "breaking news",
    "world news",
    "technology news",
    "politics news",
    "science news",
    "Factverse Insights",
    "intelligent news",
    "curated news",
    "AI journalism",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — AI-Powered Fact-Checked News`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — AI-Powered Fact-Checked News`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@factverseinsights",
    creator: "@factverseinsights",
    title: `${SITE_NAME} — AI-Powered Fact-Checked News`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "500x500", type: "image/png" },
      { url: "/logo-2000.png", sizes: "2000x2000", type: "image/png" },
    ],
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  category: "news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
