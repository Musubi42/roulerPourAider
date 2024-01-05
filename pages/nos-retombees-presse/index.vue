<template>
  <div>
    <h1>Nos articles de presse</h1>
    <ul>
      <li v-for="article in articles" >{{ article.attributes.title }}</li>
    </ul>
  </div>
</template>


<script>
  definePageMeta({
    layout: "pr",
  });
import axios from 'axios';

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
            'Authorization': `Bearer 197719aa439f651404f73e67c7f0bbc1fe3aaa23ec9d1f519aef360fd6670278ecf7ca1546548a9858cf5ed37e1da4986ba55c078b7050a2d76be451a1799830a790c3bc107f9a7ef8e0c3942fdad3e576dc4ba4a7fe0cd6a32de9400cfda9a3090099ed17259aeee52970a7f5c2a557e6ee6f848d4ce95ee53bbf0a18ec3fd0`
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
