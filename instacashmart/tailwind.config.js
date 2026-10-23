import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        brand: colors.emerald,
        // Warm, green-tinted neutrals used across the site.
        slate: {
          ...colors.slate,
          50: "#fafaf7",
          100: "#f3f2ec",
          200: "#e5e3da",
          900: "#173d2a",
        },
        dark: {
          800: "#1d4a33",
          900: "#12301f",
        },
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
    },
  },
  plugins: [],
};
