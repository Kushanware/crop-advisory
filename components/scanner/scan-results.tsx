"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle, XCircle, Leaf, Bug, Droplets, Calendar, Download, Share } from "lucide-react"

interface Disease {
  name: string
  confidence: number
  severity: "low" | "medium" | "high"
  description: string
  symptoms: string[]
  treatment: string[]
  prevention: string[]
}

interface ScanResult {
  overallHealth: number
  primaryDisease: Disease | null
  secondaryDiseases: Disease[]
  recommendations: string[]
  scanDate: string
}

const mockScanResult: ScanResult = {
  overallHealth: 75,
  primaryDisease: {
    name: "Wheat Leaf Rust",
    confidence: 87,
    severity: "medium",
    description: "A fungal disease that affects wheat leaves, causing orange-red pustules and reducing yield.",
    symptoms: [
      "Orange-red pustules on leaf surface",
      "Yellowing of affected leaves",
      "Premature leaf drop",
      "Reduced grain filling",
    ],
    treatment: [
      "Apply fungicide containing propiconazole",
      "Remove and destroy infected plant debris",
      "Improve air circulation around plants",
      "Monitor weather conditions for disease spread",
    ],
    prevention: [
      "Plant resistant wheat varieties",
      "Maintain proper plant spacing",
      "Avoid overhead irrigation",
      "Regular field monitoring",
    ],
  },
  secondaryDiseases: [
    {
      name: "Aphid Infestation",
      confidence: 65,
      severity: "low",
      description: "Small insects that feed on plant sap and can transmit viruses.",
      symptoms: ["Small green insects on leaves", "Sticky honeydew on plants"],
      treatment: ["Apply insecticidal soap", "Introduce beneficial insects"],
      prevention: ["Regular monitoring", "Maintain field hygiene"],
    },
  ],
  recommendations: [
    "Apply fungicide treatment within 48 hours",
    "Monitor surrounding plants for spread",
    "Increase field inspection frequency",
    "Consider early harvest if disease progresses",
  ],
  scanDate: new Date().toISOString(),
}

function getSeverityColor(severity: string) {
  switch (severity) {
    case "low":
      return "text-green-600"
    case "medium":
      return "text-yellow-600"
    case "high":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

function getSeverityBadgeVariant(severity: string): "default" | "secondary" | "destructive" {
  switch (severity) {
    case "low":
      return "default"
    case "medium":
      return "secondary"
    case "high":
      return "destructive"
    default:
      return "secondary"
  }
}

function getHealthIcon(health: number) {
  if (health >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />
  if (health >= 60) return <AlertTriangle className="h-5 w-5 text-yellow-600" />
  return <XCircle className="h-5 w-5 text-red-600" />
}

export function ScanResults() {
  const result = mockScanResult

  return (
    <div className="space-y-6">
      {/* Overall Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getHealthIcon(result.overallHealth)}
            Plant Health Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Overall Health Score</span>
            <span className="text-2xl font-bold text-primary">{result.overallHealth}%</span>
          </div>
          <Progress value={result.overallHealth} className="h-3 mb-4" />
          <p className="text-sm text-muted-foreground">
            Scan completed on {new Date(result.scanDate).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      {/* Primary Disease Detection */}
      {result.primaryDisease && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-destructive" />
                Primary Disease Detected
              </span>
              <Badge variant={getSeverityBadgeVariant(result.primaryDisease.severity)}>
                {result.primaryDisease.severity} severity
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{result.primaryDisease.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-muted-foreground">Confidence:</span>
                <span className="font-medium">{result.primaryDisease.confidence}%</span>
                <Progress value={result.primaryDisease.confidence} className="h-2 flex-1 max-w-32" />
              </div>
              <p className="text-muted-foreground">{result.primaryDisease.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Symptoms */}
              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  Symptoms
                </h4>
                <ul className="space-y-1">
                  {result.primaryDisease.symptoms.map((symptom, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Treatment */}
              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Treatment
                </h4>
                <ul className="space-y-1">
                  {result.primaryDisease.treatment.map((treatment, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                      {treatment}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention */}
              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Prevention
                </h4>
                <ul className="space-y-1">
                  {result.primaryDisease.prevention.map((prevention, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                      {prevention}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Secondary Issues */}
      {result.secondaryDiseases.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-secondary" />
              Additional Issues Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.secondaryDiseases.map((disease, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{disease.name}</h4>
                    <Badge variant={getSeverityBadgeVariant(disease.severity)}>{disease.confidence}% confidence</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{disease.description}</p>
                  <div className="text-sm">
                    <span className="font-medium">Quick treatment: </span>
                    <span className="text-muted-foreground">{disease.treatment[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Immediate Action Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Based on the analysis, immediate action is recommended to prevent disease spread.
            </AlertDescription>
          </Alert>
          <ul className="space-y-2">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-sm text-foreground">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          <Share className="mr-2 h-4 w-4" />
          Share with Expert
        </Button>
        <Button variant="outline">Scan Another Plant</Button>
      </div>
    </div>
  )
}
