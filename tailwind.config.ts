import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)", "sans-serif"], // Roboto variable font
        tajawal: ["var(--font-tajawal)", "sans-serif"], // Tajawal font
        cairo: ["var(--font-cairo)", "sans-serif"], // cairo font
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      backgroundImage: {
        // Existing Custom Gradient
        "gradient-custom":
          "linear-gradient(to bottom, #0f172a, #1f2937, #374151, rgba(55, 65, 81, 0))",

        // Gradient 1: Vibrant Sunset
        "gradient-sunset": "linear-gradient(to bottom, #ff7e5f, #feb47b)", // Vibrant orange-pink transition

        // Gradient 2: Cool Ocean
        "gradient-ocean": "linear-gradient(to bottom, #2193b0, #6dd5ed)", // Light blue to teal

        // Gradient 3: Purple Bliss
        "gradient-purple": "linear-gradient(to bottom, #8e2de2, #4a00e0)", // Deep purple to rich blue

        // Gradient 4: Tropical Vibes
        "gradient-tropical": "linear-gradient(to bottom, #00c6ff, #0072ff)", // Bright cyan to royal blue

        // Gradient 5: Golden Hour
        "gradient-golden": "linear-gradient(to bottom, #f2994a, #f2c94c)", // Warm gold and yellow

        // Gradient 6: Forest Hues
        "gradient-forest": "linear-gradient(to bottom, #11998e, #38ef7d)", // Rich green to light green

        // Gradient 7: Modern Gray Fade
        "gradient-gray": "linear-gradient(to bottom, #2c3e50, #bdc3c7)",
        "gradient-blue-official":
          "linear-gradient(to bottom, #0f172a, #1e40af, #2563eb)", // Navy blue to royal blue

        // Gradient 2: Subtle Sky Blue
        "gradient-blue-sky":
          "linear-gradient(to bottom, #2563eb, #60a5fa, #93c5fd)", // Royal blue to soft sky blue

        // Gradient 3: Elegant Blue Fade
        "gradient-blue-fade":
          "linear-gradient(to bottom, #1e3a8a, #3b82f6, rgba(59, 130, 246, 0))", // Dark blue to fade-out

        // Gradient 4: Deep Ocean
        "gradient-blue-ocean":
          "linear-gradient(to bottom, #0f172a, #1e3a8a, #2563eb, #60a5fa)", // Navy blue to light blue

        // Gradient 5: Corporate Cool
        "gradient-blue-corporate":
          "linear-gradient(to bottom, #1e40af, #3b82f6)", // Dark gray to light gray
        "gradient-blue-light": "linear-gradient(to bottom, #e0f2fe, #90cdf4)", // Light pastel blue gradient
        "gradient-blue-modern": "linear-gradient(to bottom, #cfe8ff, #3b82f6)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwindcss-rtl")],
} satisfies Config;
