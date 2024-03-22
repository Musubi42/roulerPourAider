<template>
  <span>{{ currentValue.toLocaleString("fr-FR") }}</span>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  end: {
    type: Number,
    required: true,
  },
  start: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 2500,
  },
});

let hasAnimationPlayed = false;

watch(() => props.end,
  (newVal, oldVal) => {
    if (newVal != 0 && !hasAnimationPlayed) {
      startAnimation();
      hasAnimationPlayed = true;
    }
  }
);

const startAnimation = () => {
  let startTimestamp = null;

  const easeOutCubic = (t) => 1 - (1 - t) ** 3;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const rawProgress = Math.min((timestamp - startTimestamp) / props.duration, 1);
    const progress = easeOutCubic(rawProgress);
    currentValue.value = Math.floor(progress * (props.end - props.start) + props.start);
    if (rawProgress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};

const currentValue = ref(props.start);
</script>
