import { NextResponse } from "next/server";

const BASE_URL =
  "https://x402.bankr.bot/0xf31f59e7b8b58555f7871f71973a394c8f1bffe5";

export async function GET() {
  const toolId = "honeypot-check";
  const toolUrl = `${BASE_URL}/${toolId}`;

  let res: Response;
  try {
    res = await fetch(toolUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contract: "0x0000000000000000000000000000000000000001" }),
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 502 });
  }

  const status = res.status;
  let body: unknown;
  try { body = await res.json(); } catch { body = await res.text(); }

  return NextResponse.json({ status, body }, { status: 200 });
}
