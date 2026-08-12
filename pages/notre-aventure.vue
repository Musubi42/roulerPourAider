<template>
  <div>
    <VictoryPageHero
      eyebrow="2019 – 2024"
      titre="Notre aventure"
      sous-titre="Deux éditions, cinq ans, 4 327 kilomètres à vélo."
      image="/1ere-edition/depart-lille.webp"
      image-alt="Le départ de la première édition depuis Lille, en 2020"
      cadrage="50% 40%"
    />

    <!-- Timeline -->
    <VictoryTimeline />

    <!-- Closing Section -->
    <section class="section-padding bg-warm-cream">
      <div class="max-w-3xl mx-auto text-center">
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
  title: "Notre aventure \u2013 Rouler pour aider",
  ogTitle: "Notre aventure \u2013 Rouler pour aider",
  description:
    "De 2019 à 2024, l'aventure Rouler pour aider : deux éditions, 4 327 km à vélo, et 103 782 euros récoltés pour les enfants de l'Hôpital Necker.",
  ogDescription:
    "De 2019 à 2024, l'aventure Rouler pour aider : deux éditions, 4 327 km à vélo, et 103 782 euros récoltés pour les enfants de l'Hôpital Necker.",
});
</script>
