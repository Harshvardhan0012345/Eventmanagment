"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Sparkles, ArrowRight, Star, CheckCircle } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  
  const features = [
   
    "Smart RSVP management",
    "Real-time analytics",
    "Guest communication tools",
  ]

  const testimonials = [
    {
      name: "Jayshekhar Kale ",
      role: "Wedding Planner",
      content: "EventFlow made managing our 200+ guest wedding seamless. The RSVP tracking was perfect!",
      rating: 5,
    },
    {
      name: "Tech Conference",
      role: "Event Organizer",
      content: "Increased our event attendance by 40% with EventFlow's beautiful event pages.",
      rating: 5,
    },
  ]

  return (
    <div className="relative">
      {/* Main Hero */}
      <section 
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          backgroundImage: "url('/images/home.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            {/* Badge
            <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/20 px-4 py-2">
              <Sparkles className="mr-2 h-4 w-4" />
              Trusted by 10,000+ event organizers
            </Badge> */}

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                Create{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Memorable Events
                </span>
                <br />
                Effortlessly
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                The modern platform for event management. Beautiful pages, smart RSVPs, and powerful analytics - all in
                one place.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/login?tab=register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-14 px-8 text-lg"
                >
                  Start Creating Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/events">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-transparent">
                  <Calendar className="mr-2 h-5 w-5" />
                  Browse Events
                </Button>
              </Link>
            </div>

            {/* Feature List */}
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Loved by event organizers worldwide</h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-muted-foreground">4.9/5 from 2,000+ reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-gradient-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
