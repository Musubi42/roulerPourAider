// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      strapiBaseUrl: "",
      strapiToken: "",
      env: {
        baseUrl: "https://strapi.musubi.dev",  
      },
    },
  },
  alias: {
    "@": resolve(__dirname, "/"),
  },
  modules: ["nuxt-svgo", "@nuxt/image", "@nuxtjs/i18n"],
  i18n: {
    vueI18n: "./i18n.config.js", // if you are using custom path, default
  },
  svgo: {
    autoImportPath: "~/assets/icons/",
  },
  image : {
    autoImportPath: "~/assets/images/"
  },
  router: {
    middleware: ['maintenance']
  },
  plugins: [
    // '/plugins/axios.js',
    // '/plugins/test.js',
  ],
  components: true,
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
