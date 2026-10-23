import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SHOP_CATEGORIES } from "../data/accessories";

export const isVehiclePath = (A) => /^\/(bikes-cars|bikes|cars)(\/|$)/.test(A);

const SWIPE_TABS = [
  {
    key: "home",
    label: "Home",
    to: "/",
  },
  {
    key: "tablet",
    label: "Tablet",
    to: "/sell-tablet",
  },
  {
    key: "vehicles",
    label: "Bikes & Cars",
    to: "/bikes-cars",
  },
  ...SHOP_CATEGORIES.map((A) => ({
    key: A.key,
    label: A.label,
    to: `/accessories?cat=${encodeURIComponent(A.key)}`,
  })),
];

function swipeTabIndex(pathname, search) {
  if (pathname === "/") {
    return 0;
  }
  if (pathname.startsWith("/sell-tablet")) {
    return 1;
  }
  if (isVehiclePath(pathname)) {
    return 2;
  }
  if (pathname === "/accessories") {
    const t = new URLSearchParams(search).get("cat");
    const r = SWIPE_TABS.findIndex((a) => a.key === t);
    if (r > 0) {
      return r;
    }
    return 0;
  }
  return -1;
}

function blocksSwipe(A) {
  let e;
  for (; A && A !== document.body; A = A.parentElement) {
    if (
      (e = A.closest) != null &&
      e.call(A, 'input, textarea, select, [role="dialog"], [data-no-swipe]')
    ) {
      return true;
    }
    const t = getComputedStyle(A).overflowX;
    if ((t === "auto" || t === "scroll") && A.scrollWidth > A.clientWidth + 2) {
      return true;
    }
  }
  return false;
}

export function useSwipeNavigation(A) {
  const e = useNavigate();
  const { pathname, search } = useLocation();
  const { modal } = useApp();
  const [n, setN] = useState(null);
  const fRef = useRef({
    index: -1,
    active: false,
  });
  fRef.current = {
    index: swipeTabIndex(pathname, search),
    active: A && !modal,
  };
  useEffect(() => {
    let P;
    const x = (dir) => {
      const { index, active } = fRef.current;
      if (!active || index < 0) {
        return;
      }
      const U = SWIPE_TABS[index + dir];
      if (U) {
        e(U.to);
        window.scrollTo({
          top: 0,
        });
        setN({
          label: U.label,
          dir,
          at: Date.now(),
        });
        clearTimeout(P);
        P = setTimeout(() => setN(null), 900);
      }
    };
    let c = null;
    const l = (H) => {
      if (H.touches.length !== 1 || blocksSwipe(H.target)) {
        c = null;
        return;
      }
      const K = H.touches[0];
      c = {
        x: K.clientX,
        y: K.clientY,
        at: Date.now(),
      };
    };
    const j = (H) => {
      if (!c) {
        return;
      }
      const K = H.changedTouches[0];
      const R = K.clientX - c.x;
      const U = K.clientY - c.y;
      const B = Date.now() - c.at < 700;
      c = null;
      if (B && Math.abs(R) > 70 && Math.abs(R) > Math.abs(U) * 1.8) {
        x(R < 0 ? 1 : -1);
      }
    };
    let w = 0;
    let F;
    let p = false;
    const u = (H) => {
      if (!(
        Math.abs(H.deltaX) <= Math.abs(H.deltaY) || blocksSwipe(H.target)
      )) {
        clearTimeout(F);
        F = setTimeout(() => {
          w = 0;
          p = false;
        }, 350);
        if (!p) {
          w += H.deltaX;
          if (Math.abs(w) > 160) {
            p = true;
            x(w > 0 ? 1 : -1);
          }
        }
      }
    };
    window.addEventListener("touchstart", l, {
      passive: true,
    });
    window.addEventListener("touchend", j, {
      passive: true,
    });
    window.addEventListener("wheel", u, {
      passive: true,
    });
    return () => {
      window.removeEventListener("touchstart", l);
      window.removeEventListener("touchend", j);
      window.removeEventListener("wheel", u);
      clearTimeout(P);
      clearTimeout(F);
    };
  }, [e]);
  return n;
}
