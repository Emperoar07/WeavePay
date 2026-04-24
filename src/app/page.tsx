"use client";

import { ArrowRight, ShieldCheck, Sparkles, WalletCards } from "lucide-react";
import Link from "next/link";
import { AppNav } from "@/components/app-nav";
import { MetricCard } from "@/components/metric-card";

const lanes = [
  {
    title: "Create",
    body: "Generate invoices fast, attach clear payment intent, and mint the request straight onto your rollup.",
    href: "/invoices/new",
  },
  {
    title: "Checkout",
    body: "Give buyers a clean wallet payment page with InterwovenKit handling connect and signing.",
    href: "/checkout/1041",
  },
  {
    title: "Verify",
    body: "Show judges the chain config, contract address, and settlement proof without sending them digging.",
    href: "/settings",
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <AppNav />

      <section className="content-shell pb-6 pt-6 sm:pb-8 sm:pt-8">
        <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <div className="section-card overflow-hidden p-6 sm:p-8">
            <div className="kicker">
              <ShieldCheck size={15} className="text-[var(--green)]" />
              Initia EVM testnet checkout
            </div>

            <div className="mt-6 max-w-3xl">
              <p className="eyebrow">Merchant revenue on your own appchain</p>
              <h1 className="mt-3 max-w-[12ch] text-5xl font-black leading-[0.9] tracking-tight sm:max-w-none sm:text-6xl lg:text-7xl">
                Payment links built for the Interwoven economy.
              </h1>
              <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
                WeavePay gives merchants a compact payment stack: create an invoice, share a focused buyer link, and settle value on an Initia rollup with wallet-native UX.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:flex">
              <Link className="action-primary" href="/dashboard">
                Open dashboard
                <ArrowRight size={16} />
              </Link>
              <Link className="action-accent" href="/invoices/new">
                Create invoice
                <Sparkles size={16} />
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.1rem] border border-black/10 bg-[var(--paper)] p-4">
                <p className="eyebrow">Settlement path</p>
                <p className="mt-2 text-sm font-bold leading-6 text-[var(--muted)]">
                  Connect on Initia, sign once, settle directly on the WeavePay rollup.
                </p>
              </div>
              <div className="rounded-[1.1rem] border border-black/10 bg-[var(--paper)] p-4">
                <p className="eyebrow">Judge ready</p>
                <p className="mt-2 text-sm font-bold leading-6 text-[var(--muted)]">
                  Every route points to a clear action page instead of a pretty dead end.
                </p>
              </div>
              <div className="rounded-[1.1rem] border border-black/10 bg-[var(--paper)] p-4">
                <p className="eyebrow">Mobile first</p>
                <p className="mt-2 text-sm font-bold leading-6 text-[var(--muted)]">
                  Compact controls, readable type, and no dashboard sprawl on small screens.
                </p>
              </div>
            </div>
          </div>

          <div className="ink-card overflow-hidden p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow text-white/55">Live product framing</p>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">Compact merchant rail</h2>
              </div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
                <WalletCards size={20} />
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <MetricCard value="$12.4k" label="processed" />
              <MetricCard value="1.0%" label="platform fee" />
              <MetricCard value="100ms" label="block cadence" />
            </div>

            <div className="mt-8 rounded-[1.25rem] border border-white/10 bg-white/6 p-5">
              <p className="eyebrow text-white/55">How it feels</p>
              <div className="mt-4 space-y-4">
                {[
                  "Merchant creates a checkout link in a few fields.",
                  "Buyer opens a single invoice page and pays with wallet-native flow.",
                  "Judge verifies the chain setup and contract pointers without guesswork.",
                ].map((line) => (
                  <div key={line} className="flex items-start gap-3">
                    <div className="mt-1 size-2 rounded-full bg-[var(--accent)]" />
                    <p className="text-sm font-medium leading-6 text-white/78">{line}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-shell pb-10">
        <div className="grid gap-4 md:grid-cols-3">
          {lanes.map((lane) => (
            <Link
              key={lane.title}
              className="section-card p-5 transition hover:-translate-y-0.5"
              href={lane.href}
            >
              <p className="text-2xl font-black tracking-tight">{lane.title}</p>
              <p className="mt-3 text-sm font-bold leading-6 text-[var(--muted)]">{lane.body}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-black">
                Continue
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
