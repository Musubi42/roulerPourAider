<template>
  <section class="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-navy">
    <!--
      Photo d'arrivee a Nice, edition 2020. C'est l'image la plus caracteristique
      du projet : les trois cyclistes, les velos, la fin du parcours.
      Elle est volontairement desaturee et recouverte d'un voile navy plutot que
      d'un aplat noir : le bleu du ciel et de la mer rejoint la palette, et le
      blanc du titre garde un contraste largement au-dessus du seuil AA.
    -->
    <img
      src="/1ere-edition/2020-arrivee-nice.webp"
      alt="Les trois cyclistes de Rouler pour aider à l'arrivée de la première édition, sur la promenade des Anglais à Nice"
      fetchpriority="high"
      decoding="async"
      class="hero-photo absolute inset-0 w-full h-full object-cover object-[50%_38%]"
    />
    <div class="hero-tint absolute inset-0 z-[1]"></div>
    <div class="hero-scrim absolute inset-0 z-[2]"></div>

    <div ref="heroContent" class="relative z-10 text-center text-white px-6 py-24">
      <p class="hero-text text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-white/70 opacity-0">
        2019 &ndash; 2024 &middot; Mission accomplie
      </p>

      <h1 class="hero-text mt-6 text-6xl md:text-8xl lg:text-9xl font-black tracking-tight opacity-0 [text-shadow:0_2px_24px_rgba(0,0,0,.35)]">
        <!-- La valeur FINALE est rendue dans le HTML. Le compteur ne repart de
             zero que cote client, dans onMounted. Sinon le prerendu figeait
             « 0 merci » dans le fichier servi aux robots et aux visiteurs sans
             JavaScript. -->
        <span ref="counterEl" class="text-gold">{{ TOTAL_EUROS.toLocaleString('fr-FR') }}</span> merci.
      </h1>

      <p class="hero-text mt-6 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed opacity-0">
        103&nbsp;847&nbsp;euros récoltés pour les enfants de l'Hôpital Necker.
      </p>

      <!-- Chiffres cles : formules comme un roadbook de course plutot qu'en prose -->
      <dl class="hero-text mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm md:text-base opacity-0">
        <div v-for="fait in faits" :key="fait.label" class="flex items-baseline gap-2">
          <dt class="font-bold text-white">{{ fait.valeur }}</dt>
          <dd class="text-white/60 uppercase tracking-wider text-xs">{{ fait.label }}</dd>
        </div>
      </dl>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 motion-safe:animate-bounce">
      <svg class="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>

<style scoped>
/*
  Traitement duotone navy.
  La photo est en couleurs vives et le panneau « #ILoveNICE » y forme des lettres
  geantes qui entraient en concurrence avec le titre. Desaturee et teintee, elle
  devient une atmosphere : le decor reste lisible, la typo passe au premier plan,
  et le bleu rejoint la palette au lieu de la contredire.
*/
.hero-photo {
  filter: grayscale(1) contrast(1.05) brightness(0.62);
}

.hero-tint {
  background: rgb(18 41 74 / 0.55);
  mix-blend-mode: multiply;
}

/* Plus dense en haut (lisibilite du header) et en bas (indice de scroll). */
.hero-scrim {
  background: linear-gradient(
    to bottom,
    rgb(18 41 74 / 0.85),
    rgb(18 41 74 / 0.25) 45%,
    rgb(18 41 74 / 0.9)
  );
}
</style>

<script setup lang="ts">
import { gsap } from 'gsap';

const faits = [
  { valeur: '2', label: 'éditions' },
  { valeur: '4 327 km', label: 'à vélo' },
  // 605 = edition 2024 uniquement, cf. le commentaire de StatCounter.vue.
  { valeur: '605', label: 'donateurs en 2024' },
];

// 103 847 = 33 324 EUR (edition 2020) + 70 523 EUR (edition 2024). Chiffre reel,
// pas l'arrondi « 100 000 » qui ne correspond a aucune des deux collectes.
const TOTAL_EUROS = 103847;

const counterEl = ref<HTMLElement | null>(null);
const heroContent = ref<HTMLElement | null>(null);

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroContent.value) {
    const textEls = heroContent.value.querySelectorAll('.hero-text');
    if (prefersReducedMotion) {
      gsap.set(textEls, { opacity: 1, y: 0 });
    } else {
      gsap.fromTo(textEls,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
      );
    }
  }

  if (!counterEl.value) return;

  // On repart de zero maintenant seulement : le HTML livre, lui, portait deja
  // la valeur finale.
  counterEl.value.textContent = '0';
  const counter = { value: 0 };
  gsap.to(counter, {
    value: TOTAL_EUROS,
    duration: prefersReducedMotion ? 0.1 : 3,
    delay: prefersReducedMotion ? 0 : 0.8,
    ease: 'power2.out',
    onUpdate: () => {
      if (counterEl.value) {
        counterEl.value.textContent = Math.round(counter.value).toLocaleString('fr-FR');
      }
    },
  });
});
</script>
