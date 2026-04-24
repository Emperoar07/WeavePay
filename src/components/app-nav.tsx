import Link from "next/link";
import { DynamicInitiaHeaderActions } from "@/components/initia-dynamic";

export function AppNav() {
  return (
    <header className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 md:px-8 lg:px-10">
      <Link className="flex items-center gap-3" href="/">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--ink)] text-sm font-black text-white sm:size-11">
          WP
        </div>
        <div>
          <p className="text-lg font-black tracking-tight">WeavePay</p>
          <p className="text-xs font-semibold uppercase text-[var(--muted)]">Initia checkout rail</p>
        </div>
      </Link>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <nav className="grid grid-cols-3 rounded-lg border border-black/10 bg-white p-1 text-xs font-black shadow-sm">
          <Link className="rounded-md px-3 py-2 text-center hover:bg-[var(--paper)]" href="/dashboard">
            Dashboard
          </Link>
          <Link className="rounded-md px-3 py-2 text-center hover:bg-[var(--paper)]" href="/invoices/new">
            Create
          </Link>
          <Link className="rounded-md px-3 py-2 text-center hover:bg-[var(--paper)]" href="/settings">
            Settings
          </Link>
        </nav>
        <DynamicInitiaHeaderActions />
      </div>
    </header>
  );
}
