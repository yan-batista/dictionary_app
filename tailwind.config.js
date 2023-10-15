/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        bg: "hsl( var(--color-bg) / <alpha-value>)",
        accent: {
          1: "hsl( var(--color-accent1) / <alpha-value>)",
          2: "hsl( var(--color-accent2) / <alpha-value>)",
        },
        search_bar: "hsl( var(--color-search_bar) / <alpha-value>)",
        text: {
          normal: "hsl( var(--color-text) / <alpha-value>)",
          gray: "hsl( var(--color-text_gray) / <alpha-value>)",
        },
        divider: "hsl( var(--color-divider) / <alpha-value>)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        lora: ["Lora", "serif"],
        inconsolata: ["Inconsolata", "monospace"],
      },
      boxShadow: {
        themeSelector: "0px 0px 35px 0px hsl(var(--color-shadow))",
      },
    },
  },
  plugins: [],
};
