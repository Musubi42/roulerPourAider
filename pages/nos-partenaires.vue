<template>
  <div class="mx-8 mt-20">
    <section
      v-for="(partenaire, index) in partenaires"
      :key="index"
      class="flex flex-col w-full container mx-auto justify-between mb-6"
    >
      <div
        class="flex flex-col" >
        <div class="relative flex flex-row w-full content-between" 
          :class="{
            'flex-row-reverse': index % 2 === 1,
            'flex-row': index % 2 === 0,
          }" >
          <div
            class="flex flex-col gap-4 justify-start items-center align-middle w-7/12" >
            <!-- Title -->
            <div class="font-semibold text-3xl w-full text-left md:text-center">
              {{ partenaire.title }}
            </div>
            <!-- Description -->
            <div class="w-full text-left" >{{ partenaire.description }}</div>
            <!-- Réseaux sociaux -->
            <div v-if="partenaire.siteWebUrl || partenaire.reseaux" 
              class="hidden md:absolute mt-7 md:mt-0 bottom-0 left-0 md:flex items-center w-full"
              :class="{
                'flex-row': index % 2 === 1,
                'flex-row': index % 2 === 0,
              }" >
              <NuxtLink
                v-if="partenaire.siteWebUrl"
                class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                :to="`${partenaire?.siteWebUrl}`"
                target="_blank"
              >
                <IconsWeb />
              </NuxtLink>
              <NuxtLink
                v-if="partenaire?.reseaux?.facebook"
                class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                :to="`${partenaire?.facebook}`"
                target="_blank"
              >
                <IconsFacebook />
              </NuxtLink>
              <NuxtLink
                v-if="partenaire?.reseaux?.twitter"
                class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                :to="`${partenaire?.twitter}`"
                target="_blank"
              >
                <IconsTwitter />
              </NuxtLink>
              <NuxtLink
                v-if="partenaire?.reseaux?.linkedin"
                class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                :to="`${partenaire?.linkedin}`"
                target="_blank"
              >
                <IconsLinkedin />
              </NuxtLink>
              <NuxtLink
                v-if="partenaire?.reseaux?.instagram"
                class="inline-flex items-center justify-center w-12 h-12 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
                :to="`${partenaire?.instagram}`"
                target="_blank"
              >
                <IconsInstagram />
              </NuxtLink>
            </div>
          </div>
          <!-- Image -->
          <div class="w-1/3 md:w-5/12"
            :class="{
              'mr-10': index % 2 === 1,
              'md:mr-20': index % 2 === 1,
              'ml-10': index % 2 === 0,
            }" >
            <NuxtImg
              :src="`${partenaire.partenairePhotoUrl}`"
              class="h-full md:h-72 object-contain"
              alt=""
            />
          </div>
        </div>

        <div class="flex md:hidden items-center w-full mt-6">
          <NuxtLink
            v-if="partenaire.siteWebUrl"
            class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
            :to="`${partenaire?.siteWebUrl}`"
            target="_blank"
          >
            <IconsWeb />
          </NuxtLink>
          <NuxtLink
            v-if="partenaire?.reseaux?.facebook"
            class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
            :to="`${partenaire?.facebook}`"
            target="_blank"
          >
            <IconsFacebook />
          </NuxtLink>
          <NuxtLink
            v-if="partenaire?.reseaux?.twitter"
            class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
            :to="`${partenaire?.twitter}`"
            target="_blank"
          >
            <IconsTwitter />
          </NuxtLink>
          <NuxtLink
            v-if="partenaire?.reseaux?.linkedin"
            class="inline-flex items-center justify-center w-12 h-12 mr-4 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
            :to="`${partenaire?.linkedin}`"
            target="_blank"
          >
            <IconsLinkedin />
          </NuxtLink>
          <NuxtLink
            v-if="partenaire?.reseaux?.instagram"
            class="inline-flex items-center justify-center w-12 h-12 bg-primary/20 hover:bg-primary/30 text-primary text-2xl rounded-lg"
            :to="`${partenaire?.instagram}`"
            target="_blank"
          >
            <IconsInstagram />
          </NuxtLink>
        </div>
      </div>

      <img
        src="/dashedLine-straight.png"
        alt=""
        class="my-10"
        :style="{ display: index === partenaires.length - 1 ? 'none' : 'block' }"
      />
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
