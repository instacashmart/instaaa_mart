import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BackToHome } from "../../components/BackToHome";
import { BrandLogo } from "../../components/BrandLogo";
import { brandModels, sellBrandPath, sellPage } from "../../data/sellBrands";
import { useAdminModels } from "../../data/sellModels";
import { formatPrice } from "../../lib/format";
import { OtherDeviceModal } from "./OtherDeviceModal";

export function SellCategoryPage({ category }) {
  const e = sellPage(category);
  const [t, setT] = useState("");
  const [a, setA] = useState(false);
  const i = useAdminModels();
  const f = useMemo(
    () =>
      e.brands.map((j) => {
        const w = brandModels(category, j.key);
        return {
          ...j,
          count: w.length,
          top: Math.max(0, ...w.map((F) => F.base)),
        };
      }),
    [e, category, i],
  );
  const P = f.reduce((acc, item) => acc + item.count, 0);
  const x = Math.max(...f.map((j) => j.top));
  const c = t.trim().toLowerCase();
  const l = c
    ? f.filter(
        (j) =>
          j.name.toLowerCase().includes(c) ||
          brandModels(category, j.key).some((w) =>
            w.name.toLowerCase().includes(c),
          ),
      )
    : f;
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
          <span className="text-slate-900">{e.crumb}</span>
        </nav>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mt-4">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Sell your old {e.noun}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Choose your {e.noun}
              {e.noun.endsWith("s") ? "'" : "'s"} brand to see the models we buy
              and their best prices
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                {f.length} brands
              </span>
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                {P} models
              </span>
              <span className="px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-xs font-bold text-brand-700">
                Up to {formatPrice(x)}
              </span>
            </div>
          </div>
          <div className="relative w-full lg:w-80">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="search"
              value={t}
              onChange={(j) => setT(j.target.value)}
              placeholder={`Brand or model, ${e.searchHint}`}
              aria-label="Search brand or model"
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
      </section>
      <section
        className="max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8"
        aria-label={`${e.noun} brands`}
      >
        {l.length ? (
          <div className="reveal-group grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {l.map((j) => (
              <Link
                key={j.key}
                to={sellBrandPath(category, j)}
                className="group flex flex-col items-center text-center p-4 rounded-2xl border border-slate-200 bg-white hover:border-brand-500 hover:shadow-md transition"
              >
                <span className="h-14 w-full flex items-center justify-center group-hover:scale-105 transition">
                  <BrandLogo brand={j} />
                </span>
                <span className="mt-3 text-sm font-bold text-slate-900 group-hover:text-brand-700 transition">
                  {j.name}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  {j.count} models
                </span>
                <span className="mt-2 text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full">
                  Up to {formatPrice(j.top)}
                </span>
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setA(true)}
              aria-expanded={a}
              className={`group flex flex-col items-center justify-center text-center p-4 rounded-2xl border-2 border-dashed transition ${a ? "border-brand-500 bg-brand-50/60" : "border-slate-300 bg-slate-50/60 hover:border-brand-500 hover:bg-brand-50/40"}`}
            >
              <span className="h-14 w-full flex items-center justify-center">
                <span className="w-11 h-11 rounded-full bg-white border border-slate-200 text-brand-600 flex items-center justify-center text-lg group-hover:scale-105 transition">
                  <i className="fa-solid fa-pen-to-square" />
                </span>
              </span>
              <span className="mt-3 text-sm font-bold text-slate-900 group-hover:text-brand-700 transition">
                Others
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                Type brand & model
              </span>
              <span className="mt-2 text-[11px] font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full">
                Price on inspection
              </span>
            </button>
          </div>
        ) : (
          <div className="py-10 text-center">
            <p className="text-base font-extrabold text-slate-900">
              No brand or model matches “{t}”
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Check the spelling, or type your brand and model below.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setA(true)}
                className="px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-sm font-bold text-white transition"
              >
                Type brand & model
              </button>
              <button
                type="button"
                onClick={() => setT("")}
                className="px-5 py-2.5 rounded-full border border-slate-900 text-sm font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition"
              >
                Show all brands
              </button>
            </div>
          </div>
        )}
        {a && (
          <OtherDeviceModal
            key={category}
            category={category}
            initialBrand={l.length ? "" : t.trim()}
            onClose={() => setA(false)}
          />
        )}
        {!a && (
          <p className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
            Can't find your brand?{" "}
            <button
              type="button"
              onClick={() => setA(true)}
              className="font-bold text-brand-700 hover:text-brand-800"
            >
              Type your brand and model
            </button>
          </p>
        )}
      </section>
    </main>
  );
}
