import { BackToHome } from "../components/BackToHome";
import { FaqList } from "../components/FaqList";
import { SectionHeading } from "../components/SectionHeading";

export function FaqsPage() {
  return (
    <main>
      <BackToHome />
      <section
        id="faqs"
        className="reveal max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-4 rounded-2xl border border-slate-200 bg-white py-10 lg:py-12"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Got Questions?"
            title="Frequently Asked Questions"
            className="text-center mb-12"
          >
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Everything you need to know about selling on InstaCashMart
            </p>
          </SectionHeading>
          <FaqList buttonClass="p-5" className="space-y-3.5" />
        </div>
      </section>
    </main>
  );
}
