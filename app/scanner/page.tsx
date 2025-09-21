"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ImageUpload } from "@/components/scanner/image-upload"
import { ScanResults } from "@/components/scanner/scan-results"
import { ScanHistory } from "@/components/scanner/scan-history"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scan, Zap, Shield, TrendingUp } from "lucide-react"

export default function ScannerPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleImageSelect = (file: File) => {
    setSelectedImage(file)
    setShowResults(false)
  }

  const handleAnalyze = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsAnalyzing(false)
    setShowResults(true)
  }

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Detection",
      description: "Advanced machine learning algorithms trained on thousands of plant diseases",
    },
    {
      icon: Shield,
      title: "95% Accuracy",
      description: "Highly accurate disease identification with confidence scoring",
    },
    {
      icon: TrendingUp,
      title: "Treatment Recommendations",
      description: "Detailed treatment plans and prevention strategies for each disease",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Plant Disease Scanner</h1>
          <p className="text-muted-foreground">
            Upload a photo of your plant to get instant AI-powered disease detection and treatment recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Scanner */}
          <div className="lg:col-span-2 space-y-8">
            {!showResults ? (
              <>
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  onAnalyze={handleAnalyze}
                  isAnalyzing={isAnalyzing}
                  selectedImage={selectedImage}
                />

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <Card key={index}>
                        <CardContent className="p-6 text-center">
                          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {/* How it Works */}
                <Card>
                  <CardHeader>
                    <CardTitle>How Plant Disease Scanner Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                          1
                        </div>
                        <h4 className="font-medium text-foreground mb-2">Upload Image</h4>
                        <p className="text-sm text-muted-foreground">Take a clear photo of the affected plant part</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                          2
                        </div>
                        <h4 className="font-medium text-foreground mb-2">AI Analysis</h4>
                        <p className="text-sm text-muted-foreground">Our AI analyzes the image for disease patterns</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                          3
                        </div>
                        <h4 className="font-medium text-foreground mb-2">Get Results</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive detailed disease identification and confidence score
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                          4
                        </div>
                        <h4 className="font-medium text-foreground mb-2">Take Action</h4>
                        <p className="text-sm text-muted-foreground">
                          Follow treatment recommendations to save your crop
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <ScanResults />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <ScanHistory />

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scan className="h-5 w-5 text-primary" />
                  Scanning Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <h4 className="font-medium text-foreground mb-1">Best Practices</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Take photos in natural daylight</li>
                    <li>• Focus on diseased areas</li>
                    <li>• Avoid shadows and reflections</li>
                    <li>• Include healthy parts for comparison</li>
                  </ul>
                </div>
                <div className="text-sm">
                  <h4 className="font-medium text-foreground mb-1">Supported Crops</h4>
                  <p className="text-muted-foreground">
                    Wheat, Rice, Corn, Sugarcane, Cotton, Tomato, Potato, and 50+ more crops
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
