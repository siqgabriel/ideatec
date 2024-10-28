import { url } from "inspector";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        custom: "#7828de",
        customBg: "#49188a",
      },
    },
    fontFamily: {
      sans: ["Source Code Pro", "monospace"],
    },
  },
  plugins: [],
};
export default config;
