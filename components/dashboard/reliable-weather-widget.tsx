"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CloudSun, Droplets, Wind, Eye, Thermometer, Sun, Cloud, CloudRain, MapPin, RefreshCw, Loader2, Globe, Locate } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat?: number;
    lon?: number;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    uv: number;
  };
}

const INDIAN_CITIES = [
  { name: "Mumbai", value: "mumbai" },
  { name: "Delhi", value: "delhi" },
  { name: "Bangalore", value: "bangalore" },
  { name: "Chennai", value: "chennai" },
  { name: "Kolkata", value: "kolkata" },
  { name: "Hyderabad", value: "hyderabad" },
  { name: "Pune", value: "pune" },
  { name: "Ahmedabad", value: "ahmedabad" },
  { name: "Jaipur", value: "jaipur" },
  { name: "Lucknow", value: "lucknow" },
  { name: "Chandigarh", value: "chandigarh" },
  { name: "Bhopal", value: "bhopal" },
  { name: "Nagpur", value: "nagpur" },
  { name: "Indore", value: "indore" },
  { name: "Patna", value: "patna" }
]

// Offline fallback data for demonstration
const OFFLINE_WEATHER: WeatherData = {
  location: {
    name: "Mumbai",
    region: "Maharashtra",
    country: "India"
  },
  current: {
    temp_c: 28,
    temp_f: 82,
    condition: {
      text: "Partly Cloudy",
      icon: "02d",
      code: 801
    },
    wind_kph: 12,
    pressure_mb: 1013,
    precip_mm: 0,
    humidity: 75,
    cloud: 40,
    feelslike_c: 31,
    uv: 6
  }
}

export function ReliableWeatherWidget() {
  const { t } = useLanguage()
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState("mumbai")
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [isOffline, setIsOffline] = useState(false)
  const [useCurrentLocation, setUseCurrentLocation] = useState(false)
  const [currentLocationName, setCurrentLocationName] = useState<string>("")

  // Auto-detect user's location
  const detectLocation = async () => {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported')
      return
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes cache
        })
      })

      const { latitude, longitude } = position.coords
      
      // Fetch weather by coordinates
      const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`, {
        signal: AbortSignal.timeout(5000)
      })
      
      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setWeatherData(result.data)
          setCurrentLocationName(result.data.location.name)
          setUseCurrentLocation(true)
          setLastUpdated(new Date().toLocaleTimeString())
          setIsOffline(false)
          setError(null)
        }
      }
    } catch (err) {
      console.warn('Location detection failed:', err)
      // Fallback to Mumbai if location detection fails
      fetchWeather("mumbai")
    }
  }

  // Fetch weather data with offline fallback
  const fetchWeather = async (city: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/weather?city=${city}`, {
        signal: AbortSignal.timeout(5000) // 5 second timeout
      })
      
      if (!response.ok) {
        throw new Error('Weather service unavailable')
      }
      
      const result = await response.json()
      
      if (result.success) {
        setWeatherData(result.data)
        setLastUpdated(new Date().toLocaleTimeString())
        setIsOffline(false)
        setUseCurrentLocation(false)
      } else {
        throw new Error(result.message || 'Failed to fetch weather data')
      }
    } catch (err) {
      console.warn('Weather API unavailable, using offline demo data:', err)
      // Use offline fallback for demo
      const offlineData = {
        ...OFFLINE_WEATHER,
        location: {
          ...OFFLINE_WEATHER.location,
          name: city.charAt(0).toUpperCase() + city.slice(1)
        }
      }
      setWeatherData(offlineData)
      setLastUpdated("Offline Demo")
      setIsOffline(true)
      setError(null) // Don't show error for demo mode
      setUseCurrentLocation(false)
    } finally {
      setLoading(false)
    }
  }

  // Initial load - try location detection first, then fallback to selected city
  useEffect(() => {
    detectLocation()
  }, [])

  // City change handler
  useEffect(() => {
    if (!useCurrentLocation) {
      fetchWeather(selectedCity)
    }
  }, [selectedCity, useCurrentLocation])

  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase()
    
    if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
      return <Sun className="h-8 w-8 text-yellow-500" />
    } else if (lowerCondition.includes('cloud')) {
      return <Cloud className="h-8 w-8 text-gray-500" />
    } else if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
      return <CloudRain className="h-8 w-8 text-blue-500" />
    } else {
      return <CloudSun className="h-8 w-8 text-orange-500" />
    }
  }

  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { level: t('uv.low'), color: "text-green-600" }
    if (uv <= 5) return { level: t('uv.moderate'), color: "text-yellow-600" }
    if (uv <= 7) return { level: t('uv.high'), color: "text-orange-600" }
    if (uv <= 10) return { level: t('uv.veryHigh'), color: "text-red-600" }
    return { level: t('uv.extreme'), color: "text-purple-600" }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudSun className="h-5 w-5" />
            {t('weather.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">{t('weather.loading')}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!weatherData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudSun className="h-5 w-5" />
            Weather Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            <p className="mb-4">Weather data unavailable</p>
            <Button onClick={() => fetchWeather(selectedCity)} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const uvInfo = getUVLevel(weatherData.current.uv)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CloudSun className="h-5 w-5" />
            Weather Information
            {isOffline && <Badge variant="secondary" className="ml-2">Demo Mode</Badge>}
          </div>
          <Button
            onClick={() => fetchWeather(selectedCity)}
            variant="outline"
            size="sm"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center gap-2">
            <Select 
              value={useCurrentLocation ? "current" : selectedCity} 
              onValueChange={(value) => {
                if (value === "current") {
                  detectLocation()
                } else {
                  setSelectedCity(value)
                  setUseCurrentLocation(false)
                }
              }}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current" className="flex items-center">
                  <div className="flex items-center gap-2">
                    <Locate className="h-4 w-4" />
                    <span>{t('weather.currentLocation')}</span>
                  </div>
                </SelectItem>
                {INDIAN_CITIES.map((city) => (
                  <SelectItem key={city.value} value={city.value}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={detectLocation}
              variant="outline"
              size="sm"
              disabled={loading}
              className="px-3"
            >
              <Locate className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current Weather */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getWeatherIcon(weatherData.current.condition.text)}
              <div>
                <div className="text-3xl font-bold">
                  {Math.round(weatherData.current.temp_c)}°C
                </div>
                <div className="text-sm text-muted-foreground">
                  Feels like {Math.round(weatherData.current.feelslike_c)}°C
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium flex items-center gap-1">
                {useCurrentLocation && <Locate className="h-4 w-4 text-primary" />}
                {weatherData.location.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {useCurrentLocation ? "Current Location" : (weatherData.location.region || "India")}
              </div>
              <Badge variant="secondary" className="mt-1">
                {weatherData.current.condition.text}
              </Badge>
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <div>
                <div className="text-sm text-muted-foreground">Humidity</div>
                <div className="font-medium">{weatherData.current.humidity}%</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-sm text-muted-foreground">Wind Speed</div>
                <div className="font-medium">{weatherData.current.wind_kph} km/h</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-purple-500" />
              <div>
                <div className="text-sm text-muted-foreground">Pressure</div>
                <div className="font-medium">{weatherData.current.pressure_mb} mb</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-orange-500" />
              <div>
                <div className="text-sm text-muted-foreground">UV Index</div>
                <div className={`font-medium ${uvInfo.color}`}>
                  {weatherData.current.uv} ({uvInfo.level})
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Cloud Coverage: {weatherData.current.cloud}%</span>
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <span>{isOffline ? "Demo Mode" : "OpenWeather"}</span>
              </div>
            </div>
            {lastUpdated && (
              <div className="text-xs text-muted-foreground mt-1">
                Last updated: {lastUpdated}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}