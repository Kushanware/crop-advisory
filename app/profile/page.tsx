import { Navigation } from "@/components/navigation"
import { UserProfile } from "@/components/auth/user-profile"
import { Footer } from "@/components/footer"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-8">
        <UserProfile />
      </main>
      <Footer />
    </div>
  )
}
