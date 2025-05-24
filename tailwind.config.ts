import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#10172a",
        primary: "#60a5fa",
        secondary: "#818cf8",
        accent: "#22d3ee",
        card: "#1e293b",
        border: "#334155",
      },
    },
  },
  plugins: [],
} satisfies Config;
