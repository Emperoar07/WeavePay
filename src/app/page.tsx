"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AppNav } from "@/components/app-nav";

const features = [
  {
    number: "01",
    title: "Create",
    body: "Merchants generate an invoice and a checkout link in a few fields.",
    href: "/invoices/new",
  },
  {
    number: "02",
    title: "Checkout",
    body: "Buyers open a single invoice page and pay with wallet-native flow.",
    href: "/checkout/1041",
    dark: true,
  },
  {
    number: "03",
    title: "Verify",
    body: "Judges can inspect chain ID, contract, and transaction state in one place.",
    href: "/settings",
  },
];

const liveFeed = [
  { label: "WP 1042 - Nexa Labs", value: "$420", pending: false },
  { label: "WP 1041 - Orbit Shop", value: "Pending", pending: true },
  { label: "WP 1040 - Design DAO", value: "$860", pending: false },
  { label: "WP 1039 - Lagos Market", value: "$215", pending: false },
];

export default function Home() {
  return (
    <main className="page-shell">
      <div className="content-shell pt-8">
        <div className="page-label">Design 01 - Editorial Cream</div>
      </div>

      <AppNav />

      <section className="content-shell pb-6 pt-7">
        <div className="grid gap-6 rounded-[24px] border border-[var(--line)] bg-[linear-gradient(180deg,var(--paper-soft)_0%,var(--paper)_100%)] p-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:p-12">
          <div>
            <div className="kicker">
              <span className="kicker-dot" />
              Testnet live - weavepay-1
            </div>

            <h1 className="serif-display mt-5 max-w-[10ch] text-[3.35rem] leading-[0.95] sm:text-[4.4rem]">
              Checkout links that <span className="italic text-[var(--rust)]">settle</span> on your own chain.
            </h1>

            <p className="mt-5 max-w-[48ch] text-base text-[var(--ink-soft)] sm:text-[17px]">
              WeavePay gives merchants a compact payment stack: create an invoice, share a buyer link, and settle value directly on an Initia EVM rollup with wallet-native UX.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="action-primary" href="/dashboard">
                Open dashboard
                <ArrowRight size={16} />
              </Link>
              <Link className="action-accent" href="/invoices/new">
                Create invoice
              </Link>
            </div>

            <dl className="mt-10 grid gap-4 border-t border-[var(--line-strong)] pt-6 sm:grid-cols-3">
              <div className="stat-block">
                <dt>Processed</dt>
                <dd>$12.4k</dd>
              </div>
              <div className="stat-block">
                <dt>Platform fee</dt>
                <dd>1.00%</dd>
              </div>
              <div className="stat-block">
                <dt>Block cadence</dt>
                <dd>100ms</dd>
              </div>
            </dl>
          </div>

          <div className="ink-card relative overflow-hidden p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_120%_-20%,var(--plum)_0%,transparent_60%)] opacity-60" />
            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a29682]">Live invoice feed</p>
              <h2 className="serif-display mt-2 text-[28px]">Merchant revenue, visible.</h2>
              <div className="mt-7 space-y-3">
                {liveFeed.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-[12px] border border-white/10 bg-white/5 px-4 py-4 text-[13px]"
                  >
                    <b className="font-bold">{row.label}</b>
                    {row.pending ? (
                      <span className="rounded-full border border-[rgba(200,242,79,0.3)] bg-[rgba(200,242,79,0.18)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--accent)]">
                        Pending
                      </span>
                    ) : (
                      <span className="serif-display text-base">{row.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-shell pb-10">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.title}
              className={`rounded-[18px] border border-[var(--line)] p-7 transition hover:-translate-y-0.5 ${
                feature.dark ? "bg-[var(--ink)] text-[var(--paper-soft)]" : "bg-[var(--paper-soft)]"
              }`}
              href={feature.href}
            >
              <div className={`serif-display text-[60px] leading-[0.8] tracking-[-0.04em] ${feature.dark ? "text-[#312c25]" : "text-[var(--paper-hard)]"}`}>
                {feature.number}
              </div>
              <h3 className="serif-display mt-3 text-[22px]">{feature.title}</h3>
              <p className={`mt-3 text-sm ${feature.dark ? "text-[#a29682]" : "text-[var(--ink-soft)]"}`}>{feature.body}</p>
              <span className={`mt-5 inline-flex border-b-[1.5px] pb-0.5 text-sm font-bold ${feature.dark ? "border-[var(--accent)] text-[var(--accent)]" : "border-[var(--ink)]"}`}>
                {feature.title === "Create" ? "Start creating" : feature.title === "Checkout" ? "Preview checkout" : "Open settings"} -&gt;
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
