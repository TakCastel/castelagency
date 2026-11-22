/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "0",
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "100%",
        "2xl": "100%"
      }
    },
    extend: {
      fontSize: {
        "titre-gros": ["var(--text-titre-gros)", { lineHeight: "var(--text-titre-gros-leading)" }],
        "titre-moyen": ["var(--text-titre-moyen)", { lineHeight: "var(--text-titre-moyen-leading)" }],
        "titre-petit": ["var(--text-titre-petit)", { lineHeight: "var(--text-titre-petit-leading)" }],
        paragraphe: ["var(--text-paragraphe)", { lineHeight: "var(--text-paragraphe-leading)" }],
        small: ["var(--text-small)", { lineHeight: "var(--text-small-leading)" }]
      },
      fontFamily: {
        display: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        brand: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 30px 60px rgba(0,0,0,0.45)"
      },
      borderRadius: {
        card: "30px",
        chip: "16px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      colors: {
        castel: {
          red: "#FF2B2B",
          "red-deep": "#D61F1F",
          ink: "#09090B",
          surface: "#16161A",
          paper: "#FFFFFF",
          "paper-warm": "#F6F4F0"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: []
};

