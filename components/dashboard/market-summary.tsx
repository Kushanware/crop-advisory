"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MarketData {
  crop: string
  currentPrice: number
  previousPrice: number
  change: number
  changePercent: number
  market: string
}

const mockMarketData: MarketData[] = [
  {
    crop: "Wheat",
    currentPrice: 2150,
    previousPrice: 2100,
    change: 50,
    changePercent: 2.38,
    market: "Ludhiana Mandi",
  },
  {
    crop: "Rice",
    currentPrice: 3200,
    previousPrice: 3250,
    change: -50,
    changePercent: -1.54,
    market: "Ludhiana Mandi",
  },
  {
    crop: "Sugarcane",
    currentPrice: 350,
    previousPrice: 350,
    change: 0,
    changePercent: 0,
    market: "Local Mill",
  },
]

function getTrendIcon(change: number) {
  if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />
  if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />
  return <Minus className="h-4 w-4 text-gray-500" />
}

function getTrendColor(change: number) {
  if (change > 0) return "text-green-600"
  if (change < 0) return "text-red-600"
  return "text-gray-500"
}

function getTrendBadgeVariant(change: number): "default" | "secondary" | "destructive" {
  if (change > 0) return "default"
  if (change < 0) return "destructive"
  return "secondary"
}

export function MarketSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Market Prices
        </CardTitle>
        <p className="text-sm text-muted-foreground">Today's rates (₹ per quintal)</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockMarketData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">{item.crop}</h4>
                <p className="text-sm text-muted-foreground">{item.market}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg text-foreground">₹{item.currentPrice}</div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(item.change)}
                  <span className={`text-sm font-medium ${getTrendColor(item.change)}`}>
                    {item.change > 0 ? "+" : ""}
                    {item.change} ({item.changePercent > 0 ? "+" : ""}
                    {item.changePercent}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Market Trend</span>
            <Badge variant="default">Mixed</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Wheat prices rising due to good demand. Rice slightly down from last week.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
