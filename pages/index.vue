<template>
  <div class="mx-6 md:mx-40">
    <p class="quote mt-10 mx-4 md:mx-20 text-lg text-secondary text-justify">Nous sommes deux étudiants de l’Oise à mener un défi à la fois sportif et caritatif. Nous avons créé l’association Rouler pour aider en 2019 afin de récolter des dons pour l’Hôpital Necker – Enfants malades AP-HP à Paris. Cette récolte de dons, nous voulons la mener avec un défi sportif d’ampleur car nous sommes convaincus que le sport est un des meilleurs moyens de nous rassembler et véhicule des valeurs de solidarité et de dépassement qui collent parfaitement avec ce pour quoi nous agissons.</p>
    <section class="mt-10" >
      <h2 class="font-semibold text-3xl text-secondary title-underline">Un défi sportif ambitieux</h2>
      <!-- TODO : rajouter le text du qui sommes nous -->
      <AccueilChiffresCles />
    </section>

    <section class="mt-24">
      <h2 class="font-semibold text-3xl text-secondary title-underline">Un tour de France pour les enfants hospitalisés</h2>

      <div class="flex flex-col md:flex-row w-full mt-6 md:mt-6" >
      <!-- TODO : Add le filigranne que j'ai déjà -->
        <div class="w-full md:w-1/2 h-auto flex flex-col justify-around items-center" >
          <img src="/velo.png" alt="" class="w-max">
          <img class="object-contain" src="/1ere-edition/map.png" alt="">
          <img src="/velo.png" alt="" class="w-max" >
        </div>

        <div class="w-full md:w-1/2" >
          <AccueilEtapes />
        </div>
      </div>
    </section>
      <section class="mt-24 snap-start">
        <h2 class="font-semibold text-2xl md:text-3xl text-secondary title-underline">Nous récoltons des dons pour améliorer le bien-être des patients et de leur famille</h2>

        <AccueilDons />
      </section>

      <section class="mt-24 snap-start ">
        <h2 class="font-semibold text-3xl text-secondary title-underline">Calendrier des manifestations</h2>

        <AccueilCalendrier />
      </section>

    <section class="mt-24">
      <h2 class="font-semibold text-3xl text-secondary title-underline">Nos partenaires</h2>

      <AccueilCarouselPartenaire />
    </section>
  </div>
</template>

<style scoped>
.scroll-snap-type {
  scroll-snap-type: y mandatory;
  overflow-y: auto; /* Ensure the container can scroll */
  height: 100%; 
}

.quote::before {
  content: "“";
  font-size: 3em;
  top: -10px;
  left: -20px;
  color: #72BC7A;
}

</style>

<script setup lang="ts">
definePageMeta({
  layout: "accueil",
});
// useSeoMeta({
//   title: 'LMLC COMMUNICATION',
//   ogTitle: 'My Amazing Site',
//   description: 'This is my amazing site, let me tell you all about it.',
//   ogDescription: 'This is my amazing site, let me tell you all about it.',
//   ogImage: 'https://example.com/image.png',
//   twitterCard: 'summary_large_image',
// });


</script>
