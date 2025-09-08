"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Clock, Users, Search, Download, Mail } from "lucide-react"
import type { Event, RSVP } from "@/lib/types"
import { storage } from "@/lib/storage"
import { useAuth } from "@/contexts/auth-context"

interface GuestListProps {
  event: Event
}

export function GuestList({ event }: GuestListProps) {
  const { user } = useAuth()
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [filteredRsvps, setFilteredRsvps] = useState<RSVP[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    const eventRsvps = storage.getRSVPsByEvent(event.id)
    setRsvps(eventRsvps)
    setFilteredRsvps(eventRsvps)
  }, [event.id])

  useEffect(() => {
    let filtered = rsvps

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (rsvp) =>
          rsvp.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rsvp.guestEmail.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((rsvp) => rsvp.status === statusFilter)
    }

    setFilteredRsvps(filtered)
  }, [rsvps, searchQuery, statusFilter])

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

  const getStatusBadge = (status: RSVP["status"]) => {
    const variants = {
      attending: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "not-attending": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      maybe: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    }
    return variants[status]
  }

  const stats = {
    attending: rsvps.filter((rsvp) => rsvp.status === "attending").length,
    notAttending: rsvps.filter((rsvp) => rsvp.status === "not-attending").length,
    maybe: rsvps.filter((rsvp) => rsvp.status === "maybe").length,
    totalPlusOnes: rsvps.reduce((sum, rsvp) => sum + (rsvp.plusOnes || 0), 0),
  }

  // Only show to organizers
  if (!user || user.id !== event.organizerId) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.attending}</p>
                <p className="text-xs text-muted-foreground">Attending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stats.maybe}</p>
                <p className="text-xs text-muted-foreground">Maybe</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.notAttending}</p>
                <p className="text-xs text-muted-foreground">Not Attending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{stats.totalPlusOnes}</p>
                <p className="text-xs text-muted-foreground">Plus Ones</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Guest List */}
      <Card className="border-0 shadow-lg bg-gradient-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Guest List ({filteredRsvps.length})
              </CardTitle>
              <CardDescription>Manage your event attendees</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Email All
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search guests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 h-10">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="attending">Attending</SelectItem>
                <SelectItem value="maybe">Maybe</SelectItem>
                <SelectItem value="not-attending">Not Attending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Guest List */}
          {filteredRsvps.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                {rsvps.length === 0 ? "No RSVPs yet" : "No guests match your filters"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRsvps.map((rsvp) => (
                <div
                  key={rsvp.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {rsvp.guestName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{rsvp.guestName}</p>
                      <p className="text-sm text-muted-foreground">{rsvp.guestEmail}</p>
                      {rsvp.plusOnes > 0 && <p className="text-xs text-muted-foreground">+{rsvp.plusOnes} guests</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className={getStatusBadge(rsvp.status)} variant="secondary">
                      <span className="flex items-center gap-1">
                        {getStatusIcon(rsvp.status)}
                        {rsvp.status.replace("-", " ")}
                      </span>
                    </Badge>
                    <p className="text-xs text-muted-foreground">{new Date(rsvp.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
