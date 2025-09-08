"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Calendar, BarChart3, Settings, Mail } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Create Event",
      description: "Start planning your next event",
      icon: Plus,
      href: "/events/create",
      color: "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90",
    },
    {
      title: "Browse Events",
      description: "View all your events",
      icon: Calendar,
      href: "/events",
      color: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    },
    {
      title: "Guest Analytics",
      description: "Analyze guest behavior",
      icon: BarChart3,
      href: "/dashboard/analytics",
      color: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    },
    {
      title: "Email Guests",
      description: "Send updates to attendees",
      icon: Mail,
      href: "/dashboard/communications",
      color: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
    },
  ]

  return (
    <Card className="border-0 shadow-lg bg-gradient-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button className={`w-full h-auto p-4 flex flex-col items-center gap-2 ${action.color} text-white`}>
                <action.icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
