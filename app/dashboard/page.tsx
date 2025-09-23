"use client"

import { Navigation } from "@/components/navigation"
import { ReliableWeatherWidget } from "@/components/dashboard/reliable-weather-widget"
import { FarmOverview } from "@/components/dashboard/farm-overview"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { MarketSummary } from "@/components/dashboard/market-summary"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Bell, User } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import Link from "next/link"

export default function DashboardPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Dashboard Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('dashboard.greeting')}, Rajesh!</h1>
              <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                {t('dashboard.alerts')}
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/profile">
                  <User className="h-4 w-4 mr-2" />
                  {t('dashboard.profile')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <FarmOverview />
            <QuickActions />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <ReliableWeatherWidget />
            <MarketSummary />
          </div>
        </div>

        {/* Additional Dashboard Sections */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded-lg border border-border text-center">
            <div className="text-3xl font-bold text-primary mb-2">15</div>
            <div className="text-sm text-muted-foreground">Disease Scans This Month</div>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border text-center">
            <div className="text-3xl font-bold text-secondary mb-2">₹2.4L</div>
            <div className="text-sm text-muted-foreground">Estimated Revenue</div>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
            <div className="text-sm text-muted-foreground">Overall Farm Health</div>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
            <div className="text-sm text-muted-foreground">Expert Consultations</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
