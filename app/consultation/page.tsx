"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ExpertList } from "@/components/consultation/expert-list"
import { ConsultationHistory } from "@/components/consultation/consultation-history"
import { BookingForm } from "@/components/consultation/booking-form"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageCircle, Video, Phone, Star, Clock } from "lucide-react"

export default function ConsultationPage() {
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<{
    expertId: string
    expertName: string
    consultationType: "chat" | "video" | "call"
    consultationFee: number
  } | null>(null)

  const handleBookConsultation = (expertId: string, type: "chat" | "video" | "call") => {
    // Mock expert data - in real app, you'd fetch this
    const mockExpert = {
      id: expertId,
      name: "Dr. Rajesh Kumar",
      fee: 500,
    }

    setBookingDetails({
      expertId,
      expertName: mockExpert.name,
      consultationType: type,
      consultationFee: mockExpert.fee,
    })
    setShowBookingForm(true)
  }

  const handleBookingComplete = () => {
    setShowBookingForm(false)
    setBookingDetails(null)
  }

  const features = [
    {
      icon: MessageCircle,
      title: "Chat Consultation",
      description: "Text-based consultation for quick queries and advice",
    },
    {
      icon: Phone,
      title: "Voice Call",
      description: "Direct phone consultation with agricultural experts",
    },
    {
      icon: Video,
      title: "Video Call",
      description: "Face-to-face consultation with screen sharing capabilities",
    },
  ]

  const stats = [
    { icon: Users, value: "500+", label: "Expert Advisors" },
    { icon: MessageCircle, value: "10,000+", label: "Consultations" },
    { icon: Star, value: "4.8", label: "Average Rating" },
    { icon: Clock, value: "< 10 min", label: "Response Time" },
  ]

  if (showBookingForm && bookingDetails) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BookingForm
            expertId={bookingDetails.expertId}
            expertName={bookingDetails.expertName}
            consultationType={bookingDetails.consultationType}
            consultationFee={bookingDetails.consultationFee}
            onBookingComplete={handleBookingComplete}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Expert Consultation
          </h1>
          <p className="text-muted-foreground">
            Connect with agricultural experts for personalized advice and solutions to your farming challenges
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="experts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="experts">Find Experts</TabsTrigger>
            <TabsTrigger value="history">My Consultations</TabsTrigger>
          </TabsList>

          <TabsContent value="experts" className="space-y-6">
            <ExpertList />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <ConsultationHistory />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
