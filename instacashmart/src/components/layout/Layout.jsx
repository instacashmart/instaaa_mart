import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileDrawer } from "./MobileDrawer";
import { Modals } from "../modals/Modals";
import { useSwipeNavigation } from "../../hooks/useSwipeNavigation";

export function Layout() {
  const [A, setA] = useState(false);
  const t = useLocation();
  useEffect(() => setA(false), [t.pathname, t.search, t.hash]);
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", A);
    if (!A) {
      return;
    }
    const a = (n) => n.key === "Escape" && setA(false);
    document.addEventListener("keydown", a);
    return () => document.removeEventListener("keydown", a);
  }, [A]);
  const r = useSwipeNavigation(!A);
  return (
    <>
      <Header onToggleDrawer={() => setA((a) => !a)} drawerOpen={A} />
      <MobileDrawer open={A} onClose={() => setA(false)} />
      <Outlet />
      <Footer />
      <BottomNav />
      <Modals />
      {r && (
        <div
          key={r.at}
          role="status"
          className="swipe-hint fixed left-1/2 top-1/2 z-[90] -translate-x-1/2 -translate-y-1/2 pointer-events-none px-5 py-2.5 rounded-full bg-slate-900/90 text-white text-sm font-bold shadow-xl flex items-center gap-2"
        >
          {r.dir < 0 && <i className="fa-solid fa-chevron-left text-xs" />}
          {r.label}
          {r.dir > 0 && <i className="fa-solid fa-chevron-right text-xs" />}
        </div>
      )}
    </>
  );
}
