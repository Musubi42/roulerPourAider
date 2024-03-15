<template>
  <div>
    <Header :dynamicStyle="headerStyle" />
    <Hero />
    <NuxtPage />
    <SocialMedia />
    <FooterTest />
  </div>
</template>


<script>
export default {
  data() {
    return {
      headerStyle: {
        backgroundColor: 'transparent',
      },
    };
  },
  methods: {
    handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      this.headerStyle.backgroundColor = scrollY > 20 ? 'white' : 'transparent';
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>