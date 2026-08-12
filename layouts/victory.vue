<template>
  <div class="bg-warm-white min-h-screen font-omnes">
    <Header />
    <!-- Le header est `fixed` : les pages sans hero doivent compenser sa hauteur. -->
    <main :class="{ 'pt-16': !isOverHero }">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const isOverHero = computed(() => route.meta.heroHeader === true);
</script>
