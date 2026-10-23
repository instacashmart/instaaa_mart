import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BackToHome } from "../../components/BackToHome";
import { SELL_CATALOG, sellCategory } from "../../data/sellCatalog";
import { modelImage, useAdminModels } from "../../data/sellModels";
import { topBrand } from "../../data/topBrands";
import { formatPrice } from "../../lib/format";

export function BrandPage() {
  const { brand = "" } = useParams();
  const e = topBrand(brand);
  useAdminModels();
  const t = Object.entries(SELL_CATALOG)
    .filter(([, i]) => i.models[brand])
    .map(([i, f]) => ({
      key: i,
      models: f.models[brand],
    }));
  useEffect(() => {
    if (e) {
      document.title = `Sell ${e.name} | InstaCashMart`;
    }
  }, [e]);
  if (!e || !t.length) {
    return (
      <main>
        <BackToHome />
        <section className="max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-lg font-extrabold text-slate-900">
              Brand not found
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Pick a brand from the full list.
            </p>
            <Link
              to="/brands"
              className="inline-block mt-5 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              View All Brands
            </Link>
          </div>
        </section>
      </main>
    );
  }
  const r = t.flatMap((i) => i.models);
  const a = Math.max(...r.map((i) => i.base));
  const n = (key, f) =>
    `/sell?${new URLSearchParams({
      cat: key,
      brand,
      ...(f
        ? {
            model: f,
          }
        : {}),
    })}`;
  return (
    <main>
      <BackToHome />
      <section className="reveal-group max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <div className="w-32 h-20 shrink-0 rounded-2xl border border-slate-200 bg-white flex items-center justify-center p-3">
              {e.logo ? (
                <img
                  src={e.logo}
                  alt={`${e.name} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <i className={`fa-solid ${e.icon} text-4xl text-slate-800`} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Sell your {e.name}
              </h1>
              <p className="text-sm text-slate-500 mt-1">{e.tagline}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                  {r.length} models
                </span>
                <span className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                  {t.length} device {t.length === 1 ? "type" : "types"}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-xs font-bold text-brand-700">
                  Up to {formatPrice(a)}
                </span>
              </div>
            </div>
            <Link
              to={n(t[0].key)}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold transition"
            >
              Sell {e.name} <i className="fa-solid fa-arrow-right text-xs" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100 text-xs text-slate-600">
            <p className="flex items-center gap-2">
              <i className="fa-solid fa-truck-fast text-brand-600" /> Free
              doorstep pickup
            </p>
            <p className="flex items-center gap-2">
              <i className="fa-solid fa-shield-halved text-brand-600" />{" "}
              Certified data wipe
            </p>
            <p className="flex items-center gap-2">
              <i className="fa-solid fa-bolt text-brand-600" /> Instant UPI /
              bank payment
            </p>
          </div>
        </div>
        {t.map((i) => {
          const f = sellCategory(i.key);
          return (
            <div
              key={i.key}
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <h2 className="flex items-center gap-2 text-base sm:text-lg font-extrabold text-slate-900">
                <span className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-sm">
                  <i className={`fa-solid ${f.icon}`} />
                </span>
                {f.label}
                <span className="text-xs font-semibold text-slate-400">
                  {i.models.length}
                </span>
              </h2>
              <div className="reveal-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                {i.models.map((P) => (
                  <div
                    key={P.name}
                    className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-brand-500 hover:shadow-md transition"
                  >
                    <span className="w-16 h-16 shrink-0 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden p-1.5">
                      <img
                        src={modelImage(i.key, P.name)}
                        alt={P.name}
                        loading="lazy"
                        className="w-full h-full object-contain"
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {P.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Get up to{" "}
                        <span className="font-extrabold text-brand-700">
                          {formatPrice(P.base)}
                        </span>
                      </p>
                    </div>
                    <Link
                      to={n(i.key, P.name)}
                      className="shrink-0 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
                    >
                      Sell
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <Link
          to="/brands"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800"
        >
          <i className="fa-solid fa-arrow-left text-xs" /> All brands
        </Link>
      </section>
    </main>
  );
}
