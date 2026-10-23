import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BackToHome } from "../../components/BackToHome";
import { BrandLogo } from "../../components/BrandLogo";
import {
  brandModels,
  findSellBrand,
  sellBrandPath,
  sellPage,
} from "../../data/sellBrands";
import { modelImage, useAdminModels } from "../../data/sellModels";
import { formatPrice } from "../../lib/format";
import { OtherDeviceModal } from "./OtherDeviceModal";

export function SellBrandPage({ category }) {
  const e = sellPage(category);
  const { brand = "" } = useParams();
  const r = findSellBrand(category, brand);
  const [a, setA] = useState("");
  const [i, setI] = useState(false);
  useAdminModels();
  useEffect(() => {
    if (r) {
      document.title = `Sell Old ${r.name} ${e.noun[0].toUpperCase() + e.noun.slice(1)} | InstaCashMart`;
    }
    setA("");
    setI(false);
  }, [r, e]);
  if (!r) {
    return (
      <main>
        <BackToHome />
        <section className="max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-lg font-extrabold text-slate-900">
            Brand not found
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Pick your {e.noun}
            {e.noun.endsWith("s") ? "'" : "'s"} brand from the full list.
          </p>
          <Link
            to={e.path}
            className="inline-block mt-5 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
          >
            All {e.noun} brands
          </Link>
        </section>
      </main>
    );
  }
  const P = brandModels(category, r.key);
  const x = Math.max(0, ...P.map((w) => w.base));
  const c = a.trim().toLowerCase();
  const l = c ? P.filter((w) => w.name.toLowerCase().includes(c)) : P;
  const j = (w) =>
    `/sell?${new URLSearchParams({
      cat: category,
      brand: r.key,
      ...(w
        ? {
            model: w,
          }
        : {}),
    })}`;
  return (
    <main>
      <BackToHome />
      <section className="reveal max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-slate-500"
        >
          <Link to="/" className="hover:text-brand-700">
            Home
          </Link>
          <i className="fa-solid fa-chevron-right text-[9px] text-slate-400" />
          <Link to={e.path} className="hover:text-brand-700">
            {e.crumb}
          </Link>
          <i className="fa-solid fa-chevron-right text-[9px] text-slate-400" />
          <span className="text-slate-900">{r.name}</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 mt-5">
          <div className="w-36 h-24 shrink-0 rounded-2xl border border-slate-200 bg-white flex items-center justify-center p-3">
            <BrandLogo brand={r} large />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Sell your old {r.name} {e.noun}
            </h1>
            <p className="text-sm text-slate-500 mt-1">{r.tagline}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                {P.length} models
              </span>
              <span className="px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-xs font-bold text-brand-700">
                Up to {formatPrice(x)}
              </span>
            </div>
          </div>
          <Link
            to={j()}
            className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold transition"
          >
            Get exact quote <i className="fa-solid fa-arrow-right text-xs" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100 text-xs text-slate-600">
          <p className="flex items-center gap-2">
            <i className="fa-solid fa-truck-fast text-brand-600" /> Free
            doorstep pickup
          </p>
          <p className="flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-brand-600" /> Certified
            data wipe
          </p>
          <p className="flex items-center gap-2">
            <i className="fa-solid fa-bolt text-brand-600" /> Instant UPI / bank
            payment
          </p>
        </div>
      </section>
      <section
        className="max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        aria-label={`${r.name} models`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
            Select your {r.name} model
          </h2>
          <div className="relative w-full sm:w-72">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="search"
              value={a}
              onChange={(w) => setA(w.target.value)}
              placeholder={`Search ${r.name} models`}
              aria-label={`Search ${r.name} models`}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
        {l.length ? (
          <div className="reveal-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {l.map((w) => (
              <div
                key={w.name}
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-brand-500 hover:shadow-md transition"
              >
                <span className="w-16 h-16 shrink-0 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden p-1.5">
                  <img
                    src={modelImage(category, w.name)}
                    alt={w.name}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                    {w.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Get up to{" "}
                    <span className="font-extrabold text-brand-700">
                      {formatPrice(w.base)}
                    </span>
                  </p>
                </div>
                <Link
                  to={j(w.name)}
                  className="shrink-0 px-4 py-2 rounded-lg bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold transition"
                >
                  Sell
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              No {r.name} model matches “{a}”.
            </p>
            <button
              type="button"
              onClick={() => setI(true)}
              className="mt-3 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-sm font-bold text-white transition"
            >
              Add it as another model
            </button>
          </div>
        )}
        {i && (
          <OtherDeviceModal
            key={r.key}
            category={category}
            fixedBrand={r.name}
            initialModel={l.length ? "" : a.trim()}
            onClose={() => setI(false)}
          />
        )}
        {!i && (
          <p className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
            Don't see your model?{" "}
            <button
              type="button"
              onClick={() => setI(true)}
              className="font-bold text-brand-700 hover:text-brand-800"
            >
              Type your {r.name} model
            </button>
          </p>
        )}
      </section>
      <section
        className="reveal max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        aria-label="Other brands"
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-sm font-extrabold text-slate-900">
            Other {e.noun} brands
          </h2>
          <Link
            to={e.path}
            className="text-xs font-bold text-brand-700 hover:text-brand-800"
          >
            All brands <i className="fa-solid fa-arrow-right text-[10px]" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2">
          {e.brands
            .filter((w) => w.key !== r.key)
            .map((w) => (
              <Link
                key={w.key}
                to={sellBrandPath(category, w)}
                aria-label={w.name}
                className="shrink-0 w-28 h-16 rounded-xl border border-slate-200 hover:border-brand-500 bg-white flex items-center justify-center px-3 transition"
              >
                <BrandLogo brand={w} />
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
