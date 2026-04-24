"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DynamicInitiaHeaderActions } from "@/components/initia-dynamic";
import { WeavePayLogo } from "@/components/weavepay-logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/invoices/new", label: "Create" },
  { href: "/settings", label: "Verify" },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <header className="content-shell pt-4 sm:pt-5">
      <div className="glass-panel flex items-center justify-between gap-4 rounded-[18px] px-6 py-4">
        <Link className="flex items-center gap-3" href="/">
          <div className="flex h-10 w-[4.4rem] shrink-0 items-center justify-center">
            <WeavePayLogo className="h-10 w-[4.4rem]" />
          </div>
          <div>
            <p className="text-base font-black tracking-tight">WeavePay</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Initia checkout rail
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="flex rounded-full border border-[var(--line)] bg-[var(--paper)] p-1 text-xs font-bold">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-full px-4 py-2 transition ${
                    active
                      ? "bg-[var(--ink)] text-[var(--paper-soft)]"
                      : "text-[var(--ink-soft)] hover:bg-[var(--paper-soft)]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <DynamicInitiaHeaderActions />
        </div>
      </div>
    </header>
  );
}
