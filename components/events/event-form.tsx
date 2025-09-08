"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar, MapPin, Clock, ImageIcon, Save, ArrowLeft } from "lucide-react"
import type { Event } from "@/lib/types"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import axios from "axios" // Import axios

const API_URL = 'http://localhost:5000/events'; // Define your events API endpoint

export function EventForm({ event, onSave, onCancel }: {
  event?: Event
  onSave?: (event: Event) => void
  onCancel?: () => void
}) {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create an event.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    const formData = new FormData(e.currentTarget)

    const dateStr = formData.get("date") as string;
    const timeStr = formData.get("time") as string;

    // Construct the event data object from the form
    const eventData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: new Date(`${dateStr}T${timeStr}`),
      time: timeStr,
      location: formData.get("location") as string,
      capacity: Number.parseInt(formData.get("capacity") as string),
      // *** FIX: Use user._id which comes from MongoDB ***
      organizerId: user._id,
      category: formData.get("category") as Event["category"],
      isPublic: formData.get("isPublic") === "on",
      rsvpDeadline: new Date(formData.get("rsvpDeadline") as string),
      imageUrl: (formData.get("imageUrl") as string) || undefined,
    };

    try {
      if (event) {
        await axios.post(`${API_URL}/update/${event.id}`, eventData);
        toast({
          title: "Event updated!",
          description: "Your event has been successfully updated.",
        })
      } else {
        await axios.post(`${API_URL}/add`, eventData);
        toast({
          title: "Event created!",
          description: "Your event has been successfully created.",
        })
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to save event:", error);
      
      let errorMessage = "An unknown error occurred. Please try again.";
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.errors) {
          errorMessage = error.response.data.errors.join(', ');
        } else if (typeof error.response.data.message === 'string') {
          errorMessage = error.response.data.message;
        }
      }
      
      toast({
        title: "Error Creating Event",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Helper to format date for input fields
  const formatDateForInput = (dateString: string | undefined) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split('T')[0];
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onCancel || (() => router.back())} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{event ? "Edit Event" : "Create New Event"}</h1>
          <p className="text-muted-foreground">
            {event ? "Update your event details" : "Fill in the details to create your event"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Event Details
                </CardTitle>
                <CardDescription>Basic information about your event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={event?.title}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={event?.description}
                    required
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select name="category" defaultValue={event?.category || "other"}>
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="conference">Conference</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity *</Label>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      defaultValue={event?.capacity}
                      required
                      min="1"
                      className="h-11"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Date & Time
                </CardTitle>
                <CardDescription>When is your event happening?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Event Date *</Label>
                    <Input id="date" name="date" type="date" defaultValue={formatDateForInput(event?.date)} required className="h-11" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Event Time *</Label>
                    <Input id="time" name="time" type="time" defaultValue={event?.time} required className="h-11" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rsvpDeadline">RSVP Deadline *</Label>
                  <Input
                    id="rsvpDeadline"
                    name="rsvpDeadline"
                    type="date"
                    defaultValue={formatDateForInput(event?.rsvpDeadline)}
                    required
                    className="h-11"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location
                </CardTitle>
                <CardDescription>Where will your event take place?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="location">Venue Address *</Label>
                  <Input
                    id="location"
                    name="location"
                    defaultValue={event?.location}
                    required
                    className="h-11"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  Event Image
                </CardTitle>
                <CardDescription>Add a cover image for your event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    defaultValue={event?.imageUrl}
                    className="h-11"
                  />
                </div>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Image preview</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure your event settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="isPublic">Public Event</Label>
                    <p className="text-sm text-muted-foreground">Anyone can find and RSVP to this event</p>
                  </div>
                  <Switch id="isPublic" name="isPublic" defaultChecked={event?.isPublic ?? true} />
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {event ? "Updating..." : "Creating..."}
                  </div>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {event ? "Update Event" : "Create Event"}
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={onCancel || (() => router.back())}
                className="w-full h-11"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

