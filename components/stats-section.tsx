import { Card, CardContent } from "@/components/ui/card"
import { Users, Scan, TrendingUp, Award } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "50,000+",
      label: "Active Farmers",
      description: "Farmers using our platform daily",
    },
    {
      icon: Scan,
      value: "2M+",
      label: "Disease Scans",
      description: "Successful plant disease detections",
    },
    {
      icon: TrendingUp,
      value: "₹500Cr+",
      label: "Farmer Savings",
      description: "Total savings through better decisions",
    },
    {
      icon: Award,
      value: "95%",
      label: "Accuracy Rate",
      description: "Disease detection accuracy",
    },
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Making a Real Impact</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our technology is helping farmers across India make better decisions and improve their livelihoods
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
