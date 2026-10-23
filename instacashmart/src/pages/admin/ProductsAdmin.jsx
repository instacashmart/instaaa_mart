import { useRef, useState } from "react";
import { SHOP_CATEGORIES } from "../../data/accessories";
import { formatPrice } from "../../lib/format";
import { resizeImage } from "../../lib/image";
import { store } from "../../lib/store";
import { EmptyState, adminInputClass } from "./shared";

const EMPTY_PRODUCT = {
  id: "",
  name: "",
  category: SHOP_CATEGORIES[0].key,
  brand: "",
  specs: "",
  price: "",
  mrp: "",
  image: "",
};

export function ProductsAdmin({ products, showToast }) {
  const [t, setT] = useState(EMPTY_PRODUCT);
  const aRef = useRef(null);
  const nRef = useRef(null);
  const i = !!t.id;
  const f = (F) => (p) =>
    setT((u) => ({
      ...u,
      [F]: p.target.value,
    }));
  const P = () => {
    setT(EMPTY_PRODUCT);
    if (aRef.current) {
      aRef.current.value = "";
    }
  };
  const x = async (F) => {
    const p = F.target.files && F.target.files[0];
    if (p) {
      try {
        const u = await resizeImage(p);
        setT((H) => ({
          ...H,
          image: u,
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
    setT((F) => ({
      ...F,
      image: "",
    }));
  };
  const l = (F) => {
    F.preventDefault();
    const p = {
      name: t.name.trim(),
      category: t.category,
      brand: t.brand.trim(),
      specs: t.specs.trim(),
      price: Number(t.price),
      mrp: Number(t.mrp) || Number(t.price),
      image: t.image,
    };
    if (
      !(i
        ? store.update("products", t.id, p)
        : store.add("products", {
            id: store.newId("P"),
            createdAt: new Date().toISOString(),
            ...p,
          }))
    ) {
      showToast(
        "Could not save: browser storage is full or blocked. Try a smaller photo.",
      );
      return;
    }
    showToast(i ? "Product updated" : "Product added to Buy Accessories");
    P();
  };
  const j = (F) => {
    setT({
      id: F.id,
      name: F.name,
      category: F.category,
      brand: F.brand,
      specs: F.specs || "",
      price: F.price,
      mrp: F.mrp || "",
      image: F.image || "",
    });
    if (aRef.current) {
      aRef.current.value = "";
    }
    nRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const w = (F) => {
    if (window.confirm(`Delete "${F.name}"?`)) {
      store.remove("products", F.id);
      if (t.id === F.id) {
        P();
      }
      showToast("Product deleted");
    }
  };
  return (
    <section className="space-y-4">
      <form
        ref={nRef}
        onSubmit={l}
        className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 space-y-4"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-bold text-slate-900">
            {i ? "Edit Product" : "Add Product"}
          </h2>
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
          <div>
            <label
              htmlFor="productName"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Product name *
            </label>
            <input
              id="productName"
              required
              value={t.name}
              onChange={f("name")}
              placeholder="e.g. Anker 65W GaN Charger"
              className={adminInputClass}
            />
          </div>
          <div>
            <label
              htmlFor="productCategory"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Category *
            </label>
            <select
              id="productCategory"
              required
              value={t.category}
              onChange={f("category")}
              className={adminInputClass}
            >
              {SHOP_CATEGORIES.map((F) => (
                <option key={F.key} value={F.key}>
                  {F.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="productBrand"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Brand *
            </label>
            <input
              id="productBrand"
              required
              value={t.brand}
              onChange={f("brand")}
              placeholder="e.g. Anker"
              className={adminInputClass}
            />
          </div>
          <div>
            <label
              htmlFor="productSpecs"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Short specs
            </label>
            <input
              id="productSpecs"
              value={t.specs}
              onChange={f("specs")}
              placeholder="e.g. 65 W • USB-C • GaN"
              className={adminInputClass}
            />
          </div>
          <div>
            <label
              htmlFor="productPrice"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Selling price (₹) *
            </label>
            <input
              id="productPrice"
              type="number"
              min="1"
              required
              value={t.price}
              onChange={f("price")}
              placeholder="e.g. 2499"
              className={adminInputClass}
            />
          </div>
          <div>
            <label
              htmlFor="productMrp"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              MRP (₹)
            </label>
            <input
              id="productMrp"
              type="number"
              min="1"
              value={t.mrp}
              onChange={f("mrp")}
              placeholder="e.g. 3999"
              className={adminInputClass}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="productImage"
            className="block text-xs font-bold text-slate-700 mb-1"
          >
            Photo
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
                <i className="fa-regular fa-image text-2xl" />
              )}
            </div>
            <div className="space-y-1.5 min-w-0">
              <input
                ref={aRef}
                id="productImage"
                type="file"
                accept="image/*"
                onChange={x}
                className="block max-w-full text-xs text-slate-600 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-slate-900 file:text-white file:text-xs file:font-bold"
              />
              <button
                type="button"
                onClick={c}
                className="text-[11px] font-bold text-slate-500 hover:text-slate-900"
              >
                Remove photo
              </button>
              <p className="text-[11px] text-slate-400">
                Without a photo, the category icon is shown.
              </p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-6 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-3 rounded-xl transition"
        >
          {i ? "Save Changes" : "Add Product"}
        </button>
      </form>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        <h2 className="text-base font-bold text-slate-900">Added Products</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          These appear in Buy Accessories.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {products.length ? (
            products.map((F) => {
              const p = SHOP_CATEGORIES.find((u) => u.key === F.category);
              return (
                <article
                  key={F.id}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3"
                >
                  <div className="w-16 h-16 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                    {F.image ? (
                      <img
                        src={F.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <i
                        className={`fa-solid ${p ? p.icon : "fa-box"} text-xl text-slate-500`}
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {F.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate">
                      {F.brand} • {p ? p.label : F.category}
                      {F.specs ? ` • ${F.specs}` : ""}
                    </p>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {formatPrice(F.price)}{" "}
                      {F.mrp && Number(F.mrp) > Number(F.price) && (
                        <span className="text-[11px] font-medium text-slate-400 line-through">
                          {formatPrice(F.mrp)}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => j(F)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 hover:border-slate-900"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => w(F)}
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
                No products added yet. Use the form above.
              </EmptyState>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
