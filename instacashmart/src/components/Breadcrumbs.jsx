import { Link } from "react-router-dom";

export const Breadcrumbs = ({ items }) => (
  <nav
    aria-label="Breadcrumb"
    className="flex items-center gap-2 text-xs font-semibold text-slate-500"
  >
    {items.map(([e, t], r) => (
      <span key={e} className="flex items-center gap-2">
        {r > 0 && (
          <i className="fa-solid fa-chevron-right text-[9px] text-slate-400" />
        )}
        {t ? (
          <Link to={t} className="hover:text-brand-700">
            {e}
          </Link>
        ) : (
          <span className="text-slate-900">{e}</span>
        )}
      </span>
    ))}
  </nav>
);
