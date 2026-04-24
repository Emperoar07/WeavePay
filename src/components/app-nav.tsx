import Link from "next/link";
import { DynamicInitiaHeaderActions } from "@/components/initia-dynamic";
import { WeavePayLogo } from "@/components/weavepay-logo";

export function AppNav() {
  return (
    <header className="content-shell pt-4 sm:pt-5">
      <div className="glass-panel flex flex-col gap-4 rounded-[18px] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link className="flex min-w-0 items-center gap-3" href="/">
          <div className="flex h-10 w-[4.4rem] shrink-0 items-center justify-center">
            <WeavePayLogo className="h-10 w-[4.4rem]" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-black tracking-tight">WeavePay</p>
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Initia checkout rail
            </p>
          </div>
        </Link>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <nav className="grid grid-cols-4 rounded-full border border-[var(--line)] bg-[var(--paper)] p-1 text-xs font-bold">
            <Link className="rounded-full px-3 py-2 text-center transition hover:bg-[var(--paper-soft)]" href="/">
              Home
            </Link>
            <Link className="rounded-full px-3 py-2 text-center transition hover:bg-[var(--paper-soft)]" href="/dashboard">
              Dashboard
            </Link>
            <Link className="rounded-full px-3 py-2 text-center transition hover:bg-[var(--paper-soft)]" href="/invoices/new">
              Create
            </Link>
            <Link className="rounded-full px-3 py-2 text-center transition hover:bg-[var(--paper-soft)]" href="/settings">
              Verify
            </Link>
          </nav>
          <DynamicInitiaHeaderActions />
        </div>
      </div>
    </header>
  );
}
