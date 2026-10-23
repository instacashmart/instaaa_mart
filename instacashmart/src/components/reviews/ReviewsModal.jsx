import { CloseButton, Modal } from "../Modal";
import { ProductReview } from "./ProductReviewList";
import { Stars } from "./Stars";
import { useProductReviews } from "./productReviews";

export function ReviewsModal({ product, onClose }) {
  const { list, count, avg } = useProductReviews(product);
  if (product) {
    return (
      <Modal
        open
        onClose={onClose}
        className="max-w-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Customer reviews
            </span>
            <h3 className="text-base font-extrabold text-slate-900 mt-1 leading-snug">
              {product.name}
            </h3>
            {count > 0 && (
              <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                <span className="font-extrabold text-slate-900">
                  {avg.toFixed(1)}
                </span>
                <Stars value={avg} />
                {count} review{count > 1 ? "s" : ""}
              </p>
            )}
          </div>
          <CloseButton onClick={onClose} label="Close reviews" />
        </div>
        {count ? (
          <ul className="mt-4 divide-y divide-slate-100">
            {list.map((n) => (
              <ProductReview key={n.id} review={n} />
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-sm text-slate-500 text-center">
            No reviews yet. Buyers can review this product after ordering.
          </p>
        )}
      </Modal>
    );
  }
  return null;
}
