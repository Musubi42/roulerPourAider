<template>
  <section class="section-padding bg-warm-cream overflow-hidden">
    <div class="max-w-5xl mx-auto text-center">
      <h2 class="title-victory text-center">Ils en ont parlé</h2>
      <p class="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
        {{ presse.length }} retombées médias, de la presse quotidienne régionale aux
        journaux télévisés nationaux.
      </p>
    </div>

    <!--
      Bandeau defilant. Deux copies identiques de la liste se suivent et l'ensemble
      translate de -50 % : quand la premiere copie sort, la seconde est exactement a
      sa place, la boucle est donc invisible sans JavaScript.
      Les degrades lateraux evitent que les noms soient tranches net au bord.
      L'animation s'arrete au survol et sous prefers-reduced-motion.
    -->
    <div class="relative mt-12 marquee-mask">
      <div class="flex w-max marquee-track">
        <ul
          v-for="copie in 2"
          :key="copie"
          class="flex items-center shrink-0"
          :aria-hidden="copie === 2 ? 'true' : undefined"
        >
          <li v-for="media in medias" :key="`${copie}-${media.nom}`" class="px-8 md:px-12">
            <!-- Quand les vrais logos seront disponibles, il suffira de renseigner
                 `logo` dans data/presse.json : l'image remplacera le nom. -->
            <img
              v-if="media.logo"
              :src="media.logo"
              :alt="media.nom"
              loading="lazy"
              class="h-8 md:h-10 w-auto object-contain opacity-70"
            />
            <span
              v-else
              class="whitespace-nowrap text-xl md:text-2xl font-bold text-secondary/80"
            >
              {{ media.nom }}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div class="text-center mt-12">
      <NuxtLink
        to="/presse"
        class="inline-block px-6 py-3 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-colors"
      >
        Voir toutes les retombées
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import presse from '~/data/presse.json';

type Item = (typeof presse)[number];

// Un media peut avoir plusieurs retombees : on le n'affiche qu'une fois.
const medias = computed(() => {
  const vus = new Map<string, { nom: string; logo: string | null }>();
  for (const p of presse as Item[]) {
    if (!vus.has(p.media)) vus.set(p.media, { nom: p.media, logo: null });
  }
  return [...vus.values()];
});
</script>

<style scoped>
.marquee-mask {
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.marquee-track {
  animation: marquee 45s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
    /* Sans defilement, la seconde copie ferait doublon a l'ecran. */
    width: 100%;
    overflow-x: auto;
  }
  .marquee-track > ul[aria-hidden='true'] {
    display: none;
  }
}
</style>
