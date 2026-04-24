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
    <main className="page-shell">
      <AppNav />

      <section className="content-shell pb-10 pt-6">
        <div className="section-card p-5 sm:p-6">
          <p className="eyebrow">Judge verification</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Testnet settings</h1>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-[var(--muted)]">
            These are the exact environment values the frontend uses to speak to the WeavePay rollup and contract.
          </p>

          <div className="mt-6 overflow-hidden rounded-[1.1rem] border border-black/10">
            {rows.map(([label, value], index) => (
              <div
                key={label}
                className={`grid gap-2 bg-white px-4 py-4 sm:grid-cols-[0.28fr_0.72fr] sm:px-5 ${
                  index === rows.length - 1 ? "" : "border-b border-black/10"
                }`}
              >
                <p className="eyebrow">{label}</p>
                <p className="break-all text-sm font-black">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
