import { SectionHeading } from "../../components/SectionHeading";
import { WHY_US } from "../../data/site";
import { homeSectionClass } from "./sectionClass";

export function WhyUs() {
  return (
    <section id="why-us" className={`${homeSectionClass} reveal py-8 lg:py-10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Trust & Excellence"
          title="Why Sellers Love InstaCashMart"
        >
          <p className="text-sm text-slate-600 mt-2">
            Designed from the ground up for maximum safety, unmatched speed, and
            absolute peace of mind.
          </p>
        </SectionHeading>
        <div className="reveal-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHY_US.map((A) => {
            if (A.imageOnly) {
              return (
                <div
                  key={A.title}
                  className="relative rounded-2xl border border-slate-200 overflow-hidden hover:border-brand-500 hover:shadow-lg transition"
                >
                  <img
                    src={A.image}
                    alt={
                      A.titleOnImage
                        ? ""
                        : [A.title, A.text].filter(Boolean).join(": ")
                    }
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  {A.titleOnImage && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/85 via-slate-900/50 to-transparent px-5 pt-12 pb-4">
                      <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight drop-shadow">
                        {A.title}
                      </h3>
                      {A.text && (
                        <p className="text-xs text-white/85 leading-relaxed mt-1.5 drop-shadow">
                          {A.text}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <div
                key={A.title}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-brand-500 hover:shadow-lg transition overflow-hidden"
              >
                {A.image && (
                  <img
                    src={A.image}
                    alt=""
                    loading="lazy"
                    className="block -mx-5 -mt-5 mb-4 w-[calc(100%+2.5rem)] max-w-none aspect-video object-cover"
                  />
                )}
                <div
                  className={`w-12 h-12 rounded-xl ${A.iconClass} flex items-center justify-center text-xl mb-3`}
                >
                  <i className={`fa-solid ${A.icon}`} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {A.title}
                </h3>
                {A.text && (
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {A.text}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
