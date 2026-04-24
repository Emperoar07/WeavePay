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
      <div className="wrap">
        <AppNav />

        <div style={{ maxWidth: 860, marginTop: 28 }}>
          <div style={{ border: "1px solid var(--line)", borderRadius: 20, background: "var(--paper-soft)", padding: 40 }}>
            <div className="kicker"><span className="kicker-dot" />Judge verification</div>
            <h1 className="serif" style={{ fontSize: 36, marginTop: 16 }}>Testnet settings</h1>
            <p style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 8, maxWidth: "50ch" }}>
              These are the exact environment values the frontend uses to speak to the WeavePay rollup and contract.
            </p>
            <div style={{ marginTop: 28, border: "1px solid var(--line)", borderRadius: 14, overflow: "hidden" }}>
              {rows.map(([label, value], index) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16, padding: "16px 20px", borderBottom: index < rows.length - 1 ? "1px solid var(--line)" : "none", background: "white", fontSize: 13 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>{label}</span>
                  <span style={{ fontWeight: 700, wordBreak: "break-all" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
