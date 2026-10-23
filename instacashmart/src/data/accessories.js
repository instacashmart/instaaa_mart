const SELLERS = {
  nova: {
    name: "InstaCashMart Certified",
    rating: 4.9,
    sales: 12480,
    verified: true,
  },
  volt: {
    name: "Volt Accessories Hub",
    rating: 4.7,
    sales: 8940,
    verified: true,
  },
  garage: {
    name: "Gadget Garage",
    rating: 4.8,
    sales: 3210,
    verified: true,
  },
  renew: {
    name: "ReNew Mobiles",
    rating: 4.6,
    sales: 1845,
    verified: true,
  },
  casecraft: {
    name: "CaseCraft Store",
    rating: 4.5,
    sales: 2310,
    verified: true,
  },
  urban: {
    name: "Urban Tech Traders",
    rating: 4.3,
    sales: 620,
    verified: false,
  },
};

export const ACCESSORY_CATEGORIES = [
  {
    key: "all",
    label: "All",
    icon: "fa-border-all",
  },
  {
    key: "Chargers",
    label: "Chargers",
    icon: "fa-plug",
  },
  {
    key: "Cables",
    label: "Cables",
    icon: "fa-plug-circle-bolt",
  },
  {
    key: "Cases",
    label: "Cases & Covers",
    icon: "fa-shield-halved",
  },
  {
    key: "Screen Guards",
    label: "Screen Guards",
    icon: "fa-mobile-screen",
  },
  {
    key: "Audio",
    label: "Earbuds & Audio",
    icon: "fa-headphones",
  },
  {
    key: "Power Banks",
    label: "Power Banks",
    icon: "fa-battery-full",
  },
  {
    key: "Watch Bands",
    label: "Watch Bands",
    icon: "fa-clock",
  },
  {
    key: "Mounts",
    label: "Mounts & Stands",
    icon: "fa-car",
  },
];

export const SHOP_CATEGORIES = ACCESSORY_CATEGORIES.filter(
  (A) => A.key !== "all",
);

export const categoryLabel = (category) =>
  (ACCESSORY_CATEGORIES.find((e) => e.key === category) || {}).label ||
  category;

export const categoryIcon = (A) =>
  (ACCESSORY_CATEGORIES.find((e) => e.key === A) || {}).icon || "fa-box";

const ACCESSORY_IMAGES = Object.entries(
  import.meta.glob("../assets/accessories/*.jpg", {
    eager: true,
    import: "default",
  }),
)
  .sort(([A], [e]) => A.localeCompare(e))
  .map(([, A]) => A);

export const makeProduct = (
  A,
  e,
  name,
  r,
  specs,
  rating,
  i,
  mrp,
  sellerKey,
  x,
) => ({
  id: A,
  name,
  brand: r,
  category: e,
  specs,
  rating,
  price: i,
  mrp,
  sellerKey,
  image: x,
  grade: "New",
  icon: categoryIcon(e),
  warranty: "1 year",
  replacement: "7 days",
});

const ACCESSORY_ROWS = [
  [
    "Chargers",
    "Apple 20W USB-C Power Adapter",
    "Apple",
    "20 W • USB-C",
    4.7,
    1599,
    1900,
    "nova",
  ],
  [
    "Chargers",
    "Samsung 25W Super Fast Charger",
    "Samsung",
    "25 W • USB-C PD",
    4.5,
    1199,
    1699,
    "volt",
  ],
  [
    "Chargers",
    "Anker Nano 30W GaN Charger",
    "Anker",
    "30 W • GaN • USB-C",
    4.6,
    1499,
    2499,
    "volt",
  ],
  [
    "Cables",
    "Apple USB-C to Lightning Cable",
    "Apple",
    "1 m • Fast charge",
    4.6,
    1499,
    1900,
    "nova",
  ],
  [
    "Cables",
    "Anker PowerLine III USB-C Cable",
    "Anker",
    "1.8 m • 100 W",
    4.5,
    799,
    1299,
    "volt",
  ],
  [
    "Cables",
    "Portronics Konnect L Braided Cable",
    "Portronics",
    "1.2 m • 3 A • USB-C",
    4.2,
    249,
    599,
    "urban",
  ],
  [
    "Cases",
    "Spigen Ultra Hybrid Case for iPhone 15",
    "Spigen",
    "Clear • Shockproof",
    4.6,
    1299,
    2499,
    "casecraft",
  ],
  [
    "Cases",
    "Apple Silicone Case with MagSafe for iPhone 14 Pro",
    "Apple",
    "Midnight • MagSafe",
    4.5,
    3499,
    4900,
    "nova",
  ],
  [
    "Cases",
    "Ringke Fusion Case for Galaxy S21 Ultra",
    "Ringke",
    "Clear • Slim fit",
    4.4,
    899,
    1799,
    "casecraft",
  ],
  [
    "Screen Guards",
    "Spigen Glas.tR EZ Fit for iPhone 15",
    "Spigen",
    "2 pack • 9H glass",
    4.6,
    1099,
    1999,
    "casecraft",
  ],
  [
    "Screen Guards",
    "Belkin UltraGlass for iPhone 14 Pro",
    "Belkin",
    "Anti-microbial • 9H",
    4.4,
    1799,
    2999,
    "garage",
  ],
  [
    "Screen Guards",
    "ZAGG InvisibleShield Glass for iPhone 13 Pro",
    "ZAGG",
    "Edge to edge",
    4.3,
    1499,
    2499,
    "casecraft",
  ],
  [
    "Audio",
    "Apple AirPods Pro (2nd Gen)",
    "Apple",
    "USB-C • Noise cancelling",
    4.8,
    20999,
    24900,
    "nova",
  ],
  [
    "Audio",
    "Samsung Galaxy Buds2 Pro",
    "Samsung",
    "Noise cancelling • IPX7",
    4.5,
    10999,
    17999,
    "garage",
  ],
  [
    "Audio",
    "JBL Tune 520BT Headphones",
    "JBL",
    "On-ear • 57 h battery",
    4.4,
    3499,
    4999,
    "volt",
  ],
  [
    "Audio",
    "boAt Airdopes 141 Earbuds",
    "boAt",
    "42 h playback • IPX4",
    4.1,
    1299,
    4490,
    "urban",
  ],
  [
    "Power Banks",
    "Anker PowerCore 20000 mAh Power Bank",
    "Anker",
    "20000 mAh • 20 W PD",
    4.6,
    3299,
    4999,
    "volt",
  ],
  [
    "Power Banks",
    "Mi Power Bank 3i 10000 mAh",
    "Xiaomi",
    "10000 mAh • 18 W",
    4.3,
    1199,
    1699,
    "garage",
  ],
  [
    "Power Banks",
    "Ambrane 27000 mAh Power Bank",
    "Ambrane",
    "27000 mAh • 20 W",
    4.2,
    1999,
    3999,
    "urban",
  ],
  [
    "Watch Bands",
    "Apple Sport Band 45 mm",
    "Apple",
    "Fluoroelastomer • M/L",
    4.6,
    3499,
    4500,
    "nova",
  ],
  [
    "Watch Bands",
    "Apple Sport Loop 45 mm",
    "Apple",
    "Woven nylon",
    4.5,
    3299,
    4500,
    "garage",
  ],
  [
    "Watch Bands",
    "Samsung Sport Band 20 mm",
    "Samsung",
    "Galaxy Watch • S/M",
    4.3,
    1799,
    2999,
    "volt",
  ],
  [
    "Mounts",
    "Belkin MagSafe Car Vent Mount",
    "Belkin",
    "MagSafe • Vent clip",
    4.4,
    2999,
    3999,
    "garage",
  ],
  [
    "Mounts",
    "Spigen OneTap Dashboard Car Mount",
    "Spigen",
    "Dashboard • One-hand",
    4.5,
    1999,
    3499,
    "casecraft",
  ],
  [
    "Mounts",
    "Portronics Clamp X Car Mobile Holder",
    "Portronics",
    "Windshield • 360° rotation",
    4.2,
    399,
    999,
    "urban",
  ],
];

export const ACCESSORIES = ACCESSORY_ROWS.map((A, e) =>
  makeProduct(`A${e + 1}`, ...A, ACCESSORY_IMAGES[e]),
);

export const POPULAR_ACCESSORIES = [...ACCESSORIES]
  .sort((A, e) => e.rating - A.rating)
  .slice(0, 10);

export const sellerOf = (A) => SELLERS[A.sellerKey] || SELLERS.nova;

export const discountPercent = (A) => Math.round((1 - A.price / A.mrp) * 100);

export const searchTokens = (A) =>
  A.toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((e) => {
      if (e.length > 3) {
        return e.replace(/s$/, "");
      }
      return e;
    });

export function productMatches(A, e) {
  const t =
    `${A.name} ${A.brand} ${A.category} ${categoryLabel(A.category)} ${A.specs} ${sellerOf(A).name}`.toLowerCase();
  return e.every((r) => t.includes(r));
}
