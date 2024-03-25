<template>
  <div>
    <Swiper
      :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
      :slides-per-view="3"
      :loop="true"
      :autoplay="{ delay: 4000 }"
      :pagination="{ enabled: true, clickable: true, dynamicBullets: true, type: 'bullets', dynamicMainBullets: 2 }"
      :centeredSlides="true"
      :slide-class="test"
      :space-between="0"
    >
      <SwiperSlide v-for="(image, index) in images" :key="index" class="p-10">
        <img :src="image.src" :alt="image.alt" class="h-full w-full" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
/* .swiper-slide {
  background-color: yellow;
  display: flex;
} */
.test {
  background-color: red;
}

.swiper-pagination-bullet {
  /* Example - adjust the color as needed */
  @apply bg-gray-500;
  background-color: yellow;
}

.bullet-active {
  /* Example - adjust the color as needed */
  @apply bg-green-500;
}

/* Swiper styles customization if needed */
</style>

<script setup lang="ts">
const carousel = ref(null);
const images = ref([
  {
    src: 'https://via.placeholder.com/200',
    alt: 'Placeholder image 1',
  },
  {
    src: 'https://via.placeholder.com/200',
    alt: 'Placeholder image 2',
  },
  {
    src: 'https://via.placeholder.com/200',
    alt: 'Placeholder image 3',
  },
  {
    src: 'https://via.placeholder.com/200',
    alt: 'Placeholder image 4',
  },
  {
    src: 'https://via.placeholder.com/200',
    alt: 'Placeholder image 5',
  },
  {
    src: 'https://via.placeholder.com/200',
    alt: 'Placeholder image 6',
  },
  {
    src: 'https://via.placeholder.com/200',
    alt: 'Placeholder image 7',
  },
  {
    src: 'https://via.placeholder.com/200',
    alt: 'Placeholder image 8',
  },
]);

</script>