import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#081f31",
        secondary: "#2C394B",
      },
      fontFamily: {
        cursive: ['"Cedarville Cursive"', "cursive"],
        istok: ['"Istok Web"', "sans-serif"],
      },
    },
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      md2: "930px",
      lg: "1024px",
      lg2: "1120px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
export default config;
