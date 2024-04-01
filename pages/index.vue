<template>
  <div class="mx-4">
    <section class="mt-32" >
      <h2 class="font-semibold text-3xl text-secondary">Un défi sportif ambitieux</h2>
      <AccueilChiffresCles />
    </section>

    <section class="mt-24">
      <h2 class="font-semibold text-3xl text-secondary">Un tour de France pour les enfants hospitalisés</h2>

      <div class="flex flex-col md:flex-row w-full mt-6 md:mt-6" >
        <img class="w-full md:w-1/2 h-auto object-contain" src="/1ere-edition/map.png" alt="">

        <div class="w-full md:w-1/2" >
          <AccueilEtapes />
        </div>
      </div>
    </section>

    <!-- .video-container { 
       height: 100vh; /* Set the container height to full viewport height */
      overflow-y: scroll; /* Enable vertical scrolling */
      scroll-snap-type: y mandatory; /* Enable snapping behavior */
      position: relative;
    }

    .video-item {
      height: 100vh; /* Each video item takes full viewport height */
      scroll-snap-align: start; /* Snap each video item to the start of the container */
    } -->

    <!-- TODO : Essayer de faire un snap pour rendre le tout sympa -->
    <!-- <div class="h-screen snap-y snap-mandatory relative overflow-y-scroll" > -->
      <section class="mt-24 snap-start">
        <h2 class="font-semibold text-2xl md:text-3xl text-secondary">Nous récoltons des dons pour améliorer le bien-être des patients et de leur famille</h2>

        <AccueilDons />
      </section>

      <section class="mt-24 snap-start ">
        <h2 class="font-semibold text-3xl text-secondary">Calendrier des manifestations</h2>

        <AccueilCalendrier />
      </section>
    <!-- </div> -->

    <section class="mt-24">
      <h2 class="font-semibold text-3xl text-secondary">Nos partenaires</h2>

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

</style>

<script setup lang="ts">
// useSeoMeta({
//   title: 'LMLC COMMUNICATION',
//   ogTitle: 'My Amazing Site',
//   description: 'This is my amazing site, let me tell you all about it.',
//   ogDescription: 'This is my amazing site, let me tell you all about it.',
//   ogImage: 'https://example.com/image.png',
//   twitterCard: 'summary_large_image',
// });


</script>
