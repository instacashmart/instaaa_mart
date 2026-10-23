import { CloseButton, Modal } from "../../components/Modal";
import { ProductThumb } from "../../components/ProductThumb";
import {
  categoryLabel,
  discountPercent,
  sellerOf,
} from "../../data/accessories";
import { formatPrice } from "../../lib/format";
import { VerifiedBadge } from "./AccessoryCard";

export function CompareDrawer({ open, items, onClose, onRemove, onBuy }) {
  if (!open) {
    return null;
  }
  const n = Math.min(...items.map((c) => c.price));
  const i = Math.max(...items.map((c) => sellerOf(c).rating));
  const FComponent = ({ children }) => (
    <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
      {children}
    </span>
  );
  const PComponent = () => (
    <i className="fa-solid fa-star text-amber-500 text-xs" />
  );
  const x = [
    [
      "Price",
      (c) => (
        <>
          <span className="text-lg font-extrabold text-slate-900">
            {formatPrice(c.price)}
          </span>
          {c.price === n && <FComponent>Lowest</FComponent>}
        </>
      ),
    ],
    [
      "MRP",
      (c) => (
        <span className="text-slate-400 line-through">
          {formatPrice(c.mrp)}
        </span>
      ),
    ],
    [
      "You save",
      (c) => (
        <span className="font-bold text-brand-700">
          {formatPrice(c.mrp - c.price)} ({discountPercent(c)}%)
        </span>
      ),
    ],
    ["Category", (c) => categoryLabel(c.category)],
    ["Condition", (c) => c.grade],
    ["Specs", (c) => c.specs],
    [
      "Product rating",
      (c) => (
        <>
          <PComponent /> {c.rating}
        </>
      ),
    ],
    [
      "Seller",
      (c) => (
        <>
          {sellerOf(c).name} <VerifiedBadge seller={sellerOf(c)} />
        </>
      ),
    ],
    [
      "Seller rating",
      (c) => {
        const l = sellerOf(c);
        return (
          <>
            <PComponent /> {l.rating}{" "}
            <span className="text-slate-400">
              • {l.sales.toLocaleString("en-IN")} sales
            </span>
            {l.rating === i && <FComponent>Top</FComponent>}
          </>
        );
      },
    ],
    ["Warranty", (c) => c.warranty],
    ["Replacement", (c) => c.replacement],
  ];
  return (
    <Modal
      open
      onClose={onClose}
      className="max-w-4xl p-6 sm:p-8 max-h-[95vh] overflow-y-auto"
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Side by side
          </span>
          <h3 className="text-xl font-extrabold tracking-tight text-slate-900 mt-1">
            Compare products
          </h3>
        </div>
        <CloseButton onClick={onClose} label="Close comparison" />
      </div>
      <div className="overflow-x-auto custom-scrollbar mt-4">
        <table className="w-full text-left text-sm">
          <thead>
            <tr>
              <th className="w-32 min-w-[7rem]" />
              {items.map((c) => (
                <th
                  key={c.id}
                  className="p-3 align-top min-w-[11rem] font-normal"
                >
                  <div className="relative">
                    <ProductThumb
                      product={c}
                      boxClass="w-full aspect-[4/3] rounded-xl bg-slate-100"
                      iconClass="text-5xl"
                    />
                    <button
                      type="button"
                      onClick={() => onRemove(c.id)}
                      aria-label={`Remove ${c.name}`}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 hover:bg-white text-slate-700 text-xs shadow-xs"
                    >
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </div>
                  <p className="mt-3 text-sm font-extrabold text-slate-900 leading-snug">
                    {c.name}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {x.map(([c, l]) => (
              <tr key={c} className="border-t border-slate-200">
                <th
                  scope="row"
                  className="py-3 pr-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 align-middle"
                >
                  {c}
                </th>
                {items.map((j) => (
                  <td key={j.id} className="p-3 text-slate-800 font-medium">
                    {l(j)}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t border-slate-200">
              <th />
              {items.map((c) => (
                <td key={c.id} className="p-3">
                  <button
                    type="button"
                    onClick={() => onBuy(c)}
                    className="w-full py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm transition"
                  >
                    Buy Now
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
