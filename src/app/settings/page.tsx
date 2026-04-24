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
      <div className="content-shell pt-8">
        <div className="page-label">Settings - /settings</div>
      </div>

      <AppNav />

      <section className="content-shell pb-10 pt-7">
        <div className="max-w-[860px]">
          <div className="section-card p-9">
            <div className="kicker">
              <span className="kicker-dot" />
              Judge verification
            </div>
            <h1 className="serif-display mt-5 text-[36px]">Testnet settings</h1>
            <p className="mt-4 max-w-[50ch] text-[14px] text-[var(--ink-soft)]">
              These are the exact environment values the frontend uses to speak to the WeavePay rollup and contract.
            </p>

            <div className="mt-8 overflow-hidden rounded-[14px] border border-[var(--line)] bg-white">
              {rows.map(([label, value], index) => (
                <div
                  key={label}
                  className={`grid gap-3 px-5 py-4 text-[13px] sm:grid-cols-[180px_1fr] ${
                    index === rows.length - 1 ? "" : "border-b border-[var(--line)]"
                  }`}
                >
                  <div className="eyebrow">{label}</div>
                  <div className="break-all font-mono text-sm font-bold">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
