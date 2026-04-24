import { AppNav } from "@/components/app-nav";
import { appConfig } from "@/lib/weavepay";

export default function SettingsPage() {
  const rows = [
    ["Chain ID", appConfig.chainId],
    ["RPC", appConfig.rpcUrl],
    ["REST", appConfig.restUrl],
    ["JSON RPC", appConfig.jsonRpcUrl],
    ["Indexer", appConfig.indexerUrl],
    ["Denom", appConfig.denom],
    ["Contract", appConfig.contractAddress || "TBD after deploy"],
  ];

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <AppNav />
      <section className="mx-auto max-w-4xl px-4 pb-10 sm:px-5 md:px-8">
        <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
          <h1 className="text-3xl font-black">Testnet settings</h1>
          <p className="mt-3 text-sm font-bold leading-6 text-[var(--muted)]">
            Update `.env.local` after the WeavePay rollup and contract are deployed.
          </p>
          <div className="mt-6 divide-y divide-black/10 rounded-lg border border-black/10">
            {rows.map(([label, value]) => (
              <div key={label} className="grid gap-2 p-4 sm:grid-cols-[0.35fr_0.65fr]">
                <p className="text-xs font-black uppercase text-[var(--muted)]">{label}</p>
                <p className="break-all text-sm font-black">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
