<template>
  <section class="relative py-20 md:py-32 overflow-hidden">
    <img
      class="absolute top-0 left-0 mt-4"
      src=""
      alt=""
    />
    <img
      class="absolute top-0 right-0 mt-40"
      src=""
      alt=""
    />
    <div class="relative container px-4 mx-auto">
      <div class="relative max-w-7xl mx-auto">
        <div class="flex flex-wrap -mx-4 -mb-8">

          <div v-for="(gallerie, index) in galleries" :key="index"
            class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8" >
            <a
              class="group block max-w-sm mx-auto md:max-w-none h-full border border-gray-100 bg-white rounded-xl transform hover:scale-105 transition duration-500"
            >
              <!-- <div class="flex items-center justify-between px-4 py-5">
                <span class="text-sm">@saturn_ui</span>
                <img
                  src=""
                  alt=""
                />
              </div> -->
              <div class="h-72 border-b border-gray-100">
                <img
                  class="block w-full h-full"
                  :src="gallerie.galleriePhotoUrl"
                  alt=""
                />
              </div>
              <div class="px-4 pt-4 pb-5">
                <span class="block text-sm tetx-gray-800 mb-2.5" >
                  {{ gallerie.description }}
                </span>
                <div class="flex items-center">
                <!-- <iconsLoading class="w-4 h-4 text-white" v-if="podcast.isLoading" src="" alt="Loading..." /> -->
                  <div class="cursor-pointer" @click="toggleHeart">
                    <IconsHeartEmpty v-if="!isHeartFilled" class="text-orange-400 mr-2" />
                    <IconsHeartFill v-else class="text-orange-400 mr-2" />
                  </div>
                  <span class="text-sm text-gray-500">{{ gallerie.nombreLike }}</span>
                </div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Gallerie {
  galleriePhotolUrl: string;
  description: string;
  nombreLike: number;
}

const galleries = ref<Gallerie[]>([]);

const runtimeConfig = useRuntimeConfig();
const { public: { strapiBaseUrl, strapiToken } } = runtimeConfig;

const transformGallerieObject = (gallerieData) => {
  return gallerieData.map((data) => {
    const { photo, ...otherAttributes } = data.attributes;
    return {
      ...otherAttributes,
      galleriePhotoUrl: strapiBaseUrl + photo.data.attributes.url,
    };
  });
};

const getGalleries = async () => {
  const url = `${strapiBaseUrl}/api/galleries?populate=*`;

  const { data, pending, error } = await useFetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${strapiToken}`,
    },
  });

  if (!error.value && !pending.value && data.value) {
    galleries.value = transformGallerieObject(data.value.data);
  } else {
    console.error(error);
  }
};

const isHeartFilled = ref(false);

const toggleHeart = () => {
  isHeartFilled.value = !isHeartFilled.value;
};

onMounted(() => {
  getGalleries();
});
</script>
