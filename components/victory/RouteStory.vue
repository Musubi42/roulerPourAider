<template>
  <section ref="sectionEl" class="relative">
    <!-- ── Barre de progression mobile ────────────────────────────────────
         En dessous de `lg`, le rail n'a pas de colonne où vivre. Il se replie
         en bandeau collant sous le header : même information (acte courant,
         compteur, progression), même jauge or que la fiche d'étape de la carte.
         `top-16` = hauteur du header `fixed` du layout victory. -->
    <!-- Aucune marge négative ici : la version précédente débordait de 24 px de
         chaque côté, ce qui rendait la page scrollable horizontalement. Le
         header étant `fixed` et large de 100 %, un simple décalage latéral le
         faisait sortir du champ — d'où le « header invisible » constaté sur
         mobile. Le débordement était la cause, pas le header. -->
    <div
      class="lg:hidden sticky top-16 z-20 mb-10 border-b border-secondary/10 bg-warm-white/95 px-6 py-2.5 shadow-sm backdrop-blur md:px-12"
    >
      <div class="flex items-baseline justify-between gap-3">
        <p class="truncate text-secondary text-xs font-bold uppercase tracking-[0.18em]">
          {{ acteCourant.jalon }}
        </p>
        <!-- `shrink-0` : le compteur est la donnée, c'est le libellé de gauche
             qui doit céder la place, pas lui. -->
        <p class="shrink-0 text-gold text-lg font-black">
          {{ acteCourant.compteur }}
        </p>
      </div>
      <div class="mt-2 h-1 overflow-hidden rounded-full bg-secondary/15">
        <div
          class="h-full bg-gold transition-[width] duration-200 ease-out"
          :style="{ width: `${Math.round(avancement * 100)}%` }"
        />
      </div>
    </div>

    <div class="mx-auto max-w-6xl px-6 md:px-12 lg:px-8">
      <div class="lg:grid lg:grid-cols-[13rem_1fr] lg:gap-10 xl:gap-16">
        <!-- ── Le rail ──────────────────────────────────────────────────
             C'est la route de la carte d'accueil, redressée à la verticale.
             Mêmes couleurs, mêmes épaisseurs, même vélo : le cycliste qui
             fait le tour de France sur la home descend ici les cinq ans.
             La correspondance est volontaire — ne pas « harmoniser » ces
             valeurs avec d'autres, elles sont copiées de TourMap.vue. -->
        <nav class="hidden lg:block" aria-label="Les étapes du récit">
          <div class="sticky top-28 h-[68svh]">
            <!-- Le SVG se dimensionne sur la hauteur (`h-full w-auto`), donc sa
                 largeur suit le ratio du viewBox. Les jalons sont posés dans
                 une colonne SŒUR plutôt que par-dessus le SVG : leur `top` en
                 pourcentage est alors exact quelle que soit cette largeur.
                 Les positionner au-dessus du SVG obligeait à convertir des
                 unités de viewBox en pourcentage du conteneur — deux repères
                 différents, donc des étiquettes décalées de leur point. -->
            <div class="flex h-full gap-3">
              <svg
                ref="svgEl"
                viewBox="0 0 160 1000"
                class="h-full w-auto shrink-0 overflow-visible"
                aria-hidden="true"
                focusable="false"
              >
                <!-- Le chemin qui reste à lire, en filigrane pointillé :
                     exactement le traitement du parcours non encore parcouru
                     sur la carte. -->
                <path
                  :d="TRACE"
                  fill="none"
                  stroke="#2A5FA4"
                  stroke-opacity="0.28"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-dasharray="10 9"
                />

                <!-- Halo crème sous la portion parcourue. Sur la carte il sert
                     à décoller le tracé des photos ; ici il efface proprement
                     le filigrane pointillé derrière la portion déjà lue, qui
                     sinon transparaîtrait sur les bords du trait plein. -->
                <path
                  ref="haloEl"
                  :d="TRACE"
                  fill="none"
                  stroke="#FFF8F0"
                  stroke-width="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  ref="routeEl"
                  :d="TRACE"
                  fill="none"
                  stroke="#2A5FA4"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <circle
                  v-for="(p, i) in points"
                  :key="i"
                  :cx="p.x"
                  :cy="p.y"
                  :r="i === indexActif ? 11 : 6"
                  :fill="i <= indexActif ? '#2A5FA4' : '#FFF8F0'"
                  stroke="#2A5FA4"
                  stroke-width="2.5"
                  class="transition-all duration-300"
                />

                <!-- Le vélo, repris trait pour trait de la carte. Il ne pivote
                     pas : un marqueur reste droit.
                     L'opacité passe par Vue et non par une écriture directe
                     dans `style` : le composant se re-rend à chaque changement
                     d'acte, et le patch réappliquait alors l'attribut statique
                     `opacity: 0` — le vélo disparaissait au premier scroll.
                     Elle ne bascule qu'une fois la première position calculée,
                     sans quoi le marqueur clignoterait en (0,0). -->
                <g v-show="!statique" ref="veloEl" :style="{ opacity: veloPret ? 1 : 0 }">
                  <circle r="19" fill="#D4A843" stroke="#12294A" stroke-width="3" />
                  <g
                    fill="none"
                    stroke="#12294A"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="-7" cy="4" r="5.5" />
                    <circle cx="7" cy="4" r="5.5" />
                    <path d="M-7 4 L-1 -4 L5 -4 L7 4" />
                    <path d="M-1 -4 L2 4 L7 4" />
                    <path d="M5 -4 L8 -7" />
                    <path d="M-3 -7 L0 -7" />
                  </g>
                </g>
              </svg>

              <!-- Les jalons sont de vrais liens : le rail sert aussi de
                   sommaire, navigable au clavier. Les cercles SVG, eux, sont
                   purement décoratifs. -->
              <div class="relative flex-1">
                <a
                  v-for="(p, i) in points"
                  :key="`lien-${i}`"
                  :href="`#${actes[i].id}`"
                  class="absolute left-0 -translate-y-1/2 rounded-md px-1 py-1 text-xs font-bold leading-tight tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                  :class="
                    i === indexActif
                      ? 'text-secondary'
                      : 'text-secondary/50 hover:text-secondary'
                  "
                  :style="{ top: `${(p.y / 1000) * 100}%` }"
                  :aria-current="i === indexActif ? 'true' : undefined"
                >
                  {{ actes[i].jalon }}
                  <span class="sr-only">&nbsp;— {{ actes[i].titre }}</span>
                </a>
              </div>
            </div>

            <!-- Le compteur. Il porte l'or, comme sur la carte : c'est le
                 chiffre du bilan de l'acte en cours. Il monte à 1 327 km,
                 ne bouge plus pendant trois ans, repart à 4 327 — puis change
                 d'unité le jour où les chèques sont remis. -->
            <div class="mt-6 pl-1">
              <p class="text-gold text-2xl font-black leading-none">
                {{ acteCourant.compteur }}
              </p>
              <p class="mt-1 text-xs leading-snug text-gray-500">
                {{ acteCourant.compteurLegende }}
              </p>
            </div>
          </div>
        </nav>

        <!-- ── Les chapitres ────────────────────────────────────────────── -->
        <div>
          <article
            v-for="acte in actes"
            :id="acte.id"
            :key="acte.id"
            class="acte scroll-mt-36 lg:scroll-mt-28 border-t border-secondary/10 py-14 first:border-t-0 first:pt-0 md:py-20 md:first:pt-0"
          >
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-secondary/70 md:text-sm">
              {{ acte.date }}
            </p>
            <h2 class="mt-4 text-3xl font-black leading-tight tracking-tight text-secondary md:text-4xl lg:text-5xl">
              {{ acte.titre }}
            </h2>

            <!-- La ligne de crête : les faits chiffrés de l'acte, avant tout
                 paragraphe. « Un chiffre vaut mieux qu'un adjectif. » -->
            <p
              v-if="acte.chiffres"
              class="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm font-bold text-secondary md:text-base"
            >
              <template v-for="(chiffre, c) in acte.chiffres" :key="chiffre">
                <span v-if="c > 0" class="text-gray-300" aria-hidden="true">·</span>
                <span>{{ chiffre }}</span>
              </template>
            </p>

            <div class="mt-6 max-w-[62ch] space-y-4 leading-relaxed text-gray-600">
              <p v-for="(para, p) in acte.paragraphes" :key="p">{{ para }}</p>
            </div>

            <!-- La citation d'un tiers, quand elle est sourcée (ADR-007) :
                 média + date + lien, sans quoi elle ne s'affiche pas. -->
            <figure
              v-if="acte.citation"
              class="mt-8 max-w-[62ch] border-l-2 border-gold pl-5"
            >
              <blockquote class="text-lg italic leading-relaxed text-secondary">
                {{ acte.citation.texte }}
              </blockquote>
              <figcaption class="mt-2 text-sm text-gray-500">
                <a
                  v-if="acte.citation.url"
                  :href="acte.citation.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="underline decoration-gray-300 underline-offset-2 hover:text-secondary hover:decoration-secondary"
                >{{ acte.citation.source }}</a>
                <span v-else>{{ acte.citation.source }}</span>
                <span v-if="acte.citation.date"> — {{ acte.citation.date }}</span>
              </figcaption>
            </figure>

            <!-- Les photos prennent toute la colonne, là où l'ancienne
                 timeline les tassait dans une carte à 45 % de largeur.
                 Nombre impair : la première passe en pleine largeur. -->
            <div
              v-if="acte.photos?.length"
              class="mt-10 grid gap-4"
              :class="acte.photos.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'"
            >
              <figure
                v-for="(photo, j) in acte.photos"
                :key="photo.src"
                :class="pleineLargeur(acte.photos, j) ? 'md:col-span-2' : ''"
              >
                <!-- Le cadre porte le ratio, pas l'image : sur l'image seule, la
                     largeur intrinsèque reprenait la main et laissait une bande
                     de fond sur les photos en portrait.
                     Un RATIO plutôt qu'une hauteur fixe : le recadrage devient
                     prévisible à toutes les largeurs, et les vignettes gardent
                     bien plus de la photo qu'un `h-64` ne le permettait. -->
                <div
                  class="overflow-hidden rounded-2xl bg-warm-cream shadow-sm"
                  :class="
                    pleineLargeur(acte.photos, j) ? 'aspect-[16/9]' : 'aspect-[3/2]'
                  "
                >
                  <!-- `width` explicite : sans lui, le provider Vercel retombe
                       sur la plus grande valeur de `screens` (1536 px) et sert
                       une image bien plus lourde que la place qu'elle occupe.
                       768 et 640 ne sont pas choisis au hasard : le provider ne
                       sert QUE les largeurs de `screens`, et `<NuxtImg>` génère
                       un srcset en 1x ET 2x — il faut donc que le double y soit
                       aussi (768→1536, 640→1280). Toute autre valeur sort un
                       avertissement au build et se fait arrondir.
                       Ne pas « corriger » ça en ajoutant des largeurs sur mesure
                       à `image.screens` : des clés hors des points d'arrêt
                       standard font échouer le prérendu. -->
                  <NuxtImg
                    :src="photo.src"
                    :alt="photo.alt"
                    :width="pleineLargeur(acte.photos, j) ? 768 : 640"
                    class="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    :style="styleVignette(photo)"
                    format="webp"
                    quality="80"
                    loading="lazy"
                  />
                </div>
                <figcaption v-if="photo.legende" class="mt-2 text-xs text-gray-500">
                  {{ photo.legende }}
                </figcaption>
              </figure>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { actes } from '~/data/recit';

/**
 * Le récit de l'aventure, tenu par un rail.
 *
 * Le rail n'est pas une ligne de timeline générique : c'est le tracé de la
 * carte d'accueil (`TourMap.vue`) redressé à la verticale, avec ses couleurs,
 * ses épaisseurs, ses pastilles et son vélo. Le même cycliste traverse les
 * deux pages — c'est ce qui relie le parcours et le récit.
 *
 * Ce que le rail encode, et qui est vrai : le compteur affiche les kilomètres
 * cumulés. Il monte à 1 327 en 2020, NE BOUGE PLUS pendant 2021-2023 — trois
 * ans de travail sans un kilomètre — repart à 4 327 en juillet 2024, puis
 * change d'unité à la remise des chèques. La route s'arrête, le chiffre qui
 * reste est en euros.
 */

/**
 * Le tracé, en dur. Une route qui serpente, pas une ligne droite : c'est ce
 * qui rappelle le parcours de la carte. La géométrie ne dépend d'aucune
 * donnée, les jalons sont répartis à intervalles réguliers dessus — le rail
 * est un schéma de lecture, pas une carte à l'échelle.
 */
const TRACE =
  'M 80 18 C 128 118 30 198 52 300 C 74 402 132 442 112 542 C 92 642 26 682 44 782 C 62 882 100 902 82 982';

const sectionEl = ref<HTMLElement | null>(null);
const svgEl = ref<SVGSVGElement | null>(null);
const routeEl = ref<SVGPathElement | null>(null);
const haloEl = ref<SVGPathElement | null>(null);
const veloEl = ref<SVGGElement | null>(null);

/**
 * Les six chapitres, relevés dans le DOM au montage. Une `ref` de fonction sur
 * le `v-for` remplissait un tableau qui restait incomplet au moment où le
 * premier calcul de position en avait besoin, et le rail restait figé sur le
 * premier acte. Une requête directe, faite une fois le composant monté, ne
 * dépend d'aucun ordre d'appel.
 */
let chapitres: HTMLElement[] = [];

/** Position de chaque jalon sur le tracé, en unités du viewBox. */
const points = ref<{ x: number; y: number }[]>([]);
const indexActif = ref(0);
/** Avancement global dans le récit, de 0 à 1. Alimente la jauge mobile. */
const avancement = ref(0);
/** Mode statique : tracé entier visible, pas de vélo. `prefers-reduced-motion`. */
const statique = ref(true);
/** Le vélo n'apparaît qu'une fois sa première position calculée. */
const veloPret = ref(false);

const acteCourant = computed(() => actes[indexActif.value]);

/**
 * Vrai pour la photo qui occupe les deux colonnes. Un nombre impair de photos
 * laisserait sinon un trou dans la grille : la première passe en pleine
 * largeur et les suivantes se rangent deux par deux.
 */
const pleineLargeur = (photos: unknown[], j: number) => photos.length % 2 === 1 && j === 0;

/**
 * Le cadrage d'une vignette, en trois temps. Toutes nos photos sont plus
 * « hautes » que leur cadre : `object-cover` les rogne donc en hauteur et
 * jamais en largeur, et `object-position` ne peut les déplacer que sur l'axe
 * vertical. Recadrer horizontalement suppose d'agrandir d'abord.
 *
 *   1. `cadrage`      quelle bande de la photo entre dans la vignette
 *   2. `zoom`         on agrandit cette bande
 *   3. `deplacement`  on se déplace dedans, au plus ±(zoom−1)/2 avant de
 *                     découvrir le fond — ce que le cadrage a coupé est perdu
 *                     pour le déplacement, l'agrandissement porte sur la
 *                     vignette, pas sur la photo d'origine.
 *
 * `scale` et `translate` plutôt qu'un `transform` : ce sont des propriétés
 * distinctes, elles se composent avec le `hover:scale-[1.03]` de la classe au
 * lieu de l'écraser.
 */
const styleVignette = (photo: { cadrage?: string; zoom?: number; deplacement?: string }) => ({
  objectPosition: photo.cadrage || 'center',
  scale: photo.zoom ? String(photo.zoom) : undefined,
  translate: photo.deplacement || undefined,
});

onMounted(() => {
  let detacher: (() => void) | null = null;
  onBeforeUnmount(() => detacher?.());

  const route = routeEl.value;
  const halo = haloEl.value;
  const velo = veloEl.value;
  if (!route || !halo || !velo || !svgEl.value || !sectionEl.value) return;

  chapitres = Array.from(sectionEl.value.querySelectorAll<HTMLElement>('article.acte'));

  const total = route.getTotalLength();
  const segments = actes.length - 1;

  // Six appels au montage, contre les ~51 000 qu'avait coûtés la carte avant
  // précalcul : ici la mesure est négligeable et la géométrie ne bouge jamais.
  points.value = actes.map((_, i) => {
    const p = route.getPointAtLength((i / segments) * total);
    return { x: p.x, y: p.y };
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // `statique` reste vrai : tracé complet, pas de vélo. Reste à suivre
    // l'acte courant, pour que les liens du rail et le compteur restent justes.
    detacher = suivre((t) => {
      indexActif.value = Math.min(segments, Math.floor(t));
      avancement.value = t / segments;
    });
    return;
  }

  statique.value = false;

  for (const p of [route, halo]) {
    p.style.strokeDasharray = `${total}`;
    p.style.strokeDashoffset = `${total}`;
  }
  detacher = suivre((t) => {
    indexActif.value = Math.min(segments, Math.floor(t));
    avancement.value = t / segments;

    const len = (t / segments) * total;
    const pt = route.getPointAtLength(len);
    velo.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
    veloPret.value = true;
    route.style.strokeDashoffset = `${total - len}`;
    halo.style.strokeDashoffset = `${total - len}`;
  });
});

/**
 * Suit la position de lecture et appelle `rendu(t)`, où `t` va de 0 (premier
 * acte) à `actes.length - 1` (dernier acte), en continu entre les deux.
 *
 * La position de lecture est prise à 45 % de la hauteur de l'écran : c'est la
 * ligne où l'œil se trouve quand un titre d'acte vient d'arriver. Repère fixe
 * plutôt que ScrollTrigger, pour la même raison que sur la carte — pas de
 * ticker rAF qui se fige quand l'onglet passe en arrière-plan.
 */
function suivre(rendu: (t: number) => void) {
  const dernier = actes.length - 1;

  const update = () => {
    if (chapitres.length <= dernier) return;
    const ligne = window.scrollY + window.innerHeight * 0.45;
    const hauts = chapitres.map((el) => el.getBoundingClientRect().top + window.scrollY);

    let t = 0;
    if (ligne >= hauts[dernier]) t = dernier;
    else if (ligne > hauts[0]) {
      const i = hauts.findIndex((h, k) => k < dernier && ligne >= h && ligne < hauts[k + 1]);
      const j = i === -1 ? 0 : i;
      t = j + (ligne - hauts[j]) / (hauts[j + 1] - hauts[j] || 1);
    }
    rendu(t);
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();

  return () => {
    window.removeEventListener('scroll', update);
    window.removeEventListener('resize', update);
  };
}
</script>
