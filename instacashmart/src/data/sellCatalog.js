import phoneImg from "../assets/categories/phone.webp";
import laptopImg from "../assets/categories/laptop.webp";
import tabletImg from "../assets/categories/tablet.webp";
import smartwatchImg from "../assets/categories/smartwatch.webp";
import earbudsImg from "../assets/categories/earbuds.webp";
import consoleImg from "../assets/categories/console.webp";
import cameraImg from "../assets/categories/camera.webp";

export const SELL_CATALOG = {
  phone: {
    brands: [
      "Apple",
      "Samsung",
      "OnePlus",
      "Xiaomi",
      "Redmi",
      "POCO",
      "Vivo",
      "Oppo",
      "Realme",
      "Motorola",
      "Nothing",
      "Nokia",
      "Infinix",
      "Tecno",
      "Honor",
      "iQOO",
      "Asus",
      "Sony",
      "LG",
      "Google",
    ],
    models: {
      Apple: [
        {
          name: "Apple iPhone 16 Pro Max",
          base: 92000,
        },
        {
          name: "Apple iPhone 16 Pro",
          base: 81000,
        },
        {
          name: "Apple iPhone 16",
          base: 58000,
        },
        {
          name: "Apple iPhone 15 Pro Max",
          base: 84500,
        },
        {
          name: "Apple iPhone 15 Pro",
          base: 72500,
        },
        {
          name: "Apple iPhone 15",
          base: 51000,
        },
        {
          name: "Apple iPhone 14 Pro Max",
          base: 64000,
        },
        {
          name: "Apple iPhone 14",
          base: 39500,
        },
        {
          name: "Apple iPhone 13",
          base: 31000,
        },
        {
          name: "Apple iPhone 12",
          base: 22000,
        },
      ],
      Samsung: [
        {
          name: "Samsung Galaxy S24 Ultra",
          base: 78000,
        },
        {
          name: "Samsung Galaxy S24 Plus",
          base: 56000,
        },
        {
          name: "Samsung Galaxy S23 Ultra",
          base: 51000,
        },
        {
          name: "Samsung Galaxy Z Fold 5",
          base: 62000,
        },
        {
          name: "Samsung Galaxy Z Flip 5",
          base: 38000,
        },
        {
          name: "Samsung Galaxy S22",
          base: 26000,
        },
        {
          name: "Samsung Galaxy A55 5G",
          base: 15500,
        },
        {
          name: "Samsung Galaxy M34 5G",
          base: 7500,
        },
      ],
      OnePlus: [
        {
          name: "OnePlus 12 (16GB RAM)",
          base: 41000,
        },
        {
          name: "OnePlus 12R",
          base: 28500,
        },
        {
          name: "OnePlus 11 5G",
          base: 27000,
        },
        {
          name: "OnePlus Nord 3",
          base: 16500,
        },
        {
          name: "OnePlus Nord CE 4",
          base: 11500,
        },
      ],
      Xiaomi: [
        {
          name: "Xiaomi 14 Ultra",
          base: 48000,
        },
        {
          name: "Xiaomi 14",
          base: 36000,
        },
        {
          name: "Xiaomi 13 Pro",
          base: 31000,
        },
        {
          name: "Xiaomi 11T Pro",
          base: 14000,
        },
      ],
      Redmi: [
        {
          name: "Redmi Note 13 Pro+",
          base: 16000,
        },
        {
          name: "Redmi Note 13 Pro",
          base: 12500,
        },
        {
          name: "Redmi Note 12 5G",
          base: 8000,
        },
        {
          name: "Redmi 13C 5G",
          base: 4500,
        },
      ],
      POCO: [
        {
          name: "POCO F6",
          base: 17500,
        },
        {
          name: "POCO X6 Pro",
          base: 13500,
        },
        {
          name: "POCO M6 Pro",
          base: 7000,
        },
        {
          name: "POCO C65",
          base: 3800,
        },
      ],
      Vivo: [
        {
          name: "Vivo X100 Pro",
          base: 49000,
        },
        {
          name: "Vivo X90",
          base: 28000,
        },
        {
          name: "Vivo V30 Pro",
          base: 23500,
        },
        {
          name: "Vivo T3 5G",
          base: 9500,
        },
        {
          name: "Vivo Y28 5G",
          base: 5500,
        },
      ],
      Oppo: [
        {
          name: "Oppo Find X7 Ultra",
          base: 46000,
        },
        {
          name: "Oppo Find N3 Flip",
          base: 38000,
        },
        {
          name: "Oppo Reno 11 Pro",
          base: 21000,
        },
        {
          name: "Oppo A79 5G",
          base: 6500,
        },
      ],
      Realme: [
        {
          name: "Realme GT 6",
          base: 19500,
        },
        {
          name: "Realme 12 Pro+",
          base: 14500,
        },
        {
          name: "Realme Narzo 70 Pro",
          base: 9000,
        },
        {
          name: "Realme C67 5G",
          base: 5000,
        },
      ],
      Motorola: [
        {
          name: "Motorola Razr 40 Ultra",
          base: 24000,
        },
        {
          name: "Motorola Edge 50 Pro",
          base: 15500,
        },
        {
          name: "Motorola Edge 40",
          base: 11500,
        },
        {
          name: "Moto G84 5G",
          base: 6500,
        },
      ],
      Nothing: [
        {
          name: "Nothing Phone (2)",
          base: 20500,
        },
        {
          name: "Nothing Phone (2a)",
          base: 12000,
        },
        {
          name: "Nothing Phone (1)",
          base: 9500,
        },
        {
          name: "CMF Phone 1",
          base: 6000,
        },
      ],
      Nokia: [
        {
          name: "Nokia X30 5G",
          base: 9000,
        },
        {
          name: "Nokia G42 5G",
          base: 4500,
        },
        {
          name: "Nokia C32",
          base: 2500,
        },
      ],
      Infinix: [
        {
          name: "Infinix GT 20 Pro",
          base: 9500,
        },
        {
          name: "Infinix Zero 30 5G",
          base: 8500,
        },
        {
          name: "Infinix Note 40 Pro",
          base: 7500,
        },
        {
          name: "Infinix Hot 40i",
          base: 3000,
        },
      ],
      Tecno: [
        {
          name: "Tecno Phantom V Fold 2",
          base: 32000,
        },
        {
          name: "Tecno Camon 30 Premier",
          base: 13500,
        },
        {
          name: "Tecno Pova 6 Pro",
          base: 7000,
        },
        {
          name: "Tecno Spark 20 Pro+",
          base: 5000,
        },
      ],
      Honor: [
        {
          name: "Honor Magic 6 Pro",
          base: 34000,
        },
        {
          name: "Honor 200 Pro",
          base: 21000,
        },
        {
          name: "Honor 90",
          base: 10500,
        },
        {
          name: "Honor X9b",
          base: 8500,
        },
      ],
      iQOO: [
        {
          name: "iQOO 12",
          base: 26500,
        },
        {
          name: "iQOO 11",
          base: 18000,
        },
        {
          name: "iQOO Neo 9 Pro",
          base: 15500,
        },
        {
          name: "iQOO Z9 5G",
          base: 8500,
        },
      ],
      Asus: [
        {
          name: "Asus ROG Phone 8 Pro",
          base: 42000,
        },
        {
          name: "Asus ROG Phone 7",
          base: 28000,
        },
        {
          name: "Asus Zenfone 10",
          base: 21000,
        },
      ],
      Sony: [
        {
          name: "Sony Xperia 1 V",
          base: 36000,
        },
        {
          name: "Sony Xperia 5 V",
          base: 26000,
        },
        {
          name: "Sony Xperia 10 V",
          base: 11000,
        },
      ],
      LG: [
        {
          name: "LG Wing 5G",
          base: 9000,
        },
        {
          name: "LG Velvet",
          base: 6500,
        },
        {
          name: "LG G8X ThinQ",
          base: 4500,
        },
      ],
      Google: [
        {
          name: "Google Pixel 8 Pro",
          base: 44000,
        },
        {
          name: "Google Pixel 8",
          base: 33000,
        },
        {
          name: "Google Pixel 7 Pro",
          base: 26000,
        },
      ],
    },
  },
  laptop: {
    brands: [
      "Apple",
      "Dell",
      "HP",
      "Lenovo",
      "Asus",
      "Acer",
      "Microsoft",
      "MSI",
      "Alienware",
      "Razer",
      "LG",
      "Samsung",
      "Toshiba",
      "VAIO",
      "Huawei",
      "Honor",
    ],
    models: {
      Apple: [
        {
          name: 'MacBook Pro M3 Max 16"',
          base: 140000,
        },
        {
          name: 'MacBook Pro M3 14"',
          base: 92000,
        },
        {
          name: 'MacBook Pro M1 Pro 16"',
          base: 74000,
        },
        {
          name: 'MacBook Air M3 13"',
          base: 68000,
        },
        {
          name: 'MacBook Air M2 13"',
          base: 59500,
        },
        {
          name: 'MacBook Air M1 13"',
          base: 41000,
        },
      ],
      Dell: [
        {
          name: "Dell XPS 15 (Core i7)",
          base: 58000,
        },
        {
          name: "Dell XPS 13 (Core i7)",
          base: 46000,
        },
        {
          name: "Dell Latitude 7440",
          base: 32000,
        },
        {
          name: "Dell Inspiron 15 (Core i5)",
          base: 28000,
        },
        {
          name: "Dell Vostro 3520",
          base: 18000,
        },
      ],
      HP: [
        {
          name: "HP Spectre x360",
          base: 47000,
        },
        {
          name: "HP Omen 16",
          base: 45000,
        },
        {
          name: "HP Envy 14",
          base: 32000,
        },
        {
          name: "HP Victus 15",
          base: 30000,
        },
        {
          name: "HP Pavilion 15",
          base: 24000,
        },
      ],
      Lenovo: [
        {
          name: "Lenovo ThinkPad X1 Carbon",
          base: 53000,
        },
        {
          name: "Lenovo Legion 5 Pro",
          base: 48000,
        },
        {
          name: "Lenovo Yoga Slim 7 Pro",
          base: 34000,
        },
        {
          name: "Lenovo IdeaPad Gaming 3",
          base: 27000,
        },
        {
          name: "Lenovo IdeaPad Slim 5",
          base: 22000,
        },
      ],
      Asus: [
        {
          name: "Asus ROG Zephyrus G14",
          base: 56000,
        },
        {
          name: "Asus ROG Strix G16",
          base: 52000,
        },
        {
          name: "Asus ZenBook 14 OLED",
          base: 37000,
        },
        {
          name: "Asus TUF Gaming F15",
          base: 30000,
        },
        {
          name: "Asus VivoBook 15",
          base: 18000,
        },
      ],
      Acer: [
        {
          name: "Acer Predator Helios Neo 16",
          base: 50000,
        },
        {
          name: "Acer Nitro V 15",
          base: 30000,
        },
        {
          name: "Acer Swift Go 14",
          base: 28000,
        },
        {
          name: "Acer Aspire 7",
          base: 24000,
        },
        {
          name: "Acer Aspire Lite 15",
          base: 14000,
        },
      ],
      Microsoft: [
        {
          name: "Microsoft Surface Laptop 5",
          base: 48000,
        },
        {
          name: "Microsoft Surface Pro 9",
          base: 45000,
        },
        {
          name: "Microsoft Surface Laptop Go 3",
          base: 30000,
        },
      ],
      MSI: [
        {
          name: "MSI Raider GE78 HX",
          base: 95000,
        },
        {
          name: "MSI Stealth 16 Studio",
          base: 72000,
        },
        {
          name: "MSI Katana 15",
          base: 38000,
        },
        {
          name: "MSI Modern 14",
          base: 16000,
        },
      ],
      Alienware: [
        {
          name: "Alienware m18 R2",
          base: 105000,
        },
        {
          name: "Alienware x16 R2",
          base: 98000,
        },
        {
          name: "Alienware m16 R2",
          base: 71000,
        },
        {
          name: "Alienware x14 R2",
          base: 62000,
        },
      ],
      Razer: [
        {
          name: "Razer Blade 16",
          base: 120000,
        },
        {
          name: "Razer Blade 15",
          base: 85000,
        },
        {
          name: "Razer Blade 14",
          base: 78000,
        },
      ],
      LG: [
        {
          name: "LG gram 17",
          base: 52000,
        },
        {
          name: "LG gram 16 2-in-1",
          base: 46000,
        },
        {
          name: "LG gram 14",
          base: 34000,
        },
      ],
      Samsung: [
        {
          name: "Samsung Galaxy Book4 Pro 360",
          base: 62000,
        },
        {
          name: "Samsung Galaxy Book4 Pro",
          base: 55000,
        },
        {
          name: "Samsung Galaxy Book3 360",
          base: 38000,
        },
        {
          name: "Samsung Galaxy Book4",
          base: 22000,
        },
      ],
      Toshiba: [
        {
          name: "Dynabook Portégé X30L",
          base: 24000,
        },
        {
          name: "Dynabook Satellite Pro C40",
          base: 14000,
        },
        {
          name: "Toshiba Satellite Pro L50",
          base: 8000,
        },
      ],
      VAIO: [
        {
          name: "VAIO SX14",
          base: 42000,
        },
        {
          name: "VAIO FE 14.1",
          base: 18000,
        },
        {
          name: "VAIO E15",
          base: 13000,
        },
      ],
      Huawei: [
        {
          name: "Huawei MateBook X Pro",
          base: 60000,
        },
        {
          name: "Huawei MateBook 14",
          base: 32000,
        },
        {
          name: "Huawei MateBook D 16",
          base: 24000,
        },
      ],
      Honor: [
        {
          name: "Honor MagicBook Pro 16",
          base: 42000,
        },
        {
          name: "Honor MagicBook X16",
          base: 21000,
        },
        {
          name: "Honor MagicBook 15",
          base: 18000,
        },
      ],
    },
  },
  tablet: {
    brands: [
      "Apple",
      "Samsung",
      "Lenovo",
      "Xiaomi",
      "OnePlus",
      "Realme",
      "Oppo",
      "Vivo",
      "Honor",
      "Huawei",
      "Microsoft",
      "Nokia",
      "Amazon",
    ],
    models: {
      Apple: [
        {
          name: 'iPad Pro 13" M4',
          base: 65000,
        },
        {
          name: 'iPad Pro 12.9" M2',
          base: 64000,
        },
        {
          name: 'iPad Pro 11" M2',
          base: 48000,
        },
        {
          name: "iPad Air M2 (6th Gen)",
          base: 40000,
        },
        {
          name: "iPad Air M1 (5th Gen)",
          base: 33000,
        },
        {
          name: "iPad Mini 6",
          base: 28000,
        },
        {
          name: "iPad 10th Gen",
          base: 24000,
        },
        {
          name: "iPad 9th Gen",
          base: 15000,
        },
      ],
      Samsung: [
        {
          name: "Galaxy Tab S9 Ultra",
          base: 52000,
        },
        {
          name: "Galaxy Tab S9+",
          base: 42000,
        },
        {
          name: "Galaxy Tab S9",
          base: 36000,
        },
        {
          name: "Galaxy Tab S9 FE",
          base: 24500,
        },
        {
          name: "Galaxy Tab A9+",
          base: 9500,
        },
      ],
      Lenovo: [
        {
          name: "Lenovo Tab P12 Pro",
          base: 21000,
        },
        {
          name: "Lenovo Tab P12",
          base: 14000,
        },
        {
          name: "Lenovo Tab M11",
          base: 8000,
        },
        {
          name: "Lenovo Tab M10 (3rd Gen)",
          base: 5500,
        },
      ],
      Xiaomi: [
        {
          name: "Xiaomi Pad 6",
          base: 15000,
        },
        {
          name: "Xiaomi Pad 5",
          base: 11000,
        },
        {
          name: "Redmi Pad Pro",
          base: 12000,
        },
        {
          name: "Redmi Pad SE",
          base: 6500,
        },
      ],
      OnePlus: [
        {
          name: "OnePlus Pad 2",
          base: 25000,
        },
        {
          name: "OnePlus Pad",
          base: 18000,
        },
        {
          name: "OnePlus Pad Go",
          base: 9500,
        },
      ],
      Realme: [
        {
          name: "Realme Pad 2",
          base: 8500,
        },
        {
          name: "Realme Pad X",
          base: 8000,
        },
        {
          name: "Realme Pad Mini",
          base: 4000,
        },
      ],
      Oppo: [
        {
          name: "Oppo Pad 2",
          base: 22000,
        },
        {
          name: "Oppo Pad Air",
          base: 7500,
        },
        {
          name: "Oppo Pad Neo",
          base: 9000,
        },
      ],
      Vivo: [
        {
          name: "Vivo Pad 3 Pro",
          base: 26000,
        },
        {
          name: "Vivo Pad 2",
          base: 17000,
        },
        {
          name: "Vivo Pad Air",
          base: 13000,
        },
      ],
      Honor: [
        {
          name: "Honor Pad 9",
          base: 12000,
        },
        {
          name: "Honor Pad X9",
          base: 7000,
        },
        {
          name: "Honor Pad X8",
          base: 4500,
        },
      ],
      Huawei: [
        {
          name: "Huawei MatePad Pro 13.2",
          base: 38000,
        },
        {
          name: "Huawei MatePad 11.5",
          base: 14000,
        },
        {
          name: "Huawei MatePad SE",
          base: 6500,
        },
      ],
      Microsoft: [
        {
          name: "Surface Pro 10",
          base: 62000,
        },
        {
          name: "Surface Pro 9",
          base: 45000,
        },
        {
          name: "Surface Go 4",
          base: 22000,
        },
        {
          name: "Surface Go 3",
          base: 15000,
        },
      ],
      Nokia: [
        {
          name: "Nokia T21",
          base: 6500,
        },
        {
          name: "Nokia T20",
          base: 5000,
        },
        {
          name: "Nokia T10",
          base: 3000,
        },
      ],
      Amazon: [
        {
          name: "Amazon Fire Max 11",
          base: 9000,
        },
        {
          name: "Amazon Fire HD 10 (13th Gen)",
          base: 6000,
        },
        {
          name: "Amazon Fire HD 8",
          base: 3500,
        },
        {
          name: "Amazon Fire 7",
          base: 2000,
        },
      ],
    },
  },
  smartwatch: {
    brands: [
      "Apple",
      "Samsung",
      "OnePlus",
      "Xiaomi",
      "Redmi",
      "Huawei",
      "FireBoltt",
      "Fastrack",
      "Titan",
      "Google",
      "Fitbit",
      "Garmin",
      "Amazfit",
      "boAt",
      "Noise",
    ],
    models: {
      Apple: [
        {
          name: "Apple Watch Ultra 2",
          base: 44000,
        },
        {
          name: "Apple Watch Series 10",
          base: 30000,
        },
        {
          name: "Apple Watch Series 9",
          base: 25000,
        },
        {
          name: "Apple Watch Series 8",
          base: 19000,
        },
        {
          name: "Apple Watch SE 2nd Gen",
          base: 14500,
        },
      ],
      Samsung: [
        {
          name: "Galaxy Watch Ultra",
          base: 30000,
        },
        {
          name: "Galaxy Watch 7",
          base: 17000,
        },
        {
          name: "Galaxy Watch 6 Classic",
          base: 16500,
        },
        {
          name: "Galaxy Watch 5 Pro",
          base: 13000,
        },
        {
          name: "Galaxy Watch FE",
          base: 9000,
        },
      ],
      OnePlus: [
        {
          name: "OnePlus Watch 2",
          base: 13500,
        },
        {
          name: "OnePlus Watch 2R",
          base: 9500,
        },
        {
          name: "OnePlus Nord Watch",
          base: 2000,
        },
      ],
      Xiaomi: [
        {
          name: "Xiaomi Watch S3",
          base: 7000,
        },
        {
          name: "Xiaomi Watch 2 Pro",
          base: 9000,
        },
        {
          name: "Xiaomi Smart Band 9",
          base: 2000,
        },
      ],
      Redmi: [
        {
          name: "Redmi Watch 5 Active",
          base: 1500,
        },
        {
          name: "Redmi Watch 3 Active",
          base: 1200,
        },
        {
          name: "Redmi Smart Band 2",
          base: 800,
        },
      ],
      Huawei: [
        {
          name: "Huawei Watch GT 4",
          base: 9500,
        },
        {
          name: "Huawei Watch Fit 3",
          base: 5000,
        },
        {
          name: "Huawei Band 9",
          base: 1800,
        },
      ],
      FireBoltt: [
        {
          name: "Fire-Boltt Invincible Plus",
          base: 1500,
        },
        {
          name: "Fire-Boltt Phoenix Ultra",
          base: 1000,
        },
        {
          name: "Fire-Boltt Ninja Call Pro Plus",
          base: 600,
        },
      ],
      Fastrack: [
        {
          name: "Fastrack Limitless FS1 Pro",
          base: 1200,
        },
        {
          name: "Fastrack Optimus Pro",
          base: 900,
        },
        {
          name: "Fastrack Revoltt FS1",
          base: 600,
        },
      ],
      Titan: [
        {
          name: "Titan Celestor",
          base: 3500,
        },
        {
          name: "Titan Crest",
          base: 3000,
        },
        {
          name: "Titan Talk S",
          base: 2000,
        },
      ],
      Google: [
        {
          name: "Google Pixel Watch 3",
          base: 22000,
        },
        {
          name: "Google Pixel Watch 2",
          base: 14000,
        },
        {
          name: "Google Pixel Watch",
          base: 9000,
        },
      ],
      Fitbit: [
        {
          name: "Fitbit Sense 2",
          base: 8500,
        },
        {
          name: "Fitbit Versa 4",
          base: 7000,
        },
        {
          name: "Fitbit Charge 6",
          base: 5000,
        },
        {
          name: "Fitbit Inspire 3",
          base: 2500,
        },
      ],
      Garmin: [
        {
          name: "Garmin Fenix 7 Solar",
          base: 36000,
        },
        {
          name: "Garmin Epix Pro (Gen 2)",
          base: 40000,
        },
        {
          name: "Garmin Forerunner 965",
          base: 28000,
        },
        {
          name: "Garmin Venu 3",
          base: 22000,
        },
        {
          name: "Garmin Forerunner 265",
          base: 20000,
        },
      ],
      Amazfit: [
        {
          name: "Amazfit T-Rex 3",
          base: 8500,
        },
        {
          name: "Amazfit Balance",
          base: 7500,
        },
        {
          name: "Amazfit GTR 4",
          base: 5500,
        },
        {
          name: "Amazfit Bip 5",
          base: 2500,
        },
      ],
      boAt: [
        {
          name: "boAt Lunar Discovery",
          base: 1200,
        },
        {
          name: "boAt Wave Sigma 3",
          base: 700,
        },
        {
          name: "boAt Storm Call 3",
          base: 600,
        },
      ],
      Noise: [
        {
          name: "NoiseFit Halo 2",
          base: 1800,
        },
        {
          name: "Noise ColorFit Pro 5",
          base: 1300,
        },
        {
          name: "Noise ColorFit Icon 4",
          base: 800,
        },
      ],
    },
  },
  earbuds: {
    brands: [
      "Apple",
      "Samsung",
      "Sony",
      "OnePlus",
      "JBL",
      "Bose",
      "Sennheiser",
      "Nothing",
      "CMF",
      "Xiaomi",
      "Redmi",
      "Realme",
      "Oppo",
      "Vivo",
      "Soundcore",
      "Skullcandy",
      "FireBoltt",
      "Noise",
      "boAt",
    ],
    models: {
      Apple: [
        {
          name: "AirPods Max",
          base: 26000,
        },
        {
          name: "AirPods Pro 2nd Gen (USB-C)",
          base: 14200,
        },
        {
          name: "AirPods 4 (ANC)",
          base: 9500,
        },
        {
          name: "AirPods 3rd Gen",
          base: 8500,
        },
        {
          name: "AirPods 2nd Gen",
          base: 4500,
        },
      ],
      Samsung: [
        {
          name: "Galaxy Buds 3 Pro",
          base: 11000,
        },
        {
          name: "Galaxy Buds 2 Pro",
          base: 7800,
        },
        {
          name: "Galaxy Buds FE",
          base: 3800,
        },
      ],
      Sony: [
        {
          name: "Sony WH-1000XM5 Headphones",
          base: 18000,
        },
        {
          name: "Sony WF-1000XM5",
          base: 12500,
        },
        {
          name: "Sony WF-1000XM4",
          base: 8000,
        },
        {
          name: "Sony WF-C700N",
          base: 3500,
        },
      ],
      OnePlus: [
        {
          name: "OnePlus Buds Pro 3",
          base: 6500,
        },
        {
          name: "OnePlus Buds Pro 2",
          base: 4800,
        },
        {
          name: "OnePlus Nord Buds 3 Pro",
          base: 1600,
        },
      ],
      JBL: [
        {
          name: "JBL Tour One M2 Headphones",
          base: 11000,
        },
        {
          name: "JBL Tour Pro 2",
          base: 9000,
        },
        {
          name: "JBL Live Pro 2",
          base: 4500,
        },
        {
          name: "JBL Wave Beam",
          base: 1500,
        },
      ],
      Bose: [
        {
          name: "Bose QuietComfort Ultra Headphones",
          base: 20000,
        },
        {
          name: "Bose QuietComfort Ultra Earbuds",
          base: 15000,
        },
        {
          name: "Bose QuietComfort Earbuds II",
          base: 11000,
        },
      ],
      Sennheiser: [
        {
          name: "Sennheiser Momentum 4 Wireless",
          base: 15000,
        },
        {
          name: "Sennheiser Momentum True Wireless 4",
          base: 13000,
        },
        {
          name: "Sennheiser Accentum Plus",
          base: 6000,
        },
      ],
      Nothing: [
        {
          name: "Nothing Ear",
          base: 5500,
        },
        {
          name: "Nothing Ear (2)",
          base: 4500,
        },
        {
          name: "Nothing Ear (a)",
          base: 3500,
        },
      ],
      CMF: [
        {
          name: "CMF Buds Pro 2",
          base: 2000,
        },
        {
          name: "CMF Buds",
          base: 1100,
        },
        {
          name: "CMF Neckband Pro",
          base: 700,
        },
      ],
      Xiaomi: [
        {
          name: "Xiaomi Buds 5 Pro",
          base: 6000,
        },
        {
          name: "Xiaomi Buds 4 Pro",
          base: 4000,
        },
      ],
      Redmi: [
        {
          name: "Redmi Buds 6 Pro",
          base: 2400,
        },
        {
          name: "Redmi Buds 5 Pro",
          base: 2000,
        },
        {
          name: "Redmi Buds 5",
          base: 1200,
        },
      ],
      Realme: [
        {
          name: "Realme Buds Air 6 Pro",
          base: 2200,
        },
        {
          name: "Realme Buds Air 6",
          base: 1500,
        },
        {
          name: "Realme Buds T300",
          base: 900,
        },
      ],
      Oppo: [
        {
          name: "Oppo Enco X2",
          base: 4000,
        },
        {
          name: "Oppo Enco Air 4 Pro",
          base: 1700,
        },
        {
          name: "Oppo Enco Buds 2",
          base: 700,
        },
      ],
      Vivo: [
        {
          name: "Vivo TWS 3 Pro",
          base: 2500,
        },
        {
          name: "Vivo TWS Air 2",
          base: 1000,
        },
      ],
      Soundcore: [
        {
          name: "Soundcore Liberty 4 Pro",
          base: 5000,
        },
        {
          name: "Soundcore Space Q45 Headphones",
          base: 3800,
        },
        {
          name: "Soundcore Life P3",
          base: 1800,
        },
        {
          name: "Soundcore R50i",
          base: 600,
        },
      ],
      Skullcandy: [
        {
          name: "Skullcandy Crusher ANC 2",
          base: 7000,
        },
        {
          name: "Skullcandy Rail ANC",
          base: 3000,
        },
        {
          name: "Skullcandy Dime 3",
          base: 900,
        },
      ],
      FireBoltt: [
        {
          name: "Fire-Boltt Fire Pods Atlas",
          base: 600,
        },
        {
          name: "Fire-Boltt Fire Pods Ninja 601",
          base: 400,
        },
      ],
      Noise: [
        {
          name: "Noise Master Buds",
          base: 2500,
        },
        {
          name: "Noise Two Wireless Headphones",
          base: 700,
        },
        {
          name: "Noise Buds N1 Pro",
          base: 600,
        },
      ],
      boAt: [
        {
          name: "boAt Nirvana Ion ANC",
          base: 1000,
        },
        {
          name: "boAt Rockerz 550 Headphones",
          base: 600,
        },
        {
          name: "boAt Airdopes 141",
          base: 450,
        },
      ],
    },
  },
  console: {
    brands: [
      "PlayStation",
      "Xbox",
      "Nintendo",
      "SteamDeck",
      "ROGAlly",
      "LegionGo",
      "MSIClaw",
      "Atari",
      "Sega",
    ],
    models: {
      PlayStation: [
        {
          name: "PlayStation 5 Pro",
          base: 38000,
        },
        {
          name: "PlayStation 5 Disc Edition",
          base: 34500,
        },
        {
          name: "PlayStation 5 Slim Disc",
          base: 33000,
        },
        {
          name: "PlayStation 5 Digital",
          base: 29000,
        },
        {
          name: "PlayStation 4 Pro 1TB",
          base: 16000,
        },
        {
          name: "PlayStation 4 Slim 500GB",
          base: 11000,
        },
        {
          name: "PlayStation Portal",
          base: 12000,
        },
      ],
      Xbox: [
        {
          name: "Xbox Series X 1TB",
          base: 32000,
        },
        {
          name: "Xbox Series X Digital",
          base: 29000,
        },
        {
          name: "Xbox Series S 1TB",
          base: 21000,
        },
        {
          name: "Xbox Series S",
          base: 17500,
        },
        {
          name: "Xbox One X 1TB",
          base: 11000,
        },
      ],
      Nintendo: [
        {
          name: "Nintendo Switch OLED",
          base: 19500,
        },
        {
          name: "Nintendo Switch V2",
          base: 13500,
        },
        {
          name: "Nintendo Switch Lite",
          base: 9500,
        },
      ],
      SteamDeck: [
        {
          name: "Steam Deck OLED 1TB",
          base: 36000,
        },
        {
          name: "Steam Deck OLED 512GB",
          base: 31000,
        },
        {
          name: "Steam Deck LCD 512GB",
          base: 24000,
        },
        {
          name: "Steam Deck LCD 256GB",
          base: 20000,
        },
      ],
      ROGAlly: [
        {
          name: "ASUS ROG Ally X",
          base: 36000,
        },
        {
          name: "ASUS ROG Ally Z1 Extreme",
          base: 30000,
        },
        {
          name: "ASUS ROG Ally Z1",
          base: 22000,
        },
      ],
      LegionGo: [
        {
          name: "Lenovo Legion Go 1TB",
          base: 35000,
        },
        {
          name: "Lenovo Legion Go 512GB",
          base: 31000,
        },
      ],
      MSIClaw: [
        {
          name: "MSI Claw 8 AI+",
          base: 37000,
        },
        {
          name: "MSI Claw A1M Ultra 7",
          base: 30000,
        },
        {
          name: "MSI Claw A1M Ultra 5",
          base: 24000,
        },
      ],
      Atari: [
        {
          name: "Atari VCS 800",
          base: 9000,
        },
        {
          name: "Atari 2600+",
          base: 6000,
        },
      ],
      Sega: [
        {
          name: "Sega Genesis Mini 2",
          base: 4500,
        },
        {
          name: "Sega Mega Drive Mini",
          base: 3500,
        },
        {
          name: "Sega Game Gear Micro",
          base: 2500,
        },
      ],
    },
  },
  camera: {
    brands: [
      "Canon",
      "Sony",
      "Nikon",
      "Fujifilm",
      "Panasonic",
      "GoPro",
      "OMSystem",
      "Leica",
      "Hasselblad",
      "DJI",
      "Kodak",
      "Insta360",
      "Polaroid",
      "Blackmagic",
    ],
    models: {
      Canon: [
        {
          name: "Canon EOS R5",
          base: 135000,
        },
        {
          name: "Canon EOS R6 Mark II",
          base: 88000,
        },
        {
          name: "Canon EOS R8",
          base: 62000,
        },
        {
          name: "Canon EOS R10",
          base: 41000,
        },
        {
          name: "Canon EOS 90D",
          base: 38000,
        },
        {
          name: "Canon EOS 200D II",
          base: 24000,
        },
      ],
      Sony: [
        {
          name: "Sony Alpha A7R V (Body)",
          base: 175000,
        },
        {
          name: "Sony Alpha A7 IV (Body)",
          base: 82000,
        },
        {
          name: "Sony ZV-E10 II",
          base: 42000,
        },
        {
          name: "Sony A6400 Mirrorless",
          base: 36000,
        },
        {
          name: "Sony ZV-1 II",
          base: 32000,
        },
      ],
      Nikon: [
        {
          name: "Nikon Z8",
          base: 165000,
        },
        {
          name: "Nikon Z6 III",
          base: 110000,
        },
        {
          name: "Nikon Zf",
          base: 82000,
        },
        {
          name: "Nikon Z50 II",
          base: 45000,
        },
        {
          name: "Nikon D7500",
          base: 32000,
        },
      ],
      Fujifilm: [
        {
          name: "Fujifilm X-H2S",
          base: 120000,
        },
        {
          name: "Fujifilm X100VI",
          base: 95000,
        },
        {
          name: "Fujifilm X-T5 Mirrorless",
          base: 72000,
        },
        {
          name: "Fujifilm X-S20",
          base: 58000,
        },
        {
          name: "Fujifilm Instax Mini 12",
          base: 3000,
        },
      ],
      Panasonic: [
        {
          name: "Panasonic Lumix S5 II",
          base: 85000,
        },
        {
          name: "Panasonic Lumix GH6",
          base: 80000,
        },
        {
          name: "Panasonic Lumix G9 II",
          base: 72000,
        },
        {
          name: "Panasonic Lumix G85",
          base: 30000,
        },
      ],
      GoPro: [
        {
          name: "GoPro Hero 13 Black",
          base: 28000,
        },
        {
          name: "GoPro Hero 12 Black",
          base: 22000,
        },
        {
          name: "GoPro Hero 11 Black",
          base: 17000,
        },
        {
          name: "GoPro Max 360",
          base: 16000,
        },
      ],
      OMSystem: [
        {
          name: "OM System OM-1 Mark II",
          base: 110000,
        },
        {
          name: "OM System OM-5",
          base: 62000,
        },
        {
          name: "Olympus OM-D E-M10 Mark IV",
          base: 32000,
        },
      ],
      Leica: [
        {
          name: "Leica M11",
          base: 480000,
        },
        {
          name: "Leica Q3",
          base: 360000,
        },
        {
          name: "Leica SL2-S",
          base: 230000,
        },
        {
          name: "Leica D-Lux 8",
          base: 85000,
        },
      ],
      Hasselblad: [
        {
          name: "Hasselblad X2D 100C",
          base: 520000,
        },
        {
          name: "Hasselblad 907X & CFV 100C",
          base: 450000,
        },
        {
          name: "Hasselblad X1D II 50C",
          base: 240000,
        },
      ],
      DJI: [
        {
          name: "DJI Ronin 4D",
          base: 330000,
        },
        {
          name: "DJI Osmo Pocket 3",
          base: 34000,
        },
        {
          name: "DJI Osmo Action 5 Pro",
          base: 26000,
        },
        {
          name: "DJI Osmo 360",
          base: 30000,
        },
      ],
      Kodak: [
        {
          name: "Kodak PixPro AZ528",
          base: 12000,
        },
        {
          name: "Kodak PixPro FZ55",
          base: 4500,
        },
        {
          name: "Kodak Smile+ Instant",
          base: 3500,
        },
      ],
      Insta360: [
        {
          name: "Insta360 X4",
          base: 32000,
        },
        {
          name: "Insta360 Ace Pro 2",
          base: 28000,
        },
        {
          name: "Insta360 X3",
          base: 22000,
        },
        {
          name: "Insta360 GO 3S",
          base: 17000,
        },
      ],
      Polaroid: [
        {
          name: "Polaroid I-2",
          base: 28000,
        },
        {
          name: "Polaroid Now+ Gen 2",
          base: 7000,
        },
        {
          name: "Polaroid Go Gen 2",
          base: 4500,
        },
      ],
      Blackmagic: [
        {
          name: "Blackmagic Pocket Cinema Camera 6K Pro",
          base: 105000,
        },
        {
          name: "Blackmagic Cinema Camera 6K",
          base: 95000,
        },
        {
          name: "Blackmagic Pocket Cinema Camera 4K",
          base: 55000,
        },
      ],
    },
  },
};

export const SELL_CATEGORIES = [
  {
    key: "phone",
    short: "Phone",
    tile: "Sell Phone",
    label: "Phones",
    upTo: "₹92,000",
    image: phoneImg,
    icon: "fa-mobile-screen",
  },
  {
    key: "laptop",
    short: "Laptop",
    tile: "Sell Laptop",
    label: "Laptops",
    upTo: "₹1,40,000",
    image: laptopImg,
    icon: "fa-laptop",
  },
  {
    key: "tablet",
    short: "Tablet",
    tile: "Sell Tablet",
    label: "Tablets",
    upTo: "₹65,000",
    image: tabletImg,
    icon: "fa-tablet-screen-button",
  },
  {
    key: "smartwatch",
    short: "Smartwatch",
    tile: "Smartwatch",
    label: "Smartwatches",
    upTo: "₹45,000",
    image: smartwatchImg,
    icon: "fa-clock",
  },
  {
    key: "earbuds",
    short: "Earbuds",
    tile: "Earbuds",
    label: "Earbuds & Audio",
    upTo: "₹18,000",
    image: earbudsImg,
    icon: "fa-headphones",
  },
  {
    key: "console",
    short: "Console",
    tile: "Consoles",
    label: "Gaming Consoles",
    upTo: "₹38,000",
    image: consoleImg,
    icon: "fa-gamepad",
  },
  {
    key: "camera",
    short: "Camera",
    tile: "Cameras",
    label: "Cameras",
    upTo: "₹85,000",
    image: cameraImg,
    icon: "fa-camera",
  },
];

export const sellCategory = (A) => SELL_CATEGORIES.find((e) => e.key === A);

export const VARIANT_OPTIONS = {
  phone: {
    storage: {
      opts: ["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"],
      def: 1,
      step: 0.06,
    },
    ram: {
      opts: ["4 GB", "6 GB", "8 GB", "12 GB", "16 GB"],
      def: 2,
      step: 0.04,
    },
  },
  tablet: {
    storage: {
      opts: ["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"],
      def: 1,
      step: 0.06,
    },
    ram: {
      opts: ["4 GB", "6 GB", "8 GB", "12 GB", "16 GB"],
      def: 2,
      step: 0.04,
    },
  },
  laptop: {
    storage: {
      opts: ["256 GB SSD", "512 GB SSD", "1 TB SSD", "2 TB SSD"],
      def: 1,
      step: 0.07,
    },
    ram: {
      opts: ["8 GB", "16 GB", "32 GB", "64 GB"],
      def: 1,
      step: 0.08,
    },
  },
  smartwatch: {
    storage: {
      opts: ["16 GB", "32 GB", "64 GB"],
      def: 1,
      step: 0.04,
    },
    ram: null,
  },
  console: {
    storage: {
      opts: ["512 GB", "825 GB", "1 TB", "2 TB"],
      def: 2,
      step: 0.05,
    },
    ram: null,
  },
  earbuds: {
    storage: null,
    ram: null,
  },
  camera: {
    storage: null,
    ram: null,
  },
};

export const CONDITIONS = [
  {
    value: "flawless",
    title: "Flawless ✨",
    hint: "Like new, zero scratches",
    label: "Flawless condition",
    multiplier: 1,
  },
  {
    value: "good",
    title: "Good 👍",
    hint: "Minor normal signs of use",
    label: "Good condition",
    multiplier: 0.88,
  },
  {
    value: "average",
    title: "Average ⚡",
    hint: "Dent or scuffs on body",
    label: "Average condition",
    multiplier: 0.72,
  },
];

export const ACCESSORY_BONUSES = [
  {
    key: "box",
    label: "Original Box",
    bonus: 400,
  },
  {
    key: "charger",
    label: "OEM Charger",
    bonus: 600,
  },
  {
    key: "bill",
    label: "Valid Bill",
    bonus: 500,
  },
];

export const QUOTE_BONUS = 1000;

export function findModel(A, quickModel, t) {
  const r = String(quickModel || "").toLowerCase();
  const a = Object.keys(SELL_CATALOG).sort((n, i) => (i === t) - (n === t));
  for (const n of [true, false]) {
    for (const i of a) {
      const f = SELL_CATALOG[i].models[A] || [];
      const index = f.findIndex((x) => {
        if (n) {
          return x.name.toLowerCase() === r;
        }
        return x.name.toLowerCase().includes(r);
      });
      if (index >= 0) {
        return {
          category: i,
          brand: A,
          index,
          model: f[index],
        };
      }
    }
  }
  return null;
}

export function searchModels(A) {
  const e = A.toLowerCase().trim();
  const t = [];
  for (const r of Object.values(SELL_CATALOG)) {
    for (const [a, n] of Object.entries(r.models)) {
      for (const i of n) {
        if (i.name.toLowerCase().includes(e)) {
          t.push({
            brand: a,
            name: i.name,
            price: i.base + QUOTE_BONUS,
          });
        }
      }
    }
  }
  return t;
}
