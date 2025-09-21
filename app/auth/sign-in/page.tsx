import { SignInForm } from "@/components/auth/sign-in-form"
import { Navigation } from "@/components/navigation"
import { Leaf } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="mb-8 text-center">
            <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
              <Leaf className="h-10 w-10 text-primary" />
              <span className="text-2xl font-bold text-foreground">CropAdvisor</span>
            </Link>
            <p className="text-muted-foreground">Access your farming dashboard and tools</p>
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  )
}
