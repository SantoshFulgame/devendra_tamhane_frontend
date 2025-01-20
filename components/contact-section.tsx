// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Mail, Phone, MapPin } from 'lucide-react'

// export default function ContactSection() {
//   return (
//     <section className="py-16 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
//           <p className="text-lg text-muted-foreground">Lets discuss how we can work together</p>
//         </div>
//         <div className="grid gap-8 lg:grid-cols-2">
//           <Card>
//             <CardContent className="p-6">
//               <form className="space-y-4">
//                 <div>
//                   <Input placeholder="Your Name" />
//                 </div>
//                 <div>
//                   <Input type="email" placeholder="Your Email" />
//                 </div>
//                 <div>
//                   <Input placeholder="Subject" />
//                 </div>
//                 <div>
//                   <Textarea placeholder="Your Message" className="min-h-[150px]" />
//                 </div>
//                 <Button className="w-full">Send Message</Button>
//               </form>
//             </CardContent>
//           </Card>
//           <div className="space-y-6">
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-center gap-4">
//                   <div className="p-2 rounded-full bg-primary/10">
//                     <Mail className="h-6 w-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold">Email</h3>
//                     <p className="text-muted-foreground">contact@example.com</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-center gap-4">
//                   <div className="p-2 rounded-full bg-primary/10">
//                     <Phone className="h-6 w-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold">Phone</h3>
//                     <p className="text-muted-foreground">+91 XXXXXXXXXX</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-center gap-4">
//                   <div className="p-2 rounded-full bg-primary/10">
//                     <MapPin className="h-6 w-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold">Location</h3>
//                     <p className="text-muted-foreground">Kalyan, Maharashtra, India</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

export default function ContactSection() {
  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number
    window.open('https://wa.me/+91XXXXXXXXXX', '_blank')
  }

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-muted-foreground">Lets discuss how we can work together</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <form className="space-y-4">
                <div>
                  <Input placeholder="Your Name" />
                </div>
                <div>
                  <Input type="email" placeholder="Your Email" />
                </div>
                <div>
                  <Input placeholder="Subject" />
                </div>
                <div>
                  <Textarea placeholder="Your Message" className="min-h-[150px]" />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-muted-foreground">contact@example.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-muted-foreground">+91 XXXXXXXXXX</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Location</h3>
                    <p className="text-muted-foreground">Kalyan, Maharashtra, India</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <Button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg p-0 z-50"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 text-white" />
        <span className="sr-only">Chat on WhatsApp</span>
      </Button>
    </section>
  )
}
