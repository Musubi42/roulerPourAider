<template>
  <div class="h-16 flex bg-slate-400/50 backdrop-blur-sm rounded-xl">
    <div class="flex flex-1 justify-between">
      <!-- Infos sur le son -->
      <div
        class="flex flex-row gap-4 ml-4 mr-4 content-start center-content items-center"
      >
        <img
          class="h-4/5 aspect-square object-cover rounded"
        />
        <!-- 
          :src="currentPodcast ? currentPodcast?.podcastMediaThumbnailUrl : ''" -->
        <div
          class="justify-center flex flex-col text-ellipsis whitespace-nowrap overflow-hidden"
          :src="currentPodcast?.podcastMediaThumbnailUrl"
        >
          <!-- <p>{{ currentPodcast }}</p> -->
          <p class="hidden md:font-medium md:block">
            {{ currentPodcast ? currentPodcast?.title : "" }}
          </p>
          <p class="font-medium md:font-normal truncate">
            {{ currentPodcast ? currentPodcast?.resume : "" }}
          </p>
        </div>
      </div>
    </div>

    <!-- Pause/start previous/next -->
    <div class="flex mx-4 md:mx-10 items-center justify-center">
      <!-- Toggle song -->
      <button
        class="flex w-12 h-12 bg-black text-white rounded-full center-content justify-center items-center"
        @click="toggleAudio"
      >
        <iconsLoading class="w-[24px]" v-if="isLoading" src="" alt="Loading..." />
        <iconsLecture
          class="ml-[3px] w-[24px] text-white"
          v-if="!isPlaying && !isLoading"
        />
        <iconsPause class="w-[24px]" v-if="isPlaying && !isLoading" />
      </button>

      <div class="block md:hidden ml-4">
        <iconsSoundOn @click="toggleSound" v-if="isLoading" class="text-[24px]" />
        <iconsSoundOff @click="toggleSound" v-else class="text-[24px]" />
      </div>
    </div>

    <!-- Control volume son -->
    <div
      class="hidden md:flex md:flex-1 md:flex-row gap-4 ml-4 mr-4 content-end center-content items-center justify-end" >
      <!-- Music timeline -->
      <div class="flex w-full items-center">
        <div class="flex flex-row gap-1 cursor-default">
          <p ref="audioRef">{{ formatTime(currentTime) }}</p>
          /
          <p>{{ formatTime(currentPodcast ? currentPodcast?.duree : 0) }}</p>
        </div>
        <input
          type="range"
          class="rounded-full ml-2"
          min="0"
          :max="currentPodcast ? currentPodcast?.duree : 0"
          v-model="currentTime"
          @input="changeTime"
        />
      </div>
      <!-- Volume -->
      <!-- <div class="flex items-center">
        <iconsNoSound class="w-[24px]" />
        <input
          type="range"
          :title="`volume ${volume}%`"
          min="0"
          max="100"
          step="0.5"
          v-model="volume"
          class="rounded-full mx-2 cursor-pointer"
          style="--inputValue: 100%; width: 80px"
        />
        <iconsSoundOn class="w-[24px]" />
      </div> -->
      <!-- Volume -->
      <div
        class="flex flex-col relative h-20 justify-center items-center cursor-pointer"
        @mouseenter="showVolume = true"
        @mouseleave="showVolume = false" >
        <div class="z-10">
          <iconsSoundOn @click="toggleSound" v-if="isSound" class="w-[24px]" />
          <iconsSoundOff @click="toggleSound" v-else class="w-[24px]" />
        </div>
        <!-- <transition name="slide"> -->
        <div
          class="absolute bottom-full transform translate-y-full mb-[25px]"
          v-show="showVolume"
        >
          <input
            type="range"
            :title="`volume ${volume}%`"
            min="0"
            max="100"
            step="0.5"
            v-model="volume"
            class="vertical rotate-[270deg] rounded-full"
            style="--inputValue: 100%; width: 80px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import { ref, watch, onMounted, onBeforeUnmount, defineProps, Ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import axios from 'axios';

// TypeScript interface for the podcast
interface Podcast {
  id: number;
  title: string;
  resume: string;
  podcastMediaThumbnailUrl: string;
  podcastMediaAudioUrl: string;
  duree: number;
}

export default {
  props: {
    currentPodcast: {
      type: Object
    },
    isPlaying: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    watch(() => props.currentPodcast, (newVal) => {
      if (newVal) {
        // Safely access properties of newVal
        currentPodcast.value = newVal;
        changePodcast();
      }
    });

    // Reactive states
    const currentPodcast = ref<Podcast | null>(null);
    const isLoading = ref(false);
    const audioSource = ref<HTMLAudioElement | null>(null);
    const isPlaying = ref(false);
    const isSound = ref(true);
    const volume = ref(50);
    const showVolume = ref(false);
    const currentTime = ref(0);

    // Computed and watch
    watch(volume, (newVolume) => {
      isSound.value = newVolume > 0;
      if (audioSource.value) {
        audioSource.value.volume = newVolume / 100;
      }
    });



    watch(isPlaying, (newVal) => { 
      console.log(newVal);

      // const emit = defineEmits(['update:isPlaying']);
        emit('update:isPlaying', newVal);
      }
    );

    // Methods
    const changePodcast = () => {
      if (audioSource.value) {
        audioSource.value.pause();
        audioSource.value.src = ''; // Release the audio resource
      }
      isPlaying.value = false;
      loadAudio(props.currentPodcast.id);
      

      // Function to update and emit isPlaying status
      const setIsPlaying = (newStatus) => {
        // ... logic to change isPlaying status
        emit('update:isPlaying', newStatus);
      };
    };

    const loadAudio = async (trackID: number) => {
      try {
        isLoading.value = true;
        const audioResponse = await fetch(props.currentPodcast.podcastMediaAudioUrl);
        const blob = await audioResponse.blob();
        audioSource.value = new Audio(URL.createObjectURL(blob));
        audioSource.value.volume = volume.value / 100;
        audioSource.value.ontimeupdate = () => {
          currentTime.value = audioSource.value?.currentTime ?? 0;
        };
        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
        console.error("An error occurred:", error);
      }
    };

    const playAudio = () => {
      if (audioSource.value) {
        audioSource.value.play();
        isPlaying.value = true;

      }
    };

    const toggleAudio = async () => {
      if (!audioSource.value) {
        await loadAudio(props.currentPodcast.id);
        return;
      }
      if (isPlaying.value) {
        audioSource.value.pause();
        isPlaying.value = false;
      } else {
        audioSource.value.play();
        isPlaying.value = true;
      }
    };

    const changeTime = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (audioSource.value) {
        audioSource.value.currentTime = Number(target.value);
      }
    };

    const formatTime = (time: number): string => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const toggleSound = () => {
      isSound.value = !isSound.value;
      if (audioSource.value) {
        audioSource.value.volume = isSound.value ? volume.value / 100 : 0;
      }
    };

    // Lifecycle hooks
    onMounted(() => {
      // Your mounted logic
    });

    onBeforeUnmount(() => {
      // Cleanup if necessary
      if (audioSource.value) {
        audioSource.value.pause();
        audioSource.value.src = ''; // Release the audio resource
      }
    });

    return {
      isLoading,
      audioSource,
      isPlaying,
      isSound,
      volume,
      showVolume,
      currentTime,
      currentPodcast,
      changePodcast,
      loadAudio,
      playAudio,
      toggleAudio,
      changeTime,
      formatTime,
      toggleSound
    };
  },
};
</script>
