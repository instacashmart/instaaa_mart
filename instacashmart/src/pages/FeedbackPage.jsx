import { useState } from "react";
import { Link } from "react-router-dom";
import { BackToHome } from "../components/BackToHome";
import { SectionHeading } from "../components/SectionHeading";
import { store } from "../lib/store";

const FEEDBACK_TOPICS = [
  "Selling a device",
  "Buying accessories",
  "Pickup experience",
  "Payment",
  "Website / app",
  "Other",
];

const FEEDBACK_RATING_LABELS = [
  "",
  "Poor",
  "Fair",
  "Good",
  "Very good",
  "Excellent",
];

const EMPTY_FEEDBACK = {
  name: "",
  phone: "",
  rating: 0,
  topic: FEEDBACK_TOPICS[0],
  message: "",
  public: true,
};

const feedbackInputClass =
  "w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500";

export function FeedbackPage() {
  const [A, setA] = useState(EMPTY_FEEDBACK);
  const [t, setT] = useState(0);
  const [a, setA_1] = useState(null);
  const [i, setI] = useState("");
  const P = (l) => (j) =>
    setA((w) => ({
      ...w,
      [l]: j.target.value,
    }));
  const x = (l) => {
    l.preventDefault();
    if (!A.rating) {
      setI("Please choose a star rating.");
      return;
    }
    const j = store.newId("FB");
    if (
      !store.add("feedback", {
        id: j,
        createdAt: new Date().toISOString(),
        name: A.name.trim(),
        phone: A.phone,
        rating: A.rating,
        topic: A.topic,
        message: A.message.trim(),
        public: A.public,
      })
    ) {
      setI("Could not send: browser storage is full or blocked.");
      return;
    }
    setA_1({
      id: j,
      name: A.name.trim(),
      public: A.public,
    });
    setA(EMPTY_FEEDBACK);
    setI("");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const c = t || A.rating;
  return (
    <main>
      <BackToHome />
      <section className="reveal max-w-3xl mx-3 sm:mx-4 md:mx-auto mt-4 mb-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        <SectionHeading
          eyebrow="We're listening"
          title="Share Your Feedback"
          className="mb-6"
        >
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tell us how selling or buying with InstaCashMart went, or what we
            can do better.
          </p>
        </SectionHeading>
        {a ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-3xl mx-auto mb-4">
              <i className="fa-solid fa-heart" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Thank you{a.name ? `, ${a.name}` : ""}!
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Your feedback has been received. Reference:{" "}
              <strong className="font-mono text-brand-700">{a.id}</strong>
            </p>
            {a.public && (
              <p className="text-xs text-slate-500 mt-1">
                It now appears on our{" "}
                <Link
                  to="/reviews"
                  className="font-bold text-brand-700 hover:underline"
                >
                  Customer Reviews
                </Link>{" "}
                page.
              </p>
            )}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
              >
                Back to Home
              </Link>
              <button
                type="button"
                onClick={() => setA_1(null)}
                className="px-5 py-2.5 bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold rounded-xl hover:bg-brand-100 transition"
              >
                Send more feedback
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={x} className="space-y-5">
            <div>
              <span className="block text-xs font-bold text-slate-700 mb-1.5">
                How was your experience? *
              </span>
              <div className="flex items-center gap-3">
                <div
                  className="flex gap-1"
                  role="radiogroup"
                  aria-label="Rating"
                  onMouseLeave={() => setT(0)}
                >
                  {[1, 2, 3, 4, 5].map((l) => (
                    <button
                      key={l}
                      type="button"
                      role="radio"
                      aria-checked={A.rating === l}
                      aria-label={`${l} star${l > 1 ? "s" : ""}`}
                      onMouseEnter={() => setT(l)}
                      onClick={() => {
                        setA((j) => ({
                          ...j,
                          rating: l,
                        }));
                        setI("");
                      }}
                      className={`text-3xl transition-transform hover:scale-110 ${l <= c ? "text-amber-400" : "text-slate-300"}`}
                    >
                      <i className="fa-solid fa-star" />
                    </button>
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-700 min-w-[5rem]">
                  {FEEDBACK_RATING_LABELS[c]}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fbName"
                  className="block text-xs font-bold text-slate-700 mb-1"
                >
                  Your name *
                </label>
                <input
                  id="fbName"
                  required
                  value={A.name}
                  onChange={P("name")}
                  placeholder="e.g. Priya Sharma"
                  className={feedbackInputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="fbPhone"
                  className="block text-xs font-bold text-slate-700 mb-1"
                >
                  Mobile number{" "}
                  <span className="text-[11px] text-slate-400 font-normal">
                    (optional)
                  </span>
                </label>
                <div className="flex rounded-xl border border-slate-300 bg-white focus-within:ring-2 focus-within:ring-brand-500 overflow-hidden">
                  <span className="px-3 flex items-center bg-slate-50 border-r border-slate-300 text-sm font-semibold text-slate-600">
                    +91
                  </span>
                  <input
                    id="fbPhone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[6-9][0-9]{9}"
                    title="Enter a 10-digit mobile number starting with 6, 7, 8 or 9"
                    value={A.phone}
                    onChange={(l) =>
                      setA((j) => ({
                        ...j,
                        phone: l.target.value.replace(/\D/g, "").slice(0, 10),
                      }))
                    }
                    placeholder="98765 43210"
                    className="flex-1 min-w-0 px-3.5 py-2.5 text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="fbTopic"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                What is it about? *
              </label>
              <select
                id="fbTopic"
                value={A.topic}
                onChange={P("topic")}
                className={feedbackInputClass}
              >
                {FEEDBACK_TOPICS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="fbMessage"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Your feedback *
              </label>
              <textarea
                id="fbMessage"
                required
                rows={5}
                maxLength={1000}
                value={A.message}
                onChange={P("message")}
                placeholder="What went well, what could be better?"
                className={`${feedbackInputClass} resize-none`}
              />
              <p className="text-[11px] text-slate-400 mt-1 text-right">
                {A.message.length}/1000
              </p>
            </div>
            <label className="flex items-start gap-2.5 rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-3 cursor-pointer">
              <input
                type="checkbox"
                checked={A.public}
                onChange={(l) =>
                  setA((j) => ({
                    ...j,
                    public: l.target.checked,
                  }))
                }
                className="mt-0.5 w-4 h-4 accent-brand-600"
              />
              <span className="text-xs text-slate-700">
                <span className="font-bold">
                  Show my feedback on the Customer Reviews page
                </span>
                <span className="block text-[11px] text-slate-500 mt-0.5">
                  Your name, rating and message are shown. Your mobile number is
                  never shown.
                </span>
              </span>
            </label>
            {i && (
              <p
                role="alert"
                className="text-xs font-semibold text-red-700 bg-red-50 rounded-lg px-3 py-2"
              >
                {i}
              </p>
            )}
            <button
              type="submit"
              className="w-full sm:w-auto px-8 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-brand-500/20 transition inline-flex items-center justify-center gap-2"
            >
              Send Feedback <i className="fa-solid fa-paper-plane text-xs" />
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
