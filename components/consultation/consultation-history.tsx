"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { History, MessageCircle, Video, Phone, Star, Calendar, Clock } from "lucide-react"

interface Consultation {
  id: string
  expertName: string
  expertAvatar: string
  type: "chat" | "video" | "call"
  date: string
  duration: number
  status: "completed" | "scheduled" | "cancelled"
  rating?: number
  topic: string
  summary: string
  fee: number
}

const mockConsultations: Consultation[] = [
  {
    id: "1",
    expertName: "Dr. Rajesh Kumar",
    expertAvatar: "/dr-rajesh-kumar.jpg",
    type: "video",
    date: "2024-01-14T10:00:00Z",
    duration: 45,
    status: "completed",
    rating: 5,
    topic: "Wheat Disease Management",
    summary: "Discussed leaf rust treatment and prevention strategies. Recommended fungicide application schedule.",
    fee: 500,
  },
  {
    id: "2",
    expertName: "Dr. Priya Sharma",
    expertAvatar: "/dr-priya-sharma.jpg",
    type: "chat",
    date: "2024-01-12T14:30:00Z",
    duration: 30,
    status: "completed",
    rating: 4,
    topic: "Soil Health Assessment",
    summary: "Analyzed soil test reports and provided fertilizer recommendations for cotton crop.",
    fee: 450,
  },
  {
    id: "3",
    expertName: "Suresh Patel",
    expertAvatar: "/suresh-patel.jpg",
    type: "call",
    date: "2024-01-16T09:00:00Z",
    duration: 0,
    status: "scheduled",
    topic: "Irrigation System Setup",
    summary: "",
    fee: 400,
  },
  {
    id: "4",
    expertName: "Dr. Meera Reddy",
    expertAvatar: "/dr-meera-reddy.jpg",
    type: "video",
    date: "2024-01-08T16:00:00Z",
    duration: 35,
    status: "cancelled",
    topic: "Vegetable Marketing",
    summary: "",
    fee: 350,
  },
]

function getTypeIcon(type: string) {
  switch (type) {
    case "video":
      return <Video className="h-4 w-4" />
    case "call":
      return <Phone className="h-4 w-4" />
    case "chat":
      return <MessageCircle className="h-4 w-4" />
    default:
      return <MessageCircle className="h-4 w-4" />
  }
}

function getStatusBadgeVariant(status: string): "default" | "secondary" | "destructive" {
  switch (status) {
    case "completed":
      return "default"
    case "scheduled":
      return "secondary"
    case "cancelled":
      return "destructive"
    default:
      return "secondary"
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "text-green-600"
    case "scheduled":
      return "text-blue-600"
    case "cancelled":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

export function ConsultationHistory() {
  const handleRateConsultation = (consultationId: string) => {
    console.log(`Rating consultation ${consultationId}`)
    // Implement rating logic
  }

  const handleReschedule = (consultationId: string) => {
    console.log(`Rescheduling consultation ${consultationId}`)
    // Implement reschedule logic
  }

  const handleViewDetails = (consultationId: string) => {
    console.log(`Viewing details for consultation ${consultationId}`)
    // Implement view details logic
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Consultation History
        </CardTitle>
        <p className="text-sm text-muted-foreground">Your past and upcoming consultations</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockConsultations.map((consultation) => (
            <div key={consultation.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={consultation.expertAvatar || "/placeholder.svg"} alt={consultation.expertName} />
                  <AvatarFallback>
                    {consultation.expertName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{consultation.expertName}</h4>
                      <p className="text-sm text-muted-foreground">{consultation.topic}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusBadgeVariant(consultation.status)}>{consultation.status}</Badge>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        {getTypeIcon(consultation.type)}
                        <span className="text-sm capitalize">{consultation.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(consultation.date).toLocaleDateString("en-IN")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(consultation.date).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    {consultation.duration > 0 && <span>{consultation.duration} mins</span>}
                    <span className="font-medium">₹{consultation.fee}</span>
                  </div>

                  {consultation.summary && <p className="text-sm text-muted-foreground mb-3">{consultation.summary}</p>}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {consultation.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-secondary text-secondary" />
                          <span className="text-sm font-medium">{consultation.rating}/5</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {consultation.status === "completed" && !consultation.rating && (
                        <Button onClick={() => handleRateConsultation(consultation.id)} variant="outline" size="sm">
                          Rate
                        </Button>
                      )}
                      {consultation.status === "scheduled" && (
                        <Button onClick={() => handleReschedule(consultation.id)} variant="outline" size="sm">
                          Reschedule
                        </Button>
                      )}
                      <Button onClick={() => handleViewDetails(consultation.id)} variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mockConsultations.length === 0 && (
          <div className="text-center py-8">
            <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No consultations yet</h3>
            <p className="text-muted-foreground">Book your first consultation with an expert</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
