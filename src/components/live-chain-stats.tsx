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

const rowStyle = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 16,
  padding: "14px 24px",
  borderTop: "1px solid var(--line)",
  fontSize: 13,
} as const;

const keyStyle = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  color: "var(--muted)",
};

const valStyle = {
  fontWeight: 700,
  wordBreak: "break-all" as const,
  textAlign: "right" as const,
  maxWidth: 200,
};

export function LiveChainStats() {
  const [stats, setStats] = useState<Stats>({ invoiceCount: null, protocolFeeBps: null, error: null });

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
        if (!cancelled) setStats({ invoiceCount: count, protocolFeeBps: feeBps, error: null });
      } catch (err) {
        if (!cancelled) setStats((s) => ({ ...s, error: (err as Error).message }));
      }
    }

    load();
    const id = setInterval(load, 10_000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  if (stats.error) {
    return (
      <div style={rowStyle}>
        <span style={keyStyle}>Live chain</span>
        <span style={{ ...valStyle, color: "var(--muted)" }}>{stats.error}</span>
      </div>
    );
  }

  return (
    <>
      <div style={rowStyle}>
        <span style={keyStyle}>Invoices on-chain</span>
        <span style={valStyle}>{stats.invoiceCount === null ? "..." : stats.invoiceCount.toString()}</span>
      </div>
      <div style={rowStyle}>
        <span style={keyStyle}>Fee</span>
        <span style={valStyle}>{stats.protocolFeeBps === null ? "..." : `${Number(stats.protocolFeeBps) / 100}%`}</span>
      </div>
    </>
  );
}
