<template>
  <div>
    <ul class="w-[90%] mx-auto">
      <li v-for="(podcast, index) in podcasts" :key="index"
        class="flex flex-row w-full border-b py-8 items-center" >
        <img
          :src="podcast.podcastMediaThumbnailUrl"
          alt="Logo du podcast"
          class="h-44 aspect-video object-cover mr-4 rounded-lg"
        />
        <p>{{ index }}</p>
        <div class="flex flex-col ">
          <h2 class="text-lg font-semibold" >{{ podcast.title }}</h2>
          <p class="text-sm font-normal">{{ podcast.resume }}</p>
          <div class="flex flex-row mt-2 gap-x-2" >
            <div>
              <button class="bg-black rounded-full w-8 h-8" @click="setCurrentPodcast(podcast)" >
                <span class="flex justify-center" >
                <p>{{ isPlaying }}</p>
                  <iconsLoading class="w-4 h-4 ml-1 text-white" v-if="isLoading" src="" alt="Loading..." />
                  <iconsLecture
                    class="w-4 h-4 ml-1 text-white"
                    v-if="!isPlaying && !isLoading"
                    alt="Lecture"
                  />
                  <iconsPause class="w-4 h-4 ml-1 text-white" v-if="isPlaying && !isLoading" alt="Pause" />
                </span>
              </button>
            </div>
            <div class="flex items-center">
              <!-- Date de création -->
              <span>{{ podcast.date_de_creation }}</span>
              <!-- Séparateur -->
              <span class="">&nbsp;•&nbsp;</span>
              <span>{{ formatTime(podcast ? podcast.duree : 0) }} min</span>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="fixed w-full p-4 bottom-0 z-10">
      <LecteurAudioTest 
        :currentPodcast="currentPodcast"
        @update:isPlaying="handleIsPlayingChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
// import { useFetch, useRuntimeConfig } from '@nuxtjs/composition-api';

export default {
  setup() {
    const isLoading = ref(false);
    const isPlaying = ref(false);
    const podcasts = ref([]);
    const currentPodcast = ref(null);
    const runtimeConfig = useRuntimeConfig();
    const strapiBaseUrl = runtimeConfig.public.strapiBaseUrl;
    const strapiToken = runtimeConfig.public.strapiToken;

    // Call the composable function
    // const loading = isPodcastLoading();
    // isLoading.value = loading;

    const handleIsPlayingChange = (newStatus) => {
      isLoading.value = false;
      console.log("isPlaying status updated to:", newStatus);
      isPlaying = newStatus;
    };

    const getPodcastMetadata = async () => {
      if (process.client) {
        try {
        const url = `${strapiBaseUrl}/api/podcasts?populate=thumbnail&populate=podcast`;

        const response = await $fetch(url, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${strapiToken}`,
          },
        });

        podcasts.value = transformPodcastObject(response.data);
        currentPodcast.value = podcasts.value[1];
        console.log(currentPodcast);
      } catch (error) {
        console.error(error);
      }
      }
    };

    const transformPodcastObject = (Podcasts) => {
      const transformedObject = {};
      for (var PodcastData of Podcasts) {
        const { podcast, thumbnail, ...otherAttributes } = PodcastData.attributes;

        const podcastMediaAudioUrl = `${strapiBaseUrl}${podcast.data[0].attributes.url}`;
        const podcastMediaThumbnailUrl = `${strapiBaseUrl}${thumbnail.data[0].attributes.url}`;
        transformedObject[PodcastData.id] = {
          ...otherAttributes,
          podcastMediaThumbnailUrl: podcastMediaThumbnailUrl ? podcastMediaThumbnailUrl : undefined,
          podcastMediaAudioUrl: podcastMediaAudioUrl ? podcastMediaAudioUrl : undefined,
        };
      }
      return transformedObject;
    };

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // TODO : Assodier l'index de chaque podcast pour savoir quel bouton faire tourner
    const setCurrentPodcast = (podcast) => {
      isLoading.value = true;
      currentPodcast.value = podcast;
    };

    watch(currentPodcast, (newVal, oldVal) => {
      console.log("watch currentPodcast", newVal, oldVal);
      // React to changes in currentPodcast, if necessary
    });

    onMounted(() => {
      // On component creation
      // getPodcastMetadata();
    });

    getPodcastMetadata();


    return {
      isLoading,
      podcasts,
      currentPodcast,
      setCurrentPodcast,
      handleIsPlayingChange,
      formatTime
    };
  }
};
</script>
