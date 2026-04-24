"use client";

import dynamic from "next/dynamic";
import { Copy, ReceiptText } from "lucide-react";
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
    ? `${window.location.origin}${checkoutPath}`
    : `https://weave-pay.vercel.app${checkoutPath}`;

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
      // Leave preview visible even if the readback fails.
    }
  }, []);

  const copyLink = useCallback(() => {
    if (typeof navigator === "undefined") return;
    navigator.clipboard?.writeText(checkoutUrl);
  }, [checkoutUrl]);

  return (
    <main className="page-shell">
      <AppNav />

      <section className="content-shell pb-10 pt-6">
        <div className="grid gap-4 lg:grid-cols-[0.96fr_1.04fr]">
          <div className="section-card p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Merchant action</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Create invoice</h1>
                <p className="mt-3 text-sm font-medium leading-6 text-[var(--muted)]">
                  Generate a payment request, mint it on the rollup, and immediately share the buyer link.
                </p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--paper)] text-[var(--green)]">
                <ReceiptText size={22} />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="eyebrow">Merchant EVM address</span>
                <input
                  className="field-input mt-2"
                  value={merchant}
                  onChange={(event) => setMerchant(event.target.value)}
                />
              </label>

              <label className="block">
                <span className="eyebrow">Amount in GAS</span>
                <input
                  className="field-input mt-2"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
              </label>

              <label className="block">
                <span className="eyebrow">Description</span>
                <textarea
                  className="field-input mt-2 min-h-32 resize-none"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </label>

              <CreateInvoiceAction
                amount={amount}
                merchant={merchant}
                metadataURI={metadataURI}
                onSuccess={handleSuccess}
              />
            </div>
          </div>

          <div className="ink-card p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="eyebrow text-white/55">Buyer experience</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">Checkout preview</h2>
                <p className="mt-3 text-sm font-medium leading-6 text-white/68">
                  {mintedId ? "Invoice minted on the WeavePay rollup." : "Preview the payment link before sharing it."}
                </p>
              </div>
              <div className="rounded-full bg-white/10 px-3 py-2 text-sm font-black">
                Invoice WP {displayId}
              </div>
            </div>

            <div className="mt-6 rounded-[1.2rem] bg-white p-5 text-[var(--ink)]">
              <p className="eyebrow">Amount due</p>
              <p className="mt-2 text-5xl font-black tracking-tight">{amount || "0"} GAS</p>
              <p className="mt-5 text-sm font-bold leading-6 text-[var(--muted)]">{description}</p>

              <div className="mt-6 rounded-[1rem] border border-dashed border-black/15 bg-[var(--paper)] p-4">
                <p className="eyebrow">Checkout link</p>
                <div className="mt-3 flex items-center gap-3">
                  <p className="min-w-0 flex-1 break-all text-sm font-black">{checkoutUrl}</p>
                  <button
                    className="action-secondary size-11 shrink-0 rounded-2xl p-0"
                    onClick={copyLink}
                    title="Copy checkout link"
                    type="button"
                  >
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
