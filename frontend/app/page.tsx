import { HeroSection } from '@/components/landing/HeroSection'
import { StatsBar } from '@/components/landing/StatsBar'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { ImageSequence } from '@/components/landing/ImageSequence'
import { TechDive } from '@/components/landing/TechDive'
import { SeveritySpectrum } from '@/components/landing/SeveritySpectrum'
import { Testimonials } from '@/components/landing/Testimonials'
import { FinalCTA } from '@/components/landing/FinalCTA'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <HowItWorks />
      <ImageSequence />
      <TechDive />
      <SeveritySpectrum />
      <Testimonials />
      <FinalCTA />
    </>
  )
}
