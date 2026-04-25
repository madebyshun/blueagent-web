import { Hero } from '@/components/Hero'
import { StatsBar } from '@/components/StatsBar'
import { EcosystemBar } from '@/components/EcosystemBar'
import { HowItWorks } from '@/components/HowItWorks'
import { X402Explainer } from '@/components/X402Explainer'
import { LiveDemo } from '@/components/LiveDemo'
import { UseCases } from '@/components/UseCases'
import { Tools } from '@/components/Tools'
import { Integrations } from '@/components/Integrations'
import { CodeTabs } from '@/components/CodeTabs'
import { Pricing } from '@/components/Pricing'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <EcosystemBar />
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <X402Explainer />
      <LiveDemo />
      <UseCases />
      <section id="tools">
        <Tools />
      </section>
      <section id="integrations">
        <Integrations />
      </section>
      <CodeTabs />
      <section id="pricing">
        <Pricing />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <Footer />
    </main>
  )
}
