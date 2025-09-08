"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, TrendingUp, CheckCircle } from "lucide-react"
import type { Event, RSVP } from "@/lib/types"

interface AnalyticsCardsProps {
  events: Event[]
  rsvps: RSVP[]
}

export function AnalyticsCards({ events, rsvps }: AnalyticsCardsProps) {
  const totalEvents = events.length
  const totalRSVPs = rsvps.length
  const attendingCount = rsvps.filter((rsvp) => rsvp.status === "attending").length
  const maybeCount = rsvps.filter((rsvp) => rsvp.status === "maybe").length
  const notAttendingCount = rsvps.filter((rsvp) => rsvp.status === "not-attending").length

  // Calculate upcoming events
  const now = new Date()
  const upcomingEvents = events.filter((event) => new Date(`${event.date}T${event.time}`) > now)

  // Calculate average attendance rate
  const attendanceRate = totalRSVPs > 0 ? Math.round((attendingCount / totalRSVPs) * 100) : 0

  // Calculate total capacity and utilization
  const totalCapacity = events.reduce((sum, event) => sum + event.capacity, 0)
  const capacityUtilization = totalCapacity > 0 ? Math.round((attendingCount / totalCapacity) * 100) : 0

  const cards = [
    {
      title: "Total Events",
      value: totalEvents,
      description: `${upcomingEvents.length} upcoming`,
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
      trend: totalEvents > 0 ? "+12%" : null,
    },
    {
      title: "Total RSVPs",
      value: totalRSVPs,
      description: "All responses",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
      trend: totalRSVPs > 0 ? "+8%" : null,
    },
    {
      title: "Attendance Rate",
      value: `${attendanceRate}%`,
      description: `${attendingCount} attending`,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
      trend: attendanceRate > 70 ? "Excellent" : attendanceRate > 50 ? "Good" : "Needs work",
    },
    {
      title: "Capacity Used",
      value: `${capacityUtilization}%`,
      description: `${attendingCount} / ${totalCapacity} spots`,
      icon: CheckCircle,
      color: "text-accent",
      bgColor: "bg-accent/10",
      trend: capacityUtilization > 80 ? "High demand" : "Available",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="border-0 shadow-lg bg-gradient-card hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{card.value}</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{card.description}</p>
              {card.trend && (
                <Badge variant="secondary" className="text-xs">
                  {card.trend}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
