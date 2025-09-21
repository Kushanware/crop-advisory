import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Punjab",
      avatar: "/indian-farmer-portrait.png",
      rating: 5,
      text: "CropAdvisor helped me detect wheat rust early and saved my entire crop. The disease scanner is incredibly accurate!",
    },
    {
      name: "Priya Sharma",
      location: "Maharashtra",
      avatar: "/indian-woman-farmer-portrait.png",
      rating: 5,
      text: "The mandi price feature helps me decide when to sell my produce. I've increased my profits by 30% this season.",
    },
    {
      name: "Suresh Patel",
      location: "Gujarat",
      avatar: "/indian-farmer-portrait.png",
      rating: 5,
      text: "Weather forecasts are spot-on for my village. I can plan my irrigation and harvesting perfectly now.",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by Farmers Across India</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of farmers who have improved their yields and profits with CropAdvisor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 text-pretty">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
