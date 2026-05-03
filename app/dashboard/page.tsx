"use client";
import { useState, useEffect, useCallback } from "react";
import { useAccount, useBalance } from "wagmi";
import Link from "next/link";
import ConnectWallet from "@/components/ConnectWallet";
import { getHistory, clearHistory, CallRecord } from "@/lib/call-history";

const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const;

type View = "overview" | "history" | "alerts";

const categoryColors: Record<string, string> = {
  Security:  "text-[#4FC3F7] bg-[#4FC3F7]/10 border-[#4FC3F7]/20",
  Quantum:   "text-[#A78BFA] bg-[#A78BFA]/10 border-[#A78BFA]/20",
  Research:  "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Analytics: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  Portfolio: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Alerts:    "text-pink-400 bg-pink-400/10 border-pink-400/20",
};

function fmt(n: number) {
  return `$${n.toFixed(4)}`;
}

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

function getDailySpend(history: CallRecord[], days = 14) {
  const now = Date.now();
  return Array.from({ length: days }, (_, i) => {
    const start = now - (days - 1 - i) * 86400000;
    const end = start + 86400000;
    const amount = history
      .filter((r) => r.status === "success" && r.timestamp >= start && r.timestamp < end)
      .reduce((s, r) => s + r.priceUsd, 0);
    return {
      date: new Date(start).toLocaleDateString("en", { month: "short", day: "numeric" }),
      amount,
    };
  });
}

function getTopTools(history: CallRecord[], n = 5) {
  const map: Record<string, { name: string; count: number; spent: number }> = {};
  for (const r of history) {
    if (!map[r.toolId]) map[r.toolId] = { name: r.toolName, count: 0, spent: 0 };
    map[r.toolId].count++;
    if (r.status === "success") map[r.toolId].spent += r.priceUsd;
  }
  return Object.entries(map)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, n)
    .map(([id, d]) => ({ id, ...d }));
}

// ── Sub-views ──────────────────────────────────────────────────────────────────

function OverviewView({ history, usdcBalance }: { history: CallRecord[]; usdcBalance: string }) {
  const successHistory = history.filter((r) => r.status === "success");
  const totalSpent = successHistory.reduce((s, r) => s + r.priceUsd, 0);
  const totalCalls = history.length;
  const avgCost = totalCalls > 0 ? totalSpent / successHistory.length || 0 : 0;
  const daily = getDailySpend(history);
  const maxDaily = Math.max(...daily.map((d) => d.amount), 0.001);
  const topTools = getTopTools(history);
  const maxCount = topTools[0]?.count ?? 1;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-mono">Overview</h1>
        <p className="text-slate-500 font-mono text-sm mt-1">Usage stats and USDC breakdown</p>
      </div>

      {/* Balance hero */}
      <div className="rounded-2xl border border-[#1A1A2E] bg-gradient-to-br from-[#0D1A12] to-[#080810] p-6">
        <p className="font-mono text-xs text-slate-500 tracking-widest mb-2">USDC BALANCE · BASE</p>
        <div className="flex items-end gap-4">
          <span className="font-mono text-4xl font-bold text-emerald-400">{usdcBalance}</span>
          <span className="font-mono text-slate-500 text-sm mb-1">available to spend</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "TOTAL SPENT",  value: fmt(totalSpent),         sub: `${successHistory.length} successful calls` },
          { label: "TOTAL CALLS",  value: totalCalls.toString(),    sub: `${history.filter(r=>r.status==="error").length} errors` },
          { label: "AVG COST/CALL", value: fmt(avgCost),           sub: "per successful call" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-[#1A1A2E] bg-[#0D0D14] p-5">
            <p className="font-mono text-xs text-slate-600 tracking-widest mb-2">{s.label}</p>
            <p className="font-mono text-2xl font-bold text-[#4FC3F7]">{s.value}</p>
            <p className="font-mono text-xs text-slate-600 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Daily spend chart */}
      <div className="rounded-xl border border-[#1A1A2E] bg-[#0D0D14] p-5">
        <p className="font-mono text-xs text-slate-600 tracking-widest mb-4">DAILY SPEND · LAST 14 DAYS</p>
        {totalCalls === 0 ? (
          <div className="h-32 flex items-center justify-center text-slate-600 font-mono text-xs">
            No calls yet — run a tool to see your spend chart
          </div>
        ) : (
          <div className="flex items-end gap-1 h-32">
            {daily.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
                <div
                  className="w-full bg-[#4FC3F7]/50 hover:bg-[#4FC3F7]/80 rounded-t transition-all group relative"
                  style={{ height: `${Math.max((d.amount / maxDaily) * 100, d.amount > 0 ? 4 : 1)}%` }}
                >
                  {d.amount > 0 && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#0D0D14] border border-[#1A1A2E] rounded px-1.5 py-0.5 font-mono text-[9px] text-[#4FC3F7] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {fmt(d.amount)}
                    </div>
                  )}
                </div>
                {i % 3 === 0 && (
                  <span className="font-mono text-[9px] text-slate-700">{d.date}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top tools */}
      <div className="rounded-xl border border-[#1A1A2E] bg-[#0D0D14] p-5">
        <p className="font-mono text-xs text-slate-600 tracking-widest mb-4">TOP TOOLS BY USAGE</p>
        {topTools.length === 0 ? (
          <p className="text-slate-600 font-mono text-xs">No tool calls recorded yet.</p>
        ) : (
          <div className="space-y-4">
            {topTools.map((t) => (
              <div key={t.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-sm text-slate-300">{t.name}</span>
                  <span className="font-mono text-xs text-slate-500">{t.count} calls · {fmt(t.spent)}</span>
                </div>
                <div className="h-1.5 bg-[#1A1A2E] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4FC3F7] rounded-full transition-all"
                    style={{ width: `${(t.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function HistoryView({ history, onClear }: { history: CallRecord[]; onClear: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono">Call History</h1>
          <p className="text-slate-500 font-mono text-sm mt-1">{history.length} records stored locally</p>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="font-mono text-xs text-slate-600 hover:text-red-400 transition-colors border border-[#1A1A2E] hover:border-red-500/30 px-3 py-1.5 rounded-lg"
          >
            Clear all
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#1A1A2E] p-16 text-center">
          <p className="font-mono text-slate-600 text-sm mb-2">No calls recorded yet.</p>
          <Link href="/#tools" className="font-mono text-xs text-[#4FC3F7] hover:underline">
            → Go to Tools to make your first call
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {history.map((r) => (
            <div key={r.id} className="rounded-xl border border-[#1A1A2E] bg-[#0D0D14] overflow-hidden">
              <button
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[#1A1A2E]/30 transition-colors"
                onClick={() => setExpanded(expanded === r.id ? null : r.id)}
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${r.status === "success" ? "bg-emerald-400" : "bg-red-400"}`} />
                <span className="font-mono text-sm text-white flex-1 truncate">{r.toolName}</span>
                {r.category && (
                  <span className={`font-mono text-xs px-2 py-0.5 rounded border shrink-0 hidden sm:inline ${categoryColors[r.category] ?? "text-slate-400 bg-slate-400/10 border-slate-400/20"}`}>
                    {r.category}
                  </span>
                )}
                <span className="font-mono text-xs text-[#4FC3F7] shrink-0">
                  {r.status === "success" ? r.price : "—"}
                </span>
                <span className="font-mono text-xs text-slate-600 shrink-0">{timeAgo(r.timestamp)}</span>
                <svg className={`w-4 h-4 text-slate-600 transition-transform shrink-0 ${expanded === r.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expanded === r.id && (
                <div className="px-5 pb-4 border-t border-[#1A1A2E] space-y-3">
                  <div className="pt-3">
                    <p className="font-mono text-xs text-slate-600 mb-2 tracking-widest">PARAMS</p>
                    <pre className="font-mono text-xs text-slate-400 bg-[#050508] rounded-lg p-3 overflow-x-auto">
                      {JSON.stringify(r.params, null, 2)}
                    </pre>
                  </div>
                  {r.result != null && (
                    <div>
                      <p className="font-mono text-xs text-slate-600 mb-2 tracking-widest">RESULT</p>
                      <pre className="font-mono text-xs text-slate-300 bg-[#050508] rounded-lg p-3 overflow-x-auto max-h-48">
                        {JSON.stringify(r.result, null, 2)}
                      </pre>
                    </div>
                  )}
                  {r.error && (
                    <div>
                      <p className="font-mono text-xs text-red-500 mb-2 tracking-widest">ERROR</p>
                      <p className="font-mono text-xs text-red-400 bg-red-500/10 rounded-lg p-3">{r.error}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AlertsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-mono">Alerts</h1>
        <p className="text-slate-500 font-mono text-sm mt-1">Webhook subscriptions for whale and risk events</p>
      </div>
      <div className="rounded-xl border border-dashed border-[#1A1A2E] p-16 text-center">
        <p className="font-mono text-slate-600 text-sm mb-2">Alert dashboard coming soon.</p>
        <p className="font-mono text-xs text-slate-700 max-w-sm mx-auto">
          Subscribe to alerts via the <code className="text-slate-500">alert-subscribe</code> tool,
          then manage your webhooks here.
        </p>
        <Link href="/#tools" className="inline-block mt-4 font-mono text-xs text-[#4FC3F7] hover:underline">
          → Set up alerts in Tools
        </Link>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

const NAV: { id: View; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "history",  label: "Call History" },
  { id: "alerts",   label: "Alerts" },
];

const NAV_ICONS: Record<View, React.ReactNode> = {
  overview: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h8M4 18h8" />
    </svg>
  ),
  history: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  alerts: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
};

export default function DashboardPage() {
  const [view, setView] = useState<View>("overview");
  const [history, setHistory] = useState<CallRecord[]>([]);
  const { address, isConnected } = useAccount();

  const { data: balanceData } = useBalance({
    address,
    token: USDC_BASE,
    chainId: 8453,
  });

  const usdcBalance = balanceData
    ? `$${parseFloat(balanceData.formatted).toFixed(2)} USDC`
    : "—";

  const reload = useCallback(() => setHistory(getHistory()), []);

  useEffect(() => {
    reload();
    const onStorage = () => reload();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [reload]);

  const handleClear = () => {
    clearHistory();
    reload();
  };

  return (
    <div className="min-h-screen bg-[#080810] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-[#1A1A2E] bg-[#0A0A12] min-h-screen fixed top-16 bottom-0">
        <div className="flex flex-col flex-1 p-4 overflow-y-auto">
          {/* User section */}
          <div className="mb-6 pb-5 border-b border-[#1A1A2E]">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-400 shadow-[0_0_6px_#34d399]" : "bg-slate-600"}`} />
              <span className="font-mono text-xs text-slate-500">{isConnected ? "Connected" : "Not connected"}</span>
            </div>
            {address && (
              <p className="font-mono text-xs text-slate-400 truncate mb-3">
                {address.slice(0, 6)}…{address.slice(-4)}
              </p>
            )}
            <ConnectWallet />
          </div>

          {/* Nav */}
          <p className="font-mono text-xs text-slate-700 tracking-widest mb-3">DASHBOARD</p>
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-mono text-sm transition-all text-left ${
                  view === item.id
                    ? "bg-[#4FC3F7]/10 text-[#4FC3F7] border border-[#4FC3F7]/20"
                    : "text-slate-400 hover:text-white hover:bg-[#1A1A2E]/50"
                }`}
              >
                {NAV_ICONS[item.id]}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-[#1A1A2E] space-y-2">
            <Link href="/#tools" className="flex items-center gap-2 font-mono text-xs text-slate-600 hover:text-[#4FC3F7] transition-colors px-3 py-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Tools
            </Link>
            <Link href="/" className="flex items-center gap-2 font-mono text-xs text-slate-600 hover:text-[#4FC3F7] transition-colors px-3 py-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to site
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile tab bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[#1A1A2E] bg-[#0A0A12]/95 backdrop-blur-xl flex">
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 font-mono text-xs transition-colors ${
              view === item.id ? "text-[#4FC3F7]" : "text-slate-600"
            }`}
          >
            {NAV_ICONS[item.id]}
            {item.label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-56 px-4 sm:px-6 lg:px-10 py-8 pb-24 lg:pb-8 max-w-4xl">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
            <div className="w-16 h-16 rounded-full border border-[#1A1A2E] bg-[#0D0D14] flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-slate-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-mono mb-2">Connect your wallet</h2>
              <p className="text-slate-500 font-mono text-sm">Connect a Base wallet to view your dashboard</p>
            </div>
            <ConnectWallet />
          </div>
        ) : (
          <>
            {view === "overview" && <OverviewView history={history} usdcBalance={usdcBalance} />}
            {view === "history"  && <HistoryView history={history} onClear={handleClear} />}
            {view === "alerts"   && <AlertsView />}
          </>
        )}
      </main>
    </div>
  );
}
