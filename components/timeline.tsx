import { Card, CardContent } from "@/components/ui/card"
import { School, Users, BookOpen, Building, Globe } from 'lucide-react'

export default function Timeline() {
  const achievements = [
    {
      year: "1997-2020",
      title: "Founder of Chaitanya Classes",
      description: "Shaped careers of thousands of students in Kalyan",
      icon: School,
    },
    {
      year: "Present",
      title: "Multiple Roles",
      description: "Academic Excellence Coach, Career Counselor, Educational Mentor",
      icon: Users,
    },
    {
      year: "25+ Years",
      title: "IPH Collaboration",
      description: "Worked with Dr. Anand Nadkarni focusing on mental health",
      icon: Building,
    },
    {
      year: "2019-2020",
      title: "Educational Guidance",
      description: "Coached 10,000+ students across Maharashtra",
      icon: School,
    },
    {
      year: "2024",
      title: "Meghalaya Initiative",
      description: "Month-long program for rural teachers and students",
      icon: Globe,
    },
    {
      year: "Ongoing",
      title: "Book Promotion",
      description: "Personal library of 5,000+ books, distributed books worth ₹20 lakhs",
      icon: BookOpen,
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Journey & Achievements</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <Card key={index} className="transform transition-all hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-primary">{achievement.year}</span>
                  </div>
                  <h3 className="font-bold mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

