import { useRef, useState } from "react";
import { brandName } from "../../data/sellBrands";
import { SELL_CATALOG, SELL_CATEGORIES } from "../../data/sellCatalog";
import { builtInModels, modelImage } from "../../data/sellModels";
import { formatPrice } from "../../lib/format";
import { resizeImage } from "../../lib/image";
import { store } from "../../lib/store";
import { EmptyState, adminInputClass } from "./shared";

const EMPTY_MODEL = {
  id: "",
  name: "",
  base: "",
  image: "",
};

export function SellModelsAdmin({ adminModels, showToast }) {
  const [t, setT] = useState("phone");
  const [a, setA] = useState(SELL_CATALOG.phone.brands[0]);
  const [i, setI] = useState(EMPTY_MODEL);
  const PRef = useRef(null);
  const xRef = useRef(null);
  const c = (g) => (Q) =>
    setI((J) => ({
      ...J,
      [g]: Q.target.value,
    }));
  const brands = SELL_CATALOG[t].brands;
  const j = SELL_CATALOG[t].models[a] || [];
  const w = builtInModels(t, a);
  const F = (g) =>
    w.some((Q) => Q.name.toLowerCase() === String(g).trim().toLowerCase());
  const p = (g) =>
    adminModels.find(
      (Q) =>
        Q.category === t &&
        Q.brand === a &&
        Q.name.toLowerCase() === String(g).trim().toLowerCase(),
    );
  const u = () => {
    setI(EMPTY_MODEL);
    if (PRef.current) {
      PRef.current.value = "";
    }
  };
  const H = (g) => {
    setT(g);
    setA(SELL_CATALOG[g].brands[0]);
    u();
  };
  const K = async (g) => {
    const Q = g.target.files && g.target.files[0];
    if (Q) {
      try {
        const J = await resizeImage(Q, 400);
        setI((V) => ({
          ...V,
          image: J,
        }));
      } catch {
        showToast("Could not read that image.");
      }
    }
  };
  const R = (g) => {
    g.preventDefault();
    const Q = i.name.trim();
    const base = Number(i.base);
    if (!Q || !base) {
      return;
    }
    const V = {
      category: t,
      brand: a,
      name: Q,
      base,
      image: i.image.trim(),
    };
    const Z = i.id ? adminModels.find((ue) => ue.id === i.id) : p(Q);
    if (
      !(Z
        ? store.update("sellModels", Z.id, V)
        : store.add("sellModels", {
            id: store.newId("SM"),
            createdAt: new Date().toISOString(),
            ...V,
          }))
    ) {
      showToast(
        "Could not save: browser storage is full or blocked. Try a smaller photo.",
      );
      return;
    }
    showToast(F(Q) ? `${Q} updated` : `${Q} added to ${brandName(t, a)}`);
    u();
  };
  const U = (g) => {
    const Q = g.adminId ? adminModels.find((V) => V.id === g.adminId) : null;
    setI({
      id: Q?.id || "",
      name: g.name,
      base: g.base,
      image: Q?.image || "",
    });
    if (PRef.current) {
      PRef.current.value = "";
    }
    xRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const B = (g) => {
    const Q = F(g.name);
    if (
      window.confirm(
        Q
          ? `Undo your changes to ${g.name}? It goes back to its original price and photo.`
          : `Remove ${g.name} from the sell pages?`,
      )
    ) {
      store.remove("sellModels", g.adminId);
      if (i.id === g.adminId) {
        u();
      }
      showToast(Q ? `${g.name} restored` : `${g.name} removed`);
    }
  };
  const h = i.image || (i.name.trim() ? modelImage(t, i.name) : "");
  const d = i.name.trim() && (i.id || F(i.name));
  return (
    <section className="space-y-4">
      <form
        ref={xRef}
        onSubmit={R}
        className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 space-y-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {d ? "Edit Sell Model" : "Add Sell Model"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Shows on the brand page, in the Sell calculator and in search.
              Using an existing model's name updates its price and photo.
            </p>
          </div>
          {i.name && (
            <button
              type="button"
              onClick={u}
              className="shrink-0 text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              Clear
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="smCategory"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Device type *
            </label>
            <select
              id="smCategory"
              value={t}
              onChange={(g) => H(g.target.value)}
              className={adminInputClass}
            >
              {SELL_CATEGORIES.filter((g) => SELL_CATALOG[g.key]).map((g) => (
                <option key={g.key} value={g.key}>
                  {g.short}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="smBrand"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Brand *
            </label>
            <select
              id="smBrand"
              value={a}
              onChange={(g) => {
                setA(g.target.value);
                u();
              }}
              className={adminInputClass}
            >
              {brands.map((g) => (
                <option key={g} value={g}>
                  {brandName(t, g)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="smName"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Model name *
            </label>
            <input
              id="smName"
              required
              list="smExisting"
              value={i.name}
              onChange={c("name")}
              placeholder={`e.g. ${j[0]?.name || "Model name"}`}
              className={adminInputClass}
            />
            <datalist id="smExisting">
              {w.map((g) => (
                <option key={g.name} value={g.name} />
              ))}
            </datalist>
            {i.name.trim() && (
              <p
                className={`text-[11px] mt-1 ${F(i.name) ? "text-amber-700" : "text-brand-700"}`}
              >
                {F(i.name)
                  ? "Existing model: saving changes its price and photo."
                  : "New model: it will be added to this brand."}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="smBase"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Max buyback price (₹) *
            </label>
            <input
              id="smBase"
              type="number"
              min="1"
              required
              value={i.base}
              onChange={c("base")}
              placeholder="e.g. 45000"
              className={adminInputClass}
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Shown as "Get up to" for a flawless device; the calculator adjusts
              for condition.
            </p>
          </div>
        </div>
        <div>
          <label
            htmlFor="smImage"
            className="block text-xs font-bold text-slate-700 mb-1"
          >
            Model photo
          </label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 shrink-0 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden p-1.5 text-slate-400">
              {h ? (
                <img src={h} alt="" className="w-full h-full object-contain" />
              ) : (
                <i className="fa-regular fa-image text-2xl" />
              )}
            </div>
            <div className="space-y-1.5 min-w-0 flex-1">
              <input
                ref={PRef}
                id="smImage"
                type="file"
                accept="image/*"
                onChange={K}
                className="block max-w-full text-xs text-slate-600 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-slate-900 file:text-white file:text-xs file:font-bold"
              />
              <input
                type="text"
                value={i.image.startsWith("data:") ? "" : i.image}
                onChange={c("image")}
                aria-label="Image URL"
                placeholder="Or paste an image link (https://...)"
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <p className="text-[11px] text-slate-400">
                {i.image ? (
                  <button
                    type="button"
                    onClick={() => {
                      setI((g) => ({
                        ...g,
                        image: "",
                      }));
                      if (PRef.current) {
                        PRef.current.value = "";
                      }
                    }}
                    className="font-bold text-slate-500 hover:text-slate-900"
                  >
                    Remove uploaded photo
                  </button>
                ) : (
                  "Without an upload, the current photo (or the device-type photo) is used."
                )}
              </p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-6 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-3 rounded-xl transition"
        >
          {d ? "Save Changes" : "Add Model"}
        </button>
      </form>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        <h2 className="text-base font-bold text-slate-900">
          {brandName(t, a)}{" "}
          {SELL_CATEGORIES.find((g) => g.key === t)?.short.toLowerCase()} models{" "}
          <span className="text-xs font-semibold text-slate-400">
            {j.length}
          </span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          In the order customers see them. Tap Edit to change a price or photo.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {j.length ? (
            j.map((g) => (
              <article
                key={g.name}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3"
              >
                <span className="w-14 h-14 shrink-0 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden p-1">
                  <img
                    src={modelImage(t, g.name)}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <h3
                    className="text-sm font-bold text-slate-900 truncate"
                    title={g.name}
                  >
                    {g.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Up to{" "}
                    <span className="font-extrabold text-brand-700">
                      {formatPrice(g.base)}
                    </span>
                  </p>
                  {g.adminId && (
                    <span
                      className={`inline-block mt-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded ${F(g.name) ? "bg-amber-50 text-amber-700" : "bg-brand-50 text-brand-700"}`}
                    >
                      {F(g.name) ? "Edited" : "Added by you"}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => U(g)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 hover:border-slate-900"
                  >
                    Edit
                  </button>
                  {g.adminId && (
                    <button
                      type="button"
                      onClick={() => B(g)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-red-600 hover:border-red-300"
                    >
                      {F(g.name) ? "Undo" : "Delete"}
                    </button>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="md:col-span-2">
              <EmptyState>
                No models for this brand yet. Add one with the form above.
              </EmptyState>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
