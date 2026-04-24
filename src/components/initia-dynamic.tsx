"use client";

import dynamic from "next/dynamic";

export const DynamicInitiaHeaderActions = dynamic(
  () => import("@/components/initia-actions").then((mod) => mod.InitiaHeaderActions),
  {
    ssr: false,
    loading: () => <div className="h-11 rounded-lg border border-black/10 bg-white/70 sm:w-72" />,
  },
);

export const DynamicPayInvoiceAction = dynamic(
  () => import("@/components/initia-actions").then((mod) => mod.PayInvoiceAction),
  {
    ssr: false,
    loading: () => <div className="mt-7 h-12 w-full rounded-lg bg-[var(--accent)]" />,
  },
);

