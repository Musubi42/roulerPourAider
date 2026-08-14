<template>
  <div>
    <VictoryTeamGrid />
    <VictoryPartnerThanks />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "victory",
  heroHeader: true,
});

useSeoMeta({
  title: "L'équipe – Rouler pour aider",
  ogTitle: "L'équipe – Rouler pour aider",
  description:
    "Découvrez les fondateurs, cyclistes, partenaires et soutiens qui ont permis à Rouler pour aider de récolter 103 847 euros pour les enfants de Necker.",
  ogDescription:
    "Découvrez les fondateurs, cyclistes, partenaires et soutiens qui ont permis à Rouler pour aider de récolter 103 847 euros pour les enfants de Necker.",
});
</script>
