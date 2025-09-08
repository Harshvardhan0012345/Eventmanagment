"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Users, MessageSquare, Utensils } from "lucide-react"
import type { Event, RSVP } from "@/lib/types"
import { storage } from "@/lib/storage"
import { generateId } from "@/lib/auth"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

interface RSVPFormProps {
  event: Event
  existingRSVP?: RSVP | null
  onRSVPSubmit?: (rsvp: RSVP) => void
}

export function RSVPForm({ event, existingRSVP, onRSVPSubmit }: RSVPFormProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<RSVP["status"]>(existingRSVP?.status || "attending")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)
    const formData = new FormData(e.currentTarget)

    try {
      const rsvpData: RSVP = {
        id: existingRSVP?.id || generateId(),
        eventId: event.id,
        guestId: user.id,
        guestName: user.name,
        guestEmail: user.email,
        status: formData.get("status") as RSVP["status"],
        plusOnes: Number.parseInt((formData.get("plusOnes") as string) || "0"),
        dietaryRestrictions: (formData.get("dietaryRestrictions") as string) || undefined,
        message: (formData.get("message") as string) || undefined,
        createdAt: existingRSVP?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      storage.addRSVP(rsvpData)

      const statusMessages = {
        attending: "Great! We're excited to see you there!",
        "not-attending": "Thanks for letting us know. We'll miss you!",
        maybe: "Thanks for your response. We hope you can make it!",
      }

      toast({
        title: existingRSVP ? "RSVP Updated!" : "RSVP Submitted!",
        description: statusMessages[rsvpData.status],
      })

      if (onRSVPSubmit) {
        onRSVPSubmit(rsvpData)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: RSVP["status"]) => {
    switch (status) {
      case "attending":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "not-attending":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "maybe":
        return <Clock className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: RSVP["status"]) => {
    switch (status) {
      case "attending":
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
      case "not-attending":
        return "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
      case "maybe":
        return "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950"
    }
  }

  const isDeadlinePassed = new Date() > new Date(event.rsvpDeadline)
  const attendingCount = storage.getRSVPsByEvent(event.id).filter((rsvp) => rsvp.status === "attending").length
  const spotsLeft = event.capacity - attendingCount

  if (isDeadlinePassed) {
    return (
      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <Clock className="h-8 w-8 text-destructive mx-auto" />
            <h3 className="font-semibold text-destructive">RSVP Deadline Passed</h3>
            <p className="text-sm text-muted-foreground">
              The RSVP deadline for this event was {new Date(event.rsvpDeadline).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (spotsLeft <= 0 && selectedStatus === "attending" && !existingRSVP) {
    return (
      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <Users className="h-8 w-8 text-destructive mx-auto" />
            <h3 className="font-semibold text-destructive">Event Full</h3>
            <p className="text-sm text-muted-foreground">
              This event has reached its capacity of {event.capacity} attendees.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg border-0 bg-gradient-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          {existingRSVP ? "Update Your RSVP" : "RSVP to Event"}
        </CardTitle>
        <CardDescription>
          {existingRSVP
            ? "You can update your response anytime before the deadline"
            : "Let us know if you'll be joining us!"}
        </CardDescription>
        {existingRSVP && (
          <Badge variant="outline" className="w-fit">
            Current Status: {existingRSVP.status.replace("-", " ")}
          </Badge>
        )}
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* RSVP Status */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Will you be attending?</Label>
            <RadioGroup
              name="status"
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value as RSVP["status"])}
              className="space-y-3"
            >
              <div
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${getStatusColor("attending")} ${selectedStatus === "attending" ? "border-green-500" : ""}`}
              >
                <RadioGroupItem value="attending" id="attending" />
                <div className="flex items-center gap-2 flex-1">
                  {getStatusIcon("attending")}
                  <div>
                    <Label htmlFor="attending" className="font-medium cursor-pointer">
                      Yes, I'll be there!
                    </Label>
                    <p className="text-xs text-muted-foreground">Count me in for this event</p>
                  </div>
                </div>
              </div>

              <div
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${getStatusColor("maybe")} ${selectedStatus === "maybe" ? "border-yellow-500" : ""}`}
              >
                <RadioGroupItem value="maybe" id="maybe" />
                <div className="flex items-center gap-2 flex-1">
                  {getStatusIcon("maybe")}
                  <div>
                    <Label htmlFor="maybe" className="font-medium cursor-pointer">
                      Maybe
                    </Label>
                    <p className="text-xs text-muted-foreground">I'm not sure yet</p>
                  </div>
                </div>
              </div>

              <div
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${getStatusColor("not-attending")} ${selectedStatus === "not-attending" ? "border-red-500" : ""}`}
              >
                <RadioGroupItem value="not-attending" id="not-attending" />
                <div className="flex items-center gap-2 flex-1">
                  {getStatusIcon("not-attending")}
                  <div>
                    <Label htmlFor="not-attending" className="font-medium cursor-pointer">
                      Can't make it
                    </Label>
                    <p className="text-xs text-muted-foreground">I won't be able to attend</p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Plus Ones - only show if attending */}
          {selectedStatus === "attending" && (
            <div className="space-y-2">
              <Label htmlFor="plusOnes" className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Plus Ones
              </Label>
              <Input
                id="plusOnes"
                name="plusOnes"
                type="number"
                min="0"
                max="5"
                defaultValue={existingRSVP?.plusOnes || 0}
                placeholder="0"
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">How many additional guests will you bring? (Max 5)</p>
            </div>
          )}

          {/* Dietary Restrictions - only show if attending */}
          {selectedStatus === "attending" && (
            <div className="space-y-2">
              <Label htmlFor="dietaryRestrictions" className="flex items-center gap-2">
                <Utensils className="h-4 w-4 text-primary" />
                Dietary Restrictions
              </Label>
              <Textarea
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                placeholder="Any dietary restrictions or allergies we should know about?"
                defaultValue={existingRSVP?.dietaryRestrictions}
                rows={3}
                className="resize-none"
              />
            </div>
          )}

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Message (Optional)
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Any message for the organizer?"
              defaultValue={existingRSVP?.message}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Event Capacity Info */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Event Capacity:</span>
              <span className="font-medium">
                {attendingCount} / {event.capacity} attending
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((attendingCount / event.capacity) * 100, 100)}%` }}
              />
            </div>
            {spotsLeft > 0 && spotsLeft <= 10 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">Only {spotsLeft} spots remaining!</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {existingRSVP ? "Updating..." : "Submitting..."}
              </div>
            ) : (
              <>
                {getStatusIcon(selectedStatus)}
                {existingRSVP ? "Update RSVP" : "Submit RSVP"}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
