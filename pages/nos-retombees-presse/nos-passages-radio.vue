<template>
  <div>
    <ul class="w-[90%] mx-auto">
      <li v-for="(podcast, index) in podcasts" :key="index"
        class="flex flex-row w-full border-b py-8 items-center" >
        <img
          :src="podcast.PodcastMediaThumbnailUrl"
          alt="Logo du podcast"
          class="h-36 aspect-video object-cover mr-4"
        />
        <div class="flex flex-col ">
          <h2 class="text-lg font-semibold" >{{ podcast.Title }}</h2>
          <p class="text-sm font-normal">{{ podcast.Resume }}</p>
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
              <span>{{ podcast.Date_de_creation }}</span>
              <!-- Séparateur -->
              <span class="">&nbsp;•&nbsp;</span>
              <span class="">{{ podcast.Duree }} min</span>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="fixed w-full p-4 bottom-0 z-10">
      <LecteurAudio />
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
      console.log(podcast);
      currentPodcast.value = podcast;
      console.log("currentPodcast", currentPodcast.value);  
    }

    // console.log("currentPodcast", currentPodcast.value);
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
        const url = `${this.strapiBaseUrl}/api/podcasts?populate=Thumbnail&populate=Podcast`;

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
        // console.log(this.podcasts);
      } catch (error) {
        console.error(error);
      }
    },
    transformPodcastObject(Podcasts) {
      const transformedObject = {};
      for (var PodcastData of Podcasts) {
        const { Podcast, Thumbnail, ...otherAttributes } = PodcastData.attributes;

        const podcastMediaAudioUrl = `${this.strapiBaseUrl}${Podcast.data[0].attributes.url}`;
        const podcastMediaThumbnailUrl = `${this.strapiBaseUrl}${Thumbnail.data[0].attributes.url}`;
        transformedObject[PodcastData.id] = {
          ...otherAttributes,
          PodcastMediaThumbnailUrl: podcastMediaThumbnailUrl ? podcastMediaThumbnailUrl : undefined,
          PodcastMediaAudioUrl: podcastMediaAudioUrl ? podcastMediaAudioUrl : undefined,
        };
      }
      return transformedObject;
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
