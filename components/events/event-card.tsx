"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, MapPin, Users, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Event, RSVP, User } from "@/lib/types"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"

const API_URL = 'http://localhost:5000';

interface EventCardProps {
  event: Event
  organizerName?: string; // Add organizerName as an optional prop
  onEdit?: (event: Event) => void
  onDelete?: (eventId: string) => void
  showActions?: boolean
}

export function EventCard({ event, organizerName, onEdit, onDelete, showActions = false }: EventCardProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [userRsvp, setUserRsvp] = useState<RSVP | null>(null)

  useEffect(() => {
    const fetchRsvps = async () => {
      try {
        const response = await axios.get(`${API_URL}/rsvps/event/${event._id}`);
        const eventRsvps = response.data;
        setRsvps(eventRsvps);

        if (user) {
          const existingRsvp = eventRsvps.find((rsvp: RSVP) => rsvp.guestEmail === user.email);
          setUserRsvp(existingRsvp || null);
        }
      } catch (error) {
        console.error("Failed to fetch RSVPs for event", error);
      }
    };
    fetchRsvps();
  }, [event._id, user]);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(event._id)
    }
  }

  const attendingCount = rsvps.filter((rsvp) => rsvp.status === "attending").length

  const formatDate = (date: string, time: string) => {
    const eventDate = new Date(date)
    return eventDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getCategoryColor = (category: Event["category"]) => {
    const colors = {
      wedding: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      corporate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      birthday: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      conference: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    }
    return colors[category] || colors.other
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <Badge className={getCategoryColor(event.category)} variant="secondary">
                {event.category}
              </Badge>
              {!event.isPublic && (
                <Badge variant="outline" className="text-xs">
                  Private
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {event.title}
            </h3>
          </div>

          {showActions && user?._id === event.organizerId && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(event)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {event.imageUrl && (
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <img src={event.imageUrl || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
          </div>
        )}

        <p className="text-muted-foreground text-sm line-clamp-2">{event.description}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>
              {formatDate(event.date, event.time)} at {formatTime(event.time)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="truncate">{event.location}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>
              {attendingCount} attending • {event.capacity - attendingCount} spots left
            </span>
          </div>
        </div>

        {userRsvp && (
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                userRsvp.status === "attending"
                  ? "bg-green-500"
                  : userRsvp.status === "not-attending"
                    ? "bg-red-500"
                    : "bg-yellow-500"
              }`}
            />
            <span className="text-sm font-medium capitalize">You're {userRsvp.status.replace("-", " ")}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                {organizerName?.charAt(0) || "O"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              by {organizerName || "Unknown"}
            </span>
          </div>

          <Link href={`/events/${event._id}`}>
            <Button size="sm" variant="outline" className="h-8 bg-transparent">
              <Eye className="mr-1 h-3 w-3" />
              View
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

