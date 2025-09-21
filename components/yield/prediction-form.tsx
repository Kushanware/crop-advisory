"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Calculator, MapPin, Calendar, Droplets } from "lucide-react"

interface PredictionFormProps {
  onPredictionGenerated: (prediction: any) => void
}

export function PredictionForm({ onPredictionGenerated }: PredictionFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    crop: "",
    area: "",
    location: "",
    soilType: "",
    irrigationType: "",
    seedVariety: "",
    plantingDate: "",
    fertilizers: "",
    pesticides: "",
    previousYield: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate AI prediction processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock prediction results
    const mockPrediction = {
      predictedYield: Math.floor(Math.random() * 20 + 15), // 15-35 quintals per hectare
      confidence: Math.floor(Math.random() * 20 + 80), // 80-100%
      factors: [
        { name: "Weather Conditions", impact: "Positive", score: 85 },
        { name: "Soil Quality", impact: "Excellent", score: 92 },
        { name: "Irrigation", impact: "Good", score: 78 },
        { name: "Seed Variety", impact: "Positive", score: 88 },
      ],
      recommendations: [
        "Consider increasing nitrogen fertilizer by 10% for optimal growth",
        "Monitor soil moisture levels during flowering stage",
        "Apply fungicide preventively in the next 2 weeks",
        "Harvest timing should be around mid-November for best quality",
      ],
      riskFactors: [
        { risk: "Late monsoon", probability: "Low", mitigation: "Ensure adequate irrigation backup" },
        { risk: "Pest attack", probability: "Medium", mitigation: "Regular monitoring and IPM practices" },
      ],
    }

    onPredictionGenerated(mockPrediction)
    setIsLoading(false)
  }

  const crops = [
    "Rice",
    "Wheat",
    "Maize",
    "Cotton",
    "Sugarcane",
    "Soybean",
    "Groundnut",
    "Sunflower",
    "Mustard",
    "Chickpea",
    "Pigeon Pea",
  ]

  const soilTypes = ["Alluvial", "Black Cotton", "Red", "Laterite", "Desert", "Mountain", "Saline"]

  const irrigationTypes = ["Drip Irrigation", "Sprinkler", "Flood Irrigation", "Furrow", "Rain-fed"]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Crop Yield Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crop">Crop Type *</Label>
              <Select value={formData.crop} onValueChange={(value) => setFormData({ ...formData, crop: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop} value={crop.toLowerCase()}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Farm Area (Hectares) *</Label>
              <Input
                id="area"
                type="number"
                step="0.1"
                placeholder="e.g., 2.5"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Location *
              </Label>
              <Input
                id="location"
                placeholder="District, State"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="soilType">Soil Type *</Label>
              <Select
                value={formData.soilType}
                onValueChange={(value) => setFormData({ ...formData, soilType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil} value={soil.toLowerCase()}>
                      {soil}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="irrigationType" className="flex items-center gap-1">
                <Droplets className="h-4 w-4" />
                Irrigation Type *
              </Label>
              <Select
                value={formData.irrigationType}
                onValueChange={(value) => setFormData({ ...formData, irrigationType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select irrigation" />
                </SelectTrigger>
                <SelectContent>
                  {irrigationTypes.map((irrigation) => (
                    <SelectItem key={irrigation} value={irrigation.toLowerCase()}>
                      {irrigation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seedVariety">Seed Variety</Label>
              <Input
                id="seedVariety"
                placeholder="e.g., BT Cotton, Basmati 1121"
                value={formData.seedVariety}
                onChange={(e) => setFormData({ ...formData, seedVariety: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plantingDate" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Planting Date *
              </Label>
              <Input
                id="plantingDate"
                type="date"
                value={formData.plantingDate}
                onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousYield">Previous Year Yield (Quintals/Ha)</Label>
              <Input
                id="previousYield"
                type="number"
                step="0.1"
                placeholder="e.g., 25.5"
                value={formData.previousYield}
                onChange={(e) => setFormData({ ...formData, previousYield: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fertilizers">Fertilizers Used</Label>
              <Textarea
                id="fertilizers"
                placeholder="List fertilizers and quantities used..."
                value={formData.fertilizers}
                onChange={(e) => setFormData({ ...formData, fertilizers: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pesticides">Pesticides/Herbicides Used</Label>
              <Textarea
                id="pesticides"
                placeholder="List pesticides and application details..."
                value={formData.pesticides}
                onChange={(e) => setFormData({ ...formData, pesticides: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any other relevant information about your farming practices..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !formData.crop || !formData.area || !formData.location}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Prediction...
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-4 w-4" />
                Generate Yield Prediction
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
