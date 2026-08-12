<template>
  <div class="section-padding">
    <div class="max-w-4xl mx-auto">
      <h1 class="title-victory text-center">Contactez-nous</h1>
      <p class="mt-4 text-center text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
        L'aventure Rouler pour aider est terminée, mais nous restons disponibles pour échanger.
      </p>

      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Association info -->
        <div class="card-victory">
          <h2 class="text-xl font-bold text-secondary mb-6">Association Rouler pour aider</h2>

          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <IconsHome class="flex-shrink-0 mt-1" />
              <p class="text-gray-600">10 rue Jean Jaurès, 60550 Verneuil-en-Halatte</p>
            </div>

            <div class="flex items-start gap-3">
              <IconsEmail class="flex-shrink-0 mt-1" />
              <a href="mailto:roulerpouraider60@gmail.com" class="text-secondary hover:text-primary transition-colors">
                roulerpouraider60@gmail.com
              </a>
            </div>
          </div>
        </div>

        <!-- Social media -->
        <div class="card-victory">
          <h2 class="text-xl font-bold text-secondary mb-6">Nous suivre</h2>
          <p class="text-gray-600 mb-6">Retrouvez-nous sur les réseaux sociaux pour suivre les nouvelles de l'association.</p>

          <div class="flex gap-4">
            <NuxtLink to="https://www.linkedin.com/company/rouler-pour-aider" target="_blank"
              class="text-secondary hover:text-primary transition-colors">
              <IconsLinkedin class="w-8 h-8" />
            </NuxtLink>
            <NuxtLink to="https://www.facebook.com/roulerpouraider" target="_blank"
              class="text-secondary hover:text-primary transition-colors">
              <IconsFacebook class="w-8 h-8" />
            </NuxtLink>
            <NuxtLink to="https://www.instagram.com/roulerpouraider/" target="_blank"
              class="text-secondary hover:text-primary transition-colors">
              <IconsInstagram class="w-8 h-8" />
            </NuxtLink>
            <NuxtLink to="https://www.tiktok.com/@roulerpouraider?_t=8kyEoHbGNN3&_r=1" target="_blank"
              class="text-secondary hover:text-primary transition-colors">
              <IconsTiktok class="w-8 h-8" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "victory",
});

useSeoMeta({
  title: 'Rouler pour aider – Contact',
  ogTitle: 'Rouler pour aider – Contact',
  description: 'Contactez l\'association Rouler pour aider pour toute question sur notre aventure et nos actions pour l\'Hôpital Necker.',
  ogDescription: 'Contactez l\'association Rouler pour aider pour toute question sur notre aventure et nos actions pour l\'Hôpital Necker.',
});
</script>
