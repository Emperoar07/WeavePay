import { AppNav } from "@/components/app-nav";
import { InvoiceList } from "@/components/invoice-list";
import { LiveChainStats } from "@/components/live-chain-stats";
import { MetricCard } from "@/components/metric-card";
import { appConfig } from "@/lib/weavepay";

export default function DashboardPage() {
  return (
    <main className="page-shell">
      <div className="content-shell pt-12">
        <div className="page-label">Dashboard · /dashboard</div>
      </div>

      <AppNav />

      <section className="content-shell mt-8 pb-16">
        {/* Top banner */}
        <div className="flex items-end justify-between gap-6 rounded-[20px] border border-[var(--line)] bg-[var(--paper-soft)] px-9 py-8">
          <div>
            <div className="kicker"><span className="kicker-dot" />Merchant command center</div>
            <h1 className="serif-display mt-4 text-[42px] leading-none">
              Settlement revenue, <span className="italic text-[var(--rust)]">live</span>.
            </h1>
            <p className="mt-3 max-w-[50ch] text-[15px] text-[var(--ink-soft)]">
              Track invoices, inspect payment state, and show that WeavePay is pointing at a real Initia testnet rollup.
            </p>
          </div>
          <a className="action-accent shrink-0" href="/invoices/new">+ New invoice</a>
        </div>

        {/* Metric cards */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <MetricCard value="$12.4k" label="Processed" />
          <MetricCard value="$124" label="Fees earned" className="border-[var(--ink)] bg-[var(--accent)]" />
          <MetricCard value="32" label="Invoices" className="border-[var(--ink)] bg-[var(--ink)] text-[var(--paper-soft)] [&_p:last-child]:text-[#a29682]" />
        </div>

        {/* Invoice list + config */}
        <div className="mt-4 grid grid-cols-[1.2fr_0.8fr] gap-4">
          <InvoiceList />
          <div className="section-card overflow-hidden">
            <div className="border-b border-[var(--line)] px-6 py-5">
              <h2 className="serif-display text-[22px]">Live config</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">These values point the UI at testnet.</p>
            </div>
            <div className="text-[13px]">
              <div className="flex items-start justify-between gap-4 px-6 py-4">
                <span className="eyebrow">Chain ID</span>
                <span className="font-bold">{appConfig.chainId}</span>
              </div>
              <div className="flex items-start justify-between gap-4 border-t border-[var(--line)] px-6 py-4">
                <span className="eyebrow">Denom</span>
                <span className="font-bold">{appConfig.denom}</span>
              </div>
              <div className="flex items-start justify-between gap-4 border-t border-[var(--line)] px-6 py-4">
                <span className="eyebrow">Contract</span>
                <span className="break-all text-right font-bold">{appConfig.contractAddress || "Not deployed yet"}</span>
              </div>
              <LiveChainStats />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
