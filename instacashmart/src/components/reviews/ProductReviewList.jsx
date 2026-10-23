import { Stars } from "./Stars";
import { useProductReviews } from "./productReviews";
import { formatDateTime } from "../../lib/format";

export function ProductReview({ review }) {
  return (
    <li className="py-3 first:pt-0 last:pb-0">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
        <Stars value={review.rating} />
        <span className="text-xs font-bold text-slate-900">{review.name}</span>
        {review.orderId && (
          <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded">
            <i className="fa-solid fa-circle-check text-[9px]" /> Verified
            purchase
          </span>
        )}
        <span className="text-[10px] text-slate-400">
          {formatDateTime(review.createdAt)}
        </span>
      </div>
      {review.text && (
        <p className="mt-1 text-xs text-slate-700 leading-relaxed whitespace-pre-line break-words">
          {review.text}
        </p>
      )}
    </li>
  );
}

export function ProductReviewList({ product, limit = 3, onSeeAll }) {
  const { list, count, avg } = useProductReviews(product);
  if (count) {
    return (
      <div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-extrabold text-slate-900">
            {avg.toFixed(1)}
          </span>
          <Stars value={avg} />
          <span className="text-xs text-slate-500">
            {count} review{count > 1 ? "s" : ""}
          </span>
          {onSeeAll && count > limit && (
            <button
              type="button"
              onClick={onSeeAll}
              className="ml-auto text-xs font-bold text-brand-700 hover:text-brand-800"
            >
              See all
            </button>
          )}
        </div>
        <ul className="mt-3 divide-y divide-slate-100">
          {list.slice(0, limit).map((i) => (
            <ProductReview key={i.id} review={i} />
          ))}
        </ul>
      </div>
    );
  }
  return (
    <p className="text-xs text-slate-500">
      No reviews yet. Buyers can review this product after ordering.
    </p>
  );
}
