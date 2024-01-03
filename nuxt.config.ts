// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      MAINTENANCE: process.env.MAINTENANCE,
      APIStreamAudioBaseUrl:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3001"
          : "https://stream.lmlc.musubi.dev",
    },
  },
  env: {
    baseUrl:
      process.env.NODE_ENV === "dev"
        ? "http://localhost:3001"
        : "https://stream.lmlc.musubi.dev",
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
  // router: {
  //   middleware: 'maintenance'
  // },
  components: true,
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
