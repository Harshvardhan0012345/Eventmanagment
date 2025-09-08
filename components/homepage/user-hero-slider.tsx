"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Plus, BarChart3, Calendar, Users, Sparkles } from "lucide-react"
import Link from "next/link"
import { ImageSlider } from "@/components/ui/image-slider"
import { useAuth } from "@/contexts/auth-context"

export function UserHeroSlider() {
  const { user } = useAuth()
  
  // Array of background images for the slider
  const backgroundImages = [
    "/home.jpeg",
    "/home1.jpg",
    "/wedding1.jpeg", 
    "/garba 1.jpeg"
  ]

  return (
    <div className="relative">
      {/* Full-screen Image Slider */}
      <ImageSlider 
        images={backgroundImages}
        autoPlayInterval={7000}
        showControls={true}
        showIndicators={true}
      />

      {/* Central Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Welcome Badge */}
          <div className="mb-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 text-sm font-medium animate-pulse-glow">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span>Welcome back to EventFlow</span>
            </div>
          </div>

          {/* Personalized Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 drop-shadow-2xl animate-fade-in">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              {user?.name?.split(" ")[0] || "User"}
            </span>
          </h1>

          {/* Role-specific Subtitle */}
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 drop-shadow-lg animate-fade-in">
            {user?.role === "organizer"
              ? "Ready to create amazing events and connect with your audience? Let's make something extraordinary happen."
              : "Discover exciting events and connect with your community. Your next adventure awaits!"}
          </p>

          {/* Role-specific Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-slide-up">
            {user?.role === "organizer" ? (
              <>
                <Link href="/events/create">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 h-14 px-8 text-lg font-semibold shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Create New Event
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-14 px-8 text-lg bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  >
                    <BarChart3 className="mr-2 h-5 w-5" />
                    View Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/events">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 h-14 px-8 text-lg font-semibold shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Browse Events
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-8 text-lg bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <Users className="mr-2 h-5 w-5" />
                  My RSVPs
                </Button>
              </>
            )}
          </div>

          {/* Role-specific Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto animate-slide-up">
            {user?.role === "organizer" ? (
              <>
                <div className="flex flex-col items-center gap-2 text-white/80">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Plus className="h-6 w-6 text-yellow-300" />
                  </div>
                  <span className="text-sm font-medium">Create Events</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-white/80">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <BarChart3 className="h-6 w-6 text-yellow-300" />
                  </div>
                  <span className="text-sm font-medium">Analytics</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-white/80">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Users className="h-6 w-6 text-yellow-300" />
                  </div>
                  <span className="text-sm font-medium">Guest Management</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center gap-2 text-white/80">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Calendar className="h-6 w-6 text-yellow-300" />
                  </div>
                  <span className="text-sm font-medium">Discover Events</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-white/80">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Users className="h-6 w-6 text-yellow-300" />
                  </div>
                  <span className="text-sm font-medium">RSVP Management</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-white/80">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="h-6 w-6 text-yellow-300" />
                  </div>
                  <span className="text-sm font-medium">Connect</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  )
}
