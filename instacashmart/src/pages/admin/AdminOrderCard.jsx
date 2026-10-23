import { useState } from "react";
import {
  formatDateTime,
  formatShortDateTime,
  orderTitle,
} from "../../lib/format";
import { ORDER_STEPS, store } from "../../lib/store";

function StatusBadge({ type, item }) {
  if (item.status === "Cancelled") {
    return (
      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
        Cancelled
      </span>
    );
  }
  const t = ORDER_STEPS[type];
  const r = t.find((n) => n.status === item.status) || t[0];
  const a = r === t[t.length - 1];
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${a ? "bg-brand-600 text-white border-brand-600" : "bg-brand-50 text-brand-700 border-brand-200"}`}
    >
      {r.label}
    </span>
  );
}

export function AdminOrderCard({ type, item, rows, showToast }) {
  const onSetStatus = (i) => {
    store.setStatus(type, item.id, i);
    const f = ORDER_STEPS[type].find((P) => P.status === i);
    showToast(`${item.id}: ${f ? f.label : i}`);
  };
  const n = () => {
    if (window.confirm(`Delete ${item.id}? This cannot be undone.`)) {
      store.remove(type, item.id);
      showToast(`${item.id} deleted`);
    }
  };
  return (
    <article className="rounded-2xl border border-slate-200 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-mono font-bold text-brand-700">
            {item.id}
          </p>
          <h3 className="text-sm font-bold text-slate-900 break-words">
            {orderTitle(type, item)}
          </h3>
          <p className="text-[11px] text-slate-400">
            {formatDateTime(item.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge type={type} item={item} />
          <button
            type="button"
            onClick={n}
            aria-label="Delete"
            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-300 transition"
          >
            <i className="fa-solid fa-trash-can text-xs" />
          </button>
        </div>
      </div>
      <OrderTracker
        type={type}
        item={item}
        onSetStatus={onSetStatus}
        showToast={showToast}
      />
      <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5 text-xs">
        {rows
          .filter(([, i]) => i)
          .map(([i, f]) => (
            <div key={i} className="flex items-start justify-between gap-4">
              <span className="shrink-0 text-slate-500">{i}</span>
              <span className="text-right font-semibold text-slate-900 break-words">
                {f}
              </span>
            </div>
          ))}
      </div>
    </article>
  );
}

function OrderTracker({ type, item, onSetStatus, showToast }) {
  const a = ORDER_STEPS[type];
  const disabled = item.status === "Cancelled";
  const i = Math.max(
    0,
    a.findIndex((j) => j.status === item.status),
  );
  const f = {
    New: item.createdAt,
    ...(item.history || {}),
  };
  const [P, setP] = useState(item.note || "");
  const c = () => {
    const j = a.filter((w) => f[w.status] || w.status === "New");
    onSetStatus(j[j.length - 1].status);
  };
  const l = () => {
    store.update(type, item.id, {
      note: P.trim(),
      noteAt: new Date().toISOString(),
    });
    showToast(`Update saved for ${item.id}`);
  };
  return (
    <div className="mt-3 pt-3 border-t border-slate-100">
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Order tracker
        </span>
        {disabled ? (
          <button
            type="button"
            onClick={c}
            className="text-[11px] font-bold text-brand-700 hover:text-brand-800"
          >
            Reopen order
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onSetStatus("Cancelled")}
            className="text-[11px] font-bold text-red-600 hover:text-red-700"
          >
            Cancel order
          </button>
        )}
      </div>
      <ol className="grid grid-cols-4 gap-1">
        {a.map((j, w) => {
          const F = !disabled && w <= i;
          return (
            <li key={j.status} className="relative">
              {w > 0 && (
                <span
                  className={`absolute top-4 right-1/2 w-full h-0.5 ${F ? "bg-brand-500" : "bg-slate-200"}`}
                />
              )}
              <button
                type="button"
                disabled={disabled}
                onClick={() => onSetStatus(j.status)}
                title={`Mark as ${j.label}`}
                className={`relative w-full flex flex-col items-center gap-1 text-center group ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition ${F ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"} ${!disabled && w === i ? "ring-4 ring-brand-100" : ""}`}
                >
                  <i className={`fa-solid ${j.icon}`} />
                </span>
                <span
                  className={`text-[11px] font-bold leading-tight ${F ? "text-slate-900" : "text-slate-400"}`}
                >
                  {j.label}
                </span>
                <span className="text-[10px] text-slate-400 min-h-[14px]">
                  {F && f[j.status] ? formatShortDateTime(f[j.status]) : ""}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      {disabled && (
        <p className="mt-2 text-[11px] font-semibold text-red-700 bg-red-50 rounded-lg px-3 py-2">
          Cancelled {formatShortDateTime(f.Cancelled)}
        </p>
      )}
      <div className="mt-3 flex flex-col sm:flex-row gap-2">
        <input
          value={P}
          onChange={(j) => setP(j.target.value)}
          aria-label="Update for customer"
          placeholder={
            type === "sell"
              ? "Update for customer, e.g. Technician Rohan (98765 43210) arriving 4–5 PM"
              : "Update for customer, e.g. Shipped via Delhivery, AWB 1234567890"
          }
          className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button
          type="button"
          onClick={l}
          className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
        >
          Save update
        </button>
      </div>
    </div>
  );
}
