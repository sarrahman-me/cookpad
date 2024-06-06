import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Source Serif Pro", "Georgia", "serif"],
        body: ["Synonym", "system-ui", "sans-serif"],
      },
      colors: {
        "primary-50": "#fffbeb",
        "primary-100": "#fef3c7",
        "primary-200": "#fde68a",
        "primary-300": "#fcd34d",
        "primary-400": "#fbbf24",
        "primary-500": "#f59e0b",
        "primary-600": "#d97706",
        "primary-700": "#b45309",
        "primary-800": "#92400e",
        "primary-900": "#78350f",
        "primary-950": "#451a03",
      },
    },
  },
};

export default config;
