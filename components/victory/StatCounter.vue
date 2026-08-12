<template>
  <section class="section-padding bg-warm-cream">
    <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
      <div v-for="stat in stats" :key="stat.label" class="flex flex-col items-center">
        <!-- Valeur finale dans le HTML : le prerendu figeait « 0 » pour les
             robots et les visiteurs sans JavaScript. L'animation repart de zero
             cote client uniquement (voir onMounted). -->
        <span ref="statEls" class="text-3xl md:text-4xl font-black text-gold" :data-target="stat.value" :data-suffix="stat.suffix">
          {{ stat.value.toLocaleString('fr-FR') }}{{ stat.suffix }}
        </span>
        <span class="mt-2 text-sm md:text-base text-secondary font-medium">{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// L'animation passe par le composable : il respecte prefers-reduced-motion et
// nettoie ses ScrollTrigger au demontage. (ScrollTrigger est deja enregistre
// par plugins/gsap.client.js — ce composant le ré-enregistrait inutilement.)
import { useScrollAnimation } from '~/composables/useScrollAnimation';

const { countUpOnScroll } = useScrollAnimation();

// Chiffres verifies (source : page de collecte Fondation AP-HP).
//   Edition 2020 Lille-Nice : 1 327 km, 33 324 EUR
//   Edition 2024 Tour de France : 3 000 km, 18 etapes, 70 458 EUR (117 % de l'objectif)
//   Cumul : 103 782 EUR, 4 327 km, 605 donateurs
// Ne pas arrondir a 100 000 : « 100 000 merci » est l'accroche, pas le montant.
const stats = [
  { value: 103782, suffix: ' €', label: 'récoltés en cinq ans' },
  { value: 605, suffix: '', label: 'donateurs' },
  { value: 4327, suffix: ' km', label: 'parcourus à vélo' },
  { value: 18, suffix: '', label: 'étapes en 2024' },
  { value: 2, suffix: '', label: 'éditions' },
];

const statEls = ref<HTMLElement[]>([]);

onMounted(() => {
  statEls.value.forEach((el) => {
    el.textContent = '0';
    countUpOnScroll(el, Number(el.dataset.target), { suffix: el.dataset.suffix || '' });
  });
});
</script>
