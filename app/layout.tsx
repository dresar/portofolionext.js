import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portofolio - Fullstack Developer",
  description: "Portofolio modern dengan teknologi terdepan",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* Preconnect to API for faster loading */}
        <link rel="preconnect" href="/api" />
        <link rel="dns-prefetch" href="/api" />
        {/* Preload critical API endpoints */}
        <link rel="prefetch" href="/api/profile" as="fetch" crossOrigin="anonymous" />
        <link rel="prefetch" href="/api/stats" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
