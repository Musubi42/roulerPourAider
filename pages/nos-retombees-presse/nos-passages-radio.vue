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
        <div class="flex flex-col ">
          <h2 class="text-lg font-semibold" >{{ podcast.title }}</h2>
          <p class="text-sm font-normal">{{ podcast.resume }}</p>
          <div class="flex flex-row mt-2 gap-x-2" >
            <div>
              <button class="bg-black rounded-full w-8 h-8" @click="setCurrentPodcast(podcast)" >
                <span class="flex justify-center" >
                  <IconsLecture class="w-4 h-4 ml-1 text-white" />
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
    <p>{{ currentPodcast }}</p>
      <LecteurAudioTest :currentPodcast="currentPodcast" />
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: "pr",
});

export default {
  setup() {
    const isLoading = ref(false);
    var podcasts = ref([]);
    var currentPodcast = ref([]);

    // Call the composable function
    const loading = isPodcastLoading();
    isLoading.value = loading;

    const Podcast = useCurrentPodcast();
    currentPodcast = Podcast;


    function setCurrentPodcast(podcast) {
      currentPodcast.value = podcast;
    }

    return {
      isLoading,
      podcasts,
      currentPodcast,
      setCurrentPodcast
    };
  },
  data() {
    return {
      articles: null,
      strapiBaseUrl: "",
      strapiToken: "",
    };
  },
  methods: {
    async getPodcastMetadata() {
      try {
        const url = `${this.strapiBaseUrl}/api/podcasts?populate=thumbnail&populate=podcast`;

        const { data, pending, error } = await useFetch(url, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.strapiToken}`,
          },
          // body: {
          //   username,
          //   password,
          // },
        });

        this.podcasts = this.transformPodcastObject(data.value.data);
      } catch (error) {
        console.error(error);
      }
    },
    transformPodcastObject(Podcasts) {
      const transformedObject = {};
      for (var PodcastData of Podcasts) {
        const { podcast, thumbnail, ...otherAttributes } = PodcastData.attributes;

        const podcastMediaAudioUrl = `${this.strapiBaseUrl}${podcast.data[0].attributes.url}`;
        const podcastMediaThumbnailUrl = `${this.strapiBaseUrl}${thumbnail.data[0].attributes.url}`;
        transformedObject[PodcastData.id] = {
          ...otherAttributes,
          podcastMediaThumbnailUrl: podcastMediaThumbnailUrl ? podcastMediaThumbnailUrl : undefined,
          podcastMediaAudioUrl: podcastMediaAudioUrl ? podcastMediaAudioUrl : undefined,
        };
      }
      return transformedObject;
    },
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },
    // loadMetaData(trackID) {
    //   this.trackID = trackID;
    //   this.songMetadata = this.playlistMetadata[trackID];
    // },
  },
  mounted() {
  },
  async created() {
    // // TODO: Faire une petite gestion d'erreur

    const runtimeConfig = useRuntimeConfig();
    this.strapiBaseUrl = runtimeConfig.public.strapiBaseUrl;
    this.strapiToken = runtimeConfig.public.strapiToken;

    // Get from the server the playlist metadata
    await this.getPodcastMetadata();

    this.currentPodcast.value = this.podcasts[1];
  },
};
</script>
