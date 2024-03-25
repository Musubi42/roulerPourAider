<template>
  <section class="relative py-24 overflow-hidden">

    
    <div class="max-w-3xl mx-auto mb-12 md:mb-20 text-center -mt-14">

    <!-- TODO : Add countUp & chiffre cles -->
    <!-- flex flex-row -->
      <!-- <span class="text-blue-400 uppercase font-semibold tracking-widest">New feature</span> -->
      <h2 class="mt-4 mb-6 text-4xl font-bold text-white font-heading">{{ descriptionAsso.title }}</h2>
      <p class="text-lg text-gray-50">{{ descriptionAsso.description }}</p>
    </div>


    <!-- Chiffre -->
    <AssoChiffresCles />

<!-- TODO : Le filigrane demare en dessous des chiffres -->
    <div class="absolute inset-0">
      <NuxtImg src="/public/dashedLine-zigzag.png" alt="" />
      <img src="public/dashedLine-zigzag.png" alt="" />
    </div>

    <div v-for="(person, index) in persons" :key="index"
      class="container px-4 mx-auto" >
      <div class="relative max-w-5xl mx-auto mb-20">
        <div class="bg-white md:clip-path-right-top-sm rounded-lg" >
          <div class="flex flex-col md:flex-row items-center border rounded-lg shadow-lg" 
            :class="{ 'md:flex-row-reverse': index % 2 === 1, 'md:flex-row': index % 2 === 0 }" 
             >
            <NuxtImg
              class="w-full md:w-80 h-[350px] object-cover md:clip-path-right-top"
              :class="{ 'md:rounded-l-lg': index % 2 === 0, 'rounded-t-lg': index % 2 === 0, 'rounded-r-lg': index % 2 === 1 }" 
              :src="person?.personPhotoUrl"
              alt=""
            />
            <div class="pl-8 py-10 lg:py-0">
              <h3 class="mb-1 text-3xl font-semibold font-heading text-blue-800">
                {{ capitalizePrenom(person?.prenom) }} {{ person?.nom }}
              </h3>
              <p class="mb-4 text-blue-500">{{ person?.Poste }}</p>
              <p class="text-blue-800 mb-4 mr-4">
                {{ person.description }}
              </p>
              <div class="flex items-center">
                <NuxtLink
                  v-if="person?.reseaux?.facebook"
                  class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                  :to="`${person?.facebook}`" >
                  <IconsFacebook />
                </NuxtLink>
                <NuxtLink
                  v-if="person?.reseaux?.twitter"
                  class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                  :to="`${person?.twitter}`" >
                  <IconsTwitter />
                </NuxtLink>
                <NuxtLink
                  v-if="person?.reseaux?.linkedin"
                  class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                  :to="`${person?.linkedin}`" >
                  <IconsLinkedin />
                </NuxtLink>
                <NuxtLink
                  v-if="person?.reseaux?.instagram"
                  class="inline-flex items-center justify-center w-12 h-12 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                  :to="`${person?.instagram}`" >
                  <IconsInstagram />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dossier à télécharger -->
    <div class="flex flex-row justify-center items-center gap-8">
      <div class="flex flex-col items-center">
        <IconsDownload class="text-8xl text-primary" />
        <p class="text-secondary text-xl">Téléchargez notre dossier</p>
      </div>
      <img src="public/preview-dossier.jpg" alt=""
        class="h-72 w-auto border shadow-lg">
    </div>


  </section>
</template>

<script setup lang="ts">
interface Person {
  personPhotolUrl: string;
  prenom: string;
  nom: string;
  poste: string;
  description: string;
  reseaux: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
}

interface DescriptionAsso {
  title: string;
  description: string;
}

const persons = ref<Person[]>([]);
const descriptionAsso = ref<string>("");

const runtimeConfig = useRuntimeConfig();
const { public: { strapiBaseUrl, strapiToken } } = runtimeConfig;

const transformPersonObject = (personData) => {
  return personData.map((data) => {
    const { photo, ...otherAttributes } = data.attributes;
    return {
      ...otherAttributes,
      personPhotoUrl: strapiBaseUrl + photo.data.attributes.url,
    };
  });
};

const getPersons = async () => {
  const url = `${strapiBaseUrl}/api/who-are-wes?populate=*`;

  const { data, pending, error } = await useFetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${strapiToken}`,
    },
  });

  if (!error.value && !pending.value && data.value) {
    persons.value = transformPersonObject(data.value.data);
  } else {
    console.error(error.value);
  }
};

const getDescriptionAsso = async () => {
  const url = `${strapiBaseUrl}/api/description-asso`;

  const { data, pending, error } = await useFetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${strapiToken}`,
    },
  });

  if (!error.value && !pending.value && data.value) {
    descriptionAsso.value = data.value.data.attributes;
  } else {
    console.error(error.value);
  }
};

console.log("descriptionAsso", descriptionAsso.value);

const capitalizePrenom = (prenom: string) => {
  return prenom.charAt(0).toUpperCase() + prenom.slice(1);
};

onMounted(() => {
  getPersons();
  getDescriptionAsso();
});
</script>

