import { BarChart3, Plus, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { AppNav } from "@/components/app-nav";
import { InvoiceList } from "@/components/invoice-list";
import { LiveChainStats } from "@/components/live-chain-stats";
import { MetricCard } from "@/components/metric-card";
import { appConfig } from "@/lib/weavepay";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <AppNav />
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 lg:px-10">
        <div className="flex flex-col gap-4 border-y border-black/10 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-black uppercase text-[var(--muted)]">
              <ShieldCheck size={15} className="text-[var(--green)]" />
              Testnet dashboard
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Merchant command center</h1>
            <p className="mt-3 max-w-2xl text-base font-bold leading-7 text-[var(--muted)]">
              Track invoices, see payment state, and prove revenue capture from the WeavePay contract.
            </p>
          </div>
          <Link
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 text-sm font-black text-[var(--ink)]"
            href="/invoices/new"
          >
            <Plus size={16} />
            New invoice
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-2 py-5 sm:gap-3">
          <MetricCard value="$12.4k" label="processed" />
          <MetricCard value="$124" label="fees earned" />
          <MetricCard value="32" label="invoices" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <InvoiceList />
          <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-[var(--green)]" />
              <div>
                <h2 className="text-xl font-black">Live configuration</h2>
                <p className="text-sm font-medium text-[var(--muted)]">These values point the UI at testnet.</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm font-bold">
              <p className="rounded-lg bg-[var(--paper)] p-3">Chain ID: {appConfig.chainId}</p>
              <p className="rounded-lg bg-[var(--paper)] p-3">Denom: {appConfig.denom}</p>
              <p className="break-all rounded-lg bg-[var(--paper)] p-3">
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

