"use client";

import { useEffect, useState } from "react";
import { createPublicClient, defineChain, http, isAddress } from "viem";
import { appConfig, weavePayAbi } from "@/lib/weavepay";

type Stats = {
  invoiceCount: bigint | null;
  protocolFeeBps: bigint | null;
  error: string | null;
};

const chain = defineChain({
  id: 1421,
  name: "WeavePay",
  nativeCurrency: { name: "WeavePay Gas", symbol: "GAS", decimals: 18 },
  rpcUrls: { default: { http: [appConfig.jsonRpcUrl] } },
});

export function LiveChainStats() {
  const [stats, setStats] = useState<Stats>({
    invoiceCount: null,
    protocolFeeBps: null,
    error: null,
  });

  useEffect(() => {
    const addr = appConfig.contractAddress;
    if (!addr || !isAddress(addr)) {
      setStats((s) => ({ ...s, error: "Contract not deployed" }));
      return;
    }

    const client = createPublicClient({ chain, transport: http(appConfig.jsonRpcUrl) });
    let cancelled = false;

    async function load() {
      try {
        const [count, feeBps] = await Promise.all([
          client.readContract({ address: addr as `0x${string}`, abi: weavePayAbi, functionName: "invoiceCount" }),
          client.readContract({ address: addr as `0x${string}`, abi: weavePayAbi, functionName: "protocolFeeBps" }),
        ]);

        if (!cancelled) {
          setStats({ invoiceCount: count, protocolFeeBps: feeBps, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setStats((s) => ({ ...s, error: (err as Error).message }));
        }
      }
    }

    load();
    const id = setInterval(load, 10_000);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  if (stats.error) {
    return (
      <p className="rounded-2xl bg-[var(--paper)] p-3 text-xs font-bold text-[var(--muted)]">
        Live chain: {stats.error}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 text-sm font-bold sm:gap-3">
      <p className="rounded-2xl bg-[var(--paper)] p-3">
        Invoices on-chain: {stats.invoiceCount === null ? "..." : stats.invoiceCount.toString()}
      </p>
      <p className="rounded-2xl bg-[var(--paper)] p-3">
        Fee: {stats.protocolFeeBps === null ? "..." : `${Number(stats.protocolFeeBps) / 100}%`}
      </p>
    </div>
  );
}
