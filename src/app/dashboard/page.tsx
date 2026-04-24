import Link from "next/link";
import { AppNav } from "@/components/app-nav";
import { InvoiceList } from "@/components/invoice-list";
import { LiveChainStats } from "@/components/live-chain-stats";
import { appConfig } from "@/lib/weavepay";

export default function DashboardPage() {
  return (
    <main className="page-shell">
      <div className="wrap">
        <AppNav />

        {/* Banner */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, border: "1px solid var(--line)", borderRadius: 20, background: "var(--paper-soft)", padding: "32px 36px", marginTop: 28 }}>
          <div>
            <div className="kicker"><span className="kicker-dot" />Merchant command center</div>
            <h1 className="serif" style={{ fontSize: 42, lineHeight: 1, marginTop: 12 }}>
              Settlement revenue, <em style={{ fontStyle: "italic", color: "var(--rust)" }}>live</em>.
            </h1>
            <p style={{ fontSize: 15, color: "var(--ink-soft)", marginTop: 8, maxWidth: "50ch" }}>
              Track invoices, inspect payment state, and show that WeavePay is pointing at a real Initia testnet rollup.
            </p>
          </div>
          <Link href="/invoices/new" className="btn btn-accent" style={{ flexShrink: 0 }}>+ New invoice</Link>
        </div>

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginTop: 14 }}>
          <div style={{ padding: 24, border: "1px solid var(--line)", borderRadius: 16, background: "var(--paper-soft)" }}>
            <div className="serif" style={{ fontSize: 40, lineHeight: 1 }}>$12.4k</div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--muted)", marginTop: 8 }}>Processed</div>
          </div>
          <div style={{ padding: 24, border: "1px solid var(--ink)", borderRadius: 16, background: "var(--accent)" }}>
            <div className="serif" style={{ fontSize: 40, lineHeight: 1 }}>$124</div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--muted)", marginTop: 8 }}>Fees earned</div>
          </div>
          <div style={{ padding: 24, border: "1px solid var(--ink)", borderRadius: 16, background: "var(--ink)", color: "var(--paper-soft)" }}>
            <div className="serif" style={{ fontSize: 40, lineHeight: 1 }}>32</div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "#A29682", marginTop: 8 }}>Invoices</div>
          </div>
        </div>

        {/* Invoice list + config */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 14, marginTop: 14 }}>
          <InvoiceList />
          <div style={{ border: "1px solid var(--line)", borderRadius: 18, background: "var(--paper-soft)", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--line)" }}>
              <h3 className="serif" style={{ fontSize: 22 }}>Live config</h3>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>These values point the UI at testnet.</p>
            </div>
            <div style={{ fontSize: 13 }}>
              {[
                ["Chain ID", appConfig.chainId],
                ["Denom", appConfig.denom],
                ["Contract", appConfig.contractAddress || "Not deployed yet"],
              ].map(([k, v], i, arr) => (
                <div key={k} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, padding: "14px 24px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>{k}</span>
                  <span style={{ fontWeight: 700, wordBreak: "break-all", textAlign: "right", maxWidth: 200 }}>{v}</span>
                </div>
              ))}
              <LiveChainStats />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
