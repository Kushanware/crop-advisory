"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown, Minus, Search, Filter, Star } from "lucide-react"

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

const mockPriceData: PriceData[] = [
  {
    id: "1",
    crop: "Wheat",
    variety: "HD-2967",
    market: "Ludhiana",
    state: "Punjab",
    currentPrice: 2150,
    previousPrice: 2100,
    change: 50,
    changePercent: 2.38,
    minPrice: 2100,
    maxPrice: 2200,
    modalPrice: 2150,
    lastUpdated: "2024-01-15T10:30:00Z",
    unit: "quintal",
  },
  {
    id: "2",
    crop: "Rice",
    variety: "Basmati 1121",
    market: "Karnal",
    state: "Haryana",
    currentPrice: 4200,
    previousPrice: 4300,
    change: -100,
    changePercent: -2.33,
    minPrice: 4000,
    maxPrice: 4500,
    modalPrice: 4200,
    lastUpdated: "2024-01-15T10:15:00Z",
    unit: "quintal",
  },
  {
    id: "3",
    crop: "Sugarcane",
    variety: "Co-0238",
    market: "Muzaffarnagar",
    state: "Uttar Pradesh",
    currentPrice: 350,
    previousPrice: 350,
    change: 0,
    changePercent: 0,
    minPrice: 340,
    maxPrice: 360,
    modalPrice: 350,
    lastUpdated: "2024-01-15T09:45:00Z",
    unit: "quintal",
  },
  {
    id: "4",
    crop: "Cotton",
    variety: "Shankar-6",
    market: "Rajkot",
    state: "Gujarat",
    currentPrice: 6800,
    previousPrice: 6750,
    change: 50,
    changePercent: 0.74,
    minPrice: 6700,
    maxPrice: 6900,
    modalPrice: 6800,
    lastUpdated: "2024-01-15T10:00:00Z",
    unit: "quintal",
  },
  {
    id: "5",
    crop: "Maize",
    variety: "Hybrid",
    market: "Davangere",
    state: "Karnataka",
    currentPrice: 1850,
    previousPrice: 1900,
    change: -50,
    changePercent: -2.63,
    minPrice: 1800,
    maxPrice: 1950,
    modalPrice: 1850,
    lastUpdated: "2024-01-15T10:20:00Z",
    unit: "quintal",
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

export function PriceTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("all")
  const [selectedCrop, setSelectedCrop] = useState("all")
  const [favorites, setFavorites] = useState<string[]>(["1", "2"])

  const filteredData = mockPriceData.filter((item) => {
    const matchesSearch =
      item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.variety.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesState = selectedState === "all" || item.state === selectedState
    const matchesCrop = selectedCrop === "all" || item.crop === selectedCrop

    return matchesSearch && matchesState && matchesCrop
  })

  const states = ["all", ...Array.from(new Set(mockPriceData.map((item) => item.state)))]
  const crops = ["all", ...Array.from(new Set(mockPriceData.map((item) => item.crop)))]

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Live Mandi Prices
        </CardTitle>
        <p className="text-sm text-muted-foreground">Real-time market prices across India (₹ per quintal)</p>
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

        {filteredData.length === 0 && (
          <div className="text-center py-8">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No prices found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Last Updated */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString("en-IN")} • Data refreshes every 15 minutes
        </div>
      </CardContent>
    </Card>
  )
}
