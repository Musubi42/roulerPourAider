<template>
  <div>
    <VictoryPageHero
      eyebrow="2019 – 2024"
      titre="Notre aventure"
      sous-titre="Deux éditions, cinq ans, 4 327 kilomètres à vélo, 103 847 € remis à l'Hôpital Necker."
      image="/1ere-edition/depart-lille.webp"
      image-alt="Le départ de la première édition depuis Lille, en 2020"
      cadrage="50% 40%"
    />

    <!-- Le récit en six actes, tenu par le rail : la route de la carte
         d'accueil, redressée à la verticale. -->
    <VictoryRouteStory class="py-16 md:py-24" />

    <!-- Clôture -->
    <section class="section-padding bg-warm-cream">
      <div class="max-w-3xl mx-auto text-center">
        <!-- Pas de mot signé des fondateurs : décision du 15/09/2026. -->
        <h2 class="title-victory flex flex-col items-center">
          Merci d'avoir pédalé avec nous.
        </h2>
        <p class="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed">
          Que vous ayez donné 5 euros ou 5&nbsp;000. Que vous ayez partagé un post
          ou crié au bord de la route. Que vous nous ayez découverts hier ou
          suivis depuis le premier jour.
        </p>
        <p class="mt-6 text-lg md:text-xl text-secondary font-semibold leading-relaxed">
          Vous faites partie de cette aventure. Et les enfants de Necker ne
          l'oublieront pas.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "victory",
  heroHeader: true,
});

useSeoMeta({
  title: "Notre aventure – Rouler pour aider",
  ogTitle: "Notre aventure – Rouler pour aider",
  description:
    "De 2019 à 2024, l'aventure Rouler pour aider : deux éditions, 4 327 km à vélo, et 103 847 euros remis à l'Hôpital Necker le 22 novembre 2024.",
  ogDescription:
    "De 2019 à 2024, l'aventure Rouler pour aider : deux éditions, 4 327 km à vélo, et 103 847 euros remis à l'Hôpital Necker le 22 novembre 2024.",
});
</script>
