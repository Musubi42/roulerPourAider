<template>
    <li class="hover-effect ">
        <nuxt-link class="flex items-center h-full text-sm text-secondary hover:text-primary transition-colors duration-300 font-medium" :to="to">
            <!-- You can use slots to make the component's content dynamic -->
            <slot></slot>
        </nuxt-link>
    </li>
</template>

<style scoped>
.hover-effect {
    position: relative;
}

.hover-effect::after {
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

<script>
export default {
    props: {
        to: {
            type: String,
            required: true
        }
    }
}
</script>