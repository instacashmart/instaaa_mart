import { Link } from "react-router-dom";
import { sellCategoryPath } from "../../data/sellBrands";
import { SELL_CATEGORIES } from "../../data/sellCatalog";
import {
  VEHICLE_TYPES,
  useVehicles,
  vehicleTypePath,
} from "../../data/vehicles";
import { formatPriceShort } from "../../lib/format";

export function SellCategoryGrid() {
  const A = useVehicles();
  const e = (key) =>
    Math.min(...A.filter((r) => r.type === key).map((r) => r.price));
  return (
    <section
      className="max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-6"
      aria-label="Sell your item"
    >
      <div
        id="gadgets"
        className="reveal bg-white rounded-2xl p-5 sm:p-8 border border-slate-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 flex flex-wrap items-center gap-2">
              <span>Sell Your Item</span>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                Instant estimate
              </span>
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Pick any device below to calculate its maximum buyback price
            </p>
          </div>
          <Link
            to="/brands"
            className="self-start sm:self-auto shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-brand-200 bg-brand-50 hover:bg-brand-100 text-xs font-bold text-brand-700 transition"
          >
            <span>View All Brands</span>
            <i className="fa-solid fa-arrow-right text-[10px]" />
          </Link>
        </div>
        <div className="reveal-group grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3 sm:gap-4">
          {SELL_CATEGORIES.map((t, r) => (
            <Link
              key={t.key}
              to={sellCategoryPath(t.key)}
              className={`group p-4 rounded-2xl text-center hover:border-brand-500 hover:shadow-md transition flex flex-col items-center ${r === 0 ? "border-2 border-brand-500 bg-brand-50/40" : "border border-slate-200 bg-slate-50/60 hover:bg-brand-50/30"} ${t.key === "camera" ? "col-span-2 sm:col-span-1" : ""}`}
            >
              {t.image ? (
                <img
                  src={t.image}
                  alt={`Sell your ${t.short.toLowerCase()}`}
                  className="w-20 h-20 object-contain group-hover:scale-110 transition mb-3"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-white shadow-2xs border border-slate-200/80 flex items-center justify-center text-slate-700 group-hover:text-brand-600 group-hover:scale-110 transition mb-3">
                  <i className={`fa-solid ${t.icon} text-3xl`} />
                </div>
              )}
              <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-brand-600 transition">
                {t.tile}
              </span>
              <span className="text-[10px] text-brand-700 font-semibold mt-0.5">
                Up to {t.upTo}
              </span>
            </Link>
          ))}
          {VEHICLE_TYPES.map((t) => (
            <Link
              key={t.key}
              to={vehicleTypePath(t.key)}
              className="group p-4 rounded-2xl text-center border border-slate-200 bg-slate-50/60 hover:bg-brand-50/30 hover:border-brand-500 hover:shadow-md transition flex flex-col items-center"
            >
              <img
                src={t.image}
                alt={`Buy or sell ${t.tile.toLowerCase()}`}
                className="w-20 h-20 object-contain group-hover:scale-110 transition mb-3"
              />
              <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-brand-600 transition">
                {t.tile}
              </span>
              <span className="text-[10px] text-brand-700 font-semibold mt-0.5">
                From {formatPriceShort(e(t.key))}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
