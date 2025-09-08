"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, BarChart3, Sparkles, Zap, Shield, Globe, Heart } from "lucide-react"

export function FeaturesShowcase() {
  const features = [
    {
      icon: Calendar,
      title: "",
      description:
        "Create stunning event pages with customizable templates, rich media support, and mobile-responsive designs that wow your guests.",
      color: "text-primary",
      bgColor: "bg-primary/10",
      badge: "Popular",
    },
    {
      icon: Users,
      title: "Smart RSVP Management",
      description:
        "Track responses in real-time, manage plus-ones, collect dietary restrictions, and send automated reminders to maximize attendance.",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
      badge: "Essential",
    },
    {
      icon: BarChart3,
      title: "Powerful Analytics",
      description:
        "Get deep insights into guest behavior, attendance patterns, and event performance with interactive charts and detailed reports.",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
      badge: "Pro",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Built for speed with instant loading, real-time updates, and seamless performance across all devices and platforms.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900",
      badge: "Fast",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security, 99.9% uptime, and GDPR compliance ensure your events and guest data are always protected.",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900",
      badge: "Secure",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Multi-language support, timezone handling, and international payment processing make your events accessible worldwide.",
      color: "text-accent",
      bgColor: "bg-accent/10",
      badge: "Global",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          {/* <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/20 px-4 py-2 mb-4">
            <Sparkles className="mr-2 h-4 w-4" />
            Everything you need
          </Badge> */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Powerful features for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">modern events</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From intimate gatherings to large conferences, EventFlow provides all the tools you need to create, manage,
            and analyze successful events.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-gradient-card hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardHeader>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/10 to-accent/10 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Ready to create amazing events?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of organizers who trust EventFlow for their most important moments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/login?tab=register" className="inline-block">
                  <button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
                    Start Free Trial
                  </button>
                </a>
                <a href="/events" className="inline-block">
                  <button className="border border-border hover:bg-accent/5 px-8 py-3 rounded-lg font-medium transition-all duration-300">
                    Browse Events
                  </button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
