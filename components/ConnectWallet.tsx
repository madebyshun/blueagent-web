"use client";
import { useState, useRef, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (isConnected && address) {
    return (
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 font-mono text-xs border border-[#4FC3F7]/30 bg-[#4FC3F7]/5 text-[#4FC3F7] px-3 py-1.5 rounded-lg hover:bg-[#4FC3F7]/10 transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-[#4FC3F7] animate-pulse" />
          {address.slice(0, 6)}…{address.slice(-4)}
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-1 bg-[#0D0D14] border border-[#1A1A2E] rounded-xl overflow-hidden z-50 min-w-[160px] shadow-xl">
            <div className="px-4 py-2 border-b border-[#1A1A2E]">
              <p className="font-mono text-xs text-slate-500">Connected on Base</p>
            </div>
            <button
              onClick={() => { disconnect(); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 font-mono text-xs text-slate-400 hover:text-white hover:bg-[#1A1A2E] transition-colors"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="font-mono text-xs bg-[#4FC3F7] hover:bg-[#29ABE2] text-[#050508] font-semibold px-4 py-1.5 rounded-lg transition-all"
      >
        Connect Wallet
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-[#0D0D14] border border-[#1A1A2E] rounded-xl overflow-hidden z-50 min-w-[200px] shadow-xl">
          <div className="px-4 py-2 border-b border-[#1A1A2E]">
            <p className="font-mono text-xs text-slate-500">Connect to Base Mainnet</p>
          </div>
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => { connect({ connector }); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 font-mono text-xs text-slate-300 hover:text-white hover:bg-[#1A1A2E] transition-colors flex items-center gap-2"
            >
              <span className="text-[#4FC3F7]">→</span>
              {connector.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
