export function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="section-card min-h-28 rounded-[1.15rem] p-4 sm:p-5">
      <p className="text-3xl font-black tracking-tight">{value}</p>
      <p className="mt-2 text-[11px] font-black uppercase tracking-[0.14em] text-[var(--muted)]">{label}</p>
    </div>
  );
}
