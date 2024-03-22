<template>
    <section class="py-3">
    <div class="container px-4 mx-auto">
      <div class="pt-6 pb-8 bg-secondary/70 rounded-xl">
        <div class="px-6">
          <h4 class="text-lg text-gray-100 font-semibold mb-6">Étapes</h4>
          <div class="w-full mt-6 pb-6 overflow-x-auto">
            <table class="w-full min-w-max">
              <thead>
                <tr class="text-left text-sm font-medium">
                  <th class="p-0 w-4">
                    <div class="py-3 px-6 rounded-tl-xl bg-secondary">
                      <span class="text-gray-300 font-semibold">Étape</span>
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="py-3 px-6 bg-secondary">
                      <span class="text-gray-300 font-semibold">Type</span>
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="py-3 px-6 bg-secondary">
                      <span class="text-gray-300 font-semibold">Date</span>
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="py-3 px-6 bg-secondary">
                      <span class="text-gray-300 font-semibold">Départ &amp; Arrivée</span>
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="py-3 px-6 bg-secondary">
                      <span class="text-gray-300 font-semibold"
                        >Distance</span
                      >
                    </div>
                  </th>
                  <th class="p-0">
                    <div class="py-3 px-6 rounded-tr-xl bg-secondary">
                      <span class="text-gray-300 font-semibold">Dénivelé</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <div class="flex items-center justify-center">
                        <!-- <div
                          class="flex items-center justify-center w-10 h-10 mr-3 bg-gray-400 bg-opacity-20 rounded-md"
                        >
                          <img src="" alt="" />
                        </div> -->
                        <span class="text-sm text-gray-100 font-medium">1</span>
                      </div>
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <span
                        class="inline-block px-2 py-1 text-xs text-gray-300 font-medium bg-gray-700 rounded-full"
                        >Plat</span
                      >
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <span class="text-sm text-gray-100 font-medium"
                        >20 Juillet 2020</span
                      >
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <span class="text-sm font-medium text-gray-100">Lille > Amiens</span>
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <span class="text-sm text-gray-100 font-medium">120 km</span>
                    </div>
                  </td>
                  <td class="p-0">
                    <div class="flex items-center h-16 px-6">
                      <span class="text-sm text-gray-100 font-medium">220+</span>
                    </div>
                  </td>
                </tr>

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
interface Etape {
  etapePhotolUrl: string;
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

const etapes = ref<Etape[]>([]);
const descriptionAsso = ref<string>("");

const runtimeConfig = useRuntimeConfig();
const { public: { strapiBaseUrl, strapiToken } } = runtimeConfig;

const transformEtapeObject = (etapeData) => {
  return etapeData.map((data) => {
    const { photo, ...otherAttributes } = data.attributes;
    return {
      ...otherAttributes,
      etapePhotoUrl: strapiBaseUrl + photo.data.attributes.url,
    };
  });
};

const getEtapes = async () => {
  const url = `${strapiBaseUrl}/api/etapes?populate=*`;

  const { data, pending, error } = await useFetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${strapiToken}`,
    },
  });

  if (!error.value && !pending.value && data.value) {
    etapes.value = transformEtapeObject(data.value.data);
  } else {
    console.error(error.value);
  }
};
};

onMounted(() => {
  getEtapes();
});
</script>
