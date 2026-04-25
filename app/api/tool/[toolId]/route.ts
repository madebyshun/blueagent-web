import { NextRequest, NextResponse } from "next/server";

const BASE_URL =
  "https://x402.bankr.bot/0xf31f59e7b8b58555f7871f71973a394c8f1bffe5";

type PaymentPayload = {
  x402Version: number;
  scheme: string;
  network: string;
  payload: {
    signature: string;
    authorization: {
      from: string;
      to: string;
      value: string;
      validAfter: string;
      validBefore: string;
      nonce: string;
    };
  };
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ toolId: string }> }
) {
  const { toolId } = await params;
  const body = (await req.json()) as {
    toolParams: Record<string, string>;
    payment?: PaymentPayload;
  };
  const { toolParams, payment } = body;

  const toolUrl = `${BASE_URL}/${toolId}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (payment) {
    headers["X-Payment"] = Buffer.from(JSON.stringify(payment)).toString(
      "base64"
    );
  }

  let res: Response;
  try {
    res = await fetch(toolUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(toolParams),
    });
  } catch {
    return NextResponse.json({ error: "Could not reach BlueAgent service." }, { status: 502 });
  }

  if (res.status === 402) {
    let data: unknown;
    try { data = await res.json(); } catch { data = {}; }
    return NextResponse.json({ requiresPayment: true, paymentDetails: data });
  }

  let data: unknown;
  try { data = await res.json(); } catch { data = await res.text(); }

  if (!res.ok) {
    return NextResponse.json({ error: data }, { status: res.status });
  }

  return NextResponse.json({ result: data });
}
