import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BackToHome } from "../../components/BackToHome";
import { RadioTiles } from "../../components/RadioTiles";
import { useApp } from "../../context/AppContext";
import {
  FUEL_TYPES,
  OWNER_OPTIONS,
  TRANSMISSIONS,
  VEHICLE_PRICES,
  VEHICLE_TYPES,
  estimateVehiclePrice,
  vehicleType,
} from "../../data/vehicles";
import { formatPrice, formatPriceShort } from "../../lib/format";
import { resizeImage } from "../../lib/image";
import { store } from "../../lib/store";

const OTHER_OPTION = "__other";

const sellInputClass =
  "w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500";

const sellLabelClass = "block text-xs font-bold text-slate-700 mb-1";

const YEARS = Array.from(
  {
    length: 16,
  },
  (A, e) => new Date().getFullYear() - e,
);

const emptyVehicleForm = (city) => ({
  type: "bike",
  brand: "",
  customBrand: "",
  model: "",
  customModel: "",
  variant: "",
  year: "",
  km: "",
  fuel: "Petrol",
  transmission: "Manual",
  owners: "1st",
  city,
  price: "",
  description: "",
  name: "",
  phone: "",
  image: "",
});

function vehicleFormFromParams(A) {
  if (!A.get("type") && !A.get("brand")) {
    return {};
  }
  const e = A.get("type") === "car" ? "car" : "bike";
  const customBrand = A.get("brand") || "";
  const customModel = A.get("model") || "";
  const a = Object.keys(VEHICLE_PRICES[e]).find(
    (i) => i.toLowerCase() === customBrand.toLowerCase(),
  );
  if (!customBrand) {
    return {
      type: e,
    };
  }
  if (!a) {
    return {
      type: e,
      brand: OTHER_OPTION,
      customBrand,
      customModel,
    };
  }
  const n = Object.keys(VEHICLE_PRICES[e][a]).find(
    (i) => i.toLowerCase() === customModel.toLowerCase(),
  );
  return {
    type: e,
    brand: a,
    model: n || (customModel ? OTHER_OPTION : ""),
    customModel: n ? "" : customModel,
  };
}

const SELL_VEHICLE_PERKS = [
  [
    "fa-indian-rupee-sign",
    "Free listing",
    "No fee to post, no commission when it sells.",
  ],
  [
    "fa-users",
    "Real buyers",
    "Buyers send call-back, test ride and offer requests.",
  ],
  [
    "fa-shield-halved",
    "Number kept private",
    "Only buyers who send a request get to talk to you.",
  ],
];

export function SellVehiclePage() {
  const { city, user, showToast } = useApp();
  const [r] = useSearchParams();
  const [a, setA] = useState(() => ({
    ...emptyVehicleForm(city),
    phone: user?.mobile || "",
    ...vehicleFormFromParams(r),
  }));
  const [i, setI] = useState(null);
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);
  const PRef = useRef(null);
  const x = (U) => (B) =>
    setA((h) => ({
      ...h,
      [U]: B.target.value,
    }));
  const c = (U) => (B) =>
    setA((h) => ({
      ...h,
      [U]: B,
    }));
  const l = Object.keys(VEHICLE_PRICES[a.type]);
  const j =
    a.brand && a.brand !== OTHER_OPTION
      ? Object.keys(VEHICLE_PRICES[a.type][a.brand])
      : [];
  const w = a.brand === OTHER_OPTION ? a.customBrand.trim() : a.brand;
  const F =
    a.model === OTHER_OPTION || a.brand === OTHER_OPTION
      ? a.customModel.trim()
      : a.model;
  const p = estimateVehiclePrice({
    type: a.type,
    brand: w,
    model: F,
    year: a.year,
    km: a.km,
    owners: a.owners,
  });
  const u = vehicleType(a.type);
  const H = (U) =>
    setA((B) => ({
      ...B,
      type: U,
      brand: "",
      model: "",
      customBrand: "",
      customModel: "",
      transmission: "Manual",
    }));
  const K = async (U) => {
    const B = U.target.files[0];
    if (B) {
      try {
        const h = await resizeImage(B, 800);
        setA((d) => ({
          ...d,
          image: h,
        }));
      } catch {
        showToast("Could not read that photo. Try a JPG or PNG.");
      }
    }
  };
  const R = async (U) => {
    U.preventDefault();
    if (!w || !F) {
      showToast("Please choose the brand and model");
      return;
    }
    const h = {
      id: store.newId("CNV"),
      createdAt: new Date().toISOString(),
      status: "Pending",
      type: a.type,
      brand: w,
      model: F,
      variant: a.variant.trim(),
      year: Number(a.year),
      km: Number(a.km),
      fuel: a.fuel,
      transmission: a.transmission,
      owners: a.owners,
      city: a.city.trim(),
      price: Number(a.price),
      estimate: p?.mid || "",
      description: a.description.trim(),
      image: a.image,
      sellerType: "owner",
      sellerName: a.name.trim(),
      phone: a.phone.trim(),
    };
    setSaving(true);
    setSaveError("");
    try {
      await store.addAndWait("vehicles", h);
    } catch (error) {
      setSaveError(error.message);
      setSaving(false);
      return;
    }
    setSaving(false);
    setI(h);
    window.scrollTo({
      top: 0,
    });
    showToast("Your listing was submitted for review.");
  };
  if (i) {
    return (
      <main>
        <BackToHome />
        <section className="max-w-2xl mx-3 sm:mx-4 md:mx-auto mt-4 rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-3xl mx-auto mb-4">
            <i className="fa-solid fa-check" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
            Your {vehicleType(i.type).short.toLowerCase()} listing was submitted!
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            <span className="font-bold">
              {i.year} {i.brand} {i.model}
            </span>{" "}
            for <span className="font-bold">{formatPriceShort(i.price)}</span>{" "}
            in {i.city}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Listing ID:{" "}
            <strong className="text-brand-700 font-mono">{i.id}</strong> •
            We will review it before it appears publicly.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to={i.type === "car" ? "/bikes-cars?type=car" : "/bikes-cars"}
              className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
            >
              Browse Listings
            </Link>
            <button
              type="button"
              onClick={() => {
                setI(null);
                setA({
                  ...emptyVehicleForm(city),
                  phone: a.phone,
                  name: a.name,
                });
              }}
              className="px-5 py-2.5 bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold rounded-xl hover:bg-brand-100 transition"
            >
              Post another
            </button>
          </div>
        </section>
      </main>
    );
  }
  return (
    <main>
      <BackToHome />
      <div className="max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 grid lg:grid-cols-3 gap-4 items-start">
        <form
          onSubmit={R}
          className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 space-y-5"
        >
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              Sell Your Bike or Car
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Get an instant price estimate and submit your listing for review
            </p>
          </div>
          <div>
            <span className={sellLabelClass}>What are you selling? *</span>
            <RadioTiles
              name="vehicleType"
              columns="grid-cols-2"
              value={a.type}
              onChange={H}
              tileClass="p-3 border border-slate-200 rounded-xl text-center text-sm font-bold text-slate-800"
              options={VEHICLE_TYPES.map((U) => ({
                value: U.key,
                content: (
                  <>
                    <i
                      className={`fa-solid ${U.icon} text-xl text-brand-600 block mb-1`}
                    />
                    {U.label}
                  </>
                ),
              }))}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="vBrand" className={sellLabelClass}>
                Brand *
              </label>
              <select
                id="vBrand"
                required
                value={a.brand}
                onChange={(U) =>
                  setA((B) => ({
                    ...B,
                    brand: U.target.value,
                    model: "",
                  }))
                }
                className={sellInputClass}
              >
                <option value="">Select brand</option>
                {l.map((U) => (
                  <option key={U} value={U}>
                    {U}
                  </option>
                ))}
                <option value={OTHER_OPTION}>Other brand</option>
              </select>
              {a.brand === OTHER_OPTION && (
                <input
                  type="text"
                  required
                  value={a.customBrand}
                  onChange={x("customBrand")}
                  placeholder="Brand name"
                  aria-label="Brand name"
                  className={`${sellInputClass} mt-2`}
                />
              )}
            </div>
            <div>
              <label htmlFor="vModel" className={sellLabelClass}>
                Model *
              </label>
              {a.brand === OTHER_OPTION ? (
                <input
                  id="vModel"
                  type="text"
                  required
                  value={a.customModel}
                  onChange={x("customModel")}
                  placeholder="Model name"
                  className={sellInputClass}
                />
              ) : (
                <>
                  <select
                    id="vModel"
                    required
                    value={a.model}
                    onChange={x("model")}
                    disabled={!a.brand}
                    className={`${sellInputClass} disabled:bg-slate-50 disabled:text-slate-400`}
                  >
                    <option value="">
                      {a.brand ? "Select model" : "Pick a brand first"}
                    </option>
                    {j.map((U) => (
                      <option key={U} value={U}>
                        {U}
                      </option>
                    ))}
                    {a.brand && (
                      <option value={OTHER_OPTION}>Other model</option>
                    )}
                  </select>
                  {a.model === OTHER_OPTION && (
                    <input
                      type="text"
                      required
                      value={a.customModel}
                      onChange={x("customModel")}
                      placeholder="Model name"
                      aria-label="Model name"
                      className={`${sellInputClass} mt-2`}
                    />
                  )}
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="vVariant" className={sellLabelClass}>
                Variant
              </label>
              <input
                id="vVariant"
                type="text"
                value={a.variant}
                onChange={x("variant")}
                placeholder={
                  a.type === "car" ? "e.g. ZXi, SX (O)" : "e.g. Signals, DLX"
                }
                className={sellInputClass}
              />
            </div>
            <div>
              <label htmlFor="vYear" className={sellLabelClass}>
                Year *
              </label>
              <select
                id="vYear"
                required
                value={a.year}
                onChange={x("year")}
                className={sellInputClass}
              >
                <option value="">Year</option>
                {YEARS.map((U) => (
                  <option key={U} value={U}>
                    {U}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="vKm" className={sellLabelClass}>
                Kms driven *
              </label>
              <input
                id="vKm"
                type="number"
                required
                min={0}
                max={999999}
                value={a.km}
                onChange={x("km")}
                placeholder="e.g. 25000"
                className={sellInputClass}
              />
            </div>
          </div>
          <div>
            <span className={sellLabelClass}>Fuel *</span>
            <RadioTiles
              name="vFuel"
              columns="grid-cols-4"
              value={a.fuel}
              onChange={c("fuel")}
              options={FUEL_TYPES.map((U) => ({
                value: U,
                content: U,
              }))}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className={sellLabelClass}>
                {a.type === "car" ? "Transmission *" : "Gears *"}
              </span>
              <RadioTiles
                name="vTransmission"
                columns="grid-cols-2"
                value={a.transmission}
                onChange={c("transmission")}
                options={TRANSMISSIONS.map((U) => ({
                  value: U,
                  content:
                    a.type === "bike" && U === "Automatic"
                      ? "Gearless"
                      : a.type === "bike"
                        ? "Geared"
                        : U,
                }))}
              />
            </div>
            <div>
              <span className={sellLabelClass}>Ownership *</span>
              <RadioTiles
                name="vOwners"
                value={a.owners}
                onChange={c("owners")}
                options={OWNER_OPTIONS.map((U) => ({
                  value: U,
                  content: `${U} owner`,
                }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="vCity" className={sellLabelClass}>
                City *
              </label>
              <input
                id="vCity"
                type="text"
                required
                value={a.city}
                onChange={x("city")}
                placeholder="e.g. Bengaluru"
                className={sellInputClass}
              />
            </div>
            <div>
              <label htmlFor="vPrice" className={sellLabelClass}>
                Your asking price (₹) *
              </label>
              <input
                id="vPrice"
                type="number"
                required
                min={1000}
                step={500}
                value={a.price}
                onChange={x("price")}
                placeholder={
                  p ? `Suggested ${formatPrice(p.mid)}` : "e.g. 75000"
                }
                className={sellInputClass}
              />
              {a.price > 0 && (
                <p className="text-[11px] text-slate-500 mt-1">
                  Shown to buyers as{" "}
                  <span className="font-bold text-slate-900">
                    {formatPriceShort(a.price)}
                  </span>
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="vDesc" className={sellLabelClass}>
              Description
            </label>
            <textarea
              id="vDesc"
              rows={3}
              value={a.description}
              onChange={x("description")}
              placeholder="Service history, insurance validity, new tyres, any scratches..."
              className={sellInputClass}
            />
          </div>
          <div>
            <span className={sellLabelClass}>Photo</span>
            <div className="flex items-center gap-3">
              {a.image ? (
                <img
                  src={a.image}
                  alt="Your vehicle"
                  className="w-20 h-16 rounded-xl object-cover border border-slate-200"
                />
              ) : (
                <span className="w-20 h-16 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
                  <i className={`fa-solid ${u.icon} text-2xl`} />
                </span>
              )}
              <input
                ref={PRef}
                type="file"
                accept="image/*"
                onChange={K}
                className="sr-only"
                id="vPhoto"
              />
              <label
                htmlFor="vPhoto"
                className="cursor-pointer px-4 py-2 rounded-full border border-slate-300 hover:border-slate-900 text-xs font-bold text-slate-900 transition"
              >
                {a.image ? "Change photo" : "Add photo"}
              </label>
              {a.image && (
                <button
                  type="button"
                  onClick={() => {
                    setA((U) => ({
                      ...U,
                      image: "",
                    }));
                    PRef.current.value = "";
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="vName" className={sellLabelClass}>
                Your name *
              </label>
              <input
                id="vName"
                type="text"
                required
                value={a.name}
                onChange={x("name")}
                placeholder="e.g. Rahul Verma"
                className={sellInputClass}
              />
            </div>
            <div>
              <label htmlFor="vPhone" className={sellLabelClass}>
                Mobile number *
              </label>
              <input
                id="vPhone"
                type="tel"
                required
                value={a.phone}
                onChange={x("phone")}
                placeholder="10-digit number"
                pattern="[0-9]{10}"
                maxLength={10}
                className={sellInputClass}
              />
            </div>
          </div>
          {saveError && (
            <p role="alert" className="text-xs font-semibold text-red-700">
              {saveError}
            </p>
          )}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-brand-500/20 transition flex items-center justify-center gap-2"
          >
            <span>{saving ? "Saving…" : "Post Listing"}</span>
            <i className="fa-solid fa-arrow-right" />
          </button>
        </form>
        <aside className="lg:sticky lg:top-44 space-y-4">
          <div className="rounded-2xl bg-dark-900 text-white p-5 sm:p-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Instant estimate
            </span>
            {p ? (
              <>
                <p className="text-2xl font-extrabold tracking-tight mt-2">
                  {formatPriceShort(p.low)} – {formatPriceShort(p.high)}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Typical resale for a {a.year} {w} {F}
                  {a.km
                    ? ` with ${Number(a.km).toLocaleString("en-IN")} km`
                    : ""}
                  , {a.owners} owner.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setA((U) => ({
                      ...U,
                      price: String(p.mid),
                    }))
                  }
                  className="mt-4 w-full py-2.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition"
                >
                  Ask {formatPrice(p.mid)}
                </button>
              </>
            ) : (
              <p className="text-sm text-slate-300 mt-2">
                Pick the brand, model and year to see what your{" "}
                {u.short.toLowerCase()} is worth.
              </p>
            )}
          </div>
          <ul className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
            {SELL_VEHICLE_PERKS.map(([U, B, h]) => (
              <li key={B} className="flex gap-3">
                <span className="w-9 h-9 shrink-0 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-sm">
                  <i className={`fa-solid ${U}`} />
                </span>
                <span>
                  <span className="block text-sm font-bold text-slate-900">
                    {B}
                  </span>
                  <span className="block text-xs text-slate-500">{h}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link
            to={a.type === "car" ? "/bikes-cars?type=car" : "/bikes-cars"}
            className="block text-center text-xs font-bold text-brand-700 hover:text-brand-800"
          >
            Looking to buy instead? Browse {u.label.toLowerCase()}{" "}
            <i className="fa-solid fa-arrow-right text-[10px]" />
          </Link>
        </aside>
      </div>
    </main>
  );
}
