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
    cta: "Start creating →",
    dark: false,
  },
  {
    number: "02",
    title: "Checkout",
    body: "Buyers open a single invoice page and pay with wallet-native flow.",
    href: "/checkout/1041",
    cta: "Preview checkout →",
    dark: true,
  },
  {
    number: "03",
    title: "Verify",
    body: "Judges can inspect chain ID, contract, and transaction state in one place.",
    href: "/settings",
    cta: "Open settings →",
    dark: false,
  },
];

const liveFeed = [
  { label: "WP 1042 · Nexa Labs", value: "$420", pending: false },
  { label: "WP 1041 · Orbit Shop", value: "Pending", pending: true },
  { label: "WP 1040 · Design DAO", value: "$860", pending: false },
  { label: "WP 1039 · Lagos Market", value: "$215", pending: false },
];

export default function Home() {
  return (
    <main className="page-shell">
      <div className="content-shell pt-8">
        <div className="page-label">Design 01 · Editorial Cream</div>
      </div>

      <AppNav />

      {/* Hero */}
      <section className="content-shell pt-7 pb-4">
        <div className="rounded-[24px] border border-[var(--line)] bg-[linear-gradient(180deg,var(--paper-soft)_0%,var(--paper)_100%)] p-12 grid grid-cols-[1.1fr_0.9fr] gap-10">
          {/* Left column */}
          <div>
            <div className="kicker">
              <span className="kicker-dot" />
              Testnet live · weavepay-1
            </div>
            <h1 className="serif-display mt-5 text-[68px] leading-[1] max-w-[10ch]">
              Checkout links that{" "}
              <em className="not-italic italic text-[var(--rust)]">settle</em>{" "}
              on your own chain.
            </h1>
            <p className="mt-5 text-[17px] text-[var(--ink-soft)] max-w-[48ch]">
              WeavePay gives merchants a compact payment stack — create an invoice, share a buyer link, and settle value directly on an Initia EVM rollup with wallet-native UX.
            </p>
            <div className="mt-7 flex gap-3">
              <Link className="action-primary" href="/dashboard">
                Open dashboard →
              </Link>
              <Link className="action-accent" href="/invoices/new">
                Create invoice
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--line-strong)] pt-7">
              <div><dt className="eyebrow">Processed</dt><dd className="serif-display mt-1 text-[22px]">$12.4k</dd></div>
              <div><dt className="eyebrow">Platform fee</dt><dd className="serif-display mt-1 text-[22px]">1.00%</dd></div>
              <div><dt className="eyebrow">Block cadence</dt><dd className="serif-display mt-1 text-[22px]">100ms</dd></div>
            </dl>
          </div>

          {/* Right column — dark card */}
          <div className="ink-card relative overflow-hidden p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_120%_-20%,var(--plum)_0%,transparent_60%)] opacity-60" />
            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a29682]">Live invoice feed</p>
              <h2 className="serif-display mt-2 text-[28px]">Merchant revenue, visible.</h2>
              <div className="mt-7 flex flex-col gap-3">
                {liveFeed.map((row) => (
                  <div key={row.label} className="flex items-center justify-between rounded-[12px] border border-white/10 bg-white/5 px-4 py-3 text-[13px]">
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

      {/* Feature cards */}
      <section className="content-shell pb-10 pt-4">
        <div className="grid grid-cols-3 gap-4">
          {features.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className={`flex flex-col rounded-[18px] border border-[var(--line)] p-7 transition hover:-translate-y-0.5 ${
                f.dark ? "bg-[var(--ink)] text-[var(--paper-soft)]" : "bg-[var(--paper-soft)]"
              }`}
            >
              <div className={`serif-display text-[60px] leading-[0.8] tracking-[-0.04em] ${f.dark ? "text-[#312c25]" : "text-[var(--paper-hard)]"}`}>
                {f.number}
              </div>
              <h3 className="serif-display mt-3 text-[22px]">{f.title}</h3>
              <p className={`mt-3 flex-1 text-sm ${f.dark ? "text-[#a29682]" : "text-[var(--ink-soft)]"}`}>{f.body}</p>
              <span className={`mt-5 text-sm font-bold border-b-[1.5px] pb-0.5 w-max ${f.dark ? "border-[var(--accent)] text-[var(--accent)]" : "border-[var(--ink)] text-[var(--ink)]"}`}>
                {f.cta}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
