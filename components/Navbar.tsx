"use client";
import { useState } from "react";
import ConnectWallet from "./ConnectWallet";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1A1A2E] bg-[#050508]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="glow-dot" />
            <span className="font-mono font-semibold text-white tracking-widest text-sm">
              BLUE<span className="text-[#4FC3F7]">AGENT</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["How it Works", "Tools", "Integrations", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-slate-400 hover:text-[#4FC3F7] transition-colors font-mono"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/madebyshun/blueagent-x402-services"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono text-slate-400 hover:text-white transition-colors border border-[#1A1A2E] px-3 py-1.5 rounded hover:border-[#4FC3F7]/30"
            >
              GitHub
            </a>
            <ConnectWallet />
          </div>

          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#1A1A2E] bg-[#050508]/95 px-4 py-4 flex flex-col gap-4">
          {["How it Works", "Tools", "Integrations", "Pricing"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-slate-400 hover:text-[#4FC3F7] font-mono"
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
          <ConnectWallet />
        </div>
      )}
    </nav>
  );
}
