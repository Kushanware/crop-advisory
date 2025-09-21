"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, Eye, Download, Calendar } from "lucide-react"

interface HistoryItem {
  id: string
  date: string
  cropType: string
  disease: string
  severity: "low" | "medium" | "high"
  confidence: number
  status: "treated" | "monitoring" | "pending"
}

const mockHistory: HistoryItem[] = [
  {
    id: "1",
    date: "2024-01-15",
    cropType: "Wheat",
    disease: "Leaf Rust",
    severity: "medium",
    confidence: 87,
    status: "treated",
  },
  {
    id: "2",
    date: "2024-01-12",
    cropType: "Rice",
    disease: "Bacterial Blight",
    severity: "high",
    confidence: 92,
    status: "monitoring",
  },
  {
    id: "3",
    date: "2024-01-10",
    cropType: "Wheat",
    disease: "Healthy",
    severity: "low",
    confidence: 95,
    status: "treated",
  },
  {
    id: "4",
    date: "2024-01-08",
    cropType: "Sugarcane",
    disease: "Red Rot",
    severity: "high",
    confidence: 89,
    status: "pending",
  },
]

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

function getStatusBadgeVariant(status: string): "default" | "secondary" | "destructive" {
  switch (status) {
    case "treated":
      return "default"
    case "monitoring":
      return "secondary"
    case "pending":
      return "destructive"
    default:
      return "secondary"
  }
}

export function ScanHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Scan History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockHistory.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-foreground">{item.cropType}</h4>
                  <Badge variant={getSeverityBadgeVariant(item.severity)}>{item.disease}</Badge>
                  <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                  <span>Confidence: {item.confidence}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Report
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline">View All Scans</Button>
        </div>
      </CardContent>
    </Card>
  )
}
