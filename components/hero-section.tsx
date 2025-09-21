import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Scan, CloudSun, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const features = [
    {
      icon: Scan,
      title: "Disease Scanner",
      description: "AI-powered plant disease detection",
      href: "/scanner",
    },
    {
      icon: CloudSun,
      title: "Weather Forecast",
      description: "Hyperlocal weather updates",
      href: "/weather",
    },
    {
      icon: TrendingUp,
      title: "Mandi Prices",
      description: "Real-time crop prices",
      href: "/mandi",
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description: "Connect with agricultural experts",
      href: "/consultation",
    },
  ]

  return (
    <div className="relative">
      {/* Hero Background */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Smart Farming Solutions for <span className="text-primary">Better Yields</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              Empower your farming with AI-powered disease detection, real-time weather updates, market prices, and
              expert guidance. Join thousands of farmers growing smarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/scanner">
                  <Scan className="mr-2 h-5 w-5" />
                  Start Disease Scan
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Link href={feature.href} className="block">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
