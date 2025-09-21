"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, Camera, X, Loader2 } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  onAnalyze: () => void
  isAnalyzing: boolean
  selectedImage: File | null
}

export function ImageUpload({ onImageSelect, onAnalyze, isAnalyzing, selectedImage }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      onImageSelect(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const clearImage = () => {
    setPreviewUrl(null)
    onImageSelect(null as any)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (cameraInputRef.current) cameraInputRef.current.value = ""
  }

  return (
    <div className="space-y-4">
      {!previewUrl ? (
        <Card
          className={`border-2 border-dashed transition-colors ${
            dragActive ? "border-primary bg-primary/5" : "border-border"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Upload Plant Image</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Drag and drop an image of your plant, or click to browse. For best results, capture the affected area
              clearly.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Browse Files
              </Button>
              <Button
                onClick={() => cameraInputRef.current?.click()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                Take Photo
              </Button>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileInput}
              className="hidden"
            />

            <Alert className="mt-6 max-w-md">
              <AlertDescription className="text-sm">
                <strong>Tips for better results:</strong>
                <br />• Take photos in good lighting
                <br />• Focus on the affected plant parts
                <br />• Avoid blurry or distant shots
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <Image
                  src={previewUrl || "/placeholder.svg"}
                  alt="Selected plant image"
                  fill
                  className="object-cover"
                />
              </div>
              <Button onClick={clearImage} variant="destructive" size="sm" className="absolute top-2 right-2">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Button onClick={onAnalyze} disabled={isAnalyzing} className="flex-1">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Plant Health"
                )}
              </Button>
              <Button onClick={clearImage} variant="outline">
                Upload Different Image
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
