import { useMemo } from "react";
import { ProductThumb } from "../../components/ProductThumb";
import { useApp } from "../../context/AppContext";
import {
  categoryIcon,
  discountPercent,
  sellerOf,
} from "../../data/accessories";
import { formatPrice } from "../../lib/format";
import { useStoreList } from "../../lib/store";

export function PopularAccessories() {
  const { openBuy, goToStore } = useApp();
  const t = useStoreList("popular");
  const r = useMemo(
    () =>
      t.map((a) => ({
        ...a,
        price: Number(a.price),
        mrp: Number(a.mrp) || Number(a.price),
        icon: a.icon || categoryIcon(a.category),
        grade: a.grade || "New",
      })),
    [t],
  );
  if (r.length) {
    return (
      <section
        className="max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-6"
        aria-label="Popular accessories"
      >
        <div className="reveal bg-white rounded-2xl border border-slate-200 p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                Popular accessories
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Top-rated chargers, cases, earbuds and more
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                goToStore({
                  category: "all",
                })
              }
              className="self-start sm:self-auto shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-brand-200 bg-brand-50 hover:bg-brand-100 text-xs font-bold text-brand-700 transition"
            >
              Shop all accessories{" "}
              <i className="fa-solid fa-arrow-right text-[10px]" />
            </button>
          </div>
          <div className="reveal-group flex gap-3 sm:gap-4 overflow-x-auto custom-scrollbar pb-2">
            {r.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => openBuy(a)}
                className="group shrink-0 w-40 sm:w-48 text-left rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition overflow-hidden bg-white"
              >
                <span className="relative block aspect-square bg-slate-100 overflow-hidden">
                  <ProductThumb
                    product={a}
                    boxClass="w-full h-full group-hover:scale-105 transition duration-500"
                    iconClass="text-5xl"
                  />
                  {discountPercent(a) > 0 && (
                    <span className="absolute top-2 left-2 text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-600 text-white">
                      {discountPercent(a)}% off
                    </span>
                  )}
                </span>
                <span className="block p-3">
                  <span className="block text-xs font-bold text-slate-900 leading-snug line-clamp-2 min-h-[2rem]">
                    {a.name}
                  </span>
                  <span className="mt-1.5 flex items-baseline gap-2">
                    <span className="text-base font-extrabold text-slate-900">
                      {formatPrice(a.price)}
                    </span>
                    {a.mrp > a.price && (
                      <span className="text-[11px] text-slate-400 line-through">
                        {formatPrice(a.mrp)}
                      </span>
                    )}
                  </span>
                  <span className="block text-[11px] text-slate-500 truncate mt-0.5">
                    by {sellerOf(a).name}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return null;
}
