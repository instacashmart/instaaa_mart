import { useMemo } from "react";
import { useStoreList } from "../../lib/store";

export const RATING_LABELS = [
  "",
  "Poor",
  "Fair",
  "Good",
  "Very good",
  "Excellent",
];

export const productKey = (A) =>
  A.id ||
  `name:${String(A.name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;

export function useProductReviews(product) {
  const e = useStoreList("reviews");
  return useMemo(() => {
    if (!product) {
      return {
        list: [],
        count: 0,
        avg: 0,
      };
    }
    const t = productKey(product);
    const r = e.filter((n) => n.productKey === t);
    const avg = r.length
      ? r.reduce((acc, item) => acc + Number(item.rating), 0) / r.length
      : 0;
    return {
      list: r,
      count: r.length,
      avg,
    };
  }, [e, product]);
}
