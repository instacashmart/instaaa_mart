import { ORDER_STEPS } from "../../lib/store";

export function OrderCard({ type, item, onSelect }) {
  const r = ORDER_STEPS[type];
  const a = item.status === "Cancelled";
  const n = Math.max(
    0,
    r.findIndex((c) => c.status === item.status),
  );
  const i = r[n];
  const f = !a && n === r.length - 1;
  const P =
    type === "sell"
      ? [item.model, item.storage].filter(Boolean).join(" • ")
      : item.product;
  const x = a
    ? "bg-red-50 text-red-700 border-red-200"
    : f
      ? "bg-brand-600 text-white border-brand-600"
      : "bg-brand-50 text-brand-700 border-brand-200";
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className="shrink-0 w-64 sm:w-72 flex flex-col justify-start text-left rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition p-4 bg-white"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          <i
            className={`fa-solid ${type === "sell" ? "fa-hand-holding-dollar" : "fa-bag-shopping"}`}
          />
          {type === "sell" ? "Sell pickup" : "Accessory order"}
        </span>
        <span className="font-mono text-[10px] font-bold text-slate-400">
          {item.id}
        </span>
      </span>
      <span className="block text-sm font-bold text-slate-900 mt-1.5 truncate">
        {P}
      </span>
      <span
        className={`mt-2 self-start inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold ${x}`}
      >
        <i className={`fa-solid ${a ? "fa-ban" : i.icon} text-[10px]`} />
        {a ? "Cancelled" : i.label}
      </span>
      <span
        className="mt-3 grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${r.length}, minmax(0, 1fr))`,
        }}
      >
        {r.map((c, l) => (
          <span
            key={c.status}
            className={`h-1.5 rounded-full ${a ? "bg-red-200" : l <= n ? "bg-brand-500" : "bg-slate-200"}`}
          />
        ))}
      </span>
      {item.note && (
        <span className="block text-[11px] text-slate-600 mt-2.5 line-clamp-2">
          <i className="fa-solid fa-circle-info text-brand-600 mr-1" />
          {item.note}
        </span>
      )}
      <span className="block text-[11px] font-bold text-brand-700 mt-2.5">
        View tracking <i className="fa-solid fa-arrow-right text-[10px]" />
      </span>
    </button>
  );
}
