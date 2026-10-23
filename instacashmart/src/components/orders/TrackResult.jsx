import {
  formatDate,
  formatPrice,
  formatShortDateTime,
  orderTitle,
} from "../../lib/format";
import { ORDER_STEPS, store, useStoreVersion } from "../../lib/store";

export function TrackResult({ query }) {
  useStoreVersion();
  if (!query) {
    return null;
  }
  const e = store.findOrder(query);
  if (!e) {
    return (
      <div className="text-center py-6">
        <p className="font-bold text-slate-900">No order found for “{query}”</p>
        <p className="text-slate-500 mt-1">
          Check the ID on your confirmation screen and try again.
        </p>
      </div>
    );
  }
  const { type, item } = e;
  const a = ORDER_STEPS[type];
  const n = item.status === "Cancelled";
  const i = Math.max(
    0,
    a.findIndex((x) => x.status === item.status),
  );
  const f = {
    New: item.createdAt,
    ...(item.history || {}),
  };
  const P =
    type === "sell"
      ? item.date
        ? `Pickup on ${formatDate(item.date, {
            weekday: "short",
            day: "numeric",
            month: "short",
          })}`
        : "Sell pickup"
      : `${formatPrice(item.price)} • Accessory order`;
  return (
    <>
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mb-4">
        <p className="font-mono font-bold text-brand-700 text-[11px]">
          {item.id}
        </p>
        <p className="font-bold text-slate-900">{orderTitle(type, item)}</p>
        <p className="text-[11px] text-slate-500">{P}</p>
      </div>
      {n && (
        <p className="mb-4 font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
          This order was cancelled
          {f.Cancelled ? ` on ${formatShortDateTime(f.Cancelled)}` : ""}.
        </p>
      )}
      <div className="space-y-4">
        {a.map((x, c) => {
          const l = !n && c <= i;
          return (
            <div
              key={x.status}
              className={`flex items-start gap-3 ${l ? "" : "opacity-60"}`}
            >
              <div
                className={`w-6 h-6 rounded-full ${l ? "bg-brand-600 text-white" : "bg-slate-200 text-slate-600"} flex items-center justify-center text-[10px] shrink-0 mt-0.5`}
              >
                <i className={`fa-solid ${l && c < i ? "fa-check" : x.icon}`} />
              </div>
              <div>
                <p className="font-bold text-slate-900">
                  {x.label}
                  {l && c === i && (
                    <span className="ml-1 text-[10px] font-bold text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </p>
                <p className="text-[10px] text-slate-400">
                  {l ? formatShortDateTime(f[x.status]) : "Pending"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {item.note && (
        <div className="mt-4 p-3 rounded-xl bg-brand-50 border border-brand-100">
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand-700">
            Latest update
          </p>
          <p className="text-slate-800 mt-0.5">{item.note}</p>
        </div>
      )}
    </>
  );
}
