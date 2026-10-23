import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BackToHome } from "../../components/BackToHome";
import { BrandLogo } from "../../components/BrandLogo";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import {
  VEHICLE_PRICES,
  slugify,
  useVehicles,
  vehicleBrandPath,
  vehicleBrandsWithCounts,
  vehicleType,
  vehicleTypePath,
} from "../../data/vehicles";
import { formatPriceShort } from "../../lib/format";
import { ContactSellerModal } from "./ContactSellerModal";
import { sellVehicleUrl } from "./VehicleBrandsPage";
import { VehicleCard } from "./VehicleCard";

export function VehicleBrandPage({ type }) {
  const e = vehicleType(type);
  const { brand = "" } = useParams();
  const r = useVehicles();
  const a = useMemo(() => vehicleBrandsWithCounts(r, type), [r, type]);
  const n = a.find((H) => slugify(H.key) === brand);
  const [i, setI] = useState("");
  const [P, setP] = useState(null);
  useEffect(() => {
    if (n) {
      document.title = `${n.name} ${e.label} – Prices & Listings | InstaCashMart`;
    }
    setI("");
  }, [n?.key, e]);
  if (!n) {
    return (
      <main>
        <BackToHome />
        <section className="max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-lg font-extrabold text-slate-900">
            Brand not found
          </p>
          <Link
            to={vehicleTypePath(type)}
            className="inline-block mt-5 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
          >
            All {e.short.toLowerCase()} brands
          </Link>
        </section>
      </main>
    );
  }
  const c = r.filter(
    (H) => H.type === type && H.brand.toLowerCase() === n.key.toLowerCase(),
  );
  const l = VEHICLE_PRICES[type][n.key] || {};
  const j = [...Object.keys(l)];
  for (const H of c) {
    if (!j.some((K) => K.toLowerCase() === H.model.toLowerCase())) {
      j.push(H.model);
    }
  }
  const w = j.map((H) => {
    const K = c.filter((U) => U.model.toLowerCase() === H.toLowerCase());
    return {
      name: H,
      newPrice: l[H],
      count: K.length,
      from: K.length ? Math.min(...K.map((U) => U.price)) : 0,
      image: K.find((U) => U.image)?.image,
    };
  });
  const F = i ? c.filter((H) => H.model.toLowerCase() === i.toLowerCase()) : c;
  const p = [...new Set(c.map((H) => H.fuel).filter(Boolean))];
  const u = [...new Set(c.map((H) => H.city).filter(Boolean))];
  return (
    <main>
      <BackToHome />
      <section className="reveal max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        <Breadcrumbs
          items={[["Home", "/"], [e.label, vehicleTypePath(type)], [n.name]]}
        />
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 mt-5">
          <div className="w-36 h-24 shrink-0 rounded-2xl border border-slate-200 bg-white flex items-center justify-center p-3">
            <BrandLogo brand={n} large />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {n.name} {e.label}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {w.length
                ? `Models: ${w.map((H) => H.name).join(", ")}`
                : `Pre-owned ${n.name} ${e.short.toLowerCase()}s`}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                {c.length} for sale
              </span>
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                {w.length} models
              </span>
              {n.count > 0 && (
                <span className="px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-xs font-bold text-brand-700">
                  From {formatPriceShort(n.from)}
                </span>
              )}
            </div>
          </div>
          <Link
            to={sellVehicleUrl(type, n.key)}
            className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold transition"
          >
            Sell your {n.name} <i className="fa-solid fa-arrow-right text-xs" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100 text-xs text-slate-600">
          <p className="flex items-center gap-2">
            <i className="fa-solid fa-gas-pump text-brand-600" />{" "}
            {p.length ? p.join(", ") : "Fuel types vary by listing"}
          </p>
          <p className="flex items-center gap-2">
            <i className="fa-solid fa-location-dot text-brand-600" />{" "}
            {u.length ? `Available in ${u.join(", ")}` : "No cities yet"}
          </p>
          <p className="flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-brand-600" /> Verified
            sellers & Assured listings
          </p>
        </div>
      </section>
      {w.length > 0 && (
        <section
          className="max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
          aria-label={`${n.name} models`}
        >
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
            {n.name} models
          </h2>
          <div className="reveal-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {w.map((H) => {
              const K = i.toLowerCase() === H.name.toLowerCase();
              return (
                <div
                  key={H.name}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition ${K ? "border-brand-600 ring-1 ring-brand-600 bg-brand-50/40" : "border-slate-200 hover:border-brand-500 hover:shadow-md"}`}
                >
                  <span className="w-20 h-16 shrink-0 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={H.image || e.image}
                      alt={H.name}
                      loading="lazy"
                      className={
                        H.image
                          ? "w-full h-full object-cover"
                          : "w-4/5 h-4/5 object-contain"
                      }
                    />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 leading-snug">
                      {H.name}
                    </p>
                    {H.newPrice && (
                      <p className="text-[11px] text-slate-500">
                        New: {formatPriceShort(H.newPrice)}
                      </p>
                    )}
                    <p className="text-xs font-bold text-brand-700">
                      {H.count
                        ? `${H.count} for sale • from ${formatPriceShort(H.from)}`
                        : "None for sale yet"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    {H.count > 0 && (
                      <button
                        type="button"
                        onClick={() => setI(K ? "" : H.name)}
                        aria-pressed={K}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold transition"
                      >
                        {K ? "Show all" : "View"}
                      </button>
                    )}
                    <Link
                      to={sellVehicleUrl(type, n.key, H.name)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 hover:border-slate-900 text-center text-xs font-bold text-slate-900 transition"
                    >
                      Sell
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
      <section
        id="listings"
        className="max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        aria-label={`${n.name} ${e.short.toLowerCase()}s for sale`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
            {i ? `${n.name} ${i}` : n.name} {e.short.toLowerCase()}s for sale{" "}
            <span className="text-slate-400 font-semibold">({F.length})</span>
          </h2>
          {i && (
            <button
              type="button"
              onClick={() => setI("")}
              className="text-xs font-bold text-brand-700 hover:text-brand-800"
            >
              <i className="fa-solid fa-xmark" /> All {n.name} models
            </button>
          )}
        </div>
        {F.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {F.map((H) => (
              <VehicleCard key={H.id} vehicle={H} onContact={() => setP(H)} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 py-12 px-6 text-center">
            <p className="text-base font-extrabold text-slate-900">
              No {n.name} {e.short.toLowerCase()}s for sale right now
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Have one? List it for free and reach buyers.
            </p>
            <Link
              to={sellVehicleUrl(type, n.key)}
              className="inline-block mt-5 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-sm font-bold text-white transition"
            >
              Sell your {n.name}
            </Link>
          </div>
        )}
      </section>
      <section
        className="reveal max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        aria-label="Other brands"
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-sm font-extrabold text-slate-900">
            Other {e.short.toLowerCase()} brands
          </h2>
          <Link
            to={vehicleTypePath(type)}
            className="text-xs font-bold text-brand-700 hover:text-brand-800"
          >
            All brands <i className="fa-solid fa-arrow-right text-[10px]" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2">
          {a
            .filter((H) => H.key !== n.key)
            .map((H) => (
              <Link
                key={H.key}
                to={vehicleBrandPath(type, H.key)}
                aria-label={H.name}
                className="shrink-0 w-32 h-16 rounded-xl border border-slate-200 hover:border-brand-500 bg-white flex items-center justify-center px-3 transition"
              >
                <BrandLogo brand={H} />
              </Link>
            ))}
        </div>
      </section>
      {P && <ContactSellerModal vehicle={P} onClose={() => setP(null)} />}
    </main>
  );
}
