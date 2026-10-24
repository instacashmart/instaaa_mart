import { useMemo } from "react";
import { TESTIMONIALS } from "../../data/site";
import { useStoreList } from "../../lib/store";

const AVATAR_CLASSES = [
  "bg-brand-100 text-brand-700",
  "bg-slate-100 text-slate-900",
  "bg-amber-100 text-amber-700",
];

const initialsOf = (name) =>
  String(name)
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((e) => e[0]?.toUpperCase() || "")
    .join("") || "?";

function usePublicFeedback() {
  const A = useStoreList("feedback");
  return useMemo(
    () =>
      A.filter(
        (e) =>
          e.status === "approved" && e.public && !e.hidden && e.message,
      ).map((e, t) => ({
        key: e.id,
        name: e.name || "Customer",
        initials: initialsOf(e.name),
        avatarClass: AVATAR_CLASSES[t % AVATAR_CLASSES.length],
        meta: `${e.topic} • ${new Date(e.createdAt).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          },
        )}`,
        rating: Number(e.rating) || 0,
        text: `"${e.message}"`,
        fresh: true,
      })),
    [A],
  );
}

export function useSellerReviews() {
  const A = usePublicFeedback();
  return useMemo(
    () => [
      ...A,
      ...TESTIMONIALS.map((e) => ({
        ...e,
        key: e.name,
        rating: 5,
        badge: e.amount,
      })),
    ],
    [A],
  );
}
