import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { checkoutPath, demoInvoices } from "@/lib/weavepay";

export function InvoiceList() {
  return (
    <div className="rounded-lg border border-black/10 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-black/10 p-4 sm:p-5">
        <div>
          <h2 className="text-xl font-black">Recent invoices</h2>
          <p className="text-sm font-medium text-[var(--muted)]">Onchain payment state for the merchant.</p>
        </div>
        <ExternalLink size={18} />
      </div>
      <div className="divide-y divide-black/10">
        {demoInvoices.map((invoice) => (
          <Link
            key={invoice.id}
            className="grid gap-3 p-4 transition hover:bg-[var(--paper)] sm:p-5 md:grid-cols-[0.7fr_1fr_0.7fr_0.6fr] md:items-center"
            href={checkoutPath(invoice.id)}
          >
            <div className="flex items-start justify-between gap-3 md:block">
              <div>
                <p className="font-black">{invoice.label}</p>
                <p className="text-xs font-bold text-[var(--muted)]">{invoice.time}</p>
              </div>
              <span className={`w-fit rounded-lg px-3 py-1 text-xs font-black md:hidden ${invoice.status === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                {invoice.status}
              </span>
            </div>
            <p className="font-bold">{invoice.customer}</p>
            <p className="font-black">{invoice.amountLabel}</p>
            <span className={`hidden w-fit rounded-lg px-3 py-1 text-xs font-black md:inline-flex ${invoice.status === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
              {invoice.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

