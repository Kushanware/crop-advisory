"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CloudSun, Droplets, Wind, Thermometer, Sun, Cloud, CloudRain, MapPin, RefreshCw, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  location: string;
  forecast: ForecastDay[];
}

interface ForecastDay {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export function RealWeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState({ lat: 30.7333, lon: 76.7794 }) // Default: Chandigarh, India

  // Fetch weather data
  const fetchWeather = async (lat: number, lon: number) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }
      
      const data = await response.json()
      setWeatherData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather')
      console.error('Weather fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, lon: longitude })
          fetchWeather(latitude, longitude)
        },
        (error) => {
          console.log('Location access denied, using default location')
          fetchWeather(location.lat, location.lon)
        }
      )
    } else {
      console.log('Geolocation not supported, using default location')
      fetchWeather(location.lat, location.lon)
    }
  }

  // Load weather on component mount
  useEffect(() => {
    getUserLocation()
  }, [])

  const refreshWeather = () => {
    fetchWeather(location.lat, location.lon)
  }

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
      '01d': Sun, // clear sky day
      '01n': Sun, // clear sky night
      '02d': CloudSun, // few clouds day
      '02n': CloudSun, // few clouds night
      '03d': Cloud, // scattered clouds
      '03n': Cloud,
      '04d': Cloud, // broken clouds
      '04n': Cloud,
      '09d': CloudRain, // shower rain
      '09n': CloudRain,
      '10d': CloudRain, // rain day
      '10n': CloudRain, // rain night
      '11d': CloudRain, // thunderstorm
      '11n': CloudRain,
      '13d': Cloud, // snow
      '13n': Cloud,
      '50d': Cloud, // mist
      '50n': Cloud,
    }
    
    return iconMap[iconCode] || CloudSun
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudSun className="h-5 w-5 text-primary" />
            Weather Forecast
            <Badge variant="secondary" className="ml-auto">Live Data</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Loading weather data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudSun className="h-5 w-5 text-primary" />
            Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-sm text-red-600 mb-2">{error}</p>
            <Button onClick={refreshWeather} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!weatherData) {
    return null
  }

  const WeatherIcon = getWeatherIcon(weatherData.icon)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudSun className="h-5 w-5 text-primary" />
          Weather Forecast
          <Badge variant="secondary" className="ml-auto">Live Data</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Weather */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-foreground">{weatherData.temperature}°C</div>
            <div className="text-muted-foreground capitalize">{weatherData.description}</div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              {weatherData.location}
            </div>
          </div>
          <div className="text-right">
            <WeatherIcon className="h-12 w-12 text-primary" />
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">Humidity</span>
            <span className="text-sm font-medium">{weatherData.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-muted-foreground">Wind</span>
            <span className="text-sm font-medium">{Math.round(weatherData.windSpeed)} km/h</span>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">5-Day Forecast</h4>
          <div className="space-y-2">
            {weatherData.forecast.slice(0, 5).map((day, index) => {
              const DayWeatherIcon = getWeatherIcon(day.icon)
              return (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium w-16">
                      {index === 0 ? 'Today' : formatDate(day.date)}
                    </span>
                    <DayWeatherIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground capitalize">{day.description}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {day.temperature.max}°/{day.temperature.min}°
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Refresh Button */}
        <div className="pt-2 border-t border-border">
          <Button onClick={refreshWeather} variant="outline" size="sm" className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Weather
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}