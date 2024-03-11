<template>
  <div>
    <ul class="w-[90%] mx-auto">
      <li v-for="(podcast, index) in podcasts" :key="index" class="flex flex-row w-full border-b py-8 items-center">
        <img
          :src="podcast.podcastMediaThumbnailUrl"
          alt="Logo du podcast"
          class="h-44 aspect-video object-cover mr-4 rounded-lg"
        />
        <div class="flex flex-col">
          <h2 class="text-lg font-semibold">{{ podcast.title }}</h2>
          <p class="text-sm font-normal">{{ podcast.resume }}</p>
          <div class="flex flex-row mt-2 gap-x-2">
            <div>
              <button class="bg-black rounded-full w-8 h-8" @click="setCurrentPodcast(podcast)">
                <span class="flex justify-center">
                  <IconsLecture class="w-4 h-4 ml-1 text-white" />
                </span>
              </button>
            </div>
            <div class="flex items-center">
              <span>{{ podcast.date_de_creation }}</span>
              <span class="">&nbsp;•&nbsp;</span>
              <span>{{ formatTime(podcast.duree) }} min</span>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="fixed w-full p-4 bottom-0 z-10">
      <LecteurAudioTest :currentPodcast="currentPodcast" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "pr",
});

interface Podcast {
  id: number;
  title: string;
  resume: string;
  podcastMediaThumbnailUrl: string;
  podcastMediaAudioUrl: string;
  duree: number;
}

const podcasts = ref<Podcast[]>([]);
const currentPodcast = ref<Podcast | null>(null);
const runtimeConfig = useRuntimeConfig();
const { public: { strapiBaseUrl, strapiToken } } = runtimeConfig;

const setCurrentPodcast = (podcast: Podcast) => {
  currentPodcast.value = podcast;
};

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const transformPodcastObject = (podcastData) => {
  return podcastData.map((data) => {
    const { podcast, thumbnail, ...otherAttributes } = data.attributes;
    return {
      ...otherAttributes,
      podcastMediaThumbnailUrl: strapiBaseUrl + thumbnail.data[0].attributes.url,
      podcastMediaAudioUrl: strapiBaseUrl + podcast.data[0].attributes.url,
      id: data.id,
    };
  });
};

const getPodcastMetadata = async () => {
  const url = `${strapiBaseUrl}/api/podcasts?populate=thumbnail&populate=podcast`;

  const { data, pending, error } = await useFetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${strapiToken}`,
    },
  });
  console.log("");

  if (!error.value) {
    podcasts.value = transformPodcastObject(data.value.data);
    if (podcasts.value.length > 0) {
      currentPodcast.value = podcasts.value[0];
    }
  } else {
    console.error(error.value);
  }
};

onMounted(async () => {
  await getPodcastMetadata();
});
</script>
