<template>
  <!-- <div class="border border-gray-200 bg-white rounded-3xl flex flex-wrap mb-32"> -->
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap mb-24 -mx-4">
        <div
          ref="addToRefs"
          v-for="(item, index) in keyNumbers"
          :key="index"
          class="w-full md:w-1/2 lg:w-1/3 p-4"
        >
          <div
            class="p-8 rounded-3xl border border-gray-100 flex flex-col justify-center items-center gap-8 h-full"
          >
            <img :src="item.logo" alt="Health" class="h-12 w-12" />
            <CountUp
              class="font-bold text-primary text-3xl"
              :end="isVisible[index] ? item.number : 0"
            />
            <span class="text-center text-gray-600 font-medium max-w-xs"
              >{{ item.text }}</span
            >
          </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
const keyNumbers = [
  { number: 506029, text: "Km parcourus", logo: "/logos/kmParcourus.png" },
  { number: 506029, text: "Dons récoltés", logo: "/logos/dons.png" },
  { number: 506029, text: "Dénivelé positif", logo: "/logos/D+.png" },
  { number: 506029, text: "Étapes", logo: "/logos/etape.png" },
  { number: 506029, text: "Passages média", logo: "/logos/reportagesTv.png" },
  { number: 506029, text: "Nombre event réalisés", logo: "/logos/events.png" },
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
