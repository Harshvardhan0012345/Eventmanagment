"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import type { RSVP, Event } from "@/lib/types"

interface RSVPChartProps {
  rsvps: RSVP[]
  events: Event[]
}

export function RSVPChart({ rsvps, events }: RSVPChartProps) {
  // RSVP Status Distribution
  const statusData = [
    {
      name: "Attending",
      value: rsvps.filter((rsvp) => rsvp.status === "attending").length,
      color: "hsl(var(--chart-1))",
    },
    {
      name: "Maybe",
      value: rsvps.filter((rsvp) => rsvp.status === "maybe").length,
      color: "hsl(var(--chart-2))",
    },
    {
      name: "Not Attending",
      value: rsvps.filter((rsvp) => rsvp.status === "not-attending").length,
      color: "hsl(var(--chart-3))",
    },
  ]

  // Event Performance Data
  const eventPerformance = events.map((event) => {
    const eventRSVPs = rsvps.filter((rsvp) => rsvp.eventId === event.id)
    const attending = eventRSVPs.filter((rsvp) => rsvp.status === "attending").length
    return {
      name: event.title.length > 15 ? event.title.substring(0, 15) + "..." : event.title,
      attending,
      capacity: event.capacity,
      utilization: Math.round((attending / event.capacity) * 100),
    }
  })

  const chartConfig = {
    attending: {
      label: "Attending",
      color: "hsl(var(--chart-1))",
    },
    maybe: {
      label: "Maybe",
      color: "hsl(var(--chart-2))",
    },
    notAttending: {
      label: "Not Attending",
      color: "hsl(var(--chart-3))",
    },
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* RSVP Status Distribution */}
      <Card className="border-0 shadow-lg bg-gradient-card">
        <CardHeader>
          <CardTitle>RSVP Distribution</CardTitle>
          <CardDescription>Breakdown of all RSVP responses</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="flex justify-center gap-4 mt-4">
            {statusData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-muted-foreground">
                  {item.name} ({item.value})
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Performance */}
      <Card className="border-0 shadow-lg bg-gradient-card">
        <CardHeader>
          <CardTitle>Event Performance</CardTitle>
          <CardDescription>Attendance vs capacity by event</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="name"
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis className="text-xs" tick={{ fontSize: 12 }} />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-background border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{label}</p>
                          <p className="text-sm text-muted-foreground">
                            Attending: {data.attending} / {data.capacity}
                          </p>
                          <p className="text-sm text-muted-foreground">Utilization: {data.utilization}%</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="attending" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
