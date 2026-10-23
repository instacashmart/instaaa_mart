import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BackToHome } from "../../components/BackToHome";
import { BrandLogo } from "../../components/BrandLogo";
import {
  FUEL_TYPES,
  PRICE_RANGES,
  VEHICLE_TYPES,
  useVehicles,
  vehicleBrandsWithCounts,
  vehicleMatches,
  vehicleType,
} from "../../data/vehicles";
import { formatPriceShort } from "../../lib/format";
import { ContactSellerModal } from "./ContactSellerModal";
import { VehicleCard } from "./VehicleCard";

const SORT_OPTIONS = [
  ["new", "Newest first"],
  ["low", "Price: low to high"],
  ["high", "Price: high to low"],
  ["km", "Kms driven: lowest"],
];

const SORTERS = {
  new: (A, e) =>
    (e.condition === "New") - (A.condition === "New") ||
    (e.year || 0) - (A.year || 0),
  low: (A, e) => A.price - e.price,
  high: (A, e) => e.price - A.price,
  km: (A, e) => (A.km || 0) - (e.km || 0),
};

const filterSelectClass =
  "w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500";

export function VehiclesPage() {
  const A = useVehicles();
  const [e, t] = useSearchParams();
  const r = e.get("type") === "car" ? "car" : "bike";
  const a = e.get("brand") || "";
  const [n, setN] = useState(e.get("q") || "");
  const [f, setF] = useState("all");
  const [x, setX] = useState(-1);
  const [l, setL] = useState("new");
  const [w, setW] = useState(null);
  useEffect(() => setN(e.get("q") || ""), [e]);
  const p = (key) => {
    setX(-1);
    t(
      key === "bike"
        ? {}
        : {
            type: key,
          },
      {
        replace: true,
      },
    );
  };
  const u = (h) => {
    const d = new URLSearchParams(e);
    if (h && h !== a) {
      d.set("brand", h);
    } else {
      d.delete("brand");
    }
    d.delete("q");
    t(d, {
      replace: true,
    });
  };
  const H = useMemo(() => vehicleBrandsWithCounts(A, r), [A, r]);
  const K = a && H.find((h) => h.key.toLowerCase() === a.toLowerCase());
  const R = useMemo(() => {
    const h = PRICE_RANGES[r][x];
    return A.filter(
      (d) =>
        d.type === r &&
        (!a || d.brand.toLowerCase() === a.toLowerCase()) &&
        (f === "all" || d.fuel === f) &&
        (!h || (d.price >= h[1] && d.price < h[2])) &&
        vehicleMatches(d, n),
    ).sort(SORTERS[l]);
  }, [A, r, a, f, x, l, n]);
  const U = n.trim() || f !== "all" || x >= 0 || a;
  const B = () => {
    setN("");
    setF("all");
    setX(-1);
    if (a) {
      u("");
    }
  };
  return (
    <main>
      <BackToHome />
      <section
        id="listings"
        className="max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 rounded-2xl border border-slate-200 bg-white py-8 lg:py-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                Buy Used Bikes & Cars
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Pre-owned two-wheelers and cars from owners, dealers and
                InstaCashMart Assured
              </p>
            </div>
            <Link
              to="/bikes-cars/sell"
              className="self-start sm:self-auto shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold transition"
            >
              <i className="fa-solid fa-tag text-xs" /> Sell your bike or car
            </Link>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-4 border-b border-slate-200">
            {VEHICLE_TYPES.map((h) => {
              const d = r === h.key;
              return (
                <button
                  key={h.key}
                  type="button"
                  onClick={() => p(h.key)}
                  aria-pressed={d}
                  className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition ${d ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-300 text-slate-700 hover:border-slate-900"}`}
                >
                  <i className={`fa-solid ${h.icon} text-xs`} />
                  {h.label}
                  <span
                    className={`font-semibold ${d ? "text-slate-300" : "text-slate-400"}`}
                  >
                    {A.filter((k) => k.type === h.key).length}
                  </span>
                </button>
              );
            })}
          </div>
          <div
            className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4"
            aria-label="Brands"
          >
            {H.map((h) => {
              const d = K?.key === h.key;
              return (
                <button
                  key={h.key}
                  type="button"
                  onClick={() => u(h.key)}
                  aria-pressed={d}
                  title={h.name}
                  className={`shrink-0 w-32 h-20 px-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition ${d ? "border-brand-600 bg-brand-50/60 ring-1 ring-brand-600" : "border-slate-200 bg-white hover:border-slate-400"}`}
                >
                  <span className="h-9 flex items-center justify-center">
                    <BrandLogo brand={h} />
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {h.count} {h.count === 1 ? "listing" : "listings"}
                  </span>
                </button>
              );
            })}
          </div>
          {K && (
            <div className="mb-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center gap-4">
              <span className="w-20 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                <BrandLogo brand={K} />
              </span>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-extrabold text-slate-900">
                  {K.name} {vehicleType(r).label}
                </h2>
                <p className="text-xs text-slate-500">
                  {K.count
                    ? `${K.count} ${K.count === 1 ? "listing" : "listings"} • from ${formatPriceShort(K.from)}`
                    : "No listings right now"}
                  {K.tagline && ` • ${K.tagline}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => u("")}
                className="text-xs font-bold text-brand-700 hover:text-brand-800"
              >
                All brands
              </button>
            </div>
          )}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-5">
            <div className="relative col-span-2 lg:col-span-1">
              <input
                type="search"
                value={n}
                onChange={(h) => setN(h.target.value)}
                placeholder={
                  r === "car"
                    ? "Search Creta, Swift, diesel..."
                    : "Search Classic 350, Activa..."
                }
                aria-label="Search listings"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-3.5 text-slate-400 text-xs" />
            </div>
            <select
              value={f}
              onChange={(h) => setF(h.target.value)}
              aria-label="Fuel"
              className={filterSelectClass}
            >
              <option value="all">All fuel types</option>
              {FUEL_TYPES.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
            <select
              value={x}
              onChange={(h) => setX(Number(h.target.value))}
              aria-label="Budget"
              className={filterSelectClass}
            >
              <option value={-1}>Any budget</option>
              {PRICE_RANGES[r].map(([h], d) => (
                <option key={h} value={d}>
                  {h}
                </option>
              ))}
            </select>
            <select
              value={l}
              onChange={(h) => setL(h.target.value)}
              aria-label="Sort"
              className={`${filterSelectClass} col-span-2 lg:col-span-1`}
            >
              {SORT_OPTIONS.map(([h, d]) => (
                <option key={h} value={h}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3 mb-4 text-sm">
            <p className="text-slate-500" aria-live="polite">
              {R.length} {K ? `${K.name} ` : ""}
              {vehicleType(r).label.toLowerCase()}{" "}
              {R.length === 1 ? "listing" : "listings"}
              {n.trim() && ` for “${n.trim()}”`}
            </p>
            {U && (
              <button
                type="button"
                onClick={B}
                className="text-xs font-bold text-brand-700 hover:text-brand-800"
              >
                <i className="fa-solid fa-xmark" /> Clear filters
              </button>
            )}
          </div>
          {R.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 py-16 px-6 text-center">
              <p className="text-lg font-extrabold text-slate-900">
                No listings match
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Try another search, fuel type or budget.
              </p>
              <button
                type="button"
                onClick={B}
                className="mt-5 px-5 py-2.5 rounded-full border border-slate-900 text-sm font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition"
              >
                Show all listings
              </button>
            </div>
          ) : (
            <div className="reveal-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
              {R.map((h) => (
                <VehicleCard key={h.id} vehicle={h} onContact={() => setW(h)} />
              ))}
            </div>
          )}
        </div>
      </section>
      {w && <ContactSellerModal vehicle={w} onClose={() => setW(null)} />}
    </main>
  );
}
