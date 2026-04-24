"use client";

import dynamic from "next/dynamic";
import { Copy } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { createPublicClient, defineChain, http, isAddress } from "viem";
import { AppNav } from "@/components/app-nav";
import { appConfig, weavePayAbi } from "@/lib/weavepay";

const CreateInvoiceAction = dynamic(
  () => import("@/components/initia-actions").then((mod) => mod.CreateInvoiceAction),
  { ssr: false, loading: () => <div style={{ height: 52, borderRadius: 14, background: "var(--ink)" }} /> },
);

const readChain = defineChain({
  id: 1421,
  name: "WeavePay",
  nativeCurrency: { name: "WeavePay Gas", symbol: "GAS", decimals: 18 },
  rpcUrls: { default: { http: [appConfig.jsonRpcUrl] } },
});

export default function NewInvoicePage() {
  const [amount, setAmount] = useState("25");
  const [merchant, setMerchant] = useState("0x0000000000000000000000000000000000000000");
  const [description, setDescription] = useState("Payment for Lagos Merchants");
  const [mintedId, setMintedId] = useState<string | null>(null);

  const metadataURI = useMemo(
    () => `data:application/json,${encodeURIComponent(JSON.stringify({ description }))}`,
    [description],
  );

  const displayId = mintedId ?? "1041";
  const checkoutPath = `/checkout/${displayId}`;
  const checkoutUrl = typeof window !== "undefined"
    ? `${window.location.host}${checkoutPath}`
    : `weave-pay.vercel.app${checkoutPath}`;

  const handleSuccess = useCallback(async () => {
    const addr = appConfig.contractAddress;
    if (!addr || !isAddress(addr)) return;
    try {
      const client = createPublicClient({ chain: readChain, transport: http(appConfig.jsonRpcUrl) });
      const count = await client.readContract({ address: addr as `0x${string}`, abi: weavePayAbi, functionName: "invoiceCount" });
      setMintedId(count.toString());
    } catch { /* keep preview stable */ }
  }, []);

  const copyLink = useCallback(() => {
    if (typeof navigator === "undefined") return;
    navigator.clipboard?.writeText(checkoutUrl);
  }, [checkoutUrl]);

  return (
    <main className="page-shell">
      <div className="wrap">
        <AppNav />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 28 }}>
          {/* Form */}
          <div style={{ border: "1px solid var(--line)", borderRadius: 20, background: "var(--paper-soft)", padding: 36 }}>
            <div className="kicker"><span className="kicker-dot" />Merchant action</div>
            <h1 className="serif" style={{ fontSize: 32, marginTop: 16 }}>Create invoice</h1>
            <p style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 8, maxWidth: "38ch" }}>
              Generate a payment request, mint it on the rollup, and immediately share the buyer link.
            </p>
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label className="field-label">Merchant EVM address</label>
                <input className="field-input" value={merchant} onChange={(e) => setMerchant(e.target.value)} />
              </div>
              <div>
                <label className="field-label">Amount in GAS</label>
                <input className="field-input" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
              <div>
                <label className="field-label">Description</label>
                <textarea className="field-textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <CreateInvoiceAction amount={amount} merchant={merchant} metadataURI={metadataURI} onSuccess={handleSuccess} />
            </div>
          </div>

          {/* Dark preview */}
          <div style={{ borderRadius: 20, background: "var(--ink)", color: "var(--paper-soft)", padding: 36, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, background: "radial-gradient(circle,var(--rust),transparent 70%)", opacity: 0.4, pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 28 }}>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#A29682" }}>Buyer experience</p>
                  <h2 className="serif" style={{ fontSize: 26, marginTop: 6 }}>Checkout preview</h2>
                </div>
                <span className="serif" style={{ fontSize: 15, padding: "8px 16px", background: "rgba(255,255,255,0.08)", borderRadius: 999, whiteSpace: "nowrap" }}>WP {displayId}</span>
              </div>
              <div style={{ background: "var(--paper-soft)", color: "var(--ink)", padding: 28, borderRadius: 16 }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>Amount due</p>
                <p className="serif" style={{ fontSize: 64, letterSpacing: "-0.03em", lineHeight: 1, marginTop: 4 }}>{amount || "0"} GAS</p>
                <p style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 12 }}>{description}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 20, padding: "14px 16px", border: "1px dashed var(--line-strong)", borderRadius: 12, background: "var(--paper)", fontSize: 13, fontWeight: 700, wordBreak: "break-all" }}>
                  <span style={{ minWidth: 0, flex: 1 }}>{checkoutUrl}</span>
                  <button onClick={copyLink} title="Copy" type="button" style={{ background: "transparent", border: "none", padding: 0, opacity: 0.6 }}>
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
