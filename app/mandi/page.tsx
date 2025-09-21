import { Navigation } from "@/components/navigation"
import { PriceTable } from "@/components/mandi/price-table"
import { PriceTrends } from "@/components/mandi/price-trends"
import { MarketInsights } from "@/components/mandi/market-insights"
import { PriceAlerts } from "@/components/mandi/price-alerts"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp } from "lucide-react"

export default function MandiPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            Mandi Price Tracker
          </h1>
          <p className="text-muted-foreground">
            Real-time market prices, trends, and insights to help you make informed selling decisions
          </p>
        </div>

        <Tabs defaultValue="prices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="prices">Live Prices</TabsTrigger>
            <TabsTrigger value="trends">Price Trends</TabsTrigger>
            <TabsTrigger value="insights">Market Insights</TabsTrigger>
            <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="prices" className="space-y-6">
            <PriceTable />
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <PriceTrends />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <MarketInsights />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <PriceAlerts />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
