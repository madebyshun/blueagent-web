export type CallRecord = {
  id: string;
  toolId: string;
  toolName: string;
  category: string;
  price: string;
  priceUsd: number;
  timestamp: number;
  status: "success" | "error";
  params: Record<string, string>;
  result?: unknown;
  error?: string;
};

const KEY = "ba_call_history";

export function getHistory(): CallRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function addRecord(record: Omit<CallRecord, "id">): void {
  const history = getHistory();
  history.unshift({ ...record, id: crypto.randomUUID() });
  localStorage.setItem(KEY, JSON.stringify(history.slice(0, 500)));
}

export function clearHistory(): void {
  localStorage.removeItem(KEY);
}
