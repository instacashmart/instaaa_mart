import { useEffect, useMemo, useState } from "react";
import { SectionHeading } from "../../components/SectionHeading";
import { useApp } from "../../context/AppContext";
import { CATEGORY_IMAGES, TRENDING_FILTERS } from "../../data/site";
import { formatPrice } from "../../lib/format";
import { useStoreList } from "../../lib/store";
import { homeSectionClass } from "./sectionClass";

export function TrendingDevices() {
  const [A, setA] = useState("all");
  const { openBuy } = useApp();
  const r = useStoreList("trending");
  const a = useMemo(() => {
    const i = new Set(r.map((f) => f.cat).filter(Boolean));
    return TRENDING_FILTERS.filter((f) => f.key === "all" || i.has(f.key));
  }, [r]);
  useEffect(() => {
    if (A !== "all" && !a.some((i) => i.key === A)) {
      setA("all");
    }
  }, [A, a]);
  const n = r.filter((i) => A === "all" || i.cat === A);
  return (
    <section className={`${homeSectionClass} reveal py-8 lg:py-10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <SectionHeading
            eyebrow="High Demand This Week"
            title="Trending Devices With Highest Resale Value"
            className=""
          >
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Get immediate top-dollar buyback quotes for these popular models
            </p>
          </SectionHeading>
          <div className="flex flex-wrap items-center gap-2">
            {a.map((i) => (
              <button
                key={i.key}
                type="button"
                onClick={() => setA(i.key)}
                aria-pressed={A === i.key}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${A === i.key ? "bg-slate-900 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {i.label}
              </button>
            ))}
          </div>
        </div>
        {n.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-400 border border-dashed border-slate-200 rounded-2xl">
            No trending devices found in this category.
          </div>
        ) : (
          <div className="reveal-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {n.map((i) => {
              const f = CATEGORY_IMAGES[i.cat];
              const P = i.image || f;
              return (
                <div
                  key={i.id || i.name}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-brand-500 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between h-full glow-card"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 truncate max-w-[120px]">
                        {i.brand}
                      </span>
                      {i.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${i.badgeClass || "text-amber-700 bg-amber-50"}`}
                        >
                          {i.badge}
                        </span>
                      )}
                    </div>
                    <div className="h-28 flex items-center justify-center p-2 mb-3 bg-slate-50/70 rounded-xl overflow-hidden group-hover:bg-brand-50/30 transition-colors">
                      {P ? (
                        <img
                          src={P}
                          alt={i.name}
                          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <i
                          className={`fa-solid ${i.icon || "fa-mobile-screen"} text-slate-700 text-4xl group-hover:scale-110 transition-transform`}
                        />
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                      {i.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 truncate">
                      {i.specs || `${i.brand} device`}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">
                        Get Up To
                      </span>
                      <span className="text-base font-extrabold text-brand-600">
                        {formatPrice(i.price)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        openBuy({
                          name: i.name,
                          category: i.cat || "phone",
                          price: i.price,
                          specs: i.specs || `${i.brand} device`,
                          grade: "Certified",
                          image: P,
                          icon: i.icon || "fa-mobile-screen",
                        })
                      }
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs transition shrink-0"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
