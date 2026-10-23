import { Link, NavLink } from "react-router-dom";
import { useApp } from "../../context/AppContext";

function BottomNavLink({ to, end, icon, label }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `bottom-tab relative flex flex-col items-center text-[10px] ${isActive ? "is-active text-brand-600 font-bold" : "text-slate-500 hover:text-brand-600 font-medium"}`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <i
              className="bottom-tab-pointer fa-solid fa-caret-down absolute -top-3.5 text-brand-600 text-sm"
              aria-hidden="true"
            />
          )}
          <i className={`bottom-tab-icon fa-solid ${icon} text-base`} />
          <span className="mt-0.5">{label}</span>
        </>
      )}
    </NavLink>
  );
}

export function BottomNav() {
  const { setModal } = useApp();
  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 pt-3.5 pb-2.5 flex items-center justify-between shadow-2xl">
      <BottomNavLink to="/" end icon="fa-house" label="Home" />
      <BottomNavLink to="/sell" icon="fa-calculator" label="Valuation" />
      <Link
        to="/sell"
        aria-label="Sell your item"
        className="bottom-fab relative flex flex-col items-center -mt-5 bg-brand-600 text-white rounded-full p-3 shadow-lg shadow-brand-500/30"
      >
        <i className="fa-solid fa-plus text-base" />
      </Link>
      <BottomNavLink to="/track" icon="fa-truck-fast" label="Track" />
      <button
        type="button"
        onClick={() => setModal("login")}
        className="bottom-tab flex flex-col items-center text-slate-500 hover:text-brand-600 text-[10px] font-medium"
      >
        <i className="fa-solid fa-user text-base" />
        <span className="mt-0.5">Profile</span>
      </button>
    </div>
  );
}
