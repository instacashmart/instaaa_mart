import { Link } from "react-router-dom";
import { Logo } from "../Logo";
import { sellCategoryPath } from "../../data/sellBrands";
import { SUPPORT_PHONE } from "../../data/site";

const FOOTER_SELL_LINKS = [
  ["phone", "Sell Old Phone"],
  ["laptop", "Sell Old Laptop"],
  ["tablet", "Sell Old Tablet"],
  ["smartwatch", "Sell Smartwatch"],
  ["earbuds", "Sell Earbuds"],
  ["console", "Sell Gaming Console"],
];

const FOOTER_COMPANY_LINKS = [
  ["/how-it-works", "How it Works"],
  ["/#why-us", "Why InstaCashMart"],
  ["/faqs", "FAQs & Help"],
  ["/reviews", "Customer Reviews"],
  ["/feedback", "Feedback"],
  ["/admin", "Admin Panel"],
  ["/", "Become a Pickup Rider"],
  ["/", "Corporate Bulk Buyback"],
];

const SOCIAL_ICONS = [
  "fa-x-twitter",
  "fa-facebook-f",
  "fa-instagram",
  "fa-linkedin-in",
];

const LEGAL_LINKS = [
  "Terms of Service",
  "Privacy Policy",
  "Buyback Policy",
  "E-Waste Compliance",
];

export function Footer() {
  return (
    <footer className="mt-6 bg-dark-900 text-slate-300 pt-16 pb-24 xl:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex">
              <Logo className="h-12" />
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              InstaCashMart is India's premier instant electronics trade-in and
              re-commerce network. Enabling consumers to monetize old tech
              safely while championing circular electronics recycling.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_ICONS.map((A) => (
                <a
                  key={A}
                  href="#"
                  aria-label={A.replace("fa-", "")}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition text-xs"
                >
                  <i className={`fa-brands ${A}`} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Sell Gadgets
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {FOOTER_SELL_LINKS.map(([A, e]) => (
                <li key={A}>
                  <Link
                    to={sellCategoryPath(A)}
                    className="hover:text-brand-400 transition"
                  >
                    {e}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/bikes-cars/sell"
                  className="hover:text-brand-400 transition"
                >
                  Sell Bike or Car
                </Link>
              </li>
              <li>
                <Link
                  to="/bikes-cars"
                  className="hover:text-brand-400 transition"
                >
                  Buy Used Bikes & Cars
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {FOOTER_COMPANY_LINKS.map(([A, e]) => (
                <li key={e}>
                  <Link to={A} className="hover:text-brand-400 transition">
                    {e}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Contact & Support
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <i className="fa-solid fa-phone text-brand-400" />
                <span>{SUPPORT_PHONE} (Toll Free)</span>
              </p>
              <p className="flex items-center gap-2">
                <i className="fa-solid fa-envelope text-brand-400" />
                <span>support@instacashmart.in</span>
              </p>
              <p className="flex items-center gap-2">
                <i className="fa-solid fa-clock text-brand-400" />
                <span>Mon - Sun: 9:00 AM - 9:00 PM</span>
              </p>
              <p className="flex items-start gap-2 pt-1 text-[11px] text-slate-500">
                <i className="fa-solid fa-location-dot text-brand-400 mt-0.5" />
                <span>
                  InstaCashMart Tech Private Limited, HSR Layout Sector 2,
                  Bengaluru, Karnataka 560102
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>
            © 2026 InstaCashMart Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((A) => (
              <Link key={A} to="/" className="hover:text-slate-300 transition">
                {A}
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-sm font-medium text-white">
          <a
            href="https://asteroic.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            Powered by <span className="font-bold">asteroic</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
