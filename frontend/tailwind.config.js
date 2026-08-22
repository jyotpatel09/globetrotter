/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand colors
        "primary": "#02241d",
        "secondary": "#974723",
        "deep-forest": "#1A3A32",
        "terracotta": "#C66B44",
        "warm-sand": "#F4EBD0",
        
        // Full palette from design system foundation
        "tertiary-container": "#393422",
        "on-tertiary": "#ffffff",
        "secondary-fixed": "#ffdbce",
        "surface-container-highest": "#e3e2e1",
        "surface-tint": "#45655b",
        "on-secondary-fixed": "#370e00",
        "outline-variant": "#c1c8c4",
        "surface-bright": "#faf9f7",
        "surface-container-low": "#f4f4f2",
        "on-primary": "#ffffff",
        "on-tertiary-fixed-variant": "#4c4733",
        "tertiary-fixed": "#ebe2c8",
        "on-primary-container": "#82a499",
        "background": "#faf9f7",
        "surface-variant": "#e3e2e1",
        "tertiary-fixed-dim": "#cec6ad",
        "secondary-container": "#ff996e",
        "on-tertiary-container": "#a49c85",
        "on-secondary": "#ffffff",
        "primary-container": "#1a3a32",
        "tertiary": "#231f0e",
        "on-primary-fixed-variant": "#2d4d44",
        "inverse-on-surface": "#f1f1ef",
        "on-primary-fixed": "#002019",
        "error": "#ba1a1a",
        "on-error-container": "#93000a",
        "inverse-primary": "#abcec2",
        "surface-container-lowest": "#ffffff",
        "outline": "#717975",
        "primary-fixed": "#c7eade",
        "secondary-fixed-dim": "#ffb598",
        "primary-fixed-dim": "#abcec2",
        "on-secondary-fixed-variant": "#79300e",
        "surface-container-high": "#e8e8e6",
        "on-surface": "#1a1c1b",
        "surface-dim": "#dadad8",
        "on-tertiary-fixed": "#1f1c0b",
        "surface": "#faf9f7",
        "on-surface-variant": "#414846",
        "on-background": "#1a1c1b",
        "surface-container": "#eeeeec",
        "on-error": "#ffffff",
        "inverse-surface": "#2f3130",
        "error-container": "#ffdad6",
        "on-secondary-container": "#772f0c"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "gutter": "24px",
        "margin-desktop": "48px",
        "margin-mobile": "16px",
        "container-max": "1280px",
        "unit": "8px"
      },
      fontFamily: {
        "display-lg": ["Playfair Display", "serif"],
        "headline-lg": ["Playfair Display", "serif"],
        "headline-md": ["Playfair Display", "serif"],
        "headline-sm": ["Playfair Display", "serif"],
        "body-lg": ["Plus Jakarta Sans", "sans-serif"],
        "body-md": ["Plus Jakarta Sans", "sans-serif"],
        "label-md": ["Plus Jakarta Sans", "sans-serif"],
        "label-sm": ["Plus Jakarta Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}
