"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, BarChart3, ArrowRight, Plus, Star, MapPin, Clock, Sparkles, Heart, TrendingUp } from "lucide-react"
import { PublicEventGrid } from "@/components/public/public-event-grid"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { UserHeroSlider } from "@/components/homepage/user-hero-slider"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Redirect to public page if no user
  useEffect(() => {
    if (!loading && !user) {
      router.push("/public")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to /public
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Hero Section with Background Image Slider */}
      <UserHeroSlider />

      {/* Featured Events Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Featured Events</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Discover{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Amazing Events
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From intimate gatherings to grand celebrations, find events that match your interests and create unforgettable memories.
              </p>
            </div>
          </ScrollReveal>

          {/* Events Grid with Enhanced Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <ScrollReveal key={i} delay={i * 200}>
                <Card className="group border-0 shadow-xl bg-gradient-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={`/event-${i}.jpg`}
                      alt={`Featured Event ${i}`}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `/modern-event-celebration.png`;
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-primary">
                        <Star className="inline h-3 w-3 mr-1 fill-current" />
                        Featured
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {["Wedding", "Corporate", "Birthday"][i - 1]}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        Soon
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {["Elegant Wedding Celebration", "Tech Innovation Summit", "Birthday Bash"][i - 1]}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {[
                        "Join us for a magical celebration of love and commitment in a stunning venue.",
                        "Connect with industry leaders and discover the latest technological breakthroughs.",
                        "A fun-filled celebration with amazing food, music, and unforgettable moments."
                      ][i - 1]}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>Premium Venue</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>150+ guests</span>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 group-hover:scale-105 transition-transform">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Call to Action */}
          <ScrollReveal delay={800}>
            <div className="text-center">
              <Link href="/events">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-14 px-8 text-lg group">
                  Explore All Events
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Create{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Unforgettable Moments
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our platform helps you bring your vision to life with stunning event pages and seamless management tools.
              </p>
            </div>
          </ScrollReveal>

          {/* Enhanced Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { src: "/modern-event-celebration.png", alt: "Celebration", title: "Celebrations" },
              { src: "/professional-cto-developer.png", alt: "Team", title: "Team Events" },
              { src: "/diverse-celebration.png", alt: "Diverse celebration", title: "Diverse Events" },
              { src: "/modern-customer-support.png", alt: "Support", title: "24/7 Support" }
            ].map((image, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold mb-1">{image.title}</h3>
                    <p className="text-sm text-white/80">Professional quality</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events for Guests */}
      {user.role === "guest" && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accent/5 to-primary/5">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/20 to-primary/20 px-4 py-2 rounded-full mb-6">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-accent">Trending Now</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Events You Might Love
                </h2>
                <p className="text-lg text-muted-foreground">
                  Based on your interests and preferences
                </p>
              </div>
            </ScrollReveal>
            <PublicEventGrid limit={6} showHeader={false} />
          </div>
        </section>
      )}

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              {/* <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Everything you need for{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  perfect events
                </span>
              </h2> */}
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Powerful tools designed for modern event management with stunning visuals and seamless user experience
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Smart Event Creation",
                description: "Create beautiful event pages with customizable templates and real-time previews",
                color: "text-primary",
                bgColor: "bg-primary/10"
              },
              {
                icon: Users,
                title: "Guest Management",
                description: "Track RSVPs, manage guest lists, and send automated reminders effortlessly",
                color: "text-accent",
                bgColor: "bg-accent/10"
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                description: "Get insights into attendance patterns, engagement metrics, and event performance",
                color: "text-primary",
                bgColor: "bg-primary/10"
              }
            ].map((feature, index) => (
              <ScrollReveal key={index} delay={index * 200}>
                <Card className="group border-0 shadow-xl bg-gradient-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <CardHeader>
                    <div className={`p-3 rounded-xl ${feature.bgColor} w-fit group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <Card className="border-0 shadow-2xl bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 px-6 py-3 rounded-full">
                    <Heart className="h-5 w-5 text-primary" />
                    <span className="font-medium text-primary">Ready to get started?</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold">
                    {user.role === "organizer"
                      ? "Create your first event and start building your community"
                      : "Explore upcoming events and connect with others"}
                  </h3>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Join thousands of users who trust EventFlow for their most important moments
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href={user.role === "organizer" ? "/events/create" : "/events"}>
                      <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-14 px-8 text-lg group hover:scale-105 transition-transform">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Button variant="outline" className="h-14 px-8 text-lg bg-white/50 hover:bg-white/70 transition-colors">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
