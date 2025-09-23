import { Navigation } from "@/components/navigation"
import { ReliableWeatherWidget } from "@/components/dashboard/reliable-weather-widget"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CloudSun, Droplets, AlertTriangle, Calendar } from "lucide-react"

export default function WeatherPage() {
  const weatherAlerts = [
    {
      type: "warning",
      title: "Heavy Rain Expected",
      description: "Moderate to heavy rainfall expected on Wednesday. Consider postponing field activities.",
      time: "Valid until Wed 6 PM",
    },
    {
      type: "info",
      title: "Optimal Spraying Conditions",
      description: "Low wind conditions tomorrow morning ideal for pesticide application.",
      time: "Tomorrow 6-10 AM",
    },
  ]

  const farmingTips = [
    {
      title: "Irrigation Planning",
      tip: "With rain expected Wednesday, reduce irrigation by 30% for the next 2 days.",
    },
    {
      title: "Disease Prevention",
      tip: "High humidity levels may increase fungal disease risk. Monitor crops closely.",
    },
    {
      title: "Harvesting Window",
      tip: "Clear weather Friday-Sunday provides good harvesting conditions for sugarcane.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Weather Forecast</h1>
          <p className="text-muted-foreground">Detailed weather information for your farming decisions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Weather Widget */}
          <div className="lg:col-span-2">
            <ReliableWeatherWidget />
          </div>

          {/* Weather Alerts & Tips */}
          <div className="space-y-6">
            {/* Weather Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-secondary" />
                  Weather Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {weatherAlerts.map((alert, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground">{alert.title}</h4>
                      <Badge variant={alert.type === "warning" ? "destructive" : "secondary"}>{alert.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {alert.time}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Farming Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudSun className="h-5 w-5 text-primary" />
                  Weather-Based Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {farmingTips.map((tip, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg">
                    <h4 className="font-medium text-foreground mb-1">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">{tip.tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Extended Forecast */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>14-Day Extended Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                {Array.from({ length: 14 }, (_, i) => {
                  const date = new Date()
                  date.setDate(date.getDate() + i)
                  return (
                    <div key={i} className="text-center p-3 border border-border rounded-lg">
                      <div className="text-sm font-medium text-foreground mb-1">
                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {date.getDate()}/{date.getMonth() + 1}
                      </div>
                      <CloudSun className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                      <div className="text-sm font-medium">32°/22°</div>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Droplets className="h-3 w-3 text-blue-500" />
                        <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 100)}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
