"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { TrendingUp, Calendar } from "lucide-react"
import { useState } from "react"

const mockTrendData = [
  { date: "Jan 1", wheat: 2000, rice: 4000, cotton: 6500 },
  { date: "Jan 3", wheat: 2050, rice: 4100, cotton: 6600 },
  { date: "Jan 5", wheat: 2100, rice: 4200, cotton: 6700 },
  { date: "Jan 7", wheat: 2080, rice: 4150, cotton: 6650 },
  { date: "Jan 9", wheat: 2120, rice: 4250, cotton: 6750 },
  { date: "Jan 11", wheat: 2150, rice: 4200, cotton: 6800 },
  { date: "Jan 13", wheat: 2130, rice: 4180, cotton: 6780 },
  { date: "Jan 15", wheat: 2150, rice: 4200, cotton: 6800 },
]

const mockVolumeData = [
  { market: "Ludhiana", volume: 2500 },
  { market: "Karnal", volume: 1800 },
  { market: "Rajkot", volume: 1200 },
  { market: "Muzaffarnagar", volume: 900 },
  { market: "Davangere", volume: 700 },
]

export function PriceTrends() {
  const [selectedCrop, setSelectedCrop] = useState("wheat")
  const [timeRange, setTimeRange] = useState("15d")

  const crops = [
    { value: "wheat", label: "Wheat", color: "#22c55e" },
    { value: "rice", label: "Rice", color: "#3b82f6" },
    { value: "cotton", label: "Cotton", color: "#f59e0b" },
  ]

  const selectedCropData = crops.find((crop) => crop.value === selectedCrop)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Price Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Price Trends
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
                <SelectItem value="90d">90D</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={selectedCrop}
                  stroke={selectedCropData?.color}
                  strokeWidth={2}
                  dot={{ fill: selectedCropData?.color, strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {selectedCropData?.label} price trends for the last {timeRange}
          </div>
        </CardContent>
      </Card>

      {/* Trading Volume */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Trading Volume
          </CardTitle>
          <p className="text-sm text-muted-foreground">Today's trading volume by market (in quintals)</p>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockVolumeData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="market" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">Total volume: 7,100 quintals traded today</div>
        </CardContent>
      </Card>
    </div>
  )
}
