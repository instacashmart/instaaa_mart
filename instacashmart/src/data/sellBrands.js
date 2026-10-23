import { SELL_CATALOG } from "./sellCatalog";
import appleLogo from "../assets/logos/apple.svg";
import samsungLogo from "../assets/logos/samsung.svg";
import oneplusLogo from "../assets/logos/oneplus.svg";
import xiaomiLogo from "../assets/logos/xiaomi.svg";
import vivoLogo from "../assets/logos/vivo.svg";
import oppoLogo from "../assets/logos/oppo.svg";
import motorolaLogo from "../assets/logos/motorola.svg";
import nokiaLogo from "../assets/logos/nokia.svg";
import honorLogo from "../assets/logos/honor.svg";
import asusLogo from "../assets/logos/asus.svg";
import sonyLogo from "../assets/logos/sony.svg";
import lgLogo from "../assets/logos/lg.svg";
import googleLogo from "../assets/logos/google.png";
import dellLogo from "../assets/logos/dell.svg";
import hpLogo from "../assets/logos/hp.svg";
import lenovoLogo from "../assets/logos/lenovo.svg";
import acerLogo from "../assets/logos/acer.svg";
import microsoftLogo from "../assets/logos/microsoft.svg";
import msiLogo from "../assets/logos/msi.svg";
import alienwareLogo from "../assets/logos/alienware.svg";
import razerLogo from "../assets/logos/razer.svg";
import toshibaLogo from "../assets/logos/toshiba.svg";
import huaweiLogo from "../assets/logos/huawei.svg";
import amazonLogo from "../assets/logos/amazon.svg";
import fitbitLogo from "../assets/logos/fitbit.svg";
import garminLogo from "../assets/logos/garmin.svg";
import boatLogo from "../assets/logos/boat.svg";
import jblLogo from "../assets/logos/jbl.svg";
import boseLogo from "../assets/logos/bose.svg";
import sennheiserLogo from "../assets/logos/sennheiser.svg";
import playstationLogo from "../assets/logos/playstation.svg";
import nintendoLogo from "../assets/logos/nintendo.svg";
import steamdeckLogo from "../assets/logos/steamdeck.svg";
import rogallyLogo from "../assets/logos/rogally.svg";
import atariLogo from "../assets/logos/atari.svg";
import segaLogo from "../assets/logos/sega.svg";
import nikonLogo from "../assets/logos/nikon.svg";
import fujifilmLogo from "../assets/logos/fujifilm.svg";
import panasonicLogo from "../assets/logos/panasonic.svg";
import leicaLogo from "../assets/logos/leica.svg";
import djiLogo from "../assets/logos/dji.svg";
import kodakLogo from "../assets/logos/kodak.svg";
import insta360Logo from "../assets/logos/insta360.svg";

export const SELL_PAGES = {
  phone: {
    path: "/sell-phone",
    noun: "phone",
    crumb: "Sell Phone",
    icon: "fa-mobile-screen-button",
    searchHint: "e.g. iPhone 15",
    brands: [
      {
        key: "Apple",
        name: "Apple",
        tagline: "iPhone 16, 15, 14 & older",
        logo: appleLogo,
      },
      {
        key: "Samsung",
        name: "Samsung",
        tagline: "Galaxy S, Z Fold & Flip, A, M",
        logo: samsungLogo,
        wide: true,
      },
      {
        key: "OnePlus",
        name: "OnePlus",
        tagline: "Number series & Nord",
        logo: oneplusLogo,
      },
      {
        key: "Xiaomi",
        name: "Xiaomi",
        tagline: "Xiaomi 14, 13 & T series",
        logo: xiaomiLogo,
      },
      {
        key: "Redmi",
        name: "Redmi",
        tagline: "Redmi Note & number series",
        wordmark: {
          text: "Redmi",
          className: "text-[#E1251B] font-bold tracking-tight",
        },
      },
      {
        key: "POCO",
        name: "POCO",
        tagline: "F, X, M & C series",
        wordmark: {
          text: "POCO",
          className:
            "bg-[#FFD100] text-black font-black italic px-2.5 py-0.5 rounded-md",
        },
      },
      {
        key: "Vivo",
        name: "Vivo",
        tagline: "X, V, T & Y series",
        logo: vivoLogo,
        wide: true,
      },
      {
        key: "Oppo",
        name: "Oppo",
        tagline: "Find, Reno & A series",
        logo: oppoLogo,
        wide: true,
      },
      {
        key: "Realme",
        name: "realme",
        tagline: "GT, Number, Narzo & C series",
        wordmark: {
          text: "realme",
          className:
            "bg-[#FFC915] text-black font-extrabold px-2.5 py-0.5 rounded-md",
        },
      },
      {
        key: "Motorola",
        name: "Motorola",
        tagline: "Razr, Edge & Moto G",
        logo: motorolaLogo,
      },
      {
        key: "Nothing",
        name: "Nothing",
        tagline: "Phone (2), (2a), (1) & CMF",
        wordmark: {
          text: "NOTHING",
          className: "font-mono font-bold tracking-[0.2em] text-black",
        },
      },
      {
        key: "Nokia",
        name: "Nokia",
        tagline: "X, G & C series",
        logo: nokiaLogo,
        wide: true,
      },
      {
        key: "Infinix",
        name: "Infinix",
        tagline: "GT, Zero, Note & Hot",
        wordmark: {
          text: "Infinix",
          className: "text-black font-extrabold italic tracking-tight",
        },
      },
      {
        key: "Tecno",
        name: "Tecno",
        tagline: "Phantom, Camon, Pova & Spark",
        wordmark: {
          text: "TECNO",
          className: "text-[#0055B8] font-black tracking-wide",
        },
      },
      {
        key: "Honor",
        name: "Honor",
        tagline: "Magic, Number & X series",
        logo: honorLogo,
        wide: true,
      },
      {
        key: "iQOO",
        name: "iQOO",
        tagline: "Number, Neo & Z series",
        wordmark: {
          text: "iQOO",
          className: "text-black font-black italic tracking-tight",
        },
      },
      {
        key: "Asus",
        name: "Asus",
        tagline: "ROG Phone & Zenfone",
        logo: asusLogo,
        wide: true,
      },
      {
        key: "Sony",
        name: "Sony",
        tagline: "Xperia 1, 5 & 10",
        logo: sonyLogo,
        wide: true,
      },
      {
        key: "LG",
        name: "LG",
        tagline: "Wing, Velvet & G series",
        logo: lgLogo,
        wide: true,
      },
      {
        key: "Google",
        name: "Google Pixel",
        tagline: "Pixel 8 & 7 series",
        logo: googleLogo,
        wide: true,
      },
    ],
  },
  laptop: {
    path: "/sell-laptop",
    noun: "laptop",
    crumb: "Sell Laptop",
    icon: "fa-laptop",
    searchHint: "e.g. MacBook Air",
    brands: [
      {
        key: "Apple",
        name: "Apple",
        tagline: "MacBook Air & MacBook Pro",
        logo: appleLogo,
      },
      {
        key: "Dell",
        name: "Dell",
        tagline: "XPS, Latitude, Inspiron & Vostro",
        logo: dellLogo,
      },
      {
        key: "HP",
        name: "HP",
        tagline: "Spectre, Omen, Envy, Victus & Pavilion",
        logo: hpLogo,
      },
      {
        key: "Lenovo",
        name: "Lenovo",
        tagline: "ThinkPad, Legion, Yoga & IdeaPad",
        logo: lenovoLogo,
        wide: true,
      },
      {
        key: "Asus",
        name: "Asus",
        tagline: "ROG, ZenBook, TUF & VivoBook",
        logo: asusLogo,
        wide: true,
      },
      {
        key: "Acer",
        name: "Acer",
        tagline: "Predator, Nitro, Swift & Aspire",
        logo: acerLogo,
        wide: true,
      },
      {
        key: "Microsoft",
        name: "Microsoft Surface",
        tagline: "Surface Laptop & Surface Pro",
        logo: microsoftLogo,
      },
      {
        key: "MSI",
        name: "MSI",
        tagline: "Raider, Stealth, Katana & Modern",
        logo: msiLogo,
      },
      {
        key: "Alienware",
        name: "Alienware",
        tagline: "m-series & x-series gaming",
        logo: alienwareLogo,
      },
      {
        key: "Razer",
        name: "Razer",
        tagline: "Razer Blade 14, 15 & 16",
        logo: razerLogo,
      },
      {
        key: "LG",
        name: "LG",
        tagline: "LG gram",
        logo: lgLogo,
        wide: true,
      },
      {
        key: "Samsung",
        name: "Samsung",
        tagline: "Galaxy Book Pro & 360",
        logo: samsungLogo,
        wide: true,
      },
      {
        key: "Toshiba",
        name: "Toshiba / Dynabook",
        tagline: "Satellite Pro & Portégé",
        logo: toshibaLogo,
        wide: true,
      },
      {
        key: "VAIO",
        name: "VAIO",
        tagline: "SX14, FE & E series",
        wordmark: {
          text: "VAIO",
          className: "text-black font-light tracking-[0.3em]",
        },
      },
      {
        key: "Huawei",
        name: "Huawei",
        tagline: "MateBook X Pro, 14 & D",
        logo: huaweiLogo,
      },
      {
        key: "Honor",
        name: "Honor",
        tagline: "MagicBook Pro, X & 15",
        logo: honorLogo,
        wide: true,
      },
    ],
  },
  tablet: {
    path: "/sell-tablet",
    noun: "tablet",
    crumb: "Sell Tablet",
    icon: "fa-tablet-screen-button",
    searchHint: "e.g. iPad Air",
    brands: [
      {
        key: "Apple",
        name: "Apple",
        tagline: "iPad Pro, Air, Mini & iPad",
        logo: appleLogo,
      },
      {
        key: "Samsung",
        name: "Samsung",
        tagline: "Galaxy Tab S9 & A9 series",
        logo: samsungLogo,
        wide: true,
      },
      {
        key: "Lenovo",
        name: "Lenovo",
        tagline: "Tab P12 & Tab M series",
        logo: lenovoLogo,
        wide: true,
      },
      {
        key: "Xiaomi",
        name: "Xiaomi",
        tagline: "Xiaomi Pad & Redmi Pad",
        logo: xiaomiLogo,
      },
      {
        key: "OnePlus",
        name: "OnePlus",
        tagline: "OnePlus Pad, Pad 2 & Pad Go",
        logo: oneplusLogo,
      },
      {
        key: "Realme",
        name: "realme",
        tagline: "realme Pad 2, X & Mini",
        wordmark: {
          text: "realme",
          className:
            "bg-[#FFC915] text-black font-extrabold px-2.5 py-0.5 rounded-md",
        },
      },
      {
        key: "Oppo",
        name: "Oppo",
        tagline: "Oppo Pad 2 & Pad Air",
        logo: oppoLogo,
        wide: true,
      },
      {
        key: "Vivo",
        name: "Vivo",
        tagline: "Vivo Pad 3 Pro, Pad 2 & Air",
        logo: vivoLogo,
        wide: true,
      },
      {
        key: "Honor",
        name: "Honor",
        tagline: "Honor Pad 9 & Pad X series",
        logo: honorLogo,
        wide: true,
      },
      {
        key: "Huawei",
        name: "Huawei",
        tagline: "MatePad Pro, 11.5 & SE",
        logo: huaweiLogo,
      },
      {
        key: "Microsoft",
        name: "Microsoft Surface",
        tagline: "Surface Pro & Surface Go",
        logo: microsoftLogo,
      },
      {
        key: "Nokia",
        name: "Nokia",
        tagline: "Nokia T21, T20 & T10",
        logo: nokiaLogo,
        wide: true,
      },
      {
        key: "Amazon",
        name: "Amazon",
        tagline: "Fire Max 11 & Fire HD",
        logo: amazonLogo,
      },
    ],
  },
  smartwatch: {
    path: "/sell-smartwatch",
    noun: "smartwatch",
    crumb: "Sell Smartwatch",
    icon: "fa-clock",
    searchHint: "e.g. Apple Watch",
    brands: [
      {
        key: "Apple",
        name: "Apple",
        tagline: "Apple Watch Ultra, Series & SE",
        logo: appleLogo,
      },
      {
        key: "Samsung",
        name: "Samsung",
        tagline: "Galaxy Watch Ultra, 7, 6 & FE",
        logo: samsungLogo,
        wide: true,
      },
      {
        key: "OnePlus",
        name: "OnePlus",
        tagline: "OnePlus Watch 2, 2R & Nord",
        logo: oneplusLogo,
      },
      {
        key: "Xiaomi",
        name: "Xiaomi",
        tagline: "Xiaomi Watch & Smart Band",
        logo: xiaomiLogo,
      },
      {
        key: "Redmi",
        name: "Redmi",
        tagline: "Redmi Watch & Smart Band",
        wordmark: {
          text: "Redmi",
          className: "text-[#E1251B] font-bold tracking-tight",
        },
      },
      {
        key: "Huawei",
        name: "Huawei",
        tagline: "Watch GT, Watch Fit & Band",
        logo: huaweiLogo,
      },
      {
        key: "FireBoltt",
        name: "Fire-Boltt",
        tagline: "Invincible, Phoenix & Ninja",
        wordmark: {
          text: "FIRE-BOLTT",
          className: "text-[#E4202A] font-black italic tracking-tight",
        },
      },
      {
        key: "Fastrack",
        name: "Fastrack",
        tagline: "Limitless, Optimus & Revoltt",
        wordmark: {
          text: "fastrack",
          className:
            "bg-black text-white font-black italic lowercase px-2.5 py-0.5 rounded-md",
        },
      },
      {
        key: "Titan",
        name: "Titan",
        tagline: "Celestor, Crest & Talk",
        wordmark: {
          text: "TITAN",
          className:
            "text-[#7A5C2E] font-serif font-semibold tracking-[0.25em]",
        },
      },
      {
        key: "Google",
        name: "Google Pixel Watch",
        tagline: "Pixel Watch 3, 2 & 1",
        logo: googleLogo,
        wide: true,
      },
      {
        key: "Fitbit",
        name: "Fitbit",
        tagline: "Sense, Versa, Charge & Inspire",
        logo: fitbitLogo,
      },
      {
        key: "Garmin",
        name: "Garmin",
        tagline: "Fenix, Epix, Forerunner & Venu",
        logo: garminLogo,
        wide: true,
      },
      {
        key: "Amazfit",
        name: "Amazfit",
        tagline: "T-Rex, Balance, GTR & Bip",
        wordmark: {
          text: "AMAZFIT",
          className: "text-black font-extrabold tracking-[0.12em]",
        },
      },
      {
        key: "boAt",
        name: "boAt",
        tagline: "Lunar, Wave & Storm",
        logo: boatLogo,
      },
      {
        key: "Noise",
        name: "Noise",
        tagline: "NoiseFit Halo & ColorFit",
        wordmark: {
          text: "noise",
          className: "text-black font-black lowercase tracking-tight",
        },
      },
    ],
  },
  earbuds: {
    path: "/sell-earbuds",
    noun: "earbuds",
    crumb: "Sell Earbuds",
    icon: "fa-headphones",
    searchHint: "e.g. AirPods Pro",
    brands: [
      {
        key: "Apple",
        name: "Apple",
        tagline: "AirPods Pro, AirPods & Max",
        logo: appleLogo,
      },
      {
        key: "Samsung",
        name: "Samsung",
        tagline: "Galaxy Buds 3 Pro, 2 Pro & FE",
        logo: samsungLogo,
        wide: true,
      },
      {
        key: "Sony",
        name: "Sony",
        tagline: "WF-1000XM, WH-1000XM & WF-C",
        logo: sonyLogo,
        wide: true,
      },
      {
        key: "OnePlus",
        name: "OnePlus",
        tagline: "Buds Pro & Nord Buds",
        logo: oneplusLogo,
      },
      {
        key: "JBL",
        name: "JBL",
        tagline: "Tour, Live & Wave",
        logo: jblLogo,
        wide: true,
      },
      {
        key: "Bose",
        name: "Bose",
        tagline: "QuietComfort Ultra & Earbuds II",
        logo: boseLogo,
        wide: true,
      },
      {
        key: "Sennheiser",
        name: "Sennheiser",
        tagline: "Momentum & Accentum",
        logo: sennheiserLogo,
      },
      {
        key: "Nothing",
        name: "Nothing",
        tagline: "Ear, Ear (2) & Ear (a)",
        wordmark: {
          text: "NOTHING",
          className: "font-mono font-bold tracking-[0.2em] text-black",
        },
      },
      {
        key: "CMF",
        name: "CMF by Nothing",
        tagline: "CMF Buds Pro 2, Buds & Neckband",
        wordmark: {
          text: "CMF",
          className:
            "bg-[#FF5A00] text-black font-mono font-black tracking-widest px-2.5 py-0.5 rounded-md",
        },
      },
      {
        key: "Xiaomi",
        name: "Xiaomi",
        tagline: "Xiaomi Buds 5 Pro & 4 Pro",
        logo: xiaomiLogo,
      },
      {
        key: "Redmi",
        name: "Redmi",
        tagline: "Redmi Buds 6 Pro, 5 Pro & 5",
        wordmark: {
          text: "Redmi",
          className: "text-[#E1251B] font-bold tracking-tight",
        },
      },
      {
        key: "Realme",
        name: "realme",
        tagline: "Buds Air 6 Pro, Air 6 & T300",
        wordmark: {
          text: "realme",
          className:
            "bg-[#FFC915] text-black font-extrabold px-2.5 py-0.5 rounded-md",
        },
      },
      {
        key: "Oppo",
        name: "Oppo",
        tagline: "Enco X2, Air 4 Pro & Buds 2",
        logo: oppoLogo,
        wide: true,
      },
      {
        key: "Vivo",
        name: "Vivo",
        tagline: "Vivo TWS 3 Pro & Air 2",
        logo: vivoLogo,
        wide: true,
      },
      {
        key: "Soundcore",
        name: "Anker Soundcore",
        tagline: "Liberty, Space, Life & R series",
        wordmark: {
          text: "soundcore",
          className: "text-[#00A7E1] font-bold tracking-tight",
        },
      },
      {
        key: "Skullcandy",
        name: "Skullcandy",
        tagline: "Crusher, Rail & Dime",
        wordmark: {
          text: "Skullcandy",
          className: "text-black font-black tracking-tight",
        },
      },
      {
        key: "FireBoltt",
        name: "Fire-Boltt",
        tagline: "Fire Pods Atlas & Ninja",
        wordmark: {
          text: "FIRE-BOLTT",
          className: "text-[#E4202A] font-black italic tracking-tight",
        },
      },
      {
        key: "Noise",
        name: "Noise",
        tagline: "Master Buds, Buds N1 & Two",
        wordmark: {
          text: "noise",
          className: "text-black font-black lowercase tracking-tight",
        },
      },
      {
        key: "boAt",
        name: "boAt",
        tagline: "Nirvana, Airdopes & Rockerz",
        logo: boatLogo,
      },
    ],
  },
  console: {
    path: "/sell-console",
    noun: "console",
    crumb: "Sell Console",
    icon: "fa-gamepad",
    searchHint: "e.g. PS5 or Switch",
    brands: [
      {
        key: "PlayStation",
        name: "PlayStation",
        tagline: "PS5 Pro, PS5, PS4 & Portal",
        logo: playstationLogo,
      },
      {
        key: "Xbox",
        name: "Xbox",
        tagline: "Series X, Series S & One X",
        wordmark: {
          text: "XBOX",
          icon: "fa-brands fa-xbox",
          className: "text-[#107C10] font-black tracking-[0.15em]",
        },
      },
      {
        key: "Nintendo",
        name: "Nintendo",
        tagline: "Switch OLED, Switch & Lite",
        logo: nintendoLogo,
        wide: true,
      },
      {
        key: "SteamDeck",
        name: "Steam Deck",
        tagline: "Steam Deck OLED & LCD",
        logo: steamdeckLogo,
      },
      {
        key: "ROGAlly",
        name: "ASUS ROG Ally",
        tagline: "ROG Ally X, Z1 Extreme & Z1",
        logo: rogallyLogo,
      },
      {
        key: "LegionGo",
        name: "Lenovo Legion Go",
        tagline: "Legion Go 1TB & 512GB",
        wordmark: {
          text: "LEGION GO",
          className: "text-black font-black italic tracking-[0.08em]",
        },
      },
      {
        key: "MSIClaw",
        name: "MSI Claw",
        tagline: "Claw 8 AI+ & Claw A1M",
        logo: msiLogo,
      },
      {
        key: "Atari",
        name: "Atari",
        tagline: "Atari VCS & 2600+",
        logo: atariLogo,
      },
      {
        key: "Sega",
        name: "Sega",
        tagline: "Genesis Mini, Mega Drive & Game Gear",
        logo: segaLogo,
      },
    ],
  },
  camera: {
    path: "/sell-camera",
    noun: "camera",
    crumb: "Sell Camera",
    icon: "fa-camera",
    searchHint: "e.g. EOS R6 or GoPro",
    brands: [
      {
        key: "Canon",
        name: "Canon",
        tagline: "EOS R mirrorless & EOS DSLR",
        wordmark: {
          text: "Canon",
          className: "text-[#CC0000] font-black italic tracking-tight",
        },
      },
      {
        key: "Sony",
        name: "Sony",
        tagline: "Alpha, ZV & Cyber-shot",
        logo: sonyLogo,
        wide: true,
      },
      {
        key: "Nikon",
        name: "Nikon",
        tagline: "Z mirrorless & D-series DSLR",
        logo: nikonLogo,
        wide: true,
      },
      {
        key: "Fujifilm",
        name: "Fujifilm",
        tagline: "X-H, X-T, X100 & Instax",
        logo: fujifilmLogo,
        wide: true,
      },
      {
        key: "Panasonic",
        name: "Panasonic Lumix",
        tagline: "Lumix S, GH & G series",
        logo: panasonicLogo,
        wide: true,
      },
      {
        key: "GoPro",
        name: "GoPro",
        tagline: "Hero 13, 12, 11 & Max",
        wordmark: {
          text: "GoPro",
          className: "text-black font-black tracking-tight",
        },
      },
      {
        key: "OMSystem",
        name: "OM System",
        tagline: "OM-1, OM-5 & Olympus OM-D",
        wordmark: {
          text: "OM SYSTEM",
          className: "text-black font-semibold tracking-[0.12em]",
        },
      },
      {
        key: "Leica",
        name: "Leica",
        tagline: "M11, Q3, SL2 & D-Lux",
        logo: leicaLogo,
      },
      {
        key: "Hasselblad",
        name: "Hasselblad",
        tagline: "X2D, 907X & X1D",
        wordmark: {
          text: "HASSELBLAD",
          className: "text-black font-light tracking-[0.18em]",
        },
      },
      {
        key: "DJI",
        name: "DJI",
        tagline: "Osmo Pocket, Action, 360 & Ronin",
        logo: djiLogo,
      },
      {
        key: "Kodak",
        name: "Kodak",
        tagline: "PixPro & Smile instant",
        logo: kodakLogo,
      },
      {
        key: "Insta360",
        name: "Insta360",
        tagline: "X4, Ace Pro & GO",
        logo: insta360Logo,
      },
      {
        key: "Polaroid",
        name: "Polaroid",
        tagline: "I-2, Now+ & Go",
        wordmark: {
          text: "Polaroid",
          className: "text-black font-bold tracking-tight",
        },
      },
      {
        key: "Blackmagic",
        name: "Blackmagic Design",
        tagline: "Pocket Cinema & Cinema Camera",
        wordmark: {
          text: "Blackmagic",
          className: "text-black font-semibold tracking-tight",
        },
      },
    ],
  },
};

export const sellPage = (category) => SELL_PAGES[category];

export const findSellBrand = (category, brand) =>
  SELL_PAGES[category].brands.find(
    (t) => t.key.toLowerCase() === String(brand).toLowerCase(),
  );

export const brandModels = (category, key) =>
  SELL_CATALOG[category].models[key] || [];

export const brandName = (A, e) =>
  SELL_PAGES[A]?.brands.find((a) => a.key === e)?.name || e;

export const sellBrandPath = (category, e) =>
  `${SELL_PAGES[category].path}/${e.key.toLowerCase()}`;

export const OTHER_BRAND = "other";

export const otherDeviceSellUrl = (category, e = "", t = "") =>
  `/sell?${new URLSearchParams({
    cat: category,
    brand: OTHER_BRAND,
    otherBrand: e.trim(),
    otherModel: t.trim(),
  })}`;

export const sellCategoryPath = (A) => SELL_PAGES[A]?.path || `/sell?cat=${A}`;
