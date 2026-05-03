"use client";
import { useState } from "react";

export default function ToolRunner({ toolId, price }: { toolId: string; price: string }) {
  return (
    <div style={{ padding: "20px", background: "rgba(255,193,7,0.1)", border: "1px solid rgba(255,193,7,0.3)", borderRadius: "12px", marginTop: "20px" }}>
      <p style={{ color: "#ffc107", fontSize: "14px", margin: "0", fontWeight: "600" }}>
        🔧 Coming Soon
      </p>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", margin: "8px 0 0 0" }}>
        x402 services are being deployed. Check back soon to test {toolId} tool.
      </p>
    </div>
  );
}
