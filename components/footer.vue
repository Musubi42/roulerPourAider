<template>
  <footer class="relative bottom-0 w-full text-sm font-normal text-secondary mt-20">
    <div class="mx-6 md:mx-32">
      <div class="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-10">
        <div class="flex flex-col md:flex-row items-center w-full gap-4">
          <NuxtLink to="/" class="block w-1/3">
            <img src="/images/logoBig_roulerPourAider.png" alt="Rouler pour aider" class="w-32 h-32"
              width="128" height="128" loading="lazy" decoding="async" />
          </NuxtLink>
          <div class="md:max-w-[40vw] mt-12 flex flex-col items-center md:items-start">
            <p class="text-xl font-bold text-secondary mb-3">L'aventure continue&hellip;</p>
            <p class="text-center md:text-left mx-6 md:mx-0 leading-relaxed">
              Merci du fond du c&oelig;ur à tous ceux qui ont rendu cette aventure possible.
              Ensemble, nous avons pédalé pour les enfants de l'Hôpital Necker et leurs familles.
              Chaque kilomètre a compté, chaque don a fait la différence.
            </p>
          </div>
        </div>
        <!-- Reseaux sociaux -->
        <div class="mt-8">
          <h2 class="mb-2 text-center md:text-left">Nous suivre</h2>
          <div class="flex flex-row text-xl">
            <NuxtLink to="https://www.linkedin.com/company/rouler-pour-aider" class="mr-4" target="_blank" aria-label="Rouler pour aider sur LinkedIn">
              <IconsLinkedin />
            </NuxtLink>
            <NuxtLink to="https://www.facebook.com/roulerpouraider" class="mr-4" target="_blank" aria-label="Rouler pour aider sur Facebook">
              <IconsFacebook />
            </NuxtLink>
            <NuxtLink to="https://www.tiktok.com/@roulerpouraider?_t=8kyEoHbGNN3&_r=1" class="mr-4" target="_blank" aria-label="Rouler pour aider sur TikTok">
              <IconsTiktok />
            </NuxtLink>
            <NuxtLink to="https://www.instagram.com/roulerpouraider/" class="mr-4" target="_blank" aria-label="Rouler pour aider sur Instagram">
              <IconsInstagram />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-300 mt-10 py-4">
      <div class="flex justify-center items-center flex-col md:flex-row my-auto gap-4">
        <img class="h-10 w-auto" src="/Grande-cause-nationale-Bouge-chaque-jour.png"
          alt="Label Grande Cause Nationale" loading="lazy" decoding="async">
        <p class="text-center mx-6">Projet labellisé Grande Cause Nationale par le ministère des Sports et des Jeux Olympiques et Paralympiques</p>
      </div>
    </div>

    <div class="border-t border-gray-300 py-6">
      <div class="flex justify-center flex-col md:flex-row my-auto gap-4">
        <div class="flex items-center cursor-default justify-center">
          Rouler pour aider &copy; 2019&ndash;2024
        </div>
        <nav>
          <ul class="list-none flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <li>
              <NuxtLink to="/cookies" class="cursor-pointer hover:text-primary">Cookies</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/mentions-legales" class="cursor-pointer hover:text-primary">Mentions légales</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>
