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
      <p className="bg-[var(--paper)] px-4 py-4 text-xs font-bold text-[var(--muted)]">
        Live chain: {stats.error}
      </p>
    );
  }

  return (
    <div className="divide-y divide-[var(--line)] text-sm font-bold">
      <p className="flex items-start justify-between gap-4 px-0 py-4">
        <span className="eyebrow">Invoices on-chain</span>
        <span>{stats.invoiceCount === null ? "..." : stats.invoiceCount.toString()}</span>
      </p>
      <p className="flex items-start justify-between gap-4 px-0 py-4">
        <span className="eyebrow">Fee</span>
        <span>{stats.protocolFeeBps === null ? "..." : `${Number(stats.protocolFeeBps) / 100}%`}</span>
      </p>
    </div>
  );
}
