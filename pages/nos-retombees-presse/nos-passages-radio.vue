<template>
  <div>
    <h1>Nos passages radio</h1>
    <ul class="w-[90%]">
      <!-- <li v-for="article in articles">{{ article.attributes.Title }}</li> -->
      <li class="flex flex-row w-full">
        <!-- <img  
          src="@/assets/images/logo-small.jpeg" 
          alt="Logo du podcast"
          class="h-12 aspect-square object-cover"
          > -->
        <div class="flex flex-col">
          <h2>Titre</h2>
          <p>Contenu</p>
        </div>
      </li>
    </ul>

    <div class="fixed w-full p-4 bottom-0 z-10" > 
      <LecteurAudio />
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: "pr",
});

export default {
  data() {
    return {
      articles: null,
      baseUrl: "",
      podcastID: 1,
    };
  },
  methods: {
    // async fetchArticles() {
    //   try {
    //     console.log("non");
    //     const response = await axios.get(
    //       "https://strapi.roulerpouraider.fr/api/podcasts/1?populate=*",
    //       {
    //         headers: {
    //           Authorization: `Bearer 70e795be5b1a9c2f3a2cab6d11194c489d32ebd0b79c5d8ff944299e1966ebcaaa1661ae60480585178ca267057a02a8093d3cd256094950fd25ae57621cdf1de1ab393f2819d206d6eb049e68eb2fdaa99a83e071868f02a7dbd9af824c70e98af663272bf9169625747d337478632e4b48d02a478276fe2d8336fdc9d1b0a8`,
    //         },
    //       }
    //     );
    //     console.log(response.data.data);
    //     this.articles = response.data.data;
    //     // console.log(this.articles[0].attributes.title);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    async getPodcastMetadata() {
      try {
        console.log("o");
        // const podcastMetadata = Api
        // const [error, data] = await api.get(`/api/podcasts`);
        // console.log(data);

        // this.playlistMetadataKeys = Object.keys(response.data);
        // this.playlistMetadata = response.data;

        // this.trackID = this.playlistMetadataKeys[0];
        // this.playlistLenght = this.playlistMetadataKeys.length;
      } catch (error) {
        console.log("oui");
        console.error(error);
      }
    },
    // loadMetaData(trackID) {
    //   this.trackID = trackID;
    //   this.songMetadata = this.playlistMetadata[trackID];
    // },
  },
  mounted() {
    // this.fetchArticles();
  },
  async created() {
    // // TODO: Faire une petite gestion d'erreur

    const runtimeConfig = useRuntimeConfig()
    console.log(runtimeConfig.public.strapiBaseUrl);
    // console.log(process.env.STRAPI_BASE_URL);
    // api.setToken(process.env.STRAPI_TOKEN);
    
    // Get from the server the playlist metadata
    // await this.getPodcastMetadata();

    // Load metaData of the first podcast
    // this.loadMetaData(this.podcastID);
  },
};
</script>
