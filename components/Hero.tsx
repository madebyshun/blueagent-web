"use client";
import { useState } from "react";

const stats = [
  { value: "31", label: "Security Tools" },
  { value: "$0.05", label: "Min. per Call" },
  { value: "Base", label: "Network" },
  { value: "x402", label: "Protocol" },
];

export function Hero() {
  const [copied, setCopied] = useState(false);
  const installCmd = "npx blueagent-mcp init";

  const copy = () => {
    navigator.clipboard.writeText(installCmd).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background grid + glow */}
      <div
        className="absolute inset-0 bg-grid-pattern"
        style={{ backgroundSize: "40px 40px" }}
      />
      <div className="absolute inset-0 bg-hero-glow" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[rgba(79,195,247,0.04)] blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[rgba(167,139,250,0.05)] blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-[#4FC3F7]/20 bg-[#4FC3F7]/5 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#4FC3F7] animate-pulse" />
          <span className="font-mono text-xs text-[#4FC3F7] tracking-widest">BUILT ON BASE · x402 PROTOCOL</span>
        </div>

        {/* Main logo */}
        <h1 className="font-mono font-bold tracking-[0.2em] mb-4">
          <span className="block text-5xl sm:text-7xl lg:text-8xl text-gradient-white">BLUE</span>
          <span className="block text-5xl sm:text-7xl lg:text-8xl text-gradient-blue">AGENT</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The <span className="text-white font-medium">Security OS</span> for autonomous agents on Base.{" "}
          31 pay-per-call security tools — no API keys, no subscriptions, just{" "}
          <span className="text-[#4FC3F7] font-medium">USDC on Base</span>.
        </p>

        {/* Install command */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-3 bg-[#0D0D14] border border-[#1A1A2E] rounded-lg px-5 py-3 font-mono text-sm group hover:border-[#4FC3F7]/30 transition-all">
            <span className="text-[#4FC3F7] select-none">$</span>
            <span className="text-slate-200">{installCmd}</span>
            <button
              onClick={copy}
              className="ml-2 text-slate-500 hover:text-[#4FC3F7] transition-colors"
              title="Copy"
            >
              {copied ? (
                <svg className="w-4 h-4 text-[#4FC3F7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
          <a
            href="#tools"
            className="bg-[#4FC3F7] hover:bg-[#29ABE2] text-[#050508] font-semibold font-mono text-sm px-6 py-3 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(79,195,247,0.4)]"
          >
            Browse Tools →
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="card-surface rounded-xl p-4 text-center"
            >
              <div className="font-mono text-2xl font-bold text-gradient-blue">{value}</div>
              <div className="font-mono text-xs text-slate-500 mt-1 tracking-wider uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#4FC3F7]/50 to-transparent" />
      </div>
    </section>
  );
}
