import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        surface: {
          DEFAULT: "#0F172A",
          deep: "#020617",
          card: "#1E293B",
        },
        qa: {
          DEFAULT: "#22C55E",
        },
        fullstack: {
          DEFAULT: "#6366F1",
        },
      },
    },
  },
  plugins: [],
};

export default config;
