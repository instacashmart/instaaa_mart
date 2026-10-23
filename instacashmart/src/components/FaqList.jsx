import { useState } from "react";
import { FAQS } from "../data/site";

export function FaqList({
  buttonClass = "gap-4 px-5 py-4",
  className = "space-y-3",
}) {
  const [t, setT] = useState(null);
  return (
    <div className={`reveal-group ${className}`}>
      {FAQS.map((a, n) => (
        <div
          key={a.q}
          className="border border-slate-200 rounded-2xl overflow-hidden transition"
        >
          <button
            type="button"
            onClick={() => setT(t === n ? null : n)}
            aria-expanded={t === n}
            className={`w-full flex items-center justify-between text-left bg-slate-50/50 hover:bg-slate-50 font-bold text-sm text-slate-900 ${buttonClass}`}
          >
            <span>{a.q}</span>
            <i
              className={`fa-solid fa-chevron-down text-xs text-slate-400 transition-transform ${t === n ? "rotate-180" : ""}`}
            />
          </button>
          {t === n && (
            <div className="p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
              {a.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
