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
    loading: () => <div className="h-12 w-full rounded-lg bg-[var(--ink)]" />,
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
    : `weavepay.app${checkoutPath}`;

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
      // fall back silently; user still sees the preview
    }
  }, []);

  const copyLink = useCallback(() => {
    if (typeof navigator === "undefined") return;
    navigator.clipboard?.writeText(checkoutUrl);
  }, [checkoutUrl]);

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <AppNav />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-10 sm:px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <div className="rounded-lg border border-black/10 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black">Create invoice</h1>
              <p className="text-sm font-medium text-[var(--muted)]">Generate and submit a payment request.</p>
            </div>
            <ReceiptText className="text-[var(--green)]" />
          </div>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-xs font-black uppercase text-[var(--muted)]">Merchant EVM address</span>
              <input
                className="mt-2 h-12 w-full rounded-lg border border-black/15 px-4 text-base font-bold outline-none transition focus:border-[var(--green)] sm:text-sm"
                value={merchant}
                onChange={(event) => setMerchant(event.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-xs font-black uppercase text-[var(--muted)]">Amount in GAS</span>
              <input
                className="mt-2 h-12 w-full rounded-lg border border-black/15 px-4 text-base font-bold outline-none transition focus:border-[var(--green)] sm:text-sm"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-xs font-black uppercase text-[var(--muted)]">Description</span>
              <textarea
                className="mt-2 min-h-28 w-full resize-none rounded-lg border border-black/15 p-4 text-base font-bold outline-none transition focus:border-[var(--green)] sm:text-sm"
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

        <div className="rounded-lg border border-black/10 bg-[var(--ink)] p-4 text-white shadow-sm sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black">Checkout preview</h2>
              <p className="text-sm font-medium text-white/60">
                {mintedId ? "Minted on WeavePay rollup." : "Buyer facing page."}
              </p>
            </div>
            <div className="rounded-lg bg-white/10 px-3 py-2 text-sm font-black">
              Invoice WP {displayId}
            </div>
          </div>
          <div className="mt-5 rounded-lg bg-white p-5 text-[var(--ink)]">
            <p className="text-xs font-black uppercase text-[var(--muted)]">Amount due</p>
            <p className="mt-1 text-5xl font-black">{amount || "0"} GAS</p>
            <p className="mt-5 text-sm font-bold leading-6 text-[var(--muted)]">{description}</p>
            <div className="mt-5 rounded-lg border border-dashed border-black/20 bg-[var(--paper)] p-4">
              <p className="text-xs font-black uppercase text-[var(--muted)]">Checkout link</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="truncate text-sm font-black">{checkoutUrl}</p>
                <button
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-black/15 bg-white"
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
      </section>
    </main>
  );
}
