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
        primary: "#0000ff",
        "lilas-pop": "#974dff",
        "rose-neon": "#ff0066",
        "bleu-ciel": "#99deff",
        "jaune-citron": "#ffff00",
        // J'ai essayé de rendre les couleurs dynamiquement accessible
        // Si à la compilation elles ne sont pas de ls css du html, qu'on puisse quand même sans servir dynamiquement via JS
        // "lilas-pop": "var(--lilas-pop)",
        // "rose-neon": "var(--rose-neon)",
        // "bleu-ciel": "var(--bleu-ciel)",
        // "jaune-citron": "var(--jaune-citron)",
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
