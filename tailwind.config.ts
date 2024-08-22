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
        cursive: ['"Cedarville Cursive"', 'cursive'],
        istok: ['"Istok Web"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
