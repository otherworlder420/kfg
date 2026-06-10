/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Premium Gold & Charcoal Palette
        gold: {
          50: "#FBF7ED",
          100: "#F5ECD0",
          200: "#EBD9A0",
          300: "#D4B872",
          400: "#C8A45C",
          500: "#B8934A",
          600: "#9A7B3E",
          700: "#7A6232",
          800: "#5C4A26",
          900: "#3D321A",
        },
        dark: {
          50: "#F5F5F5",
          100: "#E0E0E0",
          200: "#C2C2C2",
          300: "#A3A3A3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3D3D3D",
          800: "#292929",
          900: "#141414",
          950: "#0A0A0A",
        },
        cream: {
          DEFAULT: "#FAF8F3",
          50: "#FEFDFB",
          100: "#FAF8F3",
          200: "#F3EFE6",
        },
        // shadcn system colors mapped to premium palette
        border: "hsl(0, 0%, 85%)",
        input: "hsl(0, 0%, 85%)",
        ring: "#C8A45C",
        background: "#FAF8F3",
        foreground: "#141414",
        primary: {
          DEFAULT: "#C8A45C",
          foreground: "#0A0A0A",
        },
        secondary: {
          DEFAULT: "#F3EFE6",
          foreground: "#141414",
        },
        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "#FAF8F3",
        },
        muted: {
          DEFAULT: "#F3EFE6",
          foreground: "#525252",
        },
        accent: {
          DEFAULT: "#F3EFE6",
          foreground: "#141414",
        },
        popover: {
          DEFAULT: "#FAF8F3",
          foreground: "#141414",
        },
        card: {
          DEFAULT: "#FAF8F3",
          foreground: "#141414",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        pill: "9999px",
      },
      maxWidth: {
        container: "1400px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        card: "0 2px 16px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 12px 40px rgba(0, 0, 0, 0.12)",
        header: "0 2px 12px rgba(0, 0, 0, 0.06)",
        gold: "0 4px 20px rgba(200, 164, 92, 0.15)",
      },
      zIndex: {
        nav: "100",
        overlay: "90",
        floating: "50",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "scroll-orb": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "80%": { transform: "translateY(32px)", opacity: "1" },
          "100%": { transform: "translateY(32px)", opacity: "0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "scroll-orb": "scroll-orb 2s ease-in-out infinite",
        "spin-slow": "spin-slow 0.8s linear infinite",
        "float": "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
