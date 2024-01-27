<template>
  <div>
    <h1>Nos reportages TV</h1>
    <ul>
      <li v-for="article in articles" >{{ article.attributes.title }}</li>
    </ul>
  </div>
</template>


<script>
import axios from 'axios';

definePageMeta({
  layout: "pr",
});

export default {
  data() {
    return {
      articles: null
    }
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await axios.get('https://strapi.roulerpouraider.fr/api/articles', {
          headers: {
            'Authorization': `Bearer 70e795be5b1a9c2f3a2cab6d11194c489d32ebd0b79c5d8ff944299e1966ebcaaa1661ae60480585178ca267057a02a8093d3cd256094950fd25ae57621cdf1de1ab393f2819d206d6eb049e68eb2fdaa99a83e071868f02a7dbd9af824c70e98af663272bf9169625747d337478632e4b48d02a478276fe2d8336fdc9d1b0a8`
          }
        });
        console.log(response.data.data);
        this.articles = response.data.data;
        console.log(this.articles[0].attributes.title);
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchArticles();
  },
}
</script>
