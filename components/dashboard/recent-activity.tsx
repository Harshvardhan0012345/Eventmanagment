"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, XCircle, Clock, Calendar, Users } from "lucide-react"
import type { RSVP, Event } from "@/lib/types"
import { storage } from "@/lib/storage"

interface RecentActivityProps {
  rsvps: RSVP[]
  events: Event[]
}

export function RecentActivity({ rsvps, events }: RecentActivityProps) {
  // Get recent RSVPs (last 10)
  const recentRSVPs = [...rsvps]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 10)

  // Get recent events (last 5)
  const recentEvents = [...events]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const getStatusIcon = (status: RSVP["status"]) => {
    switch (status) {
      case "attending":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "not-attending":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "maybe":
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: RSVP["status"]) => {
    switch (status) {
      case "attending":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "not-attending":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "maybe":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Recent RSVPs */}
      <Card className="border-0 shadow-lg bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Recent RSVPs
          </CardTitle>
          <CardDescription>Latest guest responses to your events</CardDescription>
        </CardHeader>
        <CardContent>
          {recentRSVPs.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No RSVPs yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentRSVPs.map((rsvp) => {
                const event = storage.getEventById(rsvp.eventId)
                return (
                  <div
                    key={rsvp.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {rsvp.guestName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">{rsvp.guestName}</p>
                        <Badge className={getStatusColor(rsvp.status)} variant="secondary">
                          <span className="flex items-center gap-1">
                            {getStatusIcon(rsvp.status)}
                            {rsvp.status.replace("-", " ")}
                          </span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{event?.title || "Unknown Event"}</p>
                      {rsvp.plusOnes > 0 && <p className="text-xs text-muted-foreground">+{rsvp.plusOnes} guests</p>}
                    </div>
                    <div className="text-xs text-muted-foreground">{formatTimeAgo(rsvp.updatedAt)}</div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Events */}
      <Card className="border-0 shadow-lg bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Recent Events
          </CardTitle>
          <CardDescription>Your latest created events</CardDescription>
        </CardHeader>
        <CardContent>
          {recentEvents.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No events created yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentEvents.map((event) => {
                const eventRSVPs = rsvps.filter((rsvp) => rsvp.eventId === event.id)
                const attendingCount = eventRSVPs.filter((rsvp) => rsvp.status === "attending").length
                const isUpcoming = new Date(`${event.date}T${event.time}`) > new Date()

                return (
                  <div key={event.id} className="p-3 rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(`${event.date}T${event.time}`).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <Badge variant={isUpcoming ? "default" : "secondary"} className="ml-2">
                        {isUpcoming ? "Upcoming" : "Past"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {attendingCount} / {event.capacity} attending
                      </span>
                      <span className="text-muted-foreground">{formatTimeAgo(event.createdAt)}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((attendingCount / event.capacity) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
