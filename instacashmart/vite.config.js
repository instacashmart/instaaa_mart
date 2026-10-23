import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Absolute asset paths so deep links like /admin or /sell-phone/apple load correctly.
  base: "/",
});
