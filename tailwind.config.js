/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./blocks/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "footer-job": "url('/assets/images/footer-job.png')",
        "footer-tuned": "url('/assets/images/footer-tuned.png')",
        "footer-questions": "url('/assets/images/footer-questions.png')",
        "fond-tableau": "url('/assets/images/BG-tableau.png')",
      },
      colors: {
        primary: "#72BC7A",
        secondary: "#2A5FA4"
      },
      fontFamily: {
        montserrat: ["Montserrat", "Arial", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
    },
  },
  safelist: ["lilas-pop", "rose-neon", "bleu-ciel", "jaune-citron", "w-20"],
  plugins: [],
};
