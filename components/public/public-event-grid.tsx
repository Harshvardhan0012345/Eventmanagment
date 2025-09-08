"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, MapPin, Users, Eye, Clock } from "lucide-react"
import type { Event } from "@/lib/types"
import { storage } from "@/lib/storage"
import Link from "next/link"

interface PublicEventGridProps {
  limit?: number
  showHeader?: boolean
}

export function PublicEventGrid({ limit = 6, showHeader = true }: PublicEventGridProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get public events only
    const publicEvents = storage
      .getEvents()
      .filter((event) => event.isPublic)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, limit)

    setEvents(publicEvents)
    setLoading(false)
  }, [limit])

  const formatDate = (date: string, time: string) => {
    const eventDate = new Date(`${date}T${time}`)
    return eventDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
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

  const isEventUpcoming = (date: string, time: string) => {
    return new Date(`${date}T${time}`) > new Date()
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(limit)].map((_, i) => (
          <Card key={i} className="border-0 shadow-lg bg-gradient-card animate-pulse">
            <CardHeader className="pb-3">
              <div className="h-4 bg-muted rounded w-1/3 mb-2" />
              <div className="h-6 bg-muted rounded w-3/4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {showHeader && (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Discover{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Amazing Events
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join exciting events happening in your community. From intimate gatherings to large conferences.
          </p>
        </div>
      )}

      {events.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No public events yet</h3>
          <p className="text-muted-foreground">Check back soon for exciting events!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const rsvps = storage.getRSVPsByEvent(event.id)
            const attendingCount = rsvps.filter((rsvp) => rsvp.status === "attending").length
            const organizer = storage.getUserById(event.organizerId)
            const isUpcoming = isEventUpcoming(event.date, event.time)

            return (
              <Card
                key={event.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-card overflow-hidden"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryColor(event.category)} variant="secondary">
                          {event.category}
                        </Badge>
                        {isUpcoming ? (
                          <Badge
                            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            variant="secondary"
                          >
                            <Clock className="mr-1 h-3 w-3" />
                            Upcoming
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            Past
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {event.imageUrl && (
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <img
                        src={event.imageUrl || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <p className="text-muted-foreground text-sm line-clamp-2">{event.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>
                        {formatDate(event.date, event.time)} at {formatTime(event.time)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="truncate">{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4 text-primary" />
                      <span>
                        {attendingCount} attending • {event.capacity - attendingCount} spots left
                      </span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Capacity</span>
                      <span>
                        {attendingCount} / {event.capacity}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((attendingCount / event.capacity) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {organizer?.name?.charAt(0) || "O"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">by {organizer?.name || "Unknown"}</span>
                    </div>

                    <Link href={`/events/${event.id}`}>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-8"
                      >
                        <Eye className="mr-1 h-3 w-3" />
                        View Event
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}

      {showHeader && events.length > 0 && (
        <div className="text-center">
          <Link href="/events">
            <Button variant="outline" size="lg" className="bg-transparent">
              View All Events
              <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
