import { Navigation } from "@/components/navigation"
import { DiseaseLibrary } from "@/components/scanner/disease-library"
import { Footer } from "@/components/footer"
import { Book } from "lucide-react"

export default function DiseaseLibraryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Book className="h-8 w-8 text-primary" />
            Disease Library
          </h1>
          <p className="text-muted-foreground">
            Comprehensive database of plant diseases with symptoms, causes, and treatment recommendations
          </p>
        </div>

        <DiseaseLibrary />
      </div>

      <Footer />
    </div>
  )
}
