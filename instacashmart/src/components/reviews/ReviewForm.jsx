import { useState } from "react";
import { ProductReview } from "./ProductReviewList";
import { RATING_LABELS, productKey } from "./productReviews";
import { store, useStoreList } from "../../lib/store";

export function ReviewForm({ product, orderId, defaultName = "" }) {
  const a = useStoreList("reviews").find((H) => H.orderId === orderId);
  const [n, setN] = useState(0);
  const [f, setF] = useState(0);
  const [x, setX] = useState(defaultName);
  const [l, setL] = useState("");
  const [w, setW] = useState("");
  if (a) {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50/50 p-4 text-left">
        <p className="text-xs font-bold text-brand-700">
          <i className="fa-solid fa-heart" /> Thanks! Your review was submitted
          for moderation.
        </p>
        <ul className="mt-3">
          <ProductReview review={a} />
        </ul>
      </div>
    );
  }
  const p = async (H) => {
    H.preventDefault();
    if (!n) {
      setW("Please choose a star rating.");
      return;
    }
    try {
      await store.addAndWait("reviews", {
        id: store.newId("RV"),
        createdAt: new Date().toISOString(),
        productKey: productKey(product),
        productName: product.name,
        orderId,
        name: x.trim() || "Customer",
        rating: n,
        text: l.trim(),
        status: "pending",
      });
    } catch (error) {
      setW(error.message);
    }
  };
  const u = f || n;
  return (
    <form
      onSubmit={p}
      className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-left space-y-3"
    >
      <div>
        <p className="text-sm font-extrabold text-slate-900">
          Rate this product
        </p>
        <p className="text-[11px] text-slate-500">
          Your review helps other shoppers. It will be marked as a verified
          purchase.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div
          className="flex gap-1"
          role="radiogroup"
          aria-label="Rating"
          onMouseLeave={() => setF(0)}
        >
          {[1, 2, 3, 4, 5].map((H) => (
            <button
              key={H}
              type="button"
              role="radio"
              aria-checked={n === H}
              aria-label={`${H} star${H > 1 ? "s" : ""}`}
              onMouseEnter={() => setF(H)}
              onClick={() => {
                setN(H);
                setW("");
              }}
              className={`text-2xl transition-transform hover:scale-110 ${H <= u ? "text-amber-400" : "text-slate-300"}`}
            >
              <i className="fa-solid fa-star" />
            </button>
          ))}
        </div>
        <span className="text-xs font-bold text-slate-700">
          {RATING_LABELS[u]}
        </span>
      </div>
      <input
        value={x}
        onChange={(H) => setX(H.target.value)}
        maxLength={40}
        aria-label="Name shown with your review"
        placeholder="Name shown with your review"
        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
      />
      <textarea
        value={l}
        onChange={(H) => setL(H.target.value)}
        rows={3}
        maxLength={500}
        aria-label="Your review"
        placeholder="What did you like or dislike? (optional)"
        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
      />
      {w && (
        <p role="alert" className="text-xs font-semibold text-red-700">
          {w}
        </p>
      )}
      <button
        type="submit"
        className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition"
      >
        Post Review
      </button>
    </form>
  );
}
