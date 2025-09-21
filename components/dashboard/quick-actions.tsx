"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Scan, TrendingUp, Users, Calculator, Camera, Bell } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Scan Plant Disease",
      description: "AI-powered disease detection",
      icon: Scan,
      href: "/scanner",
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Check Mandi Prices",
      description: "Latest market rates",
      icon: TrendingUp,
      href: "/mandi",
      color: "bg-secondary/10 text-secondary",
    },
    {
      title: "Expert Consultation",
      description: "Get professional advice",
      icon: Users,
      href: "/consultation",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Yield Prediction",
      description: "Forecast your harvest",
      icon: Calculator,
      href: "/yield",
      color: "bg-green-100 text-green-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button key={index} variant="outline" className="h-auto p-4 justify-start bg-transparent" asChild>
                <Link href={action.href}>
                  <div className="flex items-center gap-3 w-full">
                    <div className={`p-2 rounded-md ${action.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </div>
                </Link>
              </Button>
            )
          })}
        </div>

        {/* Recent Activity */}
        <div className="mt-6 space-y-3">
          <h4 className="font-medium text-foreground">Recent Activity</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-md">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium">Disease scan completed</span>
                <span className="text-muted-foreground"> - Wheat field healthy</span>
              </div>
              <span className="text-xs text-muted-foreground ml-auto">2h ago</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-md">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium">Weather alert</span>
                <span className="text-muted-foreground"> - Rain expected tomorrow</span>
              </div>
              <span className="text-xs text-muted-foreground ml-auto">4h ago</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-md">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium">Price update</span>
                <span className="text-muted-foreground"> - Wheat prices increased</span>
              </div>
              <span className="text-xs text-muted-foreground ml-auto">1d ago</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
