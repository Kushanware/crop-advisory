"use client"

import { useState } from "react"
import { ExpertCard } from "./expert-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"

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

const mockExperts: Expert[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    title: "Agricultural Scientist",
    specialization: ["Crop Diseases", "Pest Management", "Wheat", "Rice"],
    experience: 15,
    rating: 4.8,
    reviewCount: 234,
    location: "Punjab",
    languages: ["Hindi", "English", "Punjabi"],
    availability: "available",
    consultationFee: 500,
    responseTime: "5 mins",
    totalConsultations: 1250,
    avatar: "/dr-rajesh-kumar.jpg",
    bio: "Specialized in crop disease management with 15+ years of field experience. Helped over 1000 farmers increase their yield through scientific farming practices.",
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    title: "Soil Health Expert",
    specialization: ["Soil Testing", "Fertilizers", "Organic Farming", "Cotton"],
    experience: 12,
    rating: 4.9,
    reviewCount: 189,
    location: "Maharashtra",
    languages: ["Hindi", "English", "Marathi"],
    availability: "available",
    consultationFee: 450,
    responseTime: "10 mins",
    totalConsultations: 890,
    avatar: "/dr-priya-sharma.jpg",
    bio: "Expert in soil health management and sustainable farming practices. Specializes in helping farmers transition to organic farming methods.",
  },
  {
    id: "3",
    name: "Suresh Patel",
    title: "Irrigation Specialist",
    specialization: ["Water Management", "Drip Irrigation", "Sugarcane", "Vegetables"],
    experience: 20,
    rating: 4.7,
    reviewCount: 156,
    location: "Gujarat",
    languages: ["Hindi", "English", "Gujarati"],
    availability: "busy",
    consultationFee: 400,
    responseTime: "15 mins",
    totalConsultations: 670,
    avatar: "/suresh-patel.jpg",
    bio: "Water management expert with extensive experience in drip irrigation systems. Helped farmers reduce water usage by 40% while increasing yields.",
  },
  {
    id: "4",
    name: "Dr. Meera Reddy",
    title: "Horticulture Expert",
    specialization: ["Fruits", "Vegetables", "Post-Harvest", "Marketing"],
    experience: 10,
    rating: 4.6,
    reviewCount: 98,
    location: "Andhra Pradesh",
    languages: ["Hindi", "English", "Telugu"],
    availability: "available",
    consultationFee: 350,
    responseTime: "8 mins",
    totalConsultations: 445,
    avatar: "/dr-meera-reddy.jpg",
    bio: "Horticulture specialist focusing on fruit and vegetable cultivation. Expert in post-harvest management and market linkage strategies.",
  },
]

export function ExpertList() {
  const [experts] = useState<Expert[]>(mockExperts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("all")
  const [selectedAvailability, setSelectedAvailability] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  const handleBookConsultation = (expertId: string, type: "chat" | "video" | "call") => {
    console.log(`Booking ${type} consultation with expert ${expertId}`)
    // Here you would implement the booking logic
  }

  const filteredAndSortedExperts = experts
    .filter((expert) => {
      const matchesSearch =
        expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.specialization.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
        expert.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesSpecialization =
        selectedSpecialization === "all" ||
        expert.specialization.some((spec) => spec.toLowerCase().includes(selectedSpecialization.toLowerCase()))

      const matchesAvailability = selectedAvailability === "all" || expert.availability === selectedAvailability

      return matchesSearch && matchesSpecialization && matchesAvailability
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "experience":
          return b.experience - a.experience
        case "fee":
          return a.consultationFee - b.consultationFee
        case "consultations":
          return b.totalConsultations - a.totalConsultations
        default:
          return 0
      }
    })

  const allSpecializations = Array.from(new Set(experts.flatMap((expert) => expert.specialization)))

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search experts by name, specialization, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specializations</SelectItem>
            {allSpecializations.map((spec) => (
              <SelectItem key={spec} value={spec.toLowerCase()}>
                {spec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
          <SelectTrigger className="w-full lg:w-32">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="busy">Busy</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full lg:w-32">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="experience">Experience</SelectItem>
            <SelectItem value="fee">Fee (Low to High)</SelectItem>
            <SelectItem value="consultations">Consultations</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Showing {filteredAndSortedExperts.length} of {experts.length} experts
          </span>
          {selectedSpecialization !== "all" && (
            <Badge variant="secondary" className="text-xs">
              {selectedSpecialization}
            </Badge>
          )}
          {selectedAvailability !== "all" && (
            <Badge variant="secondary" className="text-xs">
              {selectedAvailability}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>Sorted by {sortBy}</span>
        </div>
      </div>

      {/* Expert Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAndSortedExperts.map((expert) => (
          <ExpertCard key={expert.id} expert={expert} onBookConsultation={handleBookConsultation} />
        ))}
      </div>

      {filteredAndSortedExperts.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No experts found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  )
}
