// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // Pas d'alias "@" : `resolve(__dirname, "/")` resolvait litteralement vers la
  // RACINE du systeme de fichiers. Nuxt fournit deja `~` et `@` par defaut.
  // Pas de tableau `plugins` : Nuxt auto-charge le dossier plugins/.
  // Les chemins absolus precedents ne resolvaient pas (5 warnings au boot).
  modules: ["nuxt-svgo", "@nuxt/image"],
  // Prerendu : `ssr: true` ne veut pas dire serveur Node. Nitro execute les
  // pages au build et ecrit du HTML statique, servi par le CDN Vercel. C'est
  // la seule facon d'avoir les balises de partage et le contenu dans le HTML
  // livre — les robots d'apercu social n'executent pas de JavaScript.
  ssr: true,
  nitro: {
    prerender: { crawlLinks: true, routes: ["/"] },
  },
  image: {
    provider: 'vercel',
    // `presets.cover` et `staticFilename` ont ete retires : le preset n'etait
    // reference nulle part (0 occurrence de `preset=`), et `staticFilename` ne
    // concerne que le provider `ipxStatic`, pas `vercel`.
  },
  svgo: {
    autoImportPath: "~/assets/svg/",
  },
  components: true,
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});