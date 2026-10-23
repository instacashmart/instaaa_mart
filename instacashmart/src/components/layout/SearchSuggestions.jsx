import { useNavigate } from "react-router-dom";
import { ProductThumb } from "../ProductThumb";
import { useApp } from "../../context/AppContext";
import {
  categoryLabel,
  productMatches,
  searchTokens,
} from "../../data/accessories";
import { searchModels } from "../../data/sellCatalog";
import {
  useVehicles,
  vehicleMatches,
  vehicleTitle,
  vehicleType,
} from "../../data/vehicles";
import { formatPrice, formatPriceShort } from "../../lib/format";

const POPULAR_SEARCHES = [
  "Charger",
  "iPhone case",
  "Earbuds",
  "Power bank",
  "Screen guard",
  "Cable",
];

const QUICK_SELL_DEVICES = [
  {
    brand: "Apple",
    model: "iPhone 15 Pro Max",
    label: "iPhone 15 Pro Max",
    price: 84000,
    icon: "fa-brands fa-apple",
  },
  {
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    label: "Samsung Galaxy S24 Ultra",
    price: 78500,
    icon: "fa-solid fa-mobile-screen",
  },
  {
    brand: "Apple",
    model: 'MacBook Air M2 13"',
    label: 'MacBook Air M2 13"',
    price: 59000,
    icon: "fa-solid fa-laptop",
  },
];

const SuggestionHeading = ({ children }) => (
  <div className="text-[11px] font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
    {children}
  </div>
);

function useSearchActions(onDone) {
  const { goToStore } = useApp();
  const t = useNavigate();
  return {
    pickProduct: (r) => {
      onDone();
      goToStore({
        category: "all",
        query: r.name,
      });
    },
    pickTerm: (query) => {
      onDone();
      goToStore({
        query,
      });
    },
    sellDevice: (r, a) => {
      onDone();
      t(
        `/sell?${new URLSearchParams({
          brand: r,
          model: a,
        })}`,
      );
    },
    pickVehicle: (r) => {
      onDone();
      t(
        `/bikes-cars?${new URLSearchParams({
          ...(r.type === "car" && {
            type: "car",
          }),
          q: `${r.brand} ${r.model}`,
        })}#listings`,
      );
    },
  };
}

export function SearchSuggestions({ query, onDone }) {
  const { catalog } = useApp();
  const r = useVehicles();
  const { pickProduct, pickTerm, sellDevice, pickVehicle } =
    useSearchActions(onDone);
  const P = query.trim();
  if (!P) {
    return (
      <>
        <SuggestionHeading>Popular in store</SuggestionHeading>
        <div className="flex flex-wrap gap-2 px-3 pb-2">
          {POPULAR_SEARCHES.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => pickTerm(w)}
              className="px-3 py-1.5 rounded-full border border-slate-300 hover:border-slate-900 text-xs font-semibold text-slate-800 transition"
            >
              {w}
            </button>
          ))}
        </div>
        <SuggestionHeading>Sell yours</SuggestionHeading>
        {QUICK_SELL_DEVICES.map((w) => (
          <button
            key={w.label}
            type="button"
            onClick={() => sellDevice(w.brand, w.model)}
            className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl text-left text-xs transition"
          >
            <span className="font-medium text-slate-800">
              <i className={`${w.icon} text-slate-400 mr-2`} />
              {w.label}
            </span>
            <span className="text-brand-600 font-bold">
              Up to {formatPrice(w.price)}
            </span>
          </button>
        ))}
      </>
    );
  }
  const x = searchTokens(P.toLowerCase());
  const c = catalog.filter((w) => productMatches(w, x));
  const l = searchModels(P);
  const j = r.filter((w) => vehicleMatches(w, P));
  if (!c.length && !l.length && !j.length) {
    return (
      <div className="p-3 text-xs text-slate-400 text-center">
        No match found. Try "charger", "case", "iPhone", "earbuds"...
      </div>
    );
  }
  return (
    <>
      {c.length > 0 && (
        <>
          <SuggestionHeading>
            Shop • {c.length} {c.length === 1 ? "product" : "products"}
          </SuggestionHeading>
          {c.slice(0, 5).map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => pickProduct(w)}
              className="w-full flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl text-left text-xs transition"
            >
              <ProductThumb
                product={w}
                boxClass="w-9 h-9 shrink-0 rounded-lg"
                iconClass="text-sm"
              />
              <span className="flex-1 min-w-0">
                <span className="block font-semibold text-slate-900 truncate">
                  {w.name}
                </span>
                <span className="block text-slate-400">
                  in {categoryLabel(w.category)}
                </span>
              </span>
              <span className="shrink-0 font-bold text-slate-900">
                {formatPrice(w.price)}
              </span>
            </button>
          ))}
        </>
      )}
      {j.length > 0 && (
        <>
          <SuggestionHeading>
            Bikes & cars • {j.length} {j.length === 1 ? "listing" : "listings"}
          </SuggestionHeading>
          {j.slice(0, 3).map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => pickVehicle(w)}
              className="w-full flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl text-left text-xs transition"
            >
              <img
                src={w.image || vehicleType(w.type).image}
                alt=""
                className={`w-9 h-9 shrink-0 rounded-lg bg-slate-50 ${w.image ? "object-cover" : "object-contain p-0.5"}`}
              />
              <span className="flex-1 min-w-0">
                <span className="block font-semibold text-slate-900 truncate">
                  {vehicleTitle(w)}
                </span>
                <span className="block text-slate-400">
                  {[
                    w.brand,
                    w.km > 0 && `${w.km.toLocaleString("en-IN")} km`,
                    w.city,
                  ]
                    .filter(Boolean)
                    .join(" • ")}
                </span>
              </span>
              <span className="shrink-0 font-bold text-slate-900">
                {formatPriceShort(w.price)}
              </span>
            </button>
          ))}
        </>
      )}
      {l.length > 0 && (
        <>
          <SuggestionHeading>Sell yours</SuggestionHeading>
          {l.slice(0, 3).map((w) => (
            <button
              key={w.name}
              type="button"
              onClick={() => sellDevice(w.brand, w.name)}
              className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl text-left text-xs transition"
            >
              <span className="font-medium text-slate-800">
                <i className="fa-solid fa-bolt text-brand-500 mr-2 text-[10px]" />
                {w.name}
              </span>
              <span className="text-brand-600 font-bold">
                Up to {formatPrice(w.price)}
              </span>
            </button>
          ))}
        </>
      )}
    </>
  );
}
