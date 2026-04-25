const CASES = [
  {
    title: "DeFi Trading Bots",
    description:
      "Before every swap, your bot runs honeypot-check and mev-shield. If either returns a risk score above threshold, the trade is blocked automatically.",
    tools: ["honeypot-check", "mev-shield", "risk-gate"],
    color: "blue",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
  {
    title: "Autonomous AI Agents",
    description:
      "Claude or GPT-powered agents call risk-gate before any on-chain action. The circuit-breaker halts the agent entirely if anomalous behavior is detected.",
    tools: ["risk-gate", "circuit-breaker", "contract-trust"],
    color: "purple",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Wallet Security Monitoring",
    description:
      "Monitor any wallet for quantum exposure, dangerous allowances, and AML risk. Get webhook alerts when thresholds are breached — all paid per event.",
    tools: ["key-exposure", "allowance-audit", "alert-subscribe"],
    color: "blue",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    title: "Token Launch Due Diligence",
    description:
      "Before listing a new token, run deep-analysis, tokenomics-score, and rug-analyzer. Get a comprehensive risk report in seconds for fractions of a cent.",
    tools: ["deep-analysis", "tokenomics-score", "rug-analyzer"],
    color: "purple",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Compliance & AML",
    description:
      "Screen counterparties before on-chain transactions. Run aml-screen and compliance-check on every address your protocol interacts with — pay only per check.",
    tools: ["aml-screen", "compliance-check", "multichain-check"],
    color: "blue",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Quantum-Safe Migration",
    description:
      "Identify wallets with exposed public keys before CRQC arrives. Run quantum-premium scans across your user base and guide migration to quantum-resistant schemes.",
    tools: ["quantum-premium", "key-exposure", "quantum-migrate"],
    color: "purple",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-[#1A1A2E] rounded-full px-4 py-1.5 mb-6">
            <span className="font-mono text-xs text-slate-500 tracking-widest">USE CASES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built for every agent scenario
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            From solo DeFi bots to enterprise compliance — BlueAgent scales with your stack.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASES.map((c) => (
            <div
              key={c.title}
              className={`card-surface rounded-2xl p-6 border transition-all duration-300 card-hover ${
                c.color === "blue"
                  ? "border-[#1A1A2E] hover:border-[#4FC3F7]/30"
                  : "border-[#1A1A2E] hover:border-[#A78BFA]/30"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  c.color === "blue"
                    ? "bg-[#4FC3F7]/10 text-[#4FC3F7] border border-[#4FC3F7]/20"
                    : "bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20"
                }`}
              >
                {c.icon}
              </div>

              <h3 className="font-semibold text-white text-base mb-2">{c.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{c.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {c.tools.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs text-slate-500 border border-[#1A1A2E] rounded px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
