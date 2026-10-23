import { OTHER_BRAND } from "../../data/sellBrands";
import {
  SELL_CATALOG,
  VARIANT_OPTIONS,
  findModel,
} from "../../data/sellCatalog";

const defaultVariants = (A) => ({
  storage: VARIANT_OPTIONS[A]?.storage?.def ?? null,
  ram: VARIANT_OPTIONS[A]?.ram?.def ?? null,
});

export const initialSelection = (A, e, t = null) => ({
  category: A,
  brand: e || SELL_CATALOG[A].brands[0],
  modelIndex: t,
  ...defaultVariants(A),
});

export function selectionFromParams(A) {
  const e = SELL_CATALOG[A.get("cat")] ? A.get("cat") : "phone";
  const t = A.get("brand");
  const quickModel = A.get("model");
  if (t === OTHER_BRAND) {
    return {
      ...initialSelection(e, OTHER_BRAND),
      otherBrand: A.get("otherBrand") || "",
      otherModel: A.get("otherModel") || "",
    };
  }
  if (t && quickModel) {
    const a = findModel(t, quickModel, A.get("cat"));
    if (a) {
      return {
        ...initialSelection(a.category, a.brand, a.index),
        quickModel,
      };
    }
  }
  return initialSelection(e, SELL_CATALOG[e].brands.includes(t) ? t : null);
}
