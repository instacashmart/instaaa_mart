import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { DetailRows } from "../../components/DetailRows";
import { SimpleHeader, headerButtonClass } from "../../components/Logo";
import { sellCategory } from "../../data/sellCatalog";
import { modelImage } from "../../data/sellModels";
import { formatDate, todayISO } from "../../lib/format";
import { store } from "../../lib/store";

export function PickupPage() {
  const [A] = useSearchParams();
  const e = useNavigate();
  const t = (K) => (A.get(K) || "").trim();
  const [r, setR] = useState("");
  const [n, setN] = useState("");
  const [f, setF] = useState(todayISO);
  const [x, setX] = useState(null);
  const l = t("cat");
  const j = sellCategory(l);
  const w = [t("storage"), t("ram") && `${t("ram")} RAM`]
    .filter(Boolean)
    .join(" • ");
  const F =
    [t("model"), w && `(${w})`].filter(Boolean).join(" ") || "Your device";
  const rows = [
    ["Model", t("model")],
    ["Storage", t("storage")],
    ["RAM", t("ram")],
    ["Variant / Colour", t("variant")],
    ["Condition", t("condition")],
    ["Accessories", t("accessories") || "None"],
    ["Extra Details", t("extra")],
  ].filter(([K, R]) => R || K === "Variant / Colour" || K === "Extra Details");
  const u = `/sell${l ? `?cat=${encodeURIComponent(l)}` : ""}`;
  const H = (K) => {
    K.preventDefault();
    const R = store.newId("CN");
    store.add("sell", {
      id: R,
      createdAt: new Date().toISOString(),
      category: l,
      model: t("model"),
      storage: t("storage"),
      ram: t("ram"),
      variant: t("variant"),
      extra: t("extra"),
      condition: t("condition"),
      accessories: t("accessories"),
      quote: Number(t("price")) || 0,
      address: r.trim(),
      phone: n,
      date: f,
      status: "New",
    });
    setX({
      id: R,
      date: f,
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <SimpleHeader
        action={
          <Link
            to={u}
            onClick={(K) => {
              if (window.history.length > 1) {
                K.preventDefault();
                e(-1);
              }
            }}
            className={headerButtonClass}
          >
            <i className="fa-solid fa-arrow-left text-xs" />
            <span>Edit Details</span>
          </Link>
        }
      />
      <main className="max-w-3xl mx-3 sm:mx-4 md:mx-auto mt-4 mb-10 space-y-4">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
            Step 2 of 2
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 mt-2">
            Review Your Item
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-20 h-20 shrink-0 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800 text-3xl overflow-hidden">
              {modelImage(l, t("model")) || (j != null && j.image) ? (
                <img
                  src={modelImage(l, t("model")) || j.image}
                  alt={t("model")}
                  className="w-full h-full object-contain p-1.5"
                />
              ) : (
                <i className={`fa-solid ${j?.icon || "fa-mobile-screen"}`} />
              )}
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-slate-900 break-words">
                {F}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{t("condition")}</p>
            </div>
          </div>
          <DetailRows
            rows={rows}
            className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-sm text-slate-600"
          />
        </section>
        {x ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-3xl mx-auto mb-4">
              <i className="fa-solid fa-check" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Pickup Confirmed!
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Order reference:{" "}
              <strong className="text-brand-700 font-mono font-bold">
                {x.id}
              </strong>
            </p>
            <p className="text-sm text-slate-600 mt-1">
              We'll come to pick up your item on{" "}
              <strong className="text-slate-900">
                {formatDate(x.date, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </strong>
              .
            </p>
            <p className="text-xs text-slate-500 mt-3">
              Save your order reference to track the pickup anytime from{" "}
              <strong>Track Pickup</strong> on the home page.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                to="/"
                className="inline-block px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
              >
                Back to Home
              </Link>
              <Link
                to={`/track?id=${encodeURIComponent(x.id)}`}
                className="inline-block px-5 py-2.5 bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold rounded-xl hover:bg-brand-100 transition"
              >
                Track this order
              </Link>
            </div>
          </section>
        ) : (
          <form
            onSubmit={H}
            className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4"
          >
            <h2 className="text-base font-bold text-slate-900">
              Pickup Address & Availability
            </h2>
            <div>
              <label
                htmlFor="addressInput"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Address *
              </label>
              <textarea
                id="addressInput"
                required
                rows={3}
                value={r}
                onChange={(K) => setR(K.target.value)}
                placeholder="House/Flat No, Building, Street, Area, Landmark, City, Pincode"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              />
            </div>
            <div>
              <label
                htmlFor="phoneInput"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Mobile Number *
              </label>
              <div className="flex w-full sm:w-64 rounded-xl border border-slate-300 bg-white focus-within:ring-2 focus-within:ring-brand-500 overflow-hidden">
                <span className="px-3 flex items-center bg-slate-50 border-r border-slate-300 text-sm font-semibold text-slate-600">
                  +91
                </span>
                <input
                  id="phoneInput"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  required
                  maxLength={10}
                  pattern="[6-9][0-9]{9}"
                  title="Enter a 10-digit mobile number starting with 6, 7, 8 or 9"
                  value={n}
                  onChange={(K) =>
                    setN(K.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="98765 43210"
                  className="flex-1 min-w-0 px-3.5 py-2.5 text-sm focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Our pickup executive will call this number before arriving.
              </p>
            </div>
            <div>
              <label
                htmlFor="dateInput"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Date of Availability *
              </label>
              <input
                id="dateInput"
                type="date"
                required
                min={todayISO()}
                value={f}
                onChange={(K) => setF(K.target.value)}
                className="w-full sm:w-64 px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Pick the day you'll be available for the doorstep pickup.
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-brand-500/20 transition flex items-center justify-center gap-2"
            >
              <span>Confirm</span>
              <i className="fa-solid fa-circle-check" />
            </button>
          </form>
        )}
      </main>
    </>
  );
}
