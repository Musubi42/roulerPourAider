<template>
  <div>
    <VictoryPageHero
      eyebrow="Revue de presse"
      titre="Ils ont raconté notre histoire"
      :sous-titre="`${presse.length} retombées médias, de la presse quotidienne régionale aux journaux télévisés nationaux.`"
      image="/medias/unamed_31cd0df342.webp"
      image-alt="Les cyclistes filmés lors d'un reportage de France 3"
      cadrage="50% 30%"
    />

    <!--
      Regroupement par edition plutot que par type de media : c'est la distinction
      qui porte du sens pour le lecteur. Chaque en-tete reprend la forme d'un
      roadbook de course — parcours, distance, montant — et ces chiffres sont reels.
    -->
    <section
      v-for="edition in editions"
      :key="edition.annee"
      class="section-padding"
      :class="edition.annee === 2020 ? 'bg-warm-white' : 'bg-warm-cream'"
    >
      <div class="max-w-5xl mx-auto">
        <header class="border-t-2 border-secondary pt-6">
          <div class="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h2 class="text-3xl md:text-4xl font-black text-secondary">
              Édition {{ edition.annee }}
            </h2>
            <p class="text-sm uppercase tracking-widest text-gray-500">{{ edition.parcours }}</p>
          </div>

          <dl class="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div v-for="fait in edition.faits" :key="fait.label" class="flex items-baseline gap-2">
              <dt class="font-bold text-gold">{{ fait.valeur }}</dt>
              <dd class="text-gray-500 uppercase tracking-wider text-xs">{{ fait.label }}</dd>
            </div>
          </dl>
        </header>

        <ul v-if="edition.retombees.length" class="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <li v-for="item in edition.retombees" :key="item.url" class="press-item opacity-0 translate-y-8">
            <!--
              Toute la carte est cliquable : cible plus large au doigt, et un seul
              point d'entree au clavier. Les sources disparues deviennent une <div>
              non cliquable — media, date et titre restent lisibles (ADR-008).
            -->
            <component
              :is="item.statut === 'mort' ? 'div' : 'a'"
              v-bind="item.statut === 'mort' ? {} : { href: item.url, target: '_blank', rel: 'noopener noreferrer' }"
              class="group block h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-shadow duration-300"
              :class="item.statut === 'mort' ? 'opacity-75' : 'hover:shadow-lg focus-visible:shadow-lg'"
            >
              <div class="relative aspect-[16/10] overflow-hidden bg-warm-cream">
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.titre"
                  loading="lazy"
                  decoding="async"
                  class="w-full h-full object-cover transition-transform duration-500"
                  :class="item.statut === 'mort' ? 'grayscale' : 'group-hover:scale-105'"
                />
                <!--
                  Sans vignette, le nom du média en typographie plutôt qu'un
                  aplat gris vide. Les retombées 2024 n'ont aucune image : les
                  logos manquent (cf. ACTIONS-HUMAINES) et les médias bloquent
                  l'aspiration de leurs visuels.
                -->
                <span
                  v-else
                  class="absolute inset-0 flex items-center justify-center px-5 text-center font-black leading-tight text-secondary/70"
                  aria-hidden="true"
                >
                  {{ item.media }}
                </span>
                <span
                  class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm"
                  :class="item.type === 'tv' ? 'bg-secondary/90' : 'bg-primary/90'"
                >
                  {{ item.type === 'tv' ? 'Reportage TV' : 'Article' }}
                </span>
              </div>

              <div class="p-5 flex flex-col">
                <div class="flex items-baseline justify-between gap-3">
                  <span class="font-bold text-secondary text-sm">{{ item.media }}</span>
                  <time v-if="item.date" :datetime="item.date" class="text-xs text-gray-400 shrink-0">
                    {{ formatDate(item.date) }}
                  </time>
                </div>

                <h3 class="mt-2 text-gray-700 text-sm leading-snug flex-1">{{ item.titre }}</h3>

                <p
                  v-if="item.statut !== 'mort'"
                  class="mt-4 text-sm font-semibold text-primary group-hover:underline"
                >
                  {{ item.type === 'tv' ? 'Voir le reportage' : "Lire l'article" }}
                  <span aria-hidden="true">&rarr;</span>
                </p>
                <p v-else class="mt-4 text-sm text-gray-400 italic">
                  Source retirée par le média
                </p>
              </div>
            </component>

            <a
              v-if="item.archiveUrl"
              :href="item.archiveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-2 inline-block text-xs text-gray-400 hover:text-secondary transition-colors"
            >
              Consulter l'archive
            </a>
          </li>
        </ul>

        <p v-else class="mt-10 text-gray-500 max-w-2xl">
          {{ edition.vide }}
        </p>
      </div>
    </section>

    <!--
      Le dossier de presse existait dans `public/` depuis toujours, mais aucun
      lien n'y menait : il n'etait telechargeable qu'en devinant son URL. C'est
      la page presse qui lui donne son contexte — c'est ici qu'un journaliste
      vient chercher de quoi ecrire.

      `download` plutot qu'un simple lien : 19 pages illustrees se lisent mal
      dans la visionneuse integree d'un navigateur mobile.
    -->
    <section class="section-padding bg-warm-white">
      <div class="max-w-5xl mx-auto">
        <div class="card-victory flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-secondary">Le dossier de presse 2024</h2>
            <p class="mt-2 text-gray-600 max-w-xl">
              L'association, les deux éditions, les chiffres et les photos — de quoi
              raconter l'histoire, en 19 pages.
            </p>
          </div>

          <a
            :href="DOSSIER_URL"
            download
            class="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full bg-secondary px-6 font-bold text-white transition-colors hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            <IconsDownload aria-hidden="true" />
            Télécharger le PDF
            <!-- Le poids annonce evite le clic a l'aveugle en 4G. -->
            <span class="font-normal text-white/70">(4,5 Mo)</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * Donnees figees depuis l'export Strapi du 11/08/2026 (ADR-002). L'export
 * lui-meme a ete retire du depot ; il reste consultable via
 * `git show cdecfd1:data/strapi/articles.json`.
 * Les 21 entrees inventees du refactor de fevrier ont ete supprimees (ADR-007).
 *
 * L'onglet « Passages radio » a ete retire : la collection `podcasts` de l'ancien
 * backoffice etait vide, et un onglet perpetuellement a zero n'apprend rien au
 * visiteur.
 */
import presse from '~/data/presse.json';
import { useScrollAnimation } from '~/composables/useScrollAnimation';

/**
 * Sert depuis `public/`, donc depuis le CDN Vercel au meme titre que le reste.
 * Un fichier statique n'est telecharge que si on clique dessus : il ne pese ni
 * sur le chargement de la page, ni sur le LCP, ni sur Lighthouse.
 */
const DOSSIER_URL = '/Rouler_pour_aider_dossier.pdf';

type Item = (typeof presse)[number];

const parEdition = (annee: number) =>
  presse
    .filter((p: Item) => p.edition === annee)
    .slice()
    .sort((a: Item, b: Item) => (b.date || '').localeCompare(a.date || ''));

const editions = computed(() => [
  {
    annee: 2020,
    parcours: 'Lille → Nice',
    faits: [
      { valeur: '1 327 km', label: 'parcourus' },
      { valeur: '33 324 €', label: 'récoltés' },
    ],
    retombees: parEdition(2020),
    vide: '',
  },
  {
    annee: 2024,
    parcours: 'Tour de France',
    faits: [
      { valeur: '3 000 km', label: 'parcourus' },
      { valeur: '18', label: 'étapes' },
      { valeur: '70 523 €', label: 'récoltés' },
    ],
    retombees: parEdition(2024),
    vide: "Les retombées de cette édition n'ont pas encore été rassemblées ici.",
  },
]);

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const { staggerCards } = useScrollAnimation();
onMounted(() => staggerCards('.press-item', { stagger: 0.06, y: 24 }));
</script>
