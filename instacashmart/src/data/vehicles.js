import { useMemo } from "react";
import { useStoreList } from "../lib/store";
import bikeIllustration from "../assets/vehicles/bike.svg";
import carIllustration from "../assets/vehicles/car.svg";
import hondaLogo from "../assets/logos/honda.svg";
import yamahaLogo from "../assets/logos/yamaha.svg";
import ktmLogo from "../assets/logos/ktm.svg";
import suzukiLogo from "../assets/logos/suzuki.svg";
import hyundaiLogo from "../assets/logos/hyundai.svg";
import tataLogo from "../assets/logos/tata.svg";
import mahindraLogo from "../assets/logos/mahindra.svg";
import kiaLogo from "../assets/logos/kia.svg";
import toyotaLogo from "../assets/logos/toyota.svg";
import mgLogo from "../assets/logos/mg.svg";
import volkswagenLogo from "../assets/logos/volkswagen.svg";
import skodaLogo from "../assets/logos/skoda.svg";

export const VEHICLE_TYPES = [
  {
    key: "bike",
    label: "Bikes & Scooters",
    short: "Bike",
    tile: "Bikes",
    icon: "fa-motorcycle",
    image: bikeIllustration,
  },
  {
    key: "car",
    label: "Cars",
    short: "Car",
    tile: "Cars",
    icon: "fa-car-side",
    image: carIllustration,
  },
];

export const vehicleTypePath = (A) => {
  if (A === "car") {
    return "/cars";
  }
  return "/bikes";
};

export const slugify = (A) =>
  String(A)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const vehicleBrandPath = (type, key) =>
  `${vehicleTypePath(type)}/${slugify(key)}`;

export const vehicleListingsUrl = (type, e) => {
  const t = new URLSearchParams({
    ...(type === "car" && {
      type,
    }),
    ...e,
  }).toString();
  return `/bikes-cars${t ? `?${t}` : ""}`;
};

export const vehicleType = (A) =>
  VEHICLE_TYPES.find((e) => e.key === A) || VEHICLE_TYPES[0];

export const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric"];

export const TRANSMISSIONS = ["Manual", "Automatic"];

export const OWNER_OPTIONS = ["1st", "2nd", "3rd+"];

export const PRICE_RANGES = {
  bike: [
    ["Under ₹50,000", 0, 50000],
    ["₹50,000 – ₹1 Lakh", 50000, 100000],
    ["₹1 – 2 Lakh", 100000, 200000],
    ["Above ₹2 Lakh", 200000, Infinity],
  ],
  car: [
    ["Under ₹5 Lakh", 0, 500000],
    ["₹5 – 10 Lakh", 500000, 1000000],
    ["₹10 – 20 Lakh", 1000000, 2000000],
    ["Above ₹20 Lakh", 2000000, Infinity],
  ],
};

export const VEHICLE_PRICES = {
  bike: {
    "Royal Enfield": {
      "Classic 350": 195000,
      "Bullet 350": 175000,
      "Hunter 350": 150000,
      "Himalayan 450": 285000,
    },
    Honda: {
      "Activa 6G": 78000,
      "Shine 100": 66000,
      "SP 125": 90000,
      CB350: 210000,
    },
    Hero: {
      "Splendor Plus": 76000,
      "HF Deluxe": 60000,
      "Xtreme 160R": 130000,
    },
    TVS: {
      Jupiter: 76000,
      "Apache RTR 160 4V": 125000,
      "Raider 125": 95000,
      "Ntorq 125": 85000,
    },
    Bajaj: {
      "Pulsar 150": 112000,
      "Pulsar NS200": 150000,
      "Dominar 400": 230000,
    },
    Yamaha: {
      "R15 V4": 185000,
      "FZ-S": 125000,
      "MT-15": 170000,
    },
    KTM: {
      "Duke 200": 200000,
      "Duke 390": 310000,
      "RC 200": 220000,
    },
    Suzuki: {
      "Access 125": 82000,
      Gixxer: 145000,
    },
    Ather: {
      "450X": 145000,
    },
    Ola: {
      "S1 Pro": 130000,
    },
  },
  car: {
    "Maruti Suzuki": {
      Swift: 650000,
      Baleno: 700000,
      Dzire: 700000,
      Brezza: 900000,
      "Wagon R": 560000,
      Ertiga: 950000,
    },
    Hyundai: {
      i20: 750000,
      Creta: 1200000,
      Venue: 850000,
      Verna: 1150000,
    },
    Tata: {
      Nexon: 900000,
      Punch: 650000,
      Harrier: 1600000,
      "Nexon EV": 1450000,
    },
    Mahindra: {
      XUV700: 1650000,
      Thar: 1300000,
      "Scorpio-N": 1500000,
      "XUV 3XO": 900000,
    },
    Kia: {
      Seltos: 1200000,
      Sonet: 900000,
    },
    Honda: {
      City: 1250000,
      Amaze: 750000,
    },
    Toyota: {
      "Innova Crysta": 2000000,
      Fortuner: 3500000,
      Glanza: 750000,
    },
    MG: {
      Hector: 1600000,
    },
    Volkswagen: {
      Virtus: 1250000,
    },
    Skoda: {
      Slavia: 1200000,
    },
  },
};

export const VEHICLE_BRANDS = {
  bike: [
    {
      key: "Royal Enfield",
      wordmark: {
        text: "Royal Enfield",
        className: "font-serif font-bold text-[#8B1E1E]",
      },
    },
    {
      key: "Honda",
      logo: hondaLogo,
    },
    {
      key: "Hero",
      wordmark: {
        text: "Hero",
        className: "font-black italic text-[#E11B22] tracking-tight",
      },
    },
    {
      key: "TVS",
      wordmark: {
        text: "TVS",
        className: "font-black italic text-[#1C3F94]",
      },
    },
    {
      key: "Bajaj",
      wordmark: {
        text: "BAJAJ",
        className: "font-extrabold text-[#0B4EA2] tracking-[0.12em]",
      },
    },
    {
      key: "Yamaha",
      logo: yamahaLogo,
    },
    {
      key: "KTM",
      logo: ktmLogo,
      wide: true,
    },
    {
      key: "Suzuki",
      logo: suzukiLogo,
    },
    {
      key: "Ather",
      wordmark: {
        text: "ather",
        className: "font-bold text-slate-900 tracking-tight",
      },
    },
    {
      key: "Ola",
      wordmark: {
        text: "ola",
        className: "font-black text-slate-900",
      },
    },
  ],
  car: [
    {
      key: "Maruti Suzuki",
      logo: suzukiLogo,
    },
    {
      key: "Hyundai",
      logo: hyundaiLogo,
      wide: true,
    },
    {
      key: "Tata",
      logo: tataLogo,
    },
    {
      key: "Mahindra",
      logo: mahindraLogo,
      wide: true,
    },
    {
      key: "Kia",
      logo: kiaLogo,
      wide: true,
    },
    {
      key: "Honda",
      logo: hondaLogo,
    },
    {
      key: "Toyota",
      logo: toyotaLogo,
    },
    {
      key: "MG",
      logo: mgLogo,
    },
    {
      key: "Volkswagen",
      logo: volkswagenLogo,
    },
    {
      key: "Skoda",
      logo: skodaLogo,
    },
  ],
};

function vehicleBrandInfo(A, e) {
  const t = VEHICLE_BRANDS[A]?.find(
    (i) => i.key.toLowerCase() === String(e).toLowerCase(),
  );
  const r = Object.keys(VEHICLE_PRICES[A]?.[t?.key] || {});
  return {
    name: e,
    tagline: r.slice(0, 3).join(", "),
    ...(t || {
      key: e,
      wordmark: {
        text: e,
        className: "font-extrabold text-slate-900 tracking-tight",
      },
    }),
  };
}

export function vehicleBrandsWithCounts(A, e) {
  const t = A.filter((a) => a.type === e);
  const r = [...VEHICLE_BRANDS[e].map((a) => a.key)];
  for (const a of t) {
    if (!r.some((n) => n.toLowerCase() === a.brand.toLowerCase())) {
      r.push(a.brand);
    }
  }
  return r.map((a) => {
    const n = t.filter((i) => i.brand.toLowerCase() === a.toLowerCase());
    return {
      ...vehicleBrandInfo(e, a),
      count: n.length,
      from: n.length ? Math.min(...n.map((i) => i.price)) : 0,
    };
  });
}

const SELLER_TYPES = {
  assured: {
    label: "InstaCashMart Assured",
    verified: true,
  },
  dealer: {
    label: "Dealer",
    verified: true,
  },
  owner: {
    label: "Individual owner",
    verified: false,
  },
};

export const sellerTypeOf = (vehicle) =>
  SELLER_TYPES[vehicle.sellerType] || SELLER_TYPES.owner;

const makeVehicle = (
  A,
  e,
  t,
  r,
  variant,
  year,
  km,
  fuel,
  transmission,
  owners,
  c,
  l,
  sellerType,
  sellerName,
) => ({
  id: A,
  type: e,
  brand: t,
  model: r,
  variant,
  year,
  km,
  fuel,
  transmission,
  owners,
  city: c,
  price: l,
  sellerType,
  sellerName,
  builtIn: true,
});

const VEHICLE_ROWS = [
  [
    "bike",
    "Royal Enfield",
    "Classic 350",
    "Signals",
    2022,
    14500,
    "Petrol",
    "Manual",
    "1st",
    "Bengaluru",
    158000,
    "assured",
    "InstaCashMart Assured",
  ],
  [
    "bike",
    "Honda",
    "Activa 6G",
    "DLX",
    2021,
    18200,
    "Petrol",
    "Automatic",
    "1st",
    "Hyderabad",
    52000,
    "owner",
    "Sandeep R.",
  ],
  [
    "bike",
    "Yamaha",
    "R15 V4",
    "Racing Blue",
    2023,
    9800,
    "Petrol",
    "Manual",
    "1st",
    "Pune",
    152000,
    "dealer",
    "Speedway Motors",
  ],
  [
    "bike",
    "Bajaj",
    "Pulsar NS200",
    "ABS",
    2020,
    26500,
    "Petrol",
    "Manual",
    "2nd",
    "Delhi NCR",
    82000,
    "owner",
    "Amit K.",
  ],
  [
    "bike",
    "KTM",
    "Duke 390",
    "Gen 2",
    2022,
    12400,
    "Petrol",
    "Manual",
    "1st",
    "Mumbai",
    228000,
    "assured",
    "InstaCashMart Assured",
  ],
  [
    "bike",
    "TVS",
    "Apache RTR 160 4V",
    "Dual Disc",
    2021,
    21000,
    "Petrol",
    "Manual",
    "1st",
    "Chennai",
    78000,
    "dealer",
    "Chennai Two Wheels",
  ],
  [
    "bike",
    "Hero",
    "Splendor Plus",
    "i3S",
    2019,
    34000,
    "Petrol",
    "Manual",
    "2nd",
    "Kolkata",
    38000,
    "owner",
    "Debashis M.",
  ],
  [
    "bike",
    "Ather",
    "450X",
    "Gen 3",
    2023,
    8600,
    "Electric",
    "Automatic",
    "1st",
    "Bengaluru",
    98000,
    "assured",
    "InstaCashMart Assured",
  ],
  [
    "bike",
    "Royal Enfield",
    "Hunter 350",
    "Metro Rebel",
    2023,
    7200,
    "Petrol",
    "Manual",
    "1st",
    "Jaipur",
    132000,
    "dealer",
    "Pink City Motors",
  ],
  [
    "bike",
    "Suzuki",
    "Access 125",
    "Special Edition",
    2022,
    11000,
    "Petrol",
    "Automatic",
    "1st",
    "Ahmedabad",
    62000,
    "owner",
    "Hetal P.",
  ],
  [
    "bike",
    "Honda",
    "CB350",
    "DLX Pro",
    2022,
    15800,
    "Petrol",
    "Manual",
    "1st",
    "Hyderabad",
    165000,
    "dealer",
    "Deccan Bikes",
  ],
  [
    "bike",
    "Ola",
    "S1 Pro",
    "Gen 1",
    2022,
    14000,
    "Electric",
    "Automatic",
    "1st",
    "Pune",
    68000,
    "owner",
    "Nikhil S.",
  ],
  [
    "car",
    "Maruti Suzuki",
    "Swift",
    "ZXi",
    2021,
    32000,
    "Petrol",
    "Manual",
    "1st",
    "Bengaluru",
    565000,
    "assured",
    "InstaCashMart Assured",
  ],
  [
    "car",
    "Hyundai",
    "Creta",
    "SX (O)",
    2022,
    28500,
    "Diesel",
    "Automatic",
    "1st",
    "Delhi NCR",
    1425000,
    "dealer",
    "Capital Car Bazaar",
  ],
  [
    "car",
    "Tata",
    "Nexon",
    "XZ+",
    2021,
    41000,
    "Petrol",
    "Manual",
    "1st",
    "Pune",
    785000,
    "owner",
    "Prasad J.",
  ],
  [
    "car",
    "Mahindra",
    "XUV700",
    "AX7",
    2023,
    18000,
    "Diesel",
    "Automatic",
    "1st",
    "Hyderabad",
    2050000,
    "assured",
    "InstaCashMart Assured",
  ],
  [
    "car",
    "Honda",
    "City",
    "VX",
    2020,
    52000,
    "Petrol",
    "Manual",
    "2nd",
    "Mumbai",
    815000,
    "dealer",
    "Western Wheels",
  ],
  [
    "car",
    "Kia",
    "Seltos",
    "HTX",
    2022,
    24000,
    "Petrol",
    "Manual",
    "1st",
    "Chennai",
    1295000,
    "owner",
    "Karthik V.",
  ],
  [
    "car",
    "Maruti Suzuki",
    "Baleno",
    "Alpha AGS",
    2022,
    21000,
    "Petrol",
    "Automatic",
    "1st",
    "Ahmedabad",
    735000,
    "assured",
    "InstaCashMart Assured",
  ],
  [
    "car",
    "Toyota",
    "Innova Crysta",
    "2.4 GX",
    2019,
    88000,
    "Diesel",
    "Manual",
    "1st",
    "Kolkata",
    1650000,
    "dealer",
    "Eastern Motors",
  ],
  [
    "car",
    "Tata",
    "Punch",
    "Accomplished",
    2023,
    12000,
    "CNG",
    "Manual",
    "1st",
    "Jaipur",
    625000,
    "owner",
    "Rohit S.",
  ],
  [
    "car",
    "Mahindra",
    "Thar",
    "LX 4WD",
    2021,
    36000,
    "Diesel",
    "Manual",
    "1st",
    "Bengaluru",
    1325000,
    "dealer",
    "Garden City Autos",
  ],
  [
    "car",
    "Hyundai",
    "i20",
    "Asta",
    2020,
    45000,
    "Petrol",
    "Manual",
    "2nd",
    "Delhi NCR",
    595000,
    "owner",
    "Neha G.",
  ],
  [
    "car",
    "Tata",
    "Nexon EV",
    "Empowered",
    2023,
    15000,
    "Electric",
    "Automatic",
    "1st",
    "Mumbai",
    1185000,
    "assured",
    "InstaCashMart Assured",
  ],
];

const BUILT_IN_VEHICLES = VEHICLE_ROWS.map((A, e) =>
  makeVehicle(`V${e + 1}`, ...A),
);

export const vehicleTitle = (A) =>
  [A.condition === "New" ? "New" : A.year, A.brand, A.model]
    .filter(Boolean)
    .join(" ");

const stripBrand = (name, brand) => {
  if (name.toLowerCase().startsWith(`${brand.toLowerCase()} `)) {
    return name.slice(brand.length + 1);
  }
  return name;
};

const fromAdminProduct = (A) => ({
  ...A,
  model: A.model || stripBrand(A.name, A.brand),
  variant: A.model ? A.name : "",
  year: Number(A.year) || 0,
  km: A.condition === "New" ? 0 : Number(A.km) || 0,
  price: Number(A.price),
  sellerType: "assured",
  sellerName: "InstaCashMart Assured",
});

export function useVehicles() {
  const A = useStoreList("vehicleProducts");
  const e = useStoreList("vehicles");
  return useMemo(
    () => [
      ...A.filter((t) => !t.hidden).map(fromAdminProduct),
      ...e.filter((t) => t.status === "Live"),
      ...BUILT_IN_VEHICLES,
    ],
    [A, e],
  );
}

export function estimateVehiclePrice({ type, brand, model, year, km, owners }) {
  const i = VEHICLE_PRICES[type]?.[brand]?.[model];
  if (!i || !year) {
    return null;
  }
  const f = Math.max(0, new Date().getFullYear() - Number(year));
  const P = f === 0 ? 0.92 : 0.88 * (type === "car" ? 0.93 : 0.92) ** (f - 1);
  const x = type === "car" ? 12000 : 8000;
  const c = (Number(km) || 0) / x - Math.max(f, 1);
  const l = Math.min(1.05, Math.max(0.8, 1 - 0.04 * c));
  const j =
    {
      "1st": 1,
      "2nd": 0.92,
      "3rd+": 0.85,
    }[owners] || 1;
  const w = type === "car" ? 5000 : 1000;
  const F = i * P * l * j;
  const p = (K) => Math.round(K / w) * w;
  return {
    low: p(F * 0.93),
    high: p(F * 1.07),
    mid: p(F),
  };
}

export function vehicleMatches(A, e) {
  const t = e.toLowerCase().split(/\s+/).filter(Boolean);
  const r =
    `${A.year || ""} ${A.brand} ${A.model} ${A.variant || ""} ${A.fuel || ""} ${A.city || ""} ${vehicleType(A.type).label}`.toLowerCase();
  return t.every((a) => r.includes(a));
}
