"use client";
import { useState, useRef, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import Link from "next/link";

function WalletIcon({ name }: { name: string }) {
  if (name.toLowerCase().includes("coinbase"))
    return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>;
  if (name.toLowerCase().includes("metamask"))
    return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;
  return <span className="text-[#4FC3F7]">→</span>;
}

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
          <div className="absolute right-0 top-full mt-1 bg-[#0D0D14] border border-[#1A1A2E] rounded-xl overflow-hidden z-50 min-w-[180px] shadow-xl">
            <div className="px-4 py-2 border-b border-[#1A1A2E]">
              <p className="font-mono text-xs text-slate-500">Connected · Base</p>
              <p className="font-mono text-xs text-slate-400 mt-0.5">{address.slice(0, 8)}…{address.slice(-6)}</p>
            </div>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="w-full text-left px-4 py-2.5 font-mono text-xs text-slate-400 hover:text-white hover:bg-[#1A1A2E] transition-colors flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h8M4 18h8"/>
              </svg>
              Dashboard
            </Link>
            <button
              onClick={() => { disconnect(); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 font-mono text-xs text-red-400 hover:text-red-300 hover:bg-[#1A1A2E] transition-colors"
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
        <div className="absolute right-0 top-full mt-1 bg-[#0D0D14] border border-[#1A1A2E] rounded-xl overflow-hidden z-50 min-w-[220px] shadow-xl">
          <div className="px-4 py-2.5 border-b border-[#1A1A2E]">
            <p className="font-mono text-xs text-slate-400 font-semibold">Connect to Base</p>
            <p className="font-mono text-[10px] text-slate-600 mt-0.5">EOA wallet required for x402 payments</p>
          </div>
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => { connect({ connector }); setOpen(false); }}
              className="w-full text-left px-4 py-3 font-mono text-xs text-slate-300 hover:text-white hover:bg-[#1A1A2E] transition-colors flex items-center gap-2.5 border-b border-[#1A1A2E]/50 last:border-0"
            >
              <WalletIcon name={connector.name} />
              {connector.name}
            </button>
          ))}
          <div className="px-4 py-2.5 border-t border-[#1A1A2E]">
            <p className="font-mono text-[10px] text-slate-700 leading-relaxed">
              On mobile? Open in{" "}
              <a
                href="https://metamask.app.link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-[#4FC3F7]"
              >
                MetaMask browser
              </a>
              {" "}or use Coinbase Wallet app.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
