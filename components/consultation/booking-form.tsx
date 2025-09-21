"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarIcon, Clock, CreditCard, CheckCircle } from "lucide-react"
import { format } from "date-fns"

interface BookingFormProps {
  expertId: string
  expertName: string
  consultationType: "chat" | "video" | "call"
  consultationFee: number
  onBookingComplete: () => void
}

export function BookingForm({
  expertId,
  expertName,
  consultationType,
  consultationFee,
  onBookingComplete,
}: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [topic, setTopic] = useState("")
  const [description, setDescription] = useState("")
  const [isBooking, setIsBooking] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"]

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !topic) return

    setIsBooking(true)

    try {
      // Simulate booking API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setBookingComplete(true)
      setTimeout(() => {
        onBookingComplete()
      }, 2000)
    } catch (error) {
      console.error("Booking failed:", error)
    } finally {
      setIsBooking(false)
    }
  }

  if (bookingComplete) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Booking Confirmed!</h3>
          <p className="text-muted-foreground mb-4">
            Your {consultationType} consultation with {expertName} has been scheduled.
          </p>
          <div className="bg-muted/30 rounded-lg p-4 mb-4">
            <div className="text-sm text-muted-foreground">
              <div>Date: {selectedDate && format(selectedDate, "PPP")}</div>
              <div>Time: {selectedTime}</div>
              <div>Topic: {topic}</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            You will receive a confirmation email with meeting details shortly.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Consultation</CardTitle>
        <p className="text-sm text-muted-foreground">
          Schedule a {consultationType} consultation with {expertName}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleBooking} className="space-y-6">
          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label>Select Time</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {time}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Topic */}
          <div className="space-y-2">
            <Label htmlFor="topic">Consultation Topic *</Label>
            <Input
              id="topic"
              placeholder="e.g., Wheat disease management, Soil testing advice"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Describe your issue (optional)</Label>
            <Textarea
              id="description"
              placeholder="Provide more details about your farming challenge or question..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* Consultation Summary */}
          <Alert>
            <CreditCard className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <h4 className="font-medium">Consultation Summary</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Expert:</span>
                    <span className="font-medium">{expertName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium capitalize">{consultationType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">45 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee:</span>
                    <span className="font-medium">₹{consultationFee}</span>
                  </div>
                </div>
              </div>
            </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isBooking || !selectedDate || !selectedTime || !topic}>
            {isBooking ? "Booking..." : `Book Consultation - ₹${consultationFee}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
