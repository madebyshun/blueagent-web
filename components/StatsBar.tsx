const STATS = [
  { value: "31",      label: "tools"        },
  { value: "$0.05",   label: "min per call" },
  { value: "USDC",    label: "on Base"      },
  { value: "x402",    label: "protocol"     },
  { value: "<200ms",  label: "response"     },
];

export function StatsBar() {
  return (
    <div className="border-b border-[#1A1A2E] bg-[#080810]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center sm:justify-between flex-wrap gap-0 divide-x divide-[#1A1A2E]">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-5 sm:px-8 py-3"
            >
              <span className="font-mono text-sm font-bold text-white">{value}</span>
              <span className="font-mono text-xs text-slate-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
