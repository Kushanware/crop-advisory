"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sprout, Droplets, Bug, TrendingUp } from "lucide-react"

interface CropData {
  name: string
  area: number
  stage: string
  health: number
  expectedYield: number
  daysToHarvest: number
}

const mockCropData: CropData[] = [
  {
    name: "Wheat",
    area: 5,
    stage: "Flowering",
    health: 85,
    expectedYield: 4.2,
    daysToHarvest: 45,
  },
  {
    name: "Rice",
    area: 3,
    stage: "Vegetative",
    health: 92,
    expectedYield: 6.8,
    daysToHarvest: 90,
  },
  {
    name: "Sugarcane",
    area: 2,
    stage: "Maturity",
    health: 78,
    expectedYield: 75,
    daysToHarvest: 15,
  },
]

function getHealthColor(health: number) {
  if (health >= 80) return "text-green-600"
  if (health >= 60) return "text-yellow-600"
  return "text-red-600"
}

function getHealthBadgeVariant(health: number): "default" | "secondary" | "destructive" {
  if (health >= 80) return "default"
  if (health >= 60) return "secondary"
  return "destructive"
}

export function FarmOverview() {
  const totalArea = mockCropData.reduce((sum, crop) => sum + crop.area, 0)
  const averageHealth = Math.round(mockCropData.reduce((sum, crop) => sum + crop.health, 0) / mockCropData.length)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sprout className="h-5 w-5 text-primary" />
          Farm Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Farm Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary">{totalArea}</div>
            <div className="text-sm text-muted-foreground">Total Acres</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary">{averageHealth}%</div>
            <div className="text-sm text-muted-foreground">Avg Health</div>
          </div>
        </div>

        {/* Crop Details */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Current Crops</h4>
          {mockCropData.map((crop, index) => (
            <div key={index} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-foreground">{crop.name}</h5>
                  <p className="text-sm text-muted-foreground">
                    {crop.area} acres • {crop.stage}
                  </p>
                </div>
                <Badge variant={getHealthBadgeVariant(crop.health)}>{crop.health}% Health</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Health Status</span>
                  <span className={getHealthColor(crop.health)}>{crop.health}%</span>
                </div>
                <Progress value={crop.health} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Expected Yield:</span>
                  <span className="font-medium">
                    {crop.expectedYield} {crop.name === "Sugarcane" ? "tons" : "tons"}/acre
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-secondary" />
                  <span className="text-muted-foreground">Harvest in:</span>
                  <span className="font-medium">{crop.daysToHarvest} days</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="font-medium text-foreground">Recommended Actions</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-secondary/10 rounded-md">
              <Bug className="h-4 w-4 text-secondary" />
              <span className="text-sm">Check wheat for aphid infestation</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-md">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Increase irrigation for sugarcane</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
