<template>
  <div class="border border-gray-200 bg-secondary/20 rounded-3xl flex flex-wrap mb-32 mx-32">
    <!-- TODO : trouver les logos -->
    <div
      ref="addToRefs"
      v-for="(item, index) in keyNumbers"
      :key="index"
      class="w-full md:w-1/2 lg:w-1/4 py-8 content-center flex flex-col mx-auto" >
      <!-- <div class=""> -->
        <img src="public/logos/dons.png" alt=""
          class="h-12 w-12">
        <CountUp
          class="font-bold text-primary text-3xl"
          :end="isVisible[index] ? item.number : 0"
        />
        <p class="text-gray-600 mb-2">{{ item.text }}</p>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const keyNumbers = [
  { number: 2, text: "Étudiants", logo: "public/logos/dons.png" },
  { number: 40, text: "Bénévoles", logo: "" },
  { number: 2, text: "Projets réalisés", logo: "" },
];

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
