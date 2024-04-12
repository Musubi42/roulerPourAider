<template>
  <section class="relative py-16">
    <!-- En attendant d'avoir les éléments de déco, filigrane -->

    <section class="flex flex-col md:flex-row w-full h-screen mb-8">
      <!-- PP -->
      <div class="h-full w-full md:w-[47%] bg-[#F0EEEE] flex justify-center">
        
        <!-- <NuxtImg src="/oui/image00025.jpeg" alt="Photo de l'hôpital Necker" 
        class="h-full w-full object-cover rounded-lg" />-->
        <!-- <div style="mask-image: url('/mask.svg'); mask-size: cover;"> -->
        <img src="/necker.jpeg" alt="" class="w-4/5 m-auto" />
        <!-- </div> -->
      </div>
      <!-- Texte -->
      <div
        class="flex flex-col h-full w-full md:w-[53%] content-between gap-6 text-xl items-center py-16"
      >
        <h1 class="font-bold text-4xl text-secondary">Hôpital Necker-Enfants malades</h1>
        <div class="text-justify px-12 flex flex-col gap-12 text-xl h-auto my-auto" >
          <p>L’hôpital Necker-Enfants malades est <b>l’hôpital pédiatrique de référence en France.</b></p>
        <p>Son <b>expertise</b> dans la prise en charge des <b>pathologies de l’enfant</b> complétée par plusieurs <b>spécialités adultes</b> en fait un <b>établissement de renommée internationale.</b></p>
        <p><b>L’innovation</b> est au cœur de la stratégie de l’hôpital Necker. Pour mener à bien ses projets et développer l’ensemble de ses <b>missions de soin, de recherche et d’enseignement</b>, l’implication des donateurs est déterminante.</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="font-bold text-3xl mb-4">Chiffres clés de l'hôpital</h2>
      <div class="bg-[#F7F7FA] rounded-lg flex flex-col px-10 py-5 gap-6">
        <!-- Mettre 3 par div -->
        <div class="flex flex-row justify-between">
          <div
            ref="addToRefs"
            v-for="(item, index) in keyNumbers.slice(0, 3)"
            :key="index"
            class="w-1/4"
          >
            <CountUp
              class="font-bold text-primary text-3xl"
              :end="isVisible[index] ? item.number : 0"
            />
            <p class="flex flex-wrap">{{ item.text }}</p>
          </div>
        </div>
        <!-- Seconde ligne -->
        <div class="flex flex-row justify-between">
          <div
            ref="addToRefs"
            v-for="(item, index) in keyNumbers.slice(3)"
            :key="index"
            class="w-1/4"
          >
            <CountUp
              class="font-bold text-primary text-3xl"
              :end="isVisible[index] ? item.number : 0"
            />
            <p class="flex flex-wrap">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "without-hero",
});

const keyNumbers = [
  { number: 506029, text: "Prise en charge" },
  { number: 82425, text: "Passages aux urgences" },
  { number: 582, text: "Lits toutes disciplines confondues" },
  { number: 61, text: "Centres de référence maladies rares" },
  { number: 4777, text: "Professionnels au services des patients" },
  { number: 1079, text: "Publications scientifiques" },
];

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

const persons = ref<Person[]>([]);

const runtimeConfig = useRuntimeConfig();
const {
  public: { strapiBaseUrl, strapiToken },
} = runtimeConfig;

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
    console.error(error);
  }
};

const counters = ref([]);
const isVisible = reactive(keyNumbers.map(() => false));

let observer;

const addToRefs = ref([]);

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        console.log("entry", entry.isIntersecting);
        isVisible[index] = entry.isIntersecting;
      });
    },
    {
      threshold: 0.5,
    }
  );

  addToRefs.value.forEach((ref) => {
    observer.observe(ref);
  });
});

onUnmounted(() => {
  counters.value.forEach((addToRefs) => observer.unobserve(counter));
});
</script>
