/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Vert de la charte / du logo : la route, le mouvement
        primary: "#72BC7A",
        // Bleu de la charte : texte, liens, aplats clairs
        secondary: "#2A5FA4",
        // Navy : fonds de heroes uniquement. Assez sombre pour que le blanc
        // (14.6:1) et l'or (6.6:1) passent le AA, contrairement au `secondary`
        // sur lequel le bleu des liens devenait illisible.
        navy: "#12294A",
        // Or : reserve aux chiffres du bilan et au souligne des titres
        gold: "#D4A843",
        "warm-white": "#FEFCF8",
        "warm-cream": "#FFF8F0",
      },
      fontFamily: {
        omnes: ["Omnes", "sans-serif"],
      },
      fontWeight: {
        // hairline (250) et extralight (260) retirees : aucune occurrence dans
        // le projet, et leurs WOFF2 ne sont plus generes. Les laisser
        // permettrait d'ecrire `font-extralight` et d'obtenir un faux-maigre
        // synthetise par le navigateur.
        light: "270",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900",
      },
    },
  },
  plugins: [],
};
