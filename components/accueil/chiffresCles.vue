<template>
  <div class="flex flex-col border-secondary w-8/12 mx-auto mt-6">
    <div ref="numbers" class="flex flex-row w-full h-[200px]">
      <div
        class="flex flex-col items-center justify-center w-1/2 border-r-2 border-b-2 border-secondary pr-6 pb-4 pl-1"
      >
        <CountUp class="font-bold text-primary text-6xl" :end="isVisible ? 3000 : 0" />
        <p class="font-medium text-primary text-3xl">Kilomètres parcourus</p>
      </div>
      <div
        class="flex flex-col items-center justify-start w-1/4 border-b-2 border-r-2 border-secondary p-6"
      >
        <CountUp class="font-semibold text-primary text-3xl" :end="isVisible ? 17 : 0" />
        <p class="font-normal text-black text-xl">Étapes</p>
      </div>
      <div
        class="flex flex-col items-center justify-end w-1/4 border-b-2 border-secondary pr-1 pl-6 py-6"
      >
        <!-- Icons montagne -->
        <img src="/logos/D+.png" alt="D+" class="h-16 w-16" />
        <CountUp class="font-semibold text-primary text-3xl" :end="isVisible ? 3 : 0" />
        <!-- <CountUp
          class="font-bold text-primary text-3xl"
          :end="isVisible[index] ? item.number : 0"
        /> -->
        <p class="font-normal text-black text-xl text-center">Kilomètre parcourus</p>
      </div>
    </div>
    <!-- Bas -->
    <div class="flex flex-row w-full h-[150px]">
      <div
        class="flex flex-col items-center justify-center w-1/4 border-b-2 border-r-2 border-secondary p-4"
      >
        <p class="text-center text-xl font-semibold text-primary">Tour de France</p>
        <p class="text-center text-medium">7 au 25 juillet</p>
      </div>
      <div
        class="flex flex-row items-center justify-center w-3/4 border-b-2 border-secondary p-6"
      >
        <img src="/logos/dons.png" alt="Dons" class="h-16 w-16" />
        <div class="flex flex-col items-center pl-4">
          <p class="font-semibold text-primary text-3xl">Du 27 avril à fin juillet</p>
          <p class="font-normal text-black text-medium text-center">
            grande campagne de collecte de dons au profit de l’hôpital Necker
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
const keyNumbers = [
  { number: 3000, text: "Kilomètre parcourus" },
  { number: 17, text: "Étapes" },
  { number: 3, text: "Everest escaladés", logo: "logos/D+.png" },
  { text: "Tour de France du 7 au 25 Juillet" },
  {
    text:
      "Du 27 avril à fin juillet, grande campagne de collecte de dons au profit de l’hôpital Necker",
    logo: "logos/dons.png",
  },
];

const numbers = ref(null);
const isVisible = ref(false);

let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible.value = entry.isIntersecting;
      });
    },
    {
      threshold: 0.5,
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
</script>