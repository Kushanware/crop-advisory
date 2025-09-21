"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, TrendingUp, Calendar, MapPin, Eye } from "lucide-react"

const mockHistory = [
  {
    id: 1,
    crop: "Rice",
    location: "Thanjavur, Tamil Nadu",
    area: 2.5,
    predictedYield: 28.5,
    actualYield: 26.8,
    accuracy: 94,
    date: "2024-01-15",
    status: "Completed",
  },
  {
    id: 2,
    crop: "Wheat",
    location: "Ludhiana, Punjab",
    area: 3.0,
    predictedYield: 32.0,
    actualYield: null,
    accuracy: null,
    date: "2024-02-20",
    status: "In Progress",
  },
  {
    id: 3,
    crop: "Cotton",
    location: "Nagpur, Maharashtra",
    area: 1.8,
    predictedYield: 18.2,
    actualYield: 17.9,
    accuracy: 98,
    date: "2023-12-10",
    status: "Completed",
  },
]

export function PredictionHistory() {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in progress":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAccuracyColor = (accuracy: number | null) => {
    if (!accuracy) return "text-gray-500"
    if (accuracy >= 90) return "text-green-600"
    if (accuracy >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Prediction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockHistory.map((prediction) => (
            <div key={prediction.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{prediction.crop}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {prediction.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(prediction.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Badge className={getStatusColor(prediction.status)}>{prediction.status}</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Area</p>
                  <p className="font-medium">{prediction.area} ha</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Predicted</p>
                  <p className="font-medium">{prediction.predictedYield} q/ha</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Actual</p>
                  <p className="font-medium">{prediction.actualYield ? `${prediction.actualYield} q/ha` : "Pending"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                  <p className={`font-medium ${getAccuracyColor(prediction.accuracy)}`}>
                    {prediction.accuracy ? `${prediction.accuracy}%` : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-3 w-3" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {mockHistory.length === 0 && (
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No predictions yet. Create your first yield prediction!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
