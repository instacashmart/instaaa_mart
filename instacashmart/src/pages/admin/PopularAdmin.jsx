import { useRef, useState } from "react";
import { SHOP_CATEGORIES } from "../../data/accessories";
import { formatPrice } from "../../lib/format";
import { resizeImage } from "../../lib/image";
import { store } from "../../lib/store";
import { EmptyState, adminInputClass } from "./shared";

const EMPTY_POPULAR = {
  id: "",
  name: "",
  category: SHOP_CATEGORIES[0].key,
  price: "",
  mrp: "",
  image: "",
};

export function PopularAdmin({ popular, showToast }) {
  const [t, setT] = useState(EMPTY_POPULAR);
  const aRef = useRef(null);
  const nRef = useRef(null);
  const i = !!t.id;
  const f = (u) => (H) =>
    setT((K) => ({
      ...K,
      [u]: H.target.value,
    }));
  const P = () => {
    setT(EMPTY_POPULAR);
    if (aRef.current) {
      aRef.current.value = "";
    }
  };
  const x = async (u) => {
    const H = u.target.files && u.target.files[0];
    if (H) {
      try {
        const K = await resizeImage(H);
        setT((R) => ({
          ...R,
          image: K,
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
    setT((u) => ({
      ...u,
      image: "",
    }));
  };
  const l = (u) => {
    u.preventDefault();
    const H = {
      name: t.name.trim(),
      category: t.category,
      price: Number(t.price),
      mrp: Number(t.mrp) || Number(t.price),
      image: t.image.trim(),
    };
    if (
      !(i
        ? store.update("popular", t.id, H)
        : store.add("popular", {
            id: store.newId("PA"),
            createdAt: new Date().toISOString(),
            ...H,
          }))
    ) {
      showToast(
        "Could not save: browser storage is full or blocked. Try a smaller photo.",
      );
      return;
    }
    showToast(i ? "Popular accessory updated" : "Added to Popular Accessories");
    P();
  };
  const j = (u) => {
    setT({
      id: u.id,
      name: u.name,
      category: u.category,
      price: u.price,
      mrp: u.mrp || "",
      image: u.image || "",
    });
    if (aRef.current) {
      aRef.current.value = "";
    }
    nRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const w = (u) => {
    if (window.confirm(`Remove "${u.name}" from Popular Accessories?`)) {
      store.remove("popular", u.id);
      if (t.id === u.id) {
        P();
      }
      showToast("Removed from Popular Accessories");
    }
  };
  const F = () => {
    if (
      window.confirm(
        "Restore the default top-rated accessories? This will replace your current list.",
      )
    ) {
      store.resetPopular();
      P();
      showToast("Restored default popular accessories");
    }
  };
  const p = SHOP_CATEGORIES.find((u) => u.key === t.category);
  return (
    <section className="space-y-4">
      <form
        ref={nRef}
        onSubmit={l}
        className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 space-y-4"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {i ? "Edit Popular Accessory" : "Add Popular Accessory"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Shown in the Popular accessories rail on the homepage. Customers
              can buy it from there.
            </p>
          </div>
          {i && (
            <button
              type="button"
              onClick={P}
              className="text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              Cancel edit
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label
              htmlFor="popularName"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Product name *
            </label>
            <input
              id="popularName"
              required
              value={t.name}
              onChange={f("name")}
              placeholder="e.g. Apple AirPods Pro (2nd Gen)"
              className={adminInputClass}
            />
          </div>
          <div>
            <label
              htmlFor="popularCategory"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Category *
            </label>
            <select
              id="popularCategory"
              required
              value={t.category}
              onChange={f("category")}
              className={adminInputClass}
            >
              {SHOP_CATEGORIES.map((u) => (
                <option key={u.key} value={u.key}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="popularPrice"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Product price (₹) *
            </label>
            <input
              id="popularPrice"
              type="number"
              min="1"
              required
              value={t.price}
              onChange={f("price")}
              placeholder="e.g. 20999"
              className={adminInputClass}
            />
          </div>
          <div>
            <label
              htmlFor="popularMrp"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              MRP (₹){" "}
              <span className="text-[11px] text-slate-400 font-normal">
                (optional, shows % off)
              </span>
            </label>
            <input
              id="popularMrp"
              type="number"
              min="1"
              value={t.mrp}
              onChange={f("mrp")}
              placeholder="e.g. 24900"
              className={adminInputClass}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="popularImage"
            className="block text-xs font-bold text-slate-700 mb-1"
          >
            Product image
          </label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 shrink-0 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden text-slate-400">
              {t.image ? (
                <img
                  src={t.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <i className={`fa-solid ${p ? p.icon : "fa-image"} text-2xl`} />
              )}
            </div>
            <div className="space-y-1.5 min-w-0 flex-1">
              <input
                ref={aRef}
                id="popularImage"
                type="file"
                accept="image/*"
                onChange={x}
                className="block max-w-full text-xs text-slate-600 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-slate-900 file:text-white file:text-xs file:font-bold"
              />
              <input
                type="text"
                value={t.image.startsWith("data:") ? "" : t.image}
                onChange={f("image")}
                aria-label="Image URL"
                placeholder="Or paste direct image URL (e.g. https://...)"
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="button"
                onClick={c}
                className="text-[11px] font-bold text-slate-500 hover:text-slate-900"
              >
                Remove photo
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-6 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-3 rounded-xl transition"
        >
          {i ? "Save Changes" : "Add to Popular Accessories"}
        </button>
      </form>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Current Popular Accessories
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Shown on the homepage in this order. Use the arrows to reorder.
            </p>
          </div>
          <button
            type="button"
            onClick={F}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 transition"
          >
            <i className="fa-solid fa-rotate-left text-[11px]" />
            Restore Defaults
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {popular.length ? (
            popular.map((u, H) => {
              const K = SHOP_CATEGORIES.find((R) => R.key === u.category);
              return (
                <article
                  key={u.id}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3"
                >
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={H === 0}
                      onClick={() => store.move("popular", u.id, -1)}
                      aria-label="Move up"
                      className="w-7 h-7 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <i className="fa-solid fa-chevron-up text-[10px]" />
                    </button>
                    <button
                      type="button"
                      disabled={H === popular.length - 1}
                      onClick={() => store.move("popular", u.id, 1)}
                      aria-label="Move down"
                      className="w-7 h-7 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <i className="fa-solid fa-chevron-down text-[10px]" />
                    </button>
                  </div>
                  <div className="w-16 h-16 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                    {u.image ? (
                      <img
                        src={u.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <i
                        className={`fa-solid ${K ? K.icon : "fa-box"} text-xl text-slate-500`}
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3
                      className="text-sm font-bold text-slate-900 truncate"
                      title={u.name}
                    >
                      {u.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate">
                      {K ? K.label : u.category}
                    </p>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {formatPrice(u.price)}{" "}
                      {u.mrp && Number(u.mrp) > Number(u.price) && (
                        <span className="text-[11px] font-medium text-slate-400 line-through">
                          {formatPrice(u.mrp)}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => j(u)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 hover:border-slate-900"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => w(u)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-red-600 hover:border-red-300"
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
                No popular accessories. The homepage rail is hidden until you
                add one or restore the defaults.
              </EmptyState>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
