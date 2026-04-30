import { EcosystemBar } from '@/components/EcosystemBar'
import { HowItWorks } from '@/components/HowItWorks'
import { X402Explainer } from '@/components/X402Explainer'
import { UseCases } from '@/components/UseCases'

export const metadata = {
  title: "How it Works — BlueAgent",
  description: "How the x402 protocol enables pay-per-call AI security tools with no API keys or subscriptions.",
}

export default function HowItWorksPage() {
  return (
    <main>
      <EcosystemBar />
      <HowItWorks />
      <X402Explainer />
      <UseCases />
    </main>
  )
}
