<template>
  <section
    class="relative w-full flex items-center justify-center overflow-hidden bg-navy"
    :class="hauteurClasse"
  >
    <!--
      Meme traitement duotone que le hero d'accueil : la photo est desaturee et
      teintee navy pour devenir une atmosphere plutot qu'un sujet concurrent.
      Sans image, on retombe simplement sur l'aplat navy — aucune page n'est cassee.

      `fetchpriority="high"` et surtout PAS `loading="lazy"` : cette photo est
      l'element LCP de la page. En lazy, le navigateur la reportait apres le
      reste, ce qui degradait exactement la metrique qu'on cherche a ameliorer.
    -->
    <img
      v-if="image"
      :src="image"
      :alt="imageAlt"
      fetchpriority="high"
      decoding="async"
      class="hero-photo absolute inset-0 w-full h-full object-cover"
      :style="{ objectPosition: cadrage }"
    />
    <div v-if="image" class="hero-tint absolute inset-0 z-[1]"></div>
    <div class="hero-scrim absolute inset-0 z-[2]"></div>

    <div class="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
      <p
        v-if="eyebrow"
        class="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-white/70"
      >
        {{ eyebrow }}
      </p>
      <h1
        class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,.35)]"
        :class="eyebrow ? 'mt-5' : ''"
      >
        {{ titre }}
      </h1>
      <p
        v-if="sousTitre"
        class="mt-5 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed text-white/90"
      >
        {{ sousTitre }}
      </p>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * Hero des pages interieures.
 *
 * Volontairement plus court que celui de l'accueil : la page d'accueil ouvre sur
 * une pleine hauteur parce que le chiffre EST le message. Sur les pages
 * interieures, occuper tout l'ecran retarde l'acces au contenu sans rien ajouter.
 */
const props = withDefaults(
  defineProps<{
    titre: string;
    eyebrow?: string;
    sousTitre?: string;
    image?: string;
    imageAlt?: string;
    /** 'moyen' pour une page de contenu, 'court' pour une page utilitaire. */
    taille?: 'moyen' | 'court';
    cadrage?: string;
  }>(),
  {
    taille: 'moyen',
    cadrage: '50% 45%',
    imageAlt: '',
  }
);

const hauteurClasse = computed(() =>
  props.taille === 'court' ? 'py-20 md:py-24' : 'py-28 md:py-36'
);
</script>

<style scoped>
.hero-photo {
  filter: grayscale(1) contrast(1.05) brightness(0.62);
}

.hero-tint {
  background: rgb(18 41 74 / 0.55);
  mix-blend-mode: multiply;
}

.hero-scrim {
  background: linear-gradient(
    to bottom,
    rgb(18 41 74 / 0.85),
    rgb(18 41 74 / 0.3) 50%,
    rgb(18 41 74 / 0.85)
  );
}
</style>
