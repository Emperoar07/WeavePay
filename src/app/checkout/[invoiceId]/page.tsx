import { BadgeCheck, ShieldCheck } from "lucide-react";
import { AppNav } from "@/components/app-nav";
import { DynamicPayInvoiceAction } from "@/components/initia-dynamic";
import { demoInvoices } from "@/lib/weavepay";

const receiptSteps = ["Invoice created", "Wallet connected", "Payment signed", "Merchant settled"];

export default async function CheckoutPage({ params }: { params: Promise<{ invoiceId: string }> }) {
  const { invoiceId } = await params;
  const invoice = demoInvoices.find((item) => item.id === invoiceId) || demoInvoices[1];

  return (
    <main className="page-shell">
      <AppNav />

      <section className="content-shell pb-10 pt-6">
        <div className="grid gap-4 lg:grid-cols-[0.84fr_1.16fr]">
          <div className="section-card p-5 sm:p-6">
            <div className="kicker">
              <ShieldCheck size={15} className="text-[var(--green)]" />
              Buyer checkout
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">{invoice.label}</h1>
            <p className="mt-4 text-sm font-medium leading-6 text-[var(--muted)]">{invoice.description}</p>

            <div className="mt-7 rounded-[1.25rem] bg-[var(--paper)] p-4">
              <p className="eyebrow">Paying</p>
              <p className="mt-2 text-xl font-black">{invoice.merchant}</p>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-[var(--muted)]">Amount due</p>
              <p className="mt-2 text-5xl font-black tracking-tight">{invoice.amount} GAS</p>
            </div>

            <DynamicPayInvoiceAction amount={invoice.amount} invoiceId={invoice.id} />
          </div>

          <div className="ink-card p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow text-white/55">Payment flow</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">Settlement timeline</h2>
                <p className="mt-3 text-sm font-medium leading-6 text-white/68">
                  A simple path from invoice creation to merchant funds landing on the rollup.
                </p>
              </div>
              <div className="rounded-full bg-white/10 px-3 py-2 text-sm font-black">{invoice.status}</div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {receiptSteps.map((step, index) => (
                <div key={step} className="rounded-[1.1rem] border border-white/10 bg-white/6 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--ink)]">
                      <BadgeCheck size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-black">{step}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/48">
                        Step {index + 1}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
