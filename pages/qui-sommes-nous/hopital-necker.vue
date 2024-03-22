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

     
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold font-heading mb-4 text-center">Benefits</h2>
    <p class="text-gray-600 mb-16 text-center">We help our employees thrive</p>
    <div class="flex flex-wrap mb-24 -mx-4">
      <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="p-8 rounded-3xl border border-gray-100 flex flex-col justify-center items-center gap-8 h-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewbox="0 0 49 48" fill="none">
            <path d="M44.3333 42.5H4.33331C3.51331 42.5 2.83331 43.18 2.83331 44C2.83331 44.82 3.51331 45.5 4.33331 45.5H44.3333C45.1533 45.5 45.8333 44.82 45.8333 44C45.8333 43.18 45.1533 42.5 44.3333 42.5Z" fill="#FF7100"></path>
            <path d="M34.3333 4H14.3333C8.33331 4 6.33331 7.58 6.33331 12V44H18.3333V31.88C18.3333 30.84 19.1733 30 20.2133 30H28.4733C29.4933 30 30.3533 30.84 30.3533 31.88V44H42.3533V12C42.3333 7.58 40.3333 4 34.3333 4ZM29.3333 18.5H25.8333V22C25.8333 22.82 25.1533 23.5 24.3333 23.5C23.5133 23.5 22.8333 22.82 22.8333 22V18.5H19.3333C18.5133 18.5 17.8333 17.82 17.8333 17C17.8333 16.18 18.5133 15.5 19.3333 15.5H22.8333V12C22.8333 11.18 23.5133 10.5 24.3333 10.5C25.1533 10.5 25.8333 11.18 25.8333 12V15.5H29.3333C30.1533 15.5 30.8333 16.18 30.8333 17C30.8333 17.82 30.1533 18.5 29.3333 18.5Z" fill="#FF7100"></path>
          </svg>
          <span class="text-center text-gray-600 font-medium max-w-xs">Health, dental, vision, and mental-health insurance</span>
        </div>
      </div>
      <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="p-8 rounded-3xl border border-gray-100 flex flex-col justify-center items-center gap-8 h-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewbox="0 0 48 48" fill="none">
            <path d="M40.42 15.64L25.02 24.56C24.4 24.92 23.62 24.92 22.98 24.56L7.58 15.64C6.48 15 6.2 13.5 7.04 12.56C7.62 11.9 8.28 11.36 8.98 10.98L19.82 4.98C22.14 3.68 25.9 3.68 28.22 4.98L39.06 10.98C39.76 11.36 40.42 11.92 41 12.56C41.8 13.5 41.52 15 40.42 15.64Z" fill="#FF7100"></path>
            <path d="M22.86 28.28V41.92C22.86 43.44 21.32 44.44 19.96 43.78C15.84 41.76 8.9 37.98 8.9 37.98C6.46 36.6 4.46 33.12 4.46 30.26V19.94C4.46 18.36 6.12 17.36 7.48 18.14L21.86 26.48C22.46 26.86 22.86 27.54 22.86 28.28Z" fill="#FF7100"></path>
            <path d="M25.14 28.28V41.92C25.14 43.44 26.68 44.44 28.04 43.78C32.16 41.76 39.1 37.98 39.1 37.98C41.54 36.6 43.54 33.12 43.54 30.26V19.94C43.54 18.36 41.88 17.36 40.52 18.14L26.14 26.48C25.54 26.86 25.14 27.54 25.14 28.28Z" fill="#FF7100"></path>
          </svg>
          <span class="text-center text-gray-600 font-medium max-w-xs">Highly competitive compensation &amp; equity packages</span>
        </div>
      </div>
      <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="p-8 rounded-3xl border border-gray-100 flex flex-col justify-center items-center gap-8 h-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewbox="0 0 49 48" fill="none">
            <path d="M35.7867 4H13.4867C8.62672 4 4.66672 7.96 4.66672 12.82V25.82V26.22C4.66672 31.1 8.62672 35.04 13.4867 35.04H21.1667C22.2667 35.04 23.1667 35.94 23.1667 37.04V38.98C23.1667 40.08 22.2667 40.98 21.1667 40.98H16.3267C15.5067 40.98 14.8267 41.66 14.8267 42.48C14.8267 43.3 15.4867 44 16.3267 44H33.0267C33.8467 44 34.5267 43.32 34.5267 42.5C34.5267 41.68 33.8467 41 33.0267 41H28.1867C27.0867 41 26.1867 40.1 26.1867 39V37.06C26.1867 35.96 27.0867 35.06 28.1867 35.06H35.8067C40.6867 35.06 44.6267 31.1 44.6267 26.24V25.84V12.84C44.6067 7.96 40.6467 4 35.7867 4Z" fill="#FF7100"></path>
          </svg>
          <span class="text-center text-gray-600 font-medium max-w-xs">MacBook of your choice and full WFH setup</span>
        </div>
      </div>
      <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="p-8 rounded-3xl border border-gray-100 flex flex-col justify-center items-center gap-8 h-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewbox="0 0 49 48" fill="none">
            <path d="M15.6333 41.8201C15.5733 41.8201 15.4933 41.8601 15.4333 41.8601C11.5533 39.9401 8.39331 36.7601 6.45331 32.8801C6.45331 32.8201 6.49331 32.7401 6.49331 32.6801C8.93331 33.4001 11.4533 33.9401 13.9533 34.3601C14.3933 36.8801 14.9133 39.3801 15.6333 41.8201Z" fill="#FF7100"></path>
            <path d="M42.2133 32.9001C40.2333 36.8801 36.9333 40.1001 32.9133 42.0401C33.6733 39.5001 34.3133 36.9401 34.7333 34.3601C37.2533 33.9401 39.7333 33.4001 42.1733 32.6801C42.1533 32.7601 42.2133 32.8401 42.2133 32.9001Z" fill="#FF7100"></path>
            <path d="M42.3733 15.42C39.8533 14.66 37.3133 14.04 34.7333 13.6C34.3133 11.02 33.6933 8.45996 32.9133 5.95996C37.0533 7.93996 40.3933 11.28 42.3733 15.42Z" fill="#FF7100"></path>
            <path d="M15.6333 6.18C14.9133 8.62 14.3933 11.1 13.9733 13.62C11.3933 14.02 8.83332 14.66 6.29332 15.42C8.23332 11.4 11.4533 8.1 15.4333 6.12C15.4933 6.12 15.5733 6.18 15.6333 6.18Z" fill="#FF7100"></path>
            <path d="M31.3133 13.18C26.6733 12.66 21.9933 12.66 17.3533 13.18C17.8533 10.44 18.4933 7.7 19.3933 5.06C19.4333 4.9 19.4133 4.78 19.4333 4.62C21.0133 4.24 22.6333 4 24.3333 4C26.0133 4 27.6533 4.24 29.2133 4.62C29.2333 4.78 29.2333 4.9 29.2733 5.06C30.1733 7.72 30.8133 10.44 31.3133 13.18Z" fill="#FF7100"></path>
            <path d="M13.5133 30.98C10.7533 30.48 8.03331 29.84 5.39331 28.94C5.23331 28.9 5.11331 28.92 4.95331 28.9C4.57331 27.32 4.33331 25.7 4.33331 24C4.33331 22.32 4.57331 20.68 4.95331 19.12C5.11331 19.1 5.23331 19.1 5.39331 19.06C8.05331 18.18 10.7533 17.52 13.5133 17.02C13.0133 21.66 13.0133 26.34 13.5133 30.98Z" fill="#FF7100"></path>
            <path d="M44.3333 24C44.3333 25.7 44.0933 27.32 43.7133 28.9C43.5533 28.92 43.4333 28.9 43.2733 28.94C40.6133 29.82 37.8933 30.48 35.1533 30.98C35.6733 26.34 35.6733 21.66 35.1533 17.02C37.8933 17.52 40.6333 18.16 43.2733 19.06C43.4333 19.1 43.5533 19.12 43.7133 19.12C44.0933 20.7 44.3333 22.32 44.3333 24Z" fill="#FF7100"></path>
            <path d="M31.3133 34.8199C30.8133 37.5799 30.1733 40.2999 29.2733 42.9399C29.2333 43.0999 29.2333 43.2199 29.2133 43.3799C27.6533 43.7599 26.0133 43.9999 24.3333 43.9999C22.6333 43.9999 21.0133 43.7599 19.4333 43.3799C19.4133 43.2199 19.4333 43.0999 19.3933 42.9399C18.5133 40.2799 17.8533 37.5799 17.3533 34.8199C19.6733 35.0799 21.9933 35.2599 24.3333 35.2599C26.6733 35.2599 29.0133 35.0799 31.3133 34.8199Z" fill="#FF7100"></path>
            <path d="M31.86 31.5267C26.8578 32.1578 21.8088 32.1578 16.8067 31.5267C16.1755 26.5245 16.1755 21.4755 16.8067 16.4733C21.8088 15.8422 26.8578 15.8422 31.86 16.4733C32.4911 21.4755 32.4911 26.5245 31.86 31.5267Z" fill="#FF7100"></path>
          </svg>
          <span class="text-center text-gray-600 font-medium max-w-xs">Remote-friendly, flexible policy</span>
        </div>
      </div>
      <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="p-8 rounded-3xl border border-gray-100 flex flex-col justify-center items-center gap-8 h-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewbox="0 0 48 48" fill="none">
            <path d="M34.36 10.5C30.94 10.5 26.86 11.8 26.86 18V30C26.86 36.2 30.94 37.5 34.36 37.5C37.78 37.5 41.86 36.2 41.86 30V18C41.86 11.8 37.78 10.5 34.36 10.5Z" fill="#FF7100"></path>
            <path d="M13.64 10.5C10.22 10.5 6.14 11.8 6.14 18V30C6.14 36.2 10.22 37.5 13.64 37.5C17.06 37.5 21.14 36.2 21.14 30V18C21.14 11.8 17.06 10.5 13.64 10.5Z" fill="#FF7100"></path>
            <path d="M26.86 22.5H21.14V25.5H26.86V22.5Z" fill="#FF7100"></path>
            <path d="M45 30.5C44.18 30.5 43.5 29.82 43.5 29V19C43.5 18.18 44.18 17.5 45 17.5C45.82 17.5 46.5 18.18 46.5 19V29C46.5 29.82 45.82 30.5 45 30.5Z" fill="#FF7100"></path>
            <path d="M3 30.5C2.18 30.5 1.5 29.82 1.5 29V19C1.5 18.18 2.18 17.5 3 17.5C3.82 17.5 4.5 18.18 4.5 19V29C4.5 29.82 3.82 30.5 3 30.5Z" fill="#FF7100"></path>
          </svg>
          <span class="text-center text-gray-600 font-medium max-w-xs">Free gym membership</span>
        </div>
      </div>
      <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="p-8 rounded-3xl border border-gray-100 flex flex-col justify-center items-center gap-8 h-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewbox="0 0 49 48" fill="none">
            <path d="M37.6067 33.66L38.3867 39.98C38.5867 41.64 36.8067 42.8 35.3867 41.94L28.4667 37.82C27.9867 37.54 27.8667 36.94 28.1267 36.46C29.1267 34.62 29.6667 32.54 29.6667 30.46C29.6667 23.14 23.3867 17.18 15.6667 17.18C14.0867 17.18 12.5467 17.42 11.1067 17.9C10.3667 18.14 9.64672 17.46 9.82672 16.7C11.6467 9.42 18.6467 4 27.0067 4C36.7667 4 44.6667 11.38 44.6667 20.48C44.6667 25.88 41.8867 30.66 37.6067 33.66Z" fill="#FF7100"></path>
            <path d="M26.6667 30.4601C26.6667 32.8401 25.7867 35.0401 24.3067 36.7801C22.3267 39.1801 19.1867 40.7201 15.6667 40.7201L10.4467 43.8201C9.56672 44.3601 8.44672 43.6201 8.56672 42.6001L9.06672 38.6601C6.38672 36.8001 4.66672 33.8201 4.66672 30.4601C4.66672 26.9401 6.54672 23.8401 9.42672 22.0001C11.2067 20.8401 13.3467 20.1801 15.6667 20.1801C21.7467 20.1801 26.6667 24.7801 26.6667 30.4601Z" fill="#FF7100"></path>
          </svg>
          <span class="text-center text-gray-600 font-medium max-w-xs">Regular online team events</span>
        </div>
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

