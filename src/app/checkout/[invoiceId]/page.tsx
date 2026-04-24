import { BadgeCheck, ShieldCheck } from "lucide-react";
import { AppNav } from "@/components/app-nav";
import { DynamicPayInvoiceAction } from "@/components/initia-dynamic";
import { demoInvoices } from "@/lib/weavepay";

const receiptSteps = ["Invoice created", "Wallet connected", "Payment signed", "Merchant settled"];

export default async function CheckoutPage({ params }: { params: Promise<{ invoiceId: string }> }) {
  const { invoiceId } = await params;
  const invoice = demoInvoices.find((item) => item.id === invoiceId) || demoInvoices[1];

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <AppNav />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-10 sm:px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-[var(--paper)] px-3 py-2 text-xs font-black uppercase text-[var(--muted)]">
            <ShieldCheck size={15} className="text-[var(--green)]" />
            Buyer checkout
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight">{invoice.label}</h1>
          <p className="mt-3 text-sm font-bold leading-6 text-[var(--muted)]">{invoice.description}</p>
          <div className="mt-8 rounded-lg bg-[var(--ink)] p-5 text-white">
            <p className="text-xs font-black uppercase text-white/50">Paying</p>
            <p className="mt-1 text-xl font-black">{invoice.merchant}</p>
            <p className="mt-6 text-xs font-black uppercase text-white/50">Amount due</p>
            <p className="mt-1 text-5xl font-black">{invoice.amount} GAS</p>
            <DynamicPayInvoiceAction amount={invoice.amount} invoiceId={invoice.id} />
          </div>
        </div>

        <div className="rounded-lg border border-black/10 bg-[var(--ink)] p-5 text-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black">Settlement timeline</h2>
              <p className="text-sm font-medium text-white/60">A clean path from invoice to merchant funds.</p>
            </div>
            <div className="rounded-lg bg-white/10 px-3 py-2 text-sm font-black">{invoice.status}</div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {receiptSteps.map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--ink)]">
                  <BadgeCheck size={16} />
                </div>
                <div>
                  <p className="text-sm font-black">{step}</p>
                  <p className="text-xs font-semibold text-white/50">Step {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
