"use client";
import { useState } from "react";

type Tool = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
};

const ALL_TOOLS: Tool[] = [
  // Address Security
  { id: "address-screener", name: "address-screener", description: "Real-time OFAC & sanctions address screening", price: "$0.001", category: "Address" },
  { id: "wallet-profiler", name: "wallet-profiler", description: "On-chain risk profile & behavioral analysis", price: "$0.004", category: "Address" },
  { id: "poison-address", name: "poison-address", description: "Address poisoning & typosquatting detector", price: "$0.002", category: "Address" },
  { id: "ens-validator", name: "ens-validator", description: "ENS name resolution & spoofing check", price: "$0.001", category: "Address" },

  // Transaction Security
  { id: "tx-simulator", name: "tx-simulator", description: "Pre-execution transaction simulation & risk scoring", price: "$0.005", category: "Transaction" },
  { id: "tx-explainer", name: "tx-explainer", description: "Human-readable transaction decoder", price: "$0.002", category: "Transaction" },
  { id: "mev-detector", name: "mev-detector", description: "MEV attack pattern detection & frontrun alerts", price: "$0.003", category: "Transaction" },
  { id: "front-run-shield", name: "front-run-shield", description: "Frontrunning & sandwich attack protection", price: "$0.004", category: "Transaction" },
  { id: "gas-anomaly", name: "gas-anomaly", description: "Gas price anomaly detection & manipulation alerts", price: "$0.001", category: "Transaction" },
  { id: "slippage-monitor", name: "slippage-monitor", description: "Slippage monitoring & tolerance enforcement", price: "$0.002", category: "Transaction" },
  { id: "drain-simulator", name: "drain-simulator", description: "Wallet drain simulation before execution", price: "$0.005", category: "Transaction" },

  // Token Security
  { id: "token-screener", name: "token-screener", description: "Token contract security score & honeypot check", price: "$0.002", category: "Token" },
  { id: "honeypot-checker", name: "honeypot-checker", description: "Honeypot token buy/sell simulation", price: "$0.003", category: "Token" },
  { id: "rug-analyzer", name: "rug-analyzer", description: "Rug pull probability & liquidity lock verification", price: "$0.005", category: "Token" },
  { id: "approval-monitor", name: "approval-monitor", description: "ERC-20 approval risk & unlimited allowance alerts", price: "$0.002", category: "Token" },
  { id: "permit-guardian", name: "permit-guardian", description: "ERC-20 Permit signature abuse prevention", price: "$0.002", category: "Token" },

  // Smart Contract
  { id: "contract-auditor", name: "contract-auditor", description: "Automated smart contract vulnerability analysis", price: "$0.010", category: "Contract" },
  { id: "defi-risk-score", name: "defi-risk-score", description: "DeFi protocol risk & TVL security assessment", price: "$0.005", category: "Contract" },
  { id: "flash-loan-guard", name: "flash-loan-guard", description: "Flash loan attack vector detection", price: "$0.005", category: "Contract" },
  { id: "proxy-inspector", name: "proxy-inspector", description: "Proxy upgrade pattern & admin key risk check", price: "$0.003", category: "Contract" },
  { id: "bridge-validator", name: "bridge-validator", description: "Cross-chain bridge security verification", price: "$0.004", category: "Contract" },
  { id: "zero-day-scanner", name: "zero-day-scanner", description: "Novel vulnerability pattern recognition", price: "$0.008", category: "Contract" },

  // Agent Security
  { id: "prompt-injection", name: "prompt-injection", description: "Prompt injection & jailbreak attempt detection", price: "$0.003", category: "Agent" },
  { id: "agent-rate-limit", name: "agent-rate-limit", description: "Rate limiting & abuse throttle for agents", price: "$0.001", category: "Agent" },
  { id: "api-key-leak", name: "api-key-leak", description: "API key & secret exposure scanner", price: "$0.002", category: "Agent" },
  { id: "entropy-checker", name: "entropy-checker", description: "Private key & seed entropy validation", price: "$0.003", category: "Agent" },
  { id: "signature-verifier", name: "signature-verifier", description: "Cryptographic signature authenticity check", price: "$0.001", category: "Agent" },

  // Compliance
  { id: "compliance-check", name: "compliance-check", description: "Regulatory compliance & AML risk scoring", price: "$0.005", category: "Compliance" },
  { id: "chain-monitor", name: "chain-monitor", description: "Real-time on-chain event monitoring", price: "$0.003", category: "Compliance" },
  { id: "multichain-check", name: "multichain-check", description: "Cross-chain address reputation lookup", price: "$0.004", category: "Compliance" },
  { id: "nft-fraud-check", name: "nft-fraud-check", description: "NFT wash trading & fraud pattern detection", price: "$0.003", category: "Compliance" },
];

const CATEGORIES = ["All", "Address", "Transaction", "Token", "Contract", "Agent", "Compliance"];

const categoryColors: Record<string, string> = {
  Address: "text-[#4FC3F7] bg-[#4FC3F7]/10 border-[#4FC3F7]/20",
  Transaction: "text-[#A78BFA] bg-[#A78BFA]/10 border-[#A78BFA]/20",
  Token: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Contract: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  Agent: "text-pink-400 bg-pink-400/10 border-pink-400/20",
  Compliance: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
};

export default function Tools() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

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
        {/* Header */}
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
            <div key={tool.id} className="card-surface rounded-xl p-5 card-hover group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#4FC3F7] opacity-60" />
                  <span className="font-mono text-sm font-medium text-white">{tool.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded border ${categoryColors[tool.category] || "text-slate-400 bg-slate-400/10 border-slate-400/20"}`}
                  >
                    {tool.category}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{tool.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#4FC3F7] font-semibold text-sm">{tool.price}<span className="text-slate-500 font-normal">/call</span></span>
                <span className="font-mono text-xs text-slate-600 group-hover:text-[#4FC3F7] transition-colors">→ use tool</span>
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
    </section>
  );
}
