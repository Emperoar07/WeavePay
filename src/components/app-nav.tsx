import Link from "next/link";
import { DynamicInitiaHeaderActions } from "@/components/initia-dynamic";

export function AppNav() {
  return (
    <header className="content-shell pt-4 sm:pt-5">
      <div className="glass-panel flex flex-col gap-4 rounded-[1.4rem] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <Link className="flex min-w-0 items-center gap-3" href="/">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--ink)] text-sm font-black text-white shadow-sm">
            WP
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-black tracking-tight">WeavePay</p>
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Initia checkout rail
            </p>
          </div>
        </Link>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <nav className="grid grid-cols-3 rounded-full border border-black/10 bg-white/80 p-1 text-xs font-black shadow-sm">
            <Link className="rounded-full px-3 py-2 text-center transition hover:bg-[var(--paper)]" href="/dashboard">
              Dashboard
            </Link>
            <Link className="rounded-full px-3 py-2 text-center transition hover:bg-[var(--paper)]" href="/invoices/new">
              Create
            </Link>
            <Link className="rounded-full px-3 py-2 text-center transition hover:bg-[var(--paper)]" href="/settings">
              Verify
            </Link>
          </nav>
          <DynamicInitiaHeaderActions />
        </div>
      </div>
    </header>
  );
}
