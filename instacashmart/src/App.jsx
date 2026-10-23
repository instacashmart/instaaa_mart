import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { IntroSplash } from "./components/IntroSplash";
import { Toast } from "./components/Toast";
import { Layout } from "./components/layout/Layout";
import { AppProvider } from "./context/AppContext";
import { SELL_PAGES } from "./data/sellBrands";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll";
import { FaqsPage } from "./pages/FaqsPage";
import { FeedbackPage } from "./pages/FeedbackPage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { TrackPage } from "./pages/TrackPage";
import { AccessoriesPage } from "./pages/accessories/AccessoriesPage";
import { AdminPage } from "./pages/admin/AdminPage";
import { BrandPage } from "./pages/brands/BrandPage";
import { BrandsPage } from "./pages/brands/BrandsPage";
import { SellBrandPage } from "./pages/brands/SellBrandPage";
import { SellCategoryPage } from "./pages/brands/SellCategoryPage";
import { HomePage } from "./pages/home/HomePage";
import { PickupPage } from "./pages/sell/PickupPage";
import { SellPage } from "./pages/sell/SellPage";
import { SellVehiclePage } from "./pages/vehicles/SellVehiclePage";
import { VehicleBrandPage } from "./pages/vehicles/VehicleBrandPage";
import { VehicleBrandsPage } from "./pages/vehicles/VehicleBrandsPage";
import { VehiclesPage } from "./pages/vehicles/VehiclesPage";

const PAGE_TITLES = {
  "/": "InstaCashMart | Sell Old Phones, Laptops & Gadgets Instantly for Cash",
  "/sell": "InstaCashMart | Sell Your Device – Instant Price Quote",
  "/pickup": "InstaCashMart | Confirm Pickup Address & Date",
  "/accessories": "Buy Accessories | InstaCashMart",
  "/how-it-works": "How It Works | InstaCashMart",
  "/faqs": "FAQs | InstaCashMart",
  "/feedback": "Feedback | InstaCashMart",
  "/reviews": "Customer Reviews | InstaCashMart",
  "/track": "Track Your Order | InstaCashMart",
  "/brands": "All Brands by Device | InstaCashMart",
  "/bikes-cars": "Buy Used Bikes & Cars | InstaCashMart",
  "/bikes-cars/sell": "Sell Your Bike or Car – Free Listing | InstaCashMart",
  "/sell-phone": "Sell Old Phone – Choose Your Brand | InstaCashMart",
  "/sell-laptop": "Sell Old Laptop – Choose Your Brand | InstaCashMart",
  "/sell-tablet": "Sell Old Tablet – Choose Your Brand | InstaCashMart",
  "/sell-smartwatch": "Sell Old Smartwatch – Choose Your Brand | InstaCashMart",
  "/sell-earbuds":
    "Sell Old Earbuds & Headphones – Choose Your Brand | InstaCashMart",
  "/sell-console":
    "Sell Old Gaming Console – Choose Your Brand | InstaCashMart",
  "/sell-camera": "Sell Old Camera – Choose Your Brand | InstaCashMart",
};

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (PAGE_TITLES[pathname]) {
      document.title = PAGE_TITLES[pathname];
    }
  }, [pathname]);
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const t = requestAnimationFrame(() =>
      document.getElementById(hash.slice(1))?.scrollIntoView(),
    );
    return () => cancelAnimationFrame(t);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  useRevealOnScroll();
  return (
    <AppProvider>
      <RouteEffects />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="faqs" element={<FaqsPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="track" element={<TrackPage />} />
          <Route path="brands" element={<BrandsPage />} />
          <Route path="brand/:brand" element={<BrandPage />} />
          <Route path="bikes-cars" element={<VehiclesPage />} />
          <Route path="bikes-cars/sell" element={<SellVehiclePage />} />
          <Route
            path="bikes"
            element={<VehicleBrandsPage key="bike" type="bike" />}
          />
          <Route
            path="bikes/:brand"
            element={<VehicleBrandPage key="bike" type="bike" />}
          />
          <Route
            path="cars"
            element={<VehicleBrandsPage key="car" type="car" />}
          />
          <Route
            path="cars/:brand"
            element={<VehicleBrandPage key="car" type="car" />}
          />
          {Object.entries(SELL_PAGES).flatMap(([A, e]) => [
            <Route
              key={A}
              path={e.path.slice(1)}
              element={<SellCategoryPage key={A} category={A} />}
            />,
            <Route
              key={`${A}-brand`}
              path={`${e.path.slice(1)}/:brand`}
              element={<SellBrandPage key={A} category={A} />}
            />,
          ])}
        </Route>
        <Route path="sell" element={<SellPage />} />
        <Route path="pickup" element={<PickupPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toast />
      <IntroSplash />
    </AppProvider>
  );
}
