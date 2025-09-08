"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"

export function GlobalNav() {
  const pathname = usePathname()
  const hideOnRoutes = ["/login"]

  if (hideOnRoutes.includes(pathname)) {
    return null
  }

  return <Navbar />
}


