import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "BlueAgent — Security OS for Autonomous Agents on Base",
  description:
    "BlueAgent is the Security OS for autonomous AI agents operating on Base. Pay-per-call security tools via x402 protocol — no API keys, no subscriptions.",
  keywords: ["BlueAgent", "AI agents", "security", "Base", "x402", "blockchain", "autonomous agents"],
  openGraph: {
    title: "BlueAgent — Security OS for Autonomous Agents on Base",
    description:
      "31 security tools for AI agents. Pay per call in USDC on Base via x402 protocol.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueAgent — Security OS for Autonomous Agents on Base",
    description: "31 security tools for AI agents. Pay per call in USDC on Base.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
