import { Link } from "react-router-dom";
import { BackToHome } from "../../components/BackToHome";
import { BrandLogo } from "../../components/BrandLogo";
import { SELL_PAGES, sellCategoryPath } from "../../data/sellBrands";
import { SELL_CATALOG, SELL_CATEGORIES } from "../../data/sellCatalog";
import { useAdminModels } from "../../data/sellModels";
import { formatPrice } from "../../lib/format";

const BRANDS_PREVIEW_COUNT = 4;

const maxCategoryPrice = (key) =>
  Math.max(
    ...Object.values(SELL_CATALOG[key].models)
      .flat()
      .map((e) => e.base),
  );

export function BrandsPage() {
  useAdminModels();
  return (
    <main>
      <BackToHome />
      <section
        id="all-brands"
        className="reveal max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 rounded-2xl border border-slate-200 bg-white py-8 lg:py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              Sell Top Brands at Guaranteed Best Prices
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Choose your device to see every brand we buy
            </p>
          </div>
          <div className="reveal-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {SELL_CATEGORIES.map((A) => {
              const e = SELL_PAGES[A.key]?.brands || [];
              return (
                <Link
                  key={A.key}
                  to={sellCategoryPath(A.key)}
                  className="group flex flex-col p-5 rounded-2xl border border-slate-200 bg-white hover:border-brand-500 hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 shrink-0 rounded-2xl bg-slate-50 flex items-center justify-center">
                      {A.image ? (
                        <img
                          src={A.image}
                          alt=""
                          className="w-16 h-16 object-contain group-hover:scale-110 transition"
                        />
                      ) : (
                        <i
                          className={`fa-solid ${A.icon} text-3xl text-slate-700`}
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-base font-extrabold text-slate-900 group-hover:text-brand-700 transition">
                        {A.label}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {e.length} brands
                      </p>
                      <p className="text-xs font-bold text-brand-700 mt-1">
                        Up to {formatPrice(maxCategoryPrice(A.key))}
                      </p>
                    </div>
                  </div>
                  <div
                    className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2"
                    aria-hidden="true"
                  >
                    {e.slice(0, BRANDS_PREVIEW_COUNT).map((r) => (
                      <span
                        key={r.key}
                        className="flex-1 min-w-0 h-9 rounded-lg border border-slate-100 bg-slate-50/60 flex items-center justify-center px-1.5 overflow-hidden [&_img]:max-h-5 [&_img]:max-w-full [&_img]:w-auto [&_img]:h-auto [&>span]:!text-[10px]"
                      >
                        <BrandLogo brand={r} />
                      </span>
                    ))}
                    {e.length > BRANDS_PREVIEW_COUNT && (
                      <span className="shrink-0 text-[11px] font-bold text-slate-500 px-1">
                        +{e.length - BRANDS_PREVIEW_COUNT}
                      </span>
                    )}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-700">
                    View all {e.length} brands{" "}
                    <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-0.5 transition" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
