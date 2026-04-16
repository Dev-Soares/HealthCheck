import Navbar from '@/modules/landing/components/Navbar'
import Hero from '@/modules/landing/components/Hero'
import FoodShowcase from '@/modules/landing/components/FoodShowcase'
import HowItWorks from '@/modules/landing/components/HowItWorks'
import CTA from '@/modules/landing/components/CTA'
import Footer from '@/modules/landing/components/Footer'

export default function LandingPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <FoodShowcase />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  )
}
