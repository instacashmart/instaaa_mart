import { formatDateTime } from "../../lib/format";
import { store } from "../../lib/store";
import { AdminStars, EmptyState } from "./shared";

export function FeedbackAdmin({ feedback, showToast }) {
  const t = feedback.length
    ? feedback.reduce((acc, item) => acc + (Number(item.rating) || 0), 0) /
      feedback.length
    : 0;
  const r = (n) => {
    if (window.confirm(`Delete feedback from ${n.name || "this customer"}?`)) {
      store.remove("feedback", n.id);
      showToast("Feedback deleted");
    }
  };
  const a = (n) => {
    store.update("feedback", n.id, {
      hidden: !n.hidden,
    });
    showToast(
      n.hidden ? "Shown on Customer Reviews" : "Hidden from Customer Reviews",
    );
  };
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Customer Feedback
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Sent from the Feedback page, newest first.
          </p>
        </div>
        {feedback.length > 0 && (
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2">
            <span className="text-lg font-extrabold text-slate-900">
              {t.toFixed(1)}
            </span>
            <AdminStars value={Math.round(t)} />
            <span className="text-[11px] text-slate-500">
              avg of {feedback.length}
            </span>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-3">
        {feedback.length ? (
          feedback.map((n) => (
            <article
              key={n.id}
              className="rounded-2xl border border-slate-200 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      {n.name || "Anonymous"}
                    </h3>
                    <AdminStars value={Number(n.rating) || 0} />
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {n.topic}
                    </span>
                    {n.public ? (
                      n.hidden ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700">
                          <i className="fa-solid fa-eye-slash text-[9px]" />{" "}
                          Hidden from reviews
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700">
                          <i className="fa-solid fa-eye text-[9px]" /> On
                          Customer Reviews
                        </span>
                      )
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                        <i className="fa-solid fa-lock text-[9px]" /> Private
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    <span className="font-mono">{n.id}</span> ·{" "}
                    {formatDateTime(n.createdAt)}
                    {n.phone && (
                      <>
                        {" "}
                        ·{" "}
                        <a
                          href={`tel:+91${n.phone}`}
                          className="text-brand-700 font-semibold hover:underline"
                        >
                          +91 {n.phone}
                        </a>
                      </>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {n.public && (
                    <button
                      type="button"
                      onClick={() => a(n)}
                      className="px-3 h-8 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 hover:border-slate-900 transition"
                    >
                      {n.hidden ? "Show on reviews" : "Hide from reviews"}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => r(n)}
                    aria-label="Delete"
                    className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-300 transition"
                  >
                    <i className="fa-solid fa-trash-can text-xs" />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-700 whitespace-pre-line break-words">
                {n.message}
              </p>
            </article>
          ))
        ) : (
          <EmptyState>
            No feedback yet. It appears here when a customer sends it from the
            Feedback page.
          </EmptyState>
        )}
      </div>
    </section>
  );
}
