<template>
  <div v-if="hero" class="hero-container flex w-full h-[80vh] bg-cover bg-no-repeat bg-center" 
    :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${ hero.heroImage })` }">
    <div class="breadcrumb-container">
      <BreadcrumbComponent />
    </div>
    <div class="content-container my-auto pl-20">
      <h1 class="font-bold text-5xl text-white">{{ hero.title }}</h1>
      <p class="text-white text-xl pb-5">{{ hero.description }}</p>
      <button v-if="hero.bouttonVisible" class="bg-white text-primary hover:text-white hover:bg-primary py-3 px-5 rounded-full">Faites un don</button>
    </div>
  </div>
  <!-- TODO: mieux gérer le chargement -->
  <div v-else class="hero-container flex w-full h-[80vh] bg-cover bg-no-repeat bg-center" 
    :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url('/default-hero-image.png')` }">
    <div class="breadcrumb-container">
      <BreadcrumbComponent />
    </div>
    <div class="content-container my-auto pl-20">
      <h1 class="font-bold text-5xl text-white"> Default title </h1>
      <p class="text-white text-xl pb-5"> Default description </p>
      <button class="bg-white text-primary hover:text-white hover:bg-primary py-3 px-5 rounded-full">Faites un don</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import qs from 'qs';

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const { public: { strapiBaseUrl, strapiToken } } = runtimeConfig;

interface PageHero {
  title: string;
  description: string;
  heroImage: string;
  buttonVisible?: boolean;
}

const hero = ref<PageHero | null>(null);

const fetchHeroData = async (pageSlug: string) => {
  const slug = qs.stringify({
    filters: {
      slug: {
        $eq: pageSlug,
      },
    },
  }, {
    encodeValuesOnly: true,
  });

  const url = `${strapiBaseUrl}/api/heroes?${slug}&populate=*`;

  const { data, pending, error } = await useFetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${strapiToken}`,
    },
  });

  if (!error.value && !pending.value && data.value) {
    hero.value = data.value.data[0]?.attributes ? {
      title: data.value.data[0].attributes.title,
      description: data.value.data[0].attributes.description,
      heroImage: strapiBaseUrl + data.value.data[0].attributes.heroImage.data.attributes.url,
    } : null;
  } else {
    console.error(error.value);
  }
};

watchEffect(() => {
  const pageSlug = route.path;
  fetchHeroData(pageSlug);
});
</script>
