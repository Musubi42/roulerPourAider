<template>
  <div>
    <!-- ============================== -->
    <!-- HERO SECTION                   -->
    <!-- ============================== -->
    <VictoryPageHero
      eyebrow="Fondateurs, cyclistes, partenaires"
      titre="Ceux qui ont rendu tout cela possible"
      sous-titre="Derrière chaque kilomètre, il y a des visages."
      image="/medias/unamed_6bf1002668.webp"
      image-alt="Les trois cyclistes de l'édition 2020 posant avec leurs vélos"
      cadrage="50% 35%"
    />

    <!-- ============================== -->
    <!-- FOUNDERS SECTION               -->
    <!-- ============================== -->
    <section class="section-padding bg-warm-white">
      <div class="max-w-5xl mx-auto">
        <h2 class="title-victory text-center">Les fondateurs</h2>
        <p class="mt-4 text-center text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Ils avaient vingt ans, des études à finir, et une idée qui ne les laissait pas dormir.
        </p>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="founder in founders"
            :key="founder.name"
            class="card-victory relative overflow-hidden"
          >
            <!-- Gold accent corner -->
            <div class="absolute top-0 right-0 w-20 h-20 overflow-hidden">
              <div class="absolute top-0 right-0 w-28 h-28 -translate-y-1/2 translate-x-1/2 bg-primary/10 rounded-full"></div>
            </div>

            <!-- Initiales en attendant les portraits.
                 Cf. .planning/ACTIONS-HUMAINES.md § « Photos de l'équipe ». -->
            <div class="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-3xl font-bold text-white"
              :class="founder.bgClass"
            >
              {{ founder.initials }}
            </div>

            <div class="text-center mt-6">
              <h3 class="text-xl font-bold text-secondary">{{ founder.name }}</h3>
              <p class="text-sm text-secondary/70 font-semibold mt-1">{{ founder.role }}</p>
            </div>
          </div>
        </div>

        <div class="mt-12 max-w-3xl mx-auto space-y-4 text-gray-600 leading-relaxed text-base md:text-lg">
          <p>
            Des étudiants de l'Oise, liés par l'amitié et la conviction qu'on n'est jamais
            trop jeune pour agir. En 2019, ils créent Rouler pour aider. Ils sont trois au
            départ. Pas un projet scolaire, pas un coup de communication : une vraie
            association, avec un objectif précis &ndash; récolter des dons pour les enfants
            hospitalisés à Necker.
          </p>
          <p>
            Ils ne connaissaient rien au monde associatif. Ils ont tout appris en route,
            au sens propre comme au figuré : démarcher des partenaires, organiser la
            logistique d'une traversée de France, gérer des dons, obtenir un label
            ministériel.
          </p>
          <p class="font-semibold text-secondary">
            Cinq ans plus tard, le bilan est chiffré : 103&nbsp;847&nbsp;euros remis à
            l'Hôpital Necker, 4&nbsp;327&nbsp;kilomètres parcourus sur deux éditions,
            et un projet labellisé Grande Cause Nationale.
          </p>
        </div>
      </div>
    </section>

    <!-- ============================== -->
    <!-- CYCLISTS SECTION               -->
    <!-- ============================== -->
    <section class="section-padding bg-warm-cream">
      <div class="max-w-6xl mx-auto">
        <h2 class="title-victory text-center">Les cyclistes</h2>
        <p class="mt-4 text-center text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Ils ont accepté de souffrir dans les cols pour que des enfants souffrent un peu moins à l'hôpital.
        </p>

        <p class="mt-6 text-center text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Nos cyclistes ne sont pas des professionnels. Ce sont des hommes et des femmes ordinaires qui ont choisi de faire quelque chose d'extraordinaire. Kilomètre après kilomètre, ils ont porté notre message sur les routes de France.
        </p>

        <!--
          Les deux editions ne sont rendues que si l'on dispose des vrais noms.
          Tant que la liste est vide, on affiche une mention honnete plutot qu'une
          grille de cartes fantomes ou, pire, des noms inventes (cf. ADR-007).
        -->
        <div v-for="edition in editions" :key="edition.annee" class="mt-12">
          <h3 class="text-xl font-bold text-secondary text-center mb-8">
            <span class="border-b-2 border-primary pb-1">{{ edition.titre }}</span>
          </h3>

          <div
            v-if="edition.cyclistes.length"
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <div
              v-for="cyclist in edition.cyclistes"
              :key="cyclist.name"
              class="card-victory text-center p-4 md:p-6"
            >
              <div
                class="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-lg font-bold text-white"
                :class="edition.avatarClass"
              >
                {{ getInitials(cyclist.name) }}
              </div>
              <h4 class="mt-3 font-bold text-secondary text-sm md:text-base">{{ cyclist.name }}</h4>
            </div>
          </div>

          <p v-else class="text-center text-gray-500 max-w-xl mx-auto">
            {{ edition.resume }}
          </p>

          <p v-if="edition.note" class="mt-6 text-center text-sm text-gray-500 italic">
            {{ edition.note }}
          </p>
        </div>

        <!-- Le bureau : roles associatifs, distincts des fondateurs -->
        <div class="mt-16">
          <h3 class="text-xl font-bold text-secondary text-center mb-8">
            <span class="border-b-2 border-primary pb-1">Le bureau</span>
          </h3>
          <div class="flex flex-wrap justify-center gap-6">
            <div
              v-for="membre in bureau"
              :key="membre.name"
              class="card-victory text-center p-6 w-full sm:w-64"
            >
              <div
                class="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-lg font-bold text-white"
                :class="membre.bgClass"
              >
                {{ membre.initials }}
              </div>
              <h4 class="mt-3 font-bold text-secondary">{{ membre.name }}</h4>
              <p class="text-sm text-secondary/70 font-semibold">{{ membre.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================== -->
    <!-- CELEBRITY SUPPORTERS SECTION   -->
    <!-- ============================== -->
    <section class="section-padding bg-warm-white">
      <div class="max-w-5xl mx-auto">
        <h2 class="title-victory text-center">Nos soutiens</h2>
        <p class="mt-4 text-center text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Des personnalités ont cru en notre cause et nous ont prêté leur voix.
        </p>

        <div class="mt-6 max-w-3xl mx-auto text-center text-gray-600 leading-relaxed space-y-4">
          <p>
            Le label Grande Cause Nationale décerné par le Ministère des Sports, le soutien de personnalités du sport &ndash; tout cela a amplifié notre voix. Mais c'est votre générosité qui a fait la différence.
          </p>
        </div>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="supporter in celebrities"
            :key="supporter.name"
            class="card-victory text-center"
          >
            <div class="w-28 h-28 mx-auto rounded-full overflow-hidden bg-gray-100">
              <img
                v-if="supporter.photo"
                :src="supporter.photo"
                :alt="supporter.name"
                class="w-full h-full object-cover"
                width="112"
                height="112"
                loading="lazy"
                decoding="async"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center text-2xl font-bold text-white bg-secondary/60"
              >
                {{ getInitials(supporter.name) }}
              </div>
            </div>
            <h3 class="mt-4 font-bold text-secondary">{{ supporter.name }}</h3>
            <p class="text-sm text-secondary/70 font-semibold">{{ supporter.title }}</p>
          </div>
        </div>

        <!-- Gratitude message to all supporters -->
        <div class="mt-16 max-w-3xl mx-auto text-center space-y-4 text-gray-600 leading-relaxed">
          <p class="text-lg font-medium text-secondary">Et puis il y a vous.</p>
          <p>
            Vous qui avez fait un don un soir, parce qu'une publication vous a touché. Vous qui avez partagé notre histoire autour de vous. Vous qui avez encouragé nos cyclistes au bord d'une route, ou simplement envoyé un message de soutien.
          </p>
          <p>
            Vous qui n'avez peut-être jamais mis un pied à Necker, mais dont la générosité résonne aujourd'hui dans les rires d'un enfant qui joue sur sa tablette.
          </p>
          <p class="text-lg font-bold text-secondary mt-8">
            Chaque don, chaque partage, chaque mot d'encouragement nous a portés. Merci d'avoir été là.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
interface Founder {
  name: string;
  initials: string;
  role: string;
  bgClass: string;
}

interface Cyclist {
  name: string;
}

interface Celebrity {
  name: string;
  title: string;
  photo: string | null;
}

// Noms et roles issus de l'export Strapi du 11/08/2026, fige puis retire du
// depot : il contenait des adresses et des telephones personnels, et plus
// aucun code ne le lisait (ADR-009). Pour le reconsulter :
//   git show cdecfd1:data/strapi/contacts.json
// Les noms precedents (« Hugo Petrucci », « Maxence Gil ») etaient une
// recombinaison des donnees de demo de l'ancien Edition1/lesCyclistes.vue avec
// les vrais prenoms. Ne JAMAIS remonter d'email ou de telephone dans l'affichage.
// Hugo et Milan sont les deux fondateurs restants (ils etaient trois au depart).
// Yves Gerard n'est PAS fondateur : il administrait la tresorerie, et a pris part
// a l'edition 2024 comme cycliste. Il figure donc dans « le bureau », pas ici.
const founders: Founder[] = [
  {
    name: 'Hugo Nicaise',
    initials: 'HN',
    role: 'Président et co-fondateur',
    bgClass: 'bg-secondary',
  },
  {
    name: 'Milan Hrmo',
    initials: 'MH',
    role: 'Co-président et co-fondateur',
    bgClass: 'bg-primary',
  },
  // Le role exact reste a confirmer aupres de Hugo : il n'apparaissait pas dans
  // l'export Strapi, qui ne listait que le bureau en fin de vie de
  // l'association. « Co-fondateur » est le libelle le plus sur en attendant.
  // Cf. .planning/ACTIONS-HUMAINES.md
  {
    name: 'Alexandre Ioos',
    initials: 'AI',
    role: 'Co-fondateur',
    bgClass: 'bg-secondary/80',
  },
];

const bureau: Founder[] = [
  {
    name: 'Yves Gérard',
    initials: 'YG',
    role: 'Trésorier',
    bgClass: 'bg-secondary/70',
  },
];

// Les noms reels des cyclistes ne figurent dans aucune source recuperee a ce jour.
// Les anciens (« David Petrucci », « Malika Gil », « Erika Newton ») etaient des
// donnees de demo et ont ete retires : mieux vaut ne rien afficher que du faux.
// Cf. .planning/ACTIONS-HUMAINES.md
// Les deux editions n'ont pas roule avec le meme trio.
// 2020 : Hugo, Milan et Alexandre Ioos. Le nom du troisieme manquait a
//        l'export Strapi ; l'association l'a nomme elle-meme dans sa
//        publication de novembre 2024 (« nous y associons Alexandre Ioos avec
//        qui nous avons partage la premiere edition »). Source publique de
//        l'association, donc pas une reconstitution (ADR-012).
// 2024 : Hugo, Milan et Yves Gerard.
const cyclists2020: Cyclist[] = [
  { name: 'Hugo Nicaise' },
  { name: 'Milan Hrmo' },
  { name: 'Alexandre Ioos' },
];
const cyclists2024: Cyclist[] = [
  { name: 'Hugo Nicaise' },
  { name: 'Milan Hrmo' },
  { name: 'Yves Gérard' },
];

const editions = [
  {
    annee: 2020,
    titre: 'Édition 2020 — Lille à Nice',
    parcours: '1 327 km',
    cyclistes: cyclists2020,
    avatarClass: 'bg-primary/80',
    // La mention « un troisième cycliste a participé » n'a plus lieu d'être :
    // il est nommé, cf. `cyclists2020`.
    note: '',
    resume: '1 327 kilomètres parcourus du nord au sud de la France.',
  },
  {
    annee: 2024,
    titre: 'Édition 2024 — Tour de France',
    parcours: '3 000 km',
    cyclistes: cyclists2024,
    avatarClass: 'bg-secondary/80',
    note: '',
    resume: '3 000 kilomètres et 18 étapes, en boucle autour de la France.',
  },
];

const celebrities: Celebrity[] = [
  {
    name: 'Nelson Monfort',
    title: 'Journaliste sportif',
    photo: '/soutiens/nelson-monfort.webp',
  },
  {
    name: 'Stella Akakpo',
    title: 'Athlète',
    photo: '/soutiens/Stella-Akakpo.jpeg',
  },
  {
    name: 'Steve Chainel',
    title: 'Cycliste professionnel',
    photo: '/soutiens/Steve-Chainel.jpeg',
  },
  {
    name: 'Yoann Offredo',
    title: 'Cycliste professionnel',
    photo: '/soutiens/Yoann-Offredo.jpeg',
  },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}
</script>
