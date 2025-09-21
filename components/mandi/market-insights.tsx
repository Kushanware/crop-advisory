"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lightbulb, TrendingUp, AlertTriangle, Info, Target } from "lucide-react"

interface MarketInsight {
  type: "bullish" | "bearish" | "neutral" | "alert"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  crops: string[]
  timeframe: string
}

const mockInsights: MarketInsight[] = [
  {
    type: "bullish",
    title: "Wheat Prices Expected to Rise",
    description:
      "Due to reduced rainfall in key wheat-producing regions, prices are expected to increase by 5-8% over the next two weeks.",
    impact: "high",
    crops: ["Wheat"],
    timeframe: "Next 2 weeks",
  },
  {
    type: "bearish",
    title: "Rice Oversupply in Punjab",
    description: "Bumper harvest in Punjab has led to oversupply. Prices may decline by 3-5% in the coming week.",
    impact: "medium",
    crops: ["Rice", "Basmati"],
    timeframe: "Next week",
  },
  {
    type: "alert",
    title: "Cotton Export Demand Surge",
    description:
      "International demand for Indian cotton has increased significantly. Farmers should consider holding stock for better prices.",
    impact: "high",
    crops: ["Cotton"],
    timeframe: "Next month",
  },
  {
    type: "neutral",
    title: "Sugarcane Prices Stable",
    description: "Government support prices and steady demand from sugar mills are keeping sugarcane prices stable.",
    impact: "low",
    crops: ["Sugarcane"],
    timeframe: "Current",
  },
]

function getInsightIcon(type: string) {
  switch (type) {
    case "bullish":
      return <TrendingUp className="h-4 w-4 text-green-600" />
    case "bearish":
      return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
    case "alert":
      return <AlertTriangle className="h-4 w-4 text-secondary" />
    case "neutral":
      return <Info className="h-4 w-4 text-blue-600" />
    default:
      return <Info className="h-4 w-4 text-muted-foreground" />
  }
}

function getInsightBadgeVariant(type: string): "default" | "secondary" | "destructive" {
  switch (type) {
    case "bullish":
      return "default"
    case "bearish":
      return "destructive"
    case "alert":
      return "secondary"
    default:
      return "secondary"
  }
}

function getImpactBadgeVariant(impact: string): "default" | "secondary" | "destructive" {
  switch (impact) {
    case "high":
      return "destructive"
    case "medium":
      return "secondary"
    case "low":
      return "default"
    default:
      return "secondary"
  }
}

export function MarketInsights() {
  return (
    <div className="space-y-6">
      {/* Market Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Market Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">↑ 12</div>
              <div className="text-sm text-muted-foreground">Crops Rising</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-1">↓ 8</div>
              <div className="text-sm text-muted-foreground">Crops Falling</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600 mb-1">→ 15</div>
              <div className="text-sm text-muted-foreground">Stable Prices</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Market Insights & Analysis
          </CardTitle>
          <p className="text-sm text-muted-foreground">Expert analysis and market predictions</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockInsights.map((insight, index) => (
              <Alert key={index} className="border-l-4 border-l-primary">
                <div className="flex items-start gap-3">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">{insight.title}</h4>
                      <Badge variant={getInsightBadgeVariant(insight.type)}>{insight.type}</Badge>
                      <Badge variant={getImpactBadgeVariant(insight.impact)}>{insight.impact} impact</Badge>
                    </div>
                    <AlertDescription className="mb-3">{insight.description}</AlertDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Crops: </span>
                        {insight.crops.join(", ")}
                      </div>
                      <div>
                        <span className="font-medium">Timeframe: </span>
                        {insight.timeframe}
                      </div>
                    </div>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trading Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-secondary" />
            Trading Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-foreground mb-1">Best Selling Time</h4>
              <p className="text-sm text-muted-foreground">
                Morning hours (8-11 AM) typically see higher trading volumes and better prices.
              </p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-foreground mb-1">Quality Premium</h4>
              <p className="text-sm text-muted-foreground">
                High-quality produce can fetch 10-15% premium over modal prices. Ensure proper grading.
              </p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-foreground mb-1">Market Timing</h4>
              <p className="text-sm text-muted-foreground">
                Avoid selling immediately after harvest when supply is high. Wait for demand to stabilize.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
