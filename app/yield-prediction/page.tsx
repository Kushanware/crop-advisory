"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { PredictionForm } from "@/components/yield/prediction-form"
import { PredictionResults } from "@/components/yield/prediction-results"
import { PredictionHistory } from "@/components/yield/prediction-history"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Brain, Target, BarChart3 } from "lucide-react"

export default function YieldPredictionPage() {
  const [prediction, setPrediction] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const handlePredictionGenerated = (newPrediction: any) => {
    setPrediction(newPrediction)
    setShowResults(true)
  }

  const handleNewPrediction = () => {
    setShowResults(false)
    setPrediction(null)
  }

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze multiple factors for accurate predictions",
    },
    {
      icon: Target,
      title: "High Accuracy",
      description: "Our models achieve 90%+ accuracy based on historical data and real-time conditions",
    },
    {
      icon: BarChart3,
      title: "Detailed Insights",
      description: "Get comprehensive analysis of factors affecting your crop yield",
    },
  ]

  if (showResults && prediction) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PredictionResults prediction={prediction} onNewPrediction={handleNewPrediction} />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            Yield Prediction
          </h1>
          <p className="text-muted-foreground">
            Get AI-powered crop yield predictions to plan your farming activities and maximize productivity
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="predict" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="predict">New Prediction</TabsTrigger>
            <TabsTrigger value="history">Prediction History</TabsTrigger>
          </TabsList>

          <TabsContent value="predict" className="space-y-6">
            <PredictionForm onPredictionGenerated={handlePredictionGenerated} />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <PredictionHistory />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
