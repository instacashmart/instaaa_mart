import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { otherDeviceSellUrl, sellPage } from "../../data/sellBrands";

const otherInputClass =
  "w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500";

export function OtherDeviceModal({
  category,
  fixedBrand = "",
  initialBrand = "",
  initialModel = "",
  onClose,
}) {
  const n = sellPage(category);
  const i = useNavigate();
  const [f, setF] = useState(fixedBrand || initialBrand);
  const [x, setX] = useState(initialModel);
  const [l, setL] = useState("");
  const wRef = useRef(null);
  useEffect(() => {
    wRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    wRef.current?.focus({
      preventScroll: true,
    });
  }, []);
  const F = (p) => {
    p.preventDefault();
    if (!f.trim() || !x.trim()) {
      setL(
        fixedBrand
          ? "Enter your model name."
          : "Enter both the brand and the model.",
      );
      return;
    }
    i(otherDeviceSellUrl(category, f, x));
  };
  return (
    <form
      onSubmit={F}
      noValidate
      className="mt-5 rounded-2xl border-2 border-dashed border-brand-300 bg-brand-50/40 p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">
            {fixedBrand ? `Other ${fixedBrand} model` : `Other ${n.noun} brand`}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Type it in and we'll confirm the best price after a quick check at
            pickup.
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 shrink-0 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center text-xs transition"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        )}
      </div>
      <div
        className={`grid grid-cols-1 ${fixedBrand ? "" : "sm:grid-cols-2"} gap-3 mt-4`}
      >
        {!fixedBrand && (
          <div>
            <label
              htmlFor="otherBrand"
              className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1"
            >
              Brand name
            </label>
            <input
              id="otherBrand"
              ref={wRef}
              type="text"
              value={f}
              onChange={(p) => {
                setF(p.target.value);
                setL("");
              }}
              placeholder="e.g. Lava, Micromax, Gigabyte"
              autoComplete="off"
              className={otherInputClass}
            />
          </div>
        )}
        <div>
          <label
            htmlFor="otherModel"
            className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1"
          >
            Model name
          </label>
          <input
            id="otherModel"
            ref={fixedBrand ? wRef : undefined}
            type="text"
            value={x}
            onChange={(p) => {
              setX(p.target.value);
              setL("");
            }}
            placeholder="As written on the box or in Settings → About"
            autoComplete="off"
            className={otherInputClass}
          />
        </div>
      </div>
      {l && (
        <p role="alert" className="mt-2 text-xs font-semibold text-red-600">
          {l}
        </p>
      )}
      <button
        type="submit"
        className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold transition"
      >
        Continue <i className="fa-solid fa-arrow-right text-xs" />
      </button>
    </form>
  );
}
