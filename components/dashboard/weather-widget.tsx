"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CloudSun, Droplets, Wind, Eye, Thermometer, Sun, Cloud, CloudRain } from "lucide-react"

interface WeatherData {
  location: string
  current: {
    temperature: number
    condition: string
    humidity: number
    windSpeed: number
    visibility: number
    uvIndex: number
    icon: string
  }
  forecast: Array<{
    day: string
    high: number
    low: number
    condition: string
    icon: string
    precipitation: number
  }>
}

const mockWeatherData: WeatherData = {
  location: "Ludhiana, Punjab",
  current: {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    uvIndex: 6,
    icon: "partly-cloudy",
  },
  forecast: [
    { day: "Today", high: 32, low: 22, condition: "Sunny", icon: "sunny", precipitation: 0 },
    { day: "Tomorrow", high: 30, low: 20, condition: "Partly Cloudy", icon: "partly-cloudy", precipitation: 10 },
    { day: "Wed", high: 28, low: 18, condition: "Rainy", icon: "rainy", precipitation: 80 },
    { day: "Thu", high: 26, low: 16, condition: "Cloudy", icon: "cloudy", precipitation: 20 },
    { day: "Fri", high: 29, low: 19, condition: "Sunny", icon: "sunny", precipitation: 0 },
  ],
}

function getWeatherIcon(iconType: string) {
  switch (iconType) {
    case "sunny":
      return <Sun className="h-6 w-6 text-secondary" />
    case "partly-cloudy":
      return <CloudSun className="h-6 w-6 text-muted-foreground" />
    case "cloudy":
      return <Cloud className="h-6 w-6 text-muted-foreground" />
    case "rainy":
      return <CloudRain className="h-6 w-6 text-blue-500" />
    default:
      return <Sun className="h-6 w-6 text-secondary" />
  }
}

export function WeatherWidget() {
  const weather = mockWeatherData

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudSun className="h-5 w-5 text-primary" />
          Weather Forecast
        </CardTitle>
        <p className="text-sm text-muted-foreground">{weather.location}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Weather */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-foreground">{weather.current.temperature}°C</div>
            <div className="text-muted-foreground">{weather.current.condition}</div>
          </div>
          <div className="text-right">{getWeatherIcon(weather.current.icon)}</div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">Humidity</span>
            <span className="text-sm font-medium">{weather.current.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-muted-foreground">Wind</span>
            <span className="text-sm font-medium">{weather.current.windSpeed} km/h</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-muted-foreground">Visibility</span>
            <span className="text-sm font-medium">{weather.current.visibility} km</span>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-secondary" />
            <span className="text-sm text-muted-foreground">UV Index</span>
            <span className="text-sm font-medium">{weather.current.uvIndex}</span>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div>
          <h4 className="font-medium text-foreground mb-3">5-Day Forecast</h4>
          <div className="space-y-2">
            {weather.forecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  {getWeatherIcon(day.icon)}
                  <span className="text-sm font-medium w-16">{day.day}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{day.condition}</span>
                  <div className="flex items-center gap-1">
                    <Droplets className="h-3 w-3 text-blue-500" />
                    <span className="text-xs text-muted-foreground">{day.precipitation}%</span>
                  </div>
                  <div className="text-sm font-medium">
                    {day.high}°/{day.low}°
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Alerts */}
        <div className="space-y-2">
          <Badge variant="secondary" className="w-full justify-center py-2">
            <Droplets className="h-3 w-3 mr-1" />
            Rain expected Wednesday - Plan irrigation accordingly
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
