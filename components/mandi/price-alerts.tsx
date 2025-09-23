"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bell, Plus, Trash2, Edit, CheckCircle, RefreshCw } from "lucide-react"
import { getMandiPrices, getCropPrices, getAvailableStates } from "@/lib/mandi-api"

interface PriceAlert {
  id: string
  crop: string
  market: string
  targetPrice: number
  condition: "above" | "below"
  currentPrice: number
  isActive: boolean
  createdAt: string
}

export function PriceAlerts() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [availableCrops, setAvailableCrops] = useState<string[]>([])
  const [availableMarkets, setAvailableMarkets] = useState<string[]>([])
  const [newAlert, setNewAlert] = useState({
    crop: "",
    market: "",
    targetPrice: "",
    condition: "above" as "above" | "below",
  })

  const fetchRealPrices = async () => {
    try {
      const mandiData = await getMandiPrices()
      
      // Get unique crops and markets from real data
      const crops = [...new Set(mandiData.data.map(price => price.crop))].sort()
      const markets = [...new Set(mandiData.data.map(price => price.market))].sort()
      
      setAvailableCrops(crops)
      setAvailableMarkets(markets)

      // Update current prices for existing alerts
      setAlerts(prevAlerts => 
        prevAlerts.map(alert => {
          // Find current price for this crop and market
          const currentData = mandiData.data.find(price => 
            price.crop.toLowerCase().includes(alert.crop.toLowerCase()) &&
            price.market.toLowerCase().includes(alert.market.toLowerCase())
          )
          
          return {
            ...alert,
            currentPrice: currentData ? currentData.currentPrice : alert.currentPrice
          }
        })
      )
    } catch (error) {
      console.error('Error fetching real prices:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRealPrices()
    // Update prices every 5 minutes
    const interval = setInterval(fetchRealPrices, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const handleAddAlert = async () => {
    if (newAlert.crop && newAlert.market && newAlert.targetPrice) {
      try {
        // Get current price from real data
        const cropPrices = await getCropPrices(newAlert.crop)
        const marketPrice = cropPrices.find(price => 
          price.market.toLowerCase().includes(newAlert.market.toLowerCase())
        )

        const alert: PriceAlert = {
          id: Date.now().toString(),
          crop: newAlert.crop,
          market: newAlert.market,
          targetPrice: Number.parseFloat(newAlert.targetPrice),
          condition: newAlert.condition,
          currentPrice: marketPrice ? marketPrice.currentPrice : 0,
          isActive: true,
          createdAt: new Date().toISOString().split("T")[0],
        }
        setAlerts([...alerts, alert])
        setNewAlert({ crop: "", market: "", targetPrice: "", condition: "above" })
        setShowAddForm(false)
      } catch (error) {
        console.error('Error adding alert:', error)
      }
    }
  }

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, isActive: !alert.isActive } : alert)))
  }

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const getAlertStatus = (alert: PriceAlert) => {
    const isTriggered =
      (alert.condition === "above" && alert.currentPrice >= alert.targetPrice) ||
      (alert.condition === "below" && alert.currentPrice <= alert.targetPrice)

    if (isTriggered) return { status: "triggered", color: "text-green-600", bg: "bg-green-50" }
    if (!alert.isActive) return { status: "inactive", color: "text-gray-600", bg: "bg-gray-50" }
    return { status: "active", color: "text-blue-600", bg: "bg-blue-50" }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Price Alerts
          </div>
          <div className="flex gap-2">
            <Button
              onClick={fetchRealPrices}
              variant="outline"
              size="sm"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button onClick={() => setShowAddForm(!showAddForm)} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Alert
            </Button>
          </div>
        </CardTitle>
        <p className="text-sm text-muted-foreground">Get notified when prices reach your target levels (based on real market data)</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Alert Form */}
        {showAddForm && (
          <Alert>
            <AlertDescription>
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Create New Price Alert</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="crop">Crop</Label>
                    <Select value={newAlert.crop} onValueChange={(value) => setNewAlert({ ...newAlert, crop: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCrops.map((crop) => (
                          <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="market">Market</Label>
                    <Select
                      value={newAlert.market}
                      onValueChange={(value) => setNewAlert({ ...newAlert, market: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select market" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableMarkets.map((market) => (
                          <SelectItem key={market} value={market}>{market}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Select
                      value={newAlert.condition}
                      onValueChange={(value: "above" | "below") => setNewAlert({ ...newAlert, condition: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="above">Price goes above</SelectItem>
                        <SelectItem value="below">Price goes below</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="targetPrice">Target Price (₹/quintal)</Label>
                    <Input
                      id="targetPrice"
                      type="number"
                      placeholder="Enter target price"
                      value={newAlert.targetPrice}
                      onChange={(e) => setNewAlert({ ...newAlert, targetPrice: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddAlert} size="sm" disabled={loading}>
                    Create Alert
                  </Button>
                  <Button onClick={() => setShowAddForm(false)} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && alerts.length === 0 && (
          <div className="text-center py-8">
            <div className="text-muted-foreground">Loading real market data...</div>
          </div>
        )}

        {/* Active Alerts */}
        <div className="space-y-3">
          {alerts.map((alert) => {
            const status = getAlertStatus(alert)
            return (
              <div key={alert.id} className={`p-4 rounded-lg border ${status.bg}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">
                      {alert.crop} - {alert.market}
                    </h4>
                    <Badge variant={status.status === "triggered" ? "default" : "secondary"}>
                      {status.status === "triggered" ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Triggered
                        </>
                      ) : status.status === "active" ? (
                        "Active"
                      ) : (
                        "Inactive"
                      )}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button onClick={() => toggleAlert(alert.id)} variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button onClick={() => deleteAlert(alert.id)} variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Alert when price goes <span className="font-medium">{alert.condition}</span>{" "}
                  <span className="font-medium">₹{alert.targetPrice}/quintal</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Current price: <span className="font-medium">₹{alert.currentPrice || 'Loading...'}/quintal</span> • Created:{" "}
                  {new Date(alert.createdAt).toLocaleDateString()}
                </div>
              </div>
            )
          })}
        </div>

        {alerts.length === 0 && !loading && (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No price alerts set</h3>
            <p className="text-muted-foreground">Create your first alert to get notified about real price changes</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
