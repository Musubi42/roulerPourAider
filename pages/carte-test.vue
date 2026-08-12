<template>
  <!-- Page de test nue : la carte et rien d'autre. Ni header, ni footer, ni
       section d'introduction ou de fin — on juge la carte seule, notamment au
       doigt sur téléphone via un tunnel ngrok. -->
  <VictoryTourMap :header-offset="false" />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'nue' });

useSeoMeta({
  title: 'Carte 2024 — test',
  robots: 'noindex, nofollow',
});
</script>
