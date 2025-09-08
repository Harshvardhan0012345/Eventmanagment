"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, MapPin, Clock, ArrowRight, Eye, CalendarDays } from "lucide-react"
import type { Event, RSVP } from "@/lib/types"
import { storage } from "@/lib/storage"
import Link from "next/link"

export default function UserDashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [userRSVPs, setUserRSVPs] = useState<RSVP[]>([])
  const [userEvents, setUserEvents] = useState<Event[]>([])
  const [dashboardLoading, setDashboardLoading] = useState(true)

  useEffect(() => {
    if (!loading && (!user || user.role !== "guest")) {
      router.push("/")
      return
    }

    if (user) {
      const rsvps = storage.getRSVPs().filter((rsvp) => rsvp.guestEmail === user.email)
      const events = storage.getEvents().filter((event) => 
        rsvps.some((rsvp) => rsvp.eventId === event.id)
      )

      setUserRSVPs(rsvps)
      setUserEvents(events)
      setDashboardLoading(false)
    }
  }, [user, loading, router])

  if (loading || dashboardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!user || user.role !== "guest") {
    return null
  }

  const upcomingEvents = userEvents.filter((event) => new Date(`${event.date}T${event.time}`) > new Date())
  const pastEvents = userEvents.filter((event) => new Date(`${event.date}T${event.time}`) <= new Date())

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-8 w-8 text-primary" />
              My Events
            </h1>
            <p className="text-muted-foreground mt-1">Welcome back, {user.name}! Here's your event overview.</p>
          </div>

          <Link href="/events">
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Calendar className="mr-2 h-4 w-4" />
              Browse More Events
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total RSVPs</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userRSVPs.length}</div>
              <p className="text-xs text-muted-foreground">Events you've responded to</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-500">Upcoming Events</CardTitle>
              <CalendarDays className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{upcomingEvents.length}</div>
              <p className="text-xs text-muted-foreground">Events happening soon</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-500">Attending</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {userRSVPs.filter((rsvp) => rsvp.status === "attending").length}
              </div>
              <p className="text-xs text-muted-foreground">Events you're going to</p>
            </CardContent>
          </Card>
        </div>

        {/* Events Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          {/* Upcoming Events */}
          <TabsContent value="upcoming">
            <Card className="border-0 shadow-lg bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  Upcoming Events ({upcomingEvents.length})
                </CardTitle>
                <CardDescription>Events you're planning to attend</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No upcoming events</h3>
                    <p className="text-muted-foreground mb-4">Start browsing events to find something exciting!</p>
                    <Link href="/events">
                      <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                        <Calendar className="mr-2 h-4 w-4" />
                        Browse Events
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event) => {
                      const userRSVP = userRSVPs.find((rsvp) => rsvp.eventId === event.id)
                      const organizer = storage.getUserById(event.organizerId)

                      return (
                        <Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant={userRSVP?.status === "attending" ? "default" : "secondary"}>
                                {userRSVP?.status === "attending" ? "Attending" : "Not Attending"}
                              </Badge>
                              <Badge variant="outline" className="capitalize">
                                {event.category}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                            <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(`${event.date}T${event.time}`).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>Organized by {organizer?.name || "Unknown"}</span>
                            </div>
                            <Link href={`/events/${event.id}`}>
                              <Button variant="outline" className="w-full">
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Past Events */}
          <TabsContent value="past">
            <Card className="border-0 shadow-lg bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Past Events ({pastEvents.length})
                </CardTitle>
                <CardDescription>Events you've attended</CardDescription>
              </CardHeader>
              <CardContent>
                {pastEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No past events</h3>
                    <p className="text-muted-foreground">Your event history will appear here</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastEvents.map((event) => {
                      const userRSVP = userRSVPs.find((rsvp) => rsvp.eventId === event.id)
                      const organizer = storage.getUserById(event.organizerId)

                      return (
                        <Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant={userRSVP?.status === "attending" ? "default" : "secondary"}>
                                {userRSVP?.status === "attending" ? "Attended" : "Didn't Attend"}
                              </Badge>
                              <Badge variant="outline" className="capitalize">
                                {event.category}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                            <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(`${event.date}T${event.time}`).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>Organized by {organizer?.name || "Unknown"}</span>
                            </div>
                            <Link href={`/events/${event.id}`}>
                              <Button variant="outline" className="w-full">
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
