<template>
  <section class="py-3">
    <div class="container px-4 mx-auto">
      <div class="pt-6 pb-8 rounded-xl">
        <div class="px-6">
          <h4 class="text-lg text-gray-100 font-semibold mb-6">Étapes</h4>
          <div class="w-full mt-6 pb-6 overflow-x-auto">
            <table class="w-full min-w-max">
              <thead>
                <tr class="text-left text-sm font-medium text-white">
                  <th class="p-0 w-4">
                    <div class="py-3 px-6 rounded-tl-xl bg-primary">
                      <span class="font-semibold">Étape</span>
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="py-3 px-6 bg-primary">
                      <span class="font-semibold">Type</span>
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="py-3 px-6 bg-primary">
                      <span class="font-semibold">Date</span>
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="py-3 px-6 bg-primary">
                      <span class="font-semibold"
                        >Départ &amp; Arrivée</span
                      >
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="py-3 px-6 bg-primary">
                      <span class="font-semibold">Distance</span>
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="py-3 px-6 rounded-tr-xl bg-primary">
                      <span class="font-semibold">Dénivelé</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr ref="addToRefs"
                  v-for="(etape, index) in etapes"
                  :key="index"
                  class="bg-secondary/20"
                  :style="{ 'background-color': index % 2 === 1 ? 'rgb(42 95 164 / 0.2)' : 'rgb(42 95 164)', 'color': index % 2 === 1 ? 'black' : 'white'}"  >
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <div class="flex items-center justify-center">
                        <!-- <div
                          class="flex items-center justify-center w-10 h-10 mr-3 bg-gray-400 bg-opacity-20 rounded-md"
                        >
                          <img src="" alt="" />
                        </div> -->
                        <span class="text-sm font-medium">{{ etape.etape }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      {{ etape.type }}
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <span class="text-sm font-medium"
                        >{{ etape.date}}</span
                      >
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <span class="text-sm font-medium"
                        >{{ etape.departArrivee }}</span
                      >
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <span class="text-sm font-medium">{{etape.distance }}</span>
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <span class="text-sm font-medium">{{ etape.denivele }}</span>
                    </div>
                  </td>
                </tr>

                <!-- Derniere  -->
                <tr>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6 rounded-bl-xl bg-secondary">
                      <div class="flex items-center">
                        <!-- <div
                          class="flex items-center justify-center w-10 h-10 mr-3 bg-gray-400 bg-opacity-20 rounded-md"
                        >
                          <img src="" alt="" />
                        </div> -->
                        <span class="text-sm text-gray-100 font-medium">2</span>
                      </div>
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6 bg-secondary">
                      <span
                        class="inline-block px-2 py-1 text-xs text-gray-300 font-medium bg-gray-700 rounded-full"
                        >NO-CODE</span
                      >
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6 bg-secondary">
                      <span class="text-sm text-gray-100 font-medium"
                        >Warsaw, Poland</span
                      >
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6 bg-secondary">
                      <span
                        class="inline-block w-2 h-2 mr-1 bg-green-500 rounded-full"
                      ></span>
                      <span class="text-sm font-medium text-gray-100">Enrolled</span>
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6 bg-secondary">
                      <span class="text-sm text-gray-100 font-medium">June 06, 2022</span>
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6 rounded-br-xl bg-secondary">
                      <span class="text-sm text-gray-100 font-medium">June 06, 2022</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const carousel = ref(null);
const etapes = ref([
  {
    etape: '1',
    type: 'Plat',
    date: '6 juin 2020',
    departArrivee: 'Lille > Amiens',
    distance: '220',
    denivele: '200+',
  },
  {
    etape: '2',
    type: 'Plat',
    date: '8 juin 2020',
    departArrivee: 'Amiens > Reims',
    distance: '180',
    denivele: '400+',
  },
  {
    etape: '2',
    type: 'Plat',
    date: '8 juin 2020',
    departArrivee: 'Amiens > Reims',
    distance: '180',
    denivele: '400+',
  },
]);

</script>