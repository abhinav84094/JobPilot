/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        violet: {
          50: "#f5f3ff",
          100: "#ede9fe",
          600: "#7c3aed",
          700: "#6d28d9",
        },
      },

      // --- Design tokens (Phase 1 foundation) ---
      // Two semantic shadow levels replace the previously ad-hoc mix of
      // shadow-lg / shadow-xl used inconsistently across cards vs modals.
      boxShadow: {
        card: "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.06)",
        elevated:
          "0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 6px -2px rgb(0 0 0 / 0.06)",
      },

      // One radius alias, "card", pinned to a single value so every
      // surface using it stays visually consistent. Existing rounded-*
      // utilities are untouched — this is additive.
      borderRadius: {
        card: "0.75rem", // matches rounded-xl
      },

      transitionDuration: {
        base: "180ms",
      },
    },
  },
  plugins: [],
};