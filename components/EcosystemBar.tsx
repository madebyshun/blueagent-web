const ECOSYSTEM = [
  { name: "Base",      label: "L2 Network"    },
  { name: "x402",     label: "Pay Protocol"  },
  { name: "Coinbase",  label: "Wallet"        },
  { name: "Claude",    label: "AI Model"      },
  { name: "Cursor",    label: "IDE"           },
  { name: "AgentKit",  label: "SDK"           },
  { name: "Viem",      label: "EVM Client"    },
  { name: "Wagmi",     label: "React Hooks"   },
  { name: "Anthropic", label: "API"           },
  { name: "USDC",      label: "Stablecoin"    },
  { name: "Bankr",     label: "Infra"         },
  { name: "Vercel",    label: "Deploy"        },
];

// Duplicate for seamless loop
const ITEMS = [...ECOSYSTEM, ...ECOSYSTEM];

export function EcosystemBar() {
  return (
    <div className="border-y border-[#1A1A2E] bg-[#080810] py-4 overflow-hidden">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee 28s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="flex marquee-track w-max gap-0">
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-6 px-8 border-r border-[#1A1A2E] last:border-r-0"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] opacity-60" />
              <span className="font-mono text-sm font-semibold text-white whitespace-nowrap">
                {item.name}
              </span>
              <span className="font-mono text-xs text-slate-600 whitespace-nowrap">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
