"use client";
import { useState } from "react";
import Link from "next/link";

const BASE_URL = "https://x402.bankr.bot/0xf31f59e7b8b58555f7871f71973a394c8f1bffe5";

type ToolDoc = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  params: { name: string; type: string; required: boolean; description: string }[];
};

const TOOLS: ToolDoc[] = [
  // Security
  { id: "risk-gate",       name: "risk-gate",       category: "Security",  price: "$0.05",  description: "Pre-transaction safety checks for autonomous agents.",
    params: [
      { name: "action",          type: "string",  required: true,  description: "Action type: transfer / swap / approve" },
      { name: "contractAddress", type: "string",  required: false, description: "Target contract address (0x…)" },
      { name: "amount",          type: "string",  required: false, description: "Transaction amount" },
      { name: "toAddress",       type: "string",  required: false, description: "Recipient address (0x…)" },
    ],
  },
  { id: "honeypot-check",  name: "honeypot-check",  category: "Security",  price: "$0.05",  description: "Identifies honeypot / rug-pull contracts before trading.",
    params: [{ name: "token", type: "string", required: true, description: "Token contract address (0x…)" }],
  },
  { id: "allowance-audit", name: "allowance-audit", category: "Security",  price: "$0.20",  description: "Audit dangerous token approvals — find unlimited allowances.",
    params: [{ name: "address", type: "string", required: true, description: "Wallet address to audit (0x…)" }],
  },
  { id: "phishing-scan",   name: "phishing-scan",   category: "Security",  price: "$0.10",  description: "Evaluates URLs, contracts, and handles for scam indicators.",
    params: [{ name: "url", type: "string", required: true, description: "URL, contract address, or @handle to check" }],
  },
  { id: "mev-shield",      name: "mev-shield",      category: "Security",  price: "$0.30",  description: "Analyzes sandwich attack risks for large swaps.",
    params: [
      { name: "tokenIn",  type: "string", required: true, description: "Input token address (0x…)" },
      { name: "tokenOut", type: "string", required: true, description: "Output token address (0x…)" },
      { name: "amountIn", type: "string", required: true, description: "Amount to swap" },
    ],
  },
  { id: "contract-trust",  name: "contract-trust",  category: "Security",  price: "$0.25",  description: "Trust scoring for contract safety and AI interaction.",
    params: [{ name: "contractAddress", type: "string", required: true, description: "Contract address to score (0x…)" }],
  },
  { id: "circuit-breaker", name: "circuit-breaker", category: "Security",  price: "$0.50",  description: "Halts autonomous agent actions during risk scenarios.",
    params: [
      { name: "agentId", type: "string", required: true,  description: "Agent identifier" },
      { name: "action",  type: "string", required: false, description: "Action being evaluated" },
    ],
  },
  // Quantum
  { id: "key-exposure",     name: "key-exposure",     category: "Quantum", price: "$0.50",  description: "Detects if wallet public keys are exposed on-chain.",
    params: [{ name: "address", type: "string", required: true, description: "Wallet address (0x…)" }],
  },
  { id: "quantum-premium",  name: "quantum-premium",  category: "Quantum", price: "$1.50",  description: "Full quantum vulnerability score for any wallet.",
    params: [{ name: "address", type: "string", required: true, description: "Wallet address (0x…)" }],
  },
  { id: "quantum-batch",    name: "quantum-batch",    category: "Quantum", price: "$2.50",  description: "Scans 1–10 wallets for quantum exposure at $0.25 each.",
    params: [{ name: "addresses", type: "string", required: true, description: "Comma-separated addresses (max 10)" }],
  },
  { id: "quantum-migrate",  name: "quantum-migrate",  category: "Quantum", price: "$2.00",  description: "Migration planning with step-by-step guidance and timeline.",
    params: [{ name: "address", type: "string", required: true, description: "Wallet address to migrate (0x…)" }],
  },
  { id: "quantum-timeline", name: "quantum-timeline", category: "Quantum", price: "$0.40",  description: "Quantum threat timeline — when CRQC arrives, key milestones.",
    params: [{ name: "address", type: "string", required: false, description: "Optional wallet address for personalized timeline" }],
  },
  // Research
  { id: "deep-analysis",     name: "deep-analysis",     category: "Research", price: "$0.35", description: "Deep due diligence for any Base token or project.",
    params: [{ name: "token", type: "string", required: true, description: "Token address or symbol (e.g. USDC)" }],
  },
  { id: "launch-advisor",    name: "launch-advisor",    category: "Research", price: "$3.00", description: "Complete token launch strategy with 8-week timeline.",
    params: [
      { name: "projectName", type: "string", required: true,  description: "Project name" },
      { name: "description", type: "string", required: false, description: "Brief project description" },
    ],
  },
  { id: "grant-evaluator",   name: "grant-evaluator",   category: "Research", price: "$5.00", description: "Ecosystem grant scoring framework.",
    params: [{ name: "projectUrl", type: "string", required: true, description: "Project URL or description" }],
  },
  { id: "x402-readiness",    name: "x402-readiness",    category: "Research", price: "$1.00", description: "API readiness audit for x402 payment protocol integration.",
    params: [{ name: "apiUrl", type: "string", required: true, description: "API URL to audit" }],
  },
  { id: "base-deploy-check", name: "base-deploy-check", category: "Research", price: "$0.50", description: "Pre-deployment contract security verification on Base.",
    params: [{ name: "contractAddress", type: "string", required: true, description: "Contract address (0x…)" }],
  },
  { id: "tokenomics-score",  name: "tokenomics-score",  category: "Research", price: "$0.50", description: "Supply and vesting sustainability analysis.",
    params: [{ name: "token", type: "string", required: true, description: "Token address or symbol" }],
  },
  { id: "whitepaper-tldr",   name: "whitepaper-tldr",   category: "Research", price: "$0.20", description: "Five-bullet summary of any project documentation.",
    params: [{ name: "url", type: "string", required: true, description: "Whitepaper URL" }],
  },
  { id: "vc-tracker",        name: "vc-tracker",        category: "Research", price: "$1.00", description: "Investment activity and sector thesis tracking.",
    params: [{ name: "sector", type: "string", required: true, description: "Sector keyword or address (e.g. DeFi, AI)" }],
  },
  // Analytics
  { id: "wallet-pnl",      name: "wallet-pnl",      category: "Analytics", price: "$1.00", description: "Wallet PnL report — trading style, win rate, smart money signals.",
    params: [{ name: "address", type: "string", required: true, description: "Wallet address (0x…)" }],
  },
  { id: "whale-tracker",   name: "whale-tracker",   category: "Analytics", price: "$0.10", description: "Smart money accumulation / distribution signals.",
    params: [{ name: "token", type: "string", required: true, description: "Token address (0x…)" }],
  },
  { id: "aml-screen",      name: "aml-screen",      category: "Analytics", price: "$0.25", description: "Compliance screening with transaction pattern analysis.",
    params: [{ name: "address", type: "string", required: true, description: "Wallet address (0x…)" }],
  },
  { id: "airdrop-check",   name: "airdrop-check",   category: "Analytics", price: "$0.10", description: "Base airdrop eligibility assessment.",
    params: [{ name: "address", type: "string", required: true, description: "Wallet address (0x…)" }],
  },
  { id: "narrative-pulse", name: "narrative-pulse", category: "Analytics", price: "$0.40", description: "Trending topics and emerging opportunities on Base.",
    params: [{ name: "topic", type: "string", required: false, description: "Optional topic filter (e.g. DeFi, AI agents)" }],
  },
  { id: "dex-flow",        name: "dex-flow",        category: "Analytics", price: "$0.15", description: "Real-time DEX volume and liquidity pressure metrics.",
    params: [{ name: "token", type: "string", required: true, description: "Token address or pair (e.g. ETH/USDC)" }],
  },
  // Portfolio
  { id: "yield-optimizer", name: "yield-optimizer", category: "Portfolio", price: "$0.15", description: "Best APY opportunities on Base DeFi — live rates.",
    params: [{ name: "address", type: "string", required: false, description: "Optional wallet address for personalized recommendations" }],
  },
  { id: "lp-analyzer",     name: "lp-analyzer",     category: "Portfolio", price: "$0.25", description: "LP position analysis with rebalancing recommendations.",
    params: [{ name: "address", type: "string", required: true, description: "Wallet address (0x…)" }],
  },
  { id: "tax-report",      name: "tax-report",      category: "Portfolio", price: "$2.00", description: "Annual tax summary with realized gains and P&L.",
    params: [
      { name: "address", type: "string", required: true, description: "Wallet address (0x…)" },
      { name: "year",    type: "number", required: true, description: "Tax year (e.g. 2024)" },
    ],
  },
  // Alerts
  { id: "alert-subscribe", name: "alert-subscribe", category: "Alerts", price: "$0.50", description: "Webhook-based real-time alerts for whale / risk events.",
    params: [
      { name: "address",    type: "string", required: true, description: "Address to watch (0x…)" },
      { name: "webhookUrl", type: "string", required: true, description: "Your webhook endpoint URL" },
    ],
  },
  { id: "alert-check",     name: "alert-check",     category: "Alerts", price: "$0.10", description: "Query active alert triggers for specific addresses.",
    params: [{ name: "address", type: "string", required: true, description: "Address to check (0x…)" }],
  },
];

const CATEGORIES = ["Security", "Quantum", "Research", "Analytics", "Portfolio", "Alerts"];

const categoryColors: Record<string, string> = {
  Security:  "text-[#4FC3F7] bg-[#4FC3F7]/10 border-[#4FC3F7]/20",
  Quantum:   "text-[#A78BFA] bg-[#A78BFA]/10 border-[#A78BFA]/20",
  Research:  "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Analytics: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  Portfolio: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Alerts:    "text-pink-400 bg-pink-400/10 border-pink-400/20",
};

const NAV_SECTIONS = [
  { id: "overview",      label: "Overview" },
  { id: "authentication", label: "Authentication" },
  { id: "quickstart",   label: "Quick Start" },
  { id: "mcp",          label: "→ MCP" },
  { id: "sdk",          label: "→ SDK" },
  { id: "http",         label: "→ Direct HTTP" },
  { id: "tools",        label: "Tool Reference" },
  ...CATEGORIES.map((c) => ({ id: `cat-${c.toLowerCase()}`, label: `→ ${c}` })),
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="text-slate-500 hover:text-[#4FC3F7] transition-colors font-mono text-xs"
    >
      {copied ? "copied!" : "copy"}
    </button>
  );
}

function CodeBlock({ code, lang = "bash" }: { code: string; lang?: string }) {
  return (
    <div className="relative rounded-xl border border-[#1A1A2E] bg-[#050508] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1A1A2E]">
        <span className="font-mono text-xs text-slate-600">{lang}</span>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 overflow-x-auto font-mono text-sm text-slate-300 leading-6">{code}</pre>
    </div>
  );
}

function ParamBadge({ required }: { required: boolean }) {
  return required
    ? <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">required</span>
    : <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 border border-[#1A1A2E]">optional</span>;
}

export default function DocsPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050508] text-slate-300">
      {/* Mobile nav toggle */}
      <div className="lg:hidden sticky top-16 z-30 border-b border-[#1A1A2E] bg-[#050508]/95 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
        <span className="font-mono text-sm text-white">Documentation</span>
        <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="text-slate-400 hover:text-white font-mono text-xs border border-[#1A1A2E] px-3 py-1.5 rounded">
          {mobileNavOpen ? "Close" : "Contents"}
        </button>
      </div>

      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-20 top-[112px] bg-[#050508]/98 overflow-y-auto px-4 py-6">
          <nav className="flex flex-col gap-1">
            {NAV_SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setMobileNavOpen(false)}
                className={`font-mono text-sm py-2 px-3 rounded hover:text-[#4FC3F7] transition-colors ${s.label.startsWith("→") ? "text-slate-500 pl-6" : "text-slate-300"}`}>
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-0">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-20 py-8 pr-6">
            <p className="font-mono text-xs text-slate-600 tracking-widest mb-4 uppercase">Contents</p>
            <nav className="flex flex-col gap-0.5">
              {NAV_SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`}
                  className={`font-mono text-sm py-1.5 px-2 rounded hover:text-[#4FC3F7] transition-colors ${s.label.startsWith("→") ? "text-slate-600 pl-5 text-xs" : "text-slate-400"}`}>
                  {s.label}
                </a>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-[#1A1A2E]">
              <Link href="/" className="font-mono text-xs text-slate-600 hover:text-[#4FC3F7] transition-colors">
                ← Back to site
              </Link>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 py-12 lg:pl-8 max-w-3xl">

          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 border border-[#1A1A2E] rounded-full px-4 py-1.5 mb-6">
              <span className="font-mono text-xs text-slate-500 tracking-widest">DOCUMENTATION</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 font-mono">BlueAgent API</h1>
            <p className="text-slate-400 text-lg">
              31 security tools for autonomous agents on Base. Pay per call in USDC via x402 — no API keys, no subscriptions.
            </p>
          </div>

          {/* Overview */}
          <section id="overview" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold text-white mb-6 font-mono">Overview</h2>
            <div className="prose prose-invert max-w-none space-y-4 text-slate-400">
              <p>
                BlueAgent exposes security tools as HTTP endpoints protected by the <strong className="text-white">x402 payment protocol</strong>.
                Each call costs a small amount of USDC on Base mainnet — no registration required.
              </p>
              <p>
                All endpoints accept <code className="text-[#4FC3F7] bg-[#4FC3F7]/10 px-1.5 py-0.5 rounded text-sm">POST</code> requests
                with a JSON body and return JSON responses.
              </p>
            </div>

            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {[
                { label: "Base URL", value: "x402.bankr.bot/…", detail: "All tools share one host" },
                { label: "Payment", value: "USDC on Base", detail: "Mainnet · chain ID 8453" },
                { label: "Protocol", value: "x402", detail: "EIP-712 · no API keys" },
              ].map((item) => (
                <div key={item.label} className="border border-[#1A1A2E] rounded-xl p-4 bg-[#0A0A12]">
                  <p className="font-mono text-xs text-slate-600 mb-1">{item.label}</p>
                  <p className="font-mono text-sm font-bold text-[#4FC3F7]">{item.value}</p>
                  <p className="font-mono text-xs text-slate-600 mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Authentication */}
          <section id="authentication" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold text-white mb-6 font-mono">Authentication</h2>
            <p className="text-slate-400 mb-6">
              BlueAgent uses the <strong className="text-white">x402 protocol</strong> for payment-as-authentication. No signup or API key needed.
            </p>

            <div className="space-y-4 mb-6">
              {[
                { step: "1", title: "Send request", desc: "POST to any tool endpoint — no headers required on first call." },
                { step: "2", title: "Receive HTTP 402", desc: "Server returns 402 with payment details: amount, recipient, USDC contract." },
                { step: "3", title: "Sign authorization", desc: "Sign an EIP-712 TransferWithAuthorization with your Base wallet (no broadcast needed)." },
                { step: "4", title: "Resend with X-Payment", desc: "Attach X-Payment: base64(JSON) header and resend. Server atomically charges and responds." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div className="w-7 h-7 rounded-full border border-[#4FC3F7]/30 bg-[#4FC3F7]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-mono text-xs text-[#4FC3F7]">{item.step}</span>
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <CodeBlock lang="json" code={`// X-Payment header value (base64-encoded JSON)
{
  "x402Version": 1,
  "scheme": "exact",
  "network": "base-mainnet",
  "payload": {
    "signature": "0x...",
    "authorization": {
      "from": "0xYOUR_WALLET",
      "to": "0xf31f59e7b8b58555f7871f71973a394c8f1bffe5",
      "value": "50000",       // $0.05 in USDC (6 decimals)
      "validAfter": "0",
      "validBefore": "1735000000",
      "nonce": "0x..."        // random 32-byte hex
    }
  }
}`} />
          </section>

          {/* Quick Start */}
          <section id="quickstart" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold text-white mb-2 font-mono">Quick Start</h2>
            <p className="text-slate-400 mb-8">Three ways to integrate BlueAgent into your agent or app.</p>

            {/* MCP */}
            <div id="mcp" className="mb-10 scroll-mt-24">
              <h3 className="text-lg font-bold text-white mb-4 font-mono flex items-center gap-2">
                <span className="text-[#4FC3F7]">01</span> MCP (Recommended)
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                One command gives Claude Code / Claude Desktop access to all 31 tools.
                Your wallet key is loaded from environment — no additional config.
              </p>
              <CodeBlock lang="bash" code={`npx blueagent-mcp init`} />
              <p className="text-slate-500 text-xs mt-3 font-mono">
                Requires BASE_WALLET_KEY env var (private key of a funded Base wallet).
              </p>
            </div>

            {/* SDK */}
            <div id="sdk" className="mb-10 scroll-mt-24">
              <h3 className="text-lg font-bold text-white mb-4 font-mono flex items-center gap-2">
                <span className="text-[#4FC3F7]">02</span> Anthropic SDK
              </h3>
              <CodeBlock lang="typescript" code={`import Anthropic from "@anthropic-ai/sdk";
import { blueagentTools, blueagentExecutor } from "blueagent-sdk";

const client = new Anthropic();

const response = await client.messages.create({
  model: "claude-opus-4-7",
  max_tokens: 1024,
  tools: blueagentTools,
  messages: [{ role: "user", content: "Is this token safe to buy? 0x..." }],
});

for (const block of response.content) {
  if (block.type === "tool_use") {
    const result = await blueagentExecutor.run(block, {
      walletKey: process.env.BASE_WALLET_KEY!,
    });
    console.log(result);
  }
}`} />
            </div>

            {/* Direct HTTP */}
            <div id="http" className="mb-10 scroll-mt-24">
              <h3 className="text-lg font-bold text-white mb-4 font-mono flex items-center gap-2">
                <span className="text-[#4FC3F7]">03</span> Direct HTTP (curl)
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Step 1 — trigger the 402 to get payment details:
              </p>
              <CodeBlock lang="bash" code={`curl -X POST ${BASE_URL}/honeypot-check \\
  -H "Content-Type: application/json" \\
  -d '{"token": "0x..."}'
# → 402 Payment Required + payment details`} />
              <p className="text-slate-400 text-sm mb-4 mt-4">
                Step 2 — sign with viem and resend:
              </p>
              <CodeBlock lang="typescript" code={`import { withPaymentHeader } from "x402-fetch";
import { createWalletClient, http } from "viem";
import { base } from "viem/chains";

const wallet = createWalletClient({
  account: privateKeyToAccount(process.env.PRIVATE_KEY!),
  chain: base,
  transport: http(),
});

const secureFetch = withPaymentHeader(fetch, wallet);
const res = await secureFetch(
  "${BASE_URL}/honeypot-check",
  { method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: "0x..." }) }
);
const data = await res.json();`} />
            </div>
          </section>

          {/* Tool Reference */}
          <section id="tools" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-white mb-2 font-mono">Tool Reference</h2>
            <p className="text-slate-400 mb-10">
              All endpoints: <code className="text-[#4FC3F7] bg-[#4FC3F7]/10 px-1.5 py-0.5 rounded text-sm font-mono">POST {BASE_URL}/{"<tool-id>"}</code>
            </p>

            {CATEGORIES.map((cat) => {
              const tools = TOOLS.filter((t) => t.category === cat);
              return (
                <div key={cat} id={`cat-${cat.toLowerCase()}`} className="mb-14 scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-xl font-bold text-white font-mono">{cat}</h3>
                    <span className={`font-mono text-xs px-2 py-0.5 rounded border ${categoryColors[cat]}`}>
                      {tools.length} tools
                    </span>
                  </div>

                  <div className="space-y-6">
                    {tools.map((tool) => (
                      <div key={tool.id} className="border border-[#1A1A2E] rounded-xl overflow-hidden bg-[#0A0A12]">
                        {/* Tool header */}
                        <div className="px-5 py-4 border-b border-[#1A1A2E] flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono font-bold text-white text-sm">{tool.name}</span>
                              <span className={`font-mono text-xs px-2 py-0.5 rounded border ${categoryColors[cat]}`}>
                                {cat}
                              </span>
                            </div>
                            <p className="text-sm text-slate-400">{tool.description}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <span className="font-mono text-[#4FC3F7] font-bold text-sm">{tool.price}</span>
                            <span className="font-mono text-slate-500 text-xs">/call</span>
                          </div>
                        </div>

                        {/* Endpoint */}
                        <div className="px-5 py-3 border-b border-[#1A1A2E] bg-[#050508] flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-mono text-xs text-slate-500 shrink-0">POST</span>
                            <span className="font-mono text-xs text-[#4FC3F7] truncate">
                              {BASE_URL}/{tool.id}
                            </span>
                          </div>
                          <CopyButton text={`${BASE_URL}/${tool.id}`} />
                        </div>

                        {/* Params */}
                        <div className="px-5 py-4">
                          <p className="font-mono text-xs text-slate-600 mb-3 tracking-widest uppercase">Request body</p>
                          <div className="space-y-2">
                            {tool.params.map((param) => (
                              <div key={param.name} className="flex items-start gap-3">
                                <code className="font-mono text-sm text-[#4FC3F7] shrink-0 w-32">{param.name}</code>
                                <span className="font-mono text-xs text-slate-600 shrink-0 w-12">{param.type}</span>
                                <ParamBadge required={param.required} />
                                <span className="text-xs text-slate-400">{param.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-[#1A1A2E] flex items-center justify-between">
            <Link href="/" className="font-mono text-sm text-slate-500 hover:text-[#4FC3F7] transition-colors">
              ← Back to site
            </Link>
            <a
              href="https://github.com/madebyshun/blueagent-x402-services"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-slate-500 hover:text-[#4FC3F7] transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View source on GitHub
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
