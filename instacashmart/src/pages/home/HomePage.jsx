import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaqList } from "../../components/FaqList";
import { SectionHeading } from "../../components/SectionHeading";
import { useApp } from "../../context/AppContext";
import { SUPPORT_PHONE, SUPPORT_PHONE_HREF } from "../../data/site";
import { AppDownload } from "./AppDownload";
import { HomeReviews } from "./HomeReviews";
import { PopularAccessories } from "./PopularAccessories";
import { SellCategoryGrid } from "./SellCategoryGrid";
import { TrendingDevices } from "./TrendingDevices";
import { WhyUs } from "./WhyUs";
import { homeSectionClass } from "./sectionClass";

export function HomePage() {
  const { openTrack } = useApp();
  const [e] = useSearchParams();
  useEffect(() => {
    const t = e.get("track");
    if (t) {
      openTrack(t);
    }
  }, [e, openTrack]);
  return (
    <main>
      <h1 className="sr-only">
        InstaCashMart: sell your old gadgets and buy accessories
      </h1>
      <SellCategoryGrid />
      <TrendingDevices />
      <PopularAccessories />
      <WhyUs />
      <HomeReviews />
      <section id="faqs" className={`${homeSectionClass} reveal py-8 lg:py-10`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Got Questions?"
            title="Frequently Asked Questions"
            className="text-center mb-8"
          >
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Everything you need to know about selling on InstaCashMart
            </p>
          </SectionHeading>
          <FaqList />
          <p className="text-center text-xs text-slate-500 mt-6">
            Still have questions?{" "}
            <Link
              to="/faqs"
              className="font-bold text-brand-700 hover:text-brand-800"
            >
              See all FAQs
            </Link>{" "}
            or call{" "}
            <a href={SUPPORT_PHONE_HREF} className="font-bold text-slate-900">
              {SUPPORT_PHONE}
            </a>
          </p>
        </div>
      </section>
      <AppDownload />
    </main>
  );
}
