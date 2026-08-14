<template>
  <section class="section-padding bg-warm-cream">
    <div class="max-w-6xl mx-auto">
      <h2 class="title-victory text-center">Nos partenaires</h2>
      <p class="mt-4 text-center text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
        Aucune aventure de cette envergure ne se fait seule.
      </p>

      <div class="mt-6 max-w-3xl mx-auto text-center text-gray-600 leading-relaxed space-y-4">
        <p>
          Nos partenaires ont cru en nous quand l'association n'était qu'un projet sur le
          papier. Ils ont apporté le soutien logistique, financier et humain qui a
          transformé ces ambitions en réalité.
        </p>
      </div>

      <!-- Grille des partenaires -->
      <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!--
          Les logos fournis ont des formats et des ratios tres heterogenes (PNG,
          JPEG, WebP, du carre au tres large). Plutot que de les redimensionner —
          ce qui deformerait les marques —, chaque logo est centre dans une zone
          de hauteur fixe et contraint par `object-contain`. Les descriptions,
          elles aussi de longueurs tres inegales, sont limitees a quatre lignes.
          Resultat : toutes les cartes ont la meme hauteur sans rien tronquer de
          visible sur les logos.
        -->
        <div
          v-for="partner in partenaires"
          :key="partner.nom"
          class="partner-card card-victory flex flex-col items-center text-center opacity-0 translate-y-8"
        >
          <div class="w-full h-20 flex items-center justify-center mb-5">
            <img
              v-if="partner.logo"
              :src="partner.logo"
              :alt="`Logo ${partner.nom}`"
              loading="lazy"
              decoding="async"
              class="max-h-full max-w-[65%] object-contain"
            />
            <span v-else class="text-secondary font-bold text-sm leading-tight px-2">
              {{ partner.nom }}
            </span>
          </div>

          <h3 class="font-bold text-secondary text-base">{{ partner.nom }}</h3>
          <p
            v-if="partner.description"
            class="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-4"
          >
            {{ partner.description }}
          </p>

          <a
            v-if="partner.siteWeb"
            :href="partner.siteWeb"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-auto pt-4 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
          >
            Visiter le site
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      <p class="mt-12 text-center text-lg font-semibold text-secondary max-w-2xl mx-auto">
        À chacun de nos partenaires : votre confiance a été notre carburant.
      </p>
    </div>
  </section>

  <!-- Label Grande Cause Nationale -->
  <section class="section-padding bg-warm-white">
    <div class="max-w-4xl mx-auto text-center">
      <img
        src="/Grande-cause-nationale-Bouge-chaque-jour.png"
        alt="Label Grande Cause Nationale — Bouge chaque jour"
        class="h-24 md:h-32 mx-auto object-contain mb-6"
        loading="lazy"
        decoding="async"
      />
      <h3 class="text-xl md:text-2xl font-bold text-secondary">Label Grande Cause Nationale</h3>
      <p class="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Rouler pour aider a reçu le label Grande Cause Nationale du ministère des Sports
        et des Jeux Olympiques et Paralympiques, une reconnaissance qui a amplifié notre
        voix et notre impact.
      </p>
      <a
        href="https://www.grandecause-sport.fr"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block mt-4 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
      >
        En savoir plus sur le label
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
// Donnees figees depuis l'export Strapi du 11/08/2026 (cf. ADR-002). L'export
// lui-meme a ete retire du depot ; il reste consultable via
// `git show cdecfd1:data/strapi/partenaires.json`.
// Le label Grande Cause Nationale a ete sorti de la liste : il a sa propre section.
import partenaires from '~/data/partenaires.json';
import { useScrollAnimation } from '~/composables/useScrollAnimation';

const { staggerCards } = useScrollAnimation();

onMounted(() => {
  staggerCards('.partner-card', { stagger: 0.08, y: 32 });
});
</script>
