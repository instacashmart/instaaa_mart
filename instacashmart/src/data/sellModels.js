import { SELL_CATALOG } from "./sellCatalog";
import { CATEGORY_IMAGES } from "./site";
import { store, useStoreList } from "../lib/store";

const BUILT_IN_MODELS = Object.fromEntries(
  Object.entries(SELL_CATALOG).map(([A, e]) => [
    A,
    Object.fromEntries(Object.entries(e.models).map(([t, r]) => [t, [...r]])),
  ]),
);

let activeAdminModels = [];

function applyAdminModels(A) {
  if (A !== activeAdminModels) {
    activeAdminModels = A;
    for (const [e, t] of Object.entries(SELL_CATALOG)) {
      for (const r of Object.keys(t.models)) {
        t.models[r] = [...(BUILT_IN_MODELS[e][r] || [])];
      }
    }
    for (const e of A) {
      const t = SELL_CATALOG[e.category];
      if (!t || !e.name) {
        continue;
      }
      const r = t.models[e.brand] || (t.models[e.brand] = []);
      const a = {
        name: e.name,
        base: Number(e.base) || 0,
        adminId: e.id,
      };
      const n = r.findIndex(
        (i) => i.name.toLowerCase() === e.name.toLowerCase(),
      );
      if (n >= 0) {
        r[n] = {
          ...r[n],
          ...a,
        };
      } else {
        r.unshift(a);
      }
    }
  }
}

applyAdminModels(store.list("sellModels"));

export function useAdminModels() {
  const A = useStoreList("sellModels");
  applyAdminModels(A);
  return A;
}

const adminModelImage = (A, e) => {
  const t = String(e || "").toLowerCase();
  return activeAdminModels.find(
    (a) => a.category === A && a.image && a.name.toLowerCase() === t,
  )?.image;
};

export const builtInModels = (A, e) => BUILT_IN_MODELS[A]?.[e] || [];

const imageSlug = (A) =>
  String(A)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const MODEL_IMAGES = Object.fromEntries(
  Object.entries(
    import.meta.glob("../assets/models/*.jpg", {
      eager: true,
      import: "default",
    }),
  ).map(([A, e]) => [
    A.split("/")
      .pop()
      .replace(/\.[^.]+$/, "")
      .toLowerCase(),
    e,
  ]),
);

export const modelImage = (A, e) =>
  adminModelImage(A, e) || MODEL_IMAGES[imageSlug(e)] || CATEGORY_IMAGES[A];
