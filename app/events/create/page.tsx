"use client"

import { useAuth } from "@/contexts/auth-context"
import { EventForm } from "@/components/events/event-form"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function CreateEventPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== "organizer")) {
      router.push("/")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!user || user.role !== "organizer") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="py-8">
        <EventForm />
      </div>
    </div>
  )
}
