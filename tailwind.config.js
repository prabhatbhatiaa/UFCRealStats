/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1440px" } },
    extend: {
      colors: {
        background: "#0A0A0C", // Deep graphite from Lovable
        foreground: "#FAFAFA",
        surface: "#121214",
        "surface-2": "#18181B",
        "surface-3": "#27272A",
        primary: {
          DEFAULT: "#EF4444", // UFC Red
          foreground: "#FFFFFF",
        },
        secondary: "#18181B",
        "secondary-foreground": "#FAFAFA",
        border: "#27272A",
        muted: "#A1A1AA",
        info: "#3B82F6",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)",
        "gradient-glow": "radial-gradient(60% 60% at 50% 0%, rgba(239, 68, 68, 0.15) 0%, transparent 70%)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(15px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        }
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }
    },
  },
  plugins: [],
}