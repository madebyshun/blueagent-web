"use client";
import { useState } from "react";

const ITEMS = [
  {
    q: "What is x402?",
    a: "x402 is an open protocol that uses HTTP status code 402 (Payment Required) to enable native micropayments in API calls. When your agent hits a BlueAgent endpoint, the server responds with payment requirements. Your agent signs a USDC transfer authorization and retries — all in one HTTP round-trip.",
  },
  {
    q: "Do I need to manage API keys?",
    a: "No. BlueAgent has no API keys. Authentication is your Base wallet. Your agent signs payments with its private key — the same key it uses for any on-chain action. No key rotation, no rate-limit tiers, no monthly billing.",
  },
  {
    q: "Which wallets are supported?",
    a: "Any EVM wallet that can sign EIP-712 typed data works: MetaMask, Coinbase Wallet, Frame, or any wallet that implements the EIP-1193 provider standard. For server-side agents, you pass a viem WalletClient with a private key.",
  },
  {
    q: "How does billing work?",
    a: "You pay per API call in USDC on Base. There are no subscriptions, no minimum spend, and no invoices. Each call costs between $0.05 and $5.00 depending on the tool. The USDC is transferred atomically with the API response — if the call fails, you're not charged.",
  },
  {
    q: "Can my agent use BlueAgent autonomously?",
    a: "Yes — that's the point. Your agent holds USDC in its wallet and autonomously decides which security tools to call. It signs the payment without human intervention. The circuit-breaker tool can halt the agent itself if risk thresholds are exceeded.",
  },
  {
    q: "Is the source code open?",
    a: "Yes. All 31 tool implementations are open-source on GitHub at madebyshun/blueagent-x402-services. You can inspect exactly what each tool does, fork it, or self-host the entire stack.",
  },
  {
    q: "What network does BlueAgent run on?",
    a: "Base Mainnet. Payments are settled in USDC (0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913) using EIP-3009 transferWithAuthorization — a gasless, signature-based USDC transfer that costs the service provider gas, not the caller.",
  },
  {
    q: "What is the quantum security category?",
    a: "The quantum tools (quantum-premium, key-exposure, quantum-batch) assess wallets for vulnerability to Cryptographically Relevant Quantum Computers (CRQCs). If a wallet has ever broadcast a transaction, its public key is exposed on-chain and potentially vulnerable. These tools score exposure and guide migration before quantum computers arrive.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 sm:py-32 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-[#1A1A2E] rounded-full px-4 py-1.5 mb-6">
            <span className="font-mono text-xs text-slate-500 tracking-widest">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Common questions
          </h2>
        </div>

        <div className="space-y-2">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className="card-surface rounded-xl border border-[#1A1A2E] overflow-hidden transition-all"
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-white text-sm pr-4 group-hover:text-[#4FC3F7] transition-colors">
                  {item.q}
                </span>
                <svg
                  className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {open === i && (
                <div className="px-5 pb-5">
                  <div className="h-px bg-[#1A1A2E] mb-4" />
                  <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
