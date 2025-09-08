"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Shield,
  Users,
  Calendar,
  BarChart3,
  Search,
  Settings,
  Trash2,
  Edit,
  Eye,
  UserCheck,
  UserX,
  AlertTriangle,
} from "lucide-react"
import type { Event, RSVP, User } from "@/lib/types"
import { storage } from "@/lib/storage"
import Link from "next/link"

export default function AdminDashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [allRSVPs, setAllRSVPs] = useState<RSVP[]>([])
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [dashboardLoading, setDashboardLoading] = useState(true)

  useEffect(() => {
    // For demo purposes, we'll allow organizers to access admin dashboard
    // In a real app, you'd have a separate admin role
    if (!loading && (!user || user.role !== "organizer")) {
      router.push("/")
      return
    }

    if (user) {
      const events = storage.getEvents()
      const rsvps = storage.getRSVPs()
      const users = storage.getUsers()

      setAllEvents(events)
      setAllRSVPs(rsvps)
      setAllUsers(users)
      setDashboardLoading(false)
    }
  }, [user, loading, router])

  const handleDeleteEvent = (eventId: string) => {
    if (confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      const updatedEvents = allEvents.filter((event) => event.id !== eventId)
      const updatedRSVPs = allRSVPs.filter((rsvp) => rsvp.eventId !== eventId)
      setAllEvents(updatedEvents)
      setAllRSVPs(updatedRSVPs)
      // In a real app, you'd update the storage here
    }
  }

  const filteredEvents = allEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalEvents = allEvents.length
  const totalUsers = allUsers.length
  const totalRSVPs = allRSVPs.length
  const organizers = allUsers.filter((user) => user.role === "organizer").length
  const guests = allUsers.filter((user) => user.role === "guest").length
  const attendingRSVPs = allRSVPs.filter((rsvp) => rsvp.status === "attending").length

  if (loading || dashboardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!user || user.role !== "organizer") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">System overview and management tools</p>
          </div>

          <div className="flex gap-2">
            <Link href="/events/create">
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                <Calendar className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEvents}</div>
              <p className="text-xs text-muted-foreground">Across all organizers</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {organizers} organizers, {guests} guests
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total RSVPs</CardTitle>
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRSVPs}</div>
              <p className="text-xs text-muted-foreground">{attendingRSVPs} attending</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Engagement</CardTitle>
              <BarChart3 className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalEvents > 0 ? Math.round((totalRSVPs / totalEvents) * 10) / 10 : 0}
              </div>
              <p className="text-xs text-muted-foreground">Avg RSVPs per event</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search events, users, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="events">Events Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">System Analytics</TabsTrigger>
          </TabsList>

          {/* Events Management */}
          <TabsContent value="events">
            <Card className="border-0 shadow-lg bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  All Events ({filteredEvents.length})
                </CardTitle>
                <CardDescription>Manage all events across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredEvents.map((event) => {
                    const eventRSVPs = allRSVPs.filter((rsvp) => rsvp.eventId === event.id)
                    const organizer = allUsers.find((u) => u.id === event.organizerId)
                    const attendingCount = eventRSVPs.filter((rsvp) => rsvp.status === "attending").length

                    return (
                      <div
                        key={event.id}
                        className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent/5 transition-colors"
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {event.title.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{event.title}</h3>
                            <Badge variant={event.isPublic ? "default" : "secondary"}>
                              {event.isPublic ? "Public" : "Private"}
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {event.category}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>Organizer: {organizer?.name || "Unknown"}</p>
                            <p>Date: {new Date(`${event.date}T${event.time}`).toLocaleDateString()}</p>
                            <p>
                              RSVPs: {attendingCount} / {event.capacity}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/events/${event.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users">
            <Card className="border-0 shadow-lg bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  All Users ({filteredUsers.length})
                </CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((userData) => {
                    const userEvents = allEvents.filter((event) => event.organizerId === userData.id)
                    const userRSVPs = allRSVPs.filter((rsvp) => rsvp.guestEmail === userData.email)

                    return (
                      <div
                        key={userData.id}
                        className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent/5 transition-colors"
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {userData.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{userData.name}</h3>
                            <Badge
                              variant={userData.role === "organizer" ? "default" : "secondary"}
                              className="capitalize"
                            >
                              {userData.role}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>{userData.email}</p>
                            <p>
                              {userData.role === "organizer"
                                ? `${userEvents.length} events created`
                                : `${userRSVPs.length} RSVPs`}
                            </p>
                            <p>Joined: {new Date(userData.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          {userData.id !== user.id && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive hover:text-destructive bg-transparent"
                            >
                              <UserX className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Analytics */}
          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Platform Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Event Categories</span>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        Wedding: {allEvents.filter((e) => e.category === "wedding").length}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Corporate: {allEvents.filter((e) => e.category === "corporate").length}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Birthday: {allEvents.filter((e) => e.category === "birthday").length}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>RSVP Response Rate</span>
                    <span className="font-semibold">
                      {totalEvents > 0 ? Math.round((totalRSVPs / (totalEvents * 10)) * 100) : 0}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Average Event Capacity</span>
                    <span className="font-semibold">
                      {totalEvents > 0
                        ? Math.round(allEvents.reduce((sum, e) => sum + e.capacity, 0) / totalEvents)
                        : 0}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Active Events</span>
                    <Badge variant="default">
                      {allEvents.filter((e) => new Date(`${e.date}T${e.time}`) > new Date()).length}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Recent Signups (7d)</span>
                    <Badge variant="secondary">
                      {
                        allUsers.filter((u) => {
                          const weekAgo = new Date()
                          weekAgo.setDate(weekAgo.getDate() - 7)
                          return new Date(u.createdAt) > weekAgo
                        }).length
                      }
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>System Status</span>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      Operational
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
