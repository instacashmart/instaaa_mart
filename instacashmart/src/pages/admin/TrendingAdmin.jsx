import { useRef, useState } from "react";
import { CATEGORY_IMAGES, DEVICE_CATEGORIES } from "../../data/site";
import { formatPrice } from "../../lib/format";
import { resizeImage } from "../../lib/image";
import { store } from "../../lib/store";
import { EmptyState, adminInputClass } from "./shared";

const EMPTY_TRENDING = {
  id: "",
  name: "",
  category: "phone",
  brand: "",
  model: "",
  specs: "",
  price: "",
  badge: "🔥 Hot Selling",
  image: "",
};

const TRENDING_BRANDS = [
  "Apple",
  "Samsung",
  "OnePlus",
  "Xiaomi",
  "Redmi",
  "POCO",
  "Vivo",
  "Oppo",
  "Realme",
  "Motorola",
  "Nothing",
  "Google",
  "Sony",
  "PlayStation",
  "Nintendo",
  "Dell",
  "HP",
  "Lenovo",
  "Asus",
  "Acer",
  "MSI",
  "Bose",
  "JBL",
  "boAt",
  "Nikon",
  "Canon",
  "Fujifilm",
];

const BADGE_OPTIONS = [
  {
    label: "🔥 Hot Selling",
    badgeClass: "text-amber-700 bg-amber-50",
  },
  {
    label: "💎 High Value",
    badgeClass: "text-brand-700 bg-brand-50",
  },
  {
    label: "⚡ Top Resale",
    badgeClass: "text-emerald-700 bg-emerald-50",
  },
  {
    label: "💻 Top Laptop",
    badgeClass: "text-slate-900 bg-slate-100",
  },
  {
    label: "🎮 Gaming",
    badgeClass: "text-purple-700 bg-purple-50",
  },
  {
    label: "⭐ Best Seller",
    badgeClass: "text-blue-700 bg-blue-50",
  },
];

export function TrendingAdmin({ trending, showToast }) {
  const [t, setT] = useState(EMPTY_TRENDING);
  const aRef = useRef(null);
  const nRef = useRef(null);
  const i = !!t.id;
  const f = (K) => (R) =>
    setT((U) => ({
      ...U,
      [K]: R.target.value,
    }));
  const P = () => {
    setT(EMPTY_TRENDING);
    if (aRef.current) {
      aRef.current.value = "";
    }
  };
  const x = async (K) => {
    const R = K.target.files && K.target.files[0];
    if (R) {
      try {
        const U = await resizeImage(R, 600);
        setT((B) => ({
          ...B,
          image: U,
        }));
      } catch {
        showToast("Could not read that image.");
      }
    }
  };
  const c = () => {
    if (aRef.current) {
      aRef.current.value = "";
    }
    setT((K) => ({
      ...K,
      image: "",
    }));
  };
  const l = (K) => {
    K.preventDefault();
    const R = t.name.trim();
    if (!R) {
      showToast("Please enter a product name");
      return;
    }
    const U = t.category || "phone";
    const B = t.brand.trim() || "Other";
    const h = t.model.trim() || R;
    const d = Number(t.price);
    if (!d || d <= 0) {
      showToast("Please enter a valid price");
      return;
    }
    const k = BADGE_OPTIONS.find((Z) => Z.label === t.badge.trim());
    const badgeClass = k ? k.badgeClass : "text-amber-700 bg-amber-50";
    const g = DEVICE_CATEGORIES.find((Z) => Z.key === U);
    const icon = g?.icon || "fa-mobile-screen";
    const J = {
      name: R,
      cat: U,
      category: U,
      brand: B,
      model: h,
      specs: t.specs.trim(),
      price: d,
      badge: t.badge.trim(),
      badgeClass,
      image: t.image.trim(),
      icon,
    };
    if (
      !(i
        ? store.update("trending", t.id, J)
        : store.add("trending", {
            id: store.newId("TD"),
            createdAt: new Date().toISOString(),
            ...J,
          }))
    ) {
      showToast(
        "Could not save: browser storage is full or blocked. Try a smaller photo.",
      );
      return;
    }
    showToast(
      i ? "Trending device updated" : "Device added to Trending Devices",
    );
    P();
  };
  const j = (K) => {
    setT({
      id: K.id || "",
      name: K.name || "",
      category: K.cat || K.category || "phone",
      brand: K.brand || "",
      model: K.model || "",
      specs: K.specs || "",
      price: K.price || "",
      badge: K.badge || "🔥 Hot Selling",
      image: K.image || "",
    });
    if (aRef.current) {
      aRef.current.value = "";
    }
    nRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const w = (K) => {
    if (window.confirm(`Delete "${K.name}" from Trending Devices?`)) {
      store.remove("trending", K.id);
      if (t.id === K.id) {
        P();
      }
      showToast("Device removed from Trending");
    }
  };
  const F = () => {
    if (
      window.confirm(
        "Restore default 4 trending devices? This will replace your current list.",
      )
    ) {
      store.resetTrending();
      P();
      showToast("Restored default trending devices");
    }
  };
  const p = DEVICE_CATEGORIES.find((K) => K.key === (t.category || "phone"));
  const u = CATEGORY_IMAGES[t.category || "phone"];
  const H = t.image || u;
  return (
    <section className="space-y-4">
      <form
        ref={nRef}
        onSubmit={l}
        className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {i ? "Edit Trending Device" : "Add Trending Device"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              High-demand models shown on the homepage with highest resale quote
              values.
            </p>
          </div>
          {i && (
            <button
              type="button"
              onClick={P}
              className="self-start sm:self-auto text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg transition"
            >
              Cancel edit
            </button>
          )}
        </div>
        <datalist id="brand-suggestions">
          {TRENDING_BRANDS.map((K) => (
            <option key={K} value={K} />
          ))}
        </datalist>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label
              htmlFor="trendingName"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Product Name *
            </label>
            <input
              id="trendingName"
              required
              value={t.name}
              onChange={f("name")}
              placeholder="e.g. Apple iPhone 16 Pro Max, Samsung Galaxy S24 Ultra"
              className={adminInputClass}
            />
          </div>
          <div>
            <label
              htmlFor="trendingCategory"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Device Category *
            </label>
            <select
              id="trendingCategory"
              required
              value={t.category}
              onChange={f("category")}
              className={adminInputClass}
            >
              {DEVICE_CATEGORIES.map((K) => (
                <option key={K.key} value={K.key}>
                  {K.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="trendingBrand"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Brand *
            </label>
            <input
              id="trendingBrand"
              required
              list="brand-suggestions"
              value={t.brand}
              onChange={f("brand")}
              placeholder="e.g. Apple, Samsung, Sony, OnePlus"
              className={adminInputClass}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="trendingPrice"
                className="block text-xs font-bold text-slate-700"
              >
                Resale Price (₹) *
              </label>
              {t.price && Number(t.price) > 0 && (
                <span className="text-xs font-bold text-brand-600">
                  Preview: Get Up To {formatPrice(t.price)}
                </span>
              )}
            </div>
            <input
              id="trendingPrice"
              type="number"
              min="1"
              required
              value={t.price}
              onChange={f("price")}
              placeholder="e.g. 84500"
              className={adminInputClass}
            />
          </div>
          <div>
            <label
              htmlFor="trendingSpecs"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Short Specs
            </label>
            <input
              id="trendingSpecs"
              value={t.specs}
              onChange={f("specs")}
              placeholder="e.g. 256 GB / 512 GB / 1 TB or 16GB RAM • 512GB"
              className={adminInputClass}
            />
          </div>
          <div>
            <label
              htmlFor="trendingModel"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Model Identifier{" "}
              <span className="text-[11px] text-slate-400 font-normal">
                (for calculator link, optional)
              </span>
            </label>
            <input
              id="trendingModel"
              value={t.model}
              onChange={f("model")}
              placeholder="e.g. iPhone 16 Pro Max (defaults to product name)"
              className={adminInputClass}
            />
          </div>
          <div>
            <label
              htmlFor="trendingBadge"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Highlight Badge
            </label>
            <input
              id="trendingBadge"
              value={t.badge}
              onChange={f("badge")}
              placeholder="e.g. 🔥 Hot Selling, High Value"
              className={adminInputClass}
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {BADGE_OPTIONS.map((K) => (
                <button
                  key={K.label}
                  type="button"
                  onClick={() =>
                    setT((R) => ({
                      ...R,
                      badge: K.label,
                    }))
                  }
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition ${t.badge === K.label ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"}`}
                >
                  {K.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Product Image
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-24 h-24 shrink-0 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden p-2">
              {H ? (
                <img
                  src={H}
                  alt="Product preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <i
                  className={`fa-solid ${p?.icon || "fa-image"} text-3xl text-slate-400`}
                />
              )}
            </div>
            <div className="space-y-2 flex-1 w-full min-w-0">
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                <input
                  ref={aRef}
                  id="trendingPhoto"
                  type="file"
                  accept="image/*"
                  onChange={x}
                  className="block max-w-full text-xs text-slate-600 file:mr-3 file:px-3 file:py-2 file:rounded-xl file:border-0 file:bg-slate-900 file:text-white file:text-xs file:font-bold hover:file:bg-slate-800 cursor-pointer"
                />
                {t.image && (
                  <button
                    type="button"
                    onClick={c}
                    className="text-xs font-bold text-red-600 hover:text-red-700 px-2 py-1 rounded-lg border border-red-200 bg-red-50"
                  >
                    Remove custom photo
                  </button>
                )}
              </div>
              <div>
                <input
                  type="text"
                  value={t.image}
                  onChange={f("image")}
                  placeholder="Or paste direct image URL (e.g. https://...)"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Upload a transparent or white background product photo for best
                presentation on the homepage. If left empty, the{" "}
                {p?.label || "device"} category image will be displayed.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl transition shadow-sm"
          >
            {i ? "Save Changes" : "Add Trending Device"}
          </button>
          {i && (
            <button
              type="button"
              onClick={P}
              className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Current Trending Devices
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
                {trending.length} live
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              These devices are featured on the homepage in high-demand resale
              value section.
            </p>
          </div>
          <button
            type="button"
            onClick={F}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 transition"
          >
            <i className="fa-solid fa-rotate-left text-[11px]" />
            Restore Default Devices
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {trending.length ? (
            trending.map((K) => {
              const R = DEVICE_CATEGORIES.find(
                (h) => h.key === (K.cat || K.category),
              );
              const U = CATEGORY_IMAGES[K.cat || K.category];
              const B = K.image || U;
              return (
                <article
                  key={K.id || K.name}
                  className="flex items-center gap-3.5 rounded-2xl border border-slate-200 p-3.5 hover:border-brand-300 transition bg-white"
                >
                  <div className="w-20 h-20 shrink-0 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden p-1.5">
                    {B ? (
                      <img
                        src={B}
                        alt={K.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <i
                        className={`fa-solid ${K.icon || "fa-mobile-screen"} text-2xl text-slate-400`}
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {K.brand}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-200">
                        {R?.label || K.cat || K.category}
                      </span>
                      {K.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${K.badgeClass || "text-amber-700 bg-amber-50"}`}
                        >
                          {K.badge}
                        </span>
                      )}
                    </div>
                    <h3
                      className="text-sm font-bold text-slate-900 truncate"
                      title={K.name}
                    >
                      {K.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate">
                      {K.specs || `${K.brand} • ${K.model || K.name}`}
                    </p>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-[11px] text-slate-400">
                        Get Up To
                      </span>
                      <span className="text-sm font-extrabold text-brand-600">
                        {formatPrice(K.price)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => j(K)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => w(K)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-red-600 hover:border-red-300 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="md:col-span-2">
              <EmptyState>
                No trending devices configured. Add one with the form above or
                click "Restore Default Devices".
              </EmptyState>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
