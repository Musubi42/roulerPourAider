<template>
  <section class="relative py-24 container mx-auto">
    <!-- En attendant d'avoir les éléments de déco, filigrane -->
    <!-- <div class="absolute inset-0">
      <svg
        class="mx-auto mt-10"
        width="736"
        height="736"
        viewbox="0 0 736 736"
        fill="none"
        xmlns="http://www.w3.org/2000/svg" >
        <g opacity="0.1">
          <path
            d="M0.175052 1.40088L91.5841 92.8099C62.8655 131.16 45.8796 178.79 45.8796 230.274C45.8796 327.987 107.169 411.691 193.15 445.137L0.174988 734.599C-0.000121978 734.949 -0.000122009 735.299 0.174988 735.475C0.174988 735.825 0.525269 736 0.875488 736L735.124 736C735.475 736 735.825 735.825 735.825 735.475C735.825 735.124 736 734.949 735.825 734.599L571.044 487.34L735.825 322.733C736 322.558 736 322.383 736 322.033C736 321.683 736 321.508 735.825 321.332C735.65 321.157 735.475 321.157 735.124 321.157C734.774 321.157 734.599 321.157 734.424 321.332L569.993 485.764L475.957 344.622C495.395 311.001 506.602 271.951 506.602 230.274C506.602 103.317 403.285 3.19483e-05 276.153 2.08341e-05C201.38 1.42972e-05 134.662 35.8981 92.6348 91.4089L1.57599 0.350156C1.40088 0.175046 1.22577 0.175046 0.875553 0.175046C0.525333 0.175046 0.350162 0.175046 0.175052 0.350155C-5.77731e-05 0.525265 3.24677e-06 0.700375 3.21616e-06 1.05059C3.18554e-06 1.40081 -5.78343e-05 1.22577 0.175052 1.40088ZM568.767 487.164L505.026 550.906C504.851 551.081 504.851 551.256 504.851 551.606C504.851 551.956 504.851 552.131 505.026 552.306C505.376 552.657 505.901 552.657 506.252 552.306L569.818 488.74L733.548 734.249L2.45154 734.249L194.726 445.838C220.117 455.469 247.435 460.722 275.978 460.722C360.733 460.722 434.806 414.843 474.906 346.549L568.767 487.164ZM195.776 444.262L368.088 185.97L474.031 344.798C434.455 412.916 360.558 458.796 276.328 458.796C247.96 458.971 220.817 453.718 195.776 444.262ZM276.153 1.75112C402.235 1.75113 504.851 104.367 504.851 230.274C504.851 271.25 493.994 309.775 474.906 343.222L368.788 184.044C368.613 183.869 368.438 183.694 368.088 183.694C367.737 183.694 367.562 183.869 367.387 184.044L194.2 443.561C108.57 410.465 47.6307 327.286 47.6307 230.098C47.6307 179.141 64.4416 131.86 92.8099 93.8605L183.869 184.919C184.219 185.269 184.744 185.269 185.094 184.919C185.27 184.744 185.27 184.569 185.27 184.219C185.27 183.869 185.27 183.693 185.094 183.518L93.8605 92.2845C135.537 37.4741 201.73 1.75111 276.153 1.75112Z"
            fill="white"
          ></path>
          <path
            d="M574.546 208.209L735.124 208.209C735.65 208.209 736 207.859 736 207.334L736 46.7553C736 46.23 735.65 45.8798 735.124 45.8798L574.546 45.8797C574.02 45.8797 573.67 46.23 573.67 46.7553L573.67 207.334C573.67 207.859 574.02 208.209 574.546 208.209ZM575.421 47.6309L734.249 47.6309L734.249 206.458L575.421 206.458L575.421 47.6309Z"
            fill="white"
          ></path>
          <path
            d="M311.175 527.791C311 527.615 310.825 527.615 310.65 527.615C310.475 527.615 310.3 527.615 310.125 527.791L206.808 596.61C206.633 596.785 206.458 596.96 206.458 597.31C206.458 597.661 206.633 597.836 206.808 598.011L310.125 666.83C310.475 667.005 310.825 667.005 311.175 666.83L414.492 598.011C414.667 597.836 414.842 597.661 414.842 597.31C414.842 596.96 414.667 596.785 414.492 596.61L311.175 527.791ZM310.65 665.254L208.909 597.486L310.65 529.717L412.391 597.486L310.65 665.254Z"
            fill="white"
          ></path>
        </g>
      </svg>
    </div> -->
    <section class="flex flex-col md:flex-row w-full h-96 gap-6 mb-8" >
      <!-- PP -->
      <div class="h-full w-full md:w-1/2" >
        <NuxtImg src="/hopital-necker.jpeg" alt="Photo de l'hôpital Necker"
        class="h-full w-full object-cover rounded-lg" />
      </div>
      <!-- Texte -->
      <div class="flex flex-col h-full w-full md:w-1/2 content-between justify-between gap-6 text-xl" >
        <div class="px-8 flex items-center h-full bg-[#F7F7FA] rounded-lg" >
          <p>Peu importe d’où l’on vient en France, quand un enfant est touché par la maladie et en particulier par une maladie rare, Necker est un hôpital de référence.</p>
        </div>
        <div class="px-8 flex items-center h-full bg-[#F7F7FA] rounded-lg" >
          <p>Nous avons choisi cet hôpital car leurs besoins sont grands et ils se doivent de constamment faire évoluer leurs équipements et leurs prises en charge.</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="font-bold text-3xl mb-4" >Chiffres clés de l'hôpital</h2>
      <div class="bg-[#F7F7FA] rounded-lg flex flex-col px-10 py-5 gap-6">
      <!-- Mettre 3 par div -->
        <div class="flex flex-row justify-between" >
          <div ref="addToRefs" v-for="(item, index) in keyNumbers.slice(0, 3)" :key="index"
            class="w-1/4" >
            <CountUp class="font-bold text-primary text-3xl" :end="isVisible[index] ? item.number : 0" />
            <p class="flex flex-wrap" >{{ item.text }}</p>
          </div>
        </div>
        <!-- Seconde ligne -->
        <div class="flex flex-row justify-between" >
          <div ref="addToRefs" v-for="(item, index) in keyNumbers.slice(3)" :key="index"
            class="w-1/4" >
            <CountUp class="font-bold text-primary text-3xl" :end="isVisible[index] ? item.number : 0" />
            <p class="flex flex-wrap" >{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
const keyNumbers = [
  { number: 506029, text: 'Prise en charge' },
  { number: 82425, text: 'Passages aux urgences' },
  { number: 582, text: 'Lits toutes disciplines confondues' },
  { number: 61, text: 'Centres de référence maladies rares' },
  { number: 4777, text: 'Professionnels au services des patients' },
  { number: 1079, text: 'Publications scientifiques' },
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
    console.error(error);
  }
};

const counters = ref([]);
const isVisible = reactive(keyNumbers.map(() => false));

let observer;

const addToRefs = ref([]);

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      console.log("entry", entry.isIntersecting);
      isVisible[index] = entry.isIntersecting;
    });
  }, {
    threshold: 0.5
  });

  addToRefs.value.forEach(ref => {
    observer.observe(ref);
  });
});

onUnmounted(() => {
  counters.value.forEach(addToRefs => observer.unobserve(counter));
});
</script>

