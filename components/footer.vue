<template>
  <footer class="relative bottom-0 w-screen font-extralight text-sm text-secondary"
    :style="{ 'margin-bottom': isRadioPage ? '80px' : '' }">
    <div class="mx-auto">
      <div class="flex justify-center items-center gap-10">
        <NuxtLink to="/" class="block">
          <img src="/images/logoBig_roulerPourAider.png" alt="logo" class="w-32 h-32" />
        </NuxtLink>
        <!-- CTA -->
        <div class="max-w-[33vw] mt-12">
          <button type="" class=" mb-5">
            <NuxtLink to="/faire-un-don" class="text-white bg-primary py-3 px-5 rounded-xl">
              Faites un don
            </NuxtLink>
          </button>
          <p class="">Un don est un enfant en meilleur santé lorem lorem lorem lorem lorem lorem  lorem lorem lorem lorem  lorem lorem lorem lorem </p>
        </div>
        <!-- Réseaux sociaux -->
        <div class="mt-8">
          <h2 class="mb-2">Nous suivre</h2>
          <div class="flex flex-row text-xl">
            <NuxtLink to="https://www.facebook.com/roulerpouraider" class="mr-4">
              <IconsLinkedin class="" />
            </NuxtLink>
            <NuxtLink to="https://www.facebook.com/roulerpouraider" class="mr-4">
              <IconsFacebook class="" />
            </NuxtLink>
            <NuxtLink to="https://www.facebook.com/roulerpouraider" class="mr-4">
              <IconsTiktok class="" />
            </NuxtLink>
            <NuxtLink to="https://www.facebook.com/roulerpouraider" class="mr-4">
              <IconsInstagram class="" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-300 mt-10 py-6">
      <div class="flex justify-center flex-row my-auto">
        <div class="flex items-center cursor-default">Rouler pour aider © 2024</div>
        <nav class="">
          <ul class="list-none flex">
            <li class="">
              <NuxtLink to="/cookies" class="mt-4 mb-6 cursor-pointer hover:text-primary"
                >Cookies</NuxtLink
              >
            </li>
            <li class="">
              <NuxtLink
                to="/mentions-legales"
                class="mt-4 mb-6 cursor-pointer hover:text-primary"
                >Mentions légales</NuxtLink
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
ul > li::before {
  content: "•";
  margin-left: 1rem;
  margin-right: 0.5rem;
}
</style>

<script setup>

// Ajouter du margin pour voir correctement le footer
const route = useRoute();
const isRadioPage = computed(() => route.path === '/nos-retombees-presse/nos-passages-radio');
</script>
