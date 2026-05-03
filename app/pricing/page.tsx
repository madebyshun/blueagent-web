import { Pricing } from '@/components/Pricing'
import { FAQ } from '@/components/FAQ'

export const metadata = {
  title: "Pricing — BlueAgent",
  description: "Pay per call in USDC on Base. No subscriptions, no API keys, no minimums. Starting at $0.05.",
}

export default function PricingPage() {
  return (
    <main>
      <Pricing />
      <FAQ />
    </main>
  )
}
