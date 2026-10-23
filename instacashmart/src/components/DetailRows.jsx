export function DetailRows({
  rows,
  className = "space-y-2 text-sm text-slate-600",
}) {
  return (
    <div className={className}>
      {rows.map(([t, r]) => (
        <div key={t} className="flex items-start justify-between gap-4">
          <span className="shrink-0">{t}</span>
          <span
            className={`text-right break-words ${r ? "font-bold text-slate-900" : "text-slate-400 italic"}`}
          >
            {r || "Not added"}
          </span>
        </div>
      ))}
    </div>
  );
}
