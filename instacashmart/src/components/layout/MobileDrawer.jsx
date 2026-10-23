import { Link, NavLink } from "react-router-dom";
import { Logo } from "../Logo";
import { SearchSuggestions } from "./SearchSuggestions";
import { useApp } from "../../context/AppContext";
import { SUPPORT_PHONE, SUPPORT_PHONE_HREF } from "../../data/site";

const DRAWER_LINKS = [
  {
    to: "/",
    label: "Home",
    icon: "fa-house",
    end: true,
  },
  {
    to: "/sell",
    label: "Sell Your Item",
    icon: "fa-hand-holding-dollar",
  },
  {
    to: "/accessories",
    label: "Buy Accessories",
    icon: "fa-bag-shopping",
  },
  {
    to: "/bikes-cars",
    label: "Buy Bikes & Cars",
    icon: "fa-car-side",
    end: true,
  },
  {
    to: "/bikes-cars/sell",
    label: "Sell Bike or Car",
    icon: "fa-motorcycle",
  },
  {
    to: "/brands",
    label: "All Brands",
    icon: "fa-certificate",
  },
  {
    to: "/track",
    label: "Track Order",
    icon: "fa-truck-fast",
  },
  {
    to: "/how-it-works",
    label: "How It Works",
    icon: "fa-list-check",
  },
  {
    to: "/faqs",
    label: "FAQs",
    icon: "fa-circle-question",
  },
  {
    to: "/reviews",
    label: "Customer Reviews",
    icon: "fa-star",
  },
  {
    to: "/feedback",
    label: "Feedback",
    icon: "fa-comment-dots",
  },
];

export function MobileDrawer({ open, onClose }) {
  const { city, setModal, market, setMarketQuery } = useApp();
  const i = (P) =>
    `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition hover:bg-brand-50 hover:text-brand-700 ${P ? "bg-brand-50 text-brand-700" : "text-slate-800"}`;
  const FComponent = (P) => (
    <>
      <span className="w-8 h-8 rounded-lg bg-slate-100 text-brand-600 flex items-center justify-center text-xs">
        <i className={`fa-solid ${P.icon}`} />
      </span>
      <span className="flex-1">{P.label}</span>
      <i className="fa-solid fa-chevron-right text-[10px] text-slate-400" />
    </>
  );
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="xl:hidden fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-xs"
        />
      )}
      <aside
        aria-label="Menu"
        aria-hidden={!open}
        inert={open ? undefined : ""}
        className={`xl:hidden fixed top-0 right-0 z-[70] h-full w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${open ? "" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 h-16 bg-slate-900 text-white shrink-0">
          <Logo className="h-8" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center"
          >
            <i className="fa-solid fa-xmark text-lg" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Your city
            </span>
            <button
              type="button"
              onClick={() => setModal("city")}
              className="flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full"
            >
              <i className="fa-solid fa-location-dot" />
              <span>{city}</span>
              <i className="fa-solid fa-pen text-[10px] ml-1" />
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              value={market.query}
              onChange={(P) => setMarketQuery(P.target.value)}
              placeholder="Search chargers, cases, earbuds..."
              aria-label="Search"
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-400 text-xs" />
          </div>
          {market.query.trim() && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-1 space-y-1">
              <SearchSuggestions query={market.query} onDone={onClose} />
            </div>
          )}
          <nav className="space-y-1">
            {DRAWER_LINKS.map((P) => {
              if (P.plain) {
                return (
                  <Link
                    key={P.to}
                    to={P.to}
                    onClick={onClose}
                    className={i(false)}
                  >
                    {FComponent(P)}
                  </Link>
                );
              }
              return (
                <NavLink
                  key={P.to}
                  to={P.to}
                  end={P.end}
                  onClick={onClose}
                  className={({ isActive }) => i(isActive)}
                >
                  {FComponent(P)}
                </NavLink>
              );
            })}
          </nav>
        </div>
        <div className="px-5 py-4 border-t border-slate-200 space-y-2 shrink-0">
          <Link
            to="/sell"
            onClick={onClose}
            className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-3 rounded-xl transition"
          >
            Sell Your Item <i className="fa-solid fa-arrow-right text-xs" />
          </Link>
          <a
            href={SUPPORT_PHONE_HREF}
            className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 py-1.5"
          >
            <i className="fa-solid fa-headset text-brand-600" /> {SUPPORT_PHONE}
          </a>
        </div>
      </aside>
    </>
  );
}
