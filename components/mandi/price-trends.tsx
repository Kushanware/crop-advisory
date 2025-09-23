"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { TrendingUp, Calendar, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getCropPriceTrends, getMarketInsights } from "@/lib/mandi-api"

interface TrendData {
  date: string;
  price: number;
  volume?: number;
}

interface VolumeData {
  market: string;
  volume: number;
}

export function PriceTrends() {
  const [selectedCrop, setSelectedCrop] = useState("Wheat")
  const [timeRange, setTimeRange] = useState("15d")
  const [trendData, setTrendData] = useState<TrendData[]>([])
  const [volumeData, setVolumeData] = useState<VolumeData[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>("")

  const crops = [
    { value: "Wheat", label: "Wheat", color: "#22c55e" },
    { value: "Rice", label: "Rice", color: "#3b82f6" },
    { value: "Cotton", label: "Cotton", color: "#f59e0b" },
    { value: "Maize", label: "Maize", color: "#8b5cf6" },
    { value: "Onion", label: "Onion", color: "#ef4444" },
  ]

  const selectedCropData = crops.find((crop) => crop.value === selectedCrop)

  const fetchData = async () => {
    setLoading(true)
    try {
      const days = parseInt(timeRange.replace('d', ''))
      
      // Fetch price trends for selected crop
      const trends = await getCropPriceTrends(selectedCrop, days)
      setTrendData(trends.map(trend => ({
        date: new Date(trend.date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        price: trend.price,
        volume: trend.volume
      })))
      
      // Fetch market insights for volume data
      const insights = await getMarketInsights()
      setVolumeData(insights.topVolumes)
      
      setLastUpdated(new Date().toLocaleTimeString())
    } catch (error) {
      console.error('Error fetching price trends:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [selectedCrop, timeRange])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Price Trends
            </div>
            <Button
              onClick={fetchData}
              variant="outline"
              size="sm"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </CardTitle>
          <div className="flex gap-2">
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop.value} value={crop.value}>
                    {crop.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7D</SelectItem>
                <SelectItem value="15d">15D</SelectItem>
                <SelectItem value="30d">30D</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="text-muted-foreground">Loading real price data...</div>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                    formatter={(value) => [`₹${value}/quintal`, 'Price']}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={selectedCropData?.color}
                    strokeWidth={2}
                    dot={{ fill: selectedCropData?.color, strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="mt-4 text-sm text-muted-foreground">
            {loading ? 'Loading...' : 
              `Real ${selectedCropData?.label} price trends • Last updated: ${lastUpdated}`
            }
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Top Markets by Activity
          </CardTitle>
          <p className="text-sm text-muted-foreground">Markets with highest trading activity (real government data)</p>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="text-muted-foreground">Loading market data...</div>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="market" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                    formatter={(value) => [`${value}`, 'Activity Score']}
                  />
                  <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="mt-4 text-sm text-muted-foreground">
            {loading ? 'Loading...' : 
              `Real market activity data • Updated: ${lastUpdated}`
            }
          </div>
        </CardContent>
      </Card>
    </div>
  )
}