<template>
  <div class="mx-20">
    <section class="mt-32" >
      <h2 class="font-semibold text-3xl text-secondary">Un défi sportif ambitieux</h2>
      <AccueilChiffresCles />
    </section>

    <section class="mt-24">
      <h2 class="font-semibold text-3xl text-secondary">Un tour de France pour les enfants hospitalisés</h2>

      <div class="flex flex-col md:flex-row w-full" >
        <img class="w-1/2 h-auto object-contain" src="/1ere-edition/map.png" alt="">

        <div class="w-1/2" >
          <AccueilEtapes />
        </div>
      </div>
    </section>

    <section class="mt-24">
      <h2 class="font-semibold text-3xl text-secondary">Nous récoltons des dons pour améliorer le bien-être des patients et de leur famille</h2>

      <AccueilDons />
    </section>

    <section class="mt-24">
      <h2 class="font-semibold text-3xl text-secondary">Calendrier des manifestations</h2>

      <AccueilCalendrier />
    </section>

    <section class="mt-24">
      <h2 class="font-semibold text-3xl text-secondary">Nos partenaires</h2>

      <AccueilCarouselPartenaire />
    </section>
  </div>
</template>

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
