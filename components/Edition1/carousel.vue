<template>
  <div>
    <Swiper
      :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 4000 }"
      :pagination="{ enabled: true, clickable: true, dynamicBullets: true, type: 'bullets', dynamicMainBullets: 2 }"
      :centeredSlides="true"
      class="w-full h-[400px] mx-auto "
    >
      <SwiperSlide v-for="(image, index) in images" :key="index" class="p-10">
        <img :src="image.src" :alt="image.alt" class="h-full w-auto mx-auto rounded-3xl" />
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

const imageFilenames = ['2020-arrivee-nice.jpg', 'depart-lille.jpg', 'event-caritatif-1.jpg', 'event-caritatif-2.jpg', 'event-caritatif-3.jpg', 'event-caritatif-4.jpg', 'mairie-velo-2.jpg', 'mairie-velo.jpg', 'nice-arrosage.jpg', 'nice-celebration.jpg']; // Replace with your known filenames

const images = computed(() => {
  return imageFilenames.map((filename) => {
    return {
      src: `/1ere-edition/${filename}`,
      alt: filename.split('.')[0] // Removes the file extension
    };
  });
});

</script>