"use client"

import { HeroSlider } from "@/components/homepage/hero-slider"
import { FeaturesShowcase } from "@/components/public/features-showcase"
import { PublicEventGrid } from "@/components/public/public-event-grid"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, BarChart3, ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"

export default function PublicPage() {
  const stats = [
    { label: "Events Created", value: "10,000+", icon: Users },
    { label: "Happy Organizers", value: "2,500+", icon: Users },
    { label: "Total RSVPs", value: "500K+", icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">

      {/* Hero Section */}
      <HeroSlider />

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/20">
        <div className="max-w-6xl mx-auto">
          {/* Image Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            <img src="/modern-event-celebration.png" alt="Celebration" className="rounded-xl w-full h-48 object-cover" />
            <img src="/professional-cto-developer.png" alt="Team" className="rounded-xl w-full h-48 object-cover" />
            <img src="/diverse-celebration.png" alt="Diverse celebration" className="rounded-xl w-full h-48 object-cover hidden md:block" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="border-0 shadow-lg bg-gradient-card text-center hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="p-3 rounded-xl bg-primary/10 w-fit mx-auto mb-4">
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <PublicEventGrid limit={6} showHeader={true} />
          </ScrollReveal>
        </div>
      </section>

      {/* Features Showcase */}
      <div id="features">
        <ScrollReveal>
          <FeaturesShowcase />
        </ScrollReveal>
      </div>

     

      {/* Footer */}
      <footer className="border-t bg-card/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <Link href="/" className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    EventFlow
                  </span>
                </Link>
                <p className="text-muted-foreground">
                  The modern platform for creating memorable events and managing RSVPs effortlessly.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <Link href="/events" className="block hover:text-primary transition-colors">
                    Browse Events
                  </Link>
                  <Link href="/pricing" className="block hover:text-primary transition-colors">
                    Pricing
                  </Link>
                  <a href="#features" className="block hover:text-primary transition-colors">
                    Features
                  </a>
                  <a href="#" className="block hover:text-primary transition-colors">
                    Integrations
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <Link href="/about" className="block hover:text-primary transition-colors">
                    About
                  </Link>
                  <a href="#" className="block hover:text-primary transition-colors">
                    Blog
                  </a>
                  <a href="#" className="block hover:text-primary transition-colors">
                    Careers
                  </a>
                  <Link href="/contact" className="block hover:text-primary transition-colors">
                    Contact
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <a href="#" className="block hover:text-primary transition-colors">
                    Help Center
                  </a>
                  <a href="#" className="block hover:text-primary transition-colors">
                    Documentation
                  </a>
                  <a href="#" className="block hover:text-primary transition-colors">
                    Community
                  </a>
                  <a href="#" className="block hover:text-primary transition-colors">
                    Status
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 EventFlow. All rights reserved. Built with ❤️ for amazing events.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
