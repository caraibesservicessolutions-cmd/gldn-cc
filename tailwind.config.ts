import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#12070D",
        coal: "#1A0D13",
        wine: "#4A192E",
        ruby: "#6A2442",
        gold: "#D1B464",
        champagne: "#E8D59A",
        pearl: "#FAFAF9",
        mist: "#D8D1CA",
        smoke: "#26141D"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 42px rgba(209, 180, 100, 0.16)",
        card: "0 24px 70px rgba(18, 7, 13, 0.42)"
      }
    }
  },
  plugins: []
};

export default config;
