"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown, Minus, Search, Filter, Star, RefreshCw } from "lucide-react"
import type { MandiPrice } from "@/lib/mandi-api"

interface PriceData {
  id: string
  crop: string
  variety: string
  market: string
  state: string
  currentPrice: number
  previousPrice: number
  change: number
  changePercent: number
  minPrice: number
  maxPrice: number
  modalPrice: number
  lastUpdated: string
  unit: string
}

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

export function PriceTable() {
  const [priceData, setPriceData] = useState<MandiPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("all")
  const [selectedCrop, setSelectedCrop] = useState("all")
  const [favorites, setFavorites] = useState<string[]>(["1", "2"])
  const [lastUpdated, setLastUpdated] = useState<string>("")

  // Fetch real mandi prices
  useEffect(() => {
    fetchMandiPrices()
  }, [])

  const fetchMandiPrices = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/mandi-prices')
      const result = await response.json()
      
      if (result.success && result.data.length > 0) {
        setPriceData(result.data)
        setLastUpdated(result.lastUpdated)
        console.log(`✅ Loaded ${result.data.length} real mandi prices from ${result.source}`)
      } else {
        setPriceData([])
        console.warn('No real mandi data available:', result.source || 'Government API temporarily unavailable')
      }
    } catch (error) {
      console.error('Error fetching mandi prices:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredData = priceData.filter((item) => {
    const matchesSearch =
      item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.variety.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesState = selectedState === "all" || item.state === selectedState
    const matchesCrop = selectedCrop === "all" || item.crop === selectedCrop

    return matchesSearch && matchesState && matchesCrop
  })

  const states = ["all", ...Array.from(new Set(priceData.map((item) => item.state)))]
  const crops = ["all", ...Array.from(new Set(priceData.map((item) => item.crop)))]

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Live Mandi Prices
            </CardTitle>
            <p className="text-sm text-muted-foreground">Real-time market prices across India (₹ per quintal)</p>
          </div>
          <Button 
            onClick={fetchMandiPrices} 
            disabled={loading}
            variant="outline" 
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search crops, markets, or varieties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state === "all" ? "All States" : state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by crop" />
            </SelectTrigger>
            <SelectContent>
              {crops.map((crop) => (
                <SelectItem key={crop} value={crop}>
                  {crop === "all" ? "All Crops" : crop}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Crop</TableHead>
                <TableHead>Market</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Min-Max</TableHead>
                <TableHead>Modal Price</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => toggleFavorite(item.id)} className="p-1 h-auto">
                      <Star
                        className={`h-4 w-4 ${
                          favorites.includes(item.id) ? "fill-secondary text-secondary" : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{item.crop}</div>
                      <div className="text-sm text-muted-foreground">{item.variety}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{item.market}</div>
                      <div className="text-sm text-muted-foreground">{item.state}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-lg text-foreground">₹{item.currentPrice}</div>
                    <div className="text-xs text-muted-foreground">per {item.unit}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(item.change)}
                      <span className={`font-medium ${getTrendColor(item.change)}`}>
                        {item.change > 0 ? "+" : ""}
                        {item.change}
                      </span>
                    </div>
                    <div className={`text-sm ${getTrendColor(item.change)}`}>
                      ({item.changePercent > 0 ? "+" : ""}
                      {item.changePercent}%)
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>
                        ₹{item.minPrice} - ₹{item.maxPrice}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">₹{item.modalPrice}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {new Date(item.lastUpdated).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredData.length === 0 && !loading && (
          <div className="text-center py-8">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {priceData.length === 0 ? 'No Government Data Available' : 'No prices found'}
            </h3>
            <p className="text-muted-foreground">
              {priceData.length === 0 
                ? 'Government mandi API is currently unavailable. Showing only authentic data when available.' 
                : 'Try adjusting your search or filter criteria'}
            </p>
            {priceData.length === 0 && (
              <Button 
                onClick={fetchMandiPrices} 
                variant="outline" 
                className="mt-4"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            )}
          </div>
        )}

        {/* Last Updated */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString("en-IN") : 'Loading...'} • 
          {loading ? ' Refreshing...' : ` ${priceData.length} markets loaded`}
        </div>
      </CardContent>
    </Card>
  )
}
