export function Footer() {
  return (
    <footer className="relative border-t border-[#1A1A2E]">
      {/* CTA Section */}
      <div className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#080810]" />
        <div className="absolute inset-0 bg-blue-glow opacity-30" />
        <div
          className="absolute inset-0 bg-grid-pattern opacity-50"
          style={{ backgroundSize: "40px 40px" }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 border border-[#4FC3F7]/20 bg-[#4FC3F7]/5 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#4FC3F7] animate-pulse" />
            <span className="font-mono text-xs text-[#4FC3F7] tracking-widest">SECURE YOUR AGENT TODAY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-mono mb-6">
            <span className="text-gradient-white">Ready to secure your</span>
            <br />
            <span className="text-gradient-blue">autonomous agent?</span>
          </h2>

          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Start with one command. No credit card, no subscription — just a Base wallet and your agent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-3 bg-[#0D0D14] border border-[#1A1A2E] rounded-lg px-5 py-3 font-mono text-sm hover:border-[#4FC3F7]/30 transition-all">
              <span className="text-[#4FC3F7] select-none">$</span>
              <span className="text-slate-200">npx blueagent-mcp init</span>
            </div>

            <a
              href="https://github.com/madebyshun/blueagent-x402-services"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-sm bg-[#4FC3F7] hover:bg-[#29ABE2] text-[#050508] font-semibold px-6 py-3 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(79,195,247,0.4)]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1A1A2E] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="glow-dot" />
            <span className="font-mono font-semibold text-white tracking-widest text-sm">
              BLUE<span className="text-[#4FC3F7]">AGENT</span>
            </span>
            <span className="text-slate-600 font-mono text-xs ml-2">
              Security OS for Autonomous Agents on Base
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://x.com/blueagentxyz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-slate-500 hover:text-[#4FC3F7] transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X / Twitter
            </a>
            <a
              href="https://github.com/madebyshun/blueagent-x402-services"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-slate-500 hover:text-[#4FC3F7] transition-colors"
            >
              GitHub
            </a>
            <span className="font-mono text-xs text-slate-600">
              Built on{" "}
              <span className="text-[#4FC3F7]">Base</span>
              {" "}·{" "}
              <span className="text-[#A78BFA]">x402</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
