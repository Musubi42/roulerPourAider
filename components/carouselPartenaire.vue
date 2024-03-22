<template>
  <Swiper
    :modules="[SwiperAutoplay, SwiperEffectCreative]"
    :slides-per-view="4"
    :loop="true"
    :effect="'creative'"
    :autoplay="{
      delay: 2000,
      disableOnInteraction: true,
    }"
    :creative-effect="{
      prev: {
        shadow: false,
        translate: ['-20%', 0, -1],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    }"
  >
    <SwiperSlide v-for="slide in images" :key="slide" class="bg-green-300">
      <strong>{{ slide.alt }}</strong>
      <NuxtImg :src="slide.src" :alt="slide.alt" />
    </SwiperSlide>
  </Swiper>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';

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
]);

const slideWidth = 200; // width of each slide, this could be dynamic
const visibleSlides = computed(() => {
  return Math.floor(carousel.value.offsetWidth / slideWidth);
});

const slideStyle = computed(() => {
  return {
    width: `${slideWidth}px`,
    flex: '0 0 auto', // Ensure the slides do not shrink
  };
});

const scrollLeft = () => {
  // Logic to scroll left
};

const scrollRight = () => {
  // Logic to scroll right
};

onMounted(() => {
  // Initialize carousel or set up resize observers if needed
});
</script>

<style>
.carousel-container {
  display: flex;
  overflow-x: auto;
}
.carousel-slide {
  min-width: 200px; /* Adjust slide width here */
}
</style>
