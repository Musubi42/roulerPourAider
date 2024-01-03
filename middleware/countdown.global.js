export default defineNuxtRouteMiddleware((to) => {
  // Pour récupérer les .env
  // https://nuxt.com/docs/api/composables/use-runtime-config
  const runtimeConfig = useRuntimeConfig();

  // General informations
  // const $config = useRuntimeConfig();
  // console.log({ $config });
  const isMaintenance = runtimeConfig.public.MAINTENANCE.trim().toLowerCase();

  if (isMaintenance === "true" && to.fullPath !== "/countdown") {
    return navigateTo("/countdown");
  }

  if (isMaintenance === "false" && to.fullPath == "/countdown") {
    return navigateTo("/");
  }
});
