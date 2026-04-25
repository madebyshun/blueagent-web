"use client";
import { useState } from "react";
import ToolRunner from "./ToolRunner";

type Tool = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
};

const BASE_URL = "https://x402.bankr.bot/0xf31f59e7b8b58555f7871f71973a394c8f1bffe5";

const ALL_TOOLS: Tool[] = [
  // Security
  { id: "risk-gate",       name: "risk-gate",       description: "Pre-transaction safety checks for autonomous agents",           price: "$0.05",  category: "Security" },
  { id: "honeypot-check",  name: "honeypot-check",  description: "Identifies honeypot / rug-pull contracts before trading",       price: "$0.05",  category: "Security" },
  { id: "allowance-audit", name: "allowance-audit", description: "Audit dangerous token approvals — find unlimited allowances",   price: "$0.20",  category: "Security" },
  { id: "phishing-scan",   name: "phishing-scan",   description: "Evaluates URLs, contracts, and handles for scam indicators",   price: "$0.10",  category: "Security" },
  { id: "mev-shield",      name: "mev-shield",      description: "Analyzes sandwich attack risks for large swaps",                price: "$0.30",  category: "Security" },
  { id: "contract-trust",  name: "contract-trust",  description: "Trust scoring for contract safety and AI interaction",          price: "$0.25",  category: "Security" },
  { id: "circuit-breaker", name: "circuit-breaker", description: "Halts autonomous agent actions during risk scenarios",          price: "$0.50",  category: "Security" },

  // Quantum
  { id: "key-exposure",      name: "key-exposure",      description: "Detects if wallet public keys are exposed on-chain",               price: "$0.50",  category: "Quantum" },
  { id: "quantum-premium",   name: "quantum-premium",   description: "Quantum vulnerability score for any wallet — public key analysis", price: "$1.50",  category: "Quantum" },
  { id: "quantum-batch",     name: "quantum-batch",     description: "Scans 1–10 wallets for quantum exposure at $0.25 each",            price: "$2.50",  category: "Quantum" },
  { id: "quantum-migrate",   name: "quantum-migrate",   description: "Migration planning with step-by-step guidance and timeline",       price: "$2.00",  category: "Quantum" },
  { id: "quantum-timeline",  name: "quantum-timeline",  description: "Quantum threat timeline — when CRQC arrives, milestones",         price: "$0.40",  category: "Quantum" },

  // Research
  { id: "deep-analysis",     name: "deep-analysis",     description: "Deep due diligence for any Base token or project",              price: "$0.35",  category: "Research" },
  { id: "launch-advisor",    name: "launch-advisor",    description: "Complete token launch strategy with 8-week timeline",           price: "$3.00",  category: "Research" },
  { id: "grant-evaluator",   name: "grant-evaluator",   description: "Ecosystem grant scoring framework",                             price: "$5.00",  category: "Research" },
  { id: "x402-readiness",    name: "x402-readiness",    description: "API readiness audit for x402 payment protocol integration",     price: "$1.00",  category: "Research" },
  { id: "base-deploy-check", name: "base-deploy-check", description: "Pre-deployment contract security verification on Base",         price: "$0.50",  category: "Research" },
  { id: "tokenomics-score",  name: "tokenomics-score",  description: "Supply and vesting sustainability analysis",                    price: "$0.50",  category: "Research" },
  { id: "whitepaper-tldr",   name: "whitepaper-tldr",   description: "Five-bullet summary of any project documentation",             price: "$0.20",  category: "Research" },
  { id: "vc-tracker",        name: "vc-tracker",        description: "Investment activity and sector thesis tracking",                price: "$1.00",  category: "Research" },

  // Analytics
  { id: "wallet-pnl",     name: "wallet-pnl",     description: "Wallet PnL report — trading style, win rate, smart money signals", price: "$1.00",  category: "Analytics" },
  { id: "whale-tracker",  name: "whale-tracker",  description: "Smart money accumulation / distribution signals",                  price: "$0.10",  category: "Analytics" },
  { id: "aml-screen",     name: "aml-screen",     description: "Compliance screening with transaction pattern analysis",           price: "$0.25",  category: "Analytics" },
  { id: "airdrop-check",  name: "airdrop-check",  description: "Base airdrop eligibility assessment",                             price: "$0.10",  category: "Analytics" },
  { id: "narrative-pulse",name: "narrative-pulse",description: "Trending topics and emerging opportunities on Base",              price: "$0.40",  category: "Analytics" },
  { id: "dex-flow",       name: "dex-flow",       description: "Real-time DEX volume and liquidity pressure metrics",             price: "$0.15",  category: "Analytics" },

  // Portfolio
  { id: "yield-optimizer", name: "yield-optimizer", description: "Best APY opportunities on Base DeFi — live rates",               price: "$0.15",  category: "Portfolio" },
  { id: "lp-analyzer",     name: "lp-analyzer",     description: "LP position analysis with rebalancing recommendations",          price: "$0.25",  category: "Portfolio" },
  { id: "tax-report",      name: "tax-report",      description: "Annual tax summary with realized gains and P&L",                 price: "$2.00",  category: "Portfolio" },

  // Alerts
  { id: "alert-subscribe", name: "alert-subscribe", description: "Webhook-based real-time alerts for whale / risk events",  price: "$0.50",  category: "Alerts" },
  { id: "alert-check",     name: "alert-check",     description: "Query active alert triggers for specific addresses",      price: "$0.10",  category: "Alerts" },
];

const CATEGORIES = ["All", "Security", "Quantum", "Research", "Analytics", "Portfolio", "Alerts"];

const categoryColors: Record<string, string> = {
  Security:  "text-[#4FC3F7] bg-[#4FC3F7]/10 border-[#4FC3F7]/20",
  Quantum:   "text-[#A78BFA] bg-[#A78BFA]/10 border-[#A78BFA]/20",
  Research:  "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Analytics: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  Portfolio: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Alerts:    "text-pink-400 bg-pink-400/10 border-pink-400/20",
};


function ToolModal({ tool, onClose }: { tool: Tool; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full sm:max-w-xl bg-[#0D0D14] border border-[#1A1A2E] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1A1A2E] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#4FC3F7] shadow-[0_0_6px_#4FC3F7]" />
            <span className="font-mono font-semibold text-white text-sm">{tool.name}</span>
            <span className={`font-mono text-xs px-2 py-0.5 rounded border ${categoryColors[tool.category]}`}>
              {tool.category}
            </span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Description + price */}
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm text-slate-400">{tool.description}</p>
            <span className="font-mono text-[#4FC3F7] font-bold text-sm whitespace-nowrap">
              {tool.price}<span className="text-slate-500 font-normal">/call</span>
            </span>
          </div>

          {/* Endpoint */}
          <div className="flex items-center gap-2 bg-[#050508] border border-[#1A1A2E] rounded-lg px-3 py-2 overflow-x-auto">
            <span className="font-mono text-xs text-slate-500 shrink-0">POST</span>
            <span className="font-mono text-xs text-[#4FC3F7] whitespace-nowrap">
              {BASE_URL}/{tool.id}
            </span>
          </div>

          {/* Live tool runner */}
          <ToolRunner toolId={tool.id} price={tool.price} />

          {/* GitHub source */}
          <a
            href={`https://github.com/madebyshun/blueagent-x402-services/tree/main/x402/${tool.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-slate-600 hover:text-[#4FC3F7] font-mono text-xs transition-colors py-1"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View source on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Tools() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Tool | null>(null);

  const filtered = ALL_TOOLS.filter((t) => {
    const matchCat = active === "All" || t.category === active;
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="tools" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 border border-[#1A1A2E] rounded-full px-4 py-1.5 mb-6">
            <span className="font-mono text-xs text-slate-500 tracking-widest">
              {ALL_TOOLS.length} TOOLS AVAILABLE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            The full security toolkit
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Every tool your agent needs to operate safely on Base. Pay only for calls made.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0D0D14] border border-[#1A1A2E] rounded-lg font-mono text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-[#4FC3F7]/40 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-mono text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  active === cat
                    ? "bg-[#4FC3F7] border-[#4FC3F7] text-[#050508] font-semibold"
                    : "border-[#1A1A2E] text-slate-400 hover:border-[#4FC3F7]/30 hover:text-[#4FC3F7]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => (
            <div
              key={tool.id}
              className="card-surface rounded-xl p-5 card-hover group cursor-pointer"
              onClick={() => setSelected(tool)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#4FC3F7] opacity-60" />
                  <span className="font-mono text-sm font-medium text-white">{tool.name}</span>
                </div>
                <span className={`font-mono text-xs px-2 py-0.5 rounded border ${categoryColors[tool.category]}`}>
                  {tool.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{tool.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#4FC3F7] font-semibold text-sm">
                  {tool.price}<span className="text-slate-500 font-normal">/call</span>
                </span>
                <span className="font-mono text-xs text-slate-600 group-hover:text-[#4FC3F7] transition-colors">
                  → use tool
                </span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500 font-mono text-sm">
            No tools match your search.
          </div>
        )}

        <p className="text-center text-slate-600 font-mono text-xs mt-8">
          {filtered.length} of {ALL_TOOLS.length} tools shown
        </p>
      </div>

      {selected && <ToolModal tool={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
