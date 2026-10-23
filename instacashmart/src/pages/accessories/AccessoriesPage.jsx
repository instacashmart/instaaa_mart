import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BackToHome } from "../../components/BackToHome";
import { ProductThumb } from "../../components/ProductThumb";
import { ReviewsModal } from "../../components/reviews/ReviewsModal";
import { useApp } from "../../context/AppContext";
import {
  ACCESSORY_CATEGORIES,
  SHOP_CATEGORIES,
  categoryLabel,
  productMatches,
  searchTokens,
} from "../../data/accessories";
import { AccessoryCard } from "./AccessoryCard";
import { CompareDrawer } from "./CompareDrawer";

const MAX_COMPARE = 3;

export function AccessoriesPage() {
  const {
    catalog,
    market,
    setMarket,
    setMarketCategory,
    setMarketQuery,
    openBuy,
    showToast,
  } = useApp();
  const [f] = useSearchParams();
  const [P, setP] = useState([]);
  const [c, setC] = useState(false);
  const [j, setJ] = useState(null);
  useEffect(() => {
    const B = f.get("cat");
    setMarket({
      category: B && ACCESSORY_CATEGORIES.some((h) => h.key === B) ? B : "all",
      query: f.get("q") || "",
    });
  }, [f, setMarket]);
  const F = market.query.trim();
  const p = useMemo(() => {
    const B = searchTokens(market.query);
    return catalog.filter(
      (h) =>
        (market.category === "all" || h.category === market.category) &&
        productMatches(h, B),
    );
  }, [catalog, market]);
  const u = (key) => catalog.filter((h) => h.category === key).length;
  const H = (B) => catalog.find((h) => h.id === B);
  const items = P.map(H).filter(Boolean);
  const R = (B) => {
    if (P.includes(B)) {
      setP((h) => h.filter((d) => d !== B));
    } else if (P.length >= MAX_COMPARE) {
      showToast(`You can compare up to ${MAX_COMPARE} products at a time.`);
    } else {
      setP((h) => [...h, B]);
    }
  };
  const onRemove = (B) => {
    const h = P.filter((d) => d !== B);
    setP(h);
    if (h.length < 2) {
      setC(false);
    }
  };
  return (
    <main>
      <BackToHome />
      <section
        id="buy-phones"
        className="max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 rounded-2xl border border-slate-200 bg-white py-8 lg:py-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              {market.category === "all"
                ? "Buy Accessories"
                : categoryLabel(market.category)}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Chargers, cables, cases, earbuds and more from rated sellers
            </p>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-6 border-b border-slate-200">
            {SHOP_CATEGORIES.map((B) => {
              const h = market.category === B.key;
              return (
                <button
                  key={B.key}
                  type="button"
                  onClick={() => setMarketCategory(B.key)}
                  aria-pressed={h}
                  className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition ${h ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-300 text-slate-700 hover:border-slate-900"}`}
                >
                  <i className={`fa-solid ${B.icon} text-xs`} />
                  {B.label}
                  <span
                    className={`font-semibold ${h ? "text-slate-300" : "text-slate-400"}`}
                  >
                    {u(B.key)}
                  </span>
                </button>
              );
            })}
          </div>
          {market.category === "all" && !F ? (
            <div className="rounded-2xl border border-dashed border-slate-300 py-12 px-6 text-center">
              <i className="fa-solid fa-hand-pointer text-2xl text-slate-400" />
              <p className="text-base font-extrabold text-slate-900 mt-3">
                Pick a category above
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Choose Chargers, Cables, Cases or any other tab to see products.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-4 text-sm">
                <p className="text-slate-500" aria-live="polite">
                  {p.length} {p.length === 1 ? "result" : "results"}
                  {F && ` for “${F}”`}
                </p>
                {F && (
                  <button
                    type="button"
                    onClick={() => setMarketQuery("")}
                    className="text-xs font-bold text-brand-700 hover:text-brand-800"
                  >
                    <i className="fa-solid fa-xmark" /> Clear search
                  </button>
                )}
              </div>
              {p.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 py-16 px-6 text-center">
                  <p className="text-lg font-extrabold text-slate-900">
                    No products match
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Try a different search, another category or fewer filters.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setMarket({
                        category: "all",
                        query: "",
                      })
                    }
                    className="mt-5 px-5 py-2.5 rounded-full border border-slate-900 text-sm font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition"
                  >
                    Show all products
                  </button>
                </div>
              ) : (
                <div className="reveal-group grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
                  {p.map((B) => (
                    <AccessoryCard
                      key={B.id}
                      product={B}
                      inCompare={P.includes(B.id)}
                      onBuy={() => openBuy(B)}
                      onCompare={() => R(B.id)}
                      onReviews={() => setJ(B)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      {items.length > 0 && (
        <div className="fixed bottom-20 xl:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl bg-slate-900 text-white rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            {items.map((B) => (
              <ProductThumb
                key={B.id}
                product={B}
                boxClass="w-9 h-9 rounded-lg border border-slate-700"
                iconClass="text-sm"
              />
            ))}
          </div>
          <p className="flex-1 min-w-0 text-xs sm:text-sm font-semibold truncate">
            {items.length < 2
              ? "Add one more product to compare"
              : `${items.length} products selected`}
          </p>
          <button
            type="button"
            onClick={() => {
              setP([]);
              setC(false);
            }}
            className="text-xs font-bold text-slate-300 hover:text-white px-2 py-2 transition"
          >
            Clear
          </button>
          <button
            type="button"
            disabled={items.length < 2}
            onClick={() => setC(true)}
            className="shrink-0 bg-brand-600 hover:bg-brand-500 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full transition"
          >
            Compare
          </button>
        </div>
      )}
      <CompareDrawer
        open={c && items.length >= 2}
        items={items}
        onClose={() => setC(false)}
        onRemove={onRemove}
        onBuy={(B) => {
          setC(false);
          openBuy(B);
        }}
      />
      {j && <ReviewsModal product={j} onClose={() => setJ(null)} />}
    </main>
  );
}
