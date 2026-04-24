import Link from "next/link";
import { checkoutPath, demoInvoices } from "@/lib/weavepay";

export function InvoiceList() {
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 18, background: "var(--paper-soft)", overflow: "hidden" }}>
      <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--line)" }}>
        <h3 className="serif" style={{ fontSize: 22 }}>Recent invoices</h3>
        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Onchain payment state for the merchant.</p>
      </div>
      {demoInvoices.map((invoice, i) => (
        <Link
          key={invoice.id}
          href={checkoutPath(invoice.id)}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 0.7fr 0.4fr", gap: 16, padding: "16px 24px", borderBottom: i < demoInvoices.length - 1 ? "1px solid var(--line)" : "none", fontSize: 14, alignItems: "center", textDecoration: "none", color: "inherit" }}
        >
          <div>
            <div style={{ fontWeight: 800 }}>{invoice.label}</div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginTop: 2 }}>{invoice.time}</div>
          </div>
          <div>{invoice.customer}</div>
          <div className="serif" style={{ fontSize: 17 }}>{invoice.amountLabel}</div>
          <div>
            <span className={`chip ${invoice.status === "Paid" ? "chip-paid" : "chip-pending"}`}>{invoice.status}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
