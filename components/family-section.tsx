import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function FamilySection() {
  const familyMembers = [
    {
      name: "Madhavi Tamhane",
      relation: "Spouse",
      image: "/wife.jpg?height=100&width=100",
      achievements: [
        "Assistant Engineer at Mumbai Municipal Corporation",
        "Diploma in Civil Engineering",
        "MA in Marathi",
      ],
    },
    {
      name: "Vedang Tamhane",
      relation: "Son",
      image: "/son.jpg?height=100&width=100",
      achievements: [
        "Founder of Xenvolt Technology Pvt Limited",
        "BSMS from IISER Tirupati",
        "Published research paper in IGP",
        "Scored 94% in 10th, 84% in 12th",
        "Inspire Scholarship recipient",
      ],
    },
    {
      name: "Sanika Tamhane",
      relation: "Daughter",
      image: "/daughter.jpg?height=100&width=100",
      achievements: [
        "Pursuing TYBSc in Chemistry",
        "Scored 93% in 10th and 91% in 12th",
        "Internships at Ross Laboratory and Wincoats",
      ],
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Family</h2>
          <p className="text-lg text-muted-foreground">&quot;Family is the unit of success&quot;</p>
        </div>
        <div className="max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 gap-8">
           
            <div className="max-w-lg mx-auto w-full">
              <Card className="transform transition-all hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={familyMembers[0].image}
                        alt={familyMembers[0].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{familyMembers[0].name}</h3>
                      <p className="text-primary">{familyMembers[0].relation}</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {familyMembers[0].achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto w-full">
              {familyMembers.slice(1, 3).map((member, index) => (
                <Card key={index} className="transform transition-all hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">{member.name}</h3>
                        <p className="text-primary">{member.relation}</p>
                      </div>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {member.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

