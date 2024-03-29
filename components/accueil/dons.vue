<template>
  <section class="overflow-hidden pt-6 bg-white">
    <div class="container mx-auto md:px-4">
      <div class="rounded-2xl pt-14 lg:px-18">
        <div class="flex flex-wrap">
          <div class="w-full lg:w-2/3">
            <div
              class="bg-[url('/hopital-necker-visite/image00060.jpeg')] bg-contain h-full rounded-2xl pt-6 px-3 md:px-8 overflow-hidden"
            >
              <h3 class="text-center font-semibold text-lg text-white drop-shadow-2xl">
                Contribuez à notre cause pour améliorer le bien-être des patients et de
                leurs familles - chaque don compte pour faire une réelle différence !
              </h3>

              <div class="flex flex-col  w-full bottom-2" >
                <div class="flex flex-row gap-4 md:gap-6">
                  <div
                    class="flex flex-1 flex-col p-2 md:p-6 rounded-xl border border-white bg-white/50 justify-center backdrop-blur-sm"
                  >
                    <h4 class="text-center text-base font-light">Objectif</h4>
                    <p class="text-base md:text-3xl font-semibold text-center text-secondary">30 000€</p>
                  </div>
                  <div
                    class="flex flex-1 flex-col p-2 md:p-6 rounded-xl border border-white bg-white/50 justify-center backdrop-blur-sm"
                  >
                    <h4 class="text-center text-sm font-light">Jour restant</h4>
                    <p class="text-base md:text-3xl font-semibold text-secondary text-center">120</p>
                  </div>
                  <div
                    class="flex flex-1 flex-col p-2 md:p-6 rounded-xl border border-white bg-white/50 justify-center backdrop-blur-sm"
                  >
                    <h4 class="text-center text-base font-light">Donateurs</h4>
                    <p class="text-base md:text-3xl font-semibold text-secondary text-center">42</p>
                  </div>
                </div>

                <div class="containerr mt-12 mb-8">
                  <div class="progress2 progress-moved cursor-auto">
                    <div class="progress-bar2 relative" title="Dons">
                      <span class="tooltip"><CountUp :end="60000" /></span>
                    </div>
                  </div>
                </div>

                <div class="flex flex-row gap-6 justify-center">
                  <button type="" class="mb-5">
                    <NuxtLink
                      to="https://solidarite.fondationaphp.fr/projects/rouler-pour-aider-fr"
                      class="text-white bg-primary py-3 px-5 rounded-xl"
                    >
                      Faites un don
                    </NuxtLink>
                  </button>

                  <NuxtLink to="" class="text-white underline drop-shadow-md"
                    ><p class="drop-shadow-xl">En savoir plus</p></NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-1/3 pl-4 pt-10 md:pt-0">
            <div class="flex flex-col justify-between h-full gap-6">
              <div
                v-for="(donationGoal, index) in donationGoals"
                :key="index"
                class="relative rounded-xl flex items-center p-3 gap-3 bg-white border border-black"
              >
                <span class="absolute -top-6 left-3">1050€</span>
                <!-- Filling effect background -->

                <div
                  class="absolute top-0 left-0 bottom-0 bg-green-500 text-base z-0 transition-[width] duration-500 ease-in-out rounded-xl"
                  :style="{ width: 90 + '%' }"
                ></div>

                <!-- Content -->
                <div
                  class="z-10 flex items-center justify-center w-12 h-12 rounded-lg shadow-md"
                >
                  <img :src="donationGoal.logo" alt="Logo de donation" />
                </div>

                <p class="z-10 mb-1 text-black ">
                  {{ donationGoal.text }}
                </p>

                <!-- Percentage text -->
                <span class="z-10 absolute bottom-0 right-0 px-2">
                  <p class="text-black">{{ 30 }}% de 10 000€</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.containerr {
  width: auto;
  text-align: center;
}

.progress2 {
  padding: 6px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
}

.progress-bar2 {
  height: 18px;
  border-radius: 30px;
  background-image: linear-gradient(
    to bottom,
    rgba(114, 188, 122, 0.3),
    rgba(114, 188, 122, 0.5)
  );
  transition: 2.5s linear;
  transition-property: width, rgba(0, 0, 0, 0.25);
}

.tooltip {
  position: absolute;
  bottom: 150%;
  right: 0%;
  transform: translateX(50%);
  margin-bottom: 5px;
  background-color: white;
  padding: 4px 8px;
  color: black;
  font-size: 12px;
  border-radius: 4px;
  display: block;
  white-space: nowrap;
}

.tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px; /* Half the width of the triangle */
  border-width: 5px;
  border-style: solid;
  border-color: white transparent transparent transparent;
}

.progress-moved .progress-bar2 {
  width: 85%;
  background-color: rgba(114, 188, 122);
  animation: progressAnimation 6s;
}

@keyframes progressAnimation {
  0% {
    width: 0%;
    background-color: rgba(114, 188, 122, 0.3);
  }
  100% {
    width: 85%;
    background-color: rgba(114, 188, 122, 0.5);
  }
}
</style>

<script setup lang="ts">
const donationGoals = [
  { logo: "logos/animation.png", text: "2 semaines d'animation", objective: "10 000" },
  { logo: "logos/lit-hopitaux.png", text: "10 lits", objective: "10 000" },
  { logo: "logos/decoration-salle.png", text: "2 services décorés", objective: "10 000" },
  {
    logo: "logos/salle-parents.png",
    text: "1 création d'un salon des parents",
    objective: "30 000",
  },
];
</script>
