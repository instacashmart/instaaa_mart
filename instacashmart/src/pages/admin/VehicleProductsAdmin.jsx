import { useRef, useState } from "react";
import {
  FUEL_TYPES,
  OWNER_OPTIONS,
  TRANSMISSIONS,
  VEHICLE_BRANDS,
  VEHICLE_PRICES,
  vehicleType,
} from "../../data/vehicles";
import { formatPriceShort } from "../../lib/format";
import { resizeImage } from "../../lib/image";
import { store } from "../../lib/store";
import { EmptyState, adminInputClass } from "./shared";

const emptyVehicleProduct = (type) => ({
  id: "",
  type,
  name: "",
  brand: "",
  model: "",
  price: "",
  image: "",
  condition: "Used",
  year: "",
  km: "",
  fuel: "Petrol",
  transmission: "Manual",
  owners: "1st",
  city: "",
  description: "",
});

const ADMIN_YEARS = Array.from(
  {
    length: 16,
  },
  (A, e) => new Date().getFullYear() - e,
);

export function VehicleProductsAdmin({ type, items, showToast }) {
  const r = vehicleType(type);
  const [a, setA] = useState(() => emptyVehicleProduct(type));
  const iRef = useRef(null);
  const fRef = useRef(null);
  const P = !!a.id;
  const x = a.condition === "Used";
  const c = (B) => (h) =>
    setA((d) => ({
      ...d,
      [B]: h.target.value,
    }));
  const l = VEHICLE_BRANDS[type].find(
    (B) => B.key.toLowerCase() === a.brand.trim().toLowerCase(),
  )?.key;
  const j = Object.keys(VEHICLE_PRICES[type][l] || {});
  const w = () => {
    setA(emptyVehicleProduct(type));
    if (iRef.current) {
      iRef.current.value = "";
    }
  };
  const F = async (B) => {
    const h = B.target.files && B.target.files[0];
    if (h) {
      try {
        const d = await resizeImage(h, 800);
        setA((k) => ({
          ...k,
          image: d,
        }));
      } catch {
        showToast("Could not read that image.");
      }
    }
  };
  const p = (B) => {
    B.preventDefault();
    const h = {
      type,
      name: a.name.trim(),
      brand: l || a.brand.trim(),
      model: a.model.trim(),
      price: Number(a.price),
      image: a.image,
      condition: a.condition,
      year: a.year ? Number(a.year) : "",
      km: x && a.km ? Number(a.km) : "",
      fuel: a.fuel,
      transmission: a.transmission,
      owners: x ? a.owners : "",
      city: a.city.trim(),
      description: a.description.trim(),
    };
    if (
      !(P
        ? store.update("vehicleProducts", a.id, h)
        : store.add("vehicleProducts", {
            id: store.newId(type === "car" ? "CAR" : "BIKE"),
            createdAt: new Date().toISOString(),
            ...h,
          }))
    ) {
      showToast(
        "Could not save: browser storage is full or blocked. Try a smaller photo.",
      );
      return;
    }
    showToast(
      P ? `${r.short} updated` : `${r.short} added to Buy Bikes & Cars`,
    );
    w();
  };
  const u = (B) => {
    setA({
      ...emptyVehicleProduct(type),
      ...B,
      year: B.year || "",
      km: B.km || "",
      owners: B.owners || "1st",
    });
    if (iRef.current) {
      iRef.current.value = "";
    }
    fRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const H = (B) => {
    if (window.confirm(`Delete "${B.name}"?`)) {
      store.remove("vehicleProducts", B.id);
      if (a.id === B.id) {
        w();
      }
      showToast(`${r.short} deleted`);
    }
  };
  const K = (B) => {
    store.update("vehicleProducts", B.id, {
      hidden: !B.hidden,
    });
    showToast(
      B.hidden ? "Shown on Buy Bikes & Cars" : "Hidden from Buy Bikes & Cars",
    );
  };
  const R = "block text-xs font-bold text-slate-700 mb-1";
  return (
    <section className="space-y-4">
      <form
        ref={fRef}
        onSubmit={p}
        className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 space-y-4"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <img src={r.image} alt="" className="w-10 h-7 object-contain" />
            {P ? `Edit ${r.short}` : `Add ${r.short}`}
          </h2>
          {P && (
            <button
              type="button"
              onClick={w}
              className="text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              Cancel edit
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label htmlFor={`${type}Name`} className={R}>
              {r.short} name *
            </label>
            <input
              id={`${type}Name`}
              required
              value={a.name}
              onChange={c("name")}
              placeholder={
                type === "car"
                  ? "e.g. Swift ZXi Plus"
                  : "e.g. Classic 350 Signals"
              }
              className={adminInputClass}
            />
          </div>
          <div>
            <label htmlFor={`${type}Brand`} className={R}>
              Brand *
            </label>
            <input
              id={`${type}Brand`}
              list={`${type}BrandList`}
              required
              value={a.brand}
              onChange={c("brand")}
              placeholder="Pick or type a brand"
              className={adminInputClass}
            />
            <datalist id={`${type}BrandList`}>
              {VEHICLE_BRANDS[type].map((B) => (
                <option key={B.key} value={B.key} />
              ))}
            </datalist>
          </div>
          <div>
            <label htmlFor={`${type}Price`} className={R}>
              Price (₹) *
            </label>
            <input
              id={`${type}Price`}
              type="number"
              min="1"
              required
              value={a.price}
              onChange={c("price")}
              placeholder={type === "car" ? "e.g. 565000" : "e.g. 145000"}
              className={adminInputClass}
            />
            {a.price > 0 && (
              <p className="text-[11px] text-slate-500 mt-1">
                Shown as{" "}
                <span className="font-bold text-slate-900">
                  {formatPriceShort(a.price)}
                </span>
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${type}Image`} className={R}>
              {r.short} image
            </label>
            <div className="flex items-center gap-4">
              <div className="w-28 h-20 shrink-0 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
                <img
                  src={a.image || r.image}
                  alt=""
                  className={
                    a.image
                      ? "w-full h-full object-cover"
                      : "w-4/5 h-4/5 object-contain opacity-60"
                  }
                />
              </div>
              <div className="space-y-1.5 min-w-0">
                <input
                  ref={iRef}
                  id={`${type}Image`}
                  type="file"
                  accept="image/*"
                  onChange={F}
                  className="block max-w-full text-xs text-slate-600 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-slate-900 file:text-white file:text-xs file:font-bold"
                />
                {a.image && (
                  <button
                    type="button"
                    onClick={() => {
                      if (iRef.current) {
                        iRef.current.value = "";
                      }
                      setA((B) => ({
                        ...B,
                        image: "",
                      }));
                    }}
                    className="text-[11px] font-bold text-slate-500 hover:text-slate-900"
                  >
                    Remove image
                  </button>
                )}
                <p className="text-[11px] text-slate-400">
                  Without an image, a {r.short.toLowerCase()} illustration is
                  shown.
                </p>
              </div>
            </div>
          </div>
        </div>
        <details
          className="group rounded-xl border border-slate-200 px-4 py-3"
          open={P || undefined}
        >
          <summary className="cursor-pointer list-none flex items-center justify-between text-xs font-bold text-slate-900">
            <span>
              More details{" "}
              <span className="font-medium text-slate-400">
                (optional: model, condition, year, kms, fuel, city...)
              </span>
            </span>
            <i className="fa-solid fa-chevron-down text-[10px] text-slate-400 transition group-open:rotate-180" />
          </summary>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
            <div>
              <label htmlFor={`${type}Model`} className={R}>
                Model
              </label>
              <input
                id={`${type}Model`}
                list={`${type}ModelList`}
                value={a.model}
                onChange={c("model")}
                placeholder={
                  j.length
                    ? "Pick or type a model"
                    : `e.g. ${type === "car" ? "Creta" : "Pulsar 150"}`
                }
                className={adminInputClass}
              />
              <datalist id={`${type}ModelList`}>
                {j.map((B) => (
                  <option key={B} value={B} />
                ))}
              </datalist>
            </div>
            <div>
              <label htmlFor={`${type}Condition`} className={R}>
                Condition
              </label>
              <select
                id={`${type}Condition`}
                value={a.condition}
                onChange={c("condition")}
                className={adminInputClass}
              >
                <option value="Used">Used</option>
                <option value="New">Brand new</option>
              </select>
            </div>
            <div>
              <label htmlFor={`${type}Year`} className={R}>
                Year
              </label>
              <select
                id={`${type}Year`}
                value={a.year}
                onChange={c("year")}
                className={adminInputClass}
              >
                <option value="">Not set</option>
                {ADMIN_YEARS.map((B) => (
                  <option key={B} value={B}>
                    {B}
                  </option>
                ))}
              </select>
            </div>
            {x && (
              <div>
                <label htmlFor={`${type}Km`} className={R}>
                  Kms driven
                </label>
                <input
                  id={`${type}Km`}
                  type="number"
                  min="0"
                  value={a.km}
                  onChange={c("km")}
                  placeholder="e.g. 18000"
                  className={adminInputClass}
                />
              </div>
            )}
            {x && (
              <div>
                <label htmlFor={`${type}Owners`} className={R}>
                  Owners
                </label>
                <select
                  id={`${type}Owners`}
                  value={a.owners}
                  onChange={c("owners")}
                  className={adminInputClass}
                >
                  {OWNER_OPTIONS.map((B) => (
                    <option key={B} value={B}>
                      {B} owner
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label htmlFor={`${type}Fuel`} className={R}>
                Fuel
              </label>
              <select
                id={`${type}Fuel`}
                value={a.fuel}
                onChange={c("fuel")}
                className={adminInputClass}
              >
                {FUEL_TYPES.map((B) => (
                  <option key={B} value={B}>
                    {B}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${type}Gear`} className={R}>
                {type === "car" ? "Transmission" : "Gears"}
              </label>
              <select
                id={`${type}Gear`}
                value={a.transmission}
                onChange={c("transmission")}
                className={adminInputClass}
              >
                {TRANSMISSIONS.map((B) => (
                  <option key={B} value={B}>
                    {type === "car"
                      ? B
                      : B === "Manual"
                        ? "Geared"
                        : "Gearless"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${type}City`} className={R}>
                City
              </label>
              <input
                id={`${type}City`}
                value={a.city}
                onChange={c("city")}
                placeholder="e.g. Bengaluru"
                className={adminInputClass}
              />
            </div>
            <div className="col-span-2 sm:col-span-3">
              <label htmlFor={`${type}Desc`} className={R}>
                Details
              </label>
              <textarea
                id={`${type}Desc`}
                rows={2}
                value={a.description}
                onChange={c("description")}
                placeholder="Service history, insurance, warranty, accessories..."
                className={adminInputClass}
              />
            </div>
          </div>
        </details>
        <button
          type="submit"
          className="w-full sm:w-auto px-6 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-3 rounded-xl transition"
        >
          {P ? "Save Changes" : `Add ${r.short}`}
        </button>
      </form>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        <h2 className="text-base font-bold text-slate-900">Added {r.tile}</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Shown first on Buy Bikes & Cars as InstaCashMart Assured, and under
          their brand on the home page.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.length ? (
            items.map((B) => (
              <article
                key={B.id}
                className={`flex items-center gap-3 rounded-2xl border border-slate-200 p-3 ${B.hidden ? "opacity-60" : ""}`}
              >
                <div className="w-20 h-16 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={B.image || r.image}
                    alt=""
                    className={
                      B.image
                        ? "w-full h-full object-cover"
                        : "w-4/5 h-4/5 object-contain"
                    }
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-slate-900 truncate">
                    {B.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate">
                    {[
                      B.brand,
                      B.model,
                      B.condition === "New" ? "Brand new" : B.year,
                      B.city,
                    ]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>
                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {formatPriceShort(B.price)}{" "}
                    {B.hidden && (
                      <span className="text-[10px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded-full align-middle">
                        Hidden
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => u(B)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 hover:border-slate-900"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => K(B)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 hover:border-slate-900"
                  >
                    {B.hidden ? "Show" : "Hide"}
                  </button>
                  <button
                    type="button"
                    onClick={() => H(B)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-red-600 hover:border-red-300"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="md:col-span-2">
              <EmptyState>
                No {r.tile.toLowerCase()} added yet. Use the form above.
              </EmptyState>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
