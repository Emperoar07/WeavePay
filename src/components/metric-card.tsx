export function MetricCard({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`section-card min-h-28 rounded-[16px] p-5 ${className}`.trim()}>
      <p className="serif-display text-[2.5rem] leading-none">{value}</p>
      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">{label}</p>
    </div>
  );
}
