"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { RSVPForm } from "@/components/rsvp/rsvp-form"
import { GuestList } from "@/components/rsvp/guest-list"
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, Edit } from "lucide-react"
import type { Event, RSVP } from "@/lib/types"
import { storage } from "@/lib/storage"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function EventDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [event, setEvent] = useState<Event | null>(null)
  const [userRsvp, setUserRsvp] = useState<RSVP | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const eventId = params.id as string
    const foundEvent = storage.getEventById(eventId)

    if (!foundEvent) {
      router.push("/events")
      return
    }

    setEvent(foundEvent)

    if (user) {
      const existingRsvp = storage.getRSVPByEventAndEmail(eventId, user.email)
      setUserRsvp(existingRsvp || null)
    }

    setLoading(false)
  }, [params.id, user, router])

  const handleRSVPSubmit = (rsvp: RSVP) => {
    setUserRsvp(rsvp)
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: event?.title,
        text: event?.description,
        url: window.location.href,
      })
    } catch (error) {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "Event link has been copied to your clipboard.",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!event) {
    return null
  }

  const organizer = storage.getUserById(event.organizerId)
  const isOrganizer = user?.id === event.organizerId
  const rsvps = storage.getRSVPsByEvent(event.id)
  const attendingCount = rsvps.filter((rsvp) => rsvp.status === "attending").length

  const formatDate = (date: string, time: string) => {
    const eventDate = new Date(`${date}T${time}`)
    return {
      date: eventDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: eventDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    }
  }

  const getCategoryColor = (category: Event["category"]) => {
    const colors = {
      wedding: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      corporate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      birthday: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      conference: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    }
    return colors[category] || colors.other
  }

  const { date, time } = formatDate(event.date, event.time)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getCategoryColor(event.category)} variant="secondary">
                {event.category}
              </Badge>
              {!event.isPublic && (
                <Badge variant="outline" className="text-xs">
                  Private
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            {isOrganizer && (
              <Link href={`/events/${event.id}/edit`}>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Image */}
            {event.imageUrl && (
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="aspect-video">
                  <img
                    src={event.imageUrl || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
            )}

            {/* Event Details */}
            <Card className="border-0 shadow-lg bg-gradient-card">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">About This Event</h2>
                  <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                </div>

                <Separator />

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Date & Time</p>
                        <p className="text-sm text-muted-foreground">{date}</p>
                        <p className="text-sm text-muted-foreground">{time}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Capacity</p>
                        <p className="text-sm text-muted-foreground">
                          {attendingCount} / {event.capacity} attending
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">RSVP Deadline</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.rsvpDeadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Organizer Info */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {organizer?.name?.charAt(0) || "O"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Organized by</p>
                    <p className="text-sm text-muted-foreground">{organizer?.name || "Unknown"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guest List (Organizer Only) */}
            {isOrganizer && <GuestList event={event} />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* RSVP Form */}
            {user && !isOrganizer && <RSVPForm event={event} existingRSVP={userRsvp} onRSVPSubmit={handleRSVPSubmit} />}

            {/* Event Stats */}
            <Card className="border-0 shadow-lg bg-gradient-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Event Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total RSVPs</span>
                    <span className="font-medium">{rsvps.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Attending</span>
                    <span className="font-medium text-green-600">{attendingCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Spots Left</span>
                    <span className="font-medium">{event.capacity - attendingCount}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Capacity</span>
                    <span>
                      {attendingCount} / {event.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((attendingCount / event.capacity) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
