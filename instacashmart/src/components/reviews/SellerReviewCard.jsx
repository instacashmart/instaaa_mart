export function SellerReviewCard({ review }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div
          className="flex items-center text-amber-400 text-xs mb-3"
          aria-label={`${review.rating} out of 5 stars`}
        >
          {[1, 2, 3, 4, 5].map((e) => (
            <i
              key={e}
              className={`fa-solid fa-star ${e <= review.rating ? "" : "text-slate-200"}`}
            />
          ))}
        </div>
        <p className="text-xs text-slate-600 leading-relaxed italic break-words">
          {review.text}
        </p>
      </div>
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-9 h-9 shrink-0 rounded-full ${review.avatarClass} font-bold flex items-center justify-center text-xs`}
          >
            {review.initials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">
              {review.name}
            </p>
            <p className="text-[10px] text-slate-400 truncate">{review.meta}</p>
          </div>
        </div>
        {review.fresh ? (
          <span className="shrink-0 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
            New
          </span>
        ) : (
          <span className="shrink-0 text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
            {review.badge}
          </span>
        )}
      </div>
    </div>
  );
}
