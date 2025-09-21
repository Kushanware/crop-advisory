"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bell, Plus, Trash2, Edit, CheckCircle } from "lucide-react"

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

const mockAlerts: PriceAlert[] = [
  {
    id: "1",
    crop: "Wheat",
    market: "Ludhiana",
    targetPrice: 2200,
    condition: "above",
    currentPrice: 2150,
    isActive: true,
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    crop: "Rice",
    market: "Karnal",
    targetPrice: 4000,
    condition: "below",
    currentPrice: 4200,
    isActive: true,
    createdAt: "2024-01-12",
  },
  {
    id: "3",
    crop: "Cotton",
    market: "Rajkot",
    targetPrice: 7000,
    condition: "above",
    currentPrice: 6800,
    isActive: false,
    createdAt: "2024-01-08",
  },
]

export function PriceAlerts() {
  const [alerts, setAlerts] = useState<PriceAlert[]>(mockAlerts)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAlert, setNewAlert] = useState({
    crop: "",
    market: "",
    targetPrice: "",
    condition: "above" as "above" | "below",
  })

  const handleAddAlert = () => {
    if (newAlert.crop && newAlert.market && newAlert.targetPrice) {
      const alert: PriceAlert = {
        id: Date.now().toString(),
        crop: newAlert.crop,
        market: newAlert.market,
        targetPrice: Number.parseFloat(newAlert.targetPrice),
        condition: newAlert.condition,
        currentPrice: 2000, // Mock current price
        isActive: true,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setAlerts([...alerts, alert])
      setNewAlert({ crop: "", market: "", targetPrice: "", condition: "above" })
      setShowAddForm(false)
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
          <Button onClick={() => setShowAddForm(!showAddForm)} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Alert
          </Button>
        </CardTitle>
        <p className="text-sm text-muted-foreground">Get notified when prices reach your target levels</p>
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
                        <SelectItem value="Wheat">Wheat</SelectItem>
                        <SelectItem value="Rice">Rice</SelectItem>
                        <SelectItem value="Cotton">Cotton</SelectItem>
                        <SelectItem value="Sugarcane">Sugarcane</SelectItem>
                        <SelectItem value="Maize">Maize</SelectItem>
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
                        <SelectItem value="Ludhiana">Ludhiana</SelectItem>
                        <SelectItem value="Karnal">Karnal</SelectItem>
                        <SelectItem value="Rajkot">Rajkot</SelectItem>
                        <SelectItem value="Muzaffarnagar">Muzaffarnagar</SelectItem>
                        <SelectItem value="Davangere">Davangere</SelectItem>
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
                    <Label htmlFor="targetPrice">Target Price (₹)</Label>
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
                  <Button onClick={handleAddAlert} size="sm">
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
                  <span className="font-medium">₹{alert.targetPrice}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Current price: <span className="font-medium">₹{alert.currentPrice}</span> • Created:{" "}
                  {new Date(alert.createdAt).toLocaleDateString()}
                </div>
              </div>
            )
          })}
        </div>

        {alerts.length === 0 && (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No price alerts set</h3>
            <p className="text-muted-foreground">Create your first alert to get notified about price changes</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
