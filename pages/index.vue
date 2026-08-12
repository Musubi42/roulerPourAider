<template>
  <div>
    <VictoryHeroVictory />
    <VictoryStatCounter />
    <VictoryImpactCards />
    <VictoryTourMap />
    <VictoryProofCards />
    <VictoryPressHighlights />
    <VictoryPartnerThanks />
    <VictoryClosingThanks />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "victory",
  heroHeader: true,
});

useSeoMeta({
  title: "Rouler pour aider - 100 000 merci",
  ogTitle: "Rouler pour aider - 100 000 merci",
  description:
    "Grâce à vous, Rouler pour aider a récolté 103 782 euros pour les enfants de l'Hôpital Necker, sur deux éditions et 4 327 kilomètres à vélo.",
  ogDescription:
    "Grâce à vous, Rouler pour aider a récolté 103 782 euros pour les enfants de l'Hôpital Necker, sur deux éditions et 4 327 kilomètres à vélo.",
});
</script>
