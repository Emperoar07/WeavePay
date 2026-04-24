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
      <div className="content-shell pt-12">
        <div className="page-label">{`Checkout · /checkout/${invoice.id}`}</div>
      </div>

      <AppNav />

      <section className="content-shell mt-8 pb-16">
        <div className="grid grid-cols-[1fr_1.3fr] gap-4">
          {/* Pay card */}
          <div className="section-card p-9">
            <div className="kicker"><span className="kicker-dot" />Buyer checkout</div>
            <h1 className="serif-display mt-7 text-[42px] leading-[1.05]">
              Orbit Shop<br />· Limited drop
            </h1>
            <p className="mt-6 max-w-[34ch] text-[15px] text-[var(--ink-soft)]">
              A pre-order for the upcoming streetwear collection from Orbit Shop, settled in GAS on weavepay-1.
            </p>
            <div className="mt-8 rounded-[16px] bg-[var(--ink)] p-6 text-[var(--paper-soft)]">
              <p className="eyebrow text-[#a29682]">Paying</p>
              <p className="mt-3 text-[18px] font-extrabold">{invoice.merchant}</p>
              <p className="eyebrow mt-8 text-[#a29682]">Amount due</p>
              <p className="serif-display mt-3 text-[56px] leading-none">{invoice.amount} GAS</p>
              <DynamicPayInvoiceAction amount={invoice.amount} invoiceId={invoice.id} />
            </div>
          </div>

          {/* Timeline */}
          <div className="ink-card relative overflow-hidden p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_200px_at_90%_100%,var(--plum),transparent_60%)] opacity-[0.55]" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-[#a29682]">Settlement timeline</p>
                  <h2 className="serif-display mt-4 max-w-[12ch] text-[28px] leading-[1.2]">
                    Clean path from invoice to merchant.
                  </h2>
                  <p className="mt-3 text-[14px] text-[#a29682]">Every step is on-chain and inspectable.</p>
                </div>
                <span className="rounded-full border border-[rgba(200,242,79,0.3)] bg-[rgba(200,242,79,0.15)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--accent)]">
                  Pending
                </span>
              </div>
              <div className="mt-8 grid gap-3">
                {receiptSteps.map(([title, meta], index) => (
                  <div key={title} className="grid grid-cols-[44px_1fr] items-center gap-4 rounded-[14px] border border-white/10 bg-white/5 p-4">
                    <div className="serif-display flex h-11 w-11 items-center justify-center rounded-[12px] bg-[var(--accent)] text-[18px] text-[var(--ink)]">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{title}</p>
                      <p className="mt-0.5 text-[11px] uppercase tracking-[0.1em] text-[#a29682]">{meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
