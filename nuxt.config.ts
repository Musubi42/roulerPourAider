// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      strapiBaseUrl: "",
      strapiToken: "",
      strapiGalleriePutLike: "",
    },
  },
  alias: {
    "@": resolve(__dirname, "/"),
  },
  mail: {
    message: {
      to: 'roulerpouraider60@gmail.com',
    },
    smtp: {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: 'roulerpouraider60@gmail.com',
          pass: 'mcja uwje xwxn lvlq',
        },
      },
  },
  toast: {
      position: 'top-center',
      duration: 5000,
      keepOnHover: true,
  },
  plugins: [
    '/plugins/clarity-plugin.js',
    '/plugins/vue3-toastify.js',
  ],
  modules: ["nuxt-svgo", "@nuxt/image", "@nuxtjs/i18n", "nuxt-mail", "nuxt-swiper", '@unlighthouse/nuxt'],
  site: {
    url: 'https://lmlccommunication.fr',
    trailingSlash: true,
  },
  unlighthouse: {
    scanner: {
      // simulate a desktop device
      device: 'desktop',
    },
  },
  i18n: {
    vueI18n: "./i18n.config.js", // if you are using custom path, default
  },
  svgo: {
    autoImportPath: "~/assets/icons/",
  },
  // router: {
  //   middleware: 'maintenance'
  // },
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
