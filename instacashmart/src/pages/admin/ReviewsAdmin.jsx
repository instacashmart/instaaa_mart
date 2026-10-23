import { formatDateTime } from "../../lib/format";
import { store } from "../../lib/store";
import { AdminStars, EmptyState } from "./shared";

export function ReviewsAdmin({ reviews, showToast }) {
  const t = (r) => {
    if (
      window.confirm(
        `Delete ${r.name}'s review of "${r.productName}"? Shoppers will no longer see it.`,
      )
    ) {
      store.remove("reviews", r.id);
      showToast("Review deleted");
    }
  };
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <h2 className="text-base font-bold text-slate-900">Product Reviews</h2>
      <p className="text-xs text-slate-500 mt-0.5">
        Posted by buyers after placing an order. Shoppers see them on the
        product; delete any that break the rules.
      </p>
      <div className="mt-4 space-y-3">
        {reviews.length ? (
          reviews.map((r) => (
            <article
              key={r.id}
              className="rounded-2xl border border-slate-200 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">
                    {r.productName}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <h3 className="text-sm font-bold text-slate-900">
                      {r.name}
                    </h3>
                    <AdminStars value={Number(r.rating) || 0} />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {formatDateTime(r.createdAt)}
                    {r.orderId && (
                      <>
                        {" "}
                        · order <span className="font-mono">{r.orderId}</span>
                      </>
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => t(r)}
                  aria-label="Delete review"
                  className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-300 transition"
                >
                  <i className="fa-solid fa-trash-can text-xs" />
                </button>
              </div>
              {r.text && (
                <p className="mt-3 text-sm text-slate-700 whitespace-pre-line break-words">
                  {r.text}
                </p>
              )}
            </article>
          ))
        ) : (
          <EmptyState>
            No reviews yet. They appear here when a buyer rates a product after
            ordering.
          </EmptyState>
        )}
      </div>
    </section>
  );
}
