<template>
  <div class="mx-8">
    <section
      v-for="(partenaire, index) in partenaires"
      :key="index"
      class="flex flex-col w-full container mx-auto justify-between" >
      
      <div class="flex flex-row"
        :class="{ 'md:flex-row-reverse': index % 2 === 1, 'md:flex-row': index % 2 === 0 }" >
        <div class="flex flex-col gap-4 justify-center items-center align-middle w-7/12">
          <!-- Title -->
          <div class="font-semibold text-3xl">
            {{ partenaire.title }}
          </div>
          <!-- Description -->
          <div>{{ partenaire.description }}</div>

          <div class="flex items-center w-full">
            <NuxtLink
              v-if="partenaire.siteWebUrl"
              class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
              :to="`${partenaire?.siteWebUrl}`"
            >
              <IconsWeb />
            </NuxtLink>
            <NuxtLink
              v-if="partenaire?.reseaux?.facebook"
              class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
              :to="`${partenaire?.facebook}`"
            >
              <IconsFacebook />
            </NuxtLink>
            <NuxtLink
              v-if="partenaire?.reseaux?.twitter"
              class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
              :to="`${partenaire?.twitter}`"
            >
              <IconsTwitter />
            </NuxtLink>
            <NuxtLink
              v-if="partenaire?.reseaux?.linkedin"
              class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
              :to="`${partenaire?.linkedin}`"
            >
              <IconsLinkedin />
            </NuxtLink>
            <NuxtLink
              v-if="partenaire?.reseaux?.instagram"
              class="inline-flex items-center justify-center w-12 h-12 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
              :to="`${partenaire?.instagram}`"
            >
              <IconsInstagram />
            </NuxtLink>
          </div>
        </div>
        <!-- Image -->
        <div class=""
           >
          <NuxtImg :src="`${partenaire.partenairePhotoUrl}`" class="h-72" alt="" />
        </div>
      </div>

      <img src="/dashedLine-straight.png" alt="" 
        class="my-10"
        :class="{ 'display': index === partenaires.length - 1 ? 'none' : 'block' }" />
    </section>
  </div>
</template>

<script setup lang="ts">
interface Partenaire {
  title: string;
  description: string;
  reseaux: {
    facebook: string;
    instagram: string;
    tiktok: string;
    twitter: string;
    linkedin: string;
  };
  partenairePhotoUrl: string;
  siteWebUrl: string;
}

const partenaires = ref<Partenaire[]>([]);

const runtimeConfig = useRuntimeConfig();
const {
  public: { strapiBaseUrl, strapiToken },
} = runtimeConfig;

const transformPartenaireObject = (partenaireData) => {
  return partenaireData.map((data) => {
    const { image, ...otherAttributes } = data.attributes;
    return {
      ...otherAttributes,
      partenairePhotoUrl: strapiBaseUrl + image.data.attributes.url,
    };
  });
};

const getPartenaires = async () => {
  const url = `${strapiBaseUrl}/api/partenaires?populate=*`;

  const { data, pending, error } = await useFetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${strapiToken}`,
    },
  });

  if (!error.value && !pending.value && data.value) {
    partenaires.value = transformPartenaireObject(data.value.data);
  } else {
    console.error(error.value);
  }

  console.log("partenaires", partenaires.value);
};

onMounted(() => {
  getPartenaires();
});
</script>
