import { useMemo } from "react";
import { OrderCard } from "./OrderCard";
import { store, useStoreVersion } from "../../lib/store";

export function MyOrders({ onSelect, className = "mt-6 p-5 sm:p-6" }) {
  const t = useStoreVersion();
  const r = useMemo(
    () =>
      [
        ...store.list("sell").map((a) => ({
          type: "sell",
          item: a,
        })),
        ...store.list("buy").map((a) => ({
          type: "buy",
          item: a,
        })),
      ].sort((a, n) =>
        String(n.item.createdAt).localeCompare(String(a.item.createdAt)),
      ),
    [t],
  );
  if (r.length) {
    return (
      <section
        id="my-orders"
        className={`reveal max-w-7xl mx-3 sm:mx-4 xl:mx-auto rounded-2xl border border-slate-200 bg-white ${className}`}
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
              My Orders
            </h2>
            <p className="text-xs text-slate-500">
              Live status of your pickups and accessory orders
            </p>
          </div>
          <span className="shrink-0 text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
            {r.length} {r.length === 1 ? "order" : "orders"}
          </span>
        </div>
        <div className="flex gap-3 sm:gap-4 overflow-x-auto custom-scrollbar pb-2">
          {r.map(({ type, item }) => (
            <OrderCard
              key={item.id}
              type={type}
              item={item}
              onSelect={onSelect}
            />
          ))}
        </div>
      </section>
    );
  }
  return null;
}
