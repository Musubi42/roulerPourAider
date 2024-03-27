<template>
  <!-- <div class="border border-gray-200 bg-white rounded-3xl flex flex-wrap mb-32"> -->
    <div class="container mx-auto px-4">
      <div ref="numbers" class="flex flex-wrap mb-24 -mx-4">
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
              :end="isVisible ? item.number : 0"
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
  { number: 1327, text: "km parcourus", logo: "/logos/kmParcourus.png" },
  { number: 33324, text: "euros de dons récoltés", logo: "/logos/dons.png" },
  { number: 15526, text: "mètres de dénivelé positif", logo: "/logos/D+.png" },
  { number: 9, text: "étapes", logo: "/logos/etape.png" },
  { number: 23, text: "passages médias", logo: "/logos/reportagesTv.png" },
  { number: 4, text: "événements réalisés", logo: "/logos/events.png" },
];

const numbers = ref(null);
const isVisible = ref(false);

let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.log(entry.isIntersecting);
        isVisible.value = entry.isIntersecting;
      });
    },
    {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  if (numbers.value) {
    observer.observe(numbers.value);
  }
});

onUnmounted(() => {
  if (numbers.value) {
    observer.unobserve(numbers.value);
  }
});

// Pour chaque petite case individuellement

// const counters = ref([]);
// const isVisible = reactive(keyNumbers.map(() => false));

// let observer;

// const addToRefs = ref([]);

// onMounted(() => {
//   observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry, index) => {
//         isVisible[index] = entry.isIntersecting;
//         console.log("hey");
//       });
//     },
//     {
//       threshold: 0.1,
//     }
//   );

//   addToRefs.value.forEach((ref) => {
//     observer.observe(ref);
//   });
// });

// onUnmounted(() => {
//   counters.value.forEach((addToRefs) => observer.unobserve(counter));
// });
</script>
