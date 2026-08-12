<template>
  <section class="section-padding">
    <div class="max-w-5xl mx-auto">
      <!--
        Ces trois affirmations sont notre propre texte, pas des citations de presse.
        Elles etaient auparavant affichees entre guillemets sous « Ils ont raconte
        notre histoire », ce qui les faisait passer pour des propos de journalistes
        alors qu'elles ne sont attribuees a personne (ADR-007).
      -->
      <h2 class="title-victory text-center">Ce que cette aventure a prouvé</h2>

      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <article
          v-for="proof in proofs"
          :key="proof.titre"
          class="proof-card card-victory text-center opacity-0 translate-y-8"
        >
          <!--
            Icones dessinees a la main plutot qu'une bibliotheque generique :
            trait rond de 1.6, comme les terminaisons arrondies du logo et de la
            typo Omnes. Chacune renvoie a un objet reel du projet (le peloton,
            la roue, la cocarde du label).
          -->
          <div class="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <svg
              viewBox="0 0 32 32"
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <template v-if="proof.icone === 'peloton'">
                <circle cx="11" cy="11" r="4" />
                <circle cx="22" cy="13" r="3" />
                <path d="M4 25c0-3.9 3.1-7 7-7s7 3.1 7 7" />
                <path d="M20 25c0-2.8 1.4-5 4-5s4 2.2 4 5" />
              </template>

              <template v-else-if="proof.icone === 'roue'">
                <circle cx="16" cy="16" r="11" />
                <circle cx="16" cy="16" r="2.5" />
                <path d="M16 5v6M16 21v6M5 16h6M21 16h6" />
                <path d="M8.2 8.2l4.2 4.2M19.6 19.6l4.2 4.2M23.8 8.2l-4.2 4.2M12.4 19.6l-4.2 4.2" />
              </template>

              <template v-else>
                <!--
                  Cocarde. L'etoile est calculee, pas dessinee a vue : 5 sommets a
                  R=4.2 et 5 creux a r=1.9, tous centres sur (16,12) — le meme centre
                  que le cercle. La version precedente etait decalee vers le bas.
                -->
                <circle cx="16" cy="12" r="7" />
                <path
                  d="M16 7.8 17.12 10.46 19.99 10.7 17.81 12.59 18.47 15.4 16 13.9 13.53 15.4 14.19 12.59 12.01 10.7 14.88 10.46 Z"
                />
                <path d="M12.4 18.3 10 28l6-3.2 6 3.2-2.4-9.7" />
              </template>
            </svg>
          </div>

          <h3 class="mt-5 font-bold text-secondary">{{ proof.titre }}</h3>
          <p class="mt-2 text-gray-600 text-sm leading-relaxed">{{ proof.texte }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';

const { staggerCards } = useScrollAnimation();
onMounted(() => staggerCards('.proof-card', { stagger: 0.12, y: 30 }));

const proofs = [
  {
    icone: 'peloton',
    titre: "La solidarité n'a pas d'âge",
    texte:
      "Des étudiants ont mobilisé partenaires, bénévoles et donateurs autour d'une cause qui leur était étrangère au départ.",
  },
  {
    icone: 'roue',
    titre: 'Une promesse tenue',
    texte:
      '4 327 kilomètres parcourus, 605 donateurs, 103 782 euros récoltés. Un projet mené jusqu\'au bout vaut mieux qu\'une bonne intention.',
  },
  {
    icone: 'label',
    titre: 'Reconnu Grande Cause Nationale',
    texte:
      "Le ministère des Sports a labellisé le projet, confirmant que le dépassement sportif peut servir les plus fragiles.",
  },
];
</script>
