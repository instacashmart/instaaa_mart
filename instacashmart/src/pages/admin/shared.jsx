export const EmptyState = ({ children }) => (
  <div className="rounded-2xl border border-dashed border-slate-300 py-10 px-6 text-center text-sm text-slate-500">
    {children}
  </div>
);

export const AdminStars = ({ value }) => (
  <span
    className="text-amber-400 text-xs whitespace-nowrap"
    aria-label={`${value} out of 5 stars`}
  >
    {[1, 2, 3, 4, 5].map((e) => (
      <i
        key={e}
        className={`fa-solid fa-star ${e <= value ? "" : "text-slate-200"}`}
      />
    ))}
  </span>
);

export const adminInputClass =
  "w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500";

export const phoneLink = (A) =>
  A && (
    <a href={`tel:+91${A}`} className="text-brand-700 hover:underline">
      +91 {A}
    </a>
  );
