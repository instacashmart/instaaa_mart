import { useState } from "react";
import { DetailRows } from "../../components/DetailRows";
import { CloseButton, Modal } from "../../components/Modal";
import { RadioTiles } from "../../components/RadioTiles";
import { useApp } from "../../context/AppContext";
import { sellerTypeOf, vehicleTitle } from "../../data/vehicles";
import {
  formatDate,
  formatPrice,
  formatPriceShort,
  todayISO,
} from "../../lib/format";
import { store } from "../../lib/store";
import { VehicleThumb, isUsed } from "./VehicleCard";

const contactInputClass =
  "w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500";

export function ContactSellerModal({ vehicle, onClose }) {
  const { user, showToast } = useApp();
  const label_1 = vehicle.type === "car" ? "Test drive" : "Test ride";
  const n = [
    {
      value: "callback",
      label: "Call back",
      icon: "fa-phone",
    },
    {
      value: "test",
      label: label_1,
      icon: "fa-key",
    },
    {
      value: "offer",
      label: "Make offer",
      icon: "fa-indian-rupee-sign",
    },
  ];
  const [i, setI] = useState({
    name: "",
    phone: user?.mobile || "",
    purpose: "callback",
    date: "",
    offer: "",
    message: "",
  });
  const [P, setP] = useState("");
  const c = (j) => (w) =>
    setI((F) => ({
      ...F,
      [j]: w.target.value,
    }));
  const l = (j) => {
    j.preventDefault();
    const w = store.newId("CNL");
    if (
      !store.add("vehicleLeads", {
        id: w,
        createdAt: new Date().toISOString(),
        vehicleId: vehicle.id,
        vehicle: `${vehicleTitle(vehicle)}${vehicle.variant ? ` ${vehicle.variant}` : ""}`,
        type: vehicle.type,
        price: vehicle.price,
        city: vehicle.city,
        seller: vehicle.sellerName,
        sellerPhone: vehicle.phone || "",
        name: i.name.trim(),
        phone: i.phone.trim(),
        purpose: n.find((p) => p.value === i.purpose).label,
        date: i.purpose === "test" ? i.date : "",
        offer: i.purpose === "offer" ? Number(i.offer) : "",
        message: i.message.trim(),
        status: "New",
      })
    ) {
      showToast("Could not send your request. Please try again.");
      return;
    }
    setP(w);
    showToast("Request sent! The seller will call you soon.");
  };
  return (
    <Modal
      open
      onClose={onClose}
      className="max-w-xl p-6 sm:p-8 max-h-[95vh] overflow-y-auto"
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
            {sellerTypeOf(vehicle).label}
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Contact Seller
          </h3>
        </div>
        <CloseButton onClick={onClose} />
      </div>
      <div className="mt-5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
        <span className="shrink-0">
          <VehicleThumb
            vehicle={vehicle}
            boxClass="w-16 h-16 rounded-xl border border-slate-200"
          />
        </span>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold text-slate-900 block truncate">
            {vehicleTitle(vehicle)}
          </span>
          <span className="text-[10px] text-slate-500 block truncate">
            {[vehicle.variant, vehicle.city].filter(Boolean).join(" • ")}
          </span>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
            Price
          </span>
          <span className="text-base font-extrabold text-brand-600">
            {formatPriceShort(vehicle.price)}
          </span>
        </div>
      </div>
      {P ? (
        <div className="text-center pt-8 pb-2">
          <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">
            <i className="fa-solid fa-check" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            Request Sent!
          </h3>
          <p className="text-xs text-slate-500 mt-2">
            Reference:{" "}
            <strong className="text-brand-700 font-mono font-bold">{P}</strong>
          </p>
          <p className="text-xs text-slate-600 mt-1">
            {vehicle.sellerName} will call you on{" "}
            <span className="font-bold">+91 {i.phone}</span> within 24 hours
            {i.purpose === "test" && i.date && (
              <>
                {" "}
                to confirm your {label_1.toLowerCase()} on{" "}
                <span className="font-bold">{formatDate(i.date)}</span>
              </>
            )}
            .
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
          >
            Keep Browsing
          </button>
        </div>
      ) : (
        <form onSubmit={l} className="space-y-4 mt-4">
          <details className="group rounded-2xl border border-slate-200 px-3.5 py-3">
            <summary className="flex items-center justify-between cursor-pointer list-none text-xs font-bold text-slate-900">
              <span>
                <i className="fa-solid fa-circle-info text-slate-400 mr-1" />{" "}
                Vehicle details
              </span>
              <i className="fa-solid fa-chevron-down text-[10px] text-slate-400 transition group-open:rotate-180" />
            </summary>
            <DetailRows
              className="mt-3 space-y-2 text-xs text-slate-600"
              rows={[
                ["Brand", vehicle.brand],
                ["Model", vehicle.model],
                ["Condition", isUsed(vehicle) ? "Used" : "Brand new"],
                ["Year", vehicle.year ? String(vehicle.year) : ""],
                ...(isUsed(vehicle)
                  ? [
                      [
                        "Kms driven",
                        vehicle.km
                          ? `${vehicle.km.toLocaleString("en-IN")} km`
                          : "",
                      ],
                      [
                        "Owners",
                        vehicle.owners ? `${vehicle.owners} owner` : "",
                      ],
                    ]
                  : []),
                ["Fuel", vehicle.fuel],
                ["Transmission", vehicle.transmission],
                ["City", vehicle.city],
                ["Seller", vehicle.sellerName],
                ...(vehicle.description
                  ? [["About", vehicle.description]]
                  : []),
              ]}
            />
          </details>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="leadName"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Your Full Name *
              </label>
              <input
                id="leadName"
                type="text"
                required
                value={i.name}
                onChange={c("name")}
                placeholder="e.g. Rahul Verma"
                className={contactInputClass}
              />
            </div>
            <div>
              <label
                htmlFor="leadPhone"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Mobile Number *
              </label>
              <input
                id="leadPhone"
                type="tel"
                required
                value={i.phone}
                onChange={c("phone")}
                placeholder="10-digit number"
                pattern="[0-9]{10}"
                maxLength={10}
                className={contactInputClass}
              />
            </div>
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-700 mb-1">
              I want to *
            </span>
            <RadioTiles
              name="leadPurpose"
              value={i.purpose}
              onChange={(purpose) =>
                setI((w) => ({
                  ...w,
                  purpose,
                }))
              }
              options={n.map((j) => ({
                value: j.value,
                content: (
                  <>
                    <i
                      className={`fa-solid ${j.icon} block text-brand-600 mb-1`}
                    />
                    {j.label}
                  </>
                ),
              }))}
            />
          </div>
          {i.purpose === "test" && (
            <div>
              <label
                htmlFor="leadDate"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Preferred {label_1.toLowerCase()} date *
              </label>
              <input
                id="leadDate"
                type="date"
                required
                min={todayISO()}
                value={i.date}
                onChange={c("date")}
                className={contactInputClass}
              />
            </div>
          )}
          {i.purpose === "offer" && (
            <div>
              <label
                htmlFor="leadOffer"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Your offer (₹) *
              </label>
              <input
                id="leadOffer"
                type="number"
                required
                min={1}
                step={500}
                value={i.offer}
                onChange={c("offer")}
                placeholder={`Asking ${formatPrice(vehicle.price)}`}
                className={contactInputClass}
              />
            </div>
          )}
          <div>
            <label
              htmlFor="leadMessage"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="leadMessage"
              rows={2}
              value={i.message}
              onChange={c("message")}
              placeholder="Best time to call, questions about service history..."
              className={contactInputClass}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-brand-500/20 transition flex items-center justify-center gap-2"
          >
            <span>Send Request</span>
            <i className="fa-solid fa-paper-plane" />
          </button>
          <p className="text-[10px] text-center text-slate-400">
            Your number is shared only with this seller. Always inspect the
            vehicle and its papers before paying.
          </p>
        </form>
      )}
    </Modal>
  );
}
