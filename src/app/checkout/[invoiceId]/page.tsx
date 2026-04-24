import { AppNav } from "@/components/app-nav";
import { DynamicPayInvoiceAction } from "@/components/initia-dynamic";
import { demoInvoices } from "@/lib/weavepay";

const receiptSteps = [
  ["Invoice created", "Merchant · 11m ago"],
  ["Wallet connected", "Buyer · now"],
  ["Payment signed", "Pending"],
  ["Merchant settled", "Waiting"],
];

export default async function CheckoutPage({ params }: { params: Promise<{ invoiceId: string }> }) {
  const { invoiceId } = await params;
  const invoice = demoInvoices.find((item) => item.id === invoiceId) || demoInvoices[1];

  return (
    <main className="page-shell">
      <div className="wrap">
        <AppNav />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 14, marginTop: 28 }}>
          {/* Pay card */}
          <div style={{ border: "1px solid var(--line)", borderRadius: 20, background: "var(--paper-soft)", padding: 36 }}>
            <div className="kicker"><span className="kicker-dot" />Buyer checkout</div>
            <h1 className="serif" style={{ fontSize: 42, letterSpacing: "-0.02em", lineHeight: 1.05, marginTop: 24, maxWidth: "9ch" }}>
              Orbit Shop<br />· Limited drop
            </h1>
            <p style={{ fontSize: 15, color: "var(--ink-soft)", marginTop: 16, maxWidth: "34ch" }}>
              A pre-order for the upcoming streetwear collection from Orbit Shop, settled in GAS on weavepay-1.
            </p>
            <div style={{ background: "var(--ink)", color: "var(--paper-soft)", borderRadius: 16, padding: 24, marginTop: 28 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#A29682" }}>Paying</p>
              <p style={{ fontSize: 18, fontWeight: 800, marginTop: 8 }}>{invoice.merchant}</p>
              <div style={{ height: 20 }} />
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#A29682" }}>Amount due</p>
              <p className="serif" style={{ fontSize: 56, letterSpacing: "-0.02em", lineHeight: 1, marginTop: 8 }}>{invoice.amount} GAS</p>
              <DynamicPayInvoiceAction amount={invoice.amount} invoiceId={invoice.id} />
            </div>
          </div>

          {/* Timeline */}
          <div style={{ borderRadius: 20, background: "var(--ink)", color: "var(--paper-soft)", padding: 32, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(400px 200px at 90% 100%,var(--plum),transparent 60%)", opacity: 0.55, pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#A29682" }}>Settlement timeline</p>
                  <h2 className="serif" style={{ fontSize: 28, lineHeight: 1.2, marginTop: 8, maxWidth: "12ch" }}>
                    Clean path from invoice to merchant.
                  </h2>
                  <p style={{ fontSize: 14, color: "#A29682", marginTop: 8 }}>Every step is on-chain and inspectable.</p>
                </div>
                <span className="chip chip-lime">Pending</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 28 }}>
                {receiptSteps.map(([title, meta], index) => (
                  <div key={title} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 16, alignItems: "center", padding: 16, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, background: "rgba(255,255,255,0.04)" }}>
                    <div className="serif" style={{ width: 44, height: 44, background: "var(--accent)", color: "var(--ink)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{index + 1}</div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700 }}>{title}</p>
                      <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#A29682", marginTop: 2 }}>{meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
