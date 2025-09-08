"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { useAuth } from "@/contexts/auth-context"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function LoginPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!loading && user) {
      const nextUrl = searchParams.get("next")
      const fallback = user.role === "organizer" ? "/dashboard" : "/user-dashboard"
      router.replace(nextUrl && nextUrl.startsWith("/") ? nextUrl : fallback)
    }
  }, [user, loading, router, searchParams])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (user) {
    return null // Will redirect
  }

  return <AuthForm />
}
