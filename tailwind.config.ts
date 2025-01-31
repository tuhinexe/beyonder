import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#17153B",
        primary: "#4B70F5",
      },
      fontFamily: {
        primary: "var(--font-poppins)",
        cursive: "var(--font-cursive)",
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
