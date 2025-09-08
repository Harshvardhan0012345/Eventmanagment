import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { GlobalNav } from "@/components/layout/global-nav"

export const metadata: Metadata = {
  title: "EventFlow - Modern Event RSVP Management",
  description: "Create memorable events and manage RSVPs effortlessly with EventFlow",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <AuthProvider>
          <GlobalNav />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
