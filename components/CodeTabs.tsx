"use client";
import { useState } from "react";

type Tab = "MCP" | "SDK" | "AgentKit" | "Direct x402";

const CODE: Record<Tab, { lang: string; code: string }> = {
  MCP: {
    lang: "bash",
    code: `# Add BlueAgent MCP server to Claude Code
claude mcp add blueagent npx blueagent-mcp

# Or add to .claude/mcp.json
{
  "mcpServers": {
    "blueagent": {
      "command": "npx",
      "args": ["blueagent-mcp"],
      "env": {
        "BASE_WALLET_KEY": "\${BASE_WALLET_KEY}"
      }
    }
  }
}

# Your agent can now call tools directly:
# "Screen this address for OFAC sanctions"
# → Claude calls address-screener, pays $0.001 USDC`,
  },
  SDK: {
    lang: "typescript",
    code: `import Anthropic from "@anthropic-ai/sdk";
import { blueagentTools, blueagentExecutor } from "blueagent-sdk";

const client = new Anthropic();

const response = await client.messages.create({
  model: "claude-opus-4-7",
  max_tokens: 1024,
  tools: blueagentTools,           // 31 pre-built tool defs
  messages: [{
    role: "user",
    content: "Simulate this transaction before I sign: 0xabc..."
  }]
});

// Execute tool calls with auto x402 payment
for (const block of response.content) {
  if (block.type === "tool_use") {
    const result = await blueagentExecutor.run(block, {
      walletKey: process.env.BASE_WALLET_KEY!
    });
    console.log(result); // { safe: true, risk: 0.02, ... }
  }
}`,
  },
  AgentKit: {
    lang: "typescript",
    code: `import { AgentKit } from "@coinbase/agentkit";
import { blueagentActions } from "blueagent-agentkit";

const agent = new AgentKit({
  walletData: process.env.CDP_WALLET_DATA,
  networkId: "base-mainnet",
});

// Register all BlueAgent security actions
agent.addActions(blueagentActions);

// Agent can now autonomously:
// - Screen wallet addresses before transfers
// - Simulate transactions before signing
// - Audit token contracts before swapping
// - Check DeFi protocol risk before depositing

const result = await agent.run(
  "Check if this token is a honeypot before buying: 0x..."
);`,
  },
  "Direct x402": {
    lang: "typescript",
    code: `import { withPaymentHeader } from "x402-fetch";
import { createWalletClient, http } from "viem";
import { base } from "viem/chains";

const wallet = createWalletClient({
  account: privateKeyToAccount(process.env.PRIVATE_KEY),
  chain: base,
  transport: http(),
});

// Wrap fetch with automatic x402 payment
const secureFetch = withPaymentHeader(fetch, wallet);

// Call any BlueAgent tool directly
const response = await secureFetch(
  "https://api.blueagent.xyz/v1/address-screener",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
    })
  }
);

const { risk_score, sanctions_hit, labels } = await response.json();
// { risk_score: 0.02, sanctions_hit: false, labels: ["known-wallet"] }`,
  },
};

const TAB_ORDER: Tab[] = ["MCP", "SDK", "AgentKit", "Direct x402"];

function highlight(code: string, lang: string): React.ReactNode[] {
  const lines = code.split("\n");
  return lines.map((line, i) => {
    let cls = "text-slate-300";
    if (lang === "bash") {
      if (line.trim().startsWith("#")) cls = "text-slate-500";
      else if (line.trim().startsWith("claude") || line.trim().startsWith("npx")) cls = "text-[#4FC3F7]";
      else if (line.includes('"') || line.includes("'")) cls = "text-emerald-400";
      else cls = "text-slate-200";
    } else {
      if (line.trim().startsWith("//") || line.trim().startsWith("#")) cls = "text-slate-500";
      else if (line.includes("import ") || line.includes("from ")) cls = "text-[#A78BFA]";
      else if (line.includes("const ") || line.includes("await ") || line.includes("async ")) cls = "text-[#4FC3F7]";
      else if (line.includes('"') && !line.trim().startsWith("//")) cls = "text-emerald-400";
    }
    return (
      <div key={i} className={`${cls} leading-6`}>
        {line || " "}
      </div>
    );
  });
}

export function CodeTabs() {
  const [active, setActive] = useState<Tab>("MCP");
  const { lang, code } = CODE[active];

  return (
    <section id="code-examples" className="py-24 sm:py-32 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 border border-[#1A1A2E] rounded-full px-4 py-1.5 mb-6">
            <span className="font-mono text-xs text-slate-500 tracking-widest">CODE EXAMPLES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Integrate in minutes
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Pick your integration style — from zero-config MCP to raw x402 HTTP calls.
          </p>
        </div>

        {/* Code window */}
        <div className="card-surface rounded-2xl overflow-hidden border border-[#1A1A2E]">
          {/* Window chrome */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1A1A2E] bg-[#0A0A12]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            {/* Tabs */}
            <div className="flex gap-1">
              {TAB_ORDER.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`font-mono text-xs px-3 py-1 rounded transition-all ${
                    active === tab
                      ? "bg-[#4FC3F7]/10 text-[#4FC3F7] border border-[#4FC3F7]/30"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="font-mono text-xs text-slate-600">
              {lang === "bash" ? "bash" : lang === "typescript" ? "TypeScript" : lang}
            </div>
          </div>

          {/* Code body */}
          <div className="p-6 overflow-x-auto">
            <pre className="font-mono text-sm">
              <code>{highlight(code, lang)}</code>
            </pre>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://github.com/madebyshun/blueagent-x402-services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-slate-400 hover:text-[#4FC3F7] transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View full source on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
