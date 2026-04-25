const integrations = [
  {
    name: "Claude Code",
    logo: "CC",
    description:
      "Add BlueAgent as an MCP server in Claude Code. Your Claude agent automatically pays per security check using your Base wallet — no config beyond one line.",
    tag: "MCP Server",
    color: "blue",
    example: "claude mcp add blueagent npx blueagent-mcp",
  },
  {
    name: "Cursor",
    logo: "CR",
    description:
      "Configure BlueAgent in Cursor's MCP settings. Security tools appear as native Cursor tools your coding agent can call inline during development.",
    tag: "MCP Server",
    color: "purple",
    example: '{ "mcpServers": { "blueagent": { ... } } }',
  },
  {
    name: "AgentKit",
    logo: "AK",
    description:
      "Wrap BlueAgent tools as AgentKit actions. Full Base wallet integration — your Coinbase AgentKit agent funds security checks from its own wallet.",
    tag: "SDK Action",
    color: "blue",
    example: "agent.addAction(blueagentActions)",
  },
  {
    name: "Anthropic SDK",
    logo: "AS",
    description:
      "Import BlueAgent as a tool definition in the Anthropic SDK. Claude calls security tools with automatic x402 payment headers attached.",
    tag: "Tool Definition",
    color: "purple",
    example: "tools: [...blueagentTools]",
  },
  {
    name: "Direct x402",
    logo: "x4",
    description:
      "Call BlueAgent APIs directly via HTTP with x402 payment headers. Any agent, any stack — as long as you can make HTTP requests and hold USDC on Base.",
    tag: "HTTP + x402",
    color: "blue",
    example: "Payment: x402 USDC:base:...",
  },
];

const colorMap: Record<string, { tag: string; accent: string; border: string; bg: string; logo: string }> = {
  blue: {
    tag: "text-[#4FC3F7] bg-[#4FC3F7]/10 border-[#4FC3F7]/20",
    accent: "text-[#4FC3F7]",
    border: "border-[#4FC3F7]/20 hover:border-[#4FC3F7]/40",
    bg: "bg-[#4FC3F7]/5",
    logo: "bg-[#4FC3F7]/10 text-[#4FC3F7]",
  },
  purple: {
    tag: "text-[#A78BFA] bg-[#A78BFA]/10 border-[#A78BFA]/20",
    accent: "text-[#A78BFA]",
    border: "border-[#A78BFA]/20 hover:border-[#A78BFA]/40",
    bg: "bg-[#A78BFA]/5",
    logo: "bg-[#A78BFA]/10 text-[#A78BFA]",
  },
};

export function Integrations() {
  return (
    <section id="integrations" className="py-24 sm:py-32 relative">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080810] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-[#1A1A2E] rounded-full px-4 py-1.5 mb-6">
            <span className="font-mono text-xs text-slate-500 tracking-widest">INTEGRATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Works with your stack
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            BlueAgent plugs into the tools you already use — from Claude Code and Cursor to custom SDKs and raw HTTP.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => {
            const c = colorMap[integration.color];
            return (
              <div
                key={integration.name}
                className={`card-surface rounded-2xl p-6 border transition-all duration-300 card-hover ${c.border}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm ${c.logo}`}>
                    {integration.logo}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{integration.name}</div>
                    <span className={`font-mono text-xs px-2 py-0.5 rounded border ${c.tag}`}>
                      {integration.tag}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-4">{integration.description}</p>

                <div className={`rounded-lg px-3 py-2 ${c.bg} border border-[#1A1A2E]`}>
                  <code className={`font-mono text-xs ${c.accent}`}>{integration.example}</code>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
