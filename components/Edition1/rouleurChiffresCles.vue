<template>
  <div class="border border-gray-200 bg-white rounded-3xl flex flex-wrap mb-32">
    <div
      ref="addToRefs"
      v-for="(item, index) in keyNumbers"
      :key="index"
      class="w-full md:w-1/2 lg:w-1/4 py-8"
    >
      <div class="md:border-r border-gray-200 px-12">
        <p class="text-gray-600 mb-2 text-center">{{ item.text }}</p>
        <CountUp
          class="font-bold text-primary text-3xl"
          :end="isVisible[index] ? item.number : 0"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const keyNumbers = [
  { number: 506029, text: "Prise en charge" },
  { number: 82425, text: "Passages aux urgences" },
  { number: 582, text: "Lits toutes disciplines confondues" },
  { number: 61, text: "Centres de référence maladies rares" },
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
