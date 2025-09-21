"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Book, Leaf } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface DiseaseInfo {
  id: string
  name: string
  crop: string
  severity: "low" | "medium" | "high"
  description: string
  symptoms: string[]
  causes: string[]
  treatment: string[]
  image: string
}

const mockDiseases: DiseaseInfo[] = [
  {
    id: "1",
    name: "Wheat Leaf Rust",
    crop: "Wheat",
    severity: "high",
    description:
      "A fungal disease causing orange-red pustules on wheat leaves, significantly reducing yield if untreated.",
    symptoms: ["Orange-red pustules", "Yellowing leaves", "Premature leaf drop"],
    causes: ["High humidity", "Moderate temperatures", "Wind dispersal"],
    treatment: ["Fungicide application", "Resistant varieties", "Field sanitation"],
    image: "/wheat-leaf-rust-disease.jpg",
  },
  {
    id: "2",
    name: "Rice Bacterial Blight",
    crop: "Rice",
    severity: "high",
    description:
      "A bacterial disease that causes water-soaked lesions on rice leaves, leading to significant yield loss.",
    symptoms: ["Water-soaked lesions", "Yellow halos", "Wilting"],
    causes: ["High humidity", "Wounds in plants", "Contaminated water"],
    treatment: ["Copper-based bactericides", "Resistant varieties", "Water management"],
    image: "/rice-bacterial-blight-disease.jpg",
  },
  {
    id: "3",
    name: "Tomato Late Blight",
    crop: "Tomato",
    severity: "high",
    description:
      "A devastating fungal disease that can destroy entire tomato crops within days under favorable conditions.",
    symptoms: ["Dark lesions on leaves", "White fungal growth", "Fruit rot"],
    causes: ["Cool wet weather", "High humidity", "Poor air circulation"],
    treatment: ["Preventive fungicides", "Proper spacing", "Avoid overhead watering"],
    image: "/tomato-late-blight-disease.jpg",
  },
]

export function DiseaseLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCrop, setSelectedCrop] = useState("all")
  const [selectedSeverity, setSelectedSeverity] = useState("all")

  const filteredDiseases = mockDiseases.filter((disease) => {
    const matchesSearch =
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCrop = selectedCrop === "all" || disease.crop === selectedCrop
    const matchesSeverity = selectedSeverity === "all" || disease.severity === selectedSeverity

    return matchesSearch && matchesCrop && matchesSeverity
  })

  const crops = ["all", ...Array.from(new Set(mockDiseases.map((d) => d.crop)))]

  function getSeverityBadgeVariant(severity: string): "default" | "secondary" | "destructive" {
    switch (severity) {
      case "low":
        return "default"
      case "medium":
        return "secondary"
      case "high":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search diseases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by crop" />
          </SelectTrigger>
          <SelectContent>
            {crops.map((crop) => (
              <SelectItem key={crop} value={crop}>
                {crop === "all" ? "All Crops" : crop}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiseases.map((disease) => (
          <Card key={disease.id} className="overflow-hidden">
            <div className="aspect-video relative bg-muted">
              <Image src={disease.image || "/placeholder.svg"} alt={disease.name} fill className="object-cover" />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{disease.name}</CardTitle>
                <Badge variant={getSeverityBadgeVariant(disease.severity)}>{disease.severity}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{disease.crop}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{disease.description}</p>

              <div>
                <h4 className="font-medium text-foreground mb-2">Key Symptoms</h4>
                <ul className="space-y-1">
                  {disease.symptoms.slice(0, 3).map((symptom, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                <Book className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDiseases.length === 0 && (
        <div className="text-center py-12">
          <Book className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No diseases found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  )
}
