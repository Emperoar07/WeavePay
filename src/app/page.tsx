"use client";

import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { AppNav } from "@/components/app-nav";
import { MetricCard } from "@/components/metric-card";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <section className="border-b border-black/10 bg-[linear-gradient(135deg,#f9f7ef_0%,#f5fff7_48%,#eef8ff_100%)]">
        <AppNav />
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 pb-8 sm:px-5 md:gap-10 md:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-lg border border-black/10 bg-white/70 px-3 py-2 text-xs font-bold text-[var(--muted)] shadow-sm sm:text-sm">
                <ShieldCheck size={16} className="text-[var(--green)]" />
                <span>Testnet settlement on an Initia EVM rollup</span>
              </div>
              <h1 className="max-w-[11ch] text-4xl font-black leading-[0.95] tracking-tight sm:max-w-none sm:text-5xl md:text-7xl">
                Checkout links for the Interwoven economy.
              </h1>
              <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
                WeavePay lets merchants create payment links, accept wallet payments through InterwovenKit, and settle revenue on their own Initia appchain.
              </p>
              <div className="mt-6 grid gap-3 sm:flex">
                <Link
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--ink)] px-5 text-sm font-black text-white transition hover:bg-black"
                  href="/dashboard"
                >
                  Open dashboard
                  <ArrowRight size={16} />
                </Link>
                <Link
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-black/15 bg-white px-5 text-sm font-black transition hover:bg-[var(--accent)]"
                  href="/invoices/new"
                >
                  Create invoice
                  <Sparkles size={16} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <MetricCard value="$12.4k" label="processed" />
              <MetricCard value="1.0%" label="platform fee" />
              <MetricCard value="100ms" label="rollup blocks" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-5 md:grid-cols-3 md:px-8 lg:px-10">
        {[
          ["Create", "Merchants generate invoices and payment links on the WeavePay rollup.", "/invoices/new"],
          ["Checkout", "Buyers connect with InterwovenKit and pay a focused invoice page.", "/checkout/1041"],
          ["Verify", "Judges can inspect chain ID, contract address, and transaction state.", "/settings"],
        ].map(([title, body, href]) => (
          <Link key={title} className="rounded-lg border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" href={href}>
            <p className="text-xl font-black">{title}</p>
            <p className="mt-3 text-sm font-bold leading-6 text-[var(--muted)]">{body}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-black">
              Continue
              <ArrowRight size={16} />
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
