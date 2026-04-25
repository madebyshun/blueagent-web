const steps = [
  {
    number: "01",
    title: "Connect via MCP or SDK",
    description:
      "Integrate BlueAgent into your AI agent stack in minutes. Works with Claude Code, Cursor, AgentKit, or any custom SDK. No API keys — your agent authenticates with a Base wallet.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "blue",
  },
  {
    number: "02",
    title: "Call Any Security Tool",
    description:
      "Your agent calls any of 31 security tools — from address screening to smart contract auditing. Each call is an HTTP request with an x402 payment header attached automatically.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "purple",
  },
  {
    number: "03",
    title: "Pay per Call in USDC",
    description:
      "Each tool call costs fractions of a cent, settled instantly in USDC on Base via the x402 protocol. No monthly bills, no overage charges — your agent only pays for what it uses.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "blue",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-[#1A1A2E] rounded-full px-4 py-1.5 mb-6">
            <span className="font-mono text-xs text-slate-500 tracking-widest">HOW IT WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Security that scales with your agent
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Three steps from zero to a fully secured autonomous agent operating on Base.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-[#4FC3F7]/20 via-[#A78BFA]/40 to-[#4FC3F7]/20" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative card-surface rounded-2xl p-8 card-hover"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Step number */}
              <div className="font-mono text-5xl font-bold text-[#1A1A2E] absolute top-6 right-6 select-none">
                {step.number}
              </div>

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                  step.color === "blue"
                    ? "bg-[#4FC3F7]/10 text-[#4FC3F7] border border-[#4FC3F7]/20"
                    : "bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20"
                }`}
              >
                {step.icon}
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>

              {/* Bottom accent */}
              <div
                className={`absolute bottom-0 left-8 right-8 h-px ${
                  step.color === "blue"
                    ? "bg-gradient-to-r from-transparent via-[#4FC3F7]/40 to-transparent"
                    : "bg-gradient-to-r from-transparent via-[#A78BFA]/40 to-transparent"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
