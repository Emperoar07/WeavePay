import Link from "next/link";
import { checkoutPath, demoInvoices } from "@/lib/weavepay";

export function InvoiceList() {
  return (
    <div className="section-card overflow-hidden">
      <div className="border-b border-[var(--line)] px-6 py-5">
        <h2 className="serif-display text-[22px]">Recent invoices</h2>
        <p className="mt-1 text-xs text-[var(--muted)]">Onchain payment state for the merchant.</p>
      </div>

      <div className="divide-y divide-[var(--line)]">
        {demoInvoices.map((invoice) => (
          <Link
            key={invoice.id}
            className="grid gap-3 px-6 py-4 text-sm md:grid-cols-[1fr_1fr_.6fr_.4fr] md:items-center"
            href={checkoutPath(invoice.id)}
          >
            <div>
              <div className="font-extrabold">{invoice.label}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{invoice.time}</div>
            </div>
            <div>{invoice.customer}</div>
            <div className="serif-display text-[1.8rem] leading-none">{invoice.amountLabel}</div>
            <div>
              <span className={`status-chip ${invoice.status === "Paid" ? "paid" : "pending"}`}>{invoice.status}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
