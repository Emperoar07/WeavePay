"use client";

import Link from "next/link";
import { AppNav } from "@/components/app-nav";

const liveFeed = [
  { label: "WP 1042 · Nexa Labs", value: "$420", pending: false },
  { label: "WP 1041 · Orbit Shop", value: "Pending", pending: true },
  { label: "WP 1040 · Design DAO", value: "$860", pending: false },
  { label: "WP 1039 · Lagos Market", value: "$215", pending: false },
];

const features = [
  { number: "01", title: "Create", body: "Merchants generate an invoice and a checkout link in a few fields.", href: "/invoices/new", cta: "Start creating →", dark: false },
  { number: "02", title: "Checkout", body: "Buyers open a single invoice page and pay with wallet-native flow.", href: "/checkout/1041", cta: "Preview checkout →", dark: true },
  { number: "03", title: "Verify", body: "Judges can inspect chain ID, contract, and transaction state in one place.", href: "/settings", cta: "Open settings →", dark: false },
];

export default function Home() {
  return (
    <main className="page-shell">
      <div className="wrap">
        <AppNav />

        {/* Hero */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 40,
          marginTop: 28,
          border: "1px solid var(--line)",
          borderRadius: 24,
          background: "linear-gradient(180deg,var(--paper-soft) 0%,var(--paper) 100%)",
          padding: 48,
        }}>
          <div>
            <div className="kicker"><span className="kicker-dot" />Testnet live · weavepay-1</div>
            <h1 className="serif" style={{ fontSize: 68, lineHeight: 1, maxWidth: "10ch", marginTop: 20 }}>
              Checkout links that <em style={{ fontStyle: "italic", color: "var(--rust)" }}>settle</em> on your own chain.
            </h1>
            <p style={{ fontSize: 17, color: "var(--ink-soft)", maxWidth: "48ch", marginTop: 20 }}>
              WeavePay gives merchants a compact payment stack — create an invoice, share a buyer link, and settle value directly on an Initia EVM rollup with wallet-native UX.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <Link href="/dashboard" className="btn btn-primary">Open dashboard →</Link>
              <Link href="/invoices/new" className="btn btn-accent">Create invoice</Link>
            </div>
            <dl style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 40, paddingTop: 28, borderTop: "1px solid var(--line-strong)" }}>
              <div><dt className="eyebrow">Processed</dt><dd className="serif" style={{ fontSize: 22, marginTop: 4 }}>$12.4k</dd></div>
              <div><dt className="eyebrow">Platform fee</dt><dd className="serif" style={{ fontSize: 22, marginTop: 4 }}>1.00%</dd></div>
              <div><dt className="eyebrow">Block cadence</dt><dd className="serif" style={{ fontSize: 22, marginTop: 4 }}>100ms</dd></div>
            </dl>
          </div>

          {/* Dark feed card */}
          <div style={{ borderRadius: 20, background: "var(--ink)", color: "var(--paper-soft)", padding: 32, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(600px 200px at 120% -20%,var(--plum),transparent 60%)", opacity: 0.6, pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#A29682" }}>Live invoice feed</p>
              <h2 className="serif" style={{ fontSize: 28, marginTop: 8 }}>Merchant revenue, visible.</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
                {liveFeed.map((row) => (
                  <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 13 }}>
                    <b style={{ fontWeight: 700 }}>{row.label}</b>
                    {row.pending ? (
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 999, background: "rgba(200,242,79,0.18)", color: "var(--accent)", border: "1px solid rgba(200,242,79,0.3)" }}>Pending</span>
                    ) : (
                      <span className="serif" style={{ fontSize: 16 }}>{row.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginTop: 16 }}>
          {features.map((f) => (
            <Link key={f.title} href={f.href} style={{
              display: "flex",
              flexDirection: "column",
              padding: 28,
              border: "1px solid var(--line)",
              borderRadius: 18,
              background: f.dark ? "var(--ink)" : "var(--paper-soft)",
              color: f.dark ? "var(--paper-soft)" : "var(--ink)",
              borderColor: f.dark ? "var(--ink)" : "var(--line)",
              transition: "transform 120ms",
            }}>
              <span className="serif" style={{ fontSize: 60, lineHeight: 0.8, letterSpacing: "-0.04em", color: f.dark ? "#312C25" : "var(--paper-hard)" }}>{f.number}</span>
              <h3 className="serif" style={{ fontSize: 22, marginTop: 12 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: f.dark ? "#A29682" : "var(--ink-soft)", marginTop: 10, flex: 1 }}>{f.body}</p>
              <span style={{ display: "inline-block", fontSize: 13, fontWeight: 700, borderBottom: `1.5px solid ${f.dark ? "var(--accent)" : "var(--ink)"}`, paddingBottom: 2, color: f.dark ? "var(--accent)" : "var(--ink)", marginTop: 20, width: "max-content" }}>{f.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
