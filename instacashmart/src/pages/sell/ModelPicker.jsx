import { useEffect, useState } from "react";
import { fieldClass } from "./FieldLabel";

export function ModelPicker({ models, selected, onSelect, onCustom }) {
  const [a, setA] = useState(selected?.name || "");
  const [i, setI] = useState(false);
  const [P, setP] = useState(0);
  useEffect(() => setA(selected?.name || ""), [selected]);
  const c = a.trim().toLowerCase();
  const l = models
    .map((m, i_1) => ({
      m,
      i: i_1,
    }))
    .filter(({ m }) =>
      c.split(/\s+/).every((K) => m.name.toLowerCase().includes(K)),
    );
  const j = l.some(({ m }) => m.name.toLowerCase() === c);
  const w = c && !j;
  const F = l.length + (w ? 1 : 0);
  const p = (H) => {
    if (H < l.length) {
      onSelect(l[H].i);
      setA(l[H].m.name);
    } else {
      onCustom(a.trim());
    }
    setI(false);
  };
  const onKeyDown = (H) => {
    if (H.key === "ArrowDown" || H.key === "ArrowUp") {
      H.preventDefault();
      setI(true);
      setP((K) => (K + (H.key === "ArrowDown" ? 1 : -1) + F) % Math.max(F, 1));
    } else if (H.key === "Enter" && i && F) {
      H.preventDefault();
      p(P);
    } else if (H.key === "Escape") {
      setI(false);
    }
  };
  return (
    <div className="relative">
      <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none" />
      <input
        id="modelSearch"
        type="text"
        role="combobox"
        aria-expanded={i}
        aria-controls="modelSearchList"
        aria-autocomplete="list"
        autoComplete="off"
        value={a}
        placeholder="Type your model, e.g. iPhone 15 Pro"
        onChange={(H) => {
          setA(H.target.value);
          setP(0);
          setI(true);
        }}
        onFocus={() => setI(true)}
        onBlur={() => {
          setI(false);
          setA(selected?.name || "");
        }}
        onKeyDown={onKeyDown}
        className={`${fieldClass} pl-10 pr-4 py-3 font-semibold`}
      />
      {i && F > 0 && (
        <ul
          id="modelSearchList"
          role="listbox"
          className="absolute z-20 mt-1 w-full max-h-64 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg py-1"
        >
          {l.map(({ m, i: i_1 }, R) => (
            <li
              key={m.name}
              role="option"
              aria-selected={selected?.name === m.name}
              onMouseDown={(U) => {
                U.preventDefault();
                p(R);
              }}
              onMouseEnter={() => setP(R)}
              className={`px-4 py-2.5 text-sm font-semibold cursor-pointer flex items-center justify-between ${R === P ? "bg-brand-50 text-brand-700" : "text-slate-700"}`}
            >
              <span>{m.name}</span>
              {selected?.name === m.name && (
                <i className="fa-solid fa-check text-xs text-brand-600" />
              )}
            </li>
          ))}
          {w && (
            <li
              role="option"
              aria-selected={false}
              onMouseDown={(H) => {
                H.preventDefault();
                p(l.length);
              }}
              onMouseEnter={() => setP(l.length)}
              className={`px-4 py-2.5 text-sm cursor-pointer border-t border-slate-100 ${P === l.length ? "bg-brand-50 text-brand-700" : "text-slate-600"}`}
            >
              <i className="fa-solid fa-pen-to-square mr-2 text-xs" />
              {l.length ? "Not listed? Use" : "No match. Use"}{" "}
              <span className="font-bold">"{a.trim()}"</span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
