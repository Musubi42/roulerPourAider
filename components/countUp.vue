<template>
  <span v-html="formatNumber(currentValue)"></span>
</template>

<style scoped>
.number-part {
  margin-right: 10px; /* Adjust as needed */
}
</style>

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

const formatNumber = (value) => {
  const parts = value.toString().split(/(?=(?:...)*$)/);
  return parts.map(part => `<span class="mr-1">${part}</span>`).join('  ');
};

const currentValue = ref(props.start);
</script>
