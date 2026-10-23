import { sellerTypeOf, vehicleTitle, vehicleType } from "../../data/vehicles";
import { formatPriceShort } from "../../lib/format";

export function VehicleThumb({ vehicle, boxClass }) {
  if (vehicle.image) {
    return (
      <img
        src={vehicle.image}
        alt={vehicleTitle(vehicle)}
        loading="lazy"
        className={`${boxClass} object-cover`}
      />
    );
  }
  return (
    <span
      className={`${boxClass} flex items-center justify-center bg-slate-50`}
    >
      <img
        src={vehicleType(vehicle.type).image}
        alt={vehicleTitle(vehicle)}
        className="w-4/5 h-4/5 object-contain"
      />
    </span>
  );
}

export const isUsed = (A) => A.condition !== "New";

const vehicleFacts = (vehicle) =>
  [
    isUsed(vehicle) &&
      vehicle.km > 0 && [
        `${vehicle.km.toLocaleString("en-IN")} km`,
        "fa-gauge-high",
      ],
    vehicle.fuel && [
      vehicle.fuel,
      vehicle.fuel === "Electric" ? "fa-bolt" : "fa-gas-pump",
    ],
    vehicle.type === "car" &&
      vehicle.transmission && [vehicle.transmission, "fa-gears"],
    isUsed(vehicle) && vehicle.owners && [`${vehicle.owners} owner`, "fa-user"],
  ].filter(Boolean);

export function VehicleCard({ vehicle, onContact }) {
  const t = sellerTypeOf(vehicle);
  return (
    <article className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition duration-300 flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <VehicleThumb
          vehicle={vehicle}
          boxClass="w-full h-full group-hover:scale-105 transition duration-500"
        />
        {vehicle.condition === "New" ? (
          <span className="absolute top-2.5 left-2.5 text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white">
            Brand new
          </span>
        ) : (
          vehicle.sellerType === "assured" && (
            <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-600 text-white">
              <i className="fa-solid fa-shield-halved text-[10px]" /> Assured
            </span>
          )
        )}
        {vehicle.city && (
          <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/95 text-slate-900 shadow-xs">
            <i className="fa-solid fa-location-dot text-brand-600 text-[10px]" />
            {vehicle.city}
          </span>
        )}
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {vehicle.brand}
        </p>
        <h3 className="mt-0.5 text-sm font-bold text-slate-900 leading-snug">
          {vehicleTitle(vehicle)}
        </h3>
        {vehicle.variant && (
          <p className="text-xs text-slate-500 truncate">{vehicle.variant}</p>
        )}
        <ul className="mt-2.5 flex flex-wrap gap-1.5 empty:hidden">
          {vehicleFacts(vehicle).map(([r, a]) => (
            <li
              key={a}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full"
            >
              <i className={`fa-solid ${a} text-slate-400 text-[10px]`} />
              {r}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
          {formatPriceShort(vehicle.price)}
        </p>
        <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 mb-3">
          <p className="truncate">
            <span className="font-bold text-slate-900">
              {vehicle.sellerName}
            </span>{" "}
            {t.verified && (
              <i
                className="fa-solid fa-circle-check text-brand-600"
                title="Verified seller"
              />
            )}
          </p>
          <p className="mt-0.5">{t.label}</p>
        </div>
        <button
          type="button"
          onClick={onContact}
          className="mt-auto w-full py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm transition"
        >
          Contact Seller
        </button>
      </div>
    </article>
  );
}
