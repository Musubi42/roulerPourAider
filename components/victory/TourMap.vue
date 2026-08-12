<template>
  <section
    ref="sectionEl"
    class="relative bg-warm-cream"
    :style="{ height: staticMode ? 'auto' : `${scrollHeightVh}vh` }"
  >
    <div
      class="flex flex-col items-center justify-center overflow-hidden"
      :class="
        staticMode
          ? 'py-20'
          : ['sticky top-0 h-[100svh]', headerOffset ? 'pt-16' : '']
      "
    >
      <!-- px-3 en dessous de `lg` : chaque pixel horizontal rendu ici agrandit
           d'autant la carte, qui est la raison d'être de la section. -->
      <div class="w-full max-w-6xl px-3 lg:px-8">
        <header class="text-center">
          <!-- text-2xl sur mobile : en text-3xl le titre passait sur deux
               lignes et mangeait la hauteur dont la carte a besoin. -->
          <h2 class="title-victory text-center !text-2xl sm:!text-3xl md:!text-4xl">
            {{ mapData.totalKm.toLocaleString('fr-FR') }} km à travers la France
          </h2>
          <p class="mt-2 md:mt-3 text-gray-600 text-xs sm:text-sm md:text-base">
            Du 7 au 25 juillet 2024, au départ et à l'arrivée de
            Verneuil-en-Halatte, en 18 étapes.
          </p>
        </header>

        <div class="mt-4 md:mt-6 flex flex-col lg:flex-row lg:items-center gap-4 md:gap-6 lg:gap-10">
          <!-- ── La carte ─────────────────────────────────────────────── -->
          <!-- Bornée en vh : la carte doit tenir dans l'écran sticky avec le
               titre au-dessus, sinon la silhouette déborde. En cadrage serré
               la France est quasi carrée, donc la borne verticale est plus
               contraignante qu'en cadrage large. -->
          <div class="relative w-full lg:flex-1 mx-auto max-w-[min(40vh,28rem)] lg:max-w-[min(76vh,40rem)]">
            <svg
              :viewBox="`${vb.x} ${vb.y} ${vb.width} ${vb.height}`"
              class="w-full h-auto"
              role="img"
              :aria-label="`Carte du parcours 2024 : ${mapData.etapes.length} étapes en boucle au départ et à l'arrivée de Verneuil-en-Halatte, ${mapData.totalKm} km`"
            >
              <defs>
                <!-- La silhouette de la France sert de masque aux photos d'étape -->
                <clipPath id="tourmap-france">
                  <path :d="mapData.outline" />
                </clipPath>
                <!-- Voile creme : il eclaircit la photo vers les bords, pour que
                     le tracé bleu et les étiquettes gardent leur fond. Meme role
                     que le voile navy de la version sur fond sombre, inverse. -->
                <linearGradient id="tourmap-veil" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#FFF8F0" stop-opacity="0.34" />
                  <stop offset="55%" stop-color="#FFF8F0" stop-opacity="0.12" />
                  <stop offset="100%" stop-color="#FFF8F0" stop-opacity="0.4" />
                </linearGradient>
              </defs>

              <g clip-path="url(#tourmap-france)">
                <!-- Fond vert du logo : ce qu'on voit avant qu'une photo charge -->
                <rect :x="vb.x" :y="vb.y" :width="vb.width" :height="vb.height" fill="#72BC7A" />
                <!-- Deux calques qui alternent en fondu : une seule photo en vol à la fois -->
                <image
                  v-for="(layer, li) in layers"
                  :key="li"
                  :href="layer.href || undefined"
                  :x="vb.x"
                  :y="vb.y"
                  :width="vb.width"
                  :height="vb.height"
                  preserveAspectRatio="xMidYMid slice"
                  class="tourmap-photo transition-opacity duration-500 ease-out"
                  :style="{ opacity: layer.href && frontLayer === li ? 1 : 0 }"
                />
                <!-- La version sur fond navy posait ici un `multiply` navy, en
                     plus du degradé. Sur fond clair, l'équivalent (`screen`
                     creme) ne change quasiment rien : mesuré à l'écran, l'écart
                     est invisible. Le degradé ci-dessous suffit à poser
                     l'atmosphère, donc une couche de moins — et un
                     `mix-blend-mode` de moins, dont le fond de reference depend
                     de subtilites d'isolation des groupes SVG. -->
                <rect
                  :x="vb.x"
                  :y="vb.y"
                  :width="vb.width"
                  :height="vb.height"
                  fill="url(#tourmap-veil)"
                />
              </g>

              <!-- Contour, à l'épaisseur du logo -->
              <path
                :d="mapData.outline"
                fill="none"
                stroke="#72BC7A"
                stroke-width="3"
                stroke-linejoin="round"
              />

              <!-- Le tracé complet, en filigrane : le parcours reste lisible d'un coup d'œil -->
              <path
                :d="mapData.route"
                fill="none"
                stroke="#2A5FA4"
                stroke-opacity="0.28"
                stroke-width="4"
                stroke-linecap="round"
                stroke-dasharray="10 9"
              />

              <!-- Halo creme sous le tracé parcouru. Meme role que le `stroke`
                   des étiquettes : la photo qui remplit la silhouette a une
                   luminosite imprevisible — 18 étapes, dont des cols en
                   sous-bois et des contre-jours. Sans lui, le bleu tombe sous
                   2:1 sur une photo sombre et le tracé, qui est la raison d'etre
                   de la section, disparait. Il suit exactement le meme
                   devoilement que le tracé qu'il souligne. -->
              <path
                ref="routeHaloEl"
                :d="mapData.route"
                fill="none"
                stroke="#FFF8F0"
                stroke-opacity="0.85"
                stroke-width="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <!-- Le chemin déjà parcouru, révélé au scroll.
                   En bleu et non en or : sur le creme, l'or tombe a ~2:1 de
                   contraste et le tracé se dissout dans le fond. Le bleu de la
                   charte tient la lecture, et l'or reste ou il porte — le vélo,
                   la barre de progression, le compteur de kilomètres. -->
              <path
                ref="routeEl"
                :d="mapData.route"
                fill="none"
                stroke="#2A5FA4"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <!-- Les 18 étapes -->
              <g v-for="(e, i) in mapData.etapes" :key="e.slug">
                <circle
                  :cx="e.x"
                  :cy="e.y"
                  :r="i === activeIndex ? 11 : 6"
                  :fill="i <= activeIndex ? '#2A5FA4' : '#FFF8F0'"
                  stroke="#2A5FA4"
                  stroke-width="2.5"
                  class="transition-all duration-300"
                />
                <!-- Halo creme derriere le texte (`paint-order: stroke`) : la
                     photo qui remplit la silhouette n'a pas de luminosite
                     garantie, le nom doit rester lisible quelle qu'elle soit. -->
                <text
                  v-if="showLabel(i)"
                  :x="e.x + labelDx(e, i)"
                  :y="e.y + labelDy(e, i)"
                  :text-anchor="labelAnchor(e)"
                  class="pointer-events-none select-none font-semibold"
                  :class="i === activeIndex ? 'fill-navy' : 'fill-navy/65'"
                  :style="{ fontSize: i === activeIndex ? '22px' : '17px' }"
                  paint-order="stroke"
                  stroke="#FFF8F0"
                  stroke-width="4"
                  stroke-linejoin="round"
                >
                  {{ e.ville }}
                </text>
              </g>

              <!-- Le vélo. Dessiné en primitives SVG plutôt qu'en emoji : un
                   emoji dépend de la police du système et rend n'importe quoi. -->
              <g v-show="!staticMode" ref="riderEl" style="opacity: 0">
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
          </div>

          <!-- ── La fiche d'étape ─────────────────────────────────────── -->
          <aside class="w-full lg:w-80 lg:flex-shrink-0">
            <div v-if="!staticMode" class="card-victory">
              <!-- En bleu et non en or : a cette taille (12 px), l'or sur creme
                   ne passe pas le AA. L'or est garde pour les grands chiffres,
                   ou le seuil est celui du gros texte — c'est la meme regle que
                   dans StatCounter. -->
              <!-- `secondary` plein, sans opacite : a 12 px on est sous le seuil
                   « gros texte », donc il faut 4,5:1. Le meme bleu a 70 % tombe
                   a 3,34:1 et echoue, pour un ecart visuel negligeable. -->
              <p class="text-secondary text-xs font-bold tracking-[0.18em] uppercase">
                Étape {{ active.numero }} sur {{ mapData.etapes.length }}
              </p>
              <h3 class="mt-2 text-secondary text-xl md:text-2xl font-bold leading-tight">
                {{ active.ville }}
              </h3>

              <!-- Trajet et distance sur une même ligne : on lit d'un coup
                   « Béziers vers Avignon, 215 km ». -->
              <div class="mt-1 flex items-baseline justify-between gap-4">
                <p v-if="active.arriveeVers" class="text-gray-600">
                  vers {{ active.arriveeVers }}
                </p>
                <p v-else class="text-gray-600">Arrivée</p>
                <!-- « ≈ » sur les 5 étapes dont l'association n'a jamais
                     publié le kilométrage : la valeur est estimée, on le dit. -->
                <p
                  class="text-secondary font-bold whitespace-nowrap"
                  :title="active.estime ? 'Distance estimée : non communiquée par l\'association' : undefined"
                >
                  {{ active.estime ? '≈ ' : '' }}{{ active.distanceKm }} km
                </p>
              </div>

              <a
                v-if="active.fbUrl"
                :href="active.fbUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-secondary/25 bg-secondary/5 px-4 text-sm text-secondary transition-colors hover:border-secondary/50 hover:bg-secondary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                Voir le récit de l'étape
                <span aria-hidden="true">↗</span>
              </a>

              <div class="mt-5 h-1 rounded-full bg-secondary/15 overflow-hidden">
                <div
                  class="h-full bg-gold transition-[width] duration-200 ease-out"
                  :style="{ width: `${Math.round(progress * 100)}%` }"
                />
              </div>

              <!-- Le compteur monte vers les 3 000 km à mesure du scroll. -->
              <!-- Le compteur est le « chiffre du bilan » de cette section : c'est
                   lui qui porte l'or, en gros et en gras — la seule forme sous
                   laquelle l'or tient le contraste sur fond clair. -->
              <div class="mt-2 flex items-baseline justify-between">
                <p class="text-gold text-xl font-black tabular-nums">
                  {{ kmDone.toLocaleString('fr-FR') }} km
                </p>
                <p class="text-gray-500 text-sm tabular-nums">
                  sur {{ mapData.totalKm.toLocaleString('fr-FR') }}
                </p>
              </div>
            </div>

            <!-- Repli : sans animation, on liste le parcours en clair -->
            <ol v-else class="text-gray-700 text-sm space-y-1 columns-2 gap-6">
              <li v-for="e in mapData.etapes" :key="e.slug">
                <span class="text-secondary font-bold">{{ e.numero }}.</span>
                {{ e.ville }} → {{ e.arriveeVers }}
                <span class="text-gray-500">
                  · {{ e.estime ? '≈' : '' }}{{ e.distanceKm }} km
                </span>
              </li>
            </ol>
          </aside>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import mapData from '~/data/map-2024.json';

withDefaults(
  defineProps<{
    /**
     * Réserve la hauteur du header `fixed` du layout au-dessus du titre.
     * À passer à `false` sur une page sans header, sinon la carte est
     * inutilement tassée vers le bas.
     */
    headerOffset?: boolean;
  }>(),
  { headerOffset: true }
);

/** Hauteur de la zone traversée, en vh. ~20vh de scroll par étape. */
const scrollHeightVh = 420;

type Etape = (typeof mapData.etapes)[number];

const etapes = mapData.etapes as Etape[];

/**
 * En dessous de `lg`, la carte passe au cadrage serré et les étiquettes de
 * villes disparaissent. À cette largeur elles ne font que ~8 px de haut —
 * illisibles — et la ville active est de toute façon écrite en gros dans la
 * fiche juste en dessous. Les masquer libère les 130 unités de réserve
 * latérale de chaque côté, soit 27 % de largeur rendue à la France.
 */
const compact = ref(false);

const vb = computed(() => (compact.value ? mapData.viewBoxTight : mapData.viewBox));

const sectionEl = ref<HTMLElement | null>(null);
const routeEl = ref<SVGPathElement | null>(null);
/** Le halo clair sous le tracé : meme geometrie, meme devoilement. */
const routeHaloEl = ref<SVGPathElement | null>(null);
const riderEl = ref<SVGGElement | null>(null);

const activeIndex = ref(0);
const progress = ref(0);
/** Kilomètres parcourus au point où on en est du scroll. */
const kmDone = ref(0);
/** Mode statique : tout le tracé visible, aucune animation. */
const staticMode = ref(true);

const active = computed(() => etapes[activeIndex.value]);

// Deux calques d'image qui alternent : on ne charge la photo qu'au moment
// où l'étape devient active, jamais les 18 d'un coup (4,9 Mo au total).
const layers = ref<{ href: string | null }[]>([{ href: null }, { href: null }]);
const frontLayer = ref(0);
const loaded = new Map<string, boolean>();

function showPhoto(src: string) {
  const back = 1 - frontLayer.value;
  const swap = () => {
    layers.value[back].href = src;
    frontLayer.value = back;
  };
  if (loaded.get(src)) return swap();
  const img = new Image();
  img.onload = () => {
    loaded.set(src, true);
    // Sur un scroll rapide, l'image peut arriver alors qu'on a déjà dépassé
    // son étape : l'afficher ferait revenir la carte en arrière.
    if (etapes[activeIndex.value].photo !== src) return;
    swap();
  };
  img.src = src;
}

watch(activeIndex, (i) => {
  showPhoto(etapes[i].photo);

  // On amorce les DEUX étapes suivantes pendant qu'on regarde l'actuelle.
  // Chaque étape occupe ~23vh de scroll et une photo met environ 750 ms à
  // arriver en 4G lente : une seule étape d'avance ne couvre pas la latence
  // dès qu'on descend un peu vite, et la carte reste sur son aplat vert.
  // Deux d'avance coûtent un fichier de plus en vol, ~90 Ko.
  for (const suivante of [etapes[i + 1], etapes[i + 2]]) {
    if (!suivante || loaded.get(suivante.photo)) continue;
    const img = new Image();
    img.onload = () => loaded.set(suivante.photo, true);
    img.src = suivante.photo;
  }
});

// ── Étiquettes ───────────────────────────────────────────────────────────
// On n'affiche que l'étape active, plus Verneuil-en-Halatte comme repère fixe :
// le tour est une boucle, la ville y est à la fois le départ et l'arrivée.
// Afficher les 18 étiquettes simultanément les rendait illisibles.
const ANCHORS = new Set([0]);
const showLabel = (i: number) =>
  !compact.value && (staticMode.value || i === activeIndex.value || ANCHORS.has(i));

// L'étape active porte le vélo (rayon 19) par-dessus son point : son étiquette
// doit s'écarter davantage, sinon le marqueur mord dessus.
const gap = (i: number) => (i === activeIndex.value ? 28 : 14);
const labelDx = (e: Etape, i: number) =>
  e.label === 'left' ? -gap(i) : e.label === 'right' ? gap(i) : 0;
const labelDy = (e: Etape, i: number) => (e.label === 'bottom' ? gap(i) + 20 : 6);
const labelAnchor = (e: Etape) =>
  e.label === 'left' ? 'end' : e.label === 'right' ? 'start' : 'middle';

// ── Lecture au scroll ────────────────────────────────────────────────────
onMounted(async () => {
  // Enregistré AVANT tout `await` : passé le premier point d'attente, Vue a
  // perdu l'instance courante et `onBeforeUnmount` ne s'accrocherait à rien —
  // les écouteurs de scroll survivraient alors au démontage du composant.
  let cleanup: (() => void) | null = null;
  onBeforeUnmount(() => cleanup?.());

  // Bascule du cadrage large/serré. Le seuil est celui de `lg` en Tailwind,
  // le même que celui où la fiche d'étape passe à côté de la carte plutôt
  // qu'en dessous. Déclaré avant le repli `prefers-reduced-motion` pour que
  // le mode statique en profite aussi.
  const mq = window.matchMedia('(max-width: 1023px)');
  const onMq = (e: MediaQueryListEvent | MediaQueryList) => (compact.value = e.matches);
  onMq(mq);
  mq.addEventListener('change', onMq);
  cleanup = () => mq.removeEventListener('change', onMq);

  const path = routeEl.value;
  const halo = routeHaloEl.value;
  const rider = riderEl.value;
  if (!path || !halo || !rider || !sectionEl.value) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showPhoto(etapes[0].photo);
    return; // staticMode reste vrai : tracé complet, pas de vélo, liste des étapes
  }

  const total = path.getTotalLength();

  // Position de chaque ville le long du tracé, en fraction de la longueur
  // totale — 19 valeurs pour 18 étapes, la dernière étant le retour à Verneuil.
  //
  // Ces fractions sont PRÉCALCULÉES par `utils/buildMap.mjs`, qui connaît les
  // Bézier puisqu'il les génère. Le composant les cherchait auparavant à coups
  // de ~51 000 `getPointAtLength()` au montage, soit 150 à 600 ms de blocage du
  // thread principal sur un mobile — inacceptable pour un composant destiné à
  // la page d'accueil. La géométrie ne bougeant jamais, ce travail n'avait rien
  // à faire dans le navigateur.
  const stageLengths = (mapData.stageProgress as number[]).map((f) => f * total);

  staticMode.value = false;
  // La hauteur de la section dépend de `staticMode` : sans ce nextTick, on
  // mesurerait une section encore en hauteur `auto`, donc sans course.
  await nextTick();

  for (const p of [path, halo]) {
    p.style.strokeDasharray = `${total}`;
    p.style.strokeDashoffset = `${total}`;
  }
  rider.style.opacity = '1';

  // Une « part de scroll » par étape, et non par intervalle entre villes : la
  // 18e étape ramène à Verneuil, elle a donc sa propre part comme les autres.
  const segments = etapes.length;

  const render = (p: number) => {
    progress.value = p;

    // Chaque étape occupe la même part de scroll — sinon les étapes courtes
    // défileraient trop vite pour qu'on lise la photo.
    const t = Math.min(p * segments, segments - 1e-6);
    const seg = Math.floor(t);
    const frac = t - seg;
    const len = stageLengths[seg] + frac * (stageLengths[seg + 1] - stageLengths[seg]);

    // Le vélo ne pivote pas : orienté sur la tangente, il finirait la tête en
    // bas sur toute la remontée vers le nord. Un marqueur de carte reste droit.
    const pt = path.getPointAtLength(len);
    rider.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
    path.style.strokeDashoffset = `${total - len}`;
    halo.style.strokeDashoffset = `${total - len}`;

    // Le compteur suit la position réelle sur le tracé, pas l'étape active :
    // il monte de façon continue au lieu de sauter d'une ville à l'autre.
    kmDone.value = Math.round(etapes[seg].cumulKm + frac * etapes[seg].distanceKm);

    // La photo bascule à mi-chemin : on arrive « avec » la ville suivante.
    // Borné à la dernière étape : au bout du scroll, on est sur Reims →
    // Verneuil, pas sur une 19e étape qui n'existe pas.
    activeIndex.value = Math.min(Math.round(p * segments), segments - 1);
  };

  // La progression se déduit de la position de la section : tant qu'elle
  // occupe l'écran en `sticky`, `rect.top` va de 0 à -(hauteur - viewport).
  // Aucun besoin de ScrollTrigger ici — et surtout aucun besoin du ticker rAF,
  // qui est mis en pause dès que l'onglet passe en arrière-plan (l'animation se
  // figeait alors, y compris à la vérification).
  const section = sectionEl.value;
  const update = () => {
    const rect = section.getBoundingClientRect();
    const course = rect.height - window.innerHeight;
    if (course <= 0) return;
    render(Math.min(1, Math.max(0, -rect.top / course)));
  };

  // Rien ne démarre tant que la section n'approche pas. Sans ça, sur la page
  // d'accueil, deux écouteurs de scroll tourneraient — chacun provoquant un
  // reflow via getBoundingClientRect à chaque frame — et une photo de ~90 Ko
  // partirait en concurrence directe avec l'image du hero, qui est le LCP.
  //
  // La marge d'un écran et demi laisse le temps de télécharger cette première
  // photo avant que la carte n'entre dans le champ, même en 4G.
  let demarre = false;
  const demarrer = () => {
    if (demarre) return;
    demarre = true;
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
    showPhoto(etapes[0].photo);
  };

  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        demarrer();
        io.disconnect();
      }
    },
    { rootMargin: '150% 0px' }
  );
  io.observe(section);

  const detacherMq = cleanup;
  cleanup = () => {
    detacherMq?.();
    io.disconnect();
    window.removeEventListener('scroll', update);
    window.removeEventListener('resize', update);
  };
});
</script>

<style scoped>
/* Volet « grayscale » du duotone. Le voile navy est posé par-dessus en SVG. */
.tourmap-photo {
  /* Transposition claire du duotone des heroes (ADR-013). La photo montre
     l'étape, elle doit rester lisible — mais elle est ECLAIRCIE au lieu d'etre
     assombrie, parce que ce qui passe par-dessus est maintenant sombre : tracé
     bleu et étiquettes navy. Sur le fond navy de la page de test, c'etait
     l'inverse (brightness 0.72) pour un tracé doré et des étiquettes blanches. */
  filter: grayscale(1) contrast(1.02) brightness(1.04);
}
</style>
