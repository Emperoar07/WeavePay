export function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-h-20 rounded-lg border border-black/10 bg-white/85 p-3 shadow-sm sm:p-4">
      <p className="text-xl font-black sm:text-2xl">{value}</p>
      <p className="mt-1 text-[10px] font-bold uppercase leading-4 text-[var(--muted)] sm:text-xs">{label}</p>
    </div>
  );
}

