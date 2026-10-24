import { vehicleType } from "../../data/vehicles";
import {
  formatDate,
  formatDateTime,
  formatPrice,
  formatPriceShort,
} from "../../lib/format";
import { store } from "../../lib/store";
import { EmptyState, phoneLink } from "./shared";

const LISTING_STATUSES = ["Pending", "Live", "Sold", "Hidden"];

const LEAD_STATUSES = ["New", "Contacted", "Closed"];

function VehicleAdminCard({
  type,
  item,
  title,
  statuses,
  rows,
  media,
  showToast,
}) {
  const f = (x) => {
    store.update(type, item.id, {
      status: x,
    });
    showToast(`${item.id}: ${x}`);
  };
  const P = () => {
    if (window.confirm(`Delete ${item.id}? This cannot be undone.`)) {
      store.remove(type, item.id);
      showToast(`${item.id} deleted`);
    }
  };
  return (
    <article className="rounded-2xl border border-slate-200 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          {media}
          <div className="min-w-0">
            <p className="text-[11px] font-mono font-bold text-brand-700">
              {item.id}
            </p>
            <h3 className="text-sm font-bold text-slate-900 break-words">
              {title}
            </h3>
            <p className="text-[11px] text-slate-400">
              {formatDateTime(item.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-slate-200 overflow-hidden">
            {statuses.map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => f(x)}
                aria-pressed={item.status === x}
                className={`px-2.5 h-8 text-[11px] font-bold transition ${item.status === x ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"}`}
              >
                {x}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={P}
            aria-label="Delete"
            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-300 transition"
          >
            <i className="fa-solid fa-trash-can text-xs" />
          </button>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5 text-xs">
        {rows
          .filter(([, x]) => x)
          .map(([x, c]) => (
            <div key={x} className="flex items-start justify-between gap-4">
              <span className="shrink-0 text-slate-500">{x}</span>
              <span className="text-right font-semibold text-slate-900 break-words">
                {c}
              </span>
            </div>
          ))}
      </div>
    </article>
  );
}

export function ListingsAdmin({ listings, showToast }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <h2 className="text-base font-bold text-slate-900">
        Bike & Car Listings
      </h2>
      <p className="text-xs text-slate-500 mt-0.5">
        Posted on Sell Bike or Car. Only Live listings show on Buy Bikes & Cars;
        mark Sold or Hidden to take one down.
      </p>
      <div className="mt-4 space-y-3">
        {listings.length ? (
          listings.map((t) => (
            <VehicleAdminCard
              key={t.id}
              type="vehicles"
              item={t}
              statuses={LISTING_STATUSES}
              showToast={showToast}
              title={`${t.year} ${t.brand} ${t.model}${t.variant ? ` ${t.variant}` : ""}`}
              media={
                t.image ? (
                  <img
                    src={t.image}
                    alt=""
                    className="w-14 h-14 shrink-0 rounded-xl object-cover border border-slate-200"
                  />
                ) : (
                  <span className="w-14 h-14 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center">
                    <i
                      className={`fa-solid ${vehicleType(t.type).icon} text-xl text-slate-500`}
                    />
                  </span>
                )
              }
              rows={[
                ["Asking price", formatPriceShort(t.price)],
                [
                  "Our estimate",
                  t.estimate ? formatPriceShort(t.estimate) : "No estimate",
                ],
                ["Type", vehicleType(t.type).label],
                ["Kms driven", `${Number(t.km).toLocaleString("en-IN")} km`],
                ["Fuel / gears", `${t.fuel} • ${t.transmission}`],
                ["Owners", t.owners],
                ["City", t.city],
                ["Seller", t.sellerName],
                ["Mobile", phoneLink(t.phone)],
                ["Description", t.description],
              ]}
            />
          ))
        ) : (
          <EmptyState>
            No listings yet. They appear here when someone posts a bike or car
            on the Sell Bike or Car page.
          </EmptyState>
        )}
      </div>
    </section>
  );
}

export function LeadsAdmin({ leads, showToast }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <h2 className="text-base font-bold text-slate-900">
        Bike & Car Enquiries
      </h2>
      <p className="text-xs text-slate-500 mt-0.5">
        Call-back, test ride/drive and offer requests sent with Contact Seller.
      </p>
      <div className="mt-4 space-y-3">
        {leads.length ? (
          leads.map((t) => (
            <VehicleAdminCard
              key={t.id}
              type="vehicleLeads"
              item={t}
              statuses={LEAD_STATUSES}
              showToast={showToast}
              title={`${t.purpose}: ${t.vehicle}`}
              rows={[
                ["Buyer", t.name],
                ["Buyer mobile", phoneLink(t.phone)],
                ["Listed price", formatPriceShort(t.price)],
                ["Offer", t.offer ? formatPrice(t.offer) : ""],
                ["Test date", formatDate(t.date)],
                ["City", t.city],
                ["Seller", t.seller],
                ["Seller mobile", phoneLink(t.sellerPhone)],
                ["Listing", t.vehicleId],
                ["Message", t.message],
              ]}
            />
          ))
        ) : (
          <EmptyState>
            No enquiries yet. They appear here when a buyer presses Contact
            Seller on a bike or car.
          </EmptyState>
        )}
      </div>
    </section>
  );
}
