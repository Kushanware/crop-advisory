"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Clock, MessageCircle, Video, Phone } from "lucide-react"

interface Expert {
  id: string
  name: string
  title: string
  specialization: string[]
  experience: number
  rating: number
  reviewCount: number
  location: string
  languages: string[]
  availability: "available" | "busy" | "offline"
  consultationFee: number
  responseTime: string
  totalConsultations: number
  avatar: string
  bio: string
}

interface ExpertCardProps {
  expert: Expert
  onBookConsultation: (expertId: string, type: "chat" | "video" | "call") => void
}

export function ExpertCard({ expert, onBookConsultation }: ExpertCardProps) {
  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getAvailabilityText = (status: string) => {
    switch (status) {
      case "available":
        return "Available Now"
      case "busy":
        return "Busy"
      case "offline":
        return "Offline"
      default:
        return "Unknown"
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src={expert.avatar || "/placeholder.svg"} alt={expert.name} />
              <AvatarFallback className="text-lg">
                {expert.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getAvailabilityColor(
                expert.availability,
              )}`}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">{expert.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{expert.title}</p>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span className="text-sm font-medium">{expert.rating}</span>
                <span className="text-sm text-muted-foreground">({expert.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {expert.location}
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className={getAvailabilityColor(expert.availability).replace("bg-", "text-")}>
                {getAvailabilityText(expert.availability)}
              </span>
              <span>• Responds in {expert.responseTime}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Specialization</h4>
            <div className="flex flex-wrap gap-1">
              {expert.specialization.map((spec, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Experience:</span>
              <span className="font-medium ml-1">{expert.experience} years</span>
            </div>
            <div>
              <span className="text-muted-foreground">Consultations:</span>
              <span className="font-medium ml-1">{expert.totalConsultations}</span>
            </div>
          </div>

          <div>
            <span className="text-muted-foreground text-sm">Languages:</span>
            <span className="font-medium ml-1 text-sm">{expert.languages.join(", ")}</span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{expert.bio}</p>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-lg font-bold text-foreground">₹{expert.consultationFee}</span>
              <span className="text-sm text-muted-foreground ml-1">per consultation</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => onBookConsultation(expert.id, "chat")}
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
              disabled={expert.availability === "offline"}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Chat
            </Button>
            <Button
              onClick={() => onBookConsultation(expert.id, "call")}
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
              disabled={expert.availability === "offline"}
            >
              <Phone className="h-4 w-4 mr-1" />
              Call
            </Button>
            <Button
              onClick={() => onBookConsultation(expert.id, "video")}
              size="sm"
              className="flex-1"
              disabled={expert.availability === "offline"}
            >
              <Video className="h-4 w-4 mr-1" />
              Video
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
