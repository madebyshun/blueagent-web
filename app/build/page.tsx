import { LiveDemo } from '@/components/LiveDemo'
import { Integrations } from '@/components/Integrations'
import { CodeTabs } from '@/components/CodeTabs'

export const metadata = {
  title: "Build — BlueAgent",
  description: "Integrate BlueAgent via MCP, Anthropic SDK, AgentKit, or direct HTTP in minutes.",
}

export default function BuildPage() {
  return (
    <main>
      <LiveDemo />
      <Integrations />
      <CodeTabs />
    </main>
  )
}
