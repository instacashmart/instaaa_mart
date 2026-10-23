import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ACCESSORY_CATEGORIES } from "../../data/accessories";
import { isVehiclePath } from "../../hooks/useSwipeNavigation";

const EXTRA_CATEGORY_LINKS = [
  {
    key: "tablet",
    label: "Tablet",
    to: "/sell-tablet",
    after: "all",
  },
  {
    key: "vehicles",
    label: "Bikes & Cars",
    to: "/bikes-cars",
    after: "all",
  },
];

export function CategoryBar({ active, onPick }) {
  const tRef = useRef(null);
  const rRef = useRef(null);
  const [a, setA] = useState({
    left: false,
    right: false,
  });
  const i = useNavigate();
  const { pathname } = useLocation();
  const P = ACCESSORY_CATEGORIES.flatMap((H) => [
    H,
    ...EXTRA_CATEGORY_LINKS.filter((K) => K.after === H.key),
  ]);
  const x = (H) => {
    if (H.key === "vehicles") {
      return isVehiclePath(pathname);
    }
    return pathname.startsWith(H.to);
  };
  const c = (H) => {
    if (H.to) {
      return x(H);
    }
    return !EXTRA_CATEGORY_LINKS.some(x) && active === H.key;
  };
  const onPointerDown = (H) => {
    if (!(H.pointerType !== "mouse" || H.button !== 0)) {
      rRef.current = {
        x: H.clientX,
        left: tRef.current.scrollLeft,
        moved: false,
      };
    }
  };
  const onPointerMove = (H) => {
    const rRef_current = rRef.current;
    if (!rRef_current) {
      return;
    }
    const R = H.clientX - rRef_current.x;
    if (!rRef_current.moved && Math.abs(R) > 5) {
      rRef_current.moved = true;
      try {
        tRef.current.setPointerCapture(H.pointerId);
      } catch {}
      tRef.current.style.scrollBehavior = "auto";
    }
    if (rRef_current.moved) {
      tRef.current.scrollLeft = rRef_current.left - R;
    }
  };
  const w = () => {
    var H;
    if ((H = rRef.current) != null && H.moved) {
      tRef.current.style.scrollBehavior = "";
    }
    setTimeout(() => {
      rRef.current = null;
    }, 0);
  };
  const onClickCapture = (H) => {
    var K;
    if ((K = rRef.current) != null && K.moved) {
      H.preventDefault();
      H.stopPropagation();
    }
  };
  useEffect(() => {
    const tRef_current = tRef.current;
    const K = (R) => {
      if (
        Math.abs(R.deltaY) <= Math.abs(R.deltaX) ||
        tRef_current.scrollWidth <= tRef_current.clientWidth
      ) {
        return;
      }
      const U = tRef_current.scrollLeft <= 0 && R.deltaY < 0;
      const B =
        tRef_current.scrollLeft + tRef_current.clientWidth >=
          tRef_current.scrollWidth - 1 && R.deltaY > 0;
      if (!(U || B)) {
        R.preventDefault();
        tRef_current.scrollBy({
          left: R.deltaY,
          behavior: "auto",
        });
      }
    };
    tRef_current.addEventListener("wheel", K, {
      passive: false,
    });
    return () => tRef_current.removeEventListener("wheel", K);
  }, []);
  useEffect(() => {
    const tRef_current = tRef.current;
    const K = () =>
      setA({
        left: tRef_current.scrollLeft > 4,
        right:
          tRef_current.scrollLeft + tRef_current.clientWidth <
          tRef_current.scrollWidth - 4,
      });
    K();
    tRef_current.addEventListener("scroll", K, {
      passive: true,
    });
    const R = new ResizeObserver(K);
    R.observe(tRef_current);
    [...tRef_current.children].forEach((B) => R.observe(B));
    document.fonts?.ready.then(K);
    return () => {
      tRef_current.removeEventListener("scroll", K);
      R.disconnect();
    };
  }, []);
  useEffect(() => {
    const H = (behavior) => {
      const tRef_current = tRef.current;
      const B = tRef_current?.querySelector('[aria-current="true"]');
      if (B) {
        tRef_current.scrollTo({
          left: B.offsetLeft - (tRef_current.clientWidth - B.offsetWidth) / 2,
          behavior,
        });
      }
    };
    H("smooth");
    document.fonts?.ready.then(() => H("auto"));
  }, [active, pathname]);
  const p = (H) =>
    tRef.current.scrollBy({
      left: H * tRef.current.clientWidth * 0.7,
      behavior: "smooth",
    });
  const u =
    "absolute top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center text-[11px] transition";
  return (
    <div className="relative flex-1 min-w-0 -mx-2">
      <nav
        ref={tRef}
        aria-label="Shop by category"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={w}
        onPointerCancel={w}
        onClickCapture={onClickCapture}
        onDragStart={(H) => H.preventDefault()}
        className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth select-none cursor-grab active:cursor-grabbing"
      >
        {P.map((H) => {
          const K = c(H);
          return (
            <button
              key={H.key}
              type="button"
              aria-current={K ? "true" : undefined}
              onClick={() => {
                if (H.to) {
                  return i(H.to);
                }
                return onPick(H.key);
              }}
              className={`shrink-0 px-3 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition ${K ? "border-brand-400 text-white" : "border-transparent text-slate-300 hover:text-white"}`}
            >
              {H.label}
            </button>
          );
        })}
      </nav>
      {a.left && (
        <>
          <span
            className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-dark-800 via-dark-800/80 to-transparent"
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={() => p(-1)}
            aria-label="Scroll categories left"
            className={`${u} left-0`}
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
        </>
      )}
      {a.right && (
        <>
          <span
            className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-dark-800 via-dark-800/80 to-transparent"
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={() => p(1)}
            aria-label="Scroll categories right"
            className={`${u} right-0`}
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </>
      )}
    </div>
  );
}
