import appleImg from "../assets/brands/apple.png";
import samsungImg from "../assets/brands/samsung.jpg";
import oneplusImg from "../assets/brands/oneplus.png";
import xiaomiImg from "../assets/brands/xiaomi.png";
import dellImg from "../assets/brands/dell.png";
import hpImg from "../assets/brands/hp.png";
import lenovoImg from "../assets/brands/lenovo.png";
import googleLogo from "../assets/logos/google.png";
import asusImg from "../assets/brands/asus.png";
import vivoImg from "../assets/brands/vivo.png";
import oppoImg from "../assets/brands/oppo.png";

const TOP_BRANDS = [
  {
    key: "Apple",
    name: "Apple",
    tagline: "iPhones, Macs, iPads",
    logo: appleImg,
  },
  {
    key: "Samsung",
    name: "Samsung",
    tagline: "Galaxy S, Z Fold, Tab",
    logo: samsungImg,
  },
  {
    key: "OnePlus",
    name: "OnePlus",
    tagline: "Number & Nord Series",
    logo: oneplusImg,
  },
  {
    key: "Xiaomi",
    name: "Xiaomi",
    tagline: "Mi, Redmi, POCO",
    logo: xiaomiImg,
  },
  {
    key: "Dell",
    name: "Dell",
    tagline: "XPS, Inspiron, Alienware",
    logo: dellImg,
  },
  {
    key: "HP",
    name: "HP",
    tagline: "Spectre, Envy, Pavilion",
    logo: hpImg,
  },
  {
    key: "Lenovo",
    name: "Lenovo",
    tagline: "ThinkPad, Legion, Yoga",
    logo: lenovoImg,
  },
  {
    key: "Google",
    name: "Google Pixel",
    tagline: "Pixel 8, 7, Fold",
    logo: googleLogo,
  },
  {
    key: "Sony",
    name: "Sony",
    tagline: "PlayStation, WH Audio",
    icon: "fa-gamepad",
  },
  {
    key: "Asus",
    name: "Asus",
    tagline: "ROG, ZenBook, TUF",
    logo: asusImg,
  },
  {
    key: "Vivo",
    name: "Vivo",
    tagline: "X-Series, V-Series",
    logo: vivoImg,
  },
  {
    key: "Oppo",
    name: "Oppo / Realme",
    tagline: "Find, Reno, GT",
    logo: oppoImg,
  },
];

export const topBrand = (brand) => TOP_BRANDS.find((e) => e.key === brand);
