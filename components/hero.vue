<template>
  <div class="hero-container flex w-full h-[80vh] bg-cover bg-no-repeat bg-center" 
    :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${heroImageUrl ? heroImageUrl : '/default-hero-image.png'})` }">

    <div class="breadcrumb-container">
      <BreadcrumbComponent />
    </div>
    <div class="content-container my-auto pl-20">
      <h1 class="font-bold text-7xl text-white">Contact</h1>
      <p class="text-white text-lg pb-5">Stay up to date with the latest news and press releases from our company</p>
      <button class="bg-white text-primary hover:text-white hover:bg-primary py-3 px-5 rounded-full ">Faites un don</button>
    </div>
  </div>
</template>

<script setup>
import qs from "qs";
const runtimeConfig = useRuntimeConfig();
const { public: { strapiBaseUrl, strapiToken } } = runtimeConfig;
const heroImageUrl = ref(''); // This will hold the URL of the hero image

onMounted(async () => {
  // Remplacer 'current-page-slug' par la logique appropriée pour obtenir le slug ou l'ID de la page actuelle
  const slug = qs.stringify({
    filters: {
      slug: {
        $eq: 'contact',
      },
    },
  }, {
    encodeValuesOnly: true, // prettify URL
  });
  const url = `${strapiBaseUrl}/api/pages?${slug}&populate=*`;
  // const url = `${strapiBaseUrl}/api/pages?filters[slug][$eq]=contact&fields=heroImage&populate=*`;
  // const url = `${strapiBaseUrl}/api/pages?filters[slug]=contact&fields=heroImage&populate=*`;

  const { data, pending, error } = await useFetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${strapiToken}`,
    },
  });
  // const data = await response.json();

  console.log("data : ", data?.value?.data);
  console.log("erreur : ", error.value);

  // Assurez-vous que le chemin d'accès correspond à la structure de votre réponse API
  // heroImageUrl.value = data[0].attributes.heroImage.data.attributes.url;
  // heroImageUrl.value = data.url;
});

</script>
