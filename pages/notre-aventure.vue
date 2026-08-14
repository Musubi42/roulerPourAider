<template>
  <div>
    <VictoryPageHero
      eyebrow="2019 – 2024"
      titre="Notre aventure"
      sous-titre="Deux éditions, cinq ans, 4 327 kilomètres à vélo, 103 847 € remis à l'Hôpital Necker."
      image="/1ere-edition/depart-lille.webp"
      image-alt="Le départ de la première édition depuis Lille, en 2020"
      cadrage="50% 40%"
    />

    <!-- Le récit en six actes, tenu par le rail : la route de la carte
         d'accueil, redressée à la verticale. -->
    <VictoryRouteStory class="py-16 md:py-24" />

    <!-- Clôture -->
    <section class="section-padding bg-warm-cream">
      <div class="max-w-3xl mx-auto text-center">
        <!--
          EN ATTENTE — le mot signé des fondateurs.
          Hugo et Milan doivent envoyer deux ou trois phrases de clôture. Le
          jour où elles arrivent, renseigner `motFondateurs` ci-dessous : le
          texte générique s'efface de lui-même.
        -->
        <template v-if="motFondateurs">
          <h2 class="title-victory flex flex-col items-center">Le mot de la fin</h2>
          <blockquote class="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed italic">
            {{ motFondateurs.texte }}
          </blockquote>
          <p class="mt-4 font-semibold text-secondary">— {{ motFondateurs.signature }}</p>
        </template>

        <template v-else>
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
        </template>

        <!-- Repère de chantier, visible en développement uniquement : un
             emplacement vide ne se remarque pas, et une maquette de citation
             ne doit jamais partir en production (ADR-012). -->
        <p
          v-if="!motFondateurs && dev"
          class="mt-10 rounded-xl border-2 border-dashed border-gold/60 p-4 text-sm text-gray-500"
        >
          <strong class="text-secondary">Emplacement réservé (dev)</strong> — le mot
          signé de Hugo et Milan vient ici. Renseigner <code>motFondateurs</code>
          dans <code>pages/notre-aventure.vue</code>.
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

/**
 * Le mot de clôture des fondateurs. `null` tant qu'ils ne l'ont pas envoyé :
 * on n'écrit pas de citation à leur place (ADR-012).
 *
 * Pour l'activer : { texte: "…", signature: "Hugo Nicaise et Milan Hrmo" }
 */
const motFondateurs: { texte: string; signature: string } | null = null;

const dev = import.meta.dev;

useSeoMeta({
  title: "Notre aventure – Rouler pour aider",
  ogTitle: "Notre aventure – Rouler pour aider",
  description:
    "De 2019 à 2024, l'aventure Rouler pour aider : deux éditions, 4 327 km à vélo, et 103 847 euros remis à l'Hôpital Necker le 22 novembre 2024.",
  ogDescription:
    "De 2019 à 2024, l'aventure Rouler pour aider : deux éditions, 4 327 km à vélo, et 103 847 euros remis à l'Hôpital Necker le 22 novembre 2024.",
});
</script>
