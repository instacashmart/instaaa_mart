import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SimpleHeader, headerButtonClass } from "../../components/Logo";
import { RadioTiles } from "../../components/RadioTiles";
import { useApp } from "../../context/AppContext";
import { OTHER_BRAND, brandName } from "../../data/sellBrands";
import {
  ACCESSORY_BONUSES,
  CONDITIONS,
  QUOTE_BONUS,
  SELL_CATALOG,
  SELL_CATEGORIES,
  VARIANT_OPTIONS,
} from "../../data/sellCatalog";
import { modelImage, useAdminModels } from "../../data/sellModels";
import { formatPrice } from "../../lib/format";
import { FieldLabel, fieldClass } from "./FieldLabel";
import { ModelPicker } from "./ModelPicker";
import { initialSelection, selectionFromParams } from "./sellForm";

export function SellPage() {
  const [A] = useSearchParams();
  const e = useNavigate();
  const { showToast } = useApp();
  useAdminModels();
  const [r, setR] = useState(() => selectionFromParams(A));
  const [n, setN] = useState("");
  const [f, setF] = useState("");
  const [x, setX] = useState("flawless");
  const [l, setL] = useState({
    box: true,
    charger: true,
    bill: true,
  });
  useEffect(() => {
    const d = selectionFromParams(A);
    setR(d);
    if (d.quickModel) {
      showToast(`Selected ${d.quickModel}. Ready for booking!`);
    }
  }, [A, showToast]);
  const { category, brand, modelIndex } = r;
  const u = SELL_CATALOG[category];
  const H = brand === OTHER_BRAND;
  const models = u.models[brand] || [];
  const selected = H || modelIndex == null ? null : models[modelIndex] || null;
  const U = VARIANT_OPTIONS[category] || {
    storage: null,
    ram: null,
  };
  const B = useMemo(() => {
    let d = 1;
    if (U.storage) {
      d *= 1 + (r.storage - U.storage.def) * U.storage.step;
    }
    if (U.ram) {
      d *= 1 + (r.ram - U.ram.def) * U.ram.step;
    }
    const k = CONDITIONS.find((Q) => Q.value === x);
    if (!selected) {
      return {
        condition: k.label,
        price: "",
      };
    }
    const S = ACCESSORY_BONUSES.reduce(
      (acc, item) => acc + (l[item.key] ? item.bonus : 0),
      0,
    );
    const g = selected.base * Math.max(d, 0.6) * k.multiplier + S + QUOTE_BONUS;
    return {
      condition: k.label,
      price: Math.round(g / 50) * 50,
    };
  }, [selected, U, r.storage, r.ram, x, l]);
  const h = () => {
    let d = selected?.name;
    if (!H && !selected) {
      showToast("Type your model and pick it from the list to continue");
      document.getElementById("modelSearch")?.focus();
      return;
    }
    if (H) {
      const Q = (r.otherBrand || "").trim();
      const J = (r.otherModel || "").trim();
      if (!Q || !J) {
        showToast("Enter your device's brand and model to continue");
        document
          .getElementById(Q ? "otherModelInput" : "otherBrandInput")
          ?.focus();
        return;
      }
      d = J.toLowerCase().startsWith(Q.toLowerCase()) ? J : `${Q} ${J}`;
    }
    const k = new URLSearchParams({
      cat: category,
      model: d,
      storage: U.storage ? U.storage.opts[r.storage] : "",
      ram: U.ram ? U.ram.opts[r.ram] : "",
      variant: n.trim(),
      extra: f.trim(),
      condition: B.condition,
      accessories: ACCESSORY_BONUSES.filter((Q) => l[Q.key])
        .map((Q) => Q.label)
        .join(", "),
      price: B.price,
    });
    e(`/pickup?${k}`);
  };
  return (
    <>
      <SimpleHeader
        action={
          <Link to="/" className={headerButtonClass}>
            <i className="fa-solid fa-arrow-left text-xs" />
            <span>Back to Home</span>
          </Link>
        }
      />
      <section className="max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 rounded-2xl border border-slate-200 bg-white px-4 sm:px-6 py-5">
        <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
          Sell Your Item
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Choose what you're selling, then answer a few questions for an instant
          quote
        </p>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar mt-4">
          {SELL_CATEGORIES.map((d) => {
            const k = d.key === category;
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => setR(initialSelection(d.key))}
                aria-pressed={k}
                className={`shrink-0 flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border hover:border-brand-500 transition min-w-[84px] ${k ? "border-brand-500 bg-brand-50/40" : "border-slate-200 bg-slate-50/60"}`}
              >
                {d.image ? (
                  <img
                    src={d.image}
                    alt={`Sell your ${d.short.toLowerCase()}`}
                    className="w-14 h-14 object-contain"
                  />
                ) : (
                  <span className="w-14 h-14 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center">
                    <i
                      className={`fa-solid ${d.icon} text-2xl text-slate-700`}
                    />
                  </span>
                )}
                <span className="text-xs font-bold text-slate-700">
                  {d.short}
                </span>
              </button>
            );
          })}
        </div>
      </section>
      <section
        id="calculator"
        className="max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 mb-10 rounded-2xl border border-slate-200 bg-white py-6 lg:py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-6">
            <div>
              <FieldLabel>1. Select Brand</FieldLabel>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {u.brands.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() =>
                      setR((k) => ({
                        ...k,
                        brand: d,
                        modelIndex: null,
                      }))
                    }
                    aria-pressed={d === brand}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition text-center ${d === brand ? "border-brand-600 bg-brand-50/80 text-brand-700 shadow-2xs" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}
                  >
                    {brandName(category, d)}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setR((d) => ({
                      ...d,
                      brand: OTHER_BRAND,
                      otherBrand: d.otherBrand || "",
                      otherModel: d.otherModel || "",
                    }))
                  }
                  aria-pressed={H}
                  className={`p-2.5 rounded-xl border border-dashed text-xs font-bold transition text-center ${H ? "border-brand-600 bg-brand-50/80 text-brand-700 shadow-2xs" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"}`}
                >
                  <i className="fa-solid fa-pen-to-square mr-1" />
                  Other
                </button>
              </div>
            </div>
            <div>
              {H ? (
                <>
                  <FieldLabel htmlFor="otherBrandInput">
                    2. Enter Brand & Model
                  </FieldLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label
                        htmlFor="otherBrandInput"
                        className="block text-[11px] font-semibold text-slate-500 mb-1"
                      >
                        Brand name *
                      </label>
                      <input
                        id="otherBrandInput"
                        type="text"
                        required
                        value={r.otherBrand}
                        onChange={(d) =>
                          setR((k) => ({
                            ...k,
                            otherBrand: d.target.value,
                          }))
                        }
                        placeholder="e.g. Lava, Micromax, Gigabyte"
                        autoComplete="off"
                        className={`${fieldClass} px-3 py-2.5 font-semibold`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="otherModelInput"
                        className="block text-[11px] font-semibold text-slate-500 mb-1"
                      >
                        Model name *
                      </label>
                      <input
                        id="otherModelInput"
                        type="text"
                        required
                        value={r.otherModel}
                        onChange={(d) =>
                          setR((k) => ({
                            ...k,
                            otherModel: d.target.value,
                          }))
                        }
                        placeholder="As written on the box or in Settings → About"
                        autoComplete="off"
                        className={`${fieldClass} px-3 py-2.5 font-semibold`}
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500">
                    <i className="fa-solid fa-circle-info text-brand-600 mr-1" />
                    We'll confirm the best price for this device after a quick
                    check at pickup.
                  </p>
                </>
              ) : (
                <>
                  <FieldLabel htmlFor="modelSearch">
                    2. Type Your Model
                  </FieldLabel>
                  <ModelPicker
                    models={models}
                    selected={selected}
                    onSelect={(d) =>
                      setR((k) => ({
                        ...k,
                        modelIndex: d,
                      }))
                    }
                    onCustom={(otherModel) =>
                      setR((k) => ({
                        ...k,
                        brand: OTHER_BRAND,
                        otherBrand: brandName(category, k.brand),
                        otherModel,
                      }))
                    }
                  />
                  {selected && (
                    <div className="mt-3 flex items-center gap-4 p-3 rounded-2xl bg-white border border-slate-200">
                      <span className="w-20 h-20 shrink-0 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden p-1.5">
                        <img
                          src={modelImage(category, selected.name)}
                          alt={selected.name}
                          className="w-full h-full object-contain"
                        />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {brandName(category, brand)}
                        </p>
                        <p className="text-sm font-extrabold text-slate-900 leading-snug">
                          {selected.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Get up to{" "}
                          <span className="font-extrabold text-brand-700">
                            {formatPrice(selected.base)}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div>
              <FieldLabel>3. Storage, RAM & Variant</FieldLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {["storage", "ram"].map(
                  (d) =>
                    U[d] && (
                      <div key={d}>
                        <label
                          htmlFor={`${d}Select`}
                          className="block text-[11px] font-semibold text-slate-500 mb-1"
                        >
                          {d === "ram" ? "RAM" : "Storage"}
                        </label>
                        <select
                          id={`${d}Select`}
                          value={r[d]}
                          onChange={(k) =>
                            setR((S) => ({
                              ...S,
                              [d]: Number(k.target.value),
                            }))
                          }
                          className={`${fieldClass} px-3 py-2.5 font-semibold`}
                        >
                          {U[d].opts.map((k, S) => (
                            <option key={k} value={S}>
                              {k}
                            </option>
                          ))}
                        </select>
                      </div>
                    ),
                )}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="variantInput"
                    className="block text-[11px] font-semibold text-slate-500 mb-1"
                  >
                    Variant / Colour
                  </label>
                  <input
                    id="variantInput"
                    type="text"
                    value={n}
                    onChange={(d) => setN(d.target.value)}
                    placeholder="e.g. Natural Titanium, 5G, Dual SIM"
                    className={`${fieldClass} px-3 py-2.5`}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="extraInput"
                    className="block text-[11px] font-semibold text-slate-500 mb-1"
                  >
                    Extra Details (optional)
                  </label>
                  <textarea
                    id="extraInput"
                    rows={2}
                    value={f}
                    onChange={(d) => setF(d.target.value)}
                    placeholder="e.g. Battery health 92%, under warranty till Mar 2027, screen replaced once"
                    className={`${fieldClass} px-3 py-2.5 resize-none`}
                  />
                </div>
              </div>
            </div>
            <div>
              <FieldLabel>4. Device Physical Condition</FieldLabel>
              <RadioTiles
                name="deviceCondition"
                columns="grid-cols-2 sm:grid-cols-3"
                tileClass="p-3 bg-white border border-slate-200 rounded-xl text-center"
                value={x}
                onChange={setX}
                options={CONDITIONS.map((d) => ({
                  value: d.value,
                  content: (
                    <>
                      <span className="block text-xs font-bold text-slate-900">
                        {d.title}
                      </span>
                      <span className="block text-[10px] text-slate-500">
                        {d.hint}
                      </span>
                    </>
                  ),
                }))}
              />
            </div>
            <div>
              <FieldLabel>
                5. Accessories Available with You (Bonus Value)
              </FieldLabel>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {ACCESSORY_BONUSES.map((d) => (
                  <label
                    key={d.key}
                    className="cursor-pointer flex items-center gap-2 p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:border-brand-500 transition"
                  >
                    <input
                      type="checkbox"
                      checked={l[d.key]}
                      onChange={(k) =>
                        setL((S) => ({
                          ...S,
                          [d.key]: k.target.checked,
                        }))
                      }
                      className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 accent-brand-600"
                    />
                    <span>
                      {d.label} (+₹{d.bonus})
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={h}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-brand-500/25 transition flex items-center justify-center gap-2"
            >
              <span>Next</span>
              <i className="fa-solid fa-arrow-right" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
