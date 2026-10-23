import phoneImg from "../assets/categories/phone.webp";
import laptopImg from "../assets/categories/laptop.webp";
import tabletImg from "../assets/categories/tablet.webp";
import smartwatchImg from "../assets/categories/smartwatch.webp";
import earbudsImg from "../assets/categories/earbuds.webp";
import consoleImg from "../assets/categories/console.webp";
import cameraImg from "../assets/categories/camera.webp";
import safetyImg from "../assets/why-us/safety.jpg";
import instantPaymentImg from "../assets/why-us/instant-payment.jpg";
import freePickupImg from "../assets/why-us/free-pickup.jpg";
import dataSecurityImg from "../assets/why-us/data-security.jpg";
import noObligationImg from "../assets/why-us/no-obligation.jpg";
import eWasteImg from "../assets/why-us/e-waste.jpg";

export const CITIES = [
  {
    name: "Bengaluru",
    icon: "fa-building",
  },
  {
    name: "Mumbai",
    icon: "fa-city",
  },
  {
    name: "Delhi NCR",
    icon: "fa-landmark",
  },
  {
    name: "Hyderabad",
    icon: "fa-archway",
  },
  {
    name: "Chennai",
    icon: "fa-bridge",
  },
  {
    name: "Pune",
    icon: "fa-tree",
  },
  {
    name: "Kolkata",
    icon: "fa-monument",
  },
  {
    name: "Ahmedabad",
    icon: "fa-store",
  },
  {
    name: "Jaipur",
    icon: "fa-chess-rook",
  },
  {
    name: "Chandigarh",
    icon: "fa-compass",
  },
  {
    name: "Kochi",
    icon: "fa-ship",
  },
  {
    name: "Lucknow",
    icon: "fa-crown",
  },
];

export const SUPPORT_PHONE = "1800-267-4488";

export const SUPPORT_PHONE_HREF = "tel:18002674488";

export const FAQS = [
  {
    q: "How does InstaCashMart determine the price of my old device?",
    a: "Our valuation algorithm computes real-time fair market value based on device age, brand, physical condition (screen scratches, dents, battery life), operational hardware (cameras, sensors, buttons), and availability of original bill/box accessories.",
  },
  {
    q: "Do I have to pay any fee for doorstep pickup?",
    a: "No, never! Doorstep pickup and evaluation is 100% free across all 120+ supported cities in India. There are absolutely no hidden deductions or convenience charges.",
  },
  {
    q: "When and how do I receive my payment?",
    a: "You receive your money immediately on the spot before handing the device over to our pickup technician. We support instant UPI (Google Pay, PhonePe, Paytm), instant IMPS bank transfers, or digital wallets.",
  },
  {
    q: "What happens if the pickup technician offers a different price?",
    a: "If our technician identifies unreported hardware defects (e.g. ghost touch, battery degradation), they will explain the variance and present an updated quote. If you do not accept the revised price, you can simply decline the deal with zero penalty or cost!",
  },
  {
    q: "Is my personal data completely safe?",
    a: "Yes, completely. We recommend performing a factory reset before pickup. In addition, our technician performs a certified DoD 5220.22-M military-grade sanitization overwrite and removes all Google/iCloud linkages to guarantee absolute security.",
  },
  {
    q: "Can I sell a phone without the original box or charger?",
    a: "Yes! You can sell just the device alone. Having the original box, bill, and OEM charger simply gives you bonus value on your quote, but they are not mandatory for out-of-warranty devices.",
  },
];

export const DEVICE_CATEGORIES = [
  {
    key: "phone",
    label: "Phones",
    icon: "fa-mobile-screen",
    image: phoneImg,
  },
  {
    key: "laptop",
    label: "Laptops",
    icon: "fa-laptop",
    image: laptopImg,
  },
  {
    key: "tablet",
    label: "Tablets",
    icon: "fa-tablet-screen-button",
    image: tabletImg,
  },
  {
    key: "smartwatch",
    label: "Smartwatches",
    icon: "fa-clock",
    image: smartwatchImg,
  },
  {
    key: "earbuds",
    label: "Earbuds & Audio",
    icon: "fa-headphones",
    image: earbudsImg,
  },
  {
    key: "console",
    label: "Gaming Consoles",
    icon: "fa-gamepad",
    image: consoleImg,
  },
  {
    key: "camera",
    label: "Cameras",
    icon: "fa-camera",
    image: cameraImg,
  },
];

export const CATEGORY_IMAGES = {
  phone: phoneImg,
  laptop: laptopImg,
  tablet: tabletImg,
  smartwatch: smartwatchImg,
  earbuds: earbudsImg,
  console: consoleImg,
  camera: cameraImg,
};

export const TRENDING_DEVICES = [
  {
    id: "TD-001",
    cat: "phone",
    brand: "Apple",
    badge: "🔥 Hot Selling",
    badgeClass: "text-amber-700 bg-amber-50",
    icon: "fa-mobile-screen-button",
    name: "Apple iPhone 15 Pro Max",
    specs: "256 GB / 512 GB / 1 TB",
    price: 84500,
    model: "iPhone 15 Pro Max",
    image: phoneImg,
  },
  {
    id: "TD-002",
    cat: "phone",
    brand: "Samsung",
    badge: "High Value",
    badgeClass: "text-brand-700 bg-brand-50",
    icon: "fa-mobile-screen",
    name: "Samsung Galaxy S24 Ultra",
    specs: "12GB RAM • 256GB / 512GB",
    price: 78000,
    model: "Galaxy S24 Ultra",
    image: phoneImg,
  },
  {
    id: "TD-003",
    cat: "laptop",
    brand: "Apple",
    badge: "Top Laptop",
    badgeClass: "text-slate-900 bg-slate-100",
    icon: "fa-laptop",
    name: "MacBook Air M2 (13.6-inch)",
    specs: "8-Core CPU • 256GB SSD",
    price: 59500,
    model: 'MacBook Air M2 13"',
    image: laptopImg,
  },
  {
    id: "TD-004",
    cat: "console",
    brand: "PlayStation",
    badge: "Gaming",
    badgeClass: "text-slate-900 bg-slate-100",
    icon: "fa-gamepad",
    name: "Sony PlayStation 5 Disc",
    specs: "825GB / Slim Edition",
    price: 34500,
    model: "PlayStation 5 Disc Edition",
    image: consoleImg,
  },
];

export const TRENDING_FILTERS = [
  {
    key: "all",
    label: "All",
  },
  {
    key: "phone",
    label: "Phones",
  },
  {
    key: "laptop",
    label: "Laptops",
  },
  {
    key: "tablet",
    label: "Tablets",
  },
  {
    key: "smartwatch",
    label: "Smartwatches",
  },
  {
    key: "earbuds",
    label: "Earbuds",
  },
  {
    key: "console",
    label: "Consoles",
  },
  {
    key: "camera",
    label: "Cameras",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    icon: "fa-calculator",
    iconClass: "bg-brand-50 text-brand-600",
    title: "Check Instant Quote",
    text: "Choose your device brand and model, answer basic questions about condition, and get an accurate market-leading quote in 60 seconds.",
  },
  {
    icon: "fa-calendar-check",
    iconClass: "bg-slate-100 text-slate-900",
    title: "Schedule Free Pickup",
    text: "Pick your preferred date and convenient 2-hour pickup slot. Our certified executive will visit your home or office address for free.",
  },
  {
    icon: "fa-house-chimney-user",
    iconClass: "bg-amber-50 text-amber-600",
    title: "Doorstep Inspection",
    text: "Our technician performs a swift 5-minute hardware diagnostic check right in front of your eyes with complete transparency.",
  },
  {
    icon: "fa-money-bill-transfer",
    iconClass: "bg-brand-50 text-brand-600",
    title: "Instant Cash Transfer",
    text: "Receive full payment via UPI, Bank IMPS, or Wallet directly on the spot before handing over the device. 100% risk free!",
  },
];

export const WHY_US = [
  {
    icon: "fa-shield-heart",
    iconClass: "bg-brand-100 text-brand-700",
    title: "Safety • Speed • Peace of Mind",
    image: safetyImg,
    imageOnly: true,
    titleOnImage: true,
  },
  {
    icon: "fa-bolt-lightning",
    iconClass: "bg-brand-100 text-brand-700",
    title: "Instant On-the-Spot Payment",
    image: instantPaymentImg,
    imageOnly: true,
    titleOnImage: true,
  },
  {
    icon: "fa-van-shuttle",
    iconClass: "bg-slate-100 text-slate-900",
    title: "Zero Pickup or Convenience Fees",
    image: freePickupImg,
    imageOnly: true,
    titleOnImage: true,
  },
  {
    icon: "fa-user-shield",
    iconClass: "bg-slate-100 text-slate-900",
    title: "DoD 5220.22-M Data Security",
    image: dataSecurityImg,
    imageOnly: true,
    titleOnImage: true,
  },
  {
    icon: "fa-handshake-angle",
    iconClass: "bg-amber-100 text-amber-700",
    title: "Zero Obligation / Easy Decline",
    image: noObligationImg,
    imageOnly: true,
    titleOnImage: true,
  },
  {
    icon: "fa-leaf",
    iconClass: "bg-green-100 text-green-700",
    title: "Certified E-Waste Stewardship",
    image: eWasteImg,
    imageOnly: true,
    titleOnImage: true,
  },
];

export const TESTIMONIALS = [
  {
    initials: "AR",
    avatarClass: "bg-brand-100 text-brand-700",
    name: "Arjun Raghavan",
    meta: "Bengaluru • Sold iPhone 13 Pro",
    amount: "₹42,500",
    text: '"Sold my iPhone 13 Pro Max. Within 3 hours of placing the order, the agent Rohit arrived at my Indiranagar flat, verified the phone, and transferred ₹42,500 via UPI right into my account. Unbelievably smooth!"',
  },
  {
    initials: "PS",
    avatarClass: "bg-slate-100 text-slate-900",
    name: "Pooja Sharma",
    meta: "Gurugram • Sold Dell Inspiron",
    amount: "₹31,200",
    text: '"Local shops were offering me barely ₹22k for my Dell Inspiron 15 with a weak battery. InstaCashMart gave me ₹31,200 and picked it up directly from my office in Cyber City without charging a single rupee."',
  },
  {
    initials: "VK",
    avatarClass: "bg-slate-100 text-slate-900",
    name: "Vikram Kulkarni",
    meta: "Pune • Sold OnePlus 9",
    amount: "₹19,800",
    text: '"I was paranoid about private data on my old OnePlus 9. The executive showed me their automated diagnostic wipe certificate software and deleted everything before leaving. Total peace of mind!"',
  },
];
