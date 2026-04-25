const STEPS = [
  {
    n: "01",
    title: "Agent calls URL",
    detail: "POST /honeypot-check",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Server replies 402",
    detail: "Pay $0.05 USDC on Base",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Agent signs & pays",
    detail: "EIP-712 USDC transfer auth",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Result delivered",
    detail: '{ "safe": true, "risk": 0.02 }',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function X402Explainer() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070710]/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-[#1A1A2E] rounded-full px-4 py-1.5 mb-6">
            <span className="font-mono text-xs text-slate-500 tracking-widest">x402 PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            HTTP 402 — Payment Required
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            x402 is a standard that brings native micropayments to HTTP. No wallets to provision, no API keys to rotate — just an agent with USDC.
          </p>
        </div>

        {/* Flow diagram */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {STEPS.map((step, i) => (
            <div key={step.n} className="relative">
              {/* Connector */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-4 z-10 -translate-x-1/2">
                  <div className="w-4 h-px bg-gradient-to-r from-[#4FC3F7]/40 to-[#A78BFA]/40" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[#4FC3F7]/50 text-xs">›</div>
                </div>
              )}

              <div className="card-surface rounded-2xl p-5 h-full flex flex-col items-center text-center gap-3 border border-[#1A1A2E] hover:border-[#4FC3F7]/20 transition-all">
                <div className="font-mono text-xs text-slate-600">{step.n}</div>
                <div className="w-10 h-10 rounded-xl bg-[#4FC3F7]/10 border border-[#4FC3F7]/20 text-[#4FC3F7] flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm mb-1">{step.title}</p>
                  <p className="font-mono text-xs text-slate-500 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center font-mono text-xs text-slate-600 mt-10">
          No API keys · No subscriptions · No wallets to manage in code ·{" "}
          <span className="text-[#4FC3F7]">Just HTTP + USDC</span>
        </p>
      </div>
    </section>
  );
}
