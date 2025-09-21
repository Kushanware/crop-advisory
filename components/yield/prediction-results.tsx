"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { TrendingUp, AlertTriangle, CheckCircle, Target, BarChart3, Download, Share2, Lightbulb } from "lucide-react"

interface PredictionResultsProps {
  prediction: {
    predictedYield: number
    confidence: number
    factors: Array<{
      name: string
      impact: string
      score: number
    }>
    recommendations: string[]
    riskFactors: Array<{
      risk: string
      probability: string
      mitigation: string
    }>
  }
  onNewPrediction: () => void
}

export function PredictionResults({ prediction, onNewPrediction }: PredictionResultsProps) {
  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "excellent":
        return "bg-green-500"
      case "positive":
      case "good":
        return "bg-green-400"
      case "neutral":
        return "bg-yellow-400"
      case "negative":
        return "bg-red-400"
      default:
        return "bg-gray-400"
    }
  }

  const getProbabilityColor = (probability: string) => {
    switch (probability.toLowerCase()) {
      case "low":
        return "text-green-600 bg-green-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "high":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Prediction Result */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Target className="h-6 w-6" />
            Yield Prediction Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {prediction.predictedYield} <span className="text-lg font-normal">quintals/ha</span>
              </div>
              <p className="text-muted-foreground">Predicted Yield</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{prediction.confidence}%</div>
              <p className="text-muted-foreground">Confidence Level</p>
              <Progress value={prediction.confidence} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Factors Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Yield Factors Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prediction.factors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getImpactColor(factor.impact)}`} />
                  <span className="font-medium">{factor.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{factor.impact}</Badge>
                  <span className="text-sm font-medium">{factor.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {prediction.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-800">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prediction.riskFactors.map((risk, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{risk.risk}</h4>
                  <Badge className={getProbabilityColor(risk.probability)}>{risk.probability} Risk</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>Mitigation:</strong> {risk.mitigation}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onNewPrediction} variant="outline" className="flex-1 bg-transparent">
          <TrendingUp className="mr-2 h-4 w-4" />
          New Prediction
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          <Share2 className="mr-2 h-4 w-4" />
          Share Results
        </Button>
      </div>
    </div>
  )
}
