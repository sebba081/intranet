import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "#E2E8F0",
        background: "#F8FAFC",
        foreground: "#0F172A",
        primary: "#16A34A",
        "primary-hover": "#15803D",
        accent: "#DCFCE7"
      }
    }
  },
  plugins: []
};

export default config;
