export const Stars = ({ value, className = "text-xs" }) => (
  <span
    className={`text-amber-400 whitespace-nowrap ${className}`}
    aria-label={`${value} out of 5 stars`}
  >
    {[1, 2, 3, 4, 5].map((t) => (
      <i
        key={t}
        className={`fa-solid fa-star ${t <= Math.round(value) ? "" : "text-slate-200"}`}
      />
    ))}
  </span>
);
