import HeroSection from "@/components/hero-section"
import Timeline from "@/components/timeline"
import WorkSection from "@/components/work-section"
import FamilySection from "@/components/family-section"
import ContactSection from "@/components/contact-section"
import YoutubeSection from "@/components/youtube-section"
import Navbar from "@/components/navbar"

export default function Page() {
  return (
    <main>
      <Navbar />
      <section id="home">
        <HeroSection />
      </section>
      <section id="journey">
        <Timeline />
      </section>
      <section id="work">
        <WorkSection />
      </section>
      <section id="videos">
        <YoutubeSection />
      </section>
      <section id="family">
        <FamilySection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
    </main>
  )
}

