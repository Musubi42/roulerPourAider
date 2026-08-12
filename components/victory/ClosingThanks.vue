<template>
  <!--
    Section de cloture. Extraite de PartnerThanks.vue, ou elle etait rendue a la fois
    sur / et sur /equipe : le meme texte de cloture apparaissait deux fois sur le site.
    Elle n'est desormais utilisee que sur la page d'accueil.
  -->
  <section class="section-padding bg-warm-cream">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="title-victory text-center">L'aventure s'arrête ici</h2>

      <div class="mt-8 max-w-2xl mx-auto space-y-4 text-gray-600 leading-relaxed">
        <p>
          Deux éditions, cinq ans, et une promesse tenue&nbsp;:
          <strong class="text-secondary">103&nbsp;782&nbsp;euros</strong> récoltés pour
          les enfants de l'Hôpital Necker – Enfants malades AP-HP.
        </p>
        <p>
          Rouler pour aider ne repartira pas sur les routes. Mais ce que 605 donateurs
          ont rendu possible reste, chaque jour, entre les murs de l'hôpital.
        </p>
        <p class="text-lg font-bold text-secondary pt-4">
          Merci d'avoir pédalé avec nous.
        </p>
      </div>

      <!-- Soutenir Necker : lien discret, jamais un CTA principal (cf. plan de cloture) -->
      <p class="mt-10 text-sm text-gray-500 max-w-xl mx-auto">
        L'association n'organise plus de collecte. Vous pouvez toujours soutenir
        directement l'Hôpital Necker&nbsp;–&nbsp;Enfants malades via la
        <a
          href="https://www.fondationaphp.fr"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-primary transition-colors"
        >Fondation de l'AP-HP</a>.
      </p>

      <div class="mt-10 flex justify-center gap-6">
        <a
          v-for="reseau in reseaux"
          :key="reseau.nom"
          :href="reseau.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="reseau.nom"
          class="text-secondary hover:text-primary transition-colors"
        >
          <component :is="reseau.icone" class="w-8 h-8" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const reseaux = [
  { nom: 'LinkedIn', url: 'https://www.linkedin.com/company/rouler-pour-aider', icone: resolveComponent('IconsLinkedin') },
  { nom: 'Facebook', url: 'https://www.facebook.com/roulerpouraider', icone: resolveComponent('IconsFacebook') },
  { nom: 'Instagram', url: 'https://www.instagram.com/roulerpouraider/', icone: resolveComponent('IconsInstagram') },
  { nom: 'TikTok', url: 'https://www.tiktok.com/@roulerpouraider', icone: resolveComponent('IconsTiktok') },
];
</script>
