<template>
    <div @mouseenter="hover" @mouseleave="leave">
      <li class="hover-effect h-full" >
        <nuxt-link class="flex items-center h-full text-sm hover:text-primary transition-colors duration-300 font-medium" :to="to">
          <!-- You can use slots to make the component's content dynamic -->
          <slot></slot>
        </nuxt-link>
      </li>

      <div v-if="isHovered" class="absolute left-0 top-16 w-full h-16 bg-white border-t-[1px] border-b-[1px] border-gray-400/50">
        <!-- <ul class="flex gap-6 items-center h-full justify-center">
          <li class="" >
            <HeadersLinkDesktop to="/nos-retombees-presse/nos-articles-de-presse"
              >Nos articles de presse</HeadersLinkDesktop
            >
          </li>
          <li class="" >
            <HeadersLinkDesktop to="/nos-retombees-presse/nos-reportages-tv"
              >Nos reportages TV</HeadersLinkDesktop
            >
          </li>
          <li class="" >
            <HeadersLinkDesktop to="/nos-retombees-presse/nos-passages-radio"
              >Nos passages radio</HeadersLinkDesktop
            >
          </li>
        </ul> -->
        <ul class="flex gap-6 items-center h-full justify-center">
          <li v-for="item in subMenus" :key="item.path" class="" >
            <HeadersLinkDesktop :to="item.path"
              >{{ item.name }}</HeadersLinkDesktop
            >
          </li>
        </ul>
      </div>
    </div>
</template>

<style scoped>
.hover-effect {
    position: relative;
}

.hover-effect::after {
    z-index: 10;
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background: #72BC7A; /* Change this to the color you want */
    transition: width .3s;
    position: absolute;
    left: 0; /* Add this to align the pseudo-element with the left edge of the .hover-effect element */
}

.hover-effect:hover::after {
    width: 100%;
}
</style>

<script setup>
const props = defineProps({
  subMenus: {
    type: Array,
    default: () => [],
  },
  to: {
      type: String,
      required: true
  },
});

const isHovered = ref(false);
const emits = defineEmits(['mouseEnter', 'mouseLeave']);

const hover = () => {
  emits('mouseEnter');
  isHovered.value = true;
};

const leave = () => {
  emits('mouseLeave');
  isHovered.value = false;
};

</script>


