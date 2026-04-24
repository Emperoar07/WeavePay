import { BarChart3, Plus, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { AppNav } from "@/components/app-nav";
import { InvoiceList } from "@/components/invoice-list";
import { LiveChainStats } from "@/components/live-chain-stats";
import { MetricCard } from "@/components/metric-card";
import { appConfig } from "@/lib/weavepay";

export default function DashboardPage() {
  return (
    <main className="page-shell">
      <AppNav />

      <section className="content-shell pb-10 pt-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="section-card p-6 sm:p-8">
            <div className="kicker">
              <ShieldCheck size={15} className="text-[var(--green)]" />
              Merchant dashboard
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              Settlement command center
            </h1>
            <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-[var(--muted)]">
              Track invoices, inspect payment state, and show that WeavePay is pointing at a real Initia testnet rollup.
            </p>
          </div>

          <Link className="action-accent lg:self-center" href="/invoices/new">
            <Plus size={16} />
            New invoice
          </Link>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <MetricCard value="$12.4k" label="processed" />
          <MetricCard value="$124" label="fees earned" />
          <MetricCard value="32" label="invoices" />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <InvoiceList />

          <div className="section-card p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-[var(--paper)] text-[var(--green)]">
                <BarChart3 size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-black">Live configuration</h2>
                <p className="mt-2 text-sm font-medium leading-6 text-[var(--muted)]">
                  These values tell judges and users exactly which chain and contract this frontend is targeting.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm font-bold">
              <p className="rounded-2xl bg-[var(--paper)] p-4">Chain ID: {appConfig.chainId}</p>
              <p className="rounded-2xl bg-[var(--paper)] p-4">Denom: {appConfig.denom}</p>
              <p className="break-all rounded-2xl bg-[var(--paper)] p-4">
                Contract: {appConfig.contractAddress || "Not deployed yet"}
              </p>
              <LiveChainStats />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
