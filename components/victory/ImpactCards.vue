<template>
  <section class="section-padding">
    <div class="max-w-6xl mx-auto">
      <h2 class="title-victory text-center">Ce que vos dons ont changé</h2>
      <p class="mt-4 text-center text-gray-600 max-w-2xl mx-auto text-lg">
        Chaque euro récolté a pris vie entre les murs de l'hôpital. Voici ce que vous avez rendu possible.
      </p>

      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="card in cards" :key="card.title" class="impact-card card-victory group opacity-0 translate-y-8">
          <div v-if="card.image" class="relative h-48 -m-6 md:-m-8 mb-4 md:mb-6 rounded-t-2xl overflow-hidden">
            <NuxtImg
              :src="card.image"
              :alt="card.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              format="webp"
              quality="80"
              width="768"
              height="384"
              loading="lazy"
            />
          </div>
          <div class="flex items-start gap-3">
            <span class="text-primary text-xl mt-0.5">&#10003;</span>
            <div>
              <h3 class="font-bold text-secondary text-lg">{{ card.title }}</h3>
              <p class="text-sm font-semibold text-secondary/70 mt-1">{{ card.subtitle }}</p>
              <p class="mt-2 text-gray-600 text-sm leading-relaxed">{{ card.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';

const { staggerCards } = useScrollAnimation();

onMounted(() => {
  staggerCards('.impact-card', { stagger: 0.12, y: 40 });
});

const cards = [
  {
    title: 'Tablettes tactiles',
    subtitle: 'Des fenêtres sur le monde',
    description: 'Des tablettes tactiles pour que les enfants hospitalisés puissent jouer, apprendre et rester connectés à leurs proches. Un petit écran qui ouvre de grands horizons quand les murs de l\'hôpital deviennent le quotidien.',
    image: '/hopital-necker-visite/tablette.webp',
  },
  {
    title: 'Fresques murales',
    subtitle: 'Des couloirs qui racontent des histoires',
    description: 'Des fresques murales colorées ont transformé les couloirs froids de l\'hôpital en un monde imaginaire. Parce qu\'un enfant qui marche vers sa chambre mérite de croiser des étoiles, pas du blanc stérile.',
    image: '/hopital-necker-visite/fresque.webp',
  },
  {
    title: 'Fauteuils-lits',
    subtitle: 'Rester auprès d\'eux',
    description: 'Dix fauteuils-lits pour que les parents puissent dormir auprès de leur enfant. Parce qu\'aucune famille ne devrait choisir entre veiller sur son enfant et s\'effondrer d\'épuisement.',
    image: '/hopital-necker-visite/fauteuil-lit.webp',
  },
  {
    title: 'Salon des parents',
    subtitle: 'Un refuge pour les familles',
    description: 'Un salon des parents entièrement aménagé : un lieu chaleureux où souffler, échanger, se retrouver entre parents qui se comprennent sans avoir besoin de mots.',
    image: null,
  },
  {
    title: 'Animations',
    subtitle: 'Deux semaines de rires',
    description: 'Deux semaines complètes d\'animation pour les enfants hospitalisés. Des spectacles, des ateliers, des moments de joie pure qui font oublier, ne serait-ce qu\'un instant, la maladie.',
    image: null,
  },
  {
    title: 'Décoration de services',
    subtitle: 'Deux services transformés',
    description: 'Deux services hospitaliers entièrement décorés et repensés pour devenir des espaces de vie, pas seulement de soins. Des couleurs, de la douceur, de l\'humanité dans chaque détail.',
    image: null,
  },
];
</script>
