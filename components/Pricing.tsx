const features = [
  "Pay only per API call — no subscriptions",
  "USDC on Base — instant settlement",
  "No API key required",
  "x402 protocol — one-line payment header",
  "31 security tools available",
  "Auto-scaling — pay for what you use",
  "No monthly minimums or maximums",
  "Open-source MCP server & SDK",
];

const tiers = [
  {
    name: "Micro",
    range: "< 1,000 calls/day",
    effective: "~$0.001–$0.010",
    label: "per call",
    description: "Perfect for development, testing, and low-volume agents.",
    color: "blue",
    highlight: false,
  },
  {
    name: "Standard",
    range: "1,000–100,000 calls/day",
    effective: "~$0.001–$0.010",
    label: "per call (same rate)",
    description: "Production agents with consistent security coverage. No volume penalty.",
    color: "purple",
    highlight: true,
  },
  {
    name: "Scale",
    range: "> 100,000 calls/day",
    effective: "Volume discount",
    label: "contact us",
    description: "Enterprise agents and infrastructure-level deployments.",
    color: "blue",
    highlight: false,
  },
];

const colorMap: Record<string, { border: string; badge: string; glow: string }> = {
  blue: {
    border: "border-[#4FC3F7]/20 hover:border-[#4FC3F7]/40",
    badge: "text-[#4FC3F7] bg-[#4FC3F7]/10 border-[#4FC3F7]/30",
    glow: "shadow-[0_0_40px_rgba(79,195,247,0.08)]",
  },
  purple: {
    border: "border-[#A78BFA]/30 hover:border-[#A78BFA]/50",
    badge: "text-[#A78BFA] bg-[#A78BFA]/10 border-[#A78BFA]/30",
    glow: "shadow-[0_0_60px_rgba(167,139,250,0.15)]",
  },
};

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070710]/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-[#1A1A2E] rounded-full px-4 py-1.5 mb-6">
            <span className="font-mono text-xs text-slate-500 tracking-widest">PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Pay per call. In USDC on Base.
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            No subscriptions. No API keys. Your agent pays exactly what it uses — fractions of a cent per security check, settled instantly on-chain.
          </p>
        </div>

        {/* Pricing tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier) => {
            const c = colorMap[tier.color];
            return (
              <div
                key={tier.name}
                className={`card-surface rounded-2xl p-8 border transition-all duration-300 relative ${c.border} ${c.glow} ${tier.highlight ? "scale-105 z-10" : ""}`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="font-mono text-xs bg-[#A78BFA] text-[#050508] font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className={`inline-block font-mono text-xs px-2 py-0.5 rounded border mb-4 ${c.badge}`}>
                  {tier.range}
                </div>

                <div className="mb-1">
                  <span className="text-4xl font-mono font-bold text-white">{tier.effective}</span>
                </div>
                <div className="font-mono text-xs text-slate-500 mb-4">{tier.label}</div>

                <h3 className="text-lg font-semibold text-white mb-2">{tier.name}</h3>
                <p className="text-sm text-slate-400">{tier.description}</p>
              </div>
            );
          })}
        </div>

        {/* Features checklist */}
        <div className="max-w-2xl mx-auto card-surface rounded-2xl p-8 border border-[#1A1A2E]">
          <h3 className="font-semibold text-white mb-6 text-center">All plans include</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-[#4FC3F7]/10 border border-[#4FC3F7]/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-[#4FC3F7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-slate-400">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* x402 explainer */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm font-mono mb-2">
            Powered by the{" "}
            <span className="text-[#4FC3F7]">x402 protocol</span>
            {" "}— HTTP 402 Payment Required, natively.
          </p>
          <p className="text-slate-600 text-xs font-mono">
            Your agent sends a payment header with each request. No wallets to manage in your app — just sign once.
          </p>
        </div>
      </div>
    </section>
  );
}
