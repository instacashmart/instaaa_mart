import { useSearchParams } from "react-router-dom";
import { BackToHome } from "../components/BackToHome";
import { MyOrders } from "../components/orders/MyOrders";
import { TrackOrderForm } from "../components/orders/TrackOrderForm";

export function TrackPage() {
  const [A, e] = useSearchParams();
  const initialId = A.get("id") || "";
  const onSelect = (a) => {
    e({
      id: a,
    });
    document.getElementById("trackingInput")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };
  return (
    <main>
      <BackToHome />
      <section
        id="track"
        className="max-w-3xl mx-3 sm:mx-4 md:mx-auto mt-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
      >
        <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
          Track Your Order
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Sell pickups (CN-…) and accessory orders (CNB-…)
        </p>
        <TrackOrderForm
          initialId={initialId}
          large
          emptyText="Enter the order ID from your confirmation, or pick one from My Orders below."
        />
      </section>
      <MyOrders onSelect={onSelect} className="mt-4 p-4 sm:p-6" />
    </main>
  );
}
