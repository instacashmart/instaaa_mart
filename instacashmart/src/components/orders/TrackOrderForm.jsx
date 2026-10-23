import { useEffect, useState } from "react";
import { TrackResult } from "./TrackResult";
import { useApp } from "../../context/AppContext";

export function TrackOrderForm({ initialId = "", large = false, emptyText }) {
  const { showToast } = useApp();
  const [a, setA] = useState(initialId);
  const [i, setI] = useState(initialId);
  useEffect(() => {
    setA(initialId);
    setI(initialId);
  }, [initialId]);
  const P = (x) => {
    x.preventDefault();
    const c = a.trim();
    if (!c) {
      showToast("Please enter an order ID to track");
      return;
    }
    setI(c);
  };
  return (
    <>
      <form onSubmit={P} className="mt-4 flex gap-2">
        <input
          id="trackingInput"
          type="text"
          value={a}
          onChange={(x) => setA(x.target.value)}
          placeholder="Enter Order ID (e.g. CN-884920)"
          className={`flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase focus:outline-none focus:ring-2 focus:ring-brand-500 ${large ? "px-3.5 py-2.5 text-sm" : "px-3.5 py-2 text-xs"}`}
        />
        <button
          type="submit"
          className={`bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition ${large ? "px-5 py-2.5 text-sm" : "px-4 py-2 text-xs"}`}
        >
          Search
        </button>
      </form>
      <div className="mt-6 text-xs">
        {i ? (
          <TrackResult query={i} />
        ) : (
          <p className="text-center text-slate-400 py-6">{emptyText}</p>
        )}
      </div>
    </>
  );
}
