import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8B5E3C",
          light: "#C49A6C",
          dark: "#5C3A1E",
        },
        accent: {
          DEFAULT: "#E8B4B8",
          warm: "#F5E6D3",
        },
        honey: {
          50: "#FFFDF7",
          100: "#FFF7E4",
          200: "#FDF0CC",
          300: "#FBE49E",
          400: "#F7D16A",
          DEFAULT: "#F0B03C",
          600: "#D99320",
          700: "#B87F1E",
          800: "#8C5815",
          900: "#4A3410",
        },
        amber: {
          DEFAULT: "#B87F1E",
          light: "#F6DFA8",
          dark: "#8A4B26",
        },
        espresso: {
          DEFAULT: "#4A3410",
          dark: "#2A160A",
          deep: "#1A0E06",
        },
        "bg-cream": "#FDF8F3",
        "text-dark": "#4A3410",
        "text-light": "#FFF7E4",
        "text-muted": "#8B765A",
        gold: {
          DEFAULT: "#D4A574",
          bright: "#F0B03C",
          light: "#F6DFA8",
          dark: "#B87F1E",
        },
      },
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "Fraunces", "serif"],
        karla: ["var(--font-karla)", "Karla", "sans-serif"],
        serif: ["var(--font-fraunces)", "var(--font-cormorant)", "Fraunces", "Cormorant Garamond", "serif"],
        sans: ["var(--font-karla)", "var(--font-outfit)", "Karla", "Outfit", "sans-serif"],
      },
      boxShadow: {
        'honey': '0 10px 30px -10px rgba(240, 176, 60, 0.3)',
        'honey-lg': '0 20px 40px -15px rgba(240, 176, 60, 0.4)',
        'glass': '0 8px 32px 0 rgba(74, 52, 16, 0.08)',
        'glass-hover': '0 16px 48px 0 rgba(74, 52, 16, 0.16)',
      },
    },
  },
  plugins: [],
};

export default config;
