import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { SimpleHeader, headerButtonClass } from "../../components/Logo";
import {
  auth,
  hasAdminAccess,
  signInAdmin,
  signOutAdmin,
} from "../../firebase";
import { useAdminModels } from "../../data/sellModels";
import { formatDate, formatPrice } from "../../lib/format";
import { useStoreList } from "../../lib/store";
import { AdminOrderCard } from "./AdminOrderCard";
import { FeedbackAdmin } from "./FeedbackAdmin";
import { PopularAdmin } from "./PopularAdmin";
import { ProductsAdmin } from "./ProductsAdmin";
import { ReviewsAdmin } from "./ReviewsAdmin";
import { SellModelsAdmin } from "./SellModelsAdmin";
import { TrendingAdmin } from "./TrendingAdmin";
import { LeadsAdmin, ListingsAdmin } from "./VehicleAdmin";
import { VehicleProductsAdmin } from "./VehicleProductsAdmin";
import { EmptyState } from "./shared";

const PAYMENT_LABELS = {
  upi: "UPI",
  card: "Card",
  cod: "Cash on delivery",
};

const ADMIN_TABS = [
  {
    key: "sell",
    label: "Sell Details",
    icon: "fa-hand-holding-dollar",
    hint: "pickups booked",
  },
  {
    key: "buy",
    label: "Buy Details",
    icon: "fa-bag-shopping",
    hint: "accessory orders",
  },
  {
    key: "products",
    label: "Products",
    icon: "fa-box-open",
    hint: "buy accessories",
  },
  {
    key: "models",
    label: "Sell Models",
    icon: "fa-mobile-screen-button",
    hint: "added / edited models",
  },
  {
    key: "popular",
    label: "Popular Accessories",
    icon: "fa-star",
    hint: "homepage rail",
  },
  {
    key: "trending",
    label: "Trending Devices",
    icon: "fa-fire",
    hint: "homepage resale",
  },
  {
    key: "feedback",
    label: "Feedback",
    icon: "fa-comment-dots",
    hint: "from customers",
  },
  {
    key: "reviews",
    label: "Product Reviews",
    icon: "fa-star-half-stroke",
    hint: "from buyers",
  },
  {
    key: "bikes",
    label: "Bikes",
    icon: "fa-motorcycle",
    hint: "added for sale",
  },
  {
    key: "cars",
    label: "Cars",
    icon: "fa-car-side",
    hint: "added for sale",
  },
  {
    key: "vehicles",
    label: "Bike & Car Listings",
    icon: "fa-car-side",
    hint: "posted by sellers",
  },
  {
    key: "vehicleLeads",
    label: "Bike & Car Enquiries",
    icon: "fa-phone-volume",
    hint: "from buyers",
  },
];

function initialAdminTab() {
  try {
    const A = sessionStorage.getItem("adminTab");
    if (ADMIN_TABS.some((e) => e.key === A)) {
      return A;
    }
    return "sell";
  } catch {
    return "sell";
  }
}

export function AdminPage() {
  const A = useStoreList("vehicleProducts");
  const e = {
    sell: useStoreList("sell"),
    buy: useStoreList("buy"),
    products: useStoreList("products"),
    popular: useStoreList("popular"),
    trending: useStoreList("trending"),
    feedback: useStoreList("feedback"),
    reviews: useStoreList("reviews"),
    bikes: A.filter((P) => P.type === "bike"),
    cars: A.filter((P) => P.type === "car"),
    vehicles: useStoreList("vehicles"),
    vehicleLeads: useStoreList("vehicleLeads"),
    models: useAdminModels(),
  };
  const [t, setT] = useState(initialAdminTab);
  const [a, setA] = useState("");
  const [isCloudAdmin, setIsCloudAdmin] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const iRef = useRef(null);
  useEffect(() => {
    document.title = "InstaCashMart Admin";
    try {
      sessionStorage.setItem("adminTab", t);
    } catch {}
  }, [t]);
  const showToast = (P) => {
    setA(P);
    clearTimeout(iRef.current);
    iRef.current = setTimeout(() => setA(""), 2500);
  };
  useEffect(() => {
    if (!auth) {
      setIsCloudAdmin(false);
      return undefined;
    }
    return onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          setIsCloudAdmin(false);
          return;
        }
        try {
          const token = await user.getIdTokenResult(true);
          setIsCloudAdmin(hasAdminAccess(user, token.claims));
        } catch (error) {
          console.error("Could not check Firebase admin access:", error);
          setIsCloudAdmin(false);
          setAuthError(error.message);
        }
      },
      (error) => {
        console.error("Firebase authentication state failed:", error);
        setIsCloudAdmin(false);
        setAuthError(error.message);
      },
    );
  }, []);
  const handleAdminSignIn = async (event) => {
    event.preventDefault();
    setAuthBusy(true);
    setAuthError("");
    try {
      const credential = await signInAdmin(email.trim(), password);
      const token = await credential.user.getIdTokenResult(true);
      if (!hasAdminAccess(credential.user, token.claims)) {
        await signOutAdmin();
        setAuthError(
          "This account signed in but does not have the trusted admin claim. Ask the Firebase project owner to grant admin access.",
        );
        return;
      }
      setEmail("");
      setPassword("");
      showToast("Admin signed in successfully.");
    } catch (error) {
      console.error("Firebase admin sign-in failed:", error);
      setAuthError(
        error.code === "auth/operation-not-allowed"
          ? "Enable Email/Password in Firebase Console under Authentication → Sign-in method."
          : error.code === "auth/invalid-credential"
            ? "Email or password is incorrect."
            : error.message,
      );
    } finally {
      setAuthBusy(false);
    }
  };
  const handleAdminSignOut = async () => {
    setAuthBusy(true);
    setAuthError("");
    try {
      await signOutAdmin();
    } catch (error) {
      console.error("Firebase admin sign-out failed:", error);
      setAuthError(error.message);
    } finally {
      setAuthBusy(false);
    }
  };
  return (
    <>
      <SimpleHeader
        subtitle="Admin Panel"
        action={
          <Link to="/" className={headerButtonClass}>
            <i className="fa-solid fa-arrow-left text-xs" />
            <span>Back to Site</span>
          </Link>
        }
      />
      <main className="max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 mb-10 space-y-4">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
            Admin
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Sell pickups, accessory orders, products catalog, homepage popular
            accessories, trending devices, customer feedback, product reviews,
            and bikes and cars for sale, bike & car listings and enquiries.
          </p>
          {isCloudAdmin === true ? (
            <>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-brand-200 bg-brand-50 px-3 py-2">
                <p className="text-xs font-semibold text-brand-900">
                  Signed in to Firebase as {auth?.currentUser?.email}
                </p>
                <button
                  type="button"
                  disabled={authBusy}
                  onClick={handleAdminSignOut}
                  className="rounded-lg border border-brand-300 px-3 py-1.5 text-xs font-bold text-brand-900 disabled:opacity-60"
                >
                  {authBusy ? "Signing out…" : "Sign out"}
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {ADMIN_TABS.map((P) => (
                  <button
                    key={P.key}
                    type="button"
                    onClick={() => setT(P.key)}
                    aria-pressed={t === P.key}
                    className={`text-left p-4 rounded-2xl border transition ${t === P.key ? "border-brand-500 bg-brand-50/50 shadow-xs" : "border-slate-200 hover:border-slate-300"}`}
                  >
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <i className={`fa-solid ${P.icon}`} /> {P.label}
                    </span>
                    <span className="block text-2xl font-extrabold text-slate-900 mt-1">
                      {e[P.key]?.length || 0}
                    </span>
                    <span className="block text-[11px] text-slate-500">
                      {P.hint}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p
                role="status"
                className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900"
              >
                {isCloudAdmin === null
                  ? "Checking Firebase admin access…"
                  : "Sign in with your Firebase email/password account. Only accounts with the trusted admin claim can manage Firestore data."}
              </p>
              <form
                onSubmit={handleAdminSignIn}
                className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
              >
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Admin email"
                  aria-label="Admin email"
                  className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  aria-label="Admin password"
                  className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button
                  type="submit"
                  disabled={authBusy || isCloudAdmin === null || !auth}
                  className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {authBusy ? "Signing in…" : "Sign in"}
                </button>
                {authError && (
                  <p
                    role="alert"
                    className="text-xs font-semibold text-red-700 sm:col-span-3"
                  >
                    {authError}
                  </p>
                )}
              </form>
            </>
          )}
        </section>
        {isCloudAdmin === true ? (
          <>
        {t === "sell" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
            <h2 className="text-base font-bold text-slate-900">Sell Details</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pickups confirmed by customers on the sell pages.
            </p>
            <div className="mt-4 space-y-3">
              {e.sell.length ? (
                e.sell.map((P) => (
                  <AdminOrderCard
                    key={P.id}
                    type="sell"
                    item={P}
                    showToast={showToast}
                    rows={[
                      ["Pickup date", formatDate(P.date)],
                      ["Address", P.address],
                      ["Mobile", P.phone ? `+91 ${P.phone}` : ""],
                      ["Condition", P.condition],
                      [
                        "Quoted price",
                        P.quote ? formatPrice(P.quote) : "On inspection",
                      ],
                      ["Variant / Colour", P.variant],
                      ["Accessories", P.accessories || "None"],
                      ["Extra details", P.extra],
                    ]}
                  />
                ))
              ) : (
                <EmptyState>
                  No pickups yet. They appear here when a customer presses
                  Confirm on the pickup page.
                </EmptyState>
              )}
            </div>
          </section>
        )}
        {t === "buy" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
            <h2 className="text-base font-bold text-slate-900">Buy Details</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Orders placed with Buy Now in Buy Accessories.
            </p>
            <div className="mt-4 space-y-3">
              {e.buy.length ? (
                e.buy.map((P) => (
                  <AdminOrderCard
                    key={P.id}
                    type="buy"
                    item={P}
                    showToast={showToast}
                    rows={[
                      ["Price", formatPrice(P.price)],
                      ["Customer", P.name],
                      ["Phone", P.phone],
                      ["Payment", PAYMENT_LABELS[P.payment] || P.payment],
                      [
                        "Address",
                        [P.address, P.pincode].filter(Boolean).join(" – "),
                      ],
                      ["Category", P.category],
                      ["Seller", P.seller],
                    ]}
                  />
                ))
              ) : (
                <EmptyState>
                  No orders yet. They appear here when a customer places an
                  order with Buy Now.
                </EmptyState>
              )}
            </div>
          </section>
        )}
        {t === "products" && (
          <ProductsAdmin products={e.products} showToast={showToast} />
        )}
        {t === "popular" && (
          <PopularAdmin popular={e.popular} showToast={showToast} />
        )}
        {t === "trending" && (
          <TrendingAdmin trending={e.trending} showToast={showToast} />
        )}
        {t === "feedback" && (
          <FeedbackAdmin feedback={e.feedback} showToast={showToast} />
        )}
        {t === "reviews" && (
          <ReviewsAdmin reviews={e.reviews} showToast={showToast} />
        )}
        {t === "models" && (
          <SellModelsAdmin adminModels={e.models} showToast={showToast} />
        )}
        {(t === "bikes" || t === "cars") && (
          <VehicleProductsAdmin
            key={t}
            type={t === "cars" ? "car" : "bike"}
            items={e[t]}
            showToast={showToast}
          />
        )}
        {t === "vehicles" && (
          <ListingsAdmin listings={e.vehicles} showToast={showToast} />
        )}
        {t === "vehicleLeads" && (
          <LeadsAdmin leads={e.vehicleLeads} showToast={showToast} />
        )}
          </>
        ) : (
          <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <h2 className="text-base font-bold text-slate-900">
              Firebase admin sign-in required
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Admin records and editing tools appear after a trusted Firebase
              account with the admin claim signs in.
            </p>
          </section>
        )}
      </main>
      {a && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl"
        >
          {a}
        </div>
      )}
    </>
  );
}
