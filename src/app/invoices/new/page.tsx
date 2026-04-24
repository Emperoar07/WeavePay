"use client";

import dynamic from "next/dynamic";
import { Copy } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { createPublicClient, defineChain, http, isAddress } from "viem";
import { AppNav } from "@/components/app-nav";
import { appConfig, weavePayAbi } from "@/lib/weavepay";

const CreateInvoiceAction = dynamic(
  () => import("@/components/initia-actions").then((mod) => mod.CreateInvoiceAction),
  {
    ssr: false,
    loading: () => <div className="h-12 w-full rounded-full bg-[var(--ink)]" />,
  },
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
      const count = await client.readContract({
        address: addr as `0x${string}`,
        abi: weavePayAbi,
        functionName: "invoiceCount",
      });
      setMintedId(count.toString());
    } catch {
      // keep preview stable
    }
  }, []);

  const copyLink = useCallback(() => {
    if (typeof navigator === "undefined") return;
    navigator.clipboard?.writeText(checkoutUrl);
  }, [checkoutUrl]);

  return (
    <main className="page-shell">
      <div className="content-shell pt-8">
        <div className="page-label">Create invoice · /invoices/new</div>
      </div>

      <AppNav />

      <section className="content-shell pt-7 pb-10">
        <div className="grid grid-cols-2 gap-4">
          {/* Form */}
          <div className="section-card p-9">
            <div className="kicker">
              <span className="kicker-dot" />
              Merchant action
            </div>
            <h1 className="serif-display mt-5 text-[32px]">Create invoice</h1>
            <p className="mt-3 max-w-[38ch] text-[14px] text-[var(--ink-soft)]">
              Generate a payment request, mint it on the rollup, and immediately share the buyer link.
            </p>
            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="eyebrow">Merchant EVM address</span>
                <input className="field-input mt-3" value={merchant} onChange={(e) => setMerchant(e.target.value)} />
              </label>
              <label className="block">
                <span className="eyebrow">Amount in GAS</span>
                <input className="field-input mt-3" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </label>
              <label className="block">
                <span className="eyebrow">Description</span>
                <textarea
                  className="field-input mt-3 min-h-[100px] resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <CreateInvoiceAction amount={amount} merchant={merchant} metadataURI={metadataURI} onSuccess={handleSuccess} />
            </div>
          </div>

          {/* Preview */}
          <div className="ink-card relative overflow-hidden p-9">
            <div className="pointer-events-none absolute right-[-60px] top-[-60px] h-60 w-60 bg-[radial-gradient(circle,var(--rust),transparent_70%)] opacity-40" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-[#a29682]">Buyer experience</p>
                  <h2 className="serif-display mt-3 text-[26px]">Checkout preview</h2>
                </div>
                <div className="serif-display rounded-full bg-white/10 px-4 py-2 text-[15px]">WP {displayId}</div>
              </div>
              <div className="mt-8 rounded-[16px] bg-[var(--paper-soft)] p-7 text-[var(--ink)]">
                <p className="eyebrow">Amount due</p>
                <p className="serif-display mt-2 text-[64px] leading-none">{amount || "0"} GAS</p>
                <p className="mt-4 text-[14px] text-[var(--ink-soft)]">{description}</p>
                <div className="mt-6 flex items-center justify-between gap-3 rounded-[12px] border border-dashed border-[var(--line-strong)] bg-[var(--paper)] px-4 py-4 text-[13px] font-bold">
                  <span className="min-w-0 flex-1 break-all">{checkoutUrl}</span>
                  <button className="bg-transparent p-0" onClick={copyLink} title="Copy checkout link" type="button">
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
