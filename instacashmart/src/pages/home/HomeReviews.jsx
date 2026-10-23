import { Link } from "react-router-dom";
import { SectionHeading } from "../../components/SectionHeading";
import { SellerReviewCard } from "../../components/reviews/SellerReviewCard";
import { useSellerReviews } from "../../components/reviews/sellerReviews";
import { homeSectionClass } from "./sectionClass";

export function HomeReviews() {
  const A = useSellerReviews();
  return (
    <section
      id="reviews"
      className={`${homeSectionClass} reveal py-8 lg:py-10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Seller Reviews"
          title="Over 42,000+ Happy Sellers in India"
        >
          <div className="flex items-center gap-1 text-amber-500 mt-2">
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star-half-stroke" />
            <span className="text-xs font-bold text-slate-700 ml-1">
              4.9 / 5 Overall Satisfaction
            </span>
          </div>
        </SectionHeading>
        <div className="reveal-group grid grid-cols-1 md:grid-cols-3 gap-4">
          {A.slice(0, 3).map((e) => (
            <SellerReviewCard key={e.key} review={e} />
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-slate-500">
          <Link
            to="/reviews"
            className="font-bold text-brand-700 hover:text-brand-800"
          >
            See all {A.length} reviews
          </Link>{" "}
          or{" "}
          <Link
            to="/feedback"
            className="font-bold text-slate-900 hover:text-brand-700"
          >
            share your experience
          </Link>
        </p>
      </div>
    </section>
  );
}
