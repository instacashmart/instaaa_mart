export const fieldClass =
  "w-full bg-white border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 transition";

export const FieldLabel = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
  >
    {children}
  </label>
);
