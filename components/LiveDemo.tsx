"use client";
import ConnectWallet from "./ConnectWallet";
import ToolRunner from "./ToolRunner";

export function LiveDemo() {
  return (
    <section id="live-demo" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#06060F]/60 to-transparent" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 border border-[#4FC3F7]/20 bg-[#4FC3F7]/5 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#4FC3F7] animate-pulse" />
            <span className="font-mono text-xs text-[#4FC3F7] tracking-widest">LIVE DEMO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Try it right now
          </h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Connect your wallet on Base and run a real security check. Costs{" "}
            <span className="text-[#4FC3F7] font-mono">$0.05 USDC</span> — paid from your wallet via x402.
          </p>
        </div>

        {/* Demo card */}
        <div className="card-surface rounded-2xl border border-[#4FC3F7]/20 shadow-[0_0_60px_rgba(79,195,247,0.06)] overflow-hidden">
          {/* Card header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A2E] bg-[#0A0A12]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4FC3F7] opacity-80" />
                <span className="font-mono text-sm font-semibold text-white">honeypot-check</span>
                <span className="font-mono text-xs text-slate-500 border border-[#1A1A2E] rounded px-2 py-0.5">
                  Security
                </span>
              </div>
            </div>
            <ConnectWallet />
          </div>

          {/* Runner */}
          <div className="px-6 py-6">
            <p className="text-sm text-slate-400 mb-1">
              Identifies honeypot / rug-pull contracts before trading
            </p>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs text-slate-600">POST</span>
              <span className="font-mono text-xs text-[#4FC3F7]">
                x402.bankr.bot/…/honeypot-check
              </span>
            </div>
            <ToolRunner toolId="honeypot-check" price="$0.05" />
          </div>
        </div>

        <p className="text-center font-mono text-xs text-slate-600 mt-6">
          Your wallet pays directly — BlueAgent never holds your funds.
        </p>
      </div>
    </section>
  );
}
