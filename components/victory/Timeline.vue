<template>
  <section class="section-padding">
    <div class="relative max-w-5xl mx-auto">
      <!-- Central vertical line.
           Centrage par marge, pas par translate : GSAP anime `transform`
           (scaleY ici) et ecraserait une classe -translate-x-*. -->
      <div
        class="timeline-line absolute left-6 md:left-1/2 md:ml-px top-0 bottom-0 w-0.5 bg-primary/30"
      />

      <!-- Timeline entries -->
      <div
        v-for="(entry, index) in entries"
        :key="entry.year"
        class="timeline-entry relative mb-16 last:mb-0 opacity-0 translate-y-8"
        :data-year="entry.year"
      >
        <!-- Year badge. -ml-7 = moitie de w-14 : centrage par marge, car GSAP
             anime `transform` (scale) et ecraserait -translate-x-1/2. -->
        <div
          class="timeline-badge absolute left-6 md:left-1/2 -ml-7 w-14 h-14 rounded-full bg-gold text-white font-bold text-sm flex items-center justify-center z-10 shadow-md"
        >
          {{ entry.year }}
        </div>

        <!-- Content card -->
        <div
          :class="[
            'timeline-card relative card-victory ml-16 md:ml-0',
            index % 2 === 0
              ? 'md:mr-[calc(50%+2.5rem)] md:ml-0'
              : 'md:ml-[calc(50%+2.5rem)] md:mr-0',
          ]"
        >
          <!-- Connector line (desktop only) -->
          <div
            :class="[
              'hidden md:block absolute top-6 w-8 h-0.5 bg-primary/30',
              index % 2 === 0 ? 'right-0 translate-x-full' : 'left-0 -translate-x-full',
            ]"
          />

          <h3 class="font-bold text-xl md:text-2xl text-secondary">{{ entry.title }}</h3>
          <p class="text-secondary/70 font-semibold text-sm mt-1">{{ entry.subtitle }}</p>

          <div class="mt-4 text-gray-600 leading-relaxed text-sm md:text-base space-y-3">
            <p v-for="(para, i) in entry.paragraphs" :key="i">{{ para }}</p>
          </div>

          <!-- Photos -->
          <div
            v-if="entry.photos && entry.photos.length"
            :class="[
              'mt-6 gap-3',
              entry.photos.length === 1 ? 'flex' : 'grid grid-cols-2',
            ]"
          >
            <div
              v-for="(photo, j) in entry.photos"
              :key="j"
              class="timeline-photo overflow-hidden rounded-xl shadow-sm opacity-0 translate-y-4"
            >
              <NuxtImg
                :src="photo.src"
                :alt="photo.alt"
                class="w-full h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-500"
                format="webp"
                quality="80"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';

const { fadeInOnScroll, bounceIn, drawLineOnScroll } = useScrollAnimation();

onMounted(() => {
  // Draw the timeline line progressively
  drawLineOnScroll('.timeline-line');

  // Bounce in year badges
  bounceIn('.timeline-badge');

  // Fade in timeline entries
  fadeInOnScroll('.timeline-entry', { y: 32, stagger: 0 });

  // Fade in photos with slight delay
  fadeInOnScroll('.timeline-photo', { y: 16, stagger: 0.1 });
});

interface TimelinePhoto {
  src: string;
  alt: string;
}

interface TimelineEntry {
  year: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  photos?: TimelinePhoto[];
}

const entries: TimelineEntry[] = [
  {
    year: '2019',
    title: 'Tout commence par une idée',
    subtitle: 'Le déclic',
    paragraphs: [
      'Deux étudiants de l\'Oise. Un café. Une conversation qui allait tout changer.',
      'Ils ne savaient pas encore combien de kilomètres les attendaient. Ils ne savaient pas que leur idée un peu folle allait mobiliser des milliers de personnes. Tout ce qu\'ils savaient, c\'est qu\'il fallait agir.',
      'Autour d\'eux, des enfants se battaient contre la maladie dans les murs de l\'Hôpital Necker \u2013 Enfants malades AP-HP. Et eux, ils avaient des jambes, un vélo, et une conviction\u00a0: le sport pouvait rassembler, fédérer, récolter. Rouler pour aider est né de cette certitude.',
      'En quelques mois, l\'association prend forme. Les premiers soutiens arrivent. Le premier défi se dessine. La route est longue, mais l\'envie est immense.',
    ],
  },
  {
    year: '2020',
    title: 'Première édition : Lille \u2013 Nice',
    subtitle: 'La preuve que c\'était possible',
    paragraphs: [
      'Lille. Un matin de départ. Le c\u0153ur qui bat, les jambes qui tremblent, et devant eux\u00a0: la France.',
      'Traverser le pays à vélo, du nord au sud, pour des enfants qu\'ils n\'avaient jamais rencontrés. C\'était ambitieux. C\'était peut-être un peu fou. Et c\'était magnifique.',
      'Ville après ville, les encouragements pleuvaient. Des inconnus qui klaxonnaient au bord des routes. Des familles qui tendaient des bouteilles d\'eau. Des donateurs qui, de chez eux, pédalaient avec eux.',
      'Quand ils ont vu la mer à Nice, ils savaient\u00a0: le pari était gagné. Plus de 33\u00a0000 euros récoltés. Une première victoire, pas seulement sportive. La preuve vivante qu\'on peut faire énormément avec de la volonté et un guidon.',
    ],
    photos: [
      { src: '/1ere-edition/depart-lille.webp', alt: 'Départ de Lille en 2020' },
      { src: '/1ere-edition/nice-celebration.webp', alt: 'Arrivée et célébration à Nice' },
    ],
  },
  {
    year: '2021-23',
    title: 'Le temps de la construction',
    subtitle: 'Grandir pour aller plus loin',
    paragraphs: [
      'Les années qui suivent ne sont pas des années de repos. Ce sont des années de travail dans l\'ombre.',
      'L\'association se structure. Les partenariats se nouent. Les ambitions grandissent. Les deux fondateurs ne lâchent rien. Ils savent que la première édition n\'était qu\'un début.',
      'Pendant ce temps, à Necker, les premiers dons prennent vie. Des tablettes arrivent dans les chambres. Des fresques colorent les murs. Des fauteuils-lits permettent aux parents de rester auprès de leurs enfants. Chaque don récolté en 2020 se transforme en sourire concret.',
      'Et déjà, un rêve plus grand se dessine\u00a0: le Tour de France. Pas celui des champions. Celui des c\u0153urs.',
    ],
    photos: [
      { src: '/hopital-necker-visite/tablette.webp', alt: 'Tablettes pour les enfants hospitalisés' },
      { src: '/hopital-necker-visite/fresque.webp', alt: 'Fresques murales à Necker' },
      { src: '/hopital-necker-visite/fauteuil-lit.webp', alt: 'Fauteuils-lits pour les parents' },
    ],
  },
  {
    year: 'Juil. 24',
    title: 'Le Tour de France',
    subtitle: '3\u00a0000 kilomètres pour les enfants',
    paragraphs: [
      '7 juillet 2024. Le départ est donné. 18 étapes. 3\u00a0000 kilomètres. Un tour de France complet à vélo pour les enfants de Necker.',
      'Cette fois, Rouler pour aider ne traverse pas la France. Rouler pour aider enlace la France.',
      'Le Ministère des Sports labellise le projet Grande Cause Nationale. Nelson Monfort apporte sa voix et son soutien. Les médias relaient l\'aventure. La France entière regarde ces cyclistes qui donnent tout, étape après étape, pour des enfants qui se battent.',
      'Chaque col gravi est une promesse tenue. Chaque ville traversée est un nouveau chapitre. Dans la pluie, sous le soleil, face au vent \u2013 rien n\'arrête ceux qui roulent pour les autres.',
      '18 étapes. 19 jours. Un été qui restera gravé.',
    ],
    photos: [
      { src: '/steps/paris.webp', alt: 'Départ de Paris' },
      { src: '/steps/plateau-de-beille.webp', alt: 'Ascension du Plateau de Beille' },
      { src: '/steps/annecy.webp', alt: 'Étape d\'Annecy' },
      { src: '/steps/lourdes.webp', alt: 'Étape de Lourdes' },
    ],
  },
  {
    year: '2024',
    title: 'L\'accomplissement',
    subtitle: '100\u00a0000 euros. Mission accomplie.',
    paragraphs: [
      'Le compteur s\'affole. Les dons affluent. Et quand le chiffre s\'affiche enfin \u2013 100\u00a0000 euros \u2013 le silence se fait. Puis les larmes. Puis les cris de joie.',
      '100\u00a0000 euros récoltés depuis la création de l\'association. 100\u00a0000 euros qui ne sont pas des chiffres, mais des tablettes dans les mains d\'enfants, des couleurs sur les murs, des parents qui peuvent dormir auprès de leur enfant malade.',
      'L\'objectif initial de 60\u00a0000 euros pour la deuxième édition est largement dépassé. L\'aventure Rouler pour aider s\'achève sur une victoire qui dépasse tous les rêves.',
      'Ce n\'est pas la fin d\'une histoire. C\'est l\'achèvement d\'une promesse.',
    ],
  },
];
</script>
