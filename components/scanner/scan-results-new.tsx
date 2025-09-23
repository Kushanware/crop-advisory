"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Leaf, 
  Bug, 
  Droplets, 
  Calendar, 
  Download, 
  Share, 
  Target,
  DollarSign,
  Clock,
  TrendingUp
} from "lucide-react"
import { DiseaseDetection, Treatment } from "@/lib/disease-detection"

interface ScanResultsProps {
  detection: DiseaseDetection
  onNewScan: () => void
  processingTime?: number
}

export function ScanResults({ detection, onNewScan, processingTime }: ScanResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return CheckCircle
      case 'medium': return AlertTriangle
      case 'high': return AlertTriangle
      case 'critical': return XCircle
      default: return AlertTriangle
    }
  }

  const getTreatmentTypeColor = (type: string) => {
    switch (type) {
      case 'Organic': return 'bg-green-100 text-green-800'
      case 'Chemical': return 'bg-blue-100 text-blue-800'
      case 'Cultural': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const SeverityIcon = getSeverityIcon(detection.severity)
  const confidencePercentage = Math.round(detection.confidence * 100)

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Bug className="h-6 w-6 text-primary" />
                Disease Detection Results
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date().toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
                {processingTime && (
                  <>
                    <span>•</span>
                    <Clock className="h-4 w-4" />
                    {(processingTime / 1000).toFixed(1)}s processing time
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Disease Identification */}
            <Card className="border-2 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <SeverityIcon className={`h-8 w-8 ${getSeverityColor(detection.severity).split(' ')[0]}`} />
                  <div>
                    <h3 className="font-semibold text-lg">{detection.diseaseName}</h3>
                    <Badge className={getSeverityColor(detection.severity)} variant="secondary">
                      {detection.severity} Severity
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Confidence</span>
                    <span className="font-medium">{confidencePercentage}%</span>
                  </div>
                  <Progress value={confidencePercentage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Affected Crops */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold">Affected Crops</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {detection.affectedCrops.map((crop, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {crop}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Button onClick={onNewScan} variant="outline" className="w-full">
                    <Target className="h-4 w-4 mr-2" />
                    New Scan
                  </Button>
                  <Button variant="outline" className="w-full">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Track Progress
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information */}
      <Tabs defaultValue="symptoms" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          <TabsTrigger value="treatment">Treatment</TabsTrigger>
          <TabsTrigger value="prevention">Prevention</TabsTrigger>
          <TabsTrigger value="causes">Causes</TabsTrigger>
        </TabsList>

        <TabsContent value="symptoms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5" />
                Disease Symptoms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-muted-foreground">{detection.description}</p>
                <div className="grid gap-3">
                  {detection.symptoms.map((symptom, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5" />
                Treatment Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {detection.treatments.map((treatment, index) => (
                  <TreatmentCard key={index} treatment={treatment} rank={index + 1} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prevention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Prevention Measures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {detection.preventiveMeasures.map((measure, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-green-800">{measure}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="causes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Disease Causes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {detection.causes.map((cause, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <span className="text-sm text-orange-800">{cause}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TreatmentCard({ treatment, rank }: { treatment: Treatment; rank: number }) {
  return (
    <Card className="border-l-4 border-l-primary/50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {rank}
            </div>
            <div>
              <h4 className="font-semibold">{treatment.name}</h4>
              <Badge className={getTreatmentTypeColor(treatment.type)} variant="secondary">
                {treatment.type}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              {treatment.effectiveness}% effective
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-muted-foreground">Dosage:</span>
            <p>{treatment.dosage}</p>
          </div>
          <div>
            <span className="font-medium text-muted-foreground">Application:</span>
            <p>{treatment.applicationMethod}</p>
          </div>
          <div>
            <span className="font-medium text-muted-foreground">Timing:</span>
            <p>{treatment.timing}</p>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-green-600" />
            <span className="font-medium text-muted-foreground">Cost:</span>
            <p>{treatment.cost}</p>
          </div>
        </div>

        <Progress value={treatment.effectiveness} className="h-2 mt-3" />
      </CardContent>
    </Card>
  )
}

function getTreatmentTypeColor(type: string) {
  switch (type) {
    case 'Organic': return 'bg-green-100 text-green-800'
    case 'Chemical': return 'bg-blue-100 text-blue-800'
    case 'Cultural': return 'bg-purple-100 text-purple-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}