import { useEffect, useState } from "react";
import { POPULAR_ACCESSORIES } from "../data/accessories";
import { TRENDING_DEVICES } from "../data/site";

const STORAGE_KEYS = {
  sell: "cashnova.sellOrders",
  buy: "cashnova.buyOrders",
  products: "cashnova.products",
  trending: "cashnova.trendingDevices",
  popular: "cashnova.popularAccessories",
  feedback: "cashnova.feedback",
  reviews: "cashnova.reviews",
  sellModels: "cashnova.sellModels",
  vehicles: "cashnova.vehicles",
  vehicleLeads: "cashnova.vehicleLeads",
  vehicleProducts: "cashnova.vehicleProducts",
};

const DEFAULT_LISTS = {
  trending: TRENDING_DEVICES,
  popular: POPULAR_ACCESSORIES,
};

const CHANGE_EVENT = "cashnova:change";

export const ORDER_STEPS = {
  sell: [
    {
      status: "New",
      label: "Pickup Requested",
      icon: "fa-clipboard-check",
    },
    {
      status: "Scheduled",
      label: "Technician Assigned",
      icon: "fa-motorcycle",
    },
    {
      status: "Picked up",
      label: "Picked Up & Checked",
      icon: "fa-magnifying-glass",
    },
    {
      status: "Paid",
      label: "Payment Sent",
      icon: "fa-indian-rupee-sign",
    },
  ],
  buy: [
    {
      status: "New",
      label: "Order Placed",
      icon: "fa-receipt",
    },
    {
      status: "Packed",
      label: "Packed",
      icon: "fa-box",
    },
    {
      status: "Shipped",
      label: "Shipped",
      icon: "fa-truck-fast",
    },
    {
      status: "Delivered",
      label: "Delivered",
      icon: "fa-house-circle-check",
    },
  ],
};

function readList(A) {
  try {
    const e = localStorage.getItem(STORAGE_KEYS[A]);
    if (e === null && A === "trending") {
      try {
        localStorage.setItem(STORAGE_KEYS[A], JSON.stringify(TRENDING_DEVICES));
      } catch {}
      return TRENDING_DEVICES;
    }
    const t = JSON.parse(e);
    if (Array.isArray(t)) {
      return t;
    }
    return DEFAULT_LISTS[A] || [];
  } catch {
    return DEFAULT_LISTS[A] || [];
  }
}

function writeList(A, e) {
  try {
    localStorage.setItem(STORAGE_KEYS[A], JSON.stringify(e));
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}

export const store = {
  list: readList,
  add(A, e) {
    return writeList(A, [e, ...readList(A)]);
  },
  update(A, e, t) {
    return writeList(
      A,
      readList(A).map((r) => {
        if (r.id === e) {
          return {
            ...r,
            ...t,
          };
        }
        return r;
      }),
    );
  },
  remove(A, e) {
    return writeList(
      A,
      readList(A).filter((t) => t.id !== e),
    );
  },
  resetTrending() {
    writeList("trending", TRENDING_DEVICES);
    return TRENDING_DEVICES;
  },
  resetPopular() {
    try {
      localStorage.removeItem(STORAGE_KEYS.popular);
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {}
  },
  move(A, e, t) {
    const r = [...readList(A)];
    const a = r.findIndex((i) => i.id === e);
    const n = a + t;
    if (a < 0 || n < 0 || n >= r.length) {
      return false;
    }
    return (([r[a], r[n]] = [r[n], r[a]]), writeList(A, r));
  },
  setStatus(A, e, t) {
    const r = readList(A).find((n) => n.id === e);
    if (!r) {
      return false;
    }
    const history = {
      New: r.createdAt,
      ...(r.history || {}),
      [t]: new Date().toISOString(),
    };
    return this.update(A, e, {
      status: t,
      history,
    });
  },
  findOrder(A) {
    const e = String(A || "")
      .trim()
      .toUpperCase();
    if (!e) {
      return null;
    }
    for (const t of ["sell", "buy"]) {
      const r = readList(t).find((a) => String(a.id).toUpperCase() === e);
      if (r) {
        return {
          type: t,
          item: r,
        };
      }
    }
    return null;
  },
  newId(A) {
    return `${A}-${Math.floor(100000 + Math.random() * 900000)}`;
  },
};

export function useStoreVersion() {
  const [A, setA] = useState(0);
  useEffect(() => {
    const t = () => setA((a) => a + 1);
    const r = () => {
      if (!document.hidden) {
        t();
      }
    };
    window.addEventListener(CHANGE_EVENT, t);
    window.addEventListener("storage", t);
    document.addEventListener("visibilitychange", r);
    return () => {
      window.removeEventListener(CHANGE_EVENT, t);
      window.removeEventListener("storage", t);
      document.removeEventListener("visibilitychange", r);
    };
  }, []);
  return A;
}

export function useStoreList(A) {
  const e = useStoreVersion();
  const [t, setT] = useState(() => readList(A));
  useEffect(() => setT(readList(A)), [A, e]);
  return t;
}
