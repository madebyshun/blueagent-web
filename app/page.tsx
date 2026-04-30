import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { StatsBar } from '@/components/StatsBar'
import { Footer } from '@/components/Footer'

const PAGES = [
  {
    href: "/tools",
    label: "Tools",
    desc: "31 security tools for autonomous agents. Filter by category, run live with x402.",
    meta: "31 tools",
    color: "text-[#4FC3F7] border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50",
    dot: "bg-[#4FC3F7]",
  },
  {
    href: "/how-it-works",
    label: "How it Works",
    desc: "How x402 protocol enables pay-per-call AI tools with no API keys or subscriptions.",
    meta: "4 steps",
    color: "text-[#A78BFA] border-[#A78BFA]/20 hover:border-[#A78BFA]/50",
    dot: "bg-[#A78BFA]",
  },
  {
    href: "/build",
    label: "Build",
    desc: "Integrate via MCP, Anthropic SDK, AgentKit, or direct HTTP in minutes.",
    meta: "4 methods",
    color: "text-emerald-400 border-emerald-400/20 hover:border-emerald-400/50",
    dot: "bg-emerald-400",
  },
  {
    href: "/pricing",
    label: "Pricing",
    desc: "Pay per call in USDC on Base. No subscriptions, no API keys, no minimums.",
    meta: "from $0.05",
    color: "text-yellow-400 border-yellow-400/20 hover:border-yellow-400/50",
    dot: "bg-yellow-400",
  },
]

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />

      {/* Page nav cards */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-4">
            {PAGES.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className={`group block card-surface rounded-2xl p-6 border transition-all duration-200 ${page.color}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${page.dot}`} />
                    <span className="font-mono font-bold text-white text-base">{page.label}</span>
                  </div>
                  <span className={`font-mono text-xs px-2 py-0.5 rounded border ${page.color}`}>
                    {page.meta}
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{page.desc}</p>
                <span className={`font-mono text-xs group-hover:underline transition-colors ${page.color.split(' ')[0]}`}>
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
